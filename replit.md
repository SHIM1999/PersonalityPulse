# MBTI Personality Test Application

## Overview

This is a modern, interactive MBTI (Myers-Briggs Type Indicator) personality test application that combines traditional questionnaire-based assessment with AI-powered photo analysis. The application provides a game-like experience with beautiful animations and comprehensive personality reports.

## System Architecture

### Full-Stack Architecture
- **Frontend**: React with TypeScript using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **File Uploads**: Multer middleware for handling photo uploads
- **Animations**: Framer Motion for smooth UI transitions

### Monorepo Structure
The application follows a monorepo structure with clear separation:
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Shared TypeScript types and schemas

## Key Components

### Frontend Components
- **Landing Page**: Hero section with feature highlights and test initiation
- **Photo Upload**: Drag-and-drop photo upload with preview functionality
- **Questionnaire**: Interactive question flow with animated card flips
- **Results**: Comprehensive MBTI results with sharing capabilities
- **UI Components**: Complete shadcn/ui component library integration

### Backend Services
- **Test Session Management**: CRUD operations for test sessions
- **Photo Upload Handling**: File upload processing and storage
- **MBTI Calculation**: Algorithm to determine personality type from answers
- **Storage Abstraction**: In-memory storage with interface for future database integration

### Database Schema
```typescript
testSessions {
  id: serial (primary key)
  sessionId: text (unique identifier)
  photoPath: text (uploaded photo location)
  answers: jsonb (user responses)
  result: jsonb (calculated MBTI result)
  completed: boolean (test completion status)
  createdAt: timestamp (creation date)
}
```

## Data Flow

1. **Session Creation**: User starts test → backend creates session → session ID stored in localStorage
2. **Photo Upload**: User uploads photo → multer processes file → photo path saved to session
3. **Questionnaire**: User answers questions → answers stored progressively → final answers trigger MBTI calculation
4. **Results Generation**: MBTI algorithm processes answers → comprehensive result object created → test marked as completed
5. **Results Display**: Frontend fetches completed session → results rendered with sharing options

## External Dependencies

### Core Framework Dependencies
- **React 18**: UI library with hooks and modern patterns
- **Express.js**: Backend web framework
- **Drizzle ORM**: Type-safe database ORM for PostgreSQL
- **Neon Database**: Serverless PostgreSQL database provider

### UI and Styling
- **shadcn/ui**: Pre-built accessible component library
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible UI primitives
- **Framer Motion**: Animation library for React

### Development Tools
- **TypeScript**: Type safety across the entire application
- **Vite**: Fast build tool and development server
- **ESBuild**: Fast JavaScript bundler for production builds

## Deployment Strategy

### Replit Configuration
- **Runtime**: Node.js 20 with PostgreSQL 16
- **Development**: `npm run dev` starts both frontend and backend concurrently
- **Production Build**: `npm run build` creates optimized client bundle and server build
- **Production Start**: `npm run start` serves the built application

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment setting (development/production)

### File Structure
```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions
├── server/          # Express backend
│   ├── routes.ts    # API route definitions
│   ├── storage.ts   # Data access layer
│   └── index.ts     # Server entry point
├── shared/          # Shared types and schemas
└── uploads/         # File upload directory
```

### Build Process
1. Frontend builds to `dist/public/` using Vite
2. Backend builds to `dist/` using ESBuild
3. Static files served from built frontend directory
4. API routes prefixed with `/api/`

## Changelog

- June 26, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.