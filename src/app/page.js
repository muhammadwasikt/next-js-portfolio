import Head from "next/head"
import Home from "./modules/Home"


const page = () => {
  return (
    <>
      <Head>
        <title>MERN Stack Developer</title>
        <meta name="description" content="Passionate MERN stack developer focused on building modern, responsive, and high-performance web applications." />
        <meta name="keywords" content="MERN Stack, Web Development, React, Node.js" />
        <meta name="author" content="Wasi" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Home />
    </>

  )
}

export default page
