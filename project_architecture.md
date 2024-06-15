# System Architecture

## High-Level Architecture Diagram
![High-Level Architecture Diagram](https://res.cloudinary.com/donr6ggui/image/upload/v1718477418/pwydrappanrnpvwe48cf.jpg)

## Components Description

### Frontend
The frontend of the KLES is built using the Next.js framework with React. It is responsible for the user interface and user experience. Key features include:
- **Authentication**: Handles user login and registration using NextAuth.
- **User Interfaces for Different Roles**: Provides distinct interfaces for Kenyan workers, Kenyan Government officials, foreign government officials, and foreign companies.
- **Responsive Design**: Ensures usability across various devices.

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
