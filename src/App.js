import React, { useState } from "react";
import "./App.scss";
import HourCell from "./components/HourCell";
import moment from "moment";
import Container from "./components/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [activeCell, setActiveCell] = useState({});
  const [activeTasks, setActiveTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState({
    year: moment().year(),
    week: moment().week(),
    month: moment().month(),
  });

  const handlePrevWeek = () => {
    setCurrentDate((prev) => ({
      year: moment()
        .week(prev.week - 1)
        .year(),
      week: prev.week - 1,
      month: moment()
        .year(prev.year)
        .week(prev.week - 1)
        .day("Monday")
        .month(),
    }));
  };

  const handleNextWeek = () => {
    setCurrentDate((prev) => ({
      year: moment()
        .week(prev.week + 1)
        .year(),
      week: prev.week + 1,
      month: moment()
        .year(prev.year)
        .week(prev.week + 1)
        .day("Monday")
        .month(),
    }));
  };

  const handleNewTask = () => {
    let date = new Date(prompt("Enter event time: \n YYYY-MM-DD HH:mm:ss"));

    if (date == "Invalid Date") {
      alert("Wrong Date format");
      return;
    }
    setActiveTasks((prev) => [...prev, new Date(date)]);
  };

  const hasActiveTask = (obj) => {
    if (activeTasks.length === 0 || Object.entries(obj).length === 0)
      return false;

    const day = obj.day;
    const hour = obj.hour;

    for (const task of activeTasks) {
      if (
        task.getDate() === day.date() &&
        task.getMonth() === day.month() &&
        task.getFullYear() === day.year() &&
        task.getHours() === hour
      ) {
        return true;
      }
    }

    return false;
  };

  const handleDeleteTask = () => {
    const { day, hour } = activeCell;
    const filteredTasks = activeTasks.filter(
      (task) =>
        task.getDate() !== day.date() ||
        task.getMonth() !== day.month() ||
        task.getFullYear() !== day.year() ||
        task.getHours() !== hour
    );

    setActiveTasks(filteredTasks);
    setActiveCell({});
  };

  const startOfWeek = moment().week(currentDate.week).startOf("week");

  //Текущие дни недели
  const days = [];
  for (let i = 1; i <= 7; i++) {
    days.push(moment(startOfWeek).add(i, "days"));
  }

  const rows = new Array(24).fill(null);

  return (
    <Container>
      <Header
        handleNextWeek={handleNextWeek}
        handlePrevWeek={handlePrevWeek}
        handleNewTask={handleNewTask}
        days={days}
        currentDate={currentDate}
      />
      <div className="table">
        <div className="table__hours">
          {rows.map((_, i) => (
            <span key={i}>{i.toString().length === 1 ? `0${i}` : i}:00</span>
          ))}
        </div>
        <table className="table__content">
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {new Array(7).fill(null).map((cell, cellIndex) => (
                  <HourCell
                    key={cellIndex}
                    onClick={() =>
                      setActiveCell({
                        day: days[cellIndex],
                        hour: rowIndex,
                      })
                    }
                    isSelected={
                      Object.entries(activeCell).length !== 0 &&
                      activeCell.day.toLocaleString() ===
                        days[cellIndex].toLocaleString() &&
                      activeCell.hour === rowIndex
                    }
                    hasTask={hasActiveTask({
                      day: days[cellIndex],
                      hour: rowIndex,
                    })}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer
        showDeleteButton={hasActiveTask(activeCell)}
        handleDeleteTask={handleDeleteTask}
        toTodayHandler={function () {
          setCurrentDate({
            year: moment().year(),
            week: moment().week(),
            month: moment().month(),
          });
        }}
      />
    </Container>
  );
}

export default App;
