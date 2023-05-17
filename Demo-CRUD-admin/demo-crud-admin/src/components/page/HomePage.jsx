import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function HomePage() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loadUser = async () => {
    const result = await axios.get("http://localhost:8000/users");
    setData(result.data);
  };

  // Về mọi người tìm hiểu về async và await
  useEffect(() => {
    loadUser();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/users/${id}`);
    loadUser();
  };

  const { id } = useParams();
  console.log(id);
  return (
    <div style={{ marginTop: "50px", textAlign: "center" }}>
      <h1>Home Page</h1>
      <Table striped bordered hover style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Email</th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element, index) => (
            <tr key={index}>
              <th scope='row'>{index + 1}</th>
              <td>{element.id}</td>
              <td>{element.username}</td>
              <td>{element.phone}</td>
              <td>{element.email}</td>
              <td>
                <Link>
                  <Button variant='outline-primary' onClick={handleShow}>
                    <i className='fa-solid fa-eye'></i>
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Tên người dùng - kèm - id</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Đây sẽ là phần để đổ dữ liệu vào</Modal.Body>
                    <Modal.Footer>
                      <Button variant='secondary' onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Link>
              </td>
              <td>
                <Link to={`/user/edit/${element.id}`}>
                  <Button variant='outline-warning'>Edit</Button>
                </Link>
              </td>
              <td>
                <Button
                  variant='outline-danger'
                  onClick={() => handleDelete(element.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default HomePage;
