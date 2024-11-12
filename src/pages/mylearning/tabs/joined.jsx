/* eslint-disable no-prototype-builtins */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addCourseToList } from "../../../redux/actions/addToListAction";
import MyCoursesCard from "../../../components/myCoursesCard";
import { Btn } from "../../../components/btn";

export default function JoinedTab() {

    const joinedCourses = useSelector((state) => state.joined.mylearning);
    const coursesLists = useSelector((state) => state.lists.lists);

    const dispatch = useDispatch();
    console.log(joinedCourses)
    const [courseToAdd, setCourseToAdd] = useState("");
    const [listName, setListName] = useState("");

    // Loop over the object keys
    Object.keys(coursesLists).forEach((key) => {
        // Loop over each array inside the key
        coursesLists[key].forEach((course) => {
            console.log(`Key: ${key}, ID: ${course.id}`);
        });
    });


    function handleAddToList() {
        if (coursesLists.hasOwnProperty(listName)) {
            dispatch(addCourseToList(listName, [...coursesLists[listName], courseToAdd]));
            console.log(coursesLists)
            return;
        }
        dispatch(addCourseToList(listName, [courseToAdd]));
        console.log(coursesLists)
    }

    function handleCourseToAdd(course) {
        setCourseToAdd(course)
    }

    return (
        <div className="row row-gap-4 my-3">
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Create new list</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-3">
                            <input type="text" className="w-100 p-2" onChange={(e) => setListName(e.target.value)} placeholder="Name your list e.g HTML skills" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={() => handleAddToList()} data-bs-dismiss="modal" className="btn btn-primary">Create List</button>
                        </div>
                    </div>
                </div>
            </div>

            {
                joinedCourses.length > 0 ?
                    joinedCourses.map((course) =>
                        <MyCoursesCard key={course.id} handleCourseToAdd={handleCourseToAdd} course={course} />
                    ) : <Btn href="/" content="Browse Courses Now!" />
            }

        </div >
    )
}
