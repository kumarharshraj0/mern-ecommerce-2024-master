import EcommerceFAQ from "@/components/shopping-view/FAQ";
import Footer from "@/components/shopping-view/Footer";
import Testimonials from "@/components/shopping-view/Testimonials";
import React from "react";


const About = () => (
  <div className="bg-gray-50 min-h-screen">
    {/* Hero Section */}
    <section className="py-16 bg-white flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-[#111] mb-0">About us</h1>
    </section>

    {/* Team Image */}
    <section className="flex justify-center items-center py-10 bg-white">
      <img
        src="https://cdn.prod.website-files.com/681633ac623192bfdb5b357b/6820a57a42d40ea0c3e7152d_bbcb77a2812995557b1a73df101ad644_image-p-2000.webp"
        alt="Team"
        className="w-4/5 max-w-3xl rounded-xl shadow-md"
      />
    </section>

    {/* Our Approach */}
    <section className="py-16 bg-white flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Approach</h2>
      <p className="text-xl max-w-2xl text-center text-gray-600">
        We approach creative work with a blend of innovation, collaboration, and meticulous attention to detail. We believe in the power of storytelling and strive to understand each client's unique vision and goals. Our process involves close collaboration with clients, ensuring that every project is tailored to their specific needs.
      </p>
    </section>

    {/* Why Choose Us */}
    <section className="py-14 bg-gray-50 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-10">Why Choose Us?</h2>
      <div className="flex flex-wrap justify-center gap-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow p-8 w-72">
          <h3 className="font-semibold text-lg mb-2">Innovative Solutions</h3>
          <p className="text-gray-600">We bring creative and innovative solutions to every project.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-8 w-72">
          <h3 className="font-semibold text-lg mb-2">Client Collaboration</h3>
          <p className="text-gray-600">We work closely with clients to fully understand and meet their needs.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-8 w-72">
          <h3 className="font-semibold text-lg mb-2">Attention to Detail</h3>
          <p className="text-gray-600">Every detail matters to us for delivering quality results.</p>
        </div>
      </div>
    </section>
    <Testimonials />
    <EcommerceFAQ />
    <Footer />
  </div>
);

export default About;
