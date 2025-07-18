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

### GET /user/professionals
Get all professional users (public endpoint).

**Response:**
```json
[
  {
    "id": 1,
    "name": "Alice",
    "surname": "Johnson",
    "email": "alice.johnson@business.com",
    "businessName": "Johnson Photography",
    "businessDescription": "Professional photography services...",
    "photos": ["https://example.com/photo1.jpg"],
    "website": "https://johnsonphotography.com",
    "categoryId": 1,
    "category": {
      "id": 1,
      "name": "Fotografia",
      "description": "Serviços de fotografia profissional...",
      "icon": "📸"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /user/search?q=query
Search professionals by query (public endpoint).

**Query Parameters:**
- `q` (string): Search term for business name, description, or user name

**Response:** Same as professionals endpoint with filtered results.

### GET /user/category/:categoryId
Get professionals by category ID (public endpoint).

**Response:** Same as professionals endpoint with category-filtered results.

## Category Endpoints

### GET /category
Get all active categories (public endpoint).

**Response:**
```json
[
  {
    "id": 1,
    "name": "Fotografia",
    "description": "Serviços de fotografia profissional para eventos, casamentos, retratos e produtos",
    "icon": "📸",
    "isActive": true,
    "order": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /category/:id
Get category by ID with users (public endpoint).

**Response:**
```json
{
  "id": 1,
  "name": "Fotografia",
  "description": "Serviços de fotografia profissional para eventos, casamentos, retratos e produtos",
  "icon": "📸",
  "isActive": true,
  "order": 1,
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "surname": "Johnson",
      "email": "alice.johnson@business.com",
      "businessName": "Johnson Photography",
      "businessDescription": "Professional photography services...",
      "photos": "[\"https://example.com/photo1.jpg\"]",
      "website": "https://johnsonphotography.com"
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### GET /category/search/:name
Search categories by name (public endpoint).

### POST /category
Create a new category (requires authentication).

**Request Body:**
```json
{
  "name": "string",
  "description": "string (optional)",
  "icon": "string (optional)",
  "isActive": "boolean (optional)",
  "order": "number (optional)"
}
```

### PATCH /category/:id
Update category by ID (requires authentication).

### DELETE /category/:id
Delete category by ID (requires authentication).

## Review Endpoints

### POST /review
Create a new review (requires authentication).

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Excelente serviço! Muito profissional.",
  "professionalId": 1
}
```

**Response:**
```json
{
  "id": 1,
  "rating": 5,
  "comment": "Excelente serviço! Muito profissional.",
  "reviewerId": 2,
  "professionalId": 1,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### GET /review
Get all reviews (public endpoint).

### GET /review/professional/:professionalId
Get reviews for a specific professional (public endpoint).

### GET /review/professional/:professionalId/average
Get average rating for a professional (public endpoint).

**Response:**
```json
{
  "average": 4.5,
  "count": 10
}
```

### GET /review/:id
Get review by ID (public endpoint).

### PATCH /review/:id
Update review by ID (requires authentication, only own reviews).

### DELETE /review/:id
Delete review by ID (requires authentication, only own reviews).

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