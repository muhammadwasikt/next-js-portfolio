'use client'
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSkills = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <section id="about" className="p-10 px-5 md:px-20 ">
        <div className="w-full mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="p-12 max-sm:px-4">
              <h2 className="text-5xl font-bold max-sm:text-3xl  mb-6 drop-shadow-lg">ABOUT ME</h2>
              <p className="mt-6 text-lg leading-relaxed max-sm:text-left mx-auto">
                I am a passionate full-stack developer dedicated to crafting modern,
                responsive, and high-performance web applications. With a strong foundation
                in frontend technologies, I strive to create seamless and engaging user experiences.
              </p>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                  <Card className=" p-6 rounded-xl text-center border shadow-xl">
                    <h3 className="text-5xl font-extrabold max-[400px]:text-3xl">Under 1</h3>
                    <p className=" mt-2 text-lg">Year Experience</p>
                  </Card>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                  <Card className=" p-6 rounded-xl text-center border shadow-xl">
                    <h3 className="text-5xl font-extrabold ">3+</h3>
                    <p className="mt-2 text-lg">Projects Completed</p>
                  </Card>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                  <Card className="p-6 rounded-xl text-center border shadow-xl" onClick={handleSkills}>
                    <h3 className="text-5xl font-extrabold ">10+</h3>
                    <p className="mt-2 text-lg">Skills</p>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full mx-auto text-center"
            >
              <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">SKILLS</h2>
              <div className="mt-10 grid max-[350px]:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {["HTML", "CSS", "JavaScript", "React", "Next.js", "Node.js", "Express", "MongoDB", "Firebase", "Tailwind CSS", "Shadcn", "Daisyui", "GitHub", "Bootstrap", "Material UI"].map((skill, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                    <Card className="p-6 rounded-xl text-center border shadow-xl">
                      <h3 className="text-xl ">{skill}</h3>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default About;
