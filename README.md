# Note App Backend

REST API for a note-taking application with user authentication and note management.

## Tech Stack

- **Runtime**: Node.js + TypeScript (ESM modules)
- **Framework**: Express 5
- **Database**: PostgreSQL (via `pg`)
- **Validation**: Zod
- **Authentication**: JWT (access + refresh tokens) + bcrypt
- **Rate Limiting**: express-rate-limit
- **Linting**: ESLint + typescript-eslint

## Features

### Authentication
- User registration with email and password validation
- Login returns a short-lived access token (15 min) and a long-lived refresh token (7 days)
- Refresh token rotation - old token is invalidated on each refresh
- Reuse detection - if a previously used refresh token is presented, all user sessions are revoked
- Logout by removing the refresh token from the database
- Automatic cleanup of expired refresh tokens on login

### Notes
- Full CRUD (create, read, update, delete)
- Paginated listing (20 per page) sorted by creation date
- Favorite/unfavorite notes
- Notes are isolated per user - authorization enforced at the SQL query level

### Account Management
- Fetch current user data
- Delete account with cascading removal of all notes and tokens

### Security
- JWT Bearer authentication middleware
- Rate limiting - global (100 req/min) and stricter on auth routes (10 req/min)
- Custom CORS middleware
- Parameterized SQL queries (SQL injection protection)
- Password hashing with bcrypt (cost factor 12)

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | No | Register a new user |
| POST | `/auth/login` | No | Log in and receive tokens |
| POST | `/auth/logout` | No | Log out (revoke refresh token) |
| POST | `/auth/refresh` | No | Refresh access and refresh tokens |
| GET | `/users/me` | Yes | Get current user data |
| DELETE | `/users/me` | Yes | Delete account |
| GET | `/notes` | Yes | List notes (paginated, `?page=1`) |
| POST | `/notes` | Yes | Create a note |
| GET | `/notes/:noteId` | Yes | Get a single note |
| PUT | `/notes/:noteId` | Yes | Update a note |
| DELETE | `/notes/:noteId` | Yes | Delete a note |
| PATCH | `/notes/:noteId` | Yes | Set favorite status |

## Project Structure

```
src/
  app.ts                  # Express app setup and route mounting
  config/
    config.ts             # App configuration (env variables)
    db.ts                 # PostgreSQL connection pool
  controllers/            # Request parsing and validation
  services/               # Business logic
  repositories/           # Database queries
  middlewares/
    auth.ts               # JWT verification middleware
    cors.ts               # CORS headers
    errorHandler.ts       # Central error handler
    rateLimit.ts          # Rate limiting configuration
  types/
    errors/               # ApiError and DomainError classes
    user.ts, note.ts, auth.ts   # Types and Zod schemas
  utils/
    jwt.ts                # Token generation and verification
    getEnv.ts             # Environment variable helper
init.sql                  # Database schema (users, notes, refresh_tokens)
```

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file:
   ```
   PORT=3000
   CORS_ORIGIN=http://localhost:5173
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=note_app
   ACCESS_TOKEN_SECRET=your_access_secret
   REFRESH_TOKEN_SECRET=your_refresh_secret
   ```

3. Initialize the database:
   ```
   psql -d note_app -f init.sql
   ```

4. Run in development:
   ```
   npm run dev
   ```

5. Build and run in production:
   ```
   npm run build
   npm start
   ```
