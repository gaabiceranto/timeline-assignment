import React, { useState } from "react";
import Timeline from "./components/Timeline/Timeline.js";
import { timelineItems as seed } from "./timelineItems.js";

export default function App() {
  const [items, setItems] = useState(seed);

  const onChangeDates = (id, next) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, ...next } : it))
    );
  };

  const onChangeName = (id, name) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, name } : it)));
  };

  return (
    <div style={{ padding: 16, fontFamily: "ui-sans-serif, system-ui" }}>
      <h1 style={{ fontSize: 18, marginBottom: 8 }}>Compact Timeline</h1>
      <Timeline
        items={items}
        onChangeDates={onChangeDates}
        onChangeName={onChangeName}
      />
    </div>
  );
}
