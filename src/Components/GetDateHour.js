import React, { Fragment, useState, useEffect } from "react";
import app from "../firebase";
import SignOut from "./SignOutButton";
import "../Styles/get-date-hour.scss";

export default function GetDateHour(props) {
  const [data, setData] = useState([]);
  const [totalHours, setTotalHours] = useState();
  const [totalMin, setTotalMin] = useState();

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
    const allTime = data.map((t) => t.time).reduce((a, b) => a + b); //1329 min
    const allHours = allTime / 60; //22.15
    const realHours = Math.floor(allHours); //22
    const allMin = (allHours - realHours) * 60; //22.15 -22 =.15 * 60 = 9
    const realMin = Math.round(allMin); //9
    setTotalHours(realHours);
    setTotalMin(realMin);
    console.log(realHours, "huors", realMin, "minutes"); //20 hours , 129 min
  };
  return (
    <Fragment>
      <h3 className="title-time">Your Time</h3>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Arriving hour</th>
              <th scope="col">Exit hour</th>
              <th scope="col">Activity</th>
              <th scope="col">Total Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.date}</th>
                <td>{item.startHour}</td>
                <td>{item.finishHour}</td>
                <td>{item.type}</td>
                <td>
                  {item.timeHour} hours and {item.timeMin} minutes
                </td>
                <button
                  onClick={() => props.deleteData(item.id)}
                  className="btn btn-danger btn-sm"
                >
                  Eliminar
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-4">
            <button onClick={arrayTime} className="btn button-total">
              Total
            </button>
          </div>
          <div className="col-12 col-lg-8">
            <h4 className="title-time">
              Hours : {totalHours} | Minutes : {totalMin}
            </h4>
            <h4> </h4>
          </div>
        </div>
        <div className="row sign-out-container">
          <SignOut />
        </div>
      </div>
    </Fragment>
  );
}
