import React, { useEffect, useState } from "react";
import axios from "axios";
import Discount from "./Discount";
import "./admindash.css";
const URL = "http://localhost:5000/discounts";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const Discounts = () => {
  const [discounts, setDiscounts] = useState();

  useEffect(() => {
    fetchHandler().then((data) => setDiscounts(data.discounts));
  }, []);

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
      <div>
        <div className="discard_set_full">
          <div>
            <div className="dis-fullbox">
              {discounts &&
                discounts.map((discount, i) => (
                  <div key={i}>
                    <Discount discount={discount} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discounts;
