# LostAndSeekBoard

A full-stack web application for reporting and finding lost items. Users can post lost items with details and images, while others can browse and search for items to help reunite them with their owners. Admins have additional privileges to manage items.

## Features

- **User Authentication**: Login system with JWT tokens
- **Item Posting**: Report lost items with name, contact info, title, description, and image upload
- **Item Browsing**: View all posted lost items
- **Item Details**: Detailed view of individual items
- **Admin Panel**: Admin users can edit and delete items
- **Responsive Design**: Works on desktop and mobile devices
- **Image Upload**: Support for uploading item images

## Tech Stack

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Multer** for file uploads
- **CORS** for cross-origin requests

### Frontend
- **React** with **React Router** for routing
- **Material-UI** for UI components
- **Axios** for API calls
- **Bootstrap** for additional styling
- **AOS** for animations
- **React Spinners** for loading indicators

## Prerequisites

- Node.js (version 18.x recommended)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- npm or yarn package manager

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dikshit-singh02/LostAndSeekBoard.git
   cd LostAndSeekBoard
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Set up Environment Variables** (optional):
   - Create a `.env` file in the Backend directory
   - Add `JWT_SECRET=your_secret_key_here`
   - Add `PORT=8000` (optional, defaults to 8000)
   - MongoDB URL is set to `mongodb://localhost:27017/lost-and-found` in config.js

5. **Start MongoDB**:
   Ensure MongoDB is running on your local machine (default port 27017).

## Usage

1. **Start the Backend Server**:
   ```bash
   cd Backend
   npm run dev
   ```
   The server will start on port 8000.

2. **Start the Frontend Application**:
   ```bash
   cd Frontend
   npm start
   ```
   The app will open in your browser at `http://localhost:3000`.

3. **Access the Application**:
   - Home page: Browse lost items
   - Post: Report a lost item
   - Find: Search for items
   - Login: Admin login (default admin: dikshitsingh9973@gmail.com / Dikshit@2002)
   - Admin: Manage items (admin only)

## API Endpoints

### Items
- `GET /item` - Get all items
- `POST /item` - Create new item (with image upload)
- `GET /item/:id` - Get item by ID
- `PUT /item/:id` - Update item (admin only)
- `DELETE /item/:id` - Delete item (admin only)

### Authentication
- `POST /login` - User login

## Project Structure

```
LostAndSeekBoard/
├── Backend/
│   ├── config.js
│   ├── index.js
│   ├── models/
│   │   ├── itemmodel.js
│   │   └── usermodel.js
│   ├── files/ (uploaded images)
│   └── package.json
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── config.js
│   └── package.json
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
