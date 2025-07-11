# API Endpoints Documentation

## Authentication Endpoints

### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "string",
  "surname": "string", 
  "email": "string",
  "confirmEmail": "string",
  "password": "string",
  "confirmPassword": "string",
  "businessName": "string (optional)",
  "businessDescription": "string (optional)",
  "photos": ["string"] (optional),
  "website": "string (optional)"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "number",
    "name": "string",
    "surname": "string",
    "email": "string",
    "businessName": "string|null",
    "businessDescription": "string|null", 
    "photos": ["string"],
    "website": "string|null",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "token": "string"
}
```

### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "number",
    "name": "string",
    "surname": "string", 
    "email": "string",
    "businessName": "string|null",
    "businessDescription": "string|null",
    "photos": ["string"],
    "website": "string|null",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "token": "string"
}
```

### POST /auth/logout
Logout (returns success message).

**Response:**
```json
{
  "message": "Logout successful"
}
```

## Protected User Endpoints

All user endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

### GET /user
Get all users (requires authentication).

### GET /user/:id  
Get user by ID (requires authentication).

### POST /user
Create a new user (requires authentication).

### PATCH /user/:id
Update user by ID (requires authentication).

### DELETE /user/:id
Delete user by ID (requires authentication).

## Authentication Flow

1. **Register**: POST /auth/register → Returns JWT token
2. **Login**: POST /auth/login → Returns JWT token  
3. **Use Protected Endpoints**: Include `Authorization: Bearer <token>` header
4. **Logout**: POST /auth/logout → Clear token on client side

## Password Requirements

- Minimum 8 characters
- Maximum 50 characters
- Must contain at least one uppercase letter
- Must contain at least one lowercase letter  
- Must contain at least one number
- Must contain at least one special character (@$!%*?&)

## JWT Token

- Expires in 24 hours
- Contains user ID and email
- Required for all protected endpoints
- Send in Authorization header as Bearer token 