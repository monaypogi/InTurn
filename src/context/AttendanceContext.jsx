import { createContext, useContext, useState, useEffect } from "react";

const REQUIRED_HOURS = 8;

const AttendanceContext = createContext();

export const useAttendance = () => useContext(AttendanceContext);

export const AttendanceProvider = ({ children }) => {
  

  const [attendance, setAttendance] = useState(() => {
    const stored = localStorage.getItem("attendance");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [attendance]);

  // ✅ TIME IN
  const timeIn = () => {
    const today = new Date().toDateString();

    const alreadyTimedIn = attendance.find(a => a.date === today);
    if (alreadyTimedIn) return false;

    const now = new Date();
    const isLate = now.getHours() >= 9;

    const newRecord = {
      date: today,
      timeIn: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      timeInRaw: now.toISOString(),
      timeOut: "----",
      hours: 0,
      status: isLate ? "late" : "ontime"
    };

    setAttendance(prev => [newRecord, ...prev]);
    return true;
  };

  // ✅ TIME OUT
  const timeOut = () => {
    const today = new Date().toDateString();

    const recordIndex = attendance.findIndex(a => a.date === today);
    if (recordIndex === -1) return false;

    const record = attendance[recordIndex];
    if (record.timeOut !== "----") return false;

    const now = new Date();

    const timeInSource = new Date(record.timeInRaw);
    if (isNaN(timeInSource.getTime())) return false;



    const diffMs = now - timeInSource;

    const diffHours = diffMs / (1000 * 60 * 60);

    let status = record.status;

    if (diffHours < REQUIRED_HOURS) {
      status = "undertime";
    }

    const updatedRecord = {
      ...record,
      timeOut: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      hours: Number(diffHours.toFixed(2)),
      status
    };

    const updatedAttendance = [...attendance];
    updatedAttendance[recordIndex] = updatedRecord;

    setAttendance(updatedAttendance);
    return true;
  };

  return (
    <AttendanceContext.Provider value={{ attendance, timeIn, timeOut }}>
      {children}
    </AttendanceContext.Provider>
  );
};
