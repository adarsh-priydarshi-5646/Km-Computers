import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init("32q5o2A_XUdPKJ7Wu");

// Template IDs mapping
const TEMPLATES = {
  CONTACT: 'template_1tu4qol',
  SERVICE: 'template_vy6z2vx',
} as const;

export type EmailTemplate = keyof typeof TEMPLATES;

type EmailResponse = {
  success: boolean;
  response?: any;
  error?: any;
};

export const sendEmail = async (
  template: EmailTemplate,
  templateParams: Record<string, unknown>
): Promise<EmailResponse> => {
  try {
    const response = await emailjs.send(
      "service_l21ftmh", // Your Service ID
      TEMPLATES[template],
      {
        to_email: "kmcedudeeh@gmail.com",
        ...templateParams
      }
    );
    
    return { success: true, response };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
};