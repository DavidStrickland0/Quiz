# Quiz Web App

An open-source web application for quizzes, built with an Angular front end and a C# API backend.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
5. [Backend API](#backend-api)
6. [Frontend](#frontend)
7. [Deployment](#deployment)
8. [Contributing](#contributing)
9. [License](#license)

## Project Overview

The **Quiz** web app is designed to provide a flexible and efficient way to create, manage, and participate in quizzes. It includes a modern Angular-based frontend for users and administrators and a C# API backend to handle quiz logic and data management.

## Features

- Create quizzes with multiple questions and answer options
- Support for both single and multiple correct answers
- Quiz progress tracking and the ability to resume quizzes
- JSON-based datastore for quiz questions and progress
- Auto-deploy functionality for seamless integration with Azure

## Technologies Used

- **Frontend**: Angular 18
- **Backend**: C# API built with .NET Core 6
- **Database**: JSON file as a datastore
- **Deployment**: Azure (auto-deployment configured via Dev.azure)

## Getting Started

### Prerequisites

To run the application locally, you will need:

- Node.js (v16 or higher)
- .NET SDK (v6 or higher)
- Angular CLI (v18 or higher)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-repo/quiz-app.git
    cd quiz-app
    ```

2. **Install frontend dependencies**:
    ```bash
    cd frontend
    npm install
    ```

3. **Install backend dependencies**:
    ```bash
    cd ../backend
    dotnet restore
    ```

### Running the Application

#### Frontend
To start the Angular frontend, run:

```bash
cd frontend
ng serve
```

The frontend should be available at `http://localhost:4200`.

#### Backend
To start the C# API backend, run:

```bash
cd backend
dotnet run
```

The API should be available at `http://localhost:5000`.

## Backend API

The backend API is responsible for managing quiz data and handling quiz-related logic. Key API endpoints include:

- `POST /api/quiz/start`: Starts a new quiz session
- `POST /api/quiz/submit`: Submits answers for a quiz
- `GET /api/quiz/progress`: Retrieves quiz progress for a user

All quiz data is stored in a JSON file that acts as a datastore.

## Frontend

The frontend is built using Angular and follows the standalone component architecture for modularity and ease of development. Key components include:

- **Quiz Creation Component**: Allows the creation of quizzes and questions.
- **Quiz Taker Component**: Enables users to take quizzes and submit answers.
- **Progress Tracker**: Tracks the user's progress across multiple sessions.

## Deployment

The app is configured to automatically deploy to Azure when changes are committed to the repository. Follow these steps for manual deployment:

1. **Configure Azure Services**:
    Ensure you have the required Azure resources set up, such as App Services and SQL Database (if needed).
   
2. **Commit and Push Changes**:
    Push changes to the `dev` branch on Dev.azure to trigger the automated deployment pipeline.

3. **Monitor Deployment**:
    Deployment status can be monitored via the Azure portal or by checking the logs in the Dev.azure pipeline.

## Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
