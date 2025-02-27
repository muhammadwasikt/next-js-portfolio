"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto text-center">
      <motion.h1 
        className="text-4xl font-bold text-primary mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact Me
      </motion.h1>
      
      <motion.p 
        className="text-gray-500 mb-10 dark:text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Feel free to reach out for collaborations or inquiries!
      </motion.p>
      
      <motion.div 
        className="grid md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="shadow-lg cursor-pointer" onClick={() => window.location.href = 'mailto:wasikhatri11@gmail.com'}>
          <CardContent className="p-6 flex flex-col items-center">
            <Mail className="text-primary w-10 h-10 mb-2" />
            <p className="text-gray-700 dark:text-gray-200">wasikhatri11@gmail.com</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg cursor-pointer" onClick={() => window.location.href = 'tel:+923278455637'}>
          <CardContent className="p-6 flex flex-col items-center">
            <Phone className="text-primary w-10 h-10 mb-2" />
            <p className="text-gray-700 dark:text-gray-200">+92 327 8455637</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg md:col-span-2 cursor-pointer" onClick={() => window.open('https://maps.app.goo.gl/PQu91Gd16zsuWhmU7', '_blank')}>
          <CardContent className="p-6 flex flex-col items-center">
            <MapPin className="text-primary w-10 h-10 mb-2" />
            <p className="text-gray-700 dark:text-gray-200">Karachi, Pakistan</p>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.form 
        className="mt-10 space-y-4"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Input 
          name="name"
          placeholder="Your Name" 
          className="w-full" 
          value={formData.name} 
          onChange={handleChange}
          required 
        />
        <Input 
          type="email" 
          name="email"
          placeholder="Your Email" 
          className="w-full" 
          value={formData.email} 
          onChange={handleChange}
          required 
        />
        <Textarea 
          name="message"
          placeholder="Your Message" 
          className="w-full" 
          rows={4} 
          value={formData.message} 
          onChange={handleChange}
          required 
        />
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </motion.form>

      {success && <p className="mt-4 text-green-500">Message sent successfully!</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </section>
  );
}

export default Contact;
