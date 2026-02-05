import { useState } from 'react';
import {
  Search,
  ChevronDown,
  Eye,
  BarChart3,
  Edit3,
  Mail,
  Briefcase,
  User,
  Calendar,
  CalendarCheck,
  FileText,
  Star,
  Plus,
  RotateCcw,
  X,
} from 'lucide-react';
import Avatar from '../../components/Avatar';
import StatusBadge from '../../components/StatusBadge';
import Pagination from '../../components/Pagination';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';

const interns = [
  {
    id: 1,
    name: 'Emma Wilson',
    email: 'emma.wilson@gmail.com',
    department: 'UI/UX Designer',
    supervisor: 'Anna Lee',
    status: 'Active',
    startDate: '2026-01-01',
  },
  {
    id: 2,
    name: 'Liam Carter',
    email: 'liam.carter@gmail.com',
    department: 'Frontend Developer',
    supervisor: 'Jacob Kim',
    status: 'Active',
    startDate: '2026-01-01',
  },
  {
    id: 3,
    name: 'Mia Johnson',
    email: 'mia.johnson@gmail.com',
    department: 'QA Engineer',
    supervisor: 'Sofia Martinez',
    status: 'Inactive',
    startDate: '2026-01-01',
  },
  {
    id: 4,
    name: 'Noah Brown',
    email: 'noah.brown@gmail.com',
    department: 'Product Design',
    supervisor: 'Anna Lee',
    status: 'Active',
    startDate: '2026-01-01',
  },
  {
    id: 5,
    name: 'Olivia Green',
    email: 'olivia.green@gmail.com',
    department: 'Data Analyst',
    supervisor: 'Jacob Kim',
    status: 'Pending',
    startDate: '2026-01-01',
  },
  {
    id: 6,
    name: 'Ethan Rivera',
    email: 'ethan.rivera@gmail.com',
    department: 'Marketing',
    supervisor: 'Sofia Martinez',
    status: 'Active',
    startDate: '2026-01-01',
  },
  {
    id: 7,
    name: 'Sophia Clark',
    email: 'sophia.clark@gmail.com',
    department: 'UI/UX Designer',
    supervisor: 'Anna Lee',
    status: 'Active',
    startDate: '2026-01-01',
  },
];

const modalStatusStyles = {
  Active: 'bg-emerald-100 text-emerald-600',
  Inactive: 'bg-rose-100 text-rose-600',
  Pending: 'bg-amber-100 text-amber-600',
};

function FilterSelect({ label, value, options, onChange }) {
  return (
    <div className="flex flex-col gap-1 text-slate-900">
      <span className="text-[12px] uppercase tracking-wide text-white font-bold">{label}</span>
      <label className="relative rounded-lg border border-slate-300 bg-slate-200 px-4 py-3 transition-colors hover:bg-slate-200">
        <select
          className="w-full appearance-none rounded-md bg-transparent py-1 pl-2 pr-8 text-base font-medium text-slate-900 focus:outline-none"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option} className="bg-slate-200 pl-2 text-slate-900">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </label>
    </div>
  );
}

function ModalSelect({ label, value, options, onChange }) {
  return (
    <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
      <span>{label}</span>
      <span className="relative">
        <select
          className="appearance-none rounded-md border border-slate-300 bg-slate-100 py-0.5 pl-2 pr-6 text-xs font-semibold text-slate-700 focus:outline-none"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option} className="bg-white text-slate-700">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
      </span>
    </label>
  );
}

