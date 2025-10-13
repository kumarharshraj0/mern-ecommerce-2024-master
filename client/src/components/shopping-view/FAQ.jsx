import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Browse our products, add items to your cart, and proceed to checkout. You can pay using multiple secure payment methods.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes! Once your order is shipped, you will receive a tracking number via email or SMS.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy on most items. Items must be in original condition. Some exclusions may apply.",
  },
  {
    question: "Do you offer free shipping?",
    answer:
      "Yes, we offer free standard shipping on orders above a certain amount. Expedited shipping options are also available.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach our support team via live chat, email, or phone. We're available 24/7 to assist you.",
  },
];

export default function EcommerceFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50 font-[inter]">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg transition-transform hover:scale-[1.01] duration-300"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-gray-800 hover:text-indigo-600 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp className="text-indigo-600 w-6 h-6" />
                ) : (
                  <ChevronDown className="text-gray-400 w-6 h-6" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-700 text-sm animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
