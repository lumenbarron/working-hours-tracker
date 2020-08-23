import React, { Fragment, useState, useEffect } from "react";
import app from "../firebase";
import SignOut from "./SignOutButton";
import "../Styles/get-date-hour.scss";

export default function GetDateHour(props) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");
  const [totalHours, setTotalHours] = useState(0);
  const [totalMin, setTotalMin] = useState(0);
  const [totalWorkHours, setTotalWorkHours] = useState(0);
  const [totalWorkMin, setTotalWorkMin] = useState(0);
  const [totalBreakHours, setTotalBreakHours] = useState(0);
  const [totalBreakMin, setTotalBreakMin] = useState(0);

  useEffect(() => {
    console.log("useEfect");
    getData();
    getUser();
  }, []);

  //Get data for the autenticated user , just his/her data
  const getData = () => {
    const unsubscribe = app;
    app.auth().onAuthStateChanged((user) => {
      app
        .firestore()
        .collection("working-lucy")
        .where("idUser", "==", user.uid)
        .onSnapshot((snapshot) => {
          const arrayData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(arrayData);
          setData(arrayData);
        });
      return () => unsubscribe();
    });
  };

  //Get information for user (just name)
  const getUser = () => {
    app.auth().onAuthStateChanged((user) => {
      app
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUser(doc.data().userName);
          }
        });
    });
  };

  const arrayTime = () => {
    const allTime = data.map((t) => t.time).reduce((a, b) => a + b); //1329 min
    calculateAllTime(allTime);
    //working hours
    const filterWorkData = data.filter((w) => w.type === "working");
    if (filterWorkData.length <= 0) {
      setTotalWorkHours(0);
      setTotalWorkMin(0);
    } else {
      const allWorkingHours = filterWorkData
        .map((w) => w.time)
        .reduce((a, b) => a + b);
      calculateWorkingTime(allWorkingHours);
    }

    //break hours
    const filterBreakData = data.filter((w) => w.type === "break");
    if (filterBreakData.length <= 0) {
      setTotalBreakHours(0);
      setTotalBreakMin(0);
    } else {
      const allFilterData = filterBreakData
        .map((w) => w.time)
        .reduce((a, b) => a + b);
      console.log(allFilterData);
      calculateBreakTime(allFilterData);
    }
  };

  const calculateAllTime = (allTime) => {
    const allHours = allTime / 60; //22.15
    const realHours = Math.floor(allHours); //22
    const allMin = (allHours - realHours) * 60; //22.15 -22 =.15 * 60 = 9
    const realMin = Math.round(allMin); //9
    setTotalHours(realHours);
    setTotalMin(realMin);
    console.log(realHours, "hours", realMin, "minutes");
  };

  const calculateWorkingTime = (allWorkingHours) => {
    const allHours = allWorkingHours / 60; //22.15
    const realHours = Math.floor(allHours); //22
    const allMin = (allHours - realHours) * 60; //22.15 -22 =.15 * 60 = 9
    const realMin = Math.round(allMin); //9
    setTotalWorkHours(realHours);
    setTotalWorkMin(realMin);
    console.log(realHours, "hours", realMin, "minutes");
  };

  const calculateBreakTime = (allFilterData) => {
    const allHours = allFilterData / 60; //22.15
    const realHours = Math.floor(allHours); //22
    const allMin = (allHours - realHours) * 60; //22.15 -22 =.15 * 60 = 9
    const realMin = Math.round(allMin); //9
    setTotalBreakHours(realHours);
    setTotalBreakMin(realMin);
    console.log(realHours, "hours", realMin, "minutes");
  };

  return (
    <Fragment>
      <h3 className="title-tracker flex-all">Your Time {user}</h3>

      {data.length > 0 ? (
        <Fragment>
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
                    {/* <button
                      onClick={() => props.deleteData(item.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Eliminar
                    </button> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="container-fluid ">
            <div className="row flex-all">
              <button onClick={arrayTime} className="btn button-total">
                Total
              </button>
            </div>
            <div className="table-responsive mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th className="title-expected">Expected time</th>
                    <th className="title-expected"> Real time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="title-time"> 48 Hours</th>
                    <th className="title-time">
                      {totalHours} Hours and {totalMin} Minutes
                    </th>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th className="title-expected">Expected Working time</th>
                    <th className="title-expected">Real Working time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="title-time"> 40 Hours</th>
                    <th className="title-time">
                      {totalWorkHours} Hours and {totalWorkMin} Minutes
                    </th>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th className="title-expected">Expected Break time</th>
                    <th className="title-expected">Real Break time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="title-time"> 8 Hours</th>
                    <th className="title-time">
                      {totalBreakHours} Hours and {totalBreakMin} Minutes
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Fragment>
      ) : (
        <div>
          <h3 className="title-time flex-all">No time register</h3>
        </div>
      )}
      <div className="row sign-out-container m-3">
        <SignOut />
      </div>
    </Fragment>
  );
}
