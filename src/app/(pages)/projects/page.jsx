import dynamic from "next/dynamic";


const Project = dynamic(() => import("@/app/modules/Projects"));


export const metadata = {
    title: "Projects",
    description: "Check out the amazing projects developed by Wasi.",
  };
const ProjectsPage = () => {
    return (
        <>
            <Projects />
        </>
    )
}

export default ProjectsPage
