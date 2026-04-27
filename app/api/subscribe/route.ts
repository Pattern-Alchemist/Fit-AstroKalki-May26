import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, magnet } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // TODO: Save to database
    // const supabase = createClient(supabaseUrl, supabaseKey);
    // await supabase.from('email_subscribers').insert([{
    //   email,
    //   source: magnet,
    //   subscribed_at: new Date().toISOString(),
    // }]);

    // TODO: Send welcome email via Resend
    // await resend.emails.send({
    //   from: 'Kaustubh <noreply@kaustubh.fit>',
    //   to: email,
    //   subject: 'Your 7-Day Fat Loss Guide is Ready!',
    //   html: `<h1>Welcome!</h1><p>Check the attachment for your free guide.</p>`,
    // });

    // For now, just return success
    console.log(`[v0] New subscriber: ${email}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed! Check your email for the guide.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
