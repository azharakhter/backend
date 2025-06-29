# NASA API Backend Service 🚀

A robust Node.js backend service for NASA's Open APIs, built with Express.js and modern backend best practices.

![Architecture Diagram](architecture.png) *(Consider adding a diagram)*

## Features ✨
- **API Gateway** for NASA's endpoints:
  - Astronomy Picture of the Day (APOD)
  - Mars Rover Photos
  - Near Earth Objects (NEO)
- **Redis caching** for improved performance
- **Comprehensive error handling**
- **Request validation**
- **Logging and monitoring**
- **Rate limiting**
- **Security headers**

## Project Structure 🏗️
/backend
├── /config # Environment configurations
├── /controllers # Route controllers
├── /middlewares # Custom middleware
│ ├── apiLogger.js # Request logging
│ ├── errorHandler.js # Error handling
│ └── rateLimiter.js # Rate limiting
├── /routes # Route definitions
├── /services # Business logic
│ ├── cacheService.js # Redis integration
│ └── nasaService.js # NASA API client
├── /utils # Utilities
│ ├── dateUtils.js # Date helpers
│ ├── logger.js # Winston logger
│ └── validationUtils.js # Validation
├── app.js # Main application
└── server.js # Server entry point


## Key Technical Decisions 🧠

### 1. Layered Architecture
- **Controller Layer**: Handles HTTP requests/responses
- **Service Layer**: Contains business logic
- **Data Access Layer**: Communicates with NASA APIs
- **Middleware Layer**: Cross-cutting concerns

### 2. Security
- **Helmet.js**: Secure HTTP headers
- **CORS**: Restricted origins
- **Rate Limiting**: 100 requests/15 minutes
- **Input Validation**: All user input sanitized

### 3. Performance
- **Redis Caching**: 
  - APOD responses cached for 1 hour (configurable)
  - Mars photos cached with rover-specific keys
- **Request Timeout**: 10 seconds for NASA API calls

### 4. Reliability
- **Error Handling**:
middler ware


. Observability
Winston Logging:

Structured JSON logging

Separate error/combined logs

Console formatting in development

Request Logging Middleware:

Tracks method, path, status, duration

Logs errors with full context




Endpoint	Method	Description	Parameters
/api/apod	GET	Astronomy Picture of the Day	date (YYYY-MM-DD)
/api/mars/photos	GET	Mars Rover Photos	rover, earth_date
/api/neo	GET	Near Earth Objects	start_date, end_date



# .env.example
NASA_API_KEY=your_api_key
REDIS_HOST=localhost
REDIS_PORT=6379
CACHE_ENABLED=true
CACHE_TTL=3600
RATE_LIMIT_MAX=100
CORS_ORIGIN=http://localhost:5173





Setup Instructions 🛠️
Install dependencies:

bash
npm install
Configure environment:

bash
cp .env.example .env
Start Redis (if using caching):

bash
docker run -p 6379:6379 redis
Run the server:

bash
npm start # Production
npm run dev # Development
