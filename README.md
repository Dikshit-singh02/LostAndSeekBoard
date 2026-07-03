# 🔍 Lost & Seek Board

A full-stack **MERN Stack** web application that helps users report, search, and manage lost & found items. Users can post lost items with images, browse available items, and administrators can manage all records through a secure admin dashboard.

## 🌐 Live Demo

### Frontend
https://lost-and-seek-board.vercel.app

### Backend API
https://lostandseekboard-backend.onrender.com

### API Example
https://lostandseekboard-backend.onrender.com/item

---

# 📸 Features

- User-friendly Home Page
- Post Lost/Found Items
- Upload Item Images
- Browse All Items
- View Item Details
- Search Items
- Secure Admin Login (JWT Authentication)
- Admin Dashboard
- Edit Items
- Delete Items
- Responsive UI
- RESTful API
- MongoDB Atlas Cloud Database

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Bootstrap 5
- Material UI
- Notistack
- React Spinners
- AOS Animation

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Multer
- CORS
- dotenv

---

# 🚀 Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

---

# 📁 Project Structure

```
LostAndSeekBoard
│
├── Backend
│   ├── models
│   ├── files
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── Frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── config.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Dikshit-singh02/LostAndSeekBoard.git

cd LostAndSeekBoard
```

---

## Backend Setup

```bash
cd Backend

npm install
```

Create a `.env` file

```env
PORT=8000

JWT_SECRET=yourSecretKey

MONGO_URI=your_mongodb_atlas_connection_string
```

Start Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd Frontend

npm install
```

Create `.env`

```env
REACT_APP_API_URL=http://localhost:8000
```

Start Frontend

```bash
npm start
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/login` |

---

## Items

| Method | Endpoint |
|---------|----------|
| GET | `/item` |
| POST | `/item` |
| GET | `/item/:id` |
| PUT | `/item/:id` |
| DELETE | `/item/:id` |

---

# 🔐 Environment Variables

### Backend

```env
PORT=

JWT_SECRET=

MONGO_URI=
```

### Frontend

```env
REACT_APP_API_URL=
```

---

# 📸 Screenshots

You can add screenshots here.

Example:

```
Home Page

Admin Dashboard

Find Items

Post Item
```

---

# 👨‍💻 Author

**Dikshit Singh**

- GitHub: https://github.com/Dikshit-singh02
- LinkedIn: *(Add your LinkedIn URL)*

---

# ⭐ Future Improvements

- User Registration
- Email Notifications
- Search Filters
- Category-wise Search
- Cloudinary Image Storage
- User Dashboard
- Pagination
- Forgot Password
- Dark Mode

---

# 📄 License

This project is licensed under the ISC License.

---

⭐ If you found this project useful, don't forget to **Star** the repository.
