import React from "react";

// INPUT: Like-Dislike ---> Boolean
// OUPUT: onClick()

// This is a controlled component
// 1) it receives all the data it needs via props
// 2) It notifies any changes  to data  via props
// 3) It does not have any state itself
// 4) No helper methods
// 5) No event handlers
// 6) It only has a render method

// So we can change it to Stateless Functional Component (sfc)
// sfc yapınca: props yap ve this leri sil.

const Like = props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Like;
