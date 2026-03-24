export const getWelcomeEmailTemplate = (email: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to SHOP.CO</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f6f9fc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 24px; margin-top: 40px; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
        
        <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 32px; font-weight: 900; margin: 0; color: #000000; text-transform: uppercase; letter-spacing: -2px;">SHOP.CO</h1>
        </div>

        <div style="text-align: center; margin-bottom: 40px;">
            <div style="width: 80px; height: 80px; background-color: #000000; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                <span style="color: #ffffff; font-size: 40px;">✨</span>
            </div>
            <h2 style="font-size: 28px; font-weight: 900; color: #1a1a1a; margin: 0 0 16px 0; text-transform: uppercase; tracking-tighter: 1px;">You're on the list!</h2>
            <p style="font-size: 16px; color: #666666; margin: 0; font-weight: 500;">Thank you for joining our community.</p>
        </div>

        <div style="background-color: #f9f9f9; padding: 32px; border-radius: 20px; border: 1px dashed #dddddd; margin-bottom: 32px; text-align: center;">
            <p style="font-size: 14px; color: #999999; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Your Welcome Gift</p>
            <h3 style="font-size: 40px; color: #000000; margin: 0 0 8px 0; font-weight: 900;">20% OFF</h3>
            <p style="font-size: 14px; color: #666666; font-weight: 600; margin-bottom: 16px;">Use this code at checkout on your next order:</p>
            <div style="background-color: #ffffff; padding: 16px 32px; border: 2px solid #000000; border-radius: 12px; display: inline-block;">
                <span style="font-family: 'Courier New', Courier, monospace; font-size: 24px; font-weight: 900; color: #000000; letter-spacing: 4px;">WELCOME20</span>
            </div>
        </div>

        <div style="text-align: center; margin-bottom: 40px;">
            <p style="font-size: 14px; color: #888888; line-height: 24px; margin-bottom: 24px;">
                Get ready for exclusive early access to new collections, <br/>
                special discounts, and style inspiration delivered to you.
            </p>
            <a href="https://shop-co-premium.vercel.app" style="background-color: #000000; color: #ffffff; text-decoration: none; padding: 18px 40px; border-radius: 99px; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">
                Start Shopping Now
            </a>
        </div>

        <div style="border-top: 1px solid #eeeeee; pt: 32px; text-align: center;">
            <p style="font-size: 12px; color: #bbbbbb; margin-top: 32px;">
                &copy; 2026 SHOP.CO. All Rights Reserved. <br/>
                If you didn't mean to sign up, you can safely ignore this email.
            </p>
        </div>
    </div>
</body>
</html>
`;
