export const otpTemplate = (otp) => {
  const currentYear = new Date().getFullYear();
  
  return `
    <div style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px 20px; margin: 0; text-align: center;">
        
        <!-- Main Card -->
        <div style="max-width: 500px; width: 100%; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); margin: 0 auto; text-align: center;">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%); padding: 30px 20px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -1px;">bubbuu 💬</h1>
            </div>

            <!-- Body -->
            <div style="padding: 40px 30px;">
                <h2 style="color: #1f2937; font-size: 24px; font-weight: 700; margin-top: 0; margin-bottom: 16px;">
                    Let's get you chatting!
                </h2>
                <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
                    You're just one step away from joining the conversation. Use the magic code below to verify your account and hop right in.
                </p>

                <!-- OTP Code Box -->
                <div style="background-color: #fff0f2; border: 2px dashed #ffb3c1; border-radius: 16px; padding: 24px; margin-bottom: 32px;">
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 42px; font-weight: 900; color: #FF6B6B; letter-spacing: 8px;">
                        ${otp}
                    </div>
                </div>

                <!-- Security Notice -->
                <p style="color: #9ca3af; font-size: 14px; line-height: 1.5; margin-bottom: 0;">
                    This code expires in <strong>10 minutes</strong>.<br>
                    If you didn't request this, you can safely ignore this email. No one can access your <strong>bubbuu</strong> account without this code.
                </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f3f4f6; padding: 24px; border-top: 1px solid #e5e7eb;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.6;">
                    © ${currentYear} bubbuu app. All rights reserved.<br>
                    Spreading good vibes, one message at a time. ✨
                </p>
            </div>

        </div>
    </div>
  `;
};