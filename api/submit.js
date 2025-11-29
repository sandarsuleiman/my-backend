export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const { ser, us, emails = [], workerEmail, name } = req.body;

  let finalEmails = [...emails];
  if (workerEmail && !finalEmails.includes(workerEmail)) finalEmails.push(workerEmail);
  if (finalEmails.length === 0) return res.status(400).json({ error: "No email" });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer re_fczGkQSG_Bi7UoLwbrcXuoXXjn3XjGm3K",
      },
      body: JSON.stringify({
        from: "Form <form@yourdomain.com>",           // ← YE CHANGE KIYA
        // ya "Contact Form <noreply@yourdomain.com>"
        to: finalEmails,
        subject: `New Form - ${name || "Someone"}`,
        html: `<h2>New Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Service:</strong> ${ser}</p><p><strong>Use:</strong> ${us}</p>`,
      }),
    });

    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      const err = await response.json();
      res.status(500).json({ error: err });
    }
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
}
