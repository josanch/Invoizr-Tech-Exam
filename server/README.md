# Server-Side README

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Setup Instructions Condensed](#setup-instructions-condensed)

## Overview
This is the server-side application for the **Invoyce Tech Exam** project. Built using **Node.js** and **NestJS**, it provides a RESTful API for managing users and invoices. The server interacts with a **PostgreSQL** database through **Prisma ORM**.

## Features
- **Authentication:** Secure login with JWT-based authentication.
- **PostgreSQL Database:** Data storage using Prisma ORM.
- **Validation:** DTO validation using **class-validator** and **class-transformer**.
- **Dockerized Environment:** Easily deployable using Docker.

### API Endpoints

#### Authentication
- `POST /auth/login`: Authenticate a user.

#### Invoices
- `GET /invoices`: Retrieve all invoices.
- `GET /invoices/:id`: Retrieve details of a specific invoice.

#### Users
- `POST`: /users: Create new user
- `GET /users`: Retrieve all users
- `GET /users/:id`: Retrieve user by id

## Installation

### Prerequisites
- Node.js (v22+)
- npm manager
- Docker & Docker Compose

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/josanch/Invoizr-Tech-Exam
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```plaintext
   # Create empty file
   touch .env

   # Edit .env using nano or preferred editor
   # add the following snippet to .env file
   DATABASE_URL="postgresql://puseradm:wAXBy8EjLL3256V@localhost:5432/code-test-db"

   ```

4. Start PostgreSQL using Docker:
   ```bash
   # Go back to mono root
   cd ..
   # Run Docker Compose
   docker-compose up -d
   ```

5. Run Prisma migrations:
   ```bash
   # Go back to server folder
   cd server
   npx prisma migrate dev --name init
   ```

6. Seed the database:
   ```bash
   # seed the users
   npm run db:seedUsers
   # seed invoices
   npm run db:seedInvoices
   
   ```

7. Start the server:
   ```bash
   npm run start:dev
   ```

### Notes
- Ensure the `.env` file is properly configured before running the server.
- Error handling has been implemented minimally to meet project requirements.

## Setup Instructions Condensed

### Steps

1. Clone the repository.
2. Navigate to the `server` directory.
3. Run `npm install` to install dependencies.
4. From the root of the project folder, run `docker-compose up -d` to start the database.
5. From the server folder, run `npx prisma migrate init` to initialize the database.
6. In server folder run `npm run db:seeduser` to seed user data.
7. In server folder run `npm run db:seedInvoices` to seed invoice data.
8. Start the server with `npm run start:dev`.


## Project Structure
```plaintext
prisma/                  # Prisma client and migrations
src/
├── auth/                # Authentication module
├── invoices/            # Invoice management module
├── users/               # User management module
├── main.ts              # Entry point for the application
└── app.module.ts        # Root module for the application
```
### Users (Seed Data Example)
| Username              | Password   |
|-----------------------|------------|
| `john@example.com`    | `1234567`  |


## Project Notes
- The server will be running at `http://localhost:3000`.

### PostgreSQL Notes
      POSTGRES_USER: puseradm
      POSTGRES_PASSWORD: wAXBy8EjLL3256V
      POSTGRES_DB: code-test-db

