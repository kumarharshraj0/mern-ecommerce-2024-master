import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import axios from "axios";
import Footer from "@/components/shopping-view/Footer";
import EcommerceFAQ from "@/components/shopping-view/FAQ";
import Testimonials from "@/components/shopping-view/Testimonials";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name, email, message);

    try {
      const res = await axios.post("https://mern-ecommerce-backend-by-me.onrender.com/api/shop/contact", {
        name,
        email,
        message,
      });

      console.log(res.data);

      if (res.data.success) {
        alert("✅ Message Sent Successfully");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert("❌ Message Not Sent");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Something went wrong while sending your message.");
    }
  };

  return (
    <div className="container    ">
      <div className="mb-12 text-center bg-[#F6F6F6] py-20  ">
     <h1 className="text-5xl font-bold text-center mb-12 ">Contact  Us Now</h1>
      </div>
      

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 py-30 mb-10">
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-semibold mb-8">
            Send a line about your project
          </h2>

          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3  border-bottom-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Your Message
              </label>
              <Textarea
                id="message"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-300 text-lg"
            >
              Send Now →
            </Button>
          </form>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="https://cdn.prod.website-files.com/681633ac623192bfdb5b357b/6820a3a395bc440c6c4de0b9_Rectangle%2053.webp"
            alt="Contact Us"
            className="rounded-lg shadow-lg object-cover w-full h-auto"
          />
        </div>
      </div>
      <Testimonials />
       <EcommerceFAQ />
      <Footer />
    </div>
  );
};

export default Contact;
