import React from "react";
import "./comment.css";

function Comment(props) {
  return (<div className="comment">
    {props.text}
  </div>);
}

export default Comment;