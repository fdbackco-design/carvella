# Carbella - Premium Italian Kitchenware

## Overview

Carbella is a premium Italian kitchenware brand website showcasing traditional handcrafted knives, cutting boards, and kitchen tools. The application presents a luxury brand story dating back to 1890, with product showcases, customer reviews, and contact functionality. Built as a full-stack web application with a React frontend and Express backend, it emphasizes elegant design and user experience to reflect the premium nature of the Italian craftsmanship.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for home, brand story, products, reviews, and contact
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design system
- **Styling**: Tailwind CSS with custom design tokens for warm, premium brand colors and typography
- **State Management**: TanStack Query for server state management and form handling with React Hook Form
- **Design System**: Custom color palette with warm earth tones, serif fonts for headings (Playfair Display), and elegant spacing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for contacts and reviews with proper error handling and validation
- **Storage**: In-memory storage implementation with interface for easy database migration
- **Middleware**: JSON parsing, CORS handling, request logging, and error handling middleware
- **Development**: Vite integration for hot module replacement in development mode

### Data Layer
- **Schema Definition**: Drizzle ORM schema with PostgreSQL dialect for users, contacts, and reviews
- **Validation**: Zod schemas for runtime type validation on both client and server
- **Type Safety**: Shared TypeScript types between frontend and backend via shared schema
- **Database Ready**: Configured for PostgreSQL with Neon Database integration, currently using in-memory storage

### Form Handling
- **Contact Forms**: React Hook Form with Zod validation for contact inquiries and review submissions
- **Validation**: Client-side and server-side validation with user-friendly error messages
- **UX**: Toast notifications for form submission feedback and loading states

### Development Environment
- **Build System**: Vite with React plugin for fast development and optimized production builds
- **Development Tools**: ESBuild for server bundling, TypeScript for type checking
- **Hot Reload**: Vite middleware integration for seamless development experience
- **Code Quality**: Consistent imports and path aliases for clean code organization

## External Dependencies

### UI and Styling
- **Radix UI**: Comprehensive primitive components for accessibility and functionality
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built component library built on Radix UI primitives

### Database and ORM
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL support
- **Neon Database**: Serverless PostgreSQL database (configured but not yet connected)
- **Database Migrations**: Drizzle Kit for schema management and migrations

### Development and Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds
- **React Hook Form**: Performant form library with minimal re-renders

### API and Data Fetching
- **TanStack Query**: Powerful data synchronization for React applications
- **Zod**: Runtime type validation and schema definition
- **Express.js**: Web application framework for Node.js

### Replit-Specific
- **Replit Vite Plugins**: Development banner, error overlay, and cartographer for enhanced Replit experience

The application is designed with scalability in mind, using interfaces for storage that allow easy migration from in-memory to database storage, and a clean separation of concerns between frontend and backend layers.