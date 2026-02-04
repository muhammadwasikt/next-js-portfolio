"use client";

import { Button } from "../../ui/button";
import Github from "../../logos/github";
import { Typewriter } from "react-simple-typewriter";
import Linkedin from "@/components/logos/linkedin";
import Resume from "@/components/logos/resume";
import Image from "next/image"
import { motion } from "framer-motion"

const HeroImage = "/assets/images/hero-image.jpg"


export default function Hero() {

  const clicks = (type) => {
    if (type === "github") {
      window.open('https://www.github.com/muhammadwasikt', '_blank');
    }
        if (type === "linkedin") {
      window.open('https://www.linkedin.com/in/muhammadwasikt', '_blank');
    }
    if (type === "resume") {
      window.open('https://niyoizgkmktkgnapxtng.supabase.co/storage/v1/object/public/M.wasi%20imran/resume/M.%20WASI%20IMRAN%20(2).pdf', '_blank')
    }
  }


  return (
    <section className="fade-bottom overflow-hidden p-3 pb-16">
      <div className="mx-auto flex max-w-container flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeIn" }}
          >
            <Image src={HeroImage} alt="MUHAMMAD WASI" width={195} height={192}
              className='mx-auto m-5 rounded-full object-contain w-auto h-auto transform 
            transition-transform duration-300 hover:scale-105' priority={false} placeholder="blur" blurDataURL="data:image/webp;base64,LIIXN+E13s?G7#j?tmxuNGs:;{Ip"/>
          </motion.div>
          <motion.h1
            className="relative z-10 inline-block bg-gradient-to-r from-foreground to-foreground bg-clip-text text-2xl max-sm:text-xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight dark:to-muted-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Typewriter
              words={["I'm Muhammad Wasi", "I'm a Web developer", "I'm a MERN stack developer"]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-md relative z-10 max-w-[550px] font-medium text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            I specialize in building modern and responsive web applications.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="relative z-10 flex justify-center gap-4 flex-wrap"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button variant="default" size="lg" asChild aria-label="Visit Linkedin Profile" onClick={() => clicks("linkedin")}>
              <a href="/"><Linkedin />Linkedin </a>
            </Button>
            <Button variant="glow" size="lg" asChild aria-label="Visit GitHub Profile" onClick={() => clicks("github")}>
              <a href="/">
                <Github className="mr-2 h-4 w-4" /> Github
              </a>
            </Button>
            <Button variant="default" size="lg" asChild aria-label="Check My Resume" onClick={() => clicks("resume")}>
              <a href="/"><Resume />Resume </a>
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
