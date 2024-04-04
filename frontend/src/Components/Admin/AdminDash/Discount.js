import React from "react";
import "./admindash.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Discount = (props) => {
  const { _id, image, name, company, price, discount, total, start, end } =
    props.discount;
  const history = useNavigate();

  const deleteHandler = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this Discount?"
    );

    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/discounts/${_id}`);
        window.alert("Discount details deleted successfully!");
        history("/admindsh");
        window.location.reload(); // Reload the page
      } catch (error) {
        // Handle deletion error if needed
        console.error("Error deleting Discount details:", error);
      }
    }
  };

  return (
    <div>
      <div className="dis_card_set_one">
        <img
          src={image}
          alt={name}
          className="img_box_card"
          onError={() => console.log("Error loading image:", image)}
        />
        <h2 className="dis_detail_topic_main">{name}</h2>
        <h4 className="dis_detail_topic">Company</h4>
        <h4 className="dis_detail_topic_sub">{company}</h4>
        <div class="dis_card_one">
  <h4 className="dis_detail_topic">Price</h4>
  <h4 className="dis_detail_topic_sub price">Rs. {price}</h4>
</div>

        <h4 className="dis_detail_topic">Discount:</h4>
        <h4 className="dis_detail_topic_sub">{discount}%</h4>
        <h4 className="dis_detail_topic">Total</h4>
        <h4 className="dis_detail_topic_sub">Rs.{total}</h4>
        <h4 className="dis_detail_topic">Start Date</h4>
        <h4 className="dis_detail_topic_sub">{start}</h4>
        <h4 className="dis_detail_topic">End Date</h4>
        <h4 className="dis_detail_topic_sub">{end}</h4>

        <Link to={`/updatedis/${_id}`} className="updtbtn">
          Update
        </Link>
        <button className="dltbtn_dis" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Discount;
