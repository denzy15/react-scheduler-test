import React from "react";
import Button from "./Button";

const Footer = ({ toTodayHandler, showDeleteButton, handleDeleteTask }) => {
  return (
    <section className="footer">
      <Button onClick={toTodayHandler}>Today</Button>
      {showDeleteButton && <Button onClick={handleDeleteTask}>Delete</Button>}
    </section>
  );
};

export default Footer;
