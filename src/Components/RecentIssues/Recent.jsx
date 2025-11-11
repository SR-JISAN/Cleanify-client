import axios from 'axios';
import React, { use, useEffect, useState } from 'react';


import { AuthContext } from '../../Context/AuthContext';
import Loading from '../Loading/Loading';

const Recent = () => {
    const [recentIssue,setRecentIssue] = useState([])
     const {setLoading,loading}=use(AuthContext)
    useEffect(()=>{
        axios.get("http://localhost:5000/issuesLimit")
              .then(res=>{
                  setRecentIssue(res.data)
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
      <div className="maxWidth mx-7 md:mx-7  lg:mx-auto   ">
        <h1 className="text-center text-4xl font-bold mb-10 text-green-700">
          Recent Issues
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4  mb-40">
          {recentIssue.map((issue) => (
            <div
              key={issue._id}
              className=" custom-card rounded-2xl w-full bg-white shadow-2xl"
            >
              <div className="card-body w-full">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold  text-2xl flex-1">{issue.title}</h2>
                  <p className="py-1  px-4 text-center rounded-full bg-emerald-300 font-semibold text-white  shadow-2xl flex-1">
                    {issue.category}
                  </p>
                </div>
                <p className="text-gray-400">📑 {issue.description}</p>
                <p className="text-gray-700 hover:font-bold hover:border-b-2 border-b-blue-800 hover:text-blue-950 ">
                  {" "}
                  🗺️📍 {issue.location}
                </p>

                <button className="custom-btn py-2 my-2 shadow-2xl ">
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Recent;