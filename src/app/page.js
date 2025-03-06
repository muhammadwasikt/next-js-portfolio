import dynamic from "next/dynamic";


const Home = dynamic(() => import("./modules/Home"));

export const metadata = {
  title: "Muhammad Wasi | MERN Stack Developer",
  description:
    "Passionate MERN stack developer focused on building modern, responsive, and high-performance web applications.",
  keywords: ["MERN Stack", "Web Development", "React", "Node.js"],
};


const Page = () => {
  return <Home />;
};

export default Page;
