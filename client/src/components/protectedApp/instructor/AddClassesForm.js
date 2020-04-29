import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
      width: "25ch",
    },
  },
}));

const validationSchema = yup.object().shape({
  name: yup.string().required("Field required"),
  type: yup.string().required("Field require"),
  start_time: yup.string().required("Field required"),
  status: yup.string(),
  intensity: yup.number().required("Field required"),
  //  .max(5, "canoot be longer than that"),
  price: yup.number().required("Field required"),
  duration: yup.number().required("Field required"),
  max_class_size: yup.number().required("Field required"),
  description: yup.string().required("Field required"),
});

const getTime = new Date().toLocaleDateString();

const AddClassesForm = ({ setUpdateData }) => {
  const dispatch = useDispatch();
  const reducer = useSelector((state) => ({
    ...state,
  }));
  const [selectedTime, setSelectedTime] = useState(getTime);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("id"));
    //  console.log(id);
    if (id) {
      dispatch({ type: "SAVE_INSTRUCTOR_ID", payload: id });
    }
  }, [dispatch]);

  const { instructorID } = reducer.userReducer;
  //   console.log("instructor here ", instructorID);

  const [img, setImg] = useState("");
  const classes = useStyles();

  const handleTimeChange = (date) => {
    //  console.log(newTime);

    setSelectedTime(date);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date.toLocaleDateString());
    //  console.log(date.toLocaleDateString());
    //   new Date().getDate()
  };

  const uploadImage = (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("upload_preset", "pl2czq6m");
    formData.append("file", files);

    axios
      .post(`https://api.cloudinary.com/v1_1/dedps0vtx/image/upload`, formData)
      .then((res) => {
        //   console.log(res);
        setImg(res.data.secure_url);
      })
      .catch((err) => [console.log(err)]);
  };

  return (
    <div className="AddClassesForm">
      <Formik
        initialValues={{
          name: "",
          type: "",
          location: "",
          start_time: "",
          intensity: "",
          status: "",
          price: "",
          duration: "",
          max_class_size: "",
          description: "",
        }}
        onSubmit={(values, { resetForm }) => {
          const datesFormatted = `${selectedDate} ${selectedTime.toLocaleTimeString()}`;
          const {
            name,
            type,
            location,
            start_time,
            intensity,
            price,
            duration,
            max_class_size,
            description,
            image_url,
          } = values;
          const newValues = {
            name,
            type,
            location,
            start_time: datesFormatted,
            intensity,
            price,
            duration,
            max_class_size,
            description,
            image_url: img,
          };
          //  console.log(newValues);

          axiosWithAuth()
            .post(`/api/instructors/${instructorID}/classes`, newValues)
            .then((res) => {
              //   console.log("class added", res);
              setUpdateData(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          resetForm();
        }}
      >
        {() => (
          <Form className={classes.root}>
            <label htmlFor="name">
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="class name"
                as={TextField}
              />
            </label>
            <label htmlFor="type">
              <Field
                type="text"
                id="type"
                name="type"
                placeholder="class type"
                as={TextField}
              />
            </label>
            <label htmlFor="location">
              <Field
                type="text"
                id="location"
                name="location"
                placeholder="class location"
                as={TextField}
              />
            </label>
            <label htmlFor="intensity">
              <Field
                type="number"
                id="intensity"
                name="intensity"
                placeholder="class intensity"
                as={TextField}
              />
            </label>
            <label htmlFor="status">
              <Field
                type="text"
                id="status"
                name="status"
                placeholder="class status 'optional' "
                as={TextField}
              />
            </label>
            <label htmlFor="price">
              <Field
                type="number"
                id="price"
                name="price"
                placeholder="class price"
                as={TextField}
              />
            </label>
            <label htmlFor="duration">
              <Field
                type="number"
                id="duration"
                name="duration"
                placeholder="class duration"
                as={TextField}
              />
            </label>
            <label htmlFor="max_class_size">
              <Field
                type="number"
                id="max_class_size"
                name="max_class_size"
                placeholder="max class size"
                as={TextField}
              />
            </label>
            <label htmlFor="description">
              <Field
                type="text"
                id="description"
                name="description"
                placeholder="desctioption of class"
                as={TextField}
              />
            </label>

            <Field
              className="file"
              type="file"
              name="file"
              onChange={uploadImage}
              as={TextField}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                className="time-picker"
                margin="normal"
                id="time-picker"
                label="class start time"
                value={selectedTime}
                onChange={handleTimeChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />

              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="class date"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>

            <div className="btn-add">
              <button type="submit">Add class</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddClassesForm;
