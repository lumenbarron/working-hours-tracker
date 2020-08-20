import React, { useState, Fragment } from "react";
import DatePicker from "react-datepicker";
import GetDateHour from "./GetDateHour";
import app from "../firebase";
import "react-datepicker/dist/react-datepicker.css";

const DateHourPicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());
  const [type, setType] = useState("");

  //Data for arriving
  let dataStart = startDate.toString(); console.log(dataStart); //Mon Aug 17 2020 11:56:07 GMT-0500 (hora de verano central)
  let dateUser = dataStart.substring(0, 15); //Mon Aug 17 2020
  let startHourUser = dataStart.substring(16, 21); //11:56

  //Data for Exit
  let dataFinish = finishDate.toString();console.log(dataFinish); //Mon Aug 17 2020 11:59:07 GMT-0500 (hora de verano central)
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

  console.log("hora salida", hourFinish, "minuto", minuteFinish);
  //hora salida  11:59

  let min = minuteFinish - minuteStart; //59 - 56 = 3
  //let min = (60 - minuteFinish) + (60 - minuteStart); //(60-59) - (60- 56) = 3
  let hours = hourFinish - hourStart; //11 - 11 = 0 * 60 = 60
  let hoursToMin = hours * 60; //11 - 11 = 0 * 60 = 60

  //Time Verifications
  if (hourFinish < hourStart) {
    //18 < 16 because you can't finish after start
    alert("your hour exit it's incorrect");
  }

  if (hourStart < hourFinish && minuteFinish < minuteStart ) {
    //4:47 - 6:52 
    min = (60 - minuteStart) + minuteFinish ; //(60-47)//13 + 52 = 65
    if (min >= 60) {
      hourFinish++;
      console.log(hourFinish);
      min = min - 60 ; //65-60=5
    } 
    hours = hourFinish - (hourStart + 1);
    hoursToMin = hours * 60;
  }

  if (hourStart < hourFinish && minuteFinish > minuteStart ) {
    //9:14 - 12:52 
    min = (60 - minuteStart) + minuteFinish; //(60)
    console.log(min);
    if (min >= 60) {
      hourFinish++;
      console.log(hourFinish);
      min = min - 60
      console.log(min, 'min2');
    } //(60-14)//46 + 52 = 98
    hours = hourFinish - (hourStart + 1);
    console.log(hourFinish, 'hourfinish 2');
    console.log('hours', hours);
    hoursToMin = hours * 60;
    console.log('hourstomin', hours);
  }

  // if (minuteFinish > minuteStart && hourStart < hourFinish) {
  //   //10:59 > 11:58 = 59 min
  //   min = (hourFinish - hourStart) * 60 - (minuteFinish - minuteStart);
  //   hours = 0;
  // }

  let amountTime = min + hoursToMin; //63

  //Adding data to firebase
  const addData = (e) => {
    e.preventDefault();
    app
      .firestore()
      .collection("working-lucy")
      .add({
        date: dateUser,
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
      <form className="mt-5" onSubmit={addData}>
        <h1>Add data</h1>
        <h2>Arriving time</h2>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
        />
        <h2>Exit time</h2>
        <DatePicker
          selected={finishDate}
          onChange={(date) => setFinishDate(date)}
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
        />
        <label htmlFor="action">Action</label>
        <select
          name="action"
          id="action"
          onChange={(e) => setType(e.currentTarget.value)}
        >
          <option value="">Action</option>
          <option value="working">Working time</option>
          <option value="break">Break Time</option>
        </select>
        <button>Submit</button>
      </form>
      <GetDateHour deleteData={deleteData} />
    </Fragment>
  );
};

export default DateHourPicker;
