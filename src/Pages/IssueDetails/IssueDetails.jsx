import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../../Components/Loading/Loading';
import useTitle from '../../Hook/UseTitle';


const IssueDetails = () => {
  useTitle("IssueDetails");
  const details = useLoaderData();
  const {_id} =details
      const [contributors, setContributors] = useState([]);
  const { user,loading } = useContext(AuthContext);
  const detailsModalRef = useRef();
  const today = new Date().toLocaleDateString();
  const handleContribute = () => {
    detailsModalRef.current.showModal();
  };

//     e.preventDefault()
//     const name = e.target.name.value
//     const title = e.target.title.value;
//     const email = e.target.email.value;
//     const phone = e.target.phone.value;
//     const amount =Number(e.target.amount.value) ;
//     const address = e.target.address.value;
//     const info = e.target.info.value;
//     const newContribute = {
//       Contribute_id: _id,
//       title: title,
//       name: name,
//       email: email,
//       phone: phone,
//       amount: amount,
//       address: address,
//       info: info,
//       photo: user.photoURL
//     };
//     console.log(newContribute)
//      try {

// Swal.fire({
//   title: "Are you sure?",
//   text: "You won't be able to revert this!",
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonColor: "#3085d6",
//   cancelButtonColor: "#d33",
//   confirmButtonText: "Yes, Make Payment!",
// }).then((result) => {
//   if (result.isConfirmed) {
//     Swal.fire({
//       title: "Successful 🥳",
//       text: "Thanks For Your Contribute 🥰.",
//       icon: "success",
//     });
//     console.log(result);
//   }
// });

//       const res = await axios.post(
//         "http://localhost:5000/contributes",
//         newContribute,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//        setContributors((prev) => {
//          const updated = [...prev, res.data || newContribute]; 
         
//          return updated.sort((a, b) => b.amount - a.amount);
//        });
      
         
//       e.target.reset(); 
//       detailsModalRef.current.close();
//      } catch (error) {
//        console.error(error);
//      }
//   };

const handleContributeForm = async (e) => {
  e.preventDefault();
  const form = e.target;
  const amount = Number(form.amount.value);

  const newContribute = {
    Contribute_id: _id,
    title: form.title.value,
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    amount,
    address: form.address.value,
    info: form.info.value,
    photo: user.photoURL,
  };

  Swal.fire({
    title: "Confirm Payment?",
    text: `You are about to contribute $${amount}.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Pay Now!",
    cancelButtonText: "Cancel",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await axios.post(
          "http://localhost:5000/contributes",
          newContribute,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        setContributors((prev) => {
          const updated = [...prev, res.data || newContribute];
          return updated.sort((a, b) => b.amount - a.amount);
        });

        Swal.fire("Successful 🥳", "Thanks for your contribution!", "success");

        form.reset();
        detailsModalRef.current.close();
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Something went wrong while submitting.", "error");
      }
    }
  });
};


   
   useEffect(() => {
     const loadContributors = async () => {
       try {
         
         const res = await fetch(
           `http://localhost:5000/issues/contributes/${_id}`
         );
         const data = await res.json();
        
         setContributors(data.sort((a, b) => b.amount - a.amount));
       } catch (err) {
         console.error(err);
       } 
     };

   
     if (_id) loadContributors();

   }, [_id]);


   if (loading) return <Loading></Loading>;
    console.log(contributors)
  return (
    <div className="maxWidth mx-auto">
      <div className="max-w-5xl mx-auto mt-20 p-6 bg-white shadow-xl rounded-3xl  ">
        <div className="md:flex lg:flex gap-6 justify-between">
          <div className="flex-1">
            <div className="mb-6">
              <img
                src={details?.image}
                alt={details?.title}
                className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl shadow-lg"
              />
            </div>
          </div>
          <div className="flex-1 mb-6">
            <div>
              <h1 className="text-4xl font-extrabold text-green-700 mb-2">
                {details?.title}
              </h1>
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {details?.description}
                </p>
              </div>
              <div className=" my-7">
                <span className="px-3 py-1 flex-1 rounded-full bg-emerald-200 text-emerald-800 font-semibold text-sm">
                  {details?.category}
                </span>
                <p className="text-gray-500 my-8 flex-1 text-sm">
                  📍 {details?.location}
                </p>
              </div>
              <span className="text-gray-400 text-sm">
                🗓 {details?.date || today}
              </span>
            </div>
            <div className="text-right my-9  md:text-left md:flex md:flex-col md:items-end">
              <span className="text-lg font-semibold text-gray-700">
                Fix Budget
              </span>
              <span className="text-2xl font-bold text-green-700">
                $ {details?.amount}
              </span>
            </div>
            <div>
              <button
                onClick={handleContribute}
                className="custom-btn w-full shadow-2xl py-2 px-4"
              >
                💰 Pay Clean-Up Contribution
              </button>
            </div>
          </div>
        </div>

        <dialog
          ref={detailsModalRef}
          className="modal modal-bottom  sm:modal-middle"
        >
          <div className="modal-box bg-white">
            <h2 className="text-2xl font-bold text-center mb-5 text-green-600 drop-shadow-[0_0_6px_rgba(34,197,94,0.7)]">
              Pay Clean-Up Contribution
            </h2>
            <form onSubmit={handleContributeForm}>
              <input
                name="title"
                className="text-lg w-full  font-semibold  mb-2.5"
                readOnly
                defaultValue={details.title}
              ></input>

              <div>
                <label className="label text-sm font-semibold mb-2.5">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered border-2 border-green-700 w-full"
                  defaultValue={user?.displayName}
                  required
                />
              </div>
              <div>
                <label className="label text-sm font-semibold mb-2.5">
                  Your Email
                </label>
                <input
                  type="text"
                  name="email"
                  className="input input-bordered border-2 border-green-700 w-full"
                  defaultValue={user?.email}
                  required
                />
              </div>
              <div>
                <label className="label text-sm font-semibold mb-2.5">
                  Your Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  className="input input-bordered border-2 border-green-700 w-full"
                  defaultValue={user?.phoneNumber}
                  placeholder="Your Phone Number"
                  required
                />
              </div>
              <div>
                <label className="label text-sm font-semibold mb-2.5">
                  Your Address
                </label>
                <input
                  type="text"
                  name="address"
                  className="input input-bordered border-2 border-green-700 w-full"
                  placeholder="Your Address"
                  required
                />
              </div>
              <div>
                <label className="label text-sm font-semibold mb-2.5">
                  Contribute Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  step="any"
                  className="input input-bordered border-2 border-green-700 w-full"
                  placeholder="Contribute Amount"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="label text-sm font-semibold">Date</label>
                <div className="p-2 bg-green-100 rounded-md ">{today}</div>
              </div>
              <div>
                <label className="label text-sm font-semibold">
                  Additional Info
                </label>
                <textarea
                  name="info"
                  className="textarea border-2  border-green-700  w-full"
                  placeholder="(Optional)"
                />
              </div>
              <div className=" justify-center mt-3.5 modal-action">
                <button className="custom-btn w-full shadow-2xl py-2 px-4">
                  Confirm Payment
                </button>
              </div>
            </form>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {/* ---------contributors--------- */}
      <div className="overflow-x-auto mt-8">
        <h1 className="my-10 text-4xl font-bold text-green-700">
          Contributed For This Product {contributors.length}
        </h1>
        <div className="overflow-x-auto mx-auto">
          <table className="table">
            <thead>
              <tr className="bg-green-100">
                <th className="text-blue-950">Person</th>
                <th className="text-blue-950">Name</th>
                <th className="text-blue-950">Amount</th>
              </tr>
            </thead>

            <tbody>
              {contributors.map((contributor) => (
                <tr
                  key={contributor._id}
                  className="bg-green-50 w-full shadow-2xl"
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={
                              contributor?.photo
                                ? contributor.photo
                                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            alt={contributor.name}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-bold">{contributor?.name}</div>
                    </div>
                    <span className="badge border-0 bg-green-200 text-black badge-sm">
                      {contributor?.email}
                    </span>
                  </td>
                  <td className="font-bold">{contributor?.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default IssueDetails;