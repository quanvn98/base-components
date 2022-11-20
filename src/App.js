import { useEffect, useState } from "react";
import "./App.css";
import InputNumber from "./InputNumber/InputNumber";

function App() {
  const [number, setNumber] = useState(NaN);

  useEffect(() => {
    console.log(number);
  }, [number]);

  return (
    <fieldset style={{ width: 400 }}>
      <legend>BASE INPUT NUMBER</legend>
      <InputNumber
        placeholder={"Hãy nhập số vào đây"}
        value={number}
        onChange={setNumber}
      />
    </fieldset>
  );
}

export default App;
