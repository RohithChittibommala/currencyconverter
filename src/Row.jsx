import React, { useState } from "react";
const Row = ({
  className,
  currencyOptions,
  selectedCurrency,
  onCurrencyChange,
  amount,
  handleInputChange,
  text,
}) => {
  const [value, setValue] = useState("");
  return (
    <div className="row">
      <input
        className={className}
        type="number"
        value={amount || ""}
        onChange={(e) => {
          handleInputChange(e, text);
        }}
      />
      <select
        className="row__select"
        value={selectedCurrency}
        onChange={onCurrencyChange}
      >
        {currencyOptions.map((currency) => (
          <option
            className={"row__select__option"}
            key={currency}
            value={currency}
          >
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Row;
