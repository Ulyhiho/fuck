import React from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import dayjs from "dayjs";

export default class ContactListWebApp extends React.Component {
  state = {
    contactInfo: [],
    indexID: "",
    curr: 0,
    errors: {
      nameError: "",
      emailError: "",
      contactError: "",
      locationError: "",
      regDateError: "",
    },
    currentPage: 1,
    contactPerPage: 5,
  };

  //Saving Contact Information into Local Storage
  componentDidUpdate(prevProps, prevState) {
    const json = JSON.stringify(this.state.contactInfo);
    localStorage.setItem("contactInfo", json);
  }
  componentDidMount() {
    try {
      const json = localStorage.getItem("contactInfo");
      const contactInfo = JSON.parse(json);
      if (contactInfo) {
        this.setState(() => ({ contactInfo }));
      }
    } catch (e) {
      console.log("Component Did Mount Error");
    }
  }
  handleClickButton = (event) => {
    let set = event.target.id;
    this.setState({ currentPage: set });
  };

  //Validation of Contact Information
  validation = () => {
    let valid = true,
      name = "",
      email = "",
      contact = "",
      location = "",
      regDate = "";

    //Name
    if (this.fullname.value.length >= 30) {
      name = "Full Name field accept up to 30 in size only";
      valid = false;
    } else if (typeof this.fullname.value !== "undefined") {
      if (!this.fullname.value.match(/^[,.a-zA-Z\s]*$/)) {
        name = "Full Name field accept characters values only";
        valid = false;
      }
    }
    if (!this.fullname.value) {
      name = "Full Name field cannot be blank";
      valid = false;
    }

    //Email Address
    if (!this.email.value) {
      email = "Email Address field cannot be blank";
      valid = false;
    } else if (!validator.isEmail(this.email.value)) {
      email = "Email Address field should have email domain";
      valid = false;
    } else if (this.email.value.length >= 45) {
      email = "Email Address field accept up to 45 in size only";
      valid = false;
    }

    //Contact Number
    if (this.contact.value.length === 0) {
      contact = "Contact Number field cannot be blank";
      valid = false;
    } else if (this.contact.value.length !== 11) {
      contact = "Contact Number field accept up to 11 in size only";
      valid = false;
    }
    if (typeof this.contact.value !== "undefined") {
      if (!this.contact.value.match(/^[0-9]*$/)) {
        contact = "Contact Number field accept numeric values only";
        valid = false;
      }
    }

    //Location
    if (!this.location.value) {
      location = "Location field cannot be blank";
      valid = false;
    }

    //Registered Date
    if (!this.regdate.value) {
      regDate = "Registered Date field cannot be blank";
      valid = false;
    } else if (this.regdate.value !== dayjs(new Date()).format("YYYY-MM-DD")) {
      regDate = "Registered date field accept current date only.";
      valid = false;
    }
    if (!valid) {
      this.setState({
        errors: {
          nameError: name,
          emailError: email,
          contactError: contact,
          locationError: location,
          regDateError: regDate,
        },
      });
      return false;
    }

    return true;
  };

  //Button functions.
  handleAddContact = (e) => {
    let contactInfo = this.state.contactInfo;
    const fullname = this.fullname.value;
    const email = this.email.value;
    const contact = this.contact.value;
    const location = this.location.value;
    const regdate = dayjs(this.regdate.value).format("MM/DD/YYYY");

    this.setState({
      errors: {
        nameError: "",
        emailError: "",
        contactError: "",
        locationError: "",
        regDateError: "",
      },
    });

    const isValid = this.validation(e);
    if (isValid) {
      if (this.state.curr === 0) {
        let completeContactInfo = {
          fullname,
          email,
          contact,
          location,
          regdate,
        };
        contactInfo.push(completeContactInfo);
      } else {
        let indexID = this.state.indexID;
        contactInfo[indexID].name = fullname;
        contactInfo[indexID].email = email;
        contactInfo[indexID].contact = contact;
        contactInfo[indexID].location = location;
        contactInfo[indexID].regdate = regdate;
      }

      this.setState({
        curr: 0,
        contactInfo: contactInfo,
      });
    }
    //input code here
    this.fullname.value = "";
    this.email.value = "";
    this.contact.value = "";
    this.location.value = "";
    this.regdate.value = "";
  };

  handlePagination = (event) => {
    let set = event.target.id;
    this.setState({ currentPage: set });
  };

