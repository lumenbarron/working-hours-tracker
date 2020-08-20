import React, { Fragment, useState, useEffect } from "react";
import app from "../firebase";
import SignOut from "./SignOutButton";


export default function GetDateHour(props) {
    const [data, setData] = useState([]);
    const [timeTotal, setTimeTotal] = useState();

    useEffect(() => {
      console.log("useEfect");
      getData();
      
    }, []);
  
    const getData = () => {
      const unsubscribe = app;
      app
        .firestore()
        .collection("working-lucy")
        .onSnapshot((snapshot) => {
          const arrayData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(arrayData);
          setData(arrayData);
          
        });
      return () => unsubscribe();
    };

    const arrayTime = () => {
       const allTime = data.map(t => (t.time)).reduce((a, b) => a+b);
    //    const allMin = data.map(m => (m.timeMin)).reduce((a, b) => a+b);
    //    const allHours = data.map(h => (h.timeHour)).reduce((a, b) => a+b);
        console.log('arrayTime', allTime);
    //    if (allMin >= 60) {
    //        allHours++;
     //  } 
       // console.log('Total Horas ' , reduceTime, 'horas :' , allHours, 'minutes', allMin);
        setTimeTotal(allTime);
    } 
    return (
<Fragment>
<div className="container mb-2">
        <div className="row">
          <div className="col-md-6">
            <h3>Tracker Time</h3>
            <ul className="list-group">
              <div></div>
              {data.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <span className='mr-3'>{item.date}</span>
                  <span className='mr-3'>{item.startHour}</span>

              <span className='mr-3'>{item.finishHour}</span>
              <span className='mr-3'>{item.type}</span>
              <span className='mr-3'>{item.timeHour} hours and {item.timeMin} minutes </span>
                  <button onClick={() => props.deleteData(item.id)} className="btn btn-danger btn-sm float-right">
                    Eliminar
                  </button>
                </li>
              ))}
            <button onClick={arrayTime} className="btn btn-primary btn-sm float-right">
                    Total 
        </button>
              <h2>{timeTotal}</h2>
            </ul>
          </div>
        </div>
      </div>

      <SignOut />
</Fragment>
    )
}
