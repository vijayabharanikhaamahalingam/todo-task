import { useState } from "react";
import "./Todos.css"
const Todos = (props) => {
  const [selectCss, setSelectCss] = useState("card-notCompleted")
  
  const handleStatusChange = (e) => {
    props.onStatusChange(e.target.value,props.data.index)
    if (e.target.value == "completed") {
      setSelectCss("card-completed")
    } else {
      setSelectCss("card-notCompleted")
    }

  }

  const edit=(e)=>{
props.onEdit(props.data.name,props.data.description,props.data.index)

  }

  const handleDelete=(e)=>{
    props.delete(props.data.index)
  }
  return (
    <div className="col mb-5">
      
      <div className="card-color card h-100 w-100">

        <div className="card-body p-4">
          <div className="text-center">

            <p>Name:{props.data.name}</p>
            <p>Description:{props.data.description}</p>
            <label to="status">Status:</label>
            <select name="status" id="status" onChange={handleStatusChange} className={props.data.status == 'completed'?'card-completed':'card-notCompleted'} value={props.data.status}>
              <option value="notCompleted">Not Completed</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="float-end">
            <button className="btn btn-success btn-xs me-2 " onClick={edit}>Edit</button>
            <button className="btn btn-danger btn-xs" onClick={handleDelete}>Delete</button>

          </div>
        </div>
      </div>
    </div>
  );
}
export default Todos