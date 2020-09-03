import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoadContext } from "../App";

function CustomLink(props) {
  const { loadRef, setUpdateSamePage, setPreventFirstRender } = useContext(
    LoadContext
  );
  return (
    <Link
      to={props.to}
      className={props.className}
      onClick={() => {
        if (props.loading) {
          loadRef.current.continuousStart(
            Math.floor(Math.random() * 30 + 1),
            Math.floor(Math.random() * (10 - 6 + 1)) + 6
          );
        }
        const onClk = props.onClick;
        if (onClk) onClk();
        // setPreventFirstRender(true);
        setUpdateSamePage((prevState) => !prevState);
      }}
    >
      {props.children}
    </Link>
  );
}

export default CustomLink;
