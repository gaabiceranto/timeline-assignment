import React, { useState, useEffect } from "react";

const EditModal = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: item.name,
    start: item.start,
    end: item.end,
  });

  useEffect(() => {
    setFormData({
      name: item.name,
      start: item.start,
      end: item.end,
    });
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Item name is required!");
      return;
    }

    if (new Date(formData.start) > new Date(formData.end)) {
      alert("Start date cannot be after end date!");
      return;
    }

    const updatedItem = {
      ...item,
      name: formData.name.trim(),
      start: formData.start,
      end: formData.end,
    };

    onSave(updatedItem);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Timeline Item</h3>
          <button
            className="modal-close-btn"
            onClick={handleCancel}
            title="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Item Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter item name"
              required
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="start">Start Date:</label>
              <input
                type="date"
                id="start"
                name="start"
                value={formData.start}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="end">End Date:</label>
              <input
                type="date"
                id="end"
                name="end"
                value={formData.end}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Duration:</label>
            <div className="duration-display">
              {(() => {
                const start = new Date(formData.start);
                const end = new Date(formData.end);
                const duration =
                  Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
                return `${duration} ${duration === 1 ? "day" : "days"}`;
              })()}
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
