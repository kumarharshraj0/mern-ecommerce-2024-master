import React from "react";

const FooterLinkSection = ({ title, links }) => (
  <div>
    <h4 className="text-lg font-semibold mb-4">{title}</h4>
    <ul className="space-y-2">
      {links.map((link, idx) => (
        <li key={idx}>
          <a href={link.href} className="hover:text-white transition">{link.label}</a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const quickLinks = [
    { label: "Shop", href: "/shop/listing" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ];

  const customerServiceLinks = [
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  const socialLinks = [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "LinkedIn", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-200 py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">ShopEase</h3>
          <p className="text-gray-400">
            Your one-stop shop for trending gadgets, fashion, and lifestyle products. Fast delivery, secure payments, and unbeatable prices.
          </p>
        </div>

        {/* Quick Links */}
        <FooterLinkSection title="Quick Links" links={quickLinks} />

        {/* Customer Service */}
        <FooterLinkSection title="Customer Service" links={customerServiceLinks} />

        {/* Follow Us */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            {socialLinks.map((s, idx) => (
              <a key={idx} href={s.href} className="hover:text-white transition">{s.label}</a>
            ))}
          </div>
          <p className="text-gray-500 mt-6 text-sm">
            &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
