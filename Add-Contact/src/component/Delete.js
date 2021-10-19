import React, { Component } from "react";
import { Link } from "react-router-dom";

const Delete = (props) => {
  const contactInfo = JSON.parse(localStorage.getItem("contactInfo"));
  const handleDeleteButton = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete the record?")) {
      const currentID = contactInfo.splice(props.location.state.id, 1);
      const toDelete = contactInfo.splice(currentID);
      localStorage.setItem("contactInfo", JSON.stringify(toDelete));
      props.history.push({ pathname: "/" });
    }
  };
  return (
    <div className="col-sm-3">
      <br />
      <form>
        <div className="mb-3">
          <label className="form-label">
            <h3 style={{ color: "gray" }}>DELETE - READ ONLY</h3>
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
            <button className="btn btn-outline-secondary"> &lt; Back</button>
          </Link>
          <button
            className="btn btn-outline-secondary"
            onClick={(e) => handleDeleteButton(e)}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};
export default Delete;
