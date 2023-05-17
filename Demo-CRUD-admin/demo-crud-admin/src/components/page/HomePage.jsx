import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

function HomePage() {
  const [data, setData] = useState([]);

  // Về mọi người tìm hiểu về async và await
  useEffect(() => {
    const loadUser = async () => {
      const result = await axios.get("http://localhost:8000/users");
      setData(result.data);
    };
    loadUser();
  }, []);
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
                  <Button variant='outline-primary'>
                    <i class='fa-solid fa-eye'></i>
                  </Button>
                </Link>
              </td>
              <td>
                <Link>
                  <Button variant='outline-warning'>Edit</Button>
                </Link>
              </td>
              <td>
                <Link>
                  <Button variant='outline-danger'>Delete</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default HomePage;
