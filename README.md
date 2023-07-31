# Todo-Backend

## Hello

This section demonstrates how to call the `/Hello` endpoint and receive the response on a GET request.

### Introduction

The `/Hello` endpoint is a simple API that responds with an HTML page containing a greeting message.

### API Endpoint

- **GET /Hello**
  - Description: Retrieve a greeting message.
  - Response:

    ```html
    <div>
      <h1>Hi There.</h1><br/>
      <h2>Thanks for calling on http://todo-backend-s7y5.onrender.com/Hello</h2>
    </div>
    ```

## User APIs

This repository contains the implementation of a RESTful API for user signup, login, logout, and profile management.

### Introduction

The Signup, Login, Logout, and Profile API provides endpoints to handle user registration, authentication, and profile management. It follows RESTful conventions and returns data in JSON format.

### Getting Started

To get started with this API, follow the steps below:

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Configure the database and environment variables needed for the API.
4. Run the API server locally or deploy it to your preferred hosting service.

### API Endpoints

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
    Authorization: <JWT Token>
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

## Task APIs

This repository contains the implementation of a RESTful API for task management, including creating, retrieving, updating, and deleting tasks.

### Introduction

The Task API provides endpoints to manage tasks, including creating new tasks, retrieving existing tasks, updating task details, and deleting tasks. It follows RESTful conventions and returns data in JSON format.

### API Endpoints

- **POST /api/v1/task/CreateTask**
  - Description: Create a new task.
  - Request Body: 
    ```json
    {
      "title": "Task Title",
      "description": "Task description goes here"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "message": "Task Created Successfully!"
    }
    ```

- **GET /api/v1/task/GetAllTasks**
  - Description: Get all tasks.
  - Response:
    ```json
    {
      "success": true,
      "data": [
        {
          "_id": "UniqueId",
          "title": "Task1",
          "description": "Complete Task 1",
          "isCompleted": false,
          "Deadline": "Deadline set",
          "Created_at": "Task creation date and time",
          "__v": 0
        },
        // Additional tasks...
      ]
    }
    ```

- **PUT /api/v1/tasks/:taskId**
  - Description: Update the details of a specific task by its ID.
  - Request Body: 
    ```json
    {
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "message": "Task Updated Successfully!"
    }
    ```

- **DELETE /api/v1/tasks/:taskId**
  - Description: Delete a specific task by its ID.
  - Response:
    ```json
    {
      "success": true,
      "message": "Task Deleted Successfully!",
    }
    ```

## Profile APIs

This repository contains the implementation of a RESTful API for user profile management, including uploading, retrieving, and removing profile pictures.

### Introduction

The Profile API provides endpoints to manage user profiles, including uploading profile pictures, retrieving profile pictures, and removing profile pictures. It follows RESTful conventions and returns data in JSON format.

### API Endpoints

- **POST /api/v1/profile/UploadProfile**
  - Description: Upload a user's profile picture.
  - Request Body: 
    The request body should contain the image file to be uploaded.
  - Response:
    ```json
    {
      "success": true,
      "message": "Profile Picture Uploaded Successfully!"
    }
    ```

- **GET /api/v1/profile/GetProfile**
  - Description: Get the user's profile picture.
  - Response:
    - Binary Image Data

- **DELETE /api/v1/profile/RemoveProfilePic**
  - Description: Remove the user's profile picture.
  - Response:
    ```json
    {
      "success": true,
      "message": "Profile Picture Removed Successfully!",
    }
    ```
