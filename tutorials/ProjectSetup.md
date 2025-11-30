# Project Setup Guide

Welcome to the first tutorial in a series dedicated to providing a simple jumping off point for any full stack application.

## Technology Stack

This project is built on modern web technologies:

- **Node.js** - JavaScript runtime environment
- **Express** - Backend web framework
- **Next.js** - React framework for production
- **Tailwind CSS** - Utility-first CSS framework
- **Database** - To be determined

## Architecture Overview

This is a monolithic codebase where both frontend and backend solutions exist in the same repository. This helps to simplify development, deployment, and code sharing between client and server components.

## Prerequisites

Before you begin, ensure you have Node.js and npm installed on your system. You can verify this by running:

```bash
node --version
npm --version
```

## Initial Setup

### Step 1: Create Project Structure

Start by creating the basic directory structure for your project:

```bash
mkdir client server
```

### Step 2: Initialize Root Package

Navigate to your project root and initialize the root package.json:

```bash
npm init
```

Follow the prompts to set up your root package configuration.

### Step 3: Install Concurrent Execution Tool

To run both frontend and backend simultaneously during development, install `concurrently`:

```bash
npm install concurrently
```

This tool allows you to execute multiple npm scripts in parallel, making development more efficient.

## Frontend Setup

### Step 4: Create Next.js Application

Navigate to the client directory and create a new Next.js application:

```bash
cd client
npx create-next-app
```

**Recommended settings:**
- Accept Tailwind CSS when prompted (this is the styling framework we'll be using)
- Skip additional linting configurations (optional, based on your preference)

The `create-next-app` command will scaffold a complete Next.js project with all necessary configuration files and scripts.

### Step 5: Install Frontend Dependencies

After the Next.js setup completes, ensure all dependencies are properly installed:

```bash
npm install
```

### Step 6: Clean Up Generated Files

Review the generated files and remove any unnecessary code that you won't be using. This helps keep your project clean and focused.

## Backend Setup

### Step 7: Initialize Backend Package

Navigate to the server directory and initialize the backend package:

```bash
cd ../server
npm init
```

Follow the initialization prompts to configure your backend package.json.

### Step 8: Install Backend Dependencies

Install the essential backend dependencies:

```bash
npm install express
npm install nodemon
```

- **Express** - Web framework for building the API server
- **Nodemon** - Development tool that automatically restarts the server when files change

### Step 9: Configure Backend Scripts

Open `server/package.json` and add the following development script under the `scripts` section:

```json
"dev": "nodemon index.js"
```

### Step 10: Create Express Server

Create a new file `server/index.js` and set up a basic Express server:

```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

## Root Configuration

### Step 11: Configure Root Scripts

Return to the root directory and open `package.json`. Add the following scripts to enable concurrent execution of both frontend and backend:

```json
"scripts": {
  "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
  "dev:server": "cd server && npm run dev",
  "dev:client": "cd client && npm run dev"
}
```

These scripts will:
- `dev` - Run both server and client simultaneously
- `dev:server` - Run only the backend server
- `dev:client` - Run only the frontend client

## Running the Application

### Step 12: Start Development Servers

From the root directory, execute:

```bash
npm run dev
```

This single command will start both your frontend and backend development servers concurrently in the same terminal window. You'll see output from both processes, making it easy to monitor the entire application.