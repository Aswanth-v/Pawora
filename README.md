# Pawora 🐾

Pawora is a full-stack social media web application built using the MERN stack that enables users to connect, share posts, interact with other users, and manage profiles in a modern social networking environment.

The project demonstrates full-stack application development including authentication, protected APIs, state management, media uploads, and deployment.

## 🚀 Live Demo

**Frontend:** https://pawora-aswa.vercel.app/

**Backend API:** https://paworaa.onrender.com

---

## ✨ Features

### Authentication & Security
- User registration and login
- JWT-based authentication
- Protected routes
- Secure API requests using authorization tokens

### Social Features
- Create posts
- Like posts
- Delete posts
- Friend request system
- Suggested friends
- Accept friend requests
- Post comments
- View user profiles

### Media Upload
- Image upload support
- Video upload support
- Cloudinary integration

### Profile Management
- Profile information management
- Profile image support
- User profile viewing

### User Experience
- Responsive UI
- Loading states
- Error handling
- Redux Toolkit state management

---

## 🛠 Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- REST APIs

### Database
- MongoDB
- Mongoose

### Cloud Services
- Cloudinary
- Render
- Vercel

---

## 📁 Project Structure

```txt
Pawora/
│
├── client/         # React frontend
│
├── server/         # Express backend
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/Aswanth-v/Pawora.git
cd Pawora
```

---

### 2. Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `server` folder.

Example:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key

EMAIL=your_email
AUTH_PASSWORD=your_email_app_password

KEY_ID=your_razorpay_key
RZ_SECRET=your_razorpay_secret
```

Create a `.env` file inside the `client` folder.

Example:

```env
REACT_APP_API_URL=http://localhost:8800
REACT_APP_CLOUDINARY_ID=your_cloudinary_cloud_name
```

> Important: Never commit real environment variables or secrets to GitHub.

---

## ▶️ Running the Project Locally

### Start Backend

```bash
cd server
npm start
```

### Start Frontend

```bash
cd client
npm run dev
```

---

## 🌐 Deployment

### Frontend
Deployed on Vercel.

### Backend
Deployed on Render.

---


## 📌 Future Improvements

- Real-time chat
- Notifications
- Improved recommendation system
- Better profile customization
- Advanced search functionality

---

## 👨‍💻 Author

**Aswanth V**

MERN Stack Developer passionate about building scalable web applications and continuously learning modern software development practices.

GitHub: https://github.com/Aswanth-v
