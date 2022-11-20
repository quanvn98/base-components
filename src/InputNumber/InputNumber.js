import "./input-number.css";
import PropTypes from "prop-types";
import { useState } from "react";

const FRACTION_COUNT = 2;

function InputNumber({ placeholder, value, onChange }) {
  // Tiền tố "-"
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");

  const formatNumber = (number) => {
    if (typeof number !== "number" || Number.isNaN(number)) {
      return `${prefix}`;
    } else {
      let formatted = number.toLocaleString("vi-VN", {
        useGrouping: true,
        roundingMode: "trunc",
        maximumFractionDigits: FRACTION_COUNT,
      });
      return `${formatted}${suffix}`;
    }
  };

  const handleChange = (e) => {
    let newValue = e.target.value;

    if (/[^-.,\d]/g.test(newValue)) {
      return;
    }

    newValue = newValue.replaceAll(".", "");
    newValue = newValue.replaceAll(",", ".");

    if (
      (newValue.match(/-/g) || []).length > 1 ||
      (newValue.match(/\./g) || []).length > 1
    ) {
      return;
    }

    if (
      newValue.includes(".") &&
      newValue.split(".")[1].length > FRACTION_COUNT
    ) {
      return;
    }

    if (!newValue) {
      setPrefix("");
      onChange(NaN);
      return;
    } else if (newValue === "-") {
      setPrefix("-");
      onChange(NaN);
      return;
    }

    let suffixChars = [];
    for (let i = newValue.length - 1; i >= 0; i--) {
      if (newValue[i] === "0") {
        suffixChars.unshift("0");
      } else if (newValue[i] === ".") {
        suffixChars.unshift(",");
        break;
      } else {
        break;
      }
    }
    if (suffixChars.length && suffixChars[0] === ",") {
      setSuffix(suffixChars.join(""));
    } else {
      setSuffix("");
    }

    let number = Number(newValue);
    if (Number.isNaN(number)) {
      return;
    }

    onChange(number);
  };

  return (
    <input
      className="vnq-input-number"
      type="text"
      placeholder={placeholder}
      value={formatNumber(value)}
      onChange={handleChange}
    />
  );
}

InputNumber.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
};

InputNumber.defaultProps = {
  placeholder: "",
  value: NaN,
  onChange: () => {},
};

export default InputNumber;
