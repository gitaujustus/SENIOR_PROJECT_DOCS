# System Design and Internal Workings

## Introduction
The Kenyan Labor Export System (KLES) is an integrated platform designed to streamline and manage the process of labor export from Kenya to various foreign countries. The system ensures transparency, security, and efficiency in handling job requests, applications, and approvals, while safeguarding the rights and well-being of Kenyan workers. This documentation outlines the detailed internal workings of the system, including the roles and interactions of different users.

## Detailed Process Flow

### 1. Job Request Initiation by Foreign Company
**Role: Foreign Company**

Foreign companies are the initial users in the job request process. They are responsible for creating and submitting job requests, which include details such as job title, required skills, number of slots, job description, benefits, and salary range. When a foreign company submits a job request, its status is marked as `Submitted`.

**Foreign Company Interface: Job Request Page**
![Job Request Interface](https://res.cloudinary.com/donr6ggui/image/upload/v1719513782/twiz8qfbznw2ijtra8yf.jpg)

In this interface, foreign companies can fill out the necessary details and submit the job request. The interface typically includes fields for job title, skills required, number of vacancies, detailed job description, and compensation package.

### 2. Review and Verification by Foreign Government
**Role: Foreign Government (Agency)**

The foreign government, represented by an agency, receives job requests from various foreign companies within their country. The agency's role is to review these job requests and verify their authenticity and compliance with regulations. The agency can either verify or reject each job request. Verified requests are pooled together for submission to the Kenyan Government, while rejected requests are marked as `Rejected by Foreign Government`.

**Foreign Government Interface: Job Request Pool**
![Foreign Government Interface](https://res.cloudinary.com/donr6ggui/image/upload/v1719513782/m7dpznckgvk2ljt02bae.jpg)


The interface for the foreign government allows them to see a list of all submitted job requests from their country's companies. They can review each request, verify its details, and decide whether to approve or reject it. Verified requests are then grouped together for a collective submission to the Kenyan Government.

### 3. Pooled Submission to Kenyan Government
**Role: Foreign Government (Agency)**

After verifying the job requests, the foreign government agency submits the pooled requests to the Kenyan Government. This submission involves multiple job requests that have been verified and are now ready for approval by the Kenyan authorities. At this stage, the status of each job request changes to `Requested`.


### 4. Review and Approval by Kenyan Government
**Role: Kenyan Government**

The Kenyan Government receives the pooled job requests from various foreign governments. Their responsibility is to review these requests, ensuring they meet the necessary standards and are beneficial for Kenyan workers. The Kenyan Government can either accept or reject each request. Accepted requests change their status to `Accepted` by Kenyan Government, while rejected requests are marked as `Denied` by Kenyan Government.

**Kenyan Government Interface: Job Request Review Page**
![Kenyan Government Interface](https://res.cloudinary.com/donr6ggui/image/upload/v1719513782/aqhoxd3viihxsynyzpto.jpg)
In this interface, Kenyan government officials can view and assess all incoming job requests from different countries. They can approve or deny each request based on criteria such as job quality, worker rights, and alignment with national labor policies.

### 5. Job Availability for Kenyan Workers
**Role: Kenyan Citizen**

Once the Kenyan Government approves a job request, it becomes available to Kenyan workers. These job opportunities are displayed on the Kenyan citizen's job listings page, where workers can view and apply for them. Each worker can have up to two active applications at any given time. The status of these jobs is now `Available`.

**Kenyan Citizen Interface: Job Listings Page**
![Job Listings Interface](https://res.cloudinary.com/donr6ggui/image/upload/v1719513783/oabbfj6thfkc8hbgownh.jpg)


This page provides a list of all available job opportunities that have been approved by the Kenyan Government. Workers can search, filter, and apply for jobs based on their skills and interests. Each listing includes detailed information about the job, company, and benefits.

### 6. Job Application by Kenyan Workers
**Role: Kenyan Citizen**

Kenyan workers can apply for jobs listed on the platform. They need to fill out an application form and submit necessary documents, such as resumes and certificates. Each worker can maintain up to two active applications simultaneously. The status of these applications is marked as `Application Submitted`.

**Kenyan Citizen Interface: Job Application Page**
![Job Application Interface](https://res.cloudinary.com/donr6ggui/image/upload/v1719513782/tz6y2ywokrwcswqpdl1o.jpg)
In this interface, workers can complete their job applications by providing personal details, uploading required documents, and submitting their application for review. The system ensures that each worker can only apply for two jobs at a time to manage the application process efficiently.

### 7. Screening and Selection by Kenyan Government
**Role: Kenyan Government**

The Kenyan Government reviews the applications submitted by Kenyan workers. This involves screening candidates, conducting interviews, and making final selections. The government can accept or reject applications based on their suitability for the job. If an application is accepted, its status changes to `Application Accepted`, and if rejected, it becomes `Application Rejected`.

**Kenyan Government Interface: Application Review Page**

This interface allows government officials to evaluate applications, conduct interviews, and make decisions on whether to accept or reject candidates. It provides tools for detailed screening and communication with applicants.

### 8. Notification to Kenyan Workers
**Role: Kenyan Citizen**

Kenyan workers are notified about the status of their job applications through their profile page. They can check for updates on whether their applications have been accepted or rejected. The system also sends automatic notifications to ensure workers are informed in a timely manner.

**Kenyan Citizen Interface: Profile Page**

The profile page displays the current status of all applications submitted by the worker. It includes notifications about acceptance, rejection, or any additional steps required.

### 9. Export Process
**Role: Kenyan Government and Kenyan Citizen**

For applications that are accepted, the Kenyan Government facilitates the export process. This involves completing necessary documentation and making arrangements for the worker's relocation to the foreign country. The status of these applications is marked as `Exported`.

**Kenyan Citizen Interface: Export Documentation Page**

This interface helps workers and government officials manage the export process, including document submission, travel arrangements, and compliance with legal requirements.

## Additional Functionalities

### Job Request and Application Management
- **Open/Close Requests:** Both agencies and Kenyan citizens can open or close job requests and applications.
- **Updates:** Agencies and Kenyan Government can send updates to their respective users (Kenyan workers or foreign companies).

**Interface: Job Request and Application Management Page**

This page provides tools for managing job requests and applications, allowing users to open or close requests and send updates. It ensures smooth communication and workflow management across all user roles.

## Conclusion
The Kenyan Labor Export System (KLES) provides a comprehensive solution for managing labor export from Kenya. It ensures a transparent and efficient process involving multiple stakeholders, from job requests by foreign companies to the final selection and export of Kenyan workers. The system's detailed statuses and clear interfaces for each user role ensure a streamlined and secure workflow.
