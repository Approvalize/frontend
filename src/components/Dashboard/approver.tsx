"use client";
import React, { useState, useEffect } from "react";
import ReviewCard from "@/components/CardApprover";
import { useUser } from "@/components/UserContext";

interface Review {
  _id: string;
  avatarText: string;
  title: string;
  subheader: string;
  content: string;
  description: string;
  status: string;
  approvers: string;
  onApprove?: () => void; 
  onReject?: () => void; 
}

const Approver: React.FC = () => {
  const { userId } = useUser();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  

  const fetchRequests = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/applications/approver/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }
      const data = await response.json();
      console.log(data);
      // Process each request to fetch usernames for approverPath
      const updatedRequests = await Promise.all(data.map(async (req: any) => {
        // Fetch usernames for approverPath
        const usernames = await Promise.all(req.approverPath.map(async (approverId: string) => {
          try {
            const userResponse = await fetch(`http://localhost:5000/api/users/${approverId}`);
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

        // Return updated request object with approvers
        return {
          ...req,
          approvers: approvers
        };
      }));

      setReviews(updatedRequests);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setError("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchRequests(userId);
    }
  }, [userId]);

  const handleApprove = async (id: string) => {

    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/applications/${id}/approve`,{
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`         
      }})

    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review._id === id ? { ...review, status: "approved" } : review
      )
    );
  };  

  const handleReject = async (id: string) => {

    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/applications/${id}/reject`,{
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`         
      }})

    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review._id === id ? { ...review, status: "rejected" } : review
      )
    );
  };

  const renderReviews = (status: "pending" | "approved" | "rejected") => {
    return reviews
      .filter((review) => review.status === status)
      .map((review) => (
        <ReviewCard
          key={review._id}
          avatarText={review.avatarText}
          title={review.title}
          subheader={review.subheader}
          content={review.content}
          description={`${review.description}\n${review.approvers}`}
          // Conditionally render approve and reject buttons based on status
          onApprove={status === "pending"
            ? () => handleApprove(review._id)
            : () => { } // Pass undefined to not render the button
          }
          onReject={status === "pending"
            ? () => handleReject(review._id)
            : () => { } // Pass undefined to not render the button
          } status={"pending"}        />
      ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-bold w-60 mb-2 p-4 text-white bg-black text-center rounded-md">
          Pending
        </h2>
        <div className="space-y-4 pt-2">{renderReviews("pending")}</div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-bold w-60 mb-2 p-4 text-white bg-black text-center rounded-md">
          Accepted
        </h2>
        <div className="space-y-4 pt-2">{renderReviews("approved")}</div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-bold w-60 mb-2 p-4 text-white bg-black text-center rounded-md">
          Rejected
        </h2>
        <div className="space-y-4 pt-2">{renderReviews("rejected")}</div>
      </div>
    </div>
  );
};

export default Approver;
