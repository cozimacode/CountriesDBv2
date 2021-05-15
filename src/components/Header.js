import React, { useState } from "react";
import { SearchIcon, logo } from "../assets";
import styles from "../styles/Header.module.css";

const Header = ({ count = 0, inputValue, setValue }) => {
  const [isSearchActive, toggleSearch] = useState(false);
  return (
    <header>
      <div className={styles.headings}>
        <img src={logo} />
        {count === 1 ? (
          <p
            style={
              inputValue.length
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
          >
            There's 1 country that matches your search criteria
          </p>
        ) : (
          <p
            style={
              inputValue.length
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
          >
            There are {count} countries that match your search criteria
          </p>
        )}
      </div>
      <div className={styles.filters}>
        <input
          type="text"
          className={`${styles.searchBar} browser-default`}
          style={{
            clipPath: isSearchActive
              ? "circle(100% at 50% 50%)"
              : "circle(0% at 100% 50%)",
          }}
          value={inputValue}
          placeholder="Search By Name"
          onChange={(e) => setValue(e.target.value)}
        />
        <SearchIcon onClick={() => toggleSearch(!isSearchActive)} />
      </div>
    </header>
  );
};

export default Header;
