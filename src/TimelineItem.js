import React, { useState, useRef, useCallback, useEffect } from "react";

const TimelineItem = ({
  item,
  getDatePosition,
  getItemWidth,
  getDateFromPosition,
  onEdit,
  onDateUpdate,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [showActions, setShowActions] = useState(false);
  const [dragType, setDragType] = useState(null);
  const itemRef = useRef(null);

  const left = getDatePosition(item.start);
  const width = getItemWidth(item.start, item.end);

  const duration =
    Math.ceil(
      (new Date(item.end) - new Date(item.start)) / (1000 * 60 * 60 * 24)
    ) + 1;

  const handleMouseDown = (e) => {
    if (e.target.closest(".item-actions")) return;

    const rect = itemRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX < 16) {
      setDragType("resize-start");
    } else if (clickX > width - 16) {
      setDragType("resize-end");
    } else {
      setDragType("move");
    }

    setIsDragging(true);
    setDragOffset(e.clientX - left);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !dragType) return;

      const newLeft = e.clientX - dragOffset;

      if (dragType === "move") {
        const newStartDate = getDateFromPosition(newLeft);
        const newEndDate = new Date(newStartDate);
        newEndDate.setDate(newEndDate.getDate() + duration - 1);

        onDateUpdate(
          item.id,
          newStartDate.toISOString().split("T")[0],
          newEndDate.toISOString().split("T")[0]
        );
      } else if (dragType === "resize-start") {
        const newStartDate = getDateFromPosition(newLeft);
        const currentEndDate = new Date(item.end);

        if (newStartDate < currentEndDate) {
          onDateUpdate(
            item.id,
            newStartDate.toISOString().split("T")[0],
            item.end
          );
        }
      } else if (dragType === "resize-end") {
        const newEndDate = getDateFromPosition(newLeft + width);
        const currentStartDate = new Date(item.start);

        if (newEndDate > currentStartDate) {
          onDateUpdate(
            item.id,
            item.start,
            newEndDate.toISOString().split("T")[0]
          );
        }
      }
    },
    [
      isDragging,
      dragType,
      dragOffset,
      item.id,
      item.start,
      item.end,
      duration,
      width,
      onDateUpdate,
      getDateFromPosition,
    ]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragType(null);
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e) => {
        handleMouseMove(e);
      };

      const handleGlobalMouseUp = () => {
        handleMouseUp();
      };

      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove);
        document.removeEventListener("mouseup", handleGlobalMouseUp);
      };
    }
  }, [isDragging, handleMouseMove]);

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(item);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      console.log(`Item ${item.id} deleted`);
    }
  };

  const getCursor = () => {
    if (isDragging) return "grabbing";
    if (dragType === "resize-start" || dragType === "resize-end")
      return "ew-resize";
    return "grab";
  };

  return (
    <div
      ref={itemRef}
      className={`timeline-item ${isDragging ? "dragging" : ""}`}
      style={{
        left: `${left}px`,
        width: `${width}px`,
        cursor: getCursor(),
      }}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
        if (!isDragging) {
          setIsDragging(false);
          setDragType(null);
        }
      }}
      title={`${item.name} (${item.start} - ${item.end})`}
    >
      <div className="resize-handle resize-start" title="Resize start"></div>
      <div className="resize-handle resize-end" title="Resize end"></div>

      <div className="item-content">
        <div className="item-name">{item.name}</div>
        <div className="item-duration">
          {duration} {duration === 1 ? "day" : "days"}
        </div>
        <div className="item-dates">
          {new Date(item.start).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
          })}{" "}
          -{" "}
          {new Date(item.end).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
          })}
        </div>
      </div>

      <div className={`item-actions ${showActions ? "show" : ""}`}>
        <button
          className="action-btn edit-btn"
          onClick={handleEdit}
          title="Edit item"
        >
          ✏️
        </button>
        <button
          className="action-btn delete-btn"
          onClick={handleDelete}
          title="Delete item"
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default TimelineItem;
