"use client";

import { useState } from "react";

function TestCounter() {
  const [value, setValue] = useState(0);
  return (
    <div>
      <p>
        The counter is <span>{value}</span>
      </p>
      <button onClick={() => setValue((curr) => curr + 1)}>Increment</button>
    </div>
  );
}

export default TestCounter;
