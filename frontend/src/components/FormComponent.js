import { Button, Modal, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Chips } from "primereact/chips";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertComponent from "./AlertComponent";

export function FormComponent(props) {
  const { isEdit, data } = props;

  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState([]);
  const [website, setWebsite] = useState("");
  const [company, setCompany] = useState("");
  const [isAlert, setAlert] = useState(null);

  const optionList = [
    { value: "Water Fall", label: "WaterFall" },
    { value: "Agile", label: "Agile" },
  ];

  useEffect(() => {
    if (isEdit) {
      setName(data?.name);
      setEmail(data?.email);
      setPhone(data?.phone);
      setWebsite(data?.website);
      setCompany(data?.company.name);
    }
  }, []);

  useEffect(() => {
    if (isAlert) {
      setTimeout(() => {
        setAlert(null);
      }, 1500);
    }
  }, [isAlert]);

  const handleSubmit = () => {
    if (isEdit) {
      handleEdit();
    } else {
      handleAdd();
    }
  };

  //handle Submit Function
  const handleAdd = () => {
    const url = "http://localhost:3000/api/add";
    const new_data = {
      name: name,
      username: "Bret",
      email: email,
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: '',
        },
      },
      phone: phone,
      website: website,
      company: {
        name: company,
        catchPhrase: " ",
        bs: " ",
      },
    };
    axios
      .post(url, new_data)
      .then((res) => {
        const result = res?.data;
        if (res.status != 201) {
          setAlert({ success: false, msg: 'User not added!' });
        } else {
          navigate("/", { state: { success: true, msg: 'User Aadded successfully' } });
        }
      })
      .catch((err) => {
        setAlert({ success: false, msg: err?.message });
      });
  };

  //handle Edit Function
  const handleEdit = () => {
    const url = `http://localhost:3000/api/update/${data._id}`;
      const new_data = {
        name: name,
        username: data.username,
        email: email,
        address: {
          street: data.address.street,
          suite: data.address.suite,
          city: data.address.city,
          zipcode: data.address.zipcode,
          geo: {
            lat: data.address.geo.lat,
            lng: data.address.geo.lng,
          },
        },
        phone: phone,
        website: website,
        company: {
          name: company,
          catchPhrase: data.company.catchPhrase,
          bs: data.company.bs,
        },
      };
    axios
      .put(url, new_data)
      .then((res) => {
        if (res.status != 201) {
          setAlert({ success: false, msg: 'User not updated' });
        } else {
          navigate("/", { state: { success: true, msg: 'User updated successfully' } });
        }
      })
      .catch((err) => {
        setAlert({ success: false, msg: err?.message });
      });
  };

  // Form Validations
  const validation = () => {
    if (name == "") {
      setAlert({ success: false, msg: "Please enter name." });
    } else if (email == "") {
      setAlert({ success: false, msg: "Please enter email" });
    } else if (phone.lenght <=10 ) {
      setAlert({ success: false, msg: "Please enter valid phone number." });
    } else if (website == "") {
      setAlert({ success: false, msg: "Please enter scrum website name" });
    } else if (company == "") {
      setAlert({ success: false, msg: "Please enter product company name" });
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="card-body">
      {!!isAlert && (
        <AlertComponent success={isAlert?.success} msg={isAlert?.msg} />
      )}
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Please enter Name"
          className="form-control"
          value={name}
          onChange={(e) => {
            let val = e.target.value;
            setName(val);
          }}
        />
      </div>
      <div className="form-group" style={{ marginTop: "10pt" }}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Please enter Email Address"
          value={email}
          onChange={(e) => {
            let val = e.target.value;
            setEmail(val);
          }}
        />
      </div>
      <div className="form-group" style={{ marginTop: "10pt" }}>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          className="form-control"
          placeholder="Please enter Phone Number"
          value={phone}
          onChange={(e) => {
            let val = e.target.value;
            setPhone(val);
          }}
        />
      </div>
     
      <div className="form-group" style={{ marginTop: "10pt" }}>
        <label htmlFor="website">Website</label>
        <input
          type="text"
          className="form-control"
          placeholder="Please enter Website"
          value={website}
          onChange={(e) => {
            let val = e.target.value;
            setWebsite(val);
          }}
        />
      </div>
      <div className="form-group" style={{ marginTop: "10pt" }}>
        <label htmlFor="company">Company</label>
        <input
          type="text"
          className="form-control"
          placeholder="Please Enter Copany"
          value={company}
          onChange={(e) => {
            let val = e.target.value;
            setCompany(val);
          }}
        />
      </div>
      <Button
        style={{ marginTop: "10pt" }}
        variant="primary"
        type="submit"
        onClick={() => validation()}
      >
        {isEdit ? "Edit Product" : "Add Product"}
      </Button>
    </div>
  );
}
