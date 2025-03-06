import dynamic from "next/dynamic";


const About = dynamic(() => import("@/app/modules/About"));



export const metadata = {
    title: "About Us",
    description: "Passionate MERN stack developer focused on building modern, responsive, and high-performance web applications.",
  };

const AboutUs = () => {
    return (
        <>
            <About />
        </>
    )
}

export default AboutUs
