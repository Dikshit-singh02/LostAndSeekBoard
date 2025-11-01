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
Lost-And-Found/
├── Backend/
│   ├── .env
│   ├── index.js
│   ├── config.js
│   ├── models/
│   │   ├── itemmodel.js
│   │   └── usermodel.js
│   ├── files/
│   │   ├── 1761682151878-213470858.png
│   │   ├── 1761713308109-665429490.png
│   │   ├── 1761715420734-364988761.jpeg
│   │   ├── 1761716692659-398091027.jpeg
│   │   ├── 1761717129637-744283381.jpeg
│   │   ├── 1761717371505-248643028.jpeg
│   │   ├── 1761748649342-823325056.png
│   │   ├── 1761810445072-904190993.png
│   │   └── 1762019724808-83453654.png
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules/
├── Frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── images/
│   │       └── favicon.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Form.jsx
│   │   │   ├── ItemCard.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Admin.jsx
│   │   │   ├── Details.jsx
│   │   │   ├── Find.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Post.jsx
│   │   ├── assets/
│   │   │   ├── l&f.png
│   │   │   ├── newLogo.jpeg
│   │   │   └── no-image.png
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.js
│   │   └── config.js
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules/
├── .gitignore
├── README.md
├── TODO.md
└── .git/
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
