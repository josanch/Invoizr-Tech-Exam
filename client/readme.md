# Client Side Application

This is the client-side application for the project, built using ReactJS with TypeScript, powered by Vite for blazing-fast development. It incorporates modern tools and technologies to create a highly responsive and maintainable front-end.

## Table of Contents

- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Features](#features)
- [Design Guide](#design-guide)
- [Limitations](#limitations)

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v16+ recommended)
- npm or yarn package manager

## Technologies Used
- React (with TypeScript)
- Vite
- TailwindCSS
- Zod
- FontAwesome
- Redux Toolkit
- React Router
- TanStack Table
- jwt-decode

## Installation
### Steps

1. Clone the repository.
2. Navigate to the `client` directory.
3. Run `npm install` to install dependencies.
4. Start the client with `npm run dev`.

## Client Run Instructions
- https://localhost:5173

## Features
- Dashboard
    - User counts
    - Invoice counts
- 404 catch all
- Register new uses
- Logged / logged out indicator
- Invoices table
    - invoice details in modal window
- Playwright Test(s) - located at root of project
    - Test to log in and check if the invoice page has invoices

## Design Guide

**Colors**
- Yellow accent: #FFA015
- Left Sidebar Graadiant: #4A90E2, #A3C7F7 

## Limitations
While the majority of the project is complete and fully functional, the following features were not successfully implemented due to time constraints. However, they can be added with additional time:

- search not implemented
- alerts not implemented
- theme dark / white not implemented

Despite these omissions, the rest of the solution works as intended and meets the project requirements.