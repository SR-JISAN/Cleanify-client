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
      const [filteredIssues, setFilteredIssues] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
      const [sortBy, setSortBy] = useState("");
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

     useEffect(() => {
       let filtered = issues.filter(
         (issue) =>
           issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           issue.category.toLowerCase().includes(searchTerm.toLowerCase())
       );

       // ✅ Handle sorting
       if (sortBy === "amountLowHigh") {
         filtered.sort((a, b) => a.amount - b.amount);
       } else if (sortBy === "amountHighLow") {
         filtered.sort((a, b) => b.amount - a.amount);
       } else if (sortBy === "titleAZ") {
         filtered.sort((a, b) => a.title.localeCompare(b.title));
       } else if (sortBy === "titleZA") {
         filtered.sort((a, b) => b.title.localeCompare(a.title));
       }

       setFilteredIssues(filtered);
     }, [searchTerm, sortBy, issues]);

    if(loading){
       return <Loading></Loading>
    }
    return (
      <div className="mt-20">
        <div className="maxWidth mx-7 md:mx-7  lg:mx-auto   ">
          <h1 className="text-center text-4xl font-bold mb-10 text-green-700">
            All Issues
          </h1>

       
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by title or category..."
              className="input input-bordered w-full md:w-1/2 border-2 border-green-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Sort */}
            <select
              className="select select-bordered w-full md:w-1/4 border-2 border-green-600"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="amountLowHigh">Amount: Low → High</option>
              <option value="amountHighLow">Amount: High → Low</option>
              <option value="titleAZ">Title: A → Z</option>
              <option value="titleZA">Title: Z → A</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4  mb-40">
            {filteredIssues.map((issue) => (
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















    
    
  
    
     