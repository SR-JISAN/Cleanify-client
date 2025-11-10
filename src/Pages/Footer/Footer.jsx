import React from "react";
import { Facebook, Instagram, Mail, Leaf } from "lucide-react";
import { Link } from "react-router";
import twitter from "../../assets/Twitter.png"


const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-12 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="w-7 h-7 text-green-300" />
            <h2 className="text-2xl font-bold tracking-wide">Cleanify</h2>
          </div>
          <p className="text-green-100 leading-relaxed">
            Cleanify empowers communities to report and resolve local
            environmental issues — from garbage buildup to road damage.
            Together, we can build a cleaner, greener tomorrow 🌍.
          </p>
        </div>

        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2 text-green-100">
            <li>
              <Link href="/" className="hover:text-green-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/report" className="hover:text-green-300 transition">
                Issues
              </Link>
            </li>
            <li>
              <Link
                href="/community"
                className="hover:text-green-300 transition"
              >
                Community
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-green-300 transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Connect With Us</h3>
          <p className="text-green-100 mb-4">
            Have a question or idea? Let’s connect and make change happen!
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-green-300">
              <Facebook color="#132186" />
            </a>
            <a href="#" className="hover:text-green-300">
              <img className="w-5 h-5" src={twitter} alt="twitter" />
            </a>
            <a href="#" className="hover:text-green-300">
              <Instagram color="#bb1122" />
            </a>
            <a href="mailto:info@cleanify.org" className="hover:text-green-300">
              <Mail color="#132186" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-green-500 mt-10 pt-5 text-center text-sm text-green-200">
        © {new Date().getFullYear()} Cleanify. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
