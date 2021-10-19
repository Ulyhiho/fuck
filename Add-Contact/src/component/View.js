import React from "react";
import { Link } from "react-router-dom";

const View = (props) => {
  const contactInfo = JSON.parse(localStorage.getItem("contactInfo"));
  return (
    <div className="container-md">
      <br />
      <form>
        <div className="container-md">
          <label className="form-label">
            <h3 style={{ color: "gray" }}>VIEW - READ ONLY</h3>
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            ID: {props.location.state.id + 1}
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Full Name: {contactInfo[props.location.state.id].fullname}
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Email Address: {contactInfo[props.location.state.id].email}
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Contact Number: {contactInfo[props.location.state.id].contact}
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Location: {contactInfo[props.location.state.id].location}
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Registered Date: {contactInfo[props.location.state.id].regdate}
          </label>
        </div>
        <div className="mb-3">
          <Link to="/">
            <button className="btn btn-outline-secondary">&lt; Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default View;
