import React, { useEffect, useRef, useState } from "react";
import { Return, Search } from "../../svg";
import useClickOutside from "../../helper/clickOutside";

export default function SearchMenu({ color, setShowSearchmenu }) {
  const [iconVisible, setIconVisible] = useState(true);
  const menu = useRef(null);
  const input = useRef(null);

  useClickOutside(menu, () => {
    setShowSearchmenu(false);
  });
  useEffect(() => {
    input.current.focus();
  }, []);
  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => {
              setShowSearchmenu(false);
            }}
          >
            <Return color="black" />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color="black" />
            </div>
          )}
          <input
            type="text"
            placeholder="Search Facebook"
            ref={input}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent searches</span>
        <a>Edit</a>
      </div>
      <div className="search_history"></div>
      <div className="search_results scrollbar"></div>
    </div>
  );
}
