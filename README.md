# Twitter-like Social Media API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  A powerful Twitter-like social media API built with NestJS, TypeScript, and PostgreSQL
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <img src="https://img.shields.io/badge/code%20style-prettier-ff69b4.svg" alt="Code Style: Prettier" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white" alt="TypeScript" />
</p>

## 🚀 Features

- **User Management**: Registration, authentication, and profile management
- **Tweet System**: Create, read, update, and delete tweets
- **Hashtag Support**: Automatic hashtag parsing and management
- **User Profiles**: Extended user information and customization
- **Authentication**: JWT-based authentication with refresh tokens
- **Pagination**: Efficient data pagination for all list endpoints
- **API Documentation**: Comprehensive Swagger/OpenAPI documentation
- **Security**: Helmet security headers, CORS, and rate limiting
- **Logging**: Winston-based structured logging
- **Database Seeding**: Sample data for development and testing

## 🛠️ Technology Stack

- **Framework**: NestJS 11.x
- **Language**: TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger/OpenAPI
- **Validation**: class-validator & class-transformer
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston
- **Testing**: Jest

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd procademy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Environment Mode
   ENV_MODE=development
   
   # Database Configuration
   DB_TYPE=postgres
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_NAME=procademy_db
   DB_SYNC=true
   AUTO_LOAD=true
   
   # JWT Configuration
   JWT_TOKEN_SECRET=your_super_secret_jwt_key_here
   JWT_TOKEN_EXPIRES_IN=3600
   JWT_TOKEN_REFRESH_EXPIRES_IN=86400
   JWT_TOKEN_AUDIENCE=localhost:3000
   JWT_TOKEN_ISSUER=localhost:3000
   
   # Application Configuration
   PORT=3000
   ```

4. **Database Setup**
   
   Create a PostgreSQL database:
   ```sql
   CREATE DATABASE procademy_db;
   ```

5. **Database Seeding (Optional)**
   
   To populate the database with sample data:
   ```bash
   npm run seed
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

The application will be available at `http://localhost:3000`

## 📚 API Documentation

Once the application is running in development mode, you can access the Swagger documentation at:

**http://localhost:3000/api**

The API documentation includes:
- All available endpoints
- Request/response schemas
- Authentication requirements
- Example requests and responses

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. **Register a new user** or **login** to get access tokens
2. **Include the JWT token** in the Authorization header:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

### Authentication Endpoints

- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login with credentials
- `POST /auth/refresh-token` - Refresh access token

## 📡 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh-token` - Refresh JWT token

### Users
- `GET /users` - Get all users (paginated)
- `DELETE /users/:id` - Delete user by ID

### Tweets
- `GET /tweets` - Get all tweets (paginated)
- `GET /tweets/:id` - Get tweet by ID
- `GET /tweets/user/:userId` - Get tweets by user ID
- `POST /tweets` - Create new tweet
- `PATCH /tweets/:id` - Update tweet
- `DELETE /tweets/:id` - Delete tweet

### Profiles
- `GET /profile` - Get current user profile
- `POST /profile` - Create user profile
- `PATCH /profile` - Update user profile

### Hashtags
- `GET /hashtag` - Get all hashtags
- `POST /hashtag` - Create new hashtag

## 🔒 Security Features

- **Helmet**: Security headers protection
- **CORS**: Cross-Origin Resource Sharing configuration
- **Rate Limiting**: 100 requests per minute per IP
- **Input Validation**: Comprehensive request validation
- **Password Hashing**: bcrypt password encryption
- **JWT Authentication**: Secure token-based authentication

## 📊 Database Schema

### User Entity
- `id`: Primary key
- `username`: Unique username
- `email`: Unique email address
- `password`: Hashed password
- `createdAt`, `updatedAt`, `deletedAt`: Timestamps

### Profile Entity
- `id`: Primary key
- `bio`: User biography
- `location`: User location
- `website`: User website URL
- `user`: One-to-one relationship with User

### Tweet Entity
- `id`: Primary key
- `text`: Tweet content
- `image`: Optional image URL
- `user`: Many-to-one relationship with User
- `hashtags`: Many-to-many relationship with Hashtag
- `createdAt`, `updatedAt`: Timestamps

### Hashtag Entity
- `id`: Primary key
- `name`: Hashtag name
- `tweets`: Many-to-many relationship with Tweet

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Test Coverage
```bash
npm run test:cov
```

### E2E Tests
```bash
npm run test:e2e
```

### Watch Mode
```bash
npm run test:watch
```

## 📝 Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start in production mode
- `npm run build` - Build the application
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint code with ESLint
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:cov` - Run tests with coverage
- `npm run seed` - Seed database with sample data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 👥 Authors

- **PannnTastic** - *Initial work* - [Your GitHub](https://github.com/PannnTastic)

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - The progressive Node.js framework
- [TypeORM](https://typeorm.io/) - Amazing ORM for TypeScript
- [PostgreSQL](https://www.postgresql.org/) - Powerful open source database

---

**Happy Coding! 🚀**
