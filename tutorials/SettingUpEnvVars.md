# Setting Up Environment Variables

Before moving on, let's set up environment variables for both the frontend and backend. Using environment variables lets you store things like configuration settings outside your code, so you can easily switch between enviornments without changing the source code.

## Initial Configuration

### Step 1: Configure Git Ignore

Before creating any `.env` files, ensure they are excluded from version control. This prevents accidentally committing sensitive configuration data to your repository.

Open the `.gitignore` file in your project root and add the following entries if they are not already present:

```gitignore
# Environment variables
server/.env
client/.env.local
client/.env
.env
.env.local
.env*.local
```

This ensures that environment files are never committed to version control.

## Backend Configuration

### Step 2: Create Backend Environment File

Navigate to the server directory and create a new file named `.env`:

```bash
cd server
touch .env
```

### Step 3: Configure Backend Variables

Open the `.env` file and add the following configuration:

```env
PORT=3001
CLIENT_URL=http://localhost:3000
```

- **PORT** - Specifies the port number on which the Express server will listen for incoming requests
- **CLIENT_URL** - Defines the origin URL of the frontend application, used by CORS middleware to determine which origins are allowed to make requests

## Frontend Configuration

### Step 4: Create Frontend Environment File

Navigate to the client directory and create a new file named `.env.local`:

```bash
cd ../client
touch .env.local
```

**Note:** Next.js automatically loads `.env.local` files. This file should be used for local development variables that you don't want to commit to version control.

### Step 5: Configure Frontend Variables

Open the `.env.local` file and add the following configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

- **NEXT_PUBLIC_API_URL** - The base URL for all API requests made from the client application. The `NEXT_PUBLIC_` prefix is required in Next.js to expose the variable to the browser-side code.