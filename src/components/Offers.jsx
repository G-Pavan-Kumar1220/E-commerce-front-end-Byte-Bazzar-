import React, { useEffect, useState } from "react";
import { Truck, ShieldCheck, RefreshCcw, BadgePercent } from "lucide-react";

export default function Offers() {
  const offers = [
    {
      title: "Flat 50% Off",
      desc: "On selected items. Limited time deal.",
      icon: <BadgePercent size={32} />,
    },
    {
      title: "Free Delivery",
      desc: "On orders above ₹499",
      icon: <Truck size={32} />,
    },
    {
      title: "Secure Payment",
      desc: "100% safe transactions",
      icon: <ShieldCheck size={32} />,
    },
    {
      title: "Easy Returns",
      desc: "7-day hassle-free returns",
      icon: <RefreshCcw size={32} />,
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % offers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [offers.length]);

  return (
    <section className="bg-indigo-600 py-6 px-4">
      <div className="max-w-4xl mx-auto relative overflow-hidden">

        {/* Slider Wrapper */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {offers.map((item, index) => (
            <div
              key={index}
              className="min-w-full flex items-center justify-center"
            >
              <div className="bg-white rounded-xl shadow-lg px-6 py-5 flex items-center gap-4 w-full max-w-xl">

                {/* Icon */}
                <div className="text-indigo-600">
                  {item.icon}
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.desc}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4 gap-2">
          {offers.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                current === index ? "bg-white" : "bg-indigo-300"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}