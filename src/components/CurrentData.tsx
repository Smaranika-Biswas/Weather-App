import "./CurrentData.css";

export default function CurrentData({ current, city }: any) {
  return (
    <>
      <div className="total">
        <div className="shadow rounded WeatherBox">
          <b
            style={{
              marginLeft: "30px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Current Weather: {city}
            <br />
            {current?.last_updated}
          </b>
          <div className="container-fluid weathers">
            <div className="weatherCityUpdate">
              <img
                className="weather-icon"
                src={current?.condition?.icon}
                alt="Overcast Clouds"
              />
              <br />
              <b>{current?.temp_c}&deg;C</b>
              <br />
              <b className="weatherCondition">{current?.condition?.text}</b>
            </div>
            <div className="container feels-Like">
              <h6>Feels like</h6>
              <h3 className="feelTemp">{current?.feelslike_c}&deg;C</h3>
            </div>
          </div>

          <div
            className=" table"
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "space-evenly",
            }}
          >
            {current ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Air Quality</th>
                    <th>Wind</th>
                    <th>Direction</th>
                    <th>Humidity</th>
                    <th>Visibility</th>
                    <th>Pressure</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {"O3: "}
                      {current?.air_quality?.o3}
                    </td>
                    <td>
                      {current?.wind_kph}
                      {"km/h"}
                    </td>
                    <td> {current?.wind_dir}</td>

                    <td>
                      {current?.humidity}
                      {"%"}
                    </td>
                    <td>
                      {current?.vis_km}
                      {"km"}
                    </td>
                    <td>
                      {current?.pressure_in}
                      {"mb"}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
