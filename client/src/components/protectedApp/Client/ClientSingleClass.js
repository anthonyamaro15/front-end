import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Sharednav from "../Sharednav";

const ClientSingleClass = () => {
  const { id, c_id } = useParams();
  const reducer = useSelector((state) => ({
    ...state,
  }));
  const { allClasses } = reducer.clientReducer;
  const findClass = allClasses.find((single) => single.id === Number(c_id));

  const {
    description,
    duration,
    image_url,
    intensity,
    location,
    max_class_size,
    name,
    price,
    start_time,
    type,
  } = findClass;
  //   console.log("finding class ", findClass);

  //   console.log("class found ", findClass);

  //   console.log("reucer", reducer);
  //   console.log("url ", url, "path ", path);
  //   console.log("params ", id);
  return (
    <div>
      <Sharednav />
      <div className="InstructorSingleClass">
        <div className="wrapper-class">
          <div className="InstructorSingleClass-wrapper">
            <div className="img-wrapper">
              <img src={image_url} alt={name} />
            </div>
            <div className="right-side">
              <p className="name">
                Class name:
                <span>{name}</span>
              </p>
              <p className="address">
                Location:
                <span>{location}</span>
              </p>
              <p className="intensity">
                Intensity:
                <span>{intensity}</span>
              </p>
              <p className="max-size">
                Class Size:
                <span>{max_class_size}</span>
              </p>
              <p className="price">
                Price:
                <span>${price}</span>
              </p>
              <p className="start">
                Starts at:
                <span>{start_time}</span>
              </p>
              <p className="type">
                Class type:
                <span>{type}</span>
              </p>
              <p className="duration">
                Class duration:
                <span>{duration} mins</span>
              </p>
            </div>
          </div>
          <div className="bottom-description">
            <div className="InstructorSingleClass-description">
              <h2>About the class</h2>
              <span>description</span>

              <p>{description}</p>
            </div>
            <div className="goback-btn">
              <Link to={`/account/client/${id}`}>Go back</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSingleClass;
