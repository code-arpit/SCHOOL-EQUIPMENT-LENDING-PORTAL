# School Equipment Lending Portal

A comprehensive web-based platform for managing school equipment borrowing, approvals, and returns. Built with React, Next.js, and TypeScript.

## Features

### 🔐 User Authentication & Roles
- Role-based access control (Admin, Staff, Student)
- Token-based authentication
- Secure login and registration

### 📦 Equipment Management
- Add, edit, and delete equipment items
- Track equipment categories (Sports, Lab, Electronics, Music, Other)
- Monitor equipment condition and availability
- Real-time availability updates

### 📋 Borrowing Request System
- Students can request equipment
- Staff/Admin can approve or reject requests
- Track borrowing periods with start and end dates
- Automatic overlap detection to prevent double-booking
- Mark equipment as returned

### 📊 Dashboard & Analytics
- Admin dashboard with system-wide statistics
- Staff dashboard for request management
- Student dashboard with personalized request tracking
- Visual stats cards and quick action buttons

### 🔍 Search & Filter
- Search equipment by name or description
- Filter by category (Sports, Lab, Electronics, Music, Other)
- Filter by availability status
- Real-time search results

## Demo Accounts

The system comes with pre-configured demo accounts:

- **Admin**: admin@school.edu / admin123
- **Staff**: staff@school.edu / staff123
- **Student**: student1@school.edu / student123

## Tech Stack

- **Frontend**: React 19, Next.js 16
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Language**: TypeScript
- **State Management**: React Hooks, SWR
- **Authentication**: Token-based (localStorage)
- **Database**: In-memory mock data (easily replaceable with real database)

## Project Structure

\`\`\`
├── app/
│   ├── admin/          # Admin dashboard pages
│   ├── staff/          # Staff dashboard pages
│   ├── student/        # Student dashboard pages
│   ├── api/            # REST API routes
│   │   ├── auth/       # Authentication endpoints
│   │   ├── equipment/  # Equipment CRUD endpoints
│   │   └── requests/   # Borrowing request endpoints
│   └── page.tsx        # Login page
├── components/
│   ├── auth/           # Authentication components
│   ├── borrowing/      # Borrowing request components
│   ├── dashboard/      # Dashboard components
│   ├── equipment/      # Equipment management components
│   ├── layout/         # Layout components (Sidebar, etc.)
│   └── ui/             # Reusable UI components
├── lib/
│   ├── data/           # Mock database files
│   │   ├── users.ts
│   │   ├── equipment.ts
│   │   └── borrowing.ts
│   ├── auth.ts         # Authentication utilities
│   └── utils.ts        # Helper functions
└── public/             # Static assets
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Equipment
- `GET /api/equipment` - Get all equipment (with filters)
- `POST /api/equipment` - Add new equipment (Admin only)
- `GET /api/equipment/[id]` - Get equipment by ID
- `PUT /api/equipment/[id]` - Update equipment (Admin only)
- `DELETE /api/equipment/[id]` - Delete equipment (Admin only)

### Borrowing Requests
- `GET /api/requests` - Get all requests (with filters)
- `POST /api/requests` - Create new request
- `GET /api/requests/[id]` - Get request by ID
- `PATCH /api/requests/[id]` - Update request status

## Key Features Implementation

### Role-Based Access Control
Each user type has access to different features:
- **Admin**: Full system access, user management, equipment CRUD
- **Staff**: Request approval/rejection, equipment viewing
- **Student**: Browse equipment, create requests, track own requests

### Overlap Detection
The system prevents double-booking by checking for overlapping date ranges when approving requests.

### Automatic Availability Updates
Equipment availability is automatically updated when:
- A request is approved (decreases available quantity)
- Equipment is returned (increases available quantity)
- A request is rejected (restores available quantity if previously approved)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser
5. Login with one of the demo accounts

## Future Enhancements

- Connect to a real database (PostgreSQL, MongoDB, etc.)
- Implement JWT authentication with refresh tokens
- Add email notifications for request approvals
- Generate borrowing reports and analytics
- Add barcode/QR code scanning for equipment
- Implement equipment maintenance tracking
- Add image uploads for equipment
- Create mobile responsive PWA

## License

MIT License - Built as a demonstration project for school equipment management.
