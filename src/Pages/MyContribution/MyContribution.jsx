import React, { useContext, useEffect, useState } from 'react';
import useTitle from '../../Hook/UseTitle';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import Loading from '../../Components/Loading/Loading';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from 'sweetalert2';

const MyContribution = () => {
    useTitle("My-Contribution");
    const {user}=useContext(AuthContext)
    const [myDatas,setMyDatas] = useState([])

 
    useEffect(() => {
      if ( user?.email) {
            const fetchData = async()=>{
                try {
                    const res = await axios(
                      `http://localhost:5000/contributes?email=${user?.email}`
                    );
                    setMyDatas(res.data)

                } catch (error) {
                    console.log(error)
                }
            }   
          fetchData()
      }
    }, [user?.email,setMyDatas]);
    
     const handlePdf = () => {
       if (!myDatas.length) {
         Swal.fire("No data to export!");
         return;
       }

       const doc = new jsPDF();

       doc.setFontSize(18);
       doc.text("My Contribution Report", 14, 15);

       doc.setFontSize(12);
       doc.text(`Name: ${user?.displayName || "Unknown"}`, 14, 25);
       doc.text(`Email: ${user?.email || "N/A"}`, 14, 32);
       doc.text(
         `Generated on: ${new Date().toLocaleString("en-BD", {
           timeZone: "Asia/Dhaka",
         })}`,
         14,
         39
       );

       const tableColumn = ["Title", "Category", "Amount ($)", "Date & Time"];
       const tableRows = myDatas.map((item) => [
         item.title,
         item.category || "N/A",
         `$${item.amount}`,
         item.date || "N/A",
       ]);

       doc.autoTable({
         head: [tableColumn],
         body: tableRows,
         startY: 45,
         styles: { fontSize: 10, cellPadding: 4 },
         headStyles: { fillColor: [34, 197, 94] },
       });

       doc.save("My_Contributions_Report.pdf");
       console.log("autoTable available:", typeof new jsPDF().autoTable);
     };


    return (
      <div className="maxWidth mx-auto">
        <h1 className="text-center my-10 font-extrabold text-4xl text-green-700">
          <span className="text-green-900">{user?.displayName}</span> Your
          Contribution
        </h1>
        <div className="overflow-x-auto mt-8">
          <div className="overflow-x-auto mx-auto">
            <table className="table mx-4 lg:mx-0">
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
                    <td className="font-bold">🗓 {myData?.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className=' flex justify-center my-8'>
          {/* ----------Download btn---------------- */}

          <button onClick={handlePdf} class="download-button">
            <div class="docs">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="css-i6dzq1"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Download report
            </div>
            <div class="download">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="css-i6dzq1"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </div>
          </button>
        </div>
      </div>
    );
};

export default MyContribution;