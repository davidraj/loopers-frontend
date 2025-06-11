# 🎬 TV Shows Frontend

A modern React application for managing and viewing TV shows data. This frontend connects to a Rails API backend to provide a complete TV shows management system.

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed and running
- Git
- Node.js 18+ (if running locally without Docker)

### 🐳 Docker Setup (Recommended)

1. **Clone the repository**
```bash
git clone <your-frontend-repo-url>
cd frontend
```

2. **Start with Docker Compose**
```bash
# Make sure you're in the looper directory where docker-compose.yml is located
cd /Users/davidrajsamuel/Documents/looper

# Start all services (backend + frontend)
docker-compose up --build

# Or start in background
docker-compose up -d --build
```

3. **Access the application**
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000

### 💻 Local Development Setup

1. **Install dependencies**
```bash
npm install
```

2. **Set environment variables**
```bash
# Create .env file
echo "REACT_APP_API_URL=http://localhost:3000" > .env
echo "REACT_APP_DEBUG=false" >> .env
```

3. **Start development server**
```bash
npm start
```

## 🏗️ Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout/
│   │   ├── TVShowCard/
│   │   └── LoadingSpinner/
│   ├── pages/              # Page components
│   │   ├── Home.js
│   │   ├── TVShows.js
│   │   └── Analytics.js
│   ├── services/           # API services
│   │   └── api.js
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── styles/             # CSS/SCSS files
│   ├── App.js
│   └── index.js
├── Dockerfile
├── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:3000` | Yes |
| `REACT_APP_DEBUG` | Enable debug logging | `false` | No |
| `CHOKIDAR_USEPOLLING` | File watching (Docker) | `true` | No |
| `WATCHPACK_POLLING` | Webpack polling (Docker) | `true` | No |

### Docker Environment
```yaml
environment:
  - REACT_APP_API_URL=http://localhost:3000
  - REACT_APP_DEBUG=false
  - CHOKIDAR_USEPOLLING=true
  - WATCHPACK_POLLING=true
```

### Local Development Environment
```bash
# .env file
REACT_APP_API_URL=http://localhost:3000
REACT_APP_DEBUG=false
```

## 🎯 Features

### 📺 TV Shows Management
- **View All Shows**: Browse paginated list of TV shows
- **Show Details**: View detailed information about each show
- **Search & Filter**: Find shows by title, genre, or status
- **Create New Shows**: Add new TV shows to the database
- **Edit Shows**: Update existing show information
- **Delete Shows**: Remove shows from the database

### 📊 Analytics Dashboard
- **Episode Statistics**: View episode counts and averages
- **Genre Distribution**: Analyze shows by genre
- **Performance Metrics**: Track show ratings and popularity

### 🎨 UI/UX Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Real-time Updates**: Live data synchronization

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format
```

### Docker Commands

```bash
# Build frontend container
docker-compose build frontend

# Start frontend service
docker-compose up frontend

# Restart frontend after changes
docker-compose restart frontend

# View frontend logs
docker-compose logs -f frontend

# Access frontend container shell
docker-compose exec frontend sh

# Install new npm packages
docker-compose exec frontend npm install <package-name>
```

## 🔌 API Integration

### API Service Configuration

The frontend uses Axios for API communication:

```javascript
// src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const tvShowsAPI = {
  getAllShows: (params = {}) => api.get('/api/v1/tv_shows', { params }),
  getShow: (id) => api.get(`/api/v1/tv_shows/${id}`),
  createShow: (data) => api.post('/api/v1/tv_shows', { tv_show: data }),
  updateShow: (id, data) => api.put(`/api/v1/tv_shows/${id}`, { tv_show: data }),
  deleteShow: (id) => api.delete(`/api/v1/tv_shows/${id}`),
  // ... more endpoints
};
```

