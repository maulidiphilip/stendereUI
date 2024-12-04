import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useState } from "react";

const DateSlider = ({ onDateChange, onFilterChange }) => {
  const [dateRange, setDateRange] = useState({
    startDate: undefined,
    endDate: undefined,
    key: "selection",
  });

  function handleSelect(ranges) {
    setDateRange(ranges.selection);
    onDateChange(ranges.selection.startDate, ranges.selection.endDate);
    onFilterChange(ranges.selection.startDate, ranges.selection.endDate);
  }

  function handleClearFilter() {
    setDateRange({
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    });
    onDateChange(null, null);
    onFilterChange(null, null);
  }
  return (
    <>
      <h4>Filter By Date</h4>
      <DateRangePicker
        ranges={[dateRange]}
        onChange={handleSelect}
        className="mb-4"
      />
      <button className="btn btn-secondary" onClick={handleClearFilter}>
        Clear Filter
      </button>
    </>
  );
};

export default DateSlider;
