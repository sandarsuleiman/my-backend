import { Resend } from 'resend';

const resend = new Resend();   // ← Yahan key nahi daalni, yeh khud le lega

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const { ser, us, emails = [], workerEmail, name } = req.body;

  let finalEmails = [...emails];
  if (workerEmail) finalEmails.push(workerEmail);
  if (finalEmails.length === 0) return res.status(400).json({ error: "No email" });

  try {
    await resend.emails.send({
      from: "Form <onboarding@resend.dev>",
      to: finalEmails,
      subject: `New Form - ${name || "Someone"}`,
      html: `
        <h2>New Submission!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Service:</strong> ${ser}</p>
        <p><strong>Use:</strong> ${us}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
