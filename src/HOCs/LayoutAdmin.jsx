import React from "react";
import Header from "../components/Header";
import LeftBar from "../features/Admin/components/LeftBar";

const LayoutAdmin = (props) => {
  return (
    <div>
      <div style={{ position: "fixed", zIndex: "3", width:'100%' }}>
        <Header></Header>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        <div className="col-span-1 bg-slate-900 w-full">
          <div className="col-span-12 bg-slate-900 mt-20" style={{ position: "fixed", height:'100%', zIndex: "3" }}>
            <LeftBar></LeftBar>
          </div>
        </div>
        <div className="col-span-6 mt-20">
          <div className="container mx-auto p-3 border-solid border-12 border-gray-400">
            {props.children}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LayoutAdmin;
