import React  ,{ use, useEffect, useState } from 'react';
import axios from 'axios';

import Loading from '../../Components/Loading/Loading';
import { AuthContext } from '../../Context/AuthContext';
import { Navigate, useNavigate } from 'react-router';


const Issues = () => {
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















    
    
  
    
     