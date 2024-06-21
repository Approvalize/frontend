// components/Dashboard/ECommerce.tsx

 "use client";
import React, { useState } from "react";
import CardDataStats from "../CardDataStats";

const ECommerce: React.FC = () => {
  const [cards, setCards] = useState([
    { id: 1, title: "Card 1", status: "Pending" },
    { id: 2, title: "Card 2", status: "Pending" },
    { id: 3, title: "Card 3", status: "Pending" },
    // Add more cards as needed
  ]);

  const moveCardToApproved = (id: number) => {
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, status: "Approved" } : card
    );
    setCards(updatedCards);
  };

  const moveCardToRejected = (id: number) => {
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, status: "Rejected" } : card
    );
    setCards(updatedCards);
  };

  const moveCardToPending = (id: number) => {
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, status: "Pending" } : card
    );
    setCards(updatedCards);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      <CardDataStats
        title="Pending"
        cards={cards.filter((card) => card.status === "Pending")}
        onApprove={moveCardToApproved}
        onDisapprove={moveCardToRejected}
      />
      <CardDataStats
        title="Approved"
        cards={cards.filter((card) => card.status === "Approved")}
        onApprove={moveCardToApproved}
        onDisapprove={moveCardToRejected}
      />
      <CardDataStats
        title="Rejected"
        cards={cards.filter((card) => card.status === "Rejected")}
        onApprove={moveCardToApproved}
        onDisapprove={moveCardToRejected}
      />
    </div>
  );
};

export default ECommerce;
