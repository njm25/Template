# Setting Up Backend Routes

Now that we have our environment variables configured, we can set up a basic backend route. This tutorial will guide you through configuring CORS (Cross-Origin Resource Sharing) and creating a simple API endpoint.

## Prerequisites

Before proceeding, ensure you have:
- Completed the environment variables setup (see `SettingUpEnvVars.md`)
- Your Express server initialized in `server/index.js`
- The `cors` package installed (if not already present)

## CORS Configuration

### Step 1: Install CORS Package

If you haven't already installed the `cors` package, navigate to your server directory and install it:

```bash
cd server
npm install cors
```

CORS is a security feature that allows your frontend application (running on a different origin) to make requests to your backend API.

### Step 2: Configure CORS Middleware

Open your `server/index.js` file and ensure your Express app is initialized:

```javascript
const app = express();
```

Then, add the CORS configuration after your app initialization:

```javascript
// Enable CORS for all routes
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
```

**Configuration explanation:**
- **origin** - Uses the `CLIENT_URL` environment variable from your `.env` file to specify which frontend origin is allowed to make requests
- **methods** - Defines which HTTP methods are permitted (GET, POST, PUT, DELETE, OPTIONS)
- **allowedHeaders** - Specifies which headers the client can send with requests
- **credentials** - Enables cookies and authentication headers to be sent cross-origin

This configuration ensures that your frontend application (running on the URL specified in `CLIENT_URL`) can successfully communicate with your backend API.

## Creating a Backend Route

### Step 3: Create a Simple Endpoint

Now we'll create a simple "secret" endpoint that returns a message. Add the following route to your `server/index.js` file:

```javascript
app.get("/secret", (req, res) => {
  res.status(200).send("This is a secret!!!!");
});
```

This creates a GET endpoint at `/secret` that:
- Responds with a 200 status code
- Returns a simple text message