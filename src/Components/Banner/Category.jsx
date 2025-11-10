import React from "react";
import garbage from "../../assets/garbage.png";
import BPR from "../../assets/BPR.png";
import illegalCon from "../../assets/illegalCon.png";
import RR from "../../assets/RR.png";

const categories = [
  { name: "Garbage", image: garbage },
  { name: "Illegal Construction", image: illegalCon },
  { name: "Broken Public Property", image: BPR },
  { name: "Road Damage", image: RR },
];

const Category = () => {
  return (
    <section className="my-20">
      <h2 className="text-center mb-10 text-4xl font-bold text-green-700">
        Issue Categories
      </h2>

      <div className="grid gap-6 max-w-6xl mx-auto px-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, i) => (
          <div
            key={i}
            className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-transform transform hover:scale-105"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover rounded-2xl group-hover:brightness-75 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl flex items-center justify-center">
              <h3 className="text-white text-2xl font-semibold">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
