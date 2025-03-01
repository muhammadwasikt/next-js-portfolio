"use client";

import { Button } from "../../ui/button";
import { useTheme } from "next-themes";
import Github from "../../logos/github";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Linkedin from "@/components/logos/linkedin";
import Resume from "@/components/logos/resume";


const HeroImage = "/assets/images/hero-image.png";


export default function Hero() {
  const { resolvedTheme } = useTheme();
  let src;

  const clicks = (type) => {
    if (type === "github") {
      window.open('https://www.github.com/muhammadwasikt', '_blank');
    }
    if (type === "linkedin") {
      window.open('https://www.linkedin.com/in/muhammad-wasi-imran-khatri/', '_blank');
    }
    if (type === "resume") {
      window.open('https://firebasestorage.googleapis.com/v0/b/portfolio-3147e.appspot.com/o/M.%20WASI%20IMRAN%20(2).pdf?alt=media&token=04ca1eaf-9a85-47db-97ba-0f0e4bf68128', '_blank')
    }
  }

  switch (resolvedTheme) {
    case "light":
      src = "/app-light.png";
      break;
    case "dark":
      src = "/app-dark.png";
      break;
    default:
      src = "/app-dark.png";
      break;
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
            <img src={HeroImage} alt="MUHAMMAD WASI"
              className='mx-auto m-5 w-48 h-48 rounded-full object-contain transform 
            transition-transform duration-300 hover:scale-105'/>
          </motion.div>
          <motion.h1
            className="relative z-10 inline-block bg-gradient-to-r from-foreground to-foreground bg-clip-text text-4xl max-sm:text-xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight dark:to-muted-foreground"
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
            <Button variant="default" size="lg" asChild onClick={() => clicks("linkedin")}>
              <a href="/"><Linkedin />Linkedin </a>
            </Button>
            <Button variant="glow" size="lg" asChild onClick={() => clicks("github")}>
              <a href="/">
                <Github className="mr-2 h-4 w-4" /> Github
              </a>
            </Button>
            <Button variant="default" size="lg" asChild onClick={() => clicks("resume")}>
              <a href="/"><Resume />Resume </a>
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
