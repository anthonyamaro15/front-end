import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";
import InstructorHeader from "./InstructorHeader";
import InstructorContent from "./InstructorContent";
import DisplayInstructorsClasses from "./DisplayInstructorsClasses";

const InstructionHomePage = () => {
  const [updateData, setUpdateData] = useState({});

  const { id } = useParams();
  const dispatch = useDispatch();
  const reducer = useSelector((state) => ({
    ...state,
  }));
  const { instructorClass, instructorName } = reducer.userReducer;
  //   console.log("reducer here", instructorID);

  //   console.log("name", instructorName);

  useEffect(() => {
    dispatch({ type: "FETCHING_INSTRUCTOR_CLASSES" });
    axiosWithAuth()
      .get(`/api/instructors/${id}/classes`)
      .then((res) => {
        //   console.log("response here ", res);
        dispatch({ type: "GETTING_INSTRUCTOR_CLASSES", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_GETTING_CLASSES", payload: err });
      });
  }, [updateData, id, dispatch]);

  useEffect(() => {
    dispatch({ type: "FETCHING_INSTRUCTOR" });
    axiosWithAuth()
      .get(`api/instructors/${id}`)
      .then((res) => {
        //   console.log("instructor information ", res);
        dispatch({
          type: "SAVE_INSTRUCTOR_NAME",
          payload: res.data.first_name,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_GETTING_INSTRUCTOR", payload: err });
      });
  }, [dispatch, id]);

  //   DELETE /api/instructors/:id/classes/:class_id

  const deleteClass = (item) => {
    //  console.log("clicked class ", item);
    dispatch({ type: "REMOVING_CLASS" });
    axiosWithAuth()
      .delete(`/api/instructors/${id}/classes/${item.id}`)
      .then((res) => {
        //   console.log("res from deleting..", res);
        dispatch({ type: "REMOVED_CLASS" });
        setUpdateData(res.data);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_REMOVING_CLASS" });
      });
  };

  return (
    <div>
      <InstructorHeader name={instructorName} />
      <InstructorContent setUpdateData={setUpdateData} />
      <DisplayInstructorsClasses
        classes={instructorClass}
        deleteClass={deleteClass}
      />
    </div>
  );
};

export default InstructionHomePage;
