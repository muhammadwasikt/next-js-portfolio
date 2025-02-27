'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import projects from '@/app/utils/constant/projects';
import Link from 'next/link';
import Image from "next/image";


const Projects = () => {
    return (
        <section id="projects" className="p-10 px-5 md:px-20 pt-20">
            <div className="w-full mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <h2 className="text-5xl font-bold mb-6 drop-shadow-lg max-sm:text-2xl">PROJECTS</h2>
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                                <Card className="p-6 rounded-xl border shadow-xl max-[400px]:text-left">
                                    <Image src={project.image} alt={project.title} width={400} height={200} className="rounded-lg mb-4 mx-auto border" />
                                    <h3 className="text-2xl font-bold sm:h-16 max-[400px]:text-lg">{project.title}</h3>
                                    <p className="mt-2 text-md sm:h-[80px]">{project.description}</p>
                                    <Link href={project.link} target="_blank">
                                        <Button className="mt-4 px-5 py-2 rounded-lg transform translate-x-1/2">View Project</Button>
                                    </Link>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
