import dynamic from "next/dynamic";


const Home = dynamic(() => import("@/app/modules/Home"));


export const metadata = {
  title: "Muhammad Wasi",
  description: "Welcome to Wasi's portfolio. Explore projects, skills, and contact details.",
};

const HomePage = () => {
  return (
    <>
      <Home />
    </>
  )
}

export default HomePage
