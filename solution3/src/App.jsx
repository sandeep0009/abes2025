import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        formData
      );

      setMessage("User registered successfully!");
      console.log("POST Response:", response.data);
    } catch (error) {
      setMessage("Failed to register user.");
      console.error(error);
    }
  };

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      console.log(response);
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching employees:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Register User</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}

      <div className="employee-section">
        <h2>Employee List</h2>
        <button onClick={fetchEmployees}>Load Employees</button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="employee-list">
            {employees.map((employee) => (
              <li key={employee.id}>
                {employee.name} - {employee.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
