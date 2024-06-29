import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import User from "@/components/Dashboard/user";

export const metadata: Metadata = {
  title:
    "Approvalize",
  description: "This is the approvalize dashboard.",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <User />
      </DefaultLayout>
    </>
  );
}