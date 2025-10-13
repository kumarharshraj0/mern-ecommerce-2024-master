// src/components/Testimonials.jsx

const testimonials = [
  {
    name: "Ananya Gupta",
    text: "Amazing quality! The product was exactly as shown and delivery was super fast.",
    img: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    name: "Rahul Khanna",
    text: "Very satisfied with my purchase. Great deals and smooth checkout experience.",
    img: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    name: "Sneha Patel",
    text: "Customer support was very helpful and resolved my issue quickly!",
    img: "https://randomuser.me/api/portraits/women/41.jpg",
  },
  {
    name: "Amit Verma",
    text: "Love this store! The clothes fit perfectly and feel premium.",
    img: "https://randomuser.me/api/portraits/men/64.jpg",
  },
  {
    name: "Kavya Singh",
    text: "Excellent packaging and delivery — everything arrived safely and on time!",
    img: "https://randomuser.me/api/portraits/women/66.jpg",
  },
  {
    name: "Rohit Sharma",
    text: "Superb experience! I’ll definitely shop here again.",
    img: "https://randomuser.me/api/portraits/men/72.jpg",
  },
];

function Row({ items, direction }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className={`inline-flex gap-6 animate-scroll ${
          direction === "right" ? "animate-scroll-reverse" : ""
        }`}
      >
        {[...items, ...items].map((t, i) => (
          <div
            key={i}
            className="min-w-[280px] bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={t.img}
              alt={t.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-green-500"
            />
            <div>
              <p className="text-gray-600 italic">"{t.text}"</p>
              <h3 className="font-semibold text-green-700 mt-2">{t.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        What Our Customers Say
      </h2>

      <div className="space-y-8">
        <Row items={testimonials} direction="left" />
        <Row items={testimonials} direction="right" />
        <Row items={testimonials} direction="left" />
      </div>
    </section>
  );
}
