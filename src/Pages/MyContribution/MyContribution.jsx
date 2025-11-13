import React, { useContext, useEffect, useState } from 'react';
import useTitle from '../../Hook/UseTitle';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import Loading from '../../Components/Loading/Loading';

const MyContribution = () => {
    useTitle("My-Contribution");
    const {user}=useContext(AuthContext)
    const [myDatas,setMyDatas,loading,setLoading] = useState([])


    useEffect(() => {
      if ( user?.email) {
            const fetchData = async()=>{
                try {
                    const res = await axios(
                      `http://localhost:5000/contributes?email=${user?.email}`
                    );
                    setMyDatas(res.data)
                    setLoading(true)

                } catch (error) {
                    console.log(error)
                }
            }   
          fetchData()
      }
    }, [user?.email,setLoading,setMyDatas]);
    if(loading) <Loading></Loading>
    console.log(myDatas,user)
    return (
      <div className="maxWidth mx-auto">
        <h1 className="text-center my-10 font-extrabold text-4xl text-green-700">
          <span className="text-green-900">{user?.displayName}</span> Your
          Contribution
        </h1>
        <div className="overflow-x-auto mt-8">
          <div className="overflow-x-auto mx-auto">
            <table className="table">
              <thead>
                <tr className="bg-green-100">
                  <th className="text-blue-950">Title</th>
                  <th className="text-blue-950">Category</th>
                  <th className="text-blue-950">Paid Amount</th>
                  <th className="text-blue-950">Date & Time</th>
                </tr>
              </thead>

              <tbody>
                {myDatas.map((myData) => (
                  <tr
                    key={myData._id}
                    className="bg-green-50 w-full shadow-2xl"
                  >
                    <td>
                      <div className=" p-3">{myData?.title}</div>
                    </td>
                    <td>
                      <div className=" p-3">{myData?.category}</div>
                    </td>

                    <td className="font-bold">$ {myData?.amount}</td>
                    <td className="font-bold">{myData?.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default MyContribution;