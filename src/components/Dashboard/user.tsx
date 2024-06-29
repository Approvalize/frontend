"use client";
import React from "react";
import ReviewCard from "@/components/CardUser";

const User: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold w-60 mb-2 p-4 text-white bg-black text-center rounded-md">Pending</h2> 
          <div className="space-y-4 pt-2">
          <ReviewCard
            avatarText="R"
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2017"
            content="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
            description="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
            /*imageURL="/static/images/cards/paella.jpg"*/
          />
          <ReviewCard
            avatarText="R"
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
            content="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
            /*imageURL="/static/images/cards/paella.jpg"*/
            description="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
          />
          <ReviewCard
            avatarText="R"
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
            content="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
            /*imageURL="/static/images/cards/paella.jpg"*/
            description="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
          />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold w-60 mb-2 p-4 text-white bg-black text-center rounded-md">Accepted</h2> 
          <div className="space-y-4 pt-2">
          <ReviewCard
            avatarText="R"
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
            content="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
            /*imageURL="/static/images/cards/paella.jpg"*/
            description="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
          />
          <ReviewCard
            avatarText="R"
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
            content="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
            /*imageURL="/static/images/cards/paella.jpg"*/
            description="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
          />
          <ReviewCard
            avatarText="R"
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
            content="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
            /*imageURL="/static/images/cards/paella.jpg"*/
            description="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
          />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold w-60 mb-2 p-4 text-white bg-black text-center rounded-md">Rejected</h2> 
          <div className="space-y-4 pt-2">
          <ReviewCard
            avatarText="R"
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
            content="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
            description="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
          />
          <ReviewCard
            avatarText="R"
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
            content="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
            description="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
            /*imageURL="/static/images/cards/paella.jpg"*/
          />
          <ReviewCard
            avatarText="R"
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
            content="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
            description="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
            /*imageURL="/static/images/cards/paella.jpg"*/
          />
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
