import emailjs from "emailjs-com";

export const sendWelcomeEmail = async (email: string) => {
  try {
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      { user_email: email },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    return result;
  } catch (error) {
    console.error("Email failed:", error);
    throw error;
  }
};