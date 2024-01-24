import express from "express";
import { holidays } from "./holidaysDatabase.js";

const app = express();

app.get("/holidays", (req, res) => {
  res.send(holidays);
});

app.get("/is-today-holiday", (req, res) => {
  const today = new Date();
  const todayFormatted = today.toLocaleDateString("en-us");
  const holiday = holidays.find((holiday) => {
    return holiday.date === todayFormatted;
  });
  if (holiday === undefined) {
    res.send("Today is NOT holiday!");
  } else {
    res.send(`Yes, today is ${holiday.name}`);
  }
});

app.get("/holidays/:month", (req, res) => {
  const month = req.params.month;

  const holidaysOfTheMonth = holidays.filter((holiday) => {
    const date = holiday.date.split("/");
    return date[0] === month;
  });

  res.send(holidaysOfTheMonth);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
