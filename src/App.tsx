import { useState } from "react";

import "./App.css";
import { Button } from "./components/Button/Button.tsx";
import { Counter } from "./Counter.tsx";
import { List } from "./List.tsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>React cool</h1>
      <hr />

      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>Count is {count}</Button>
      </div>
      <Counter />

      <hr />

      <List />
    </>
  );
}

export default App;
