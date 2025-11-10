import React from "react";
import { Leaf, Users } from "lucide-react";
import { Link } from "react-router";

const VolunteerCTA = () => {
  return (
    <section className="bg-green-50 py-16 px-6 lg:px-20 text-center rounded-3xl my-10 shadow-md">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center mb-4">
          <Users size={40} color="#22c55e" />
        </div>
        <h2 className="text-3xl font-bold text-green-700 mb-4">
          Join Our Next Community Clean Drive 🌿
        </h2>
        <p className="text-gray-600 mb-8">
          Become a part of the Cleanify movement! Together, we can make our
          neighborhoods cleaner and greener. Sign up as a volunteer and take
          real action for sustainability.
        </p>
        <Link to="/volunteer">
          <button className="btn bg-green-600 hover:bg-green-700 text-white px-8 rounded-full border-0 shadow-lg transition-all">
            <Leaf className="mr-2" size={20} /> Join as Volunteer
          </button>
        </Link>
      </div>
    </section>
  );
};

export default VolunteerCTA;
