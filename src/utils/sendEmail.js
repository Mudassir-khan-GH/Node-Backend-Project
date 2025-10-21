// const { Resend } = require("resend");

// const resend = new Resend(process.env.RESEND_API_KEY);

// async function sendVerificationEmail(to, code) {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: "Acme <onboarding@resend.dev>",
//       to,
//       subject: "Your SnapFix Verification Code",
//       html: `
//         <div style="font-family: sans-serif;">
//           <h2>Verify your account</h2>
//           <p>Your verification code is:</p>
//           <h3 style="background:#eee;padding:10px;border-radius:5px;display:inline-block;">
//             ${code}
//           </h3>
//           <p>This code will expire in 10 minutes.</p>
//         </div>
//       `,
//     });

//     if (error) {
//       console.error("Resend error:", error);
//       return false;
//     }

//     console.log("Verification email sent:", data.id);
//     return true;
//   } catch (err) {
//     console.error("Error sending email:", err);
//     return false;
//   }
// }

// module.exports = { sendVerificationEmail };


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
    pass: process.env.NODE_CODE_SENDING_EMAIL_PASSWORD ,
  },
}); 

const sendVerificationEmail = async (sendTo,code) => {
  let info = await transporter.sendMail({
    from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
    to: sendTo,
    subject: "Verification Code",
    html: `<h1>Your verification code is: ${code}</h1>`
  });
}

module.exports = { sendVerificationEmail };