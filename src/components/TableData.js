import React, { useState } from "react";
import { Right, Left } from "../assets";
import styles from "../styles/TableData.module.css";

const TableData = ({ data = [] }) => {
  const [activePage, setActivePage] = useState(1);
  const [indices, setIndices] = useState({ start: 0, end: 15 });

  function changePage({ increment }) {
    if (increment && activePage < Math.ceil(data.length / 15)) {
      setActivePage(activePage + 1);
      setIndices({
        start: indices.start + 15,
        end: indices.end + 15,
      });
    }
    if (!increment && activePage > 1) {
      setActivePage(activePage - 1);
      setIndices({
        start: indices.start - 15,
        end: indices.end - 15,
      });
    }
  }

  function jumpTo({ page }) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActivePage(page + 1);
    setIndices({
      start: page * 15,
      end: page * 15 + 15,
    });
  }

  return (
    <main>
      <div className={styles.labels}>
        <p>Name</p>
        <p>Continent</p>
        <p>Capital</p>
        <p>Currency</p>
        <p>Languages</p>
      </div>
      {data?.slice(indices.start, indices.end).map((country, idx) => (
        <div key={idx} className={styles.country}>
          <p>{country.name}</p>
          <p>{country.continent.name}</p>
          <p>{country.capital ? country.capital : "-"}</p>
          <p>{country.currency ? country.currency.slice(0, 3) : "-"}</p>
          <p>
            {country.languages.length
              ? country.languages.map((language) => language.name).join(", ")
              : "-"}
          </p>
        </div>
      ))}
      <ul className={`${styles.paginate} pagination`}>
        <li className={activePage === 1 ? "disabled" : styles.navigate}>
          <a>
            <Left onClick={() => changePage({ increment: false })} />
          </a>
        </li>
        {new Array(data ? Math.ceil(data.length / 15) : 0)
          .fill()
          .map((item, idx) => (
            <li
              key={idx}
              className={
                activePage === idx + 1
                  ? `${styles.overrideActive} active`
                  : "waves-effect"
              }
            >
              <a onClick={() => jumpTo({ page: idx })}>{idx + 1}</a>
            </li>
          ))}
        <li
          className={
            activePage === Math.ceil(data.length / 15)
              ? "disabled"
              : styles.navigate
          }
        >
          <a>
            <Right onClick={() => changePage({ increment: true })} />
          </a>
        </li>
      </ul>
    </main>
  );
};

export default TableData;
