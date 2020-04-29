import React from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleResult = ({ cls, joinClass }) => {
  const { id, duration, image_url, name, price, start_time } = cls;
  const { url } = useRouteMatch();
  const params = useParams();
  const reducer = useSelector((state) => state.clientReducer);

  console.log("checking reducer ", reducer);
  //   console.log("aprams ", params);

  const convert = new Date(start_time);
  const t = convert.toLocaleTimeString().split(":");
  const am = t.slice(-1)[0].split(" ")[1];
  const time = `${t[0]}:${t[1]} ${am}`;

  // search
  //   const newUrl = `/account/client/${params.id}`;
  // /account/client / 5 / yoga / results
  // /account/client / 5 / 8 / more - info
  //   console.log("url hrer", url);
  return (
    <div className="InstructorCardClass">
      <Link to={`/${url}/${id}/more-info`}>
        <div className="InstructorCardClass-img">
          <img src={image_url} alt="doing yoga" />
        </div>
      </Link>
      <div className="InstructorCardClass-description">
        <div className="Instructor-top-row">
          <p className="name">{name}</p>
          <p className="price">${price}</p>
        </div>
        <p className="duration">
          <span>{duration}</span> mins
        </p>
        <div className="bottom-row">
          <p className="starts">{time}</p>
          <div id="join" onClick={joinClass}>
            join
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleResult;
