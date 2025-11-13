import React  ,{ use, useEffect, useState } from 'react';
import axios from 'axios';

import Loading from '../../Components/Loading/Loading';
import { AuthContext } from '../../Context/AuthContext';
import {useNavigate } from 'react-router';
import useTitle from '../../Hook/UseTitle';


const Issues = () => {
     useTitle("Issues");
    const [issues,setIssues] = useState([])
     const {setLoading,loading}=use(AuthContext)
     const navigate = useNavigate()
     useEffect(()=>{
        axios.get("http://localhost:5000/issues")
              .then(res=>{
                  setIssues(res.data)
                  setLoading(false)
              })
              .catch(err=>{
                console.log("fetch error",err)
                setLoading(false)
              })
    },[setLoading])

    if(loading){
       return <Loading></Loading>
    }
    return (
      <div className="mt-20">
        <div className="maxWidth mx-7 md:mx-7  lg:mx-auto   ">
          <h1 className="text-center text-4xl font-bold mb-10 text-green-700">
            All Issues
          </h1>


          {/* -----------------search bar----------------- */}
         
<div className='my-6' id="poda">
  <div class="glow"></div>
  <div class="darkBorderBg"></div>
  <div class="darkBorderBg"></div>
  <div class="darkBorderBg"></div>

  <div class="white"></div>

  <div class="border"></div>

  <div id="main">
    <input class="s-input" name="text" type="text" placeholder="Search..." />
    <div id="pink-mask"></div>
    <div class="filterBorder"></div>
    <div id="filter-icon">
      <svg
        fill="none"
        viewBox="4.8 4.56 14.832 15.408"
        width="27"
        height="27"
        preserveAspectRatio="none"
      >
        <path
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke-width="1"
          stroke="#d6d6e6"
          d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
        ></path>
      </svg>
    </div>
    <div id="search-icon">
      <svg
        class="feather feather-search"
        fill="none"
        height="24"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="11" r="8" stroke="url(#search)"></circle>
        <line
          x1="22"
          x2="16.65"
          y1="22"
          y2="16.65"
          stroke="url(#searchl)"
        ></line>
        <defs>
          <linearGradient id="search" gradientTransform="rotate(50)">
            <stop offset="0%" stop-color="#f8e7f8"></stop>
            <stop offset="50%" stop-color="#b6a9b7"></stop>
          </linearGradient>
          <linearGradient id="searchl">
            <stop offset="0%" stop-color="#b6a9b7"></stop>
            <stop offset="50%" stop-color="#837484"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
</div>






          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4  mb-40">
            {issues.map((issue) => (
              <div
                key={issue._id}
                className=" custom-card rounded-2xl w-full bg-white shadow-2xl"
              >
                <div key={issue.id} className="card-body w-full">
                  <fieldset>
                    <img
                      className="h-[300px] w-full rounded-2xl"
                      src={issue.image}
                      alt={issue.title}
                    />
                  </fieldset>
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold  text-2xl flex-1">
                      {issue.title}
                    </h2>
                    <p className="py-1  text-center rounded-full bg-emerald-300 font-semibold text-white  shadow-2xl flex-1">
                      {issue.category}
                    </p>
                  </div>
                  <p className="text-gray-400">📑 {issue.description}</p>
                  <p className="text-gray-700 hover:font-bold hover:border-b-2 border-b-blue-800 hover:text-blue-950 ">
                    {" "}
                    🗺️📍 {issue.location}
                  </p>
                  <p className="font-bold text-lg text-gray-500">
                    ${" "}
                    <span className="text-green-700 shadow-2xl shadow-cyan-900">
                      {issue.amount}
                    </span>
                  </p>
                  <button
                    onClick={() => navigate(`/issueDetails/${issue._id}`)}
                    className="custom-btn py-2 my-2 shadow-2xl "
                  >
                    See Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default Issues;















    
    
  
    
     