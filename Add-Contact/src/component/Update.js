import React from "react";
import { Link } from "react-router-dom";
import validator from "validator";

const Update = (props) => {
  const contactInfo = JSON.parse(localStorage.getItem("contactInfo"));
  const currentContact = JSON.parse(localStorage.getItem("contactInfo"));
  const errors = {
    emailError: "",
    contactError: "",
    locationError: "",
  };

  const handleUpdateOption = (e) => {
    e.preventDefault();
    const isValid = validate(e);
    if (isValid) {
      let emailNew = e.currentTarget.email.value,
        contactNew = e.currentTarget.contact.value,
        locationNew = e.currentTarget.location.value;
      const updateContact = contactInfo.splice(props.location.state.id);

      if (currentContact[props.location.state.id].email !== emailNew) {
        updateContact[0].email = emailNew;
      }
      if (currentContact[props.location.state.id].contact !== contactNew) {
        updateContact[0].contact = contactNew;
      }
      if (currentContact[props.location.state.id].location !== locationNew) {
        updateContact[0].location = locationNew;
      }

      if (
        window.confirm(`Please confirm the update to the following:
                \n
                Email Address: ${emailNew}\n
                Contact Number: ${contactNew}\n
                Location: ${locationNew}
                `)
      ) {
        props.history.push({ pathname: "/" });
        currentContact[props.location.state.id] = updateContact[0];
        const json = JSON.stringify(currentContact);
        localStorage.setItem("contactInfo", json);
      }
    } else {
      if (
        window.confirm(`ERROR:\n
            Email Address: ${errors.emailError}\n
            Contact Number: ${errors.contactError}\n
            Location: ${errors.locationError}`)
      ) {
        props.history.push({
          pathname: "/update",
          state: { id: props.location.state.id },
        });
      }
    }
  };

  const validate = (e) => {
    let valid = true,
      email = "",
      contact = "",
      location = "";

    //Email Address
    if (e.currentTarget.email.value.length >= 45) {
      email = "Email Address field accept up to 45 in size only";
      valid = false;
    } else if (!validator.isEmail(e.currentTarget.email.value)) {
      email = "Email Address field should have email domain";
      valid = false;
    }
    if (!e.currentTarget.email.value) {
      email = "Email Address field cannot be blank";
      valid = false;
    }

    //Contact Number
    if (e.currentTarget.contact.value.length === 0) {
      contact = "Contact Number field cannot be blank";
      valid = false;
    } else if (e.currentTarget.contact.value.length !== 11) {
      contact = "Contact Number field accept up to 11 in size only";
      valid = false;
    }
    if (typeof e.currentTarget.contact.value !== "undefined") {
      if (!e.currentTarget.contact.value.match(/^[0-9]*$/)) {
        contact = "Contact Number field accept numeric values only";
        valid = false;
      }
    }

    //Location
    if (!e.currentTarget.location.value) {
      location = "Location field cannot be blank";
      valid = false;
    }

    if (!valid) {
      errors.emailError = email;
      errors.contactError = contact;
      errors.locationError = location;
      return false;
    }

    return true;
  };
  return (
    <div className="col-sm-3">
      <br />
      <form onSubmit={(e) => handleUpdateOption(e)}>
        <div className="mb-3">
          <label className="form-label">
            <h3 style={{ color: "gray" }}>UPDATE</h3>
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
          <label className="form-label">Email Address</label>
          <input
            className="form-control"
            placeholder="example@email.com"
            name="email"
            defaultValue={contactInfo[props.location.state.id].email}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Number: </label>
          <input
            className="form-control"
            placeholder={99999999999}
            type="text"
            name="contact"
            defaultValue={contactInfo[props.location.state.id].contact}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <select className="form-select" type="text" name="location">
            <option value={contactInfo[props.location.state.id].location}>
              {contactInfo[props.location.state.id].location}
            </option>
            <option
              value={
                contactInfo[props.location.state.id].location !== "Manila"
                  ? "Manila"
                  : "Cebu"
              }
            >
              {contactInfo[props.location.state.id].location !== "Manila"
                ? "Manila"
                : "Cebu"}
            </option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Registered Date: {contactInfo[props.location.state.id].regdate}
          </label>
        </div>
        <div className="mb-3">
          <div className="bd-example">
            <Link to="/">
              <button className="btn btn-outline-secondary">&lt; Back</button>
            </Link>
            <button className="btn btn-outline-secondary">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Update;
