import React, { useState, Fragment } from "react";
import app from "../firebase";
import GetDateHour from "./GetDateHour";
import NavLinkHome from "./NavLink";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/date-hour-picker.scss";
import swal from "sweetalert";

const DateHourPicker = (props) => {
  let userId = props.userId
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());
  const [type, setType] = useState("");

  //Data for arriving
  let dataStart = startDate.toString(); //Mon Aug 17 2020 11:56:07 GMT-0500 (hora de verano central)
  let dateUser = dataStart.substring(0, 15); //Mon Aug 17 2020
  let startHourUser = dataStart.substring(16, 21); //11:56

  //Data for Exit
  let dataFinish = finishDate.toString();//Mon Aug 17 2020 11:59:07 GMT-0500 (hora de verano central)
  let finishHourUser = dataFinish.substring(16, 21); //11:59

  //For Calculate time---Arriving
  let dataStartA = dataStart.substring(16, 18);
  let hourStart = parseInt(dataStartA, 10); //11
  let dataStartB = dataStart.substring(19, 21);
  let minuteStart = parseInt(dataStartB, 10); //56

  console.log("arriving time", hourStart, "minuto", minuteStart);
  //arriving time 11:56

  //For Calculate time---Exit
  let dataFinishA = dataFinish.substring(16, 18);
  let hourFinish = parseInt(dataFinishA, 10); //11
  let dataFinishB = dataFinish.substring(19, 21);
  let minuteFinish = parseInt(dataFinishB, 10); //59

  console.log("exit time", hourFinish, "minuto", minuteFinish);
  //hora salida  11:59

  let min = minuteFinish - minuteStart; //59 - 56 = 3
  let hours = hourFinish - hourStart; //11 - 11 = 0 * 60 = 60
  let hoursToMin = hours * 60; //11 - 11 = 0 * 60 = 60

  //Time Verifications
  if (hourFinish < hourStart) {
    //18 < 16 because you can't finish after start
    swal(
      "Oops?",
      "Check if your exit time it's correct",
      "error"
    );
  }

  if (hourStart < hourFinish && minuteFinish < minuteStart) {
    //4:47 - 6:52
    min = 60 - minuteStart + minuteFinish; //(60-47)//13 + 52 = 65
    if (min >= 60) {
      hourFinish++;
      min = min - 60; //65-60=5
    }
    hours = hourFinish - (hourStart + 1);
    hoursToMin = hours * 60;
  }

  if (hourStart < hourFinish && minuteFinish > minuteStart) {
    //9:14 - 12:52
    min = 60 - minuteStart + minuteFinish; //(60-14) = 46 + 52 = 98
    if (min >= 60) {
      hourFinish++;
      min = min - 60; //98 - 60 = 38
    }
    hours = hourFinish - (hourStart + 1);
    hoursToMin = hours * 60;
  }

  let amountTime = min + hoursToMin;

  //Adding data to firebase
  const addData = (e) => {
    e.preventDefault();
    app
      .firestore()
      .collection("working-lucy")
      .add({
        date: dateUser,
        idUser : userId,
        startHour: startHourUser,
        finishHour: finishHourUser,
        type: type,
        time: amountTime,
        timeHour: hours,
        timeMin: min,
      })
      .then(setType(""));
  };

  const deleteData = (id) => {
    console.log("eliminado");
    app.firestore().collection("working-lucy").doc(id).delete();
  };

  return (
    <Fragment>
      <NavLinkHome />
      <div className="container-fluid container-home">
        <div className="row">
          <div className="col-12 col-lg-5">
            <form className="mt-5 flex-column" onSubmit={addData}>
              <label className="title-time">
                Arriving hour
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  showTimeInput
                  className="date-input"
                />
              </label>
              <label className="title-time mt-3">
                Exit hour
                <DatePicker
                  selected={finishDate}
                  onChange={(date) => setFinishDate(date)}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  showTimeInput
                  className="date-input"
                />
              </label>
              <label htmlFor="action" className="title-time">
                Activity
                <select
                  className="btn date-input select-action"
                  name="action"
                  id="action"
                  onChange={(e) => setType(e.currentTarget.value)}
                >
                  <option value="">Action</option>
                  <option value="working">Working time</option>
                  <option value="break">Break Time</option>
                </select>
              </label>
              <button className="btn button-time mt-3">Send</button>
            </form>
          </div>
          <div className="col-12 col-lg-7">
            <GetDateHour deleteData={deleteData} userId={userId} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DateHourPicker;
