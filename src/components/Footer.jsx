import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
    return (
        <section className="w-full p-6 md:pt-3 lg:pt-5 bg-background text-foreground flex justify-between max-md:justify-center items-center flex-wrap">
            <div className="flex flex-col ">
                <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                    Stay Connected
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Subscribe to our newsletter and follow us on social media for the latest updates.
                </p>
            </div>

            {/* Subscription Form */}
            <div className="w-full max-w-md space-y-4 my-6">
                <form className="flex space-x-3 p-2 border rounded-lg">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 rounded-lg border-none bg-transparent"
                    />
                    <Button type="submit" className="px-6 py-2 rounded-lg">
                        Subscribe
                    </Button>
                </form>
            </div>

            <div className="flex justify-center gap-6 mt-4 flex-wrap">
                <SocialIcon href="https://www.facebook.com/people/M-Wasi-Imran-khatri/pfbid0kNNb22faBXSzXSuUij5sgMsJUuq2btKeXQ5KaPGJnNA2pbKyKrpvJ2ZK2SBp24HUl/" icon={<Facebook className="w-6 h-6" />} />
                <SocialIcon href="https://medium.com/@wasikhatri11" icon={<img src="https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19" alt="Medium" className="w-6 h-6"/>} />
                <SocialIcon href="#" icon={<Instagram className="w-6 h-6" />} />
                <SocialIcon href="https://www.linkedin.com/in/muhammad-wasi-imran-khatri" icon={<Linkedin className="w-6 h-6" />} />
            </div>

            <div>
                <p className="text-sm max-sm:mt-3">
                    &copy; 2025 Muhammad Wasi. All rights reserved
                </p>
            </div>
        </section>
    );
}

function SocialIcon({ href, icon }) {
    return (
        <Link
            href={href}
            className="p-3 rounded-full border transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
        >
            {icon}
        </Link>
    );
}


  

export default Footer