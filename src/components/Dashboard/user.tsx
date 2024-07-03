"use client";
import React, { useState, useEffect } from "react";
import ReviewCard from "@/components/CardUser";

const User: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const userId = "667813720d4eb70bee60e62f"; // Replace with actual userId or retrieve dynamically
    fetchRequests(userId);
  }, []);

  const fetchRequests = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/applications/user/${userId}`); // Adjust the endpoint according to your backend route
      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }
      const data = await response.json();

      // Process each request to fetch usernames for approverPath
      const updatedRequests = await Promise.all(data.map(async (req: any) => {
        // Fetch usernames for approverPath
        const usernames = await Promise.all(req.approverPath.map(async (approverId: string) => {
          try {
            const userResponse = await fetch(`http://localhost:5000/api/users/${approverId}`); // Adjust endpoint to fetch user details
            if (!userResponse.ok) {
              throw new Error("Failed to fetch user details");
            }
            const userData = await userResponse.json();
            return userData.username; // Assuming username is available in user data
          } catch (error) {
            console.error("Error fetching user details:", error);
            return "Unknown User";
          }
        }));

        // Construct description with usernames
        const approvers = usernames.map((username, index) => `Approver ${index + 1}: ${username}`).join(", ");

        // Return updated request object with description
        return {
          ...req,
          approvers: approvers
        };
      }));

      setRequests(updatedRequests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold w-60 mb-2 p-4 text-white bg-black text-center rounded-md">Pending</h2> 
          <div className="space-y-4 pt-2">
            {requests.filter(req => req.status === "pending").map(req => (
              <ReviewCard
                key={req._id}
                avatarText={req.creatorId.substring(0, 1)}
                title={req.title}
                subheader={new Date(req.createdAt).toLocaleDateString()}
                description={req.approvers} 
                content={req.description} 
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold w-60 mb-2 p-4 text-white bg-black text-center rounded-md">Accepted</h2> 
          <div className="space-y-4 pt-2">
            {requests.filter(req => req.status === "accepted").map(req => (
              <ReviewCard
                key={req._id}
                avatarText={req.creatorId.substring(0, 1)}
                title={req.title}
                subheader={new Date(req.createdAt).toLocaleDateString()}
                description={req.approvers} 
                content={req.description}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold w-60 mb-2 p-4 text-white bg-black text-center rounded-md">Rejected</h2> 
          <div className="space-y-4 pt-2">
            {requests.filter(req => req.status === "rejected").map(req => (
              <ReviewCard
                key={req._id}
                avatarText={req.creatorId.substring(0, 1)}
                title={req.title}
                subheader={new Date(req.createdAt).toLocaleDateString()}
                description={req.approvers} 
                content={req.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
