/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

// card

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import { addToCart } from "../redux/actions/AddToCartAction";
import { addToWishlist } from "../redux/actions/addToWishList";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { removeFromWishlist } from "../redux/actions/removeFromWishlistAction";
// import "./card.css";
//

export default function ({ course }) {

  const isLoggedin = localStorage.getItem("isLoggedIn");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const joinedCourses = useSelector((state) => state.joined.mylearning);
  const wishCourses = useSelector((state) => state.wishlist.wishItems)

  function handleCart(product) {

    dispatch(addToCart(product));
    Swal.fire({
      title: "Course Added To The Cart!",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#6610F2",
      cancelButtonColor: "#0B5ED7",
      cancelButtonText: "Continue Shopping",
      confirmButtonText: "Go To Cart"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/cart');
      }
    });
  }

  function handleWishList(product) {
    dispatch(addToWishlist(product));
  }

  return (
    <>
      <Card
        color="dark"
        className="product-Card"
        style={{ height: "fit-content" }}
        sx={{
          // Width: 345,
          Width: "370px",
          overflow: "visible",
          height: "300px",
          backgroundColor: "#fff",
          color: "#333",
          position: "relative",
          boxShadow:
            " rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
        }}
      >
        <span
          style={{ right: "-10px", top: "-10px", zIndex: "11" }}
          className=" bg-warning text-dark p-1   rounded border border-1 border-secondary rounded fw-bold position-absolute "
        >
          {course.price_detail.price_string}
        </span>

        <Link to={`/details/${course.id}`} className="text-decoration-none">
          <CardMedia sx={{ height: 140 }} image={course.image} title="green iguana" />
        </Link>
        <CardContent className="pb-2">
          <Typography gutterBottom variant="h9" component="div" className="text-truncate">
            {course.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">

            {
              cartItems.find((item) => item.id == course.id) ?
                <Link to="/cart" className="btn w-100 btn-success me-2">
                  Go to Cart
                </Link> :
                joinedCourses.find((item) => item.id == course.id) ?
                  <Link to="/learning/joined" className="btn w-100 text-white btn-udemy me-2">
                    Go to My Learning
                  </Link> :
                  <Fragment>
                    <button className="btn w-100 btn-primary me-2" onClick={() => {
                      handleCart(course)
                      dispatch(removeFromWishlist(course.id))
                    }}>
                      Add to Cart
                    </button>

                  </Fragment>
            }

            {
              isLoggedin == "true" && (wishCourses.find((item) => item.id == course.id) ? <button style={{ width: "35px", height: "35px", backgroundColor: "transparent" }} className="d-flex justify-content-center align-items-center rounded-circle ms-auto my-2 border-danger-subtle" onClick={() => dispatch(removeFromWishlist(course.id))}>
                <FaHeart className="fs-3 text-danger" />
              </button> : <button style={{ width: "35px", height: "35px", backgroundColor: "transparent" }} className="d-flex justify-content-center align-items-center rounded-circle ms-auto my-2" onClick={() => handleWishList(course)}>
                <FaRegHeart className="fs-3" />
              </button>)
            }

          </Typography>
        </CardContent>
      </Card >
    </>
  );
}
