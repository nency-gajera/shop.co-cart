import { resend } from '@/lib/resend';
import { getWelcomeEmailTemplate } from '@/lib/emailTemplates';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
        }

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: 'SHOP.CO <onboarding@resend.dev>',
            to: [email],
            subject: 'Welcome to SHOP.CO - Your 20% Discount Inside! ✨',
            html: getWelcomeEmailTemplate(email),
        });

        if (error) {
            console.error('Resend Error:', error);
            return NextResponse.json({ error: error.message || 'Sending failed' }, { status: 500 });
        }

        return NextResponse.json({ success: true, id: data?.id });
    } catch (error: any) {
        console.error('Subscription API Error:', error);
        return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
    }
}
