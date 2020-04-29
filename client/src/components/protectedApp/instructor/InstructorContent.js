import React from "react";
import AddClassesForm from "./AddClassesForm";

const InstructorContent = ({ setUpdateData }) => {
  return (
    <div className="Content">
      <h3>Schedule</h3>
      <div className="no-classes">
        <p>Looks like you don't have any classes yet</p>
        <p>let's add some.</p>
      </div>
      <AddClassesForm setUpdateData={setUpdateData} />
    </div>
  );
};

export default InstructorContent;
