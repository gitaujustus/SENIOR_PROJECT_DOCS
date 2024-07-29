# System Architecture

## High-Level Architecture Diagram
![High-Level Architecture Diagram](https://res.cloudinary.com/donr6ggui/image/upload/v1718477418/pwydrappanrnpvwe48cf.jpg)

## Components Description

### Frontend
The frontend of the KLES is built using the Next.js framework with React. It is responsible for the user interface and user experience. Key features include:
- **Authentication**: Handles user login and registration using NextAuth.
- **User Interfaces for Different Roles**: Provides distinct interfaces for Kenyan workers, Kenyan Government officials, foreign government officials, and foreign companies.
- **Responsive Design**: Ensures usability across various devices.


### API Used for Communications between the Frontend and Backend
The API routes in the Next.js framework handle communication between the frontend and backend. These routes provide endpoints for various functionalities such as user authentication, job posting, application matching, and status tracking.



### Backend
The backend is also managed by Next.js, serving full-stack functionality. Key features include:
- **API Routes**: Next.js server actions expose the endpoints for frontend interaction.
- **Authentication & Authorization**: Managed by NextAuth for secure user sessions and permissions.
- **Business Logic**: Implements core functionalities, such as job posting, approval workflows, and application matching.

### Database
The database is managed using Supabase with Prisma as the ORM. Key aspects include:
- **Schemas**: Defines the structure for users, job postings, applications, and other entities.
- **Data Integrity**: Ensures consistent and reliable data storage and retrieval.
- **Scalability**: Designed to handle growing amounts of data and users.


## Components Interaction
- **Frontend-Backend Communication**: Utilizes Next.js API routes for interaction between frontend and backend.
- **Backend-Database Interaction**: Prisma ORM facilitates database operations with Supabase.


# Dependencies
```json
{
  "name": "labour-export-system",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbo",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "count-lines": "cloc . --exclude-dir=node_modules,.next"
  },
  "dependencies": {
    "@auth/prisma-adapter": "^2.1.0",
    "@hookform/resolvers": "^3.4.0",
    "@prisma/client": "^5.14.0",
    "@react-pdf/renderer": "^3.4.4",
    "@supabase/supabase-js": "^2.43.4",
    "@types/node": "^20.12.12",
    "@types/react": "^18.3.2",
    "bcrypt": "^5.1.1",
    "chart.js": "^4.4.2",
    "lucide-react": "^0.408.0",
    "next": "14.2.3",
    "next-auth": "^4.24.7",
    "nprogress": "^0.2.0",
    "react": "^18",
    "react-chartjs-2": "^5.2.0",
    "react-dom": "^18",
    "react-hook-form": "^7.51.5",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^5.2.1",
    "supabase": "^1.169.8",
    "tailwind-merge": "^2.3.0",
    "tailwindcss-animate": "^1.0.7",
    "webpack": "^5.92.1",
    "webpack-node-externals": "^3.0.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/formidable": "^3.4.5",
    "@types/node": "^20.12.12",
    "@types/nprogress": "^0.2.3",
    "@types/react": "^18.3.2",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "prisma": "^5.14.0",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
