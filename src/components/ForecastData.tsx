import "./ForecastData.css";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";

export default function ForecastData({ city, forecast: { forecastday } }: any) {
  // console.log(forecastday);
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <div className="forecast">
        <div className="head">
          5 days forecast of <br />
          {city}
        </div>
        <div className="forecast-data">
          {forecastday.map((forecastData: any, index: any) =>
            forecastday ? (
              <div key={index}>
                <div className="forecastBox">
                  <div className="day_icon">
                    <b style={{ color: "black" }}>{forecastData?.date}</b>
                    <br />
                    <img
                      className="date"
                      src={forecastData?.day?.condition?.icon}
                      alt="Overcast Clouds"
                    />
                    <h5
                      style={{
                        color: "black",
                        marginTop: "5px",
                      }}
                    >
                      {forecastData?.day?.condition?.text}
                    </h5>
                  </div>
                  <div className="forecast_temp">
                    <h3>
                      {forecastData?.day?.maxtemp_c}&deg;C
                      <br />
                      {forecastData?.day?.mintemp_c}&deg;C
                    </h3>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
        <div className="hourBox">
          <h3 className="hourly-head">Hourly Forecast of 5 days</h3>
          <div className="hour-data">
            {forecastday.map((forecastData: any, index: any) => {
              const { date, day, hour } = forecastData;
              const {
                maxtemp_c,
                mintemp_c,
                daily_chance_of_rain,
                condition: { text, icon },
              } = day;
              return (
                <Accordion
                  style={{ background: "transparent" }}
                  key={index}
                  expanded={expanded === date}
                  onChange={handleChange(date)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id={date}
                  >
                    <img src={icon} alt="Overcast clouds" />
                    <Typography
                      sx={{ width: "33%", flexShrink: 0, marginLeft: "10px" }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {moment(date).format("LLLL")}
                      </span>
                      <br />
                      {text}
                    </Typography>
                    <Typography
                      sx={{
                        width: "33%",
                        flexShrink: 0,
                      }}
                    >
                      <b>Max temp: </b>
                      {maxtemp_c}
                      <br />
                      <b>Min temp: </b>
                      {mintemp_c}
                    </Typography>
                    <Typography
                      sx={{
                        width: "33%",
                        flexShrink: 0,
                      }}
                    >
                      <b>Daily chanceas of rain </b>
                      <br />
                      <b>{daily_chance_of_rain}%</b>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {hour.map((hourData: any, index: any) => (
                      <div
                        className="showHourly"
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <span>{moment(hourData?.time).format("LT")}</span>

                        <img src={hourData?.condition?.icon} alt="Overcast" />

                        <b> {hourData?.chance_of_rain}% Chances of rain</b>

                        <b>Wind flow: {hourData?.wind_kph}km/h</b>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
