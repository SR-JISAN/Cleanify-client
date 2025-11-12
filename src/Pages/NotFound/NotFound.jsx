import React from 'react';
import { Link } from 'react-router';
import useTitle from '../../Hook/UseTitle';

const NotFound = () => {
    useTitle("404 Page Not Found")
    return (
      <div>
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
          <h1 className="text-9xl font-extrabold text-green-700">404</h1>
          <div class="book">
            <div class="book__pg-shadow"></div>
            <div class="book__pg"></div>
            <div class="book__pg book__pg--2"></div>
            <div class="book__pg book__pg--3"></div>
            <div class="book__pg book__pg--4"></div>
            <div class="book__pg book__pg--5"></div>
          </div>{" "}
          <p className="text-2xl mt-4 font-semibold">Oops! Page Not Found</p>
          <p className="text-gray-500 mt-2">
            The page you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="mt-6 px-6 py-3 bg-green-700 text-white rounded-lg shadow-lg hover:bg-green-800 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
};

export default NotFound;