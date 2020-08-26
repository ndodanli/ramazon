import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoadContext } from "../App";

function LinkLoading(props) {
  const { loadRef } = useContext(LoadContext);
  return (
    <Link
      to={props.to}
      className={props.className}
      onClick={() => {
        const onClk = props.onClick;
        if (onClk) onClk();
        loadRef.current.continuousStart(
          Math.floor(Math.random() * 30 + 1),
          Math.floor(Math.random() * (10 - 6 + 1)) + 6
        );
      }}
    >
      {props.children}
    </Link>
  );
}

export default LinkLoading;
