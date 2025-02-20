import React, { useState } from "react";
import { Table } from "antd";
import dayjs from "dayjs";
import {
  MapPin,
  Link,
  Clock,
  UserRound,
  MessageCircle,
  ChevronDown,
  EllipsisVertical,
} from "lucide-react";
import { mockEmployeeData, mockAttendanceRecords } from "../data/dummyData";

const ATable = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(mockEmployeeData);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text, record) => (
        <div className="font-semibold">
          <span className="text-sm mr-2">{record.day}</span>
          <span className="text-sm">{dayjs(text).format("DD-MMM-YYYY")}</span>
        </div>
      ),
      width: 150,
    },
    {
      title: "Time planned + WH",
      dataIndex: "plannedTime",
      key: "plannedTime",
      width: 250,
      render: (text) => (
        <div className="text-sm font-semibold flex justify-center">{text}</div>
      ),
    },
    {
      title: "Actual Time",
      key: "actualTime",
      width: "100",
      render: (row) => {
        const [time, hours] = row.actualTime.split(" • ");
        let timeColor = "";

        if (row.status.includes("LT")) {
          timeColor = "text-red-500";
        } else if (row.status.includes("OT")) {
          timeColor = "text-yellow-500";
        }

        return (
          <div className="flex items-center p-1 rounded font-medium">
            <span className="text-gray-800 ">{time}</span>
            <span className={timeColor}>
              {" "}
              <span className="text-gray-400 text-xl ml-1">•</span> {hours}
            </span>
          </div>
        );
      },
    },
    {
      title: "Fine/Bonus",
      dataIndex: "bonus",
      key: "bonus",
      width: 150,
      render: (value) => (
        <div className="flex items-center font-semibold justify-between">
          <span
            className={
              value >= 0 ? "text-green-500 text-sm" : "text-red-500 text-sm"
            }
          >
            {value >= 0 ? `+${value}` : value}
          </span>
          <span className="text-gray-400 ml-2 text-xs line-through">+900</span>
          <EllipsisVertical className="w-5 h-4" />
        </div>
      ),
    },
    {
      title: "Error",
      key: "error",
      width: 100,
      render: (_, record) => (
        <div className="flex gap-1">
          {record.errors.includes("!") && (
            <span className="w-6 h-6 rounded-full flex items-center justify-center">
              <MapPin size={16} className="text-red-500" />
            </span>
          )}
          {record.errors.includes("R") && (
            <span className="w-6 h-6 rounded-full flex items-center justify-center">
              <Clock size={16} className="text-red-500" />
            </span>
          )}
          {record.errors.includes("P") && (
            <span className="w-6 h-6 rounded-full flex items-center justify-center">
              <UserRound size={16} className="text-red-500" />
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Cal. Att.",
      dataIndex: "calculatedAttendance",
      key: "calculatedAttendance",
      width: 160,
      render: (text) => (
        <div className="text-sm font-semibold text-green-500 px-4 py-2">
          {text}
        </div>
      ),
    },
    {
      title: "Final Att.",
      key: "finalAttendance",
      width: "150px",
      render: (row) => {
        return (
          <div className="flex items-center font-semibold space-x-2 justify-between">
            <span>{row.finalAttendance}</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        );
      },
    },
    {
      title: "",
      key: "actions",
      render: () => (
        <div className="flex gap-3 font-semibold">
          <span className="rounded-full flex items-center justify-center">
            <Link size={16} className="text-black" />
            <span className="ml-1">3</span>
          </span>
          <span className="rounded-full flex items-center justify-center">
            <MessageCircle size={16} className="text-black" />
            <span className="ml-1">3</span>
          </span>
          <span className="rounded-full flex items-center justify-center">
            <ChevronDown size={16} className="text-black" />
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar for employees */}
      <div className="w-full md:w-72 bg-white p-4 border-r overflow-auto md:h-screen">
        <div className="space-y-2 mb-12">
          {Array(15)
            .fill(mockEmployeeData)
            .map((employee, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100"
                onClick={() => setSelectedEmployee(employee)}
              >
                <img
                  src="data:image/jpeg;base64,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"
                  alt={employee.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-lg">{employee.name}</p>
                  <p className="text-xs text-gray-500">
                    {employee.role} | {employee.department}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="p-2 md:p-6">
          <div>
            {/* Employee Summary Header */}
            <div className="p-6 border-b shadow-md rounded-lg bg-white mb-6">
              <div className="flex flex-col md:flex-row items-start gap-4 ">
                <div className="flex items-center gap-4 w-80">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt={selectedEmployee.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {selectedEmployee.name}
                    </h3>
                    <p className="text-gray-500 text-xs">
                      {selectedEmployee.role} | {selectedEmployee.department}
                    </p>
                  </div>
                </div>

                <div className="w-full overflow-x-auto mt-4 md:mt-0 md:ml-auto">
                  <table className="border-collapse w-full">
                    <thead>
                      <tr>
                        <th className="px-2 md:px-4 py-1 md:py-2 text-center border"></th>
                        <th className="px-2 md:px-4 py-1 md:py-2 text-center border">
                          P
                        </th>
                        <th className="px-2 md:px-4 py-1 md:py-2 text-center border">
                          A
                        </th>
                        <th className="px-2 md:px-4 py-1 md:py-2 text-center border">
                          WO
                        </th>
                        <th className="px-2 md:px-4 py-1 md:py-2 text-center border">
                          Σ Bonus / Fine
                        </th>
                        <th className="px-2 md:px-4 py-1 md:py-2 text-center border">
                          OT
                        </th>
                        <th className="px-2 md:px-4 py-1 md:py-2 text-center border">
                          LT
                        </th>
                        <th className="px-2 md:px-4 py-1 md:py-2 text-center border">
                          OT+LT
                        </th>
                        <th className="px-2 md:px-4 py-1 md:py-2 text-center border">
                          Final Att.
                        </th>
                        <th className="px-2 md:px-4 py-1 md:py-2 text-center border"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="font-semibold">
                        <td className="border px-2 md:px-4 py-1 md:py-2">
                          Cal.
                        </td>
                        <td className="border px-2 md:px-4 py-1 md:py-2 text-center">
                          {selectedEmployee.summary.calculated.present}
                        </td>
                        <td className="border px-2 md:px-4 py-1 md:py-2 text-center">
                          {selectedEmployee.summary.calculated.absent}
                        </td>
                        <td className="border px-2 md:px-4 py-1 md:py-2 text-center">
                          {selectedEmployee.summary.calculated.weeklyOff}
                        </td>
                        <td className="border px-2 md:px-4 py-1 md:py-2 text-center">
                          +{selectedEmployee.summary.calculated.bonus}
                        </td>
                        <td className="border px-2 md:px-4 py-1 md:py-2 text-center">
                          {selectedEmployee.summary.calculated.ot}
                        </td>
                        <td className="border px-2 md:px-4 py-1 md:py-2 text-center">
                          {selectedEmployee.summary.calculated.lt}
                        </td>
                        <td className="border px-2 md:px-4 py-1 md:py-2 text-center">
                          {selectedEmployee.summary.calculated.otLt}
                        </td>
                        <td className="border px-2 md:px-4 py-1 md:py-2 text-center">
                          {selectedEmployee.summary.calculated.finalAtt}
                        </td>
                        <td className="border px-2 md:px-4 py-1 md:py-2 text-xs">
                          Finalised by{" "}
                          {selectedEmployee.summary.calculated.finalizedBy}
                        </td>
                      </tr>
                      <tr className="font-semibold">
                        <td className="border px-2 md:px-4 py-1 md:py-2">
                          Final
                        </td>
                        <td className="border px-2 md:px-4 py-1 md:py-2 text-center">
                          {selectedEmployee.summary.final.present}
                        </td>
                        <td className="border px-2 md:px-4 py-1 md:py-2 text-center">
                          {selectedEmployee.summary.final.absent}
                        </td>
                        <td className="border px-2 md:px-4 py-1 md:py-2 text-center">
                          {selectedEmployee.summary.final.weeklyOff}
                        </td>
                        <td className="border px-2 md:px-4 py-1 md:py-2 text-center">
                          +{selectedEmployee.summary.final.bonus}
                        </td>
                        <td className="border px-2 md:px-4 py-1 md:py-2 text-center">
                          {selectedEmployee.summary.final.ot}
                        </td>
                        <td className="border px-2 md:px-4 py-1 md:py-2 text-center">
                          {selectedEmployee.summary.final.lt}
                        </td>
                        <td className="border px-2 md:px-4 py-1 md:py-2 text-center">
                          {selectedEmployee.summary.final.otLt}
                        </td>
                        <td className="border px-2 md:px-4 py-1 md:py-2 text-center">
                          {selectedEmployee.summary.final.finalAtt}
                        </td>
                        <td className="border px-2 md:px-4 py-1 md:py-2 text-xs">
                          Locked by {selectedEmployee.summary.final.lockedBy}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row h-screen bg-gray-50">
              <style jsx global>{`
                .attendance-table .ant-table-cell {
                  border: 1px solid #e5e7eb !important;
                }
                .attendance-table .ant-table-thead > tr > th {
                  border: 1px solid #e5e7eb !important;
                  background-color: #f9fafb;
                }
                .attendance-table .ant-table-tbody > tr > td {
                  border: 1px solid #e5e7eb !important;
                }
              `}</style>
              <div className="overflow-x-auto ">
                <Table
                  columns={columns}
                  dataSource={mockAttendanceRecords}
                  pagination={false}
                  scroll={{ y: 800, x: "max-content" }}
                  className="attendance-table"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATable;