  render() {
    // Pagination
    const { currentPage } = this.state;
    const LastContact = currentPage * 5;
    const FirstContact = LastContact - 5;
    const currentContacts = this.state.contactInfo.slice(
      FirstContact,
      LastContact
    );
    const setID = (currentPage - 1) * 5;

    //Table Data Generation
    const generateContactInfo = currentContacts.map((contactInfo, indexID) => {
      return (
        <tr key={indexID}>
          <th scope="row">{indexID + 1 + setID}</th>
          <td>{contactInfo.fullname}</td>
          <td>{contactInfo.email}</td>
          <td>{contactInfo.contact}</td>
          <td>{contactInfo.location}</td>
          <td>{contactInfo.regdate}</td>
          <td>
            <div className="d-grid gap-2 d-md-block">
              <Link
                className="btn btn-outline-primary"
                to={{ pathname: "view", state: { id: indexID + setID } }}
              >
                View
              </Link>
              <Link
                className="btn btn-outline-success"
                to={{ pathname: "update", state: { id: indexID + setID } }}
              >
                Update
              </Link>
              <Link
                className="btn btn-outline-danger"
                to={{ pathname: "delete", state: { id: indexID + setID } }}
              >
                Delete
              </Link>
            </div>
          </td>
        </tr>
      );
    });

    //Pagination Page Number Generation
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.contactInfo.length / 5); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map((pageNum) => {
      return (
        <button
          className="btn btn-outline-dark"
          key={pageNum}
          id={pageNum}
          onClick={this.handlePagination}
        >
          {pageNum}
        </button>
      );
    });

    return (
      <div>
        <div className="row">
          <div className="col-sm-3">
            <br />
            <br />
            <form ref="myForm" className="myForm">
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  className="form-control"
                  placeholder="Last Name, First Name Middle Initial"
                  type="text"
                  ref="fullname"
                  defaultValue=""
                />

                {this.state.errors["nameError"] ? (
                  <p style={{ color: "red" }}>
                    {this.state.errors["nameError"]}
                  </p>
                ) : null}
              </div>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  className="form-control"
                  placeholder="example@email.com"
                  type="text"
                  ref="email"
                />

                {this.state.errors["emailError"] ? (
                  <p style={{ color: "red" }}>
                    {this.state.errors["emailError"]}
                  </p>
                ) : null}
              </div>
              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <input
                  className="form-control"
                  placeholder={99999999999}
                  type="text"
                  ref="contact"
                  required
                />

                {this.state.errors["contactError"] ? (
                  <p style={{ color: "red" }}>
                    {this.state.errors["contactError"]}
                  </p>
                ) : null}
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <select className="form-select" type="text" ref="location">
                  <option value="">Select Location</option>
                  <option value="Manila">Manila</option>
                  <option value="Cebu">Cebu</option>
                </select>

                {this.state.errors["locationError"] ? (
                  <p style={{ color: "red" }}>
                    {this.state.errors["locationError"]}
                  </p>
                ) : null}
              </div>
              <div className="mb-3">
                <label className="form-label">Registered Date: </label>
                <br />
                <input type="date" ref="regdate" className="form-control" />
                <br />
                {this.state.errors["regDateError"] ? (
                  <p style={{ color: "red" }}>
                    {this.state.errors["regDateError"]}
                  </p>
                ) : null}
              </div>
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => this.handleAddContact(e)}
                >
                  Add Contact
                </button>
              </div>
            </form>
          </div>
          <div className="col-sm-9">
            <br></br>
            <br></br>
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Contact Number</th>
                  <th>Location</th>
                  <th>Registered Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{generateContactInfo}</tbody>
            </table>
            <br />
            <div style={{ textAlign: "center" }}>
              <button
                className="btn btn-outline-secondary btn-sm"
                key={
                  Number(this.state.currentPage) === 1
                    ? (this.state.currentPage = 1)
                    : this.state.currentPage - 1
                }
                id={
                  this.state.currentPage === 1
                    ? (this.state.currentPage = 1)
                    : this.state.currentPage - 1
                }
                onClick={this.handleClickButton}
              >
                &#60;
              </button>
              &nbsp; &nbsp; Showing {generateContactInfo.length + setID} of{" "}
              {this.state.contactInfo.length}&nbsp; &nbsp;
              <button
                className="btn btn-outline-secondary btn-sm"
                style={{ textAlign: "center" }}
                key={
                  Number(currentPage) === Number(pageNumbers.length)
                    ? Number(currentPage)
                    : Number(currentPage) + 1
                }
                id={
                  Number(currentPage) === Number(pageNumbers.length)
                    ? Number(currentPage)
                    : Number(currentPage) + 1
                }
                onClick={this.handleClickButton}
              >
                &#62;
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
