const config = {
  port: process.env.PORT || 5000,
  host: process.env.HOST || "admin.myapp.local",
  backendBaseUrl: process.env.BACKEND_BASE_URL || "https://back.myapp.local",
  backendAuthEndpoint: process.env.BACKEND_AUTH_ENDPOINT || "/auth/",
  backendApiEndpoint: process.env.BACKEND_API_ENDPOINT || "/api/",
  author: process.env.SITE_AUTHOR || "del001",
  appName: process.env.APP_NAME || "My app",
};

export default config;
