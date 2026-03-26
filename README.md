# TODO App - Backend API

A robust TODO application backend built with Express.js and MongoDB, featuring user authentication, todo management, and logging middleware.

## 📁 Project Structure

```
backend/
├── server.js              # Main application entry point
├── package.json           # Project dependencies
├── .env                   # Environment variables
├── src/
│   ├── config/
│   │   └── db.js         # MongoDB connection configuration
│   ├── models/
│   │   ├── Todo.js       # Todo schema and model
│   │   └── User.js       # User schema and model
│   ├── controllers/
│   │   ├── todo.controller.js    # Todo CRUD operations
│   │   └── user.controller.js    # User auth and profile management
│   ├── routes/
│   │   ├── todo.route.js        # Todo endpoints
│   │   └── user.route.js        # User endpoints
│   ├── middleware/
│   │   ├── auth.js      # JWT authentication middleware
│   │   └── logger.js    # Request/response logging
│   └── utils/           # Utility functions (if needed)
└── node_modules/        # Dependencies
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB running locally on `mongodb://127.0.0.1:27017` or update the connection string in `.env`

### Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Update the `.env` file with your settings:
   ```
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/todoDB
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   NODE_ENV=development
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   
   Or with auto-reload (requires nodemon):
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000`

## 📡 API Endpoints

### User Endpoints

#### Register a new user
```
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "message": "User registered successfully",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGc..."
}
```

#### Login user
```
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "message": "Login successful",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGc..."
}
```

#### Get user profile (Protected)
```
GET /api/users/profile
Authorization: Bearer <token>

Response (200):
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "todos": [...]
}
```

#### Update user profile (Protected)
```
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}

Response (200):
{
  "message": "User updated successfully",
  "user": { ... }
}
```

### Todo Endpoints

#### Create a new todo
```
POST /api/todos
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "high"
}

Response (201):
{
  "_id": "...",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "priority": "high",
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### Get all todos
```
GET /api/todos

Response (200):
[
  {
    "_id": "...",
    "title": "Buy groceries",
    "completed": false,
    "priority": "high",
    ...
  },
  ...
]
```

#### Update a todo
```
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Updated title",
  "completed": true,
  "priority": "medium"
}

Response (200):
{
  "_id": "...",
  "title": "Updated title",
  "completed": true,
  "priority": "medium",
  ...
}
```

#### Delete a todo
```
DELETE /api/todos/:id

Response (200):
{
  "message": "Todo Deleted"
}
```

### Health Check
```
GET /api/health

Response (200):
{
  "message": "Server is running"
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected endpoints require an `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB object modeling
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token generation and verification
- **dotenv**: Environment variable management

## 🛠️ Development

For development with auto-reload on file changes:

1. Install nodemon (dev dependency already added)
2. Run: `npm run dev`

## 📝 Notes

- All timestamps are in UTC
- Passwords are hashed using bcryptjs before storage
- JWT tokens expire in 7 days
- MongoDB connection uses a local instance by default
- Update the `.env` file for production settings

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongodb does not require installation on Windows if not installed`
- Check the connection string in `.env`
- Verify MongoDB is listening on port 27017

### Port Already in Use
- Change the PORT in `.env`
- Or kill the process: `netstat -ano | findstr :5000` (Windows)

### JWT Token Issues
- Ensure `JWT_SECRET` is set in `.env`
- Check that the token is included in the Authorization header correctly

## 📄 License

ISC
