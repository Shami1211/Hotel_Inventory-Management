import React from "react";
import { Route, Routes, useLocation } from "react-router";
import BeforHome from "./Components/Home/BeforHome/BeforHome";
import SideBar from "./Components/SideBar/Sidebar";
import Register from "./Components/Register/Register";
import LoginDash from "./Components/Login/LoginDash";
import AdminLogin from "./Components/Login/AdminLogin";
import UserLogin from "./Components/Login/UserLogin";
import Details from "./Components/Register/Details";
import PostDetails from "./Components/PostCreate/PostDetails/Posts";
import AboutUs from "./Components/Home/AboutUs/AboutUs";
import SheDriveShare from "./Components/DrivePost/SheDriveShare/Drives";
import AddNewDrivePost from "./Components/DrivePost/AddNewDrivePost/AddNewDrivePost";
import UploadePost from "./Components/PostCreate/UploadPost/UploadePost";
import DiscountHome from "./Components/Discount/DiscountHome/DiscountHome";
import BudgetHome from "./Components/Budget/BudgetHome/BudgetHome";
import AddBudget from "./Components/Budget/AddBudget/AddBudget";
import BudgetDetails from "./Components/Budget/BudgetDetails/Butgets";
import UserProfile from "./Components/Profile/UserProfile/UserProfile";
import AdminDsh from "./Components/Admin/AdminDash/AdminDsh";
import UpdateButget from "./Components/Budget/UpdateButget/UpdateButget";
import AddDiscount from "./Components/Admin/AddDiscount/AddDiscount";
import UpdateDiscount from "./Components/Admin/UpdateDiscount/UpdateDiscount";
import Cart from "./Components/Discount/DiscountHome/Cart";

function App() {
  const location = useLocation();
  const isNavPage =
    location.pathname === "/" ||
    location.pathname === "/loginDsah" ||
    location.pathname === "/userLogin" ||
    location.pathname === "/register" ||
    location.pathname === "/aboutus" ||
    location.pathname === "/admindsh" ||
    location.pathname === "/adddis" ||
    location.pathname.startsWith("/updatedis/") || 
    location.pathname === "/adminLogin";

  return (
    <div>
      {!isNavPage && <SideBar />}
      <React.Fragment>
        <Routes>
          <Route path="/" element={<BeforHome />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/loginDsah" element={<LoginDash />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/admindsh" element={<AdminDsh />} />
          <Route path="/adddis" element={<AddDiscount />} />
          <Route path="/updatedis/:id" element={<UpdateDiscount />} />
          {/* Render the sidebar with other pages */}
          {!isNavPage && <Route path="/detail" element={<Details />} />}
          {!isNavPage && <Route path="/afterhome" element={<PostDetails />} />}
          {!isNavPage && <Route path="/shedrive" element={<SheDriveShare />} />}
          {!isNavPage && (
            <Route path="/adddrive" element={<AddNewDrivePost />} />
          )}
          {!isNavPage && <Route path="/uploadpost" element={<UploadePost />} />}
          {!isNavPage && <Route path="/discount" element={<DiscountHome />} />}
          {!isNavPage && <Route path="/budgethome" element={<BudgetHome />} />}
          {!isNavPage && <Route path="/addbudget" element={<AddBudget />} />}
          {!isNavPage && <Route path="/cart" element={<Cart />} />}
          {!isNavPage && (
            <Route path="/budgetdetails" element={<BudgetDetails />} />
          )}
          {!isNavPage && <Route path="/settings" element={<UserProfile />} />}
          {!isNavPage && (
            <Route path="/updatebutget/:id" element={<UpdateButget />} />
          )}
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
