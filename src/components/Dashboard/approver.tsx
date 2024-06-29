"use client";
import React, { useState } from "react";
import ReviewCard from "@/components/CardApprover";

interface Review {
  id: number;
  avatarText: string;
  title: string;
  subheader: string;
  content: string;
  description: string;
  status: "pending" | "approved" | "rejected";
}

const Approver: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      avatarText: "R",
      title: "Shrimp and Chorizo Paella",
      subheader: "September 14, 2017",
      content: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      status: "pending",
    },
    {
      id: 2,
      avatarText: "R",
      title: "Shrimp and Chorizo Paella",
      subheader: "September 14, 2017",
      content: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      status: "approved",
    },
    {
      id: 3,
      avatarText: "R",
      title: "Shrimp and Chorizo Paella",
      subheader: "September 14, 2017",
      content: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      status: "rejected",
    },
    {
      id: 4,
      avatarText: "R",
      title: "Shrimp and Chorizo Paella",
      subheader: "September 14, 2017",
      content: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      status: "pending",
    },
    {
      id: 5,
      avatarText: "R",
      title: "Shrimp and Chorizo Paella",
      subheader: "September 14, 2017",
      content: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      status: "pending",
    },
    {
      id: 6,
      avatarText: "R",
      title: "Shrimp and Chorizo Paella",
      subheader: "September 14, 2017",
      content: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      status: "rejected",
    },
  ]);

  const handleApprove = (id: number) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, status: "approved" } : review
      )
    );
  };

  const handleReject = (id: number) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, status: "rejected" } : review
      )
    );
  };

  const renderReviews = (status: "pending" | "approved" | "rejected") => {
    return reviews
      .filter((review) => review.status === status)
      .map((review) => (
        <ReviewCard
          key={review.id}
          avatarText={review.avatarText}
          title={review.title}
          subheader={review.subheader}
          content={review.content}
          description={review.description}
          onApprove={() => handleApprove(review.id)}
          onReject={() => handleReject(review.id)}
        />
      ));
  };

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
