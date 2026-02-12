import axios from 'axios';

// This will work for all 3 frontend developers
// Backend team will run their server on http://127.0.0.1:8000
const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add token to requests if user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // ensure a match with login.jsx
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/login', credentials),
  register: (userData) => api.post('/register', userData),
  logout: () => api.post('/logout'),
};

// Admin APIs - Person B will add these
export const adminAPI = {
  getInterns: () => api.get('/admin/interns'),
  createIntern: (internData) => api.post('/admin/interns', internData),
  updateIntern: (id, internData) => api.put(`/admin/interns/${id}`, internData),
  deleteIntern: (id) => api.delete(`/admin/interns/${id}`),
  getInternDetails: (id) => api.get(`/admin/interns/details/${id}`), // get intern profile (with submissions)
  getAttendanceRecords: () => api.get(`/admin/interns/attendance`), // gets the attendance record for the day for all interns under the admin's supervision
  getAttendanceOverview: () => api.get(`/admin/interns/attendance/overview`) // get today's attendance overview (total, present, late, absent, undertime) for all interns under the admin's supervision

};

// Intern APIs - Person C will add these
export const internAPI = {
  getMyDocuments: () => api.get('/intern/documents'),
  submitDocument: (formData) => api.post(`/intern/documents/submit`, formData, {
    headers: { 'Content-Type': 'multipart/form-data'}
  }),
  getMyProfile: () => api.get('/intern/profile'),
  attendanceTimeIn: () => api.post(`/intern/attendance/timeIn`),
  attendanceTimeOut: () => api.put(`/intern/attendance/timeOut`),
  getMyAttendanceOverallSummary: () => api.get(`/intern/attendance/summary`),
  getMyAttendanceHistory: () => api.get(`/intern/attendance/history`),
  getMonthlyAttendanceSummary: () => api.get('/intern/attendance/monthly-summary'),
  downloadMyAttendancePdf: () => api.get('/intern/attendance/download-pdf')

};