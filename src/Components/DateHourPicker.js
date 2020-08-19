import React, { useState, Fragment } from "react";
import DatePicker from "react-datepicker";
import GetDateHour from "./GetDateHour";
import { firebase } from "../firebase";
import "react-datepicker/dist/react-datepicker.css";

const DateHourPicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  console.log(startDate.toString());
 

  const [date, setDate ] =useState('');
  const [startHour, setStartHour ] =useState('');
  const [finishHour, setFinishHour ] =useState('');
  const [type, setType ] =useState('');
  const [time, setTime ] =useState();
  // const [timeMin, setTimeMin] = useState();
  // const [timeHour, setTimeHour] = useState();

  let dataStart = startDate.toString();
   //Mon Aug 17 2020 11:56:07 GMT-0500 (hora de verano central)
  let dateUser = dataStart.substring(0, 15);
  console.log(dateUser);
  //Mon Aug 17 2020
  let startHourUser = dataStart.substring(16,21);
console.log(startHourUser);
//11:56
 
  let dataStartA = dataStart.substring(16, 18);
  console.log(dataStartA);
  //11
  let dataStartB = dataStart.substring(19, 21);
  console.log(dataStartB);
  //56
  let dataNumberStartA = parseInt(dataStartA, 10); //11
  let dataNumberStartB = parseInt(dataStartB, 10); //56
  console.log("hora llegada", dataNumberStartA, "minuto", dataNumberStartB);
//hora llegada 11:56
  const [finishDate, setFinishDate] = useState(new Date());
  console.log(finishDate.toString());
  //Mon Aug 17 2020 11:59:07 GMT-0500 (hora de verano central)
  let dataFinish = finishDate.toString();
  let finishHourUser = dataFinish.substring(16,21);
  //11:59
  console.log('finishHourUser', finishHourUser);
  let dataFinishA = dataFinish.substring(16, 18);
  console.log(dataFinishA);
  //11
  let dataFinishB = dataFinish.substring(19, 21);
  console.log(dataFinishB);
  //59
  let dataNumberFinishA = parseInt(dataFinishA, 10);//11
  let dataNumberFinishB = parseInt(dataFinishB, 10);//59
  console.log("hora salida", dataNumberFinishA, "minuto", dataNumberFinishB);
//hora salida  11:59

  let min = dataNumberFinishB - dataNumberStartB;
  //59 - 56
  let hours = (dataNumberFinishA - dataNumberStartA);
  //11 - 11

  if (dataNumberFinishA < dataNumberStartA) {
    alert("seleccionaste mal la hora");
  }

  if (dataNumberFinishB < dataNumberStartB ) {
    alert("seleccionaste mal los minutos");
  }

  if (dataNumberFinishB > dataNumberStartB && dataNumberStartA < dataNumberFinishA ) {
    min = ((dataNumberFinishA - dataNumberStartA) * 60 ) - (dataNumberFinishB - dataNumberStartB);
    hours = 0
  }
  console.log("hours " + hours + "min " + min);
  let amountTime = min+hours;

  const addData = (e) => {
    e.preventDefault();
    firebase
      .firestore()
      .collection("working-lucy")
      .add({
date : dateUser,
startHour : startHourUser,
finishHour : finishHourUser,
type : type,
time : amountTime,
timeHour : hours,
timeMin : min
      })
      .then(() => setDate(''), setStartHour(''), setFinishHour(''), setType(''), setTime('') );
  };

  const deleteData = (id) => {
    console.log('eliminado');
    firebase.firestore().collection('working-lucy').doc(id).delete()
}

  return (
    <Fragment>
      <form className='mt-5' onSubmit={addData}>
        <h1>Add data</h1>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
        />
        <DatePicker
          selected={finishDate}
          onChange={(date) => setFinishDate(date)}
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
        />
        <label htmlFor="action">Action</label>
        <select name="action" id="action" onChange={(e) => setType(e.currentTarget.value)}>
          <option value=''>Action</option>
          <option value='working'>Working time</option>
          <option value='break'>Break Time</option>
        </select>
        <button>Submit</button>
      </form>
      <GetDateHour deleteData={deleteData}/>
    </Fragment>
  );
};

export default DateHourPicker;
