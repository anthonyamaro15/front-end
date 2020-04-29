import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiAccountCircleLine } from "react-icons/ri";
import Sharednav from "../Sharednav";
import SingleClass from "./SingleClass";

const ClientProfile = () => {
  const { id } = useParams();
  const reducer = useSelector((state) => state.clientReducer.classesJoined);
  console.log("checking classesd joined ", reducer);

  return (
    <div className="ClientProfile">
      <Sharednav />
      <div className="ClientProfile-wrapper">
        <div className="profile-icon">
          <RiAccountCircleLine />
        </div>
        <div className="flex">
          <h2>Schedule</h2>
          <div className="toggle-message">
            <p>looks like you haven't join any classes yet.</p>
            <div className="find-classes">
              <Link to={`/account/client/${id}`}>find classes</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="show-joined-classes">
        {reducer.map((cls) => (
          <SingleClass key={cls.id} cls={cls} />
        ))}
      </div>
    </div>
  );
};

export default ClientProfile;
