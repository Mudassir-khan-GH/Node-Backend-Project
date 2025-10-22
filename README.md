# 🌆 SnapFix

SnapFix is a full-stack web application built using **Node.js**, **Express**, **MongoDB (Mongoose)**, and **EJS** — styled beautifully with **Tailwind CSS**.  
It allows users to report local issues (like damaged roads or broken street lights), share updates, and interact socially through posts, likes, and follows.

---

## 🚀 Live Demo
🔗 [Deployed on Render](https://node-snapfix-backend-project.onrender.com/api/v1/user/register)  


---

## ✨ Features

- 🧾 **Authentication & Authorization**
  - Secure signup & login with JWT.
  - Password hashing with bcrypt.
  - Email verification using OTP.
  
- 👤 **User Profiles**
  - Upload profile pictures (Cloudinary integration).
  - Change profile image or password.
  - Follow / Unfollow other users.
  - Verified account status.

- 🏙️ **Post System**
  - Create, edit, and delete posts.
  - Upload post images via Cloudinary.
  - Like and comment on posts.
  - Aggregation pipelines to fetch posts with user and like data efficiently.

- 🏡 **Home Feed**
  - Displays all user posts with creator details, likes count, and like status.
  - Clean and minimal responsive UI built with Tailwind CSS.

- 📱 **Responsive Design**
  - Mobile-friendly layouts for login, signup, profile, and home pages.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | EJS, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Image Hosting | Cloudinary |
| Authentication | JWT, bcrypt |
| Deployment | Render |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/snapfix.git
cd snapfix
```

### 2️⃣ Install Dependencies
```
npm install
```
### 2️⃣ Create Environment File
Create a .env file in the root directory and add:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
```

### 4️⃣ Run the App
```
npm run dev
```
App will be running at:
👉 http://localhost:3000

### 📁 Folder Structure
```
SnapFix/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── views/          # EJS templates
│
├── public/             # Static assets
├── .env
├── package.json
└── README.md

```

### 👨‍💻 Author
Mudassir Khan  
📧 [Contact via email](mudassirpak47@gmail.com)  
🔗 [LinkedIn Profile](https://www.linkedin.com/in/mudassir-khan-48a691316/)  
🔗 [Github Repository](https://github.com/Mudassir-khan-GH/Node-SnapFix-Backend-Project)  
💼 Looking for Internship / Entry-Level Developer Opportunities