import React from "react";

const TopNav = () => {
  const navItems = [
    { label: "Atten. Team (Admin)", key: "1" },
    { label: "Org. Details (Admin)", key: "2" },
    { label: "In/Out Logs", key: "3" },
    { label: "Finalize Atten.", key: "4" },
    { label: "Manage Employees", key: "5" },
    { label: "Final Reports", key: "6", active: true },
    { label: "Error Reports", key: "7" },
  ];

  return (
    <div className="border-b border-gray-300 flex justify-between items-center bg-gray-100 shadow-sm">
      <div className="flex divide-x divide-gray-300">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`text-sm font-semibold px-6 py-3 transition-colors relative ${
              item.active
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-500 hover:text-indigo-600"
            }`}
          >
            {item.label}
            {item.active && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 "></div>
            )}
          </button>
        ))}
      </div>
      <span className="text-indigo-600 px-6">Attendance Module</span>
    </div>
  );
};

export default TopNav;
