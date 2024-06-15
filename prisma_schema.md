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
  nationalID      String       @unique  // Unique national ID of the citizen
  fullName        String       // Full name of the citizen
  address         String       // Address of the citizen
  phone           String       // Phone number of the citizen
  email           String       @unique  // Unique email of the citizen
  kra             String       @unique  // Unique KRA (Kenya Revenue Authority) number
  password        String       // Password for the citizen's account
  applications    Application[]  // Applications made by the citizen
}
```

## Agency
Represents an agency in a foreign country responsible for verifying and pooling job requests from companies in their country before submitting them to the Kenyan government.

```prisma
model Agency {
  id             Int        @id @default(autoincrement())
  country        String     @unique  // Unique name of the country
  iso            String     // ISO code of the country
  contractId     Int        @unique  // Unique contract ID associated with the agency
  contract       Contract   @relation(fields: [contractId], references: [id])  // Relation to the Contract model
  password       String     // Password for the agency's account
  companies      Company[]  // Companies associated with the agency
}
```
## Kles
Represents an administrative user in the Kenyan Labor Export System (KLES).

```prisma
model Kles {
  id          Int        @id @default(autoincrement())
  department  String     // Department of the KLES user
  email       String     @unique  // Unique email of the KLES user
  password    String     // Password for the KLES account
}
```

## Company
Represents a company that submits job requests through an agency.

```prisma
model Company {
  id              Int        @id @default(autoincrement())
  companyName     String     @unique  // Unique name of the company
  country         String     // Country where the company is located
  companyAddress  String     // Address of the company
  companyEmail    String     @unique  // Unique email of the company
  companyWebsite  String     // Website of the company
  companyIndustry String     // Industry the company belongs to
  password        String     // Password for the company's account
  agencyId        Int        // ID of the agency the company belongs to
  agency          Agency     @relation(fields: [agencyId], references: [id])  // Relation to the Agency model
  jobs            Job[]      // Jobs posted by the company
}

```

## Job
Represents a job request submitted by a company. The status of the job indicates its current state in the workflow (e.g., submitted, verified, approved, rejected).

```prisma
model Job {
  id             Int          @id @default(autoincrement())
  title          String       // Title of the job
  description    String       // Description of the job
  qualification  String       // Qualifications required for the job
  slots          Int          // Number of slots available for the job
  status         String       @default("submitted")  // Current status of the job request
  companyId      Int          // ID of the company that posted the job
  company        Company      @relation(fields: [companyId], references: [id])  // Relation to the Company model
  applications   Application[]  // Applications made for the job
}
```

## Application
Represents an application made by a citizen for a job.

```prisma
model Application {
  id              Int          @id @default(autoincrement())
  citizenId       Int          // ID of the citizen making the application
  citizen         Citizen      @relation(fields: [citizenId], references: [id])  // Relation to the Citizen model
  jobId           Int          // ID of the job being applied for
  job             Job          @relation(fields: [jobId], references: [id])  // Relation to the Job model
  abstractFile    String?      // Optional abstract file associated with the application
  curriculumVitae String?      // Optional CV associated with the application
  nationalID      String       // National ID of the citizen
  @@unique([citizenId, nationalID])  // Unique constraint on citizenId and nationalID combination
}
```

## Contract
Represents a contract associated with an agency> This contracts special IDs of 8 characters that are assigned to a certaing country after an agreement with kenyan government .

```prisma
model Contract {
  id          Int       @id @default(autoincrement())
  contractID  String    @unique  // Unique contract ID
  agencies    Agency[]  // Agencies associated with the contract
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


