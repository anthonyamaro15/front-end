import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";
import Sharednav from "../Sharednav";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
      width: "25ch",
    },
  },
}));

const values = {
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
};

const getTime = new Date().toLocaleDateString();

const EditClass = () => {
  const { id, c_id } = useParams();
  const history = useHistory();
  const [classe, setClasse] = useState(values);
  const [img, setImg] = useState("");
  const classes = useStyles();

  const [selectedTime, setSelectedTime] = useState(getTime);
  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54")
  );

  //   GET /api/instructors/:id/classes/:class_id
  useEffect(() => {
    axiosWithAuth()
      .get(`/api/instructors/${id}/classes/${c_id}`)
      .then((res) => {
        //   console.log(res);
        setClasse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setClasse, id, c_id]);

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

    //   console.log("params here ", params);
  };

  const handleTimeChange = (date) => {
    setSelectedTime(date);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.toLocaleDateString());
  };

  const handleValueChange = (e) => {
    const newObj = e.target.value;
    setClasse({
      ...classe,
      [e.target.name]: newObj,
    });

    //  console.log(e.target.value);
  };

  const submitNewValues = (e) => {
    e.preventDefault();
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
    } = classe;

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

    //   /api/instructors/:id/classes/:class_id
    axiosWithAuth()
      .put(`/api/instructors/${id}/classes/${c_id}`, newValues)
      .then((res) => {
        //   console.log("new values from edit ", res);
        history.push(`/account/instructor/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });

    //  console.log("edit function here ", newValues);
  };

  return (
    <div className="EditClass">
      <Sharednav />
      <form className={classes.root} onSubmit={submitNewValues}>
        <label htmlFor="name">
          <TextField
            type="text"
            id="name"
            name="name"
            placeholder="class name"
            // as={TextField}
            value={classe.name}
            onChange={handleValueChange}
          />
        </label>
        <label htmlFor="type">
          <TextField
            type="text"
            id="type"
            name="type"
            placeholder="class type"
            // as={TextField}
            value={classe.type}
            onChange={handleValueChange}
          />
        </label>
        <label htmlFor="location">
          <TextField
            type="text"
            id="location"
            name="location"
            placeholder="class location"
            // as={TextField}
            value={classe.location}
            onChange={handleValueChange}
          />
        </label>
        <label htmlFor="intensity">
          <TextField
            type="number"
            id="intensity"
            name="intensity"
            placeholder="class intensity"
            // as={TextField}
            value={classe.intensity}
            onChange={handleValueChange}
          />
        </label>
        <label htmlFor="status">
          <TextField
            type="text"
            id="status"
            name="status"
            placeholder="class status 'optional' "
            // as={TextField}
            value={classe.status}
            onChange={handleValueChange}
          />
        </label>
        <label htmlFor="price">
          <TextField
            type="number"
            id="price"
            name="price"
            placeholder="class price"
            // as={TextField}
            value={classe.price}
            onChange={handleValueChange}
          />
        </label>
        <label htmlFor="duration">
          <TextField
            type="number"
            id="duration"
            name="duration"
            placeholder="class duration"
            // as={TextField}
            value={classe.duration}
            onChange={handleValueChange}
          />
        </label>
        <label htmlFor="max_class_size">
          <TextField
            type="number"
            id="max_class_size"
            name="max_class_size"
            placeholder="max class size"
            // as={TextField}
            value={classe.max_class_size}
            onChange={handleValueChange}
          />
        </label>
        <label htmlFor="description">
          <TextField
            type="text"
            id="description"
            name="description"
            placeholder="desctioption of class"
            // as={TextField}
            value={classe.description}
            onChange={handleValueChange}
          />
        </label>
        <TextField
          className="file"
          type="file"
          name="file"
          onChange={uploadImage}
          //  as={TextField}
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

        <div className="btn-add-edit">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditClass;
