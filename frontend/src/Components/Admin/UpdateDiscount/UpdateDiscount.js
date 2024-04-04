import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

function UpdateDiscount() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const _id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/discounts/${_id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.discount));
    };
    fetchHandler();
  }, [_id]);
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/discounts/${_id}`, {
        image: String(inputs.image),
        name: String(inputs.name),
        company: String(inputs.company),
        price: String(inputs.price),
        discount: String(inputs.discount),
        total: String(inputs.total),
        start: String(inputs.start),
        end: String(inputs.end),
      })
      .then((res) => res.data);
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    sendRequest().then(() => {
      window.alert("Discount details updated successfully!");
      history("/admindsh");
    });
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

  return (
    <div>
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
            <input
              type="text"
              name="total"
              className="add_drive_input"
              value={inputs.total}
              readOnly
            />
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
              <button className="postbtn">Update</button>
            </div>
          </form>
        </div>
        <br></br>
      </div>
    </div>
  );
}

export default UpdateDiscount;
