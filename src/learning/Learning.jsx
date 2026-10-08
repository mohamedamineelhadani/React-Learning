import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import UseMemo from "./UseMemo";
import UseParam from "./UseParam";
import UseNavigate from "./UseNavigate";
const Learning = () => {
  const css = {
    border: "solid 2px black",
    color: "black",
    width: "100%",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    margin: "10px 0",
    borderRadius:"10px"
  };
  return (
    <div
      style={{
        background: "white",
        color: "black",
        width: "100%",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <UseParam css={css} />
      <UseNavigate css={css} />
      <UseMemo css={css} />
    </div>
  );
};

export default Learning;
