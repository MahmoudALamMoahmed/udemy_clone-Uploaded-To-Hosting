/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux"
import { removeFromWishlist } from "../redux/actions/removeFromWishlistAction";
import { addToCart } from "../redux/actions/AddToCartAction";
import RemoveCourseFromList from "../redux/actions/removeCourseFromList";
import { Fragment } from "react";
import { unjoin } from "../redux/actions/unjoinCourseAction";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function MyCoursesCard({ course, handleCourseToAdd, wishlist, listName }) {

    const dispatch = useDispatch();

    function handleUnjoin(id) {
        Swal.fire({
            title: "Are you sure you want to unjoin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, unjoin!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(unjoin(id))
                Swal.fire({
                    title: "unjoined!",
                    text: "You are no longer has access on this course.",
                    icon: "success"
                });
            }
        });
    }

    function handleRemoveFromWishlist(id) {
        Swal.fire({
            title: "Are you sure you want to remove this course from your wishlist?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeFromWishlist(course.id))
                Swal.fire({
                    title: "Removed!",
                    text: "The course removed succssfully!",
                    icon: "success"
                });
            }
        });
    }

    const handleAddToCart = (course) => {
        dispatch(removeFromWishlist(course.id));
        dispatch(addToCart(course));
        Swal.fire({
            title: "Good job!",
            text: "You Added The Course To Your Cart!",
            icon: "success",
            timer: 1000
        });
    }


    return (
        <div key={course.id} className="col-12 col-md-3 border-0 position-relative" >
            <div className="dropdown position-absolute end-0 me-4 mt-2">
                <button className="btn btn-light px-3 fw-bold" type="button" id="{`dropdownMenuButton${course.id}`}" data-bs-toggle="dropdown" aria-expanded="false">
                    :
                </button>
                <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${course.id}`}>

                    {
                        handleCourseToAdd &&
                        <Fragment>
                            <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleCourseToAdd(course)}>Create List</a></li>

                            <li><a className="dropdown-item" onClick={() => handleUnjoin(course.id)}>un-join from this course</a></li>
                        </Fragment>
                    }

                    {
                        wishlist &&
                        <li><a className="dropdown-item" onClick={() => handleRemoveFromWishlist(course.id)}>Remove From wishlist</a></li>
                    }

                    {
                        listName && <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => dispatch(RemoveCourseFromList(listName, course.id))}>Remove From this list</a></li>
                    }

                </ul>
            </div>
            <Link to={`/details/${course.id}`}>
                <img src={course.image} className="card-img-top" alt="coures image" />
            </Link>
            <div className="card-body p-0 py-3 mt-3">
                <Link className="text-dark text-decoration-none" to={`/details/${course.id}`}>
                    <h5 className="card-title text-truncate">{course.title}</h5>
                </Link>
                <small className="card-text text-muted d-block">{course.primary_subcategory.title}</small>
                {
                    handleCourseToAdd && <button className="btn btn-udemy text-white mt-3">Start Course</button>
                }

                {
                    wishlist && <button onClick={() => handleAddToCart(course)} className="btn btn-udemy text-white mt-3">Add to Cart</button>
                }

            </div>
        </div>
    )
}
