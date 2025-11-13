import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import useTitle from "../../Hook/UseTitle";

const AddIssue = () => {
  useTitle("AddIssue");
  const { user } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const apiKey = import.meta.env.VITE_IMAGE_APIKEY;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setImageUrl(data.data.url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };
  const date = new Date().toISOString().split("T")[0];
  const handleIssueFrom = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      alert("Please wait until the image finishes uploading.");
      return;
    }

    setLoading(true);
    const from = e.target;
    const title = from.title.value;
    const category = from.category.value;
    const location = from.location.value;
    const description = from.description.value;
    const image = imageUrl;
    const amount = parseInt(from.amount.value);
    const email = from.email.value;
    const newIssue = {
      title: title,
      category: category,
      location: location,
      description: description,
      image: image,
      amount: amount,
      email: email,
      date: date,
      status: "On Going",
      name: user?.displayName,
    };
    try {
      const res = await axios.post(
        "https://cleanify-server-psi.vercel.app/issues",
        newIssue
      );
      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Issue Is Added",
        status: "On Going",
        showConfirmButton: false,
        timer: 1500,
      });
      from.reset();
      setImageUrl("");
      setLoading(false);
    } catch (err) {
      console.error("Error posting issue:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="/">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto my-10 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
          🧹 Report a Cleanliness Issue
        </h1>

        <form onSubmit={handleIssueFrom} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Issue Title</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Garbage pile near main street"
              className="input input-bordered border-2 bg-green-50 border-green-300 w-full"
              name="title"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>
            <select
              required
              defaultValue=""
              className="select input-bordered border-2 bg-green-50 border-green-300 select-bordered w-full"
              name="category"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Garbage">Garbage</option>
              <option value="Illegal Construction">Illegal Construction</option>
              <option value="Broken Public Property">
                Broken Public Property
              </option>
              <option value="Road Damage">Road Damage</option>
            </select>
          </div>
          <div>
            <label className="label">
              <span className="label-text font-semibold">Location</span>
            </label>
            <input
              type="text"
              placeholder="Enter specific location"
              className="input input-bordered border-2 bg-green-50 border-green-300 w-full"
              name="location"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text font-semibold">Description</span>
            </label>
            <textarea
              placeholder="Describe the issue in detail..."
              className="textarea textarea-bordered border-2 bg-green-50 border-green-300 w-full h-28"
              name="description"
              required
            ></textarea>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold">Upload Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input border-2 bg-green-50 border-green-300 file-input-bordered w-full"
              name="image"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text font-semibold">
                Suggested Fix Budget $
              </span>
            </label>
            <input
              type="text"
              placeholder="Optional"
              className="input input-bordered w-full border-2 bg-green-50 border-green-300"
              name="amount"
              defaultValue="2000"
            />
          </div>
          <div>
            <h1 className="text-gray-400 text-sm">
              <span className="text-green-700">Issue Date: </span>🗓 {date}
            </h1>
          </div>
          <div>
            <label className="label">
              <span className="label-text font-semibold">Your Email</span>
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              name="email"
            />
          </div>

          <button
            type="submit"
            className="btn custom-btn w-full mt-4"
            disabled={loading || uploading}
          >
            {loading
              ? "Submitting..."
              : uploading
              ? "Uploading Image..."
              : "Submit Issue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddIssue;
