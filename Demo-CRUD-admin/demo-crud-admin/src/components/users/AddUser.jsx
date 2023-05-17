import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function AddUser() {
  const [user, setUser] = useState({
    username: "",
    phone: "",
    email: "",
  });

  // Cú pháp destructing trong js
  const { username, phone, email } = user;

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/users", user);
    window.location.href = "/home";
  };

  // Về nhà:
  // Xem cú pháp dectructing, spread, async/await và đọc lại code

  return (
    <div>
      <div className='w-75 mx-auto shadow p-5' style={{ textAlign: "center" }}>
        <h3>Add User</h3>
        <form onSubmit={handleSubmit}>
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
            Add user
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
