# Todo-backend

This repository contains the implementation of a RESTful API for user signup, login, logout, and profile management.

## Introduction

The Signup, Login, Logout, and Profile API provides endpoints to handle user registration, authentication, and profile management. It follows RESTful conventions and returns data in JSON format.

## Getting Started

To get started with this API, follow the steps below:

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Configure the database and environment variables needed for the API.
4. Run the API server locally or deploy it to your preferred hosting service.

## API Endpoints

The following are the available endpoints in this API:

- **POST /api/v1/user/signUp**
  - Description: Register a new user account.
  - Request Body: 
    
    ```json
    {
      "username": "user123",
      "email": "user@example.com",
      "password": "password123"
    }
    ```
    
  - Response:
    
    ```json
    {
      "success": true,
      "message": "User Created Successfully!"
    }
    ```
    
    - Cookie :
    
      ```json
      {
        "token": "<JWT Token>"
      }
      ```

- **POST /api/v1/user/login**
  - Description: Authenticate and login a user.
  - Request Body: 
    
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
    
  - Response:
    
    ```json
    {
      "success": true,
      "message": "Authentication Successful!"
    }
    ```
    
    - Cookie :
    
      ```json
      {
        "token": "<JWT Token>"
      }
      ```

- **GET /api/v1/user/logout**
  - Description: Logout the currently logged-in user.
  - Response:
    
    ```json
    {
      "success": true,
      "message": "Logged out successfully!"
    }
    ```

- **GET /api/v1/user/GetUserProfile**
  - Description: Get the user's profile information.
  - Authorization Header: 
    
    ```
    Authorization:  <JWT Token>
    ```
    
  - Response:
    
    ```json
    {
      "success": true,
      "message": {
          "_id": "UniqueId",
          "name": "user123",
          "email": "user@example.com",
          "Created_at": "Date of User Creation",
          "__v": 0
      }
    }
    ```

## Authentication

This API uses JSON Web Tokens (JWT) for authentication. The `POST /api/v1/user/login` endpoint returns a JWT token upon successful authentication. To access secure routes like `GET api/v1/user/GetUser/Profile`, first authenticate the token sent as a cookie from the server.



