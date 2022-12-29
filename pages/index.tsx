import type { NextPage } from "next";
import MainLayout from "../layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">Interview page</h1>
        <p>This is the project for a live coding...</p>
      </section>
    </MainLayout>
  );
};

export default Home;
