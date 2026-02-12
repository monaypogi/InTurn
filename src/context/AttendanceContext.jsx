import { createContext, useContext, useState, useEffect } from "react";
import { internAPI } from "../services/api";

const AttendanceContext = createContext();

export const useAttendance = () => useContext(AttendanceContext);

export const AttendanceProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fetchLogs = async () => {
    try{
      setLoading(true);

      //fetch history from interncontroller
      const historyRes = await internAPI.getMyAttendanceHistory();
      setLogs(historyRes.data.attendance_records || []);
      
      //fetch profile/stats for the summary card from interncontroller
      const profileRes = await internAPI.getMyProfile();
      setSummary(profileRes.data.statistics.attendance || null);

    } catch (error) {
      console.error("Error fetching attendance data", error);
      setLogs([]); // reset to empty array on error to prevent crashes
    } finally {
      setLoading(false)
    }
  };

  // connect time in to laravel
  const timeIn = async () => {
    try {
      await internAPI.attendanceTimeIn(); // calls Laravel Route
      await fetchLogs(); // refresh the list after clocking in
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  };

  // connect timeOut to laravel
  const timeOut = async () => {
    try {
      await internAPI.attendanceTimeOut(); // Calls your Laravel Route
      await fetchLogs(); // Refresh the list
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  };

  return (
    <AttendanceContext.Provider value={{ timeIn, timeOut, logs, fetchLogs, loading, summary }}>
      {children}
    </AttendanceContext.Provider>
  );
};
