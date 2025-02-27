import Contact from "@/app/modules/Contact";

export const metadata = {
    title: "Contact Us",
    description: "Get in touch with Wasi for collaborations or inquiries!",
  };

const ContactPage = () => {
  return (
    <>
      <div>
        <Contact />
      </div>
    </>
  );
};

export default ContactPage;
