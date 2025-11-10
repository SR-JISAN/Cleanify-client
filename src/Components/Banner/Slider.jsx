import React from "react";
import garbage from "../../assets/garbage.png"
import BPR from "../../assets/BPR.png"
import illegalCon from "../../assets/illegalCon.png";
import RR from "../../assets/RR.png"

const Slider = () => {
  

  return (
    <>
      <h1 className="text-center mt-28 mb-10 text-4xl font-bold">Category</h1>
      <div className="grid gap-4 max-w-[1000px] mx-7 md:mx-7  lg:mx-auto mb-28 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="custom-card rounded-2xl">
          <img
            className="rounded-2xl h-full bg-cover"
            src={garbage}
            alt="garbage"
          />
        </div>
        <div className="custom-card rounded-2xl">
          <img className="rounded-2xl h-full bg-cover" src={BPR} alt="BPR" />
        </div>
        <div className="custom-card rounded-2xl">
          <img
            className="rounded-2xl h-full bg-cover"
            src={illegalCon}
            alt="illegalCon"
          />
        </div>
        <div className="custom-card rounded-2xl">
          <img className="rounded-2xl h-full bg-cover" src={RR} alt="RR" />
        </div>
      </div>
    </>
  );
};

export default Slider;