function InternManagement() {
  const statusOptions = ['All', 'Active', 'Pending', 'Inactive'];
  const departmentOptions = [
    'All',
    'Ui/UX Designer',
    'Frontend Developer',
    'Backend Developer',
    'Fullstack Developer',
  ];
  const modalDepartmentOptions = [
    'UI/UX Designer',
    'Frontend Developer',
    'Backend Developer',
    'Fullstack Developer',
  ];
  const supervisorOptions = ['Anna Lee', 'Jacob Kim', 'Sofia Martinez', 'Marcus Young'];
  const attendanceRecords = [
    {
      date: '2026-01-26',
      timeIn: '09:00 AM',
      timeOut: '05:00 PM',
      status: 'Present',
    },
    {
      date: '2026-01-27',
      timeIn: '09:10 AM',
      timeOut: '05:00 PM',
      status: 'Present',
    },
    {
      date: '2026-01-28',
      timeIn: '09:25 AM',
      timeOut: '05:00 PM',
      status: 'Late',
    },
    {
      date: '2026-01-29',
      timeIn: '09:00 AM',
      timeOut: '05:00 PM',
      status: 'Present',
    },
  ];
  const documentRecords = [
    { type: 'Document', file: 'Wilson_NDA.pdf', submitted: '2026-01-20', status: 'Verified' },
    { type: 'Document', file: 'Wilson_ID.pdf', submitted: '2026-01-21', status: 'Verified' },
    { type: 'Document', file: 'Wilson_MOA.pdf', submitted: '2026-01-22', status: 'Verified' },
  ];
  const [statusFilter, setStatusFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeIntern, setActiveIntern] = useState(null);
  const [isPerformanceOpen, setIsPerformanceOpen] = useState(false);
  const [performanceIntern, setPerformanceIntern] = useState(null);
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
  const [evaluationIntern, setEvaluationIntern] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState(supervisorOptions[0]);
  const [selectedDepartment, setSelectedDepartment] = useState(modalDepartmentOptions[0]);

  const filteredInterns = interns.filter((intern) => {
    const normalizedStatus = statusFilter.toLowerCase();
    const normalizedDepartment = departmentFilter.toLowerCase();
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const matchesStatus =
      normalizedStatus === 'all' || intern.status.toLowerCase() === normalizedStatus;
    const matchesDepartment =
      normalizedDepartment === 'all' ||
      intern.department.toLowerCase() === normalizedDepartment;
    const matchesSearch =
      normalizedSearch.length === 0 ||
      intern.name.toLowerCase().includes(normalizedSearch) ||
      intern.email.toLowerCase().includes(normalizedSearch);
    return matchesStatus && matchesDepartment && matchesSearch;
  });

  const handleOpenProfile = (intern) => {
    setActiveIntern(intern);
    setSelectedSupervisor(intern.supervisor || supervisorOptions[0]);
    setSelectedDepartment(intern.department || modalDepartmentOptions[0]);
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
  };

  const handleOpenPerformance = (intern) => {
    setPerformanceIntern(intern);
    setIsPerformanceOpen(true);
  };

  const handleClosePerformance = () => {
    setIsPerformanceOpen(false);
  };

  const handleOpenEvaluation = (intern) => {
    setEvaluationIntern(intern);
    setIsEvaluationOpen(true);
  };

  const handleCloseEvaluation = () => {
    setIsEvaluationOpen(false);
  };

  const handleOpenHistory = () => {
    setIsEvaluationOpen(false);
    setIsHistoryOpen(true);
  };

  const handleCloseHistory = () => {
    setIsHistoryOpen(false);
  };

  return (
    <div className="space-y-6">
      {isProfileOpen && activeIntern && (
        <Modal
          isOpen={isProfileOpen}
          overlayClassName="bg-slate-900/60 backdrop-blur-sm"
          containerClassName="px-4 py-6"
          panelClassName="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
        >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-base font-semibold text-slate-800">Intern Profile</h2>
              <button
                type="button"
                onClick={handleCloseProfile}
                className="rounded-md px-2 py-1 text-xs font-medium text-slate-400 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start">
              <div className="flex items-start gap-3">
                <Avatar
                  name={activeIntern.name}
                  size="h-11 w-11"
                  className="text-white"
                  textClassName="text-lg font-semibold"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-lg font-semibold text-slate-800">{activeIntern.name}</p>
                    <StatusBadge
                      label={activeIntern.status}
                      variant="soft"
                      toneMap={modalStatusStyles}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>{activeIntern.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Briefcase className="h-4 w-4 text-slate-400" />
                    <ModalSelect
                      label="Department:"
                      value={selectedDepartment}
                      options={modalDepartmentOptions}
                      onChange={setSelectedDepartment}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-sm text-slate-600 md:ml-8">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" />
                  <ModalSelect
                    label="Supervisor:"
                    value={selectedSupervisor}
                    options={supervisorOptions}
                    onChange={setSelectedSupervisor}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                    Started:
                  </span>
                  <span className="rounded-md border border-slate-300 bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                    {activeIntern.startDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200">
              <div className="rounded-t-xl bg-slate-600 px-4 py-2 text-xs font-semibold uppercase text-white">
                Recent Attendance
              </div>
              <div className="max-h-40 divide-y divide-slate-200 overflow-y-auto text-xs text-slate-600">
                <div className="sticky top-0 grid grid-cols-4 gap-2 bg-slate-100 px-4 py-2 font-semibold text-slate-500">
                  <span>Date</span>
                  <span>Time In</span>
                  <span>Time Out</span>
                  <span>Status</span>
                </div>
                {attendanceRecords.map((record) => (
                  <div key={`${record.date}-${record.timeIn}`} className="grid grid-cols-4 gap-2 px-4 py-2">
                    <span>{record.date}</span>
                    <span>{record.timeIn}</span>
                    <span>{record.timeOut}</span>
                    <span
                      className={`inline-flex w-fit rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        record.status === 'Late'
                          ? 'bg-amber-100 text-amber-600'
                          : 'bg-emerald-100 text-emerald-600'
                      }`}
                    >
                      {record.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200">
              <div className="rounded-t-xl bg-slate-600 px-4 py-2 text-xs font-semibold uppercase text-white">
                Document Verification
              </div>
              <div className="max-h-40 divide-y divide-slate-200 overflow-y-auto text-xs text-slate-600">
                <div className="sticky top-0 grid grid-cols-4 gap-2 bg-slate-100 px-4 py-2 font-semibold text-slate-500">
                  <span>Type</span>
                  <span>File Name</span>
                  <span>Date Submitted</span>
                  <span>Status</span>
                </div>
                {documentRecords.map((record) => (
                  <div key={record.file} className="grid grid-cols-4 gap-2 px-4 py-2">
                    <span>{record.type}</span>
                    <span>{record.file}</span>
                    <span>{record.submitted}</span>
                    <span className="inline-flex w-fit rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
                      {record.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                className="rounded-md bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                onClick={handleCloseProfile}
              >
                Save Profile
              </button>
              <button
                type="button"
                className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-100"
              >
                Inactive
              </button>
            </div>
        </Modal>
      )}

      {isPerformanceOpen && performanceIntern && (
        <Modal
          isOpen={isPerformanceOpen}
          overlayClassName="bg-slate-900/60 backdrop-blur-sm"
          containerClassName="px-4 py-6"
          panelClassName="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
        >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-lg font-semibold text-slate-800">Performance Overview</h2>
              <button
                type="button"
                onClick={handleClosePerformance}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close performance overview"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-start md:gap-10">
              <div className="flex items-start gap-4">
                <Avatar
                  name={performanceIntern.name}
                  size="h-16 w-16"
                  className="text-white"
                  textClassName="text-2xl font-semibold"
                />
                <div className="space-y-2">
                  <p className="text-2xl font-semibold text-slate-800">{performanceIntern.name}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>{performanceIntern.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Briefcase className="h-4 w-4 text-slate-400" />
                    <span>Department: {performanceIntern.department}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-600 md:pt-2 md:mt-8">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" />
                  <span>Supervisor: {performanceIntern.supervisor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span>Started: {performanceIntern.startDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-base font-semibold text-slate-700">
              Intern Performance Record
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                    <CalendarCheck className="h-4 w-4" />
                  </span>
                  Avg Attendance
                </div>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-3xl font-semibold text-slate-800">92.5</span>
                  <span className="text-sm text-slate-400">(18/20)</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="rounded-lg bg-purple-100 p-2 text-purple-600">
                    <FileText className="h-4 w-4" />
                  </span>
                  Report Submission
                </div>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-3xl font-semibold text-slate-800">92.5</span>
                  <span className="text-sm text-slate-400">(18/20)</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="rounded-lg bg-amber-100 p-2 text-amber-600">
                    <Star className="h-4 w-4" />
                  </span>
                  Avg Rating
                </div>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-3xl font-semibold text-slate-800">92.5</span>
                  <span className="text-sm text-slate-400">(18/20)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-slate-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                onClick={handleClosePerformance}
              >
                <Plus className="h-4 w-4" />
                New Evaluation
              </button>
            </div>
        </Modal>
      )}

      {isEvaluationOpen && evaluationIntern && (
        <Modal
          isOpen={isEvaluationOpen}
          overlayClassName="bg-slate-900/60 backdrop-blur-sm"
          containerClassName="px-4 py-6"
          panelClassName="w-full max-w-5xl rounded-2xl bg-white p-6 shadow-2xl min-h-[480px] max-h-[85vh] overflow-y-auto"
        >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-3">
                <Avatar
                  name={evaluationIntern.name}
                  size="h-12 w-12"
                  className="bg-slate-800 text-white"
                  textClassName="text-lg font-semibold"
                />
                <div>
                  <p className="text-base font-semibold text-slate-800">{evaluationIntern.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      {evaluationIntern.email}
                    </span>
                    <span className="flex items-center gap-2">
                      <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                      Department: {evaluationIntern.department}
                    </span>
                    <span className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      Supervisor: {evaluationIntern.supervisor}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      Started: {evaluationIntern.startDate}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseEvaluation}
                className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close evaluation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h3 className="text-base font-semibold text-slate-800">Performance Rating (Week 1)</h3>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                  onClick={handleOpenHistory}
                >
                  Evaluation History
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-md bg-slate-700 px-3 py-2 text-xs font-semibold text-white"
                >
                  <Plus className="h-3.5 w-3.5" />
                  New Evaluation
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
              <div className="space-y-5 rounded-xl border border-slate-200 p-5 text-sm text-slate-700">
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-2">
                    Evaluation Period
                    <select className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm font-semibold text-slate-700">
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </label>
                  <label className="flex items-center gap-2">
                    Select Period
                    <select className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm font-semibold text-slate-700">
                      <option>Week 1 - January 2024</option>
                      <option>Week 2 - January 2024</option>
                    </select>
                  </label>
                </div>

                <div className="space-y-4">
                  {['Technical Skills', 'Communication', 'Professionalism', 'Technical Skills', 'Technical Skills'].map(
                    (label, index) => (
                      <div key={`${label}-${index}`} className="flex items-center justify-between">
                        <span>{label}</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <span
                              key={value}
                              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                                value <= 4 ? 'bg-slate-800 text-white' : 'border border-slate-300 text-slate-500'
                              }`}
                            >
                              {value}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div>
                  <p className="font-semibold text-slate-800">Admin Comments</p>
                  <textarea
                    rows={3}
                    className="mt-2 w-full rounded-md border border-slate-300 p-3 text-sm text-slate-700"
                    placeholder="Add feedback..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Save Evaluation
                  </button>
                </div>
              </div>

              <div className="space-y-5 text-sm text-slate-700">
                <div className="rounded-xl border border-slate-200 p-5 text-center">
                  <p className="text-sm font-semibold text-slate-500">Overall Average Rating</p>
                  <div className="mt-2 text-3xl font-semibold text-slate-800">4.2</div>
                  <div className="mt-1 flex justify-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-5 w-5" />
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                    <p className="text-sm font-semibold text-emerald-700">Days of Present</p>
                    <p className="mt-1 text-xl font-semibold text-emerald-700">18</p>
                    <p className="text-xs text-emerald-600">Out of 20 days</p>
                  </div>
                  <div className="rounded-xl border border-rose-200 bg-rose-50 p-3">
                    <p className="text-sm font-semibold text-rose-700">Days of Absence</p>
                    <p className="mt-1 text-xl font-semibold text-rose-700">2</p>
                    <p className="text-xs text-rose-600">Out of 20 days</p>
                  </div>
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                    <p className="text-sm font-semibold text-amber-700">Tardiness</p>
                    <p className="mt-1 text-xl font-semibold text-amber-700">3</p>
                    <p className="text-xs text-amber-600">Late occurrences</p>
                  </div>
                  <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-3">
                    <p className="text-sm font-semibold text-indigo-700">On-Time Task</p>
                    <p className="mt-1 text-xl font-semibold text-indigo-700">92%</p>
                    <p className="text-xs text-indigo-600">On schedule</p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-5 text-sm text-slate-600">
                  <p className="font-semibold text-slate-700">Task Submission Details</p>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      On-Time
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                      Late Submission
                    </li>
                  </ul>
                  <div className="mt-3 h-1 rounded-full bg-slate-200">
                    <div className="h-1 w-3/4 rounded-full bg-emerald-500" />
                  </div>
                  <div className="mt-1 h-1 rounded-full bg-slate-200">
                    <div className="h-1 w-1/4 rounded-full bg-amber-500" />
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-5 text-sm text-slate-600">
                  <p className="font-semibold text-slate-700">Recent Activity</p>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Completed task: Frontend Dashboard
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                      Arrived late (15 minutes)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Submitted API Documentation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        </Modal>
      )}

      {isHistoryOpen && (
        <Modal
          isOpen={isHistoryOpen}
          overlayClassName="bg-slate-900/60 backdrop-blur-sm"
          containerClassName="px-4 py-6"
          panelClassName="w-full max-w-5xl rounded-2xl bg-white p-6 shadow-2xl"
        >
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-lg font-semibold text-slate-800">Evaluation History</h2>
              <button
                type="button"
                onClick={handleCloseHistory}
                className="rounded-full border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-100"
                aria-label="Close evaluation history"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
              <div className="grid grid-cols-5 gap-2 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-500">
                <span>Period</span>
                <span>Type</span>
                <span>Average Rating</span>
                <span>Evaluator</span>
                <span>Comments</span>
              </div>
              <div className="max-h-80 divide-y divide-slate-200 overflow-y-auto text-sm text-slate-600">
                {[
                  { period: 'Week 1 - January 2024', type: 'Weekly' },
                  { period: 'Week 2 - January 2024', type: 'Weekly' },
                  { period: 'Week 3 - January 2024', type: 'Weekly' },
                  { period: 'Week 4 - January 2024', type: 'Weekly' },
                  { period: 'January 2024', type: 'Monthly' },
                  { period: 'Week 1 - February 2024', type: 'Weekly' },
                  { period: 'Week 2 - February 2024', type: 'Weekly' },
                ].map((row) => (
                  <div key={row.period} className="grid grid-cols-5 gap-2 px-4 py-3">
                    <span>{row.period}</span>
                    <span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          row.type === 'Weekly'
                            ? 'bg-purple-100 text-purple-600'
                            : 'bg-sky-100 text-sky-600'
                        }`}
                      >
                        {row.type}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-700">
                      4.2
                      <span className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={index} className="h-4 w-4" />
                        ))}
                      </span>
                    </span>
                    <span>Juan Delacruz</span>
                    <button type="button" className="text-sm font-semibold text-indigo-500 hover:underline">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
        </Modal>
      )}

      <section>
        <h1 className="text-2xl font-semibold text-white">Intern Management</h1>
        <p className="mt-1 text-slate-400">Add and manage intern profiles</p>
      </section>

      <div className="rounded-xl border border-slate-600 bg-slate-800 p-6 space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex flex-1 flex-col gap-1">
            <span className="select-none text-[11px] uppercase tracking-wide text-transparent" aria-hidden="true">
              Search
            </span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="w-full rounded-lg border border-slate-300 bg-slate-200 py-3 pl-11 pr-4 text-slate-900 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
            <FilterSelect
              label="Status"
              value={statusFilter}
              options={statusOptions}
              onChange={setStatusFilter}
            />
            <FilterSelect
              label="Department"
              value={departmentFilter}
              options={departmentOptions}
              onChange={setDepartmentFilter}
            />
          </div>
        </div>
      </div>

      <DataTable
        footer={
          <Pagination
            currentPage={1}
            totalPages={100}
            variant="amber"
            className="border-t border-slate-700 bg-slate-800 px-6 py-4 text-sm text-slate-400 md:gap-4"
          />
        }
      >
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-700/60">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Supervisor</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Start Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700 text-sm text-slate-200">
            {filteredInterns.map((intern) => (
              <tr key={intern.id} className="hover:bg-slate-700/60">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={intern.name} size="h-10 w-10" textClassName="text-base font-semibold" />
                    <div>
                      <p className="font-medium text-white">{intern.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{intern.email}</td>
                <td className="px-6 py-4">{intern.department}</td>
                <td className="px-6 py-4">{intern.supervisor}</td>
                <td className="px-6 py-4">
                  <StatusBadge label={intern.status} />
                </td>
                <td className="px-6 py-4">{intern.startDate}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      className="rounded-lg bg-slate-700 p-2 text-slate-200 transition-colors hover:bg-slate-600"
                      aria-label="View"
                      onClick={() => handleOpenProfile(intern)}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg bg-slate-700 p-2 text-slate-200 transition-colors hover:bg-slate-600"
                      aria-label="Performance"
                      onClick={() => handleOpenPerformance(intern)}
                    >
                      <BarChart3 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg bg-slate-700 p-2 text-slate-200 transition-colors hover:bg-slate-600"
                      aria-label="Edit"
                      onClick={() => handleOpenEvaluation(intern)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}

export default InternManagement;
