import React, { useState, useEffect } from "react";
import { loadingGif } from "../assets";
import { useQuery } from "@apollo/client";
import { COUNTRIES } from "../queries";
import Header from "./Header";
import TableData from "./TableData";
import Plot from "react-plotly.js";
import styles from "../styles/MainLanding.module.css";

export default function MainLanding() {
  const { loading, data } = useQuery(COUNTRIES);
  const [countryData, setCountryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState({ bar: {}, pie: {} });
  const [inputValue, setValue] = useState("");

  useEffect(() => {
    setCountryData(data?.countries);
    generateChartData(data?.countries);
  }, [data]);

  useEffect(() => {
    let filteredArray = countryData.filter(
      (country) =>
        country.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
    setFilteredData(filteredArray);
    generateChartData(filteredArray);
  }, [inputValue]);

  function generateChartData(data) {
    let languageData = {};
    let currencyData = {};
    if (data?.length) {
      for (let country of data) {
        if (country.languages?.length > 1) {
          for (let language of country.languages) {
            if (languageData[language.name] === undefined) {
              languageData[language.name] = [country.name];
            } else {
              languageData[language.name].push(country.name);
            }
          }
        } else if (country.languages?.length === 1) {
          if (languageData[country.languages[0].name] === undefined) {
            languageData[country.languages[0].name] = [
              country.languages[0].name,
            ];
          } else {
            languageData[country.languages[0].name].push(
              country.languages[0].name
            );
          }
        }

        if (country.currency) {
          if (currencyData[country.currency]) {
            currencyData[country.currency.slice(0, 3)] += 1;
          } else {
            currencyData[country.currency.slice(0, 3)] = 1;
          }
        }
      }
    }
    setChartData({ bar: languageData, pie: currencyData });
  }

  let finalData = inputValue.length ? filteredData : countryData;
  let languagesXAxis = Object.keys(chartData.bar);
  let numOfCountriesYAxis = languagesXAxis.map(
    (language) => chartData.bar[language].length
  );

  return (
    <div className={`${loading ? styles.loading : styles.main} container`}>
      {loading ? (
        <img src={loadingGif} />
      ) : (
        <>
          <Header
            inputValue={inputValue}
            setValue={setValue}
            count={finalData?.length}
          />
          <TableData data={finalData} />
          <Plot
            data={[
              {
                type: "pie",
                values: Object.values(chartData.pie),
                labels: Object.keys(chartData.pie),
              },
            ]}
            layout={{ title: "Currency composition" }}
            config={{ responsive: true }}
            style={{ marginTop: "3rem", height: "700px" }}
          />
          <Plot
            data={[{ type: "bar", x: languagesXAxis, y: numOfCountriesYAxis }]}
            layout={{ title: "Languages spoken the most ..." }}
            config={{ responsive: true }}
            style={{ margin: "5rem 0 2rem 0", height: "500px" }}
          />
        </>
      )}
    </div>
  );
}
