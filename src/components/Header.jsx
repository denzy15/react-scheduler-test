import React from "react";
import moment from "moment";
import Button from "./Button";

const Header = ({
  handleNewTask,
  handleNextWeek,
  handlePrevWeek,
  days,
  currentDate,
}) => {
  return (
    <div className="header">
      <section className="header__info">
        <h1>Interview Calendar</h1>
        <Button big={true} onClick={handleNewTask}>
          +
        </Button>
      </section>
      <section className="header__body">
        <div className="header__days">
          {days.map((day) => (
            <div
              className={`header__day ${
                day.format("D M YYYY") === moment().format("D M YYYY")
                  ? "active"
                  : ""
              }`}
              key={day.format("dddd")}
            >
              <span>{day.format("dddd").slice(0, 1)}</span>
              <span>{day.date()}</span>
            </div>
          ))}
        </div>
        <div className="header__month-and-year">
          <Button onClick={handlePrevWeek}>
            <i className="arrow left"></i>
          </Button>
          <span>
            {moment().month(currentDate.month).format("MMMM")}{" "}
            {currentDate.year}
          </span>
          <Button onClick={handleNextWeek}>
            <i className="arrow right"></i>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Header;