### API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/v1/tv_shows` | Get all TV shows |
| GET | `/api/v1/tv_shows/:id` | Get single TV show |
| POST | `/api/v1/tv_shows` | Create new TV show |
| PUT | `/api/v1/tv_shows/:id` | Update TV show |
| DELETE | `/api/v1/tv_shows/:id` | Delete TV show |
| GET | `/api/v1/distributors` | Get all distributors |
| GET | `/api/v1/analytics/episode_stats` | Get episode statistics |

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- TVShows.test.js
```

### Test Structure

```
src/
├── __tests__/              # Test files
│   ├── components/
│   ├── pages/
│   └── services/
├── __mocks__/              # Mock files
└── setupTests.js           # Test configuration
```

### Writing Tests

```javascript
// Example test
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TVShows from '../pages/TVShows';

test('renders TV shows page', () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <TVShows />
    </QueryClientProvider>
  );
  expect(screen.getByText(/TV Shows/i)).toBeInTheDocument();
});
```

## 🚀 Deployment

### Production Build

```bash
# Create production build
npm run build

# Serve production build locally
npx serve -s build
```

### Docker Production

```dockerfile
# Multi-stage Dockerfile for production
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Environment-Specific Builds

```bash
# Development
REACT_APP_API_URL=http://localhost:3000 npm run build

# Staging
REACT_APP_API_URL=https://api-staging.yourapp.com npm run build

# Production
REACT_APP_API_URL=https://api.yourapp.com npm run build
```

## 🐛 Troubleshooting

### Common Issues

#### 1. **CORS Errors**
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Ensure backend CORS is configured to allow `http://localhost:3001`

#### 2. **API Connection Failed**
```
Network Error - Make sure the Rails API is running
```
**Solutions**:
- Check if backend is running: `curl http://localhost:3000/health`
- Verify `REACT_APP_API_URL` environment variable
- Check Docker network connectivity

#### 3. **Environment Variables Not Loading**
```
process.env.REACT_APP_API_URL is undefined
```
**Solutions**:
- Restart development server after changing `.env`
- Ensure variables start with `REACT_APP_`
- Check Docker environment configuration

#### 4. **Hot Reload Not Working in Docker**
```
Changes not reflecting in browser
```
**Solution**: Ensure polling is enabled:
```yaml
environment:
  - CHOKIDAR_USEPOLLING=true
  - WATCHPACK_POLLING=true
```

#### 5. **Build Failures**
```
npm ERR! Failed at the build script
```
**Solutions**:
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`
- Check for TypeScript/ESLint errors

### Debug Mode

Enable debug logging:
```bash
# In docker-compose.yml
environment:
  - REACT_APP_DEBUG=true
```

Or locally:
```bash
echo "REACT_APP_DEBUG=true" >> .env
```

### Logs and Monitoring

```bash
# View frontend logs
docker-compose logs -f frontend

# View all service logs
docker-compose logs -f

# Monitor network requests
# Open browser DevTools > Network tab
```

## 📦 Dependencies

### Core Dependencies
- **React 18**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **React Query**: Data fetching and caching
- **React Hook Form**: Form management

### Development Dependencies
- **Create React App**: Build tooling
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **React Testing Library**: Component testing

### Full Dependency List
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "axios": "^1.3.0",
    "@tanstack/react-query": "^4.24.0",
    "react-hook-form": "^7.43.0"
  },
  "devDependencies": {
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "eslint": "^8.34.0",
    "prettier": "^2.8.4"
  }
}
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   npm test
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Style

- Use ESLint and Prettier for code formatting
- Follow React best practices
- Write tests for new features
- Use meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue on GitHub
- **Backend API**: See backend documentation at `/Users/davidrajsamuel/Documents/looper/README.md`

## 🔗 Related Projects

- **Backend API**: Rails application at `/Users/davidrajsamuel/Documents/looper`
- **Database**: PostgreSQL with TV shows schema
- **Cache**: Redis for session management

---

**Happy coding! 🎉**