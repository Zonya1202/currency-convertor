import React from 'react';
import axios from 'axios';
import { Block } from './Block';
import './index.scss';

const App = () => {
  const [fromCurrency, setFromCurrency] = React.useState('RUB');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);

  const ratesRef = React.useRef({});

  React.useEffect(() => {
    axios.get(`https://www.cbr-xml-daily.ru/latest.js`).then((res) => {
      ratesRef.current = res.data.rates;
      onChangeToPrice(1);
    });
  }, []);

  const onChangeFromPrice = (value) => {
    if (fromCurrency !== 'RUB' && toCurrency !== 'RUB') {
      const price = value / ratesRef.current[fromCurrency];
      const result = price * ratesRef.current[toCurrency];
      setToPrice(result.toFixed(3));
      setFromPrice(value);
    } else if (fromCurrency === 'RUB' && toCurrency !== 'RUB') {
      const result = value * ratesRef.current[toCurrency];
      setToPrice(result.toFixed(3));
      setFromPrice(value);
    } else {
      setToPrice(value);
      setFromPrice(value);
    }
  };

  const onChangeToPrice = (value) => {
    if (fromCurrency !== 'RUB' && toCurrency !== 'RUB') {
      const price = value / ratesRef.current[toCurrency];
      const result = price * ratesRef.current[fromCurrency];
      setFromPrice(result.toFixed(3));
      setToPrice(value);
    } else if (fromCurrency === 'RUB' && toCurrency !== 'RUB') {
      const result = value / ratesRef.current[toCurrency];
      setFromPrice(result.toFixed(3));
      setToPrice(value);
    } else if (fromCurrency !== 'RUB' && toCurrency === 'RUB') {
      const result = value * ratesRef.current[fromCurrency];
      setFromPrice(result.toFixed(3));
      setToPrice(value);
    } else {
      setFromPrice(value);
      setToPrice(value);
    }
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);
  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
};

export default App;
