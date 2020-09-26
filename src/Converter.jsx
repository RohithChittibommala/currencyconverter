import React, { useState, useEffect } from "react";
import Row from "./Row";
import { calculateExchangeValue, getDataFromApi } from "./request";
const Converter = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(1);
  const [amountInFrom, setAmountInFrom] = useState(true);
  const [exchangeRate, setExchangeRate] = useState("");
  useEffect(() => {
    (async function () {
      const { data } = await getDataFromApi();
      const { base, rates } = data;
      const firstCurrency = Object.keys(rates)[0];
      setFromCurrency(base);
      setCurrencyOptions([base, ...Object.keys(rates)]);
      setToCurrency(firstCurrency);
      setExchangeRate(rates[firstCurrency]);
    })();
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency)
      calculateExchangeValue(fromCurrency, toCurrency).then((rates) => {
        console.log(rates);
        setExchangeRate(rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);
  const handleInputChange = ({ target }, text) => {
    if (text === "from") {
      setAmount(target.valueAsNumber);
      setAmountInFrom(true);
    } else {
      setAmount(target.valueAsNumber);
      setAmountInFrom(false);
    }
  };

  let toAmount, fromAmount;
  if (amountInFrom) {
    fromAmount = amount;
    toAmount = fromAmount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = toAmount / exchangeRate;
  }
  return (
    <div className="converter">
      <Row
        currencyOptions={currencyOptions}
        className={"input row__input"}
        selectedCurrency={fromCurrency}
        onCurrencyChange={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        handleInputChange={handleInputChange}
        text="from"
      />
      <Row
        currencyOptions={currencyOptions}
        className={"input row__input--voilet"}
        selectedCurrency={toCurrency}
        onCurrencyChange={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        handleInputChange={handleInputChange}
        text="to"
      />
    </div>
  );
};

export default Converter;
