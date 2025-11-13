import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import useTitle from '../../Hook/UseTitle';

const MyIssue = () => {
     useTitle("MyIssue");
    const{user}=useContext(AuthContext)
    const [myIssue,setMyIssue]=useState([])
    const updateModelRef = useRef()
    useEffect(()=>{
         axios
           .get(`http://localhost:5000/issues?email=${user?.email}`)
           .then((res) => setMyIssue(res.data))
           .catch((err) => console.error(err));
    },[user])
   
    
    const handleDelete =async(id)=>{
       const result = await Swal.fire({
              title: "Are you sure?",
              text: "This will permanently delete the issue!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, delete it!",
              cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    try {
      const response = await axios.delete(`http://localhost:5000/issues/${id}`);
      
      if (response.data.deletedCount > 0) {
        Swal.fire("Deleted!", "The issue has been deleted.", "success");

        const remainIssue = myIssue.filter(issue=> issue._id != id)
        setMyIssue(remainIssue)
      } else {
        Swal.fire("Error!", "Issue not found or already deleted.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }


  }
    }


const [selectedIssue, setSelectedIssue] = useState(null);
 const [status, setStatus] = useState("");

 const handleChange = (e) => {
   setStatus(e.target.value);
 };

 const handleUpdate = async (e, id) => {
   e.preventDefault();

   const form = e.target;
   const title = form.title.value;
   const amount = form.amount.value;
   const category = form.category.value;
   const description = form.info.value;
   const currentIssue = myIssue.find((issue) => issue._id === id);
   const updatedIssue = {
     title: title || currentIssue.title,
     amount: amount || currentIssue.amount,
     category: category || currentIssue.category,
     description: description || currentIssue.description,
     status: status || currentIssue.status,
   };
   try {
     const res = await axios.patch(
       `http://localhost:5000/issues/${id}`,
       updatedIssue
     );
     if (res.data.modifiedCount > 0) {
       Swal.fire("✅ Updated!", "Issue updated successfully!", "success");

       setMyIssue((prev) =>
         prev.map((issue) =>
           issue._id === id ? { ...issue, ...updatedIssue } : issue
         )
       );

       updateModelRef.current.close();
     }
   } catch (err) {
     console.error(err);
     Swal.fire("❌ Error", "Failed to update issue!", "error");
   }
 };


    const handleOpenUpdate = (issue) => {
      setSelectedIssue(issue);
      setStatus(issue.status);
      updateModelRef.current.showModal();
    };
  const handleClose = () => {
    setSelectedIssue(null);
    setStatus("");
    updateModelRef.current.close();
  };
    return (
      <div className="maxWidth mx-auto">
        <h1 className="text-center my-10 font-bold text-4xl text-green-700">
          My Issue
        </h1>

        <div className="overflow-x-auto mt-8">
          <h1 className="my-10 text-4xl font-bold text-green-700">
            Added Issues: {myIssue.length}
          </h1>
          <div className="overflow-x-auto mx-auto">
            <table className="table">
              <thead>
                <tr className="bg-green-100">
                  <th className="text-blue-950">Title</th>
                  <th className="text-blue-950">Category</th>
                  <th className="text-blue-950">Amount</th>
                  <th className="text-blue-950">Description</th>
                  <th className="text-blue-950">Status</th>
                  <th className="text-blue-950">Update</th>
                  <th className="text-blue-950">Delete</th>
                </tr>
              </thead>

              <tbody>
                {myIssue.map((issue) => (
                  <tr key={issue._id} className="bg-green-50 w-full shadow-2xl">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="font-bold ">
                          <h1>{issue.title}</h1>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="badge border-0 bg-green-200 text-black badge-sm py-6">
                        {issue?.category}
                      </div>
                    </td>
                    <td className="font-bold">$ {issue?.amount}</td>
                    <td className="text-gray-500 ">{issue?.description}</td>
                    <td className="font-bold ">
                      {issue?.status === "Ended" ? (
                        <div className="badge p-2 badge-success">
                          {issue?.status}
                        </div>
                      ) : (
                        <div className="badge py-6 rounded-full badge-warning ">
                          <h1>{issue?.status}</h1>
                        </div>
                      )}
                    </td>
                    <td className="font-bold ">
                      <button
                        onClick={() => handleOpenUpdate(issue)}
                        className="btn bg-green-700 border-0 shadow-2xl"
                      >
                        Go To Update
                      </button>

                      {/* ------modal------------ */}
                      {/* Open the modal using document.getElementById('ID').showModal() method */}
                      <dialog
                        ref={updateModelRef}
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <h3 className="font-bold text-center text-green-700 text-lg">
                            Update Issue Details
                          </h3>
                          {selectedIssue && (
                            <form
                              onSubmit={(e) =>
                                handleUpdate(e, selectedIssue._id)
                              }
                              className="py-4"
                            >
                              <div className="my-3">
                                <label className="text-gray-600">Title</label>
                                <input
                                  className="input w-full border-2 border-green-700"
                                  type="text"
                                  name="title"
                                  placeholder={`Current Title: ${selectedIssue.title}`}
                                />
                              </div>
                              <div>
                                <label className="text-gray-600">Amount</label>
                                <input
                                  className="input w-full border-2 border-green-700"
                                  name="amount"
                                  type="text"
                                  placeholder={`Current Amount: ${selectedIssue.amount}`}
                                />
                              </div>
                              <div className="my-3">
                                <label className="">
                                  <span className="text-gray-600 font-bold">
                                    Category
                                  </span>
                                </label>
                                <select
                                  defaultValue={selectedIssue.category}
                                  className="select input-bordered border-2 bg-green-50 border-green-300 select-bordered w-full"
                                  name="category"
                                >
                                  <option value="Garbage">Garbage</option>
                                  <option value="Illegal Construction">
                                    Illegal Construction
                                  </option>
                                  <option value="Broken Public Property">
                                    Broken Public Property
                                  </option>
                                  <option value="Road Damage">
                                    Road Damage
                                  </option>
                                </select>
                              </div>
                              <div>
                                <label className="text-gray-600">
                                  Description
                                </label>
                                <textarea
                                  name="info"
                                  defaultValue={selectedIssue.description}
                                  className="textarea border-2 border-green-700 w-full"
                                  placeholder="(Optional) Update It!"
                                />
                              </div>

                              <div>
                                <h3>Select Status:</h3>

                                <label>
                                  <input
                                    type="radio"
                                    name="status"
                                    value="On Going"
                                    checked={status === "On Going"}
                                    onChange={handleChange}
                                  />
                                  On Going
                                </label>

                                <label className="ml-3">
                                  <input
                                    type="radio"
                                    name="status"
                                    value="Ended"
                                    checked={status === "Ended"}
                                    onChange={handleChange}
                                  />
                                  Ended
                                </label>

                                <p>✅ Selected Value: {status || "None"}</p>
                              </div>
                              <button
                                type="submit"
                                className="custom-btn shadow-2xl py-2 w-full"
                              >
                                Update Now!
                              </button>
                            </form>
                          )}

                          <div className="modal-action">
                            <form method="dialog">
                              <button onClick={handleClose} className="btn">
                                Close
                              </button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </td>
                    <td className="font-bold ">
                      <button
                        onClick={() => handleDelete(issue._id)}
                        className="btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default MyIssue;