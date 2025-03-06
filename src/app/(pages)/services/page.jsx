import dynamic from "next/dynamic";


const Service = dynamic(() => import("@/app/modules/Services"));

export const metadata = {
    title: "Services",
    description: "Explore the services offered by Muhammad Wasi.",
};

const Services = () => {
    return (
        <Service />
    )
}



export default Services;