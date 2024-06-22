'use client'
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { TiTick } from 'react-icons/ti';
import { RxCrossCircled } from 'react-icons/rx';
import Topbar from '@/components/gok/topbar';
import supabase from '@/lib/supabaseClient';
import { getAllApplications } from '@/app/actions/handlingJobApplications/actions';
import { updateJobStatus } from '@/app/actions/handlingJobApplications/actions';

const statusClasses = {
  accepted: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  rejected: 'bg-red-100 text-red-800',
};

const Applications = () => {
  const [filter, setFilter] = useState('All');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});
  // console.log(applications);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedData = await getAllApplications();
        const applicationsWithUrls = await Promise.all(
          formattedData.map(async (application) => {
            const abstractUrl = application.abstractFile
              ? (await supabase.storage.from('applications').getPublicUrl(application.abstractFile)).data.publicUrl
              : null;
            const cvUrl = application.curriculumVitae
              ? (await supabase.storage.from('applications').getPublicUrl(application.curriculumVitae)).data.publicUrl
              : null;
            return {
              id: application.id,
              createdAt: application.createdAt,
              fullName: application.citizen?.fullName,
              nationalID: application.citizen?.nationalID,
              address: application.citizen?.address,
              phone: application.citizen?.phone,
              email: application.citizen?.email,
              kra: application.citizen?.kra,
              status: application.status,
              abstractFile: abstractUrl,
              curriculumVitae: cvUrl,
            };
          })
        );
        const sortedApplications = applicationsWithUrls.sort((a, b) => {
          if (a.status === 'pending') return -1;
          if (b.status === 'pending') return 1;
          return 0;
        });
        setApplications(sortedApplications);
      } catch (error) {
        toast.error('Error fetching data', {
          duration: 4000,
          position: 'top-center',
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredApplications = filter === 'All' ? applications : applications.filter(application => application.status === filter);
 // Overview data
 const allJobs = applications;
 const verifiedJobs = applications.filter(job => job.status === 'approved');
 const pending = applications.filter(job => job.status === 'pending');
 const rejectedJobs = applications.filter(job => job.status === 'rejected');
  


  // action to update the job status
  const UpdateJobStatus= async(applicationId, status)=>{
    console.log("started updating jobs", applicationId, status)
    setUpdating((prev) => ({ ...prev, [applicationId]: status }));
    try {
      const result=await updateJobStatus(applicationId, status)
      if (result?.error) throw new Error(`Error ${status === 'verified' ? 'approving' : 'rejecting'} job`)

        // update the ui
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === applicationId ? { ...app, status } : app
          )
        );
        
        toast.success(`Application ${status === 'verified' ? 'approved' : 'rejected'} successfully!`, {
          duration: 5000,
          position: 'top-center',
        });
    } catch (error) {
      toast.error(`Error ${status === 'verified' ? 'approving' : 'rejecting'} job!`, {
        duration: 5000,
        position: 'top-center',
      });
    }finally{
      setUpdating((prev) => ({ ...prev, [applicationId]: '' }));
    }
  }

  return (
    <div className="min-h-screen  sm:ml-64 ">
       <Topbar/>
      <h1 className="text-2xl mt-14 font-semibold mb-4 text-center">Applications</h1>

      {/* Overview section */}
      <div className='mx-2 my-4'>
      <h2 className="text-xl font-bold mb-4">Overview</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-wrap justify-around items-center">
        <div className="flex flex-col items-center px-1">
          <div className="text-4xl font-bold text-black">{allJobs?.length}</div>
          <div className="text-gray-600">Total</div>
        </div>
        <div className="flex flex-col items-center px-1">
          <div className="text-4xl font-bold text-green-500">{verifiedJobs?.length}</div>
          <div className="text-gray-600">Approved</div>
        </div>
        <div className="flex flex-col items-center px-1">
          <div className="text-4xl font-bold text-yellow-300">{pending?.length}</div>
          <div className="text-gray-600">Pending</div>
        </div>
        <div className="flex flex-col items-center px-1">
          <div className="text-4xl font-bold text-red-500">{rejectedJobs?.length}</div>
          <div className="text-gray-600">Rejected</div>
        </div>
      </div>
    </div>



      <div className="mb-4 px-1">
        <label htmlFor="statusFilter" className="mr-4">Filter by Status:</label>
        <select
          id="statusFilter"
          className="p-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className='bg-slate-200'>
              <th className="py-2 px-4 border-b text-left">Full Name</th>
              <th className="py-2 px-4 border-b text-left">National ID</th>
              <th className="py-2 px-4 border-b text-left">Address</th>
              <th className="py-2 px-4 border-b text-left">Phone</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">KRA</th>
              <th className="py-2 px-4 border-b text-left">Abstract</th>
              <th className="py-2 px-4 border-b text-left">CV</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ?  (
              <tr>
                <td colSpan="10" className="py-8 px-4 border-b text-center">
                  Loading...
                </td>
              </tr>
            ) :filteredApplications.length === 0 ? (
              <tr>
                <td colSpan="10" className="py-8 px-4 border-b text-center">
                  No applications found.
                </td>
              </tr>
            ): (
              filteredApplications.map(application => (
                <tr key={application.id}>
                  <td className="py-2 px-4 border-b">{application.fullName}</td>
                  <td className="py-2 px-4 border-b">{application.nationalID}</td>
                  <td className="py-2 px-4 border-b">{application.address}</td>
                  <td className="py-2 px-4 border-b">{application.phone}</td>
                  <td className="py-2 px-4 border-b">{application.email}</td>
                  <td className="py-2 px-4 border-b">{application.kra}</td>
                  <td className="py-2 px-4 border-b"><a href={application.abstractFile} target='_blank' className="font-medium text-blue-600 hover:underline">View</a></td>
                  <td className="py-2 px-4 border-b"><a href={application.curriculumVitae} target='_blank' rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">View</a></td>
                  <td className="py-2 px-4 border-b">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClasses[application.status]}`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b ">
                    {application.status === 'pending' && (
                      <div className='flex justify-center items-center '>
                        <button disabled={updating[application.id] === 'approved'} onClick={() => UpdateJobStatus(application.id, 'approved')} className="px-2 py-1 disabled:cursor-not-allowed bg-green-500 text-white rounded mr-2">{updating[application.id] === 'approved' ? 'Approving...' : 'Approve'}</button>
                        <button disabled={updating[application.id] === 'rejected'} onClick={() => UpdateJobStatus(application.id, 'rejected')} className="px-2 py-1 disabled:cursor-not-allowed bg-red-500 text-white rounded">{updating[application.id] === 'rejected' ? 'Rejecting...' : 'Reject'}</button>
                      </div>
                    )}
                    {application.status === 'approved' && (
                      <div className='flex justify-center'>
                        <button className="px-12 py-1 bg-green-100 cursor-not-allowed text-white rounded mr-2 disabled "> <TiTick color='green' size={20} /></button>
                      </div>
                    )}
                    {application.status === 'rejected' && (
                      <div className='flex justify-center'>
                        <button className="px-12 py-1 bg-red-100 cursor-not-allowed text-white rounded mr-2 disabled"><RxCrossCircled size={20} color='red'/></button>
                      </div>
                    )}
  
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  );
};

export default Applications;
