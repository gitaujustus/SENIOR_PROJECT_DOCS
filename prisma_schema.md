# Prisma Schema Documentation

## Datasource and Generator

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

```

# Models

## Citizen
Represents a citizen of Kenya who can apply for jobs.

```prisma
model Citizen {
  id              Int          @id @default(autoincrement())
  nationalID      String       @unique  
  fullName        String       
  address         String       
  phone           String        
  email           String       @unique  
  kra             String       @unique  
  password        String       
  applications    Application[]  
}
```

## Agency
Represents an agency in a foreign country responsible for verifying and pooling job requests from companies in their country before submitting them to the Kenyan government.

```prisma
model Agency {
  id             Int        @id @default(autoincrement())
  country        String     @unique  
  iso            String     
  contractId     Int        @unique  
  contract       Contract   @relation(fields: [contractId], references: [id]) 
  password       String     
  companies      Company[] 
}
```
## Kles
Represents an administrative user in the Kenyan Labor Export System (KLES).

```prisma
model Kles {
  id          Int        @id @default(autoincrement())
  department  String    
  email       String     @unique  
  password    String     
}
```

## Company
Represents a company that submits job requests through an agency.

```prisma
model Company {
  id              Int        @id @default(autoincrement())
  companyName     String     @unique  
  country         String     
  companyAddress  String     
  companyEmail    String     @unique  
  companyWebsite  String     
  companyIndustry String     
  password        String     
  agencyId        Int        
  agency          Agency     @relation(fields: [agencyId], references: [id])  
  jobs            Job[]      
}

```

## Job
Represents a job request submitted by a company. The status of the job indicates its current state in the workflow (e.g., submitted, verified, approved, rejected).

```prisma
model Job {
  id             Int          @id @default(autoincrement())
  title          String       
  description    String       
  qualification  String       
  slots          Int          
  status         String       @default("submitted")  
  companyId      Int          
  company        Company      @relation(fields: [companyId], references: [id]) 
  applications   Application[]  
}
```

## Application
Represents an application made by a citizen for a job.

```prisma
model Application {
  id              Int          @id @default(autoincrement())
  citizenId       Int          
  citizen         Citizen      @relation(fields: [citizenId], references: [id])  
  jobId           Int          
  job             Job          @relation(fields: [jobId], references: [id])  
  abstractFile    String?      
  curriculumVitae String?      
  nationalID      String       
  @@unique([citizenId, nationalID])  
}
```

## Contract
Represents a contract associated with an agency. This contracts special IDs of 8 characters that are assigned to a certaing country after an agreement with kenyan government .

```prisma
model Contract {
  id          Int       @id @default(autoincrement())
  contractID  String    @unique  
  agencies    Agency[]  
}
```

# Relationships

## Citizen-Application: One-to-Many
A citizen can have multiple applications.

## Agency-Company: One-to-Many
An agency can have multiple companies.

## Company-Job: One-to-Many
A company can have multiple jobs.

## Job-Application: One-to-Many
A job can have multiple applications.

## Contract-Agency: One-to-Many
A contract can have multiple agencies.


