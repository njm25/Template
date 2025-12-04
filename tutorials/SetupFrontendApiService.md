# Setting Up Frontend API Service

Now that we have a backend endpoint set up, we are going to create a function on the frontend to interact with it. We will be using the HTTP client package axios to handle API requests from the client application.

## Installing Axios

### Step 1: Install Axios Package

Navigate to the client directory and install axios:

```bash
cd client
npm i axios
```

Axios is a popular HTTP client library that simplifies making API requests from your frontend application.

## Creating the API Handler

### Step 2: Create Services Directory

Create a new directory in your `client/src` folder named `services`:

```bash
mkdir client/src/services
```

### Step 3: Create API Handler File

Create a new file named `apiHandler.ts` in the `client/src/services` directory:

```bash
touch client/src/services/apiHandler.ts
```

### Step 4: Configure Axios Instance

Open the `apiHandler.ts` file and create an axios instance with the following configuration:

```typescript
import axios from "axios";

const apiHandler = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default apiHandler;
```

**Configuration explanation:**
- **baseURL** - Uses the `NEXT_PUBLIC_API_URL` environment variable as the base URL for all API requests
- **withCredentials** - Enables cookies and authentication headers to be sent with requests
- **headers** - Sets default headers for content type and accept type

This creates a reusable axios instance that is pre-configured with your API settings.

## Using the API Handler

### Step 5: Create API Functions

You can reference the apiHandler from any component or page by importing it. Create API functions in a dedicated handler file. For example, create `client/src/services/apiHandler/api/templateHandler.ts`:

```typescript
import apiHandler from "../apiHandler";


export const getSecret = async () => {
  const response = await apiHandler.get("/secret");
  return response.data;
};
```

These functions can then be imported and used in your React components to make API calls to your backend endpoints.