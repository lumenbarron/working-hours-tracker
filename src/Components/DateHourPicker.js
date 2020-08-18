import React, { useState, Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateHourPicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    console.log(startDate.toString());
    //Mon Aug 17 2020 11:56:07 GMT-0500 (hora de verano central)
    let dataStart = startDate.toString();
    let dataStartA = dataStart.substring(16, 18);
    console.log(dataStartA);
    //11
    let dataStartB = dataStart.substring(19, 21);
    console.log(dataStartB);
    //35
    let dataNumberStartA = parseInt(dataStartA, 10);
    let dataNumberStartB = parseInt(dataStartB, 10);
    console.log('hora llegada', dataNumberStartA, 'minuto' , dataNumberStartB);
  
    const [finishDate, setFinishDate] = useState(new Date());
    console.log(finishDate.toString());
    //Mon Aug 17 2020 11:56:07 GMT-0500 (hora de verano central)
    let dataFinish = finishDate.toString();
    let dataFinishA = dataFinish.substring(16, 18);
    console.log(dataFinishA);
    //11
    let dataFinishB = dataFinish.substring(19, 21);
    console.log(dataFinishB);
    //35
    let dataNumberFinishA = parseInt(dataFinishA, 10);
    let dataNumberFinishB = parseInt(dataFinishB, 10);
    console.log('hora salida',dataNumberFinishA, 'minuto', dataNumberFinishB);
    
    //const [sumTime] = useState(sumTime);
      let min = dataNumberFinishB - dataNumberStartB;
      let hours = dataNumberFinishA - dataNumberStartA;

      if (dataNumberFinishA < dataNumberStartA ) {
        alert('seleccionaste mal la hora')
      }

      if (dataNumberFinishB < dataNumberStartB ) {
        alert('seleccionaste mal los minutos')
      }
      console.log('hours ' + hours + 'min '+ min );

    
    return (
        <Fragment>
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
    
    </Fragment>
  
    );
  };
  
  export default DateHourPicker;
  