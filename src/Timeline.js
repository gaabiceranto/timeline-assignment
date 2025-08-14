import React, { useState, useCallback, useMemo } from "react";
import { assignLanesFixed } from "./assignLanes.js";
import TimelineItem from "./TimelineItem.js";
import EditModal from "./EditModal.js";
import "./Timeline.css";

const Timeline = ({ items: initialItems }) => {
  const [items, setItems] = useState(initialItems);
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { minDate, maxDate, totalDays } = useMemo(() => {
    if (!items.length)
      return { minDate: new Date(), maxDate: new Date(), totalDays: 0 };

    const dates = items.flatMap((item) => [
      new Date(item.start),
      new Date(item.end),
    ]);
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    const totalDays =
      Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1;

    return { minDate, maxDate, totalDays };
  }, [items]);

  const lanes = useMemo(() => assignLanesFixed(items), [items]);

  const getDatePosition = useCallback(
    (date) => {
      const daysDiff = (new Date(date) - minDate) / (1000 * 60 * 60 * 24);
      return daysDiff * 100 * zoom + panOffset;
    },
    [minDate, zoom, panOffset]
  );

  const getItemWidth = useCallback(
    (start, end) => {
      const daysDiff =
        (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
      return Math.max(daysDiff * 100 * zoom, 80);
    },
    [zoom]
  );

  const getDateFromPosition = useCallback(
    (position) => {
      const adjustedPosition = position - panOffset;
      const daysDiff = adjustedPosition / (100 * zoom);
      const newDate = new Date(minDate);
      newDate.setDate(newDate.getDate() + Math.round(daysDiff));
      return newDate;
    },
    [minDate, zoom, panOffset]
  );

  const handleItemDateUpdate = useCallback((itemId, newStart, newEnd) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === itemId ? { ...item, start: newStart, end: newEnd } : item
      );
      return updatedItems;
    });
  }, []);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev / 1.2, 0.3));

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX - panOffset);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        setPanOffset(e.clientX - dragStart);
      }
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleSaveEdit = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setShowModal(false);
    setEditingItem(null);
    console.log(`Item ${updatedItem.id} updated:`, updatedItem);
  };

  const handleCancelEdit = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const renderGrid = () => {
    const gridLines = [];
    const today = new Date();

    for (let i = 0; i <= totalDays; i++) {
      const date = new Date(minDate);
      date.setDate(date.getDate() + i);
      const position = i * 100 * zoom + panOffset;
      const isCurrentDay = date.toDateString() === today.toDateString();

      gridLines.push(
        <div
          key={`grid-${i}`}
          className={`grid-line ${isCurrentDay ? "current-day" : ""}`}
          style={{ left: position }}
        />
      );
    }

    return gridLines;
  };

  const renderTimeScale = () => {
    const scaleItems = [];
    const step = Math.max(1, Math.ceil(totalDays / 20));
    const today = new Date();

    for (let i = 0; i <= totalDays; i += step) {
      const date = new Date(minDate);
      date.setDate(date.getDate() + i);
      const position = i * 100 * zoom + panOffset;
      const isCurrentDay = date.toDateString() === today.toDateString();

      scaleItems.push(
        <div key={i} className="time-scale-mark" style={{ left: position }}>
          <div className="time-scale-line"></div>
          <div
            className={`time-scale-label ${isCurrentDay ? "current-day" : ""}`}
          >
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      );
    }

    return scaleItems;
  };

  if (!items.length) {
    return <div className="timeline-empty">No items to display</div>;
  }

  return (
    <div className="timeline-container">
      <div className="timeline-controls">
        <button onClick={handleZoomOut} className="zoom-btn">
          -
        </button>
        <span className="zoom-level">{Math.round(zoom * 100)}%</span>
        <button onClick={handleZoomIn} className="zoom-btn">
          +
        </button>
        <button
          className="reset-btn"
          onClick={() => {
            setZoom(1);
            setPanOffset(0);
          }}
        >
          Reset
        </button>
      </div>

      <div
        className="timeline-scroll-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div
          className="timeline-content"
          style={{
            width: `${totalDays * 100 * zoom + 200}px`,
            transform: `translateX(${panOffset}px)`,
          }}
        >
          <div className="timeline-grid">{renderGrid()}</div>

          <div className="time-scale">{renderTimeScale()}</div>

          <div className="timeline-lanes">
            {lanes.map((lane, laneIndex) => (
              <div key={laneIndex} className="timeline-lane">
                {lane.map((item) => (
                  <TimelineItem
                    key={item.id}
                    item={item}
                    getDatePosition={getDatePosition}
                    getItemWidth={getItemWidth}
                    getDateFromPosition={getDateFromPosition}
                    onEdit={handleEditItem}
                    onDateUpdate={handleItemDateUpdate}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && editingItem && (
        <EditModal
          item={editingItem}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default Timeline;
