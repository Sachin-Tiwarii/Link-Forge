# LinkForge

**A Simple URL Shortener with Built-in QR Code Generation**

LinkForge is a web application that transforms long URLs into short, shareable links and generates QR codes for convenient access. Built with React and Node.js, it provides a straightforward way to create and share links across websites, documents, and mobile devices.

## Features

- **URL Shortening:** Convert long URLs into compact, shareable links.
- **QR Code Generation:** Automatically generate a QR code for each shortened URL.
- **One-Click Copy:** Copy shortened links to the clipboard for easy sharing.
- **URL Redirection:** Redirect visitors from shortened URLs to their original destinations.
- **Responsive Interface:** Access the application across desktop, tablet, and mobile devices.
- **Animated UI:** A modern landing page featuring interactive visual elements and polished styling.
- **Simple Workflow:** Create and share shortened links without unnecessary steps.

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- Lucide React
- QRCode React
- Three.js

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Nanoid

### Deployment
- Vercel — Frontend hosting
- Render — Backend hosting
- MongoDB Atlas — Cloud database

## Project Structure

```text
Link-Forege/
├── client-new/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── models/
│   │   └── Url.js
│   ├── routes/
│   │   └── urlRoutes.js
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Ensure that the following are installed or available:

- Node.js and npm
- MongoDB Atlas account or a MongoDB instance
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Sachin-Tiwarii/Link-Forge.git
cd Link-Forge
```

### 2. Configure the Backend

Navigate to the backend directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory. Add the environment variables required by your backend implementation.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
```

Use the exact MongoDB variable name expected by your server code. Replace the example connection string with your own credentials.

Start the backend using the script configured in `server/package.json`:

```bash
npm start
```

### 3. Configure the Frontend

Open another terminal from the project root:

```bash
cd client-new
npm install
```

Create a `.env` file inside `client-new`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal, typically `http://localhost:5173`.

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port used by the backend server |
| `MONGO_URI` | MongoDB connection string, if this is the variable used in your code |
| `BASE_URL` | Base URL used to construct shortened links |
| `VITE_API_BASE_URL` | Backend API base URL used by the frontend |

For production deployment, configure environment variables through the respective hosting dashboards. Set `BASE_URL` to the public backend URL and `VITE_API_BASE_URL` to the deployed backend origin. Keep credentials and `.env` files out of version control.

## Deployment

### Frontend — Vercel

1. Import the GitHub repository into Vercel.
2. Set the root directory to `client-new`.
3. Select Vite as the framework preset.
4. Set the build command to `npm run build`.
5. Set the output directory to `dist`.
6. Configure `VITE_API_BASE_URL` with your deployed backend URL.
7. Deploy the project.

### Backend — Render

1. Create a new Web Service and connect the GitHub repository.
2. Set the root directory to `server`.
3. Configure the build command as `npm install`.
4. Set the start command to match the script in `server/package.json`.
5. Add the required environment variables.
6. Ensure the backend accepts requests from your deployed frontend domain.

### Database — MongoDB Atlas

Configure a database in MongoDB Atlas, add the connection string to the backend environment variables, and ensure network access is configured for the deployed backend.

## How It Works

1. Enter a valid destination URL.
2. Submit the URL to the backend.
3. The backend generates a unique short code and stores the URL mapping in MongoDB.
4. LinkForge returns a shortened URL and generates a corresponding QR code.
5. Open the shortened URL to be redirected to the original destination.

## Security and Configuration

- Store credentials in environment variables.
- Never commit `.env` files or database credentials.
- Configure CORS to allow trusted frontend origins.
- Validate submitted URLs before processing them.
- Use secure database credentials and appropriate MongoDB network access rules.

## Future Improvements

Potential enhancements include:

- Custom short URLs
- Link expiration controls
- User accounts and link management
- Optional click analytics
- Enhanced URL validation and abuse prevention

## Author

**Sachin Tiwari**

Full-Stack Developer | AI & Data Science Undergraduate

- GitHub: [Sachin-Tiwarii](https://github.com/Sachin-Tiwarii)
- Portfolio: [im-sachin.vercel.app](https://sachin-tech.vercel.app/)

## License

This project is available for educational and personal use. Add a `LICENSE` file to the repository if you intend to distribute it under a specific open-source license.
