import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

function EditUser() {
  const [user, setUser] = useState({
    username: "",
    phone: "",
    email: "",
  });

  const { id } = useParams();

  // Cú pháp destructing trong js
  const { username, phone, email } = user;

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loadUser = async (e) => {
    const result = await axios.get(`http://localhost:8000/users/${id}`);
    setUser(result.data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/users/${id}`, user);
    window.location.href = "/home";
  };

  return (
    <div>
      <div className='w-75 mx-auto shadow p-5' style={{ textAlign: "center" }}>
        <h3>Add User</h3>
        <form onSubmit={handleUpdate}>
          <label>Username:</label>
          <input
            type='text'
            value={username}
            name='username'
            onInput={(e) => handleChangeInput(e)}
          />
          <br />
          <label>Phone:</label>
          <input
            type='text'
            value={phone}
            name='phone'
            onInput={(e) => handleChangeInput(e)}
          />
          <br />
          <label>Email:</label>
          <input
            type='text'
            value={email}
            name='email'
            onInput={(e) => handleChangeInput(e)}
          />
          <br />
          <Button variant='outline-success' type='submit'>
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
