import React from "react";
import { Link } from "react-router-dom";
import "../Styles/home.scss";

export default function Home() {
  return (
    <div className="container-fluid container-home">
      <div className="row">
        <div className="col-12 col-lg-4  text-container">
            <h1 className="title-home">Increase your 
productivity</h1>
<h4 className='mt-3 parraf-home'>If you like me don't have a perception of time,  track and manage your hours or break times and keep everything under control </h4>

            <Link to="/register"  className="btn button-home mt-3">
              Enter
            </Link>

        </div>
        <div className="col-12 col-lg-8 banner-web"></div></div>

      
    </div>
  );
}
