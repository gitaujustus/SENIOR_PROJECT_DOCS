"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"


interface ApplicationWithUserData {
    id: number;
    citizenId: number;
    jobId: number;
  //   status: 'pending' | 'approved' | 'rejected';
    status: string;
    abstractFile?: string;
    curriculumVitae?: string;
    citizen: {
      id: number;
      fullName: string;
      nationalID: string;
      address: string;
      phone: string;
      email: string;
      kra: string;
    };
  }

//   Fetch all applications
  export async function getAllApplications(): Promise<ApplicationWithUserData[]> {
    try {
      const applications = await prisma.application.findMany({
        include: {
          citizen: true,
        },
      });
  
      const result: ApplicationWithUserData[] = applications.map(app => ({
        id: app.id,
        citizenId: app.citizenId,
        jobId: app.jobId,
        status: app.status,
        abstractFile: app.abstractFile || undefined,
        curriculumVitae: app.curriculumVitae || undefined,
        citizen: {
          id: app.citizen.id,
          fullName: app.citizen.fullName,
          nationalID: app.citizen.nationalID,
          address: app.citizen.address,
          phone: app.citizen.phone,
          email: app.citizen.email,
          kra: app.citizen.kra,
        },
      }));
  
      return result;
    } catch (error) {
      console.error("Error fetching applications with user data:", error);
      return [];
    }
  }


// update a single applications
type status= 'pending' | 'approved' | 'rejected'

export const updateJobStatus= async(id:number, newStatus:status )=>{
    
    
  try {
    await prisma.application.update({
      where: { id },
      data: { status: newStatus },
    });


  } catch (error) {
    console.log("an error occured updating job status", error);
    return {error: "error updating the job status"}
  }finally{
    revalidatePath('/admin/applications')
  }

}

