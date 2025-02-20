import React, { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

const SearchHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsOpen, setRowsOpen] = useState(false);
  const [monthOpen, setMonthOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState("10 rows");
  const [selectedMonth, setSelectedMonth] = useState("July");
  const [selectedView, setSelectedView] = useState("Detailed View");

  const rowOptions = ["Rows", "Columns"];
  const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const viewOptions = ["Detailed View", "Compact View"];

  const Dropdown = ({
    open,
    setOpen,
    options,
    selected,
    setSelected,
    className,
  }) => (
    <div className="relative">
      <button
        className={`flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 text-sm hover:border-gray-300 ${className}`}
        onClick={() => setOpen(!open)}
      >
        <span className="text-gray-700">{selected}</span>
        <ChevronDown className="h-4 w-4 text-gray-700" />
      </button>

      {open && (
        <div className="absolute top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
          {options.map((option) => (
            <button
              key={option}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex items-center gap-4 p-4 bg-white border-b border-gray-100">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-200 text-sm text-gray-800 placeholder-gray-700 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-200"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Filters */}
      <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
        <SlidersHorizontal className="h-4 w-4" />
        <span className="text-sm">Filters</span>
      </button>

      {/* Rows Dropdown */}
      <Dropdown
        open={rowsOpen}
        setOpen={setRowsOpen}
        options={rowOptions}
        selected={selectedRows}
        setSelected={setSelectedRows}
      />

      {/* Month Dropdown */}
      <Dropdown
        open={monthOpen}
        setOpen={setMonthOpen}
        options={monthOptions}
        selected={selectedMonth}
        setSelected={setSelectedMonth}
      />

      {/* Right side buttons */}
      <div className="ml-auto flex items-center gap-4">
        <button className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-600 text-white rounded-full text-sm transition-colors">
          Export
          <ChevronDown className="h-4 w-4 ml-2" />
        </button>

        <Dropdown
          open={viewOpen}
          setOpen={setViewOpen}
          options={viewOptions}
          selected={selectedView}
          setSelected={setSelectedView}
          className="min-w-[140px]"
        />
      </div>
    </div>
  );
};

export default SearchHeader;
