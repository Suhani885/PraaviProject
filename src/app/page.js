"use client";
import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import SearchHeader from "./components/SearchHeader";
import AttendanceSystem from "./components/Table";
import { mockEmployeeData, mockAttendanceRecords } from "./data/dummyData";

const AttendancePage = () => {
  const [selectedMonth, setSelectedMonth] = useState("July");
  const [view, setView] = useState("detailed");

  return (
    <Layout className="h-screen w-screen overflow-hidden">
      <Sidebar />
      <Layout className="ml-16">
        <TopNav />
        <Layout.Content className="bg-white p-6">
          <SearchHeader
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
            view={view}
            onViewChange={setView}
          />
          <AttendanceSystem
            employee={mockEmployeeData}
            records={mockAttendanceRecords}
          />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AttendancePage;
