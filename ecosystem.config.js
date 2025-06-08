module.exports = {
  apps: [
    {
      name: "soothing-backend",
      script: "./server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        MONGODB_URI: "mongodb+srv://<your-mongo-uri>",
        JWT_SECRET: "your_jwt_secret",
        CORS_ORIGIN: "https://your-frontend.netlify.app"
      }
    }
  ]
}
