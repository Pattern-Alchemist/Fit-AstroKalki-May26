-- Phase 1: Core Database Schema for Fit-AstroKalki Platform
-- All tables with proper RLS and relationships

-- 1. Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT,
  profile_image_url TEXT,
  is_trainer BOOLEAN DEFAULT FALSE,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Clients table (trainer's clients)
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  age INT,
  gender TEXT,
  current_weight DECIMAL(5,2),
  target_weight DECIMAL(5,2),
  height DECIMAL(5,2),
  status TEXT DEFAULT 'inquiry' CHECK (status IN ('inquiry', 'active', 'completed', 'inactive')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Intake Forms table
CREATE TABLE IF NOT EXISTS intake_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  fitness_level TEXT NOT NULL, -- beginner, intermediate, advanced
  primary_goal TEXT NOT NULL,
  secondary_goals TEXT[],
  available_days TEXT[], -- Mon, Tue, Wed, etc
  session_frequency INT NOT NULL, -- sessions per week
  equipment_access TEXT[], -- gym, home, both
  injuries TEXT,
  medical_history TEXT,
  dietary_restrictions TEXT,
  lifestyle_notes TEXT,
  preferred_session_time TEXT, -- morning, afternoon, evening
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Programs table
CREATE TABLE IF NOT EXISTS programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  program_name TEXT NOT NULL, -- "Fat Loss Crew", "Muscle Building", etc
  description TEXT,
  duration_weeks INT,
  session_frequency INT, -- sessions per week
  price INT, -- in INR
  max_clients INT,
  current_enrollment INT DEFAULT 0,
  program_type TEXT, -- group, individual, hybrid
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Booking/Session Slots table
CREATE TABLE IF NOT EXISTS session_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  trainer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  capacity INT DEFAULT 1,
  enrolled_count INT DEFAULT 0,
  is_booked BOOLEAN DEFAULT FALSE,
  recurring_pattern TEXT, -- one-time, weekly, biweekly, etc
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Session Bookings table
CREATE TABLE IF NOT EXISTS session_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  slot_id UUID NOT NULL REFERENCES session_slots(id) ON DELETE CASCADE,
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'completed', 'cancelled', 'no-show')),
  whatsapp_message_id TEXT, -- for tracking sent WhatsApp messages
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'confirmed', 'failed')),
  payment_method TEXT DEFAULT 'upi', -- upi, bank_transfer, cash
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Client Progress table
CREATE TABLE IF NOT EXISTS client_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  recorded_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  weight DECIMAL(5,2),
  chest_measurement DECIMAL(5,2),
  waist_measurement DECIMAL(5,2),
  arm_measurement DECIMAL(5,2),
  leg_measurement DECIMAL(5,2),
  body_fat_percentage DECIMAL(5,2),
  notes TEXT,
  mood_rating INT CHECK (mood_rating >= 1 AND mood_rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Trainer Notes table
CREATE TABLE IF NOT EXISTS trainer_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  trainer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  session_date TIMESTAMP WITH TIME ZONE,
  note_content TEXT NOT NULL,
  focus_areas TEXT[],
  adjustments_recommended TEXT,
  is_visible_to_client BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Videos table (form coaching, demos)
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  file_size INT, -- in bytes
  duration_seconds INT,
  exercise_name TEXT,
  exercise_type TEXT, -- compound, isolation, cardio
  difficulty_level TEXT, -- beginner, intermediate, advanced
  tags TEXT[],
  thumbnail_url TEXT,
  view_count INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Nutrition Logs table
CREATE TABLE IF NOT EXISTS nutrition_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  log_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  meal_type TEXT, -- breakfast, lunch, dinner, snack
  food_items TEXT,
  calories INT,
  protein_grams DECIMAL(5,1),
  carbs_grams DECIMAL(5,1),
  fats_grams DECIMAL(5,1),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Blog Posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  category TEXT,
  tags TEXT[],
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  view_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  trainer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  video_url TEXT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  before_image_url TEXT,
  after_image_url TEXT,
  weight_loss INT,
  duration_days INT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. Email Subscribers table
CREATE TABLE IF NOT EXISTS email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  segment TEXT, -- lead, client, alumni
  last_email_sent TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. Email Campaign Logs table
CREATE TABLE IF NOT EXISTS email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_name TEXT NOT NULL,
  campaign_type TEXT, -- intake, nurture, promotional, blog
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  recipient_count INT DEFAULT 0,
  sent_count INT DEFAULT 0,
  open_count INT DEFAULT 0,
  click_count INT DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sent')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 15. Referral Program table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  referred_client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL UNIQUE,
  reward_amount INT DEFAULT 500, -- in INR
  reward_redeemed BOOLEAN DEFAULT FALSE,
  redeemed_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 16. WhatsApp Messages Log table
CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  trainer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  message_content TEXT NOT NULL,
  message_type TEXT, -- inquiry, booking_confirmation, reminder, follow_up, promotional
  direction TEXT, -- inbound, outbound
  is_automated BOOLEAN DEFAULT FALSE,
  external_message_id TEXT,
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_clients_trainer_id ON clients(trainer_id);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_intake_forms_client_id ON intake_forms(client_id);
CREATE INDEX idx_session_slots_trainer_id ON session_slots(trainer_id);
CREATE INDEX idx_session_slots_start_time ON session_slots(start_time);
CREATE INDEX idx_session_bookings_client_id ON session_bookings(client_id);
CREATE INDEX idx_client_progress_client_id ON client_progress(client_id);
CREATE INDEX idx_trainer_notes_client_id ON trainer_notes(client_id);
CREATE INDEX idx_videos_trainer_id ON videos(trainer_id);
CREATE INDEX idx_nutrition_logs_client_id ON nutrition_logs(client_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_testimonials_published ON testimonials(published);
CREATE INDEX idx_email_subscribers_email ON email_subscribers(email);
CREATE INDEX idx_whatsapp_messages_client_id ON whatsapp_messages(client_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE intake_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainer_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Profiles
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for Clients (trainer sees their own clients)
CREATE POLICY "Trainers can view their own clients" ON clients FOR SELECT USING (trainer_id = auth.uid());
CREATE POLICY "Trainers can update their own clients" ON clients FOR UPDATE USING (trainer_id = auth.uid());
CREATE POLICY "Trainers can insert new clients" ON clients FOR INSERT WITH CHECK (trainer_id = auth.uid());

-- RLS Policies for Session Bookings
CREATE POLICY "Clients can view their bookings" ON session_bookings FOR SELECT USING (client_id = auth.uid());
CREATE POLICY "Trainers can view client bookings" ON session_bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM clients WHERE clients.id = session_bookings.client_id AND clients.trainer_id = auth.uid())
);

-- Additional public policies for published content
CREATE POLICY "Public can view published blog posts" ON blog_posts FOR SELECT USING (published = TRUE);
CREATE POLICY "Public can view published testimonials" ON testimonials FOR SELECT USING (published = TRUE);
