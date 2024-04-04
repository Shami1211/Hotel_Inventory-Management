import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddDiscount() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    image: "",
    name: "",
    company: "",
    price: 0,
    discount: 0,
    total: 0,
    start: "",
    end: "",
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    const { price, discount } = inputs;
    const priceValue = parseFloat(price);
    const discountValue = parseFloat(discount);
    if (!isNaN(priceValue) && !isNaN(discountValue)) {
      const discountAmount = (priceValue * discountValue) / 100;
      const total = priceValue - discountAmount;
      setInputs((prevState) => ({
        ...prevState,
        total: total.toFixed(2), // Round to 2 decimal places
      }));
    }
  };

  useEffect(() => {
    calculateTotal(); // Calculate total whenever price or discount changes
  }, [inputs.price, inputs.discount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/discounts/", inputs);
      alert("Discount Added Success");
      navigate("/admindsh");
    } catch (error) {
      console.error("Error submitting discount:", error);
      // Handle error and provide feedback to the user
    }
  };

  return (
    <div>
      <br></br>
      <div className="nav_home_afetr">
        <p
          className="nav_topic "
          onClick={() => {
            window.location.href = "/admindsh";
          }}
        >
          Discount Details
        </p>
        <p
          className="nav_topic nav_active_color"
          onClick={() => {
            window.location.href = "/adddis";
          }}
        >
          Add New
        </p>
      </div>
      <div className="drive-select-box-dash">
        <form className="add_drive_clas" onSubmit={handleSubmit}>
          <label className="add_drive_lable">Image URL</label>
          <br></br>
          <input
          className="add_drive_input"
            type="text"
            name="image"
            value={inputs.image}
            onChange={handleChange}
          />
          <br></br>
          <label className="add_drive_lable">Discount Name</label>
          <br></br>
          <input
            type="text"
            className="add_drive_input"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            required
          />
          <br></br>
          <label className="add_drive_lable">Company</label>
          <br></br>
          <input
            type="text"
            className="add_drive_input"
            name="company"
            value={inputs.company}
            onChange={handleChange}
            required
          />
          <br></br>
          <label className="add_drive_lable">Price</label>
          <br></br>
          <input
            type="number"
            name="price"
            className="add_drive_input"
            value={inputs.price}
            onChange={handleChange}
            required
          />
          <br></br>

          <label className="add_drive_lable">Discount (%)</label>
          <br></br>
          <input
            type="number"
            className="add_drive_input"
            name="discount"
            value={inputs.discount}
            onChange={handleChange}
            required
          />
          <br></br>

          <label className="add_drive_lable">Total</label>
          <br></br>
          <input type="text" name="total" className="add_drive_input" value={inputs.total} readOnly />
          <br></br>

          <label className="add_drive_lable">Start Date</label>
          <br></br>
          <input
            type="date"
            name="start"
            className="add_drive_input"
            value={inputs.start}
            onChange={handleChange}
            required
          />
          <br></br>
          <label className="add_drive_lable">End Date</label>
          <br></br>
          <input
            type="date"
            className="add_drive_input"
            name="end"
            value={inputs.end}
            onChange={handleChange}
            required
          />
          <br></br>
          <div className="btn-ful">
              <button className="postbtn">Add</button>
            </div>
        </form>
      </div>
      <br></br>
    </div>
  );
}

export default AddDiscount;
