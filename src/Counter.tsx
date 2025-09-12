import { useState } from "react";
import { Button } from "./components/Button/Button.tsx";

export const Counter = () => {
  const [count, setCount] = useState(1);

  return (
    <div className="card">
      <Button onClick={() => setCount(count + 1)}>Count is {count}</Button>
    </div>
  );
};
