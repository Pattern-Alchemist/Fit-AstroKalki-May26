#!/usr/bin/env python3
"""Database migration runner for Fit-AstroKalki platform"""

import os
import sys
import psycopg2
from pathlib import Path

def run_migration():
    # Get database URL from environment
    db_url = os.getenv('POSTGRES_URL')
    
    if not db_url:
        print("Error: POSTGRES_URL environment variable not set")
        sys.exit(1)
    
    try:
        # Connect to database
        conn = psycopg2.connect(db_url)
        cursor = conn.cursor()
        
        print("[v0] Connecting to Supabase PostgreSQL...")
        print("[v0] Connection successful!")
        
        # Read SQL file
        sql_file = Path(__file__).parent / '01-init-db.sql'
        with open(sql_file, 'r') as f:
            sql_content = f.read()
        
        print(f"[v0] Executing migration from {sql_file}")
        
        # Execute SQL
        cursor.execute(sql_content)
        conn.commit()
        
        print("[v0] Migration completed successfully!")
        print(f"[v0] Created tables:")
        print("  - profiles")
        print("  - clients")
        print("  - intake_forms")
        print("  - programs")
        print("  - session_slots")
        print("  - session_bookings")
        print("  - client_progress")
        print("  - trainer_notes")
        print("  - videos")
        print("  - nutrition_logs")
        print("  - blog_posts")
        print("  - testimonials")
        print("  - email_subscribers")
        print("  - email_campaigns")
        print("  - referrals")
        print("  - whatsapp_messages")
        
        cursor.close()
        conn.close()
        
    except psycopg2.Error as e:
        print(f"[v0] Database error: {e}")
        sys.exit(1)
    except FileNotFoundError:
        print(f"[v0] SQL file not found: {sql_file}")
        sys.exit(1)
    except Exception as e:
        print(f"[v0] Error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    run_migration()
