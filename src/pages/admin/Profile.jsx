import { useRef, useState } from 'react';
import { User, Mail, Phone, Briefcase, Hash, Calendar, Lock, ShieldCheck, Eye, EyeOff, X } from 'lucide-react';
import Modal from '../../components/Modal';

const PROFILE_DATA = {
  firstName: 'Anna',
  lastName: 'Bautista',
  email: 'anna.bautista@gmail.com',
  phone: '+63 917 654 3210',
  department: 'UI/UX Designer',
  role: 'Supervisor',
  employeeId: 'EMP-2026-001',
  joinDate: '01/01/2026',
};

const tabs = ['General', 'Security'];

function Profile() {
  const [activeTab, setActiveTab] = useState('General');

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-white">My Profile</h1>
        <p className="text-slate-400">Manage your account settings and preferences</p>
      </header>

      <div className="rounded-full bg-slate-800 p-1 flex items-center gap-2 w-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-full px-6 py-2 text-sm font-semibold text-center transition-colors ${
                isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-300 hover:text-white'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {activeTab === 'General' ? <ProfileGeneral /> : <ProfileSecurity />}
    </div>
  );
}

function ProfileGeneral() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: PROFILE_DATA.firstName,
    lastName: PROFILE_DATA.lastName,
    email: PROFILE_DATA.email,
    phone: PROFILE_DATA.phone,
  });
  const handleCancel = () => {
    setProfile({
      firstName: PROFILE_DATA.firstName,
      lastName: PROFILE_DATA.lastName,
      email: PROFILE_DATA.email,
      phone: PROFILE_DATA.phone,
    });
    setIsEditing(false);
  };
  const handleEditToggle = () => {
    if (isEditing) {
      setIsEditing(false);
      return;
    }
    setIsEditing(true);
  };

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-800/70 p-6 space-y-6">
      <header>
        <h2 className="text-lg font-semibold text-white">Profile Information</h2>
        <p className="text-sm text-slate-400">Update your personal information and profile picture</p>
      </header>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-white">
            AB
          </div>
          <div>
            <p className="text-white font-semibold">Anna Bautista</p>
            <p className="text-xs text-slate-400">Supervisor</p>
            <div className="mt-1 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-slate-700 px-2 py-0.5 text-slate-200">Admin</span>
              <span className="rounded-full bg-slate-700 px-2 py-0.5 text-slate-200">UI/UX Designer</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ProfileField
          label="First Name"
          icon={<User className="h-4 w-4" />}
          value={profile.firstName}
          isEditable={isEditing}
          onChange={(event) => setProfile((prev) => ({ ...prev, firstName: event.target.value }))}
        />
        <ProfileField
          label="Last Name"
          icon={<User className="h-4 w-4" />}
          value={profile.lastName}
          isEditable={isEditing}
          onChange={(event) => setProfile((prev) => ({ ...prev, lastName: event.target.value }))}
        />
        <ProfileField
          label="Email Address"
          icon={<Mail className="h-4 w-4" />}
          value={profile.email}
          isEditable={isEditing}
          onChange={(event) => setProfile((prev) => ({ ...prev, email: event.target.value }))}
        />
        <ProfileField
          label="Phone Number"
          icon={<Phone className="h-4 w-4" />}
          value={profile.phone}
          isEditable={isEditing}
          onChange={(event) => setProfile((prev) => ({ ...prev, phone: event.target.value }))}
        />
        <ProfileField label="Department" icon={<Briefcase className="h-4 w-4" />} value={PROFILE_DATA.department} />
        <ProfileField label="Role" icon={<ShieldCheck className="h-4 w-4" />} value={PROFILE_DATA.role} />
        <ProfileField label="Employee ID" icon={<Hash className="h-4 w-4" />} value={PROFILE_DATA.employeeId} />
        <ProfileField label="Join Date" icon={<Calendar className="h-4 w-4" />} value={PROFILE_DATA.joinDate} />
      </div>

      <div className="flex justify-end gap-3">
        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-700"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={handleEditToggle}
          className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600"
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>
    </section>
  );
}

function ProfileField({ label, icon, value, isEditable = false, onChange }) {
  const fieldClass = isEditable
    ? 'border-teal-400/70 bg-slate-600/70 ring-1 ring-teal-400/40'
    : 'border-slate-700 bg-slate-700/70';

  return (
    <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
      {label}
      <div className={`mt-2 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-slate-100 ${fieldClass}`}>
        <span className="text-slate-300">{icon}</span>
        <input
          type="text"
          value={value}
          readOnly={!isEditable}
          onChange={onChange}
          className="w-full bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none"
        />
      </div>
    </label>
  );
}

function ProfileSecurity() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isSessionsOpen, setIsSessionsOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [emailValue, setEmailValue] = useState('');
  const [mobileValue, setMobileValue] = useState('');
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(''));
  const codeInputRefs = useRef([]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsVerifyOpen(false);
    setIsSessionsOpen(false);
    setConfirmAction(null);
    setSelectedOption(null);
    setEmailValue('');
    setMobileValue('');
    setVerificationCode(Array(6).fill(''));
  };
  const handleContinue = () => {
    if (!selectedOption) {
      return;
    }
    setIsModalOpen(false);
    setIsVerifyOpen(true);
  };
  const handleBackToSelection = () => {
    setIsVerifyOpen(false);
    setIsModalOpen(true);
    setVerificationCode(Array(6).fill(''));
  };
  const handleCodeChange = (index, value) => {
    const nextValue = value.replace(/\D/g, '').slice(-1);
    setVerificationCode((prev) => {
      const updated = [...prev];
      updated[index] = nextValue;
      return updated;
    });
    if (nextValue && index < codeInputRefs.current.length - 1) {
      codeInputRefs.current[index + 1]?.focus();
    }
  };
  const handleCodeKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !verificationCode[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };
  const handleCodePaste = (event) => {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, verificationCode.length);
    if (!pasted) {
      return;
    }
    event.preventDefault();
    const nextValues = Array(verificationCode.length).fill('');
    pasted.split('').forEach((digit, idx) => {
      nextValues[idx] = digit;
    });
    setVerificationCode(nextValues);
    const nextIndex = Math.min(pasted.length, verificationCode.length - 1);
    codeInputRefs.current[nextIndex]?.focus();
  };
  const handleCloseSessions = () => {
    setIsSessionsOpen(false);
  };
  const handleConfirm = () => {
    setConfirmAction(null);
    setIsSessionsOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-700 bg-slate-800/70 p-6 space-y-4">
          <header>
            <h2 className="text-lg font-semibold text-white">Change Password</h2>
            <p className="text-sm text-slate-400">Update your password to keep your account secure</p>
          </header>
          <div className="space-y-4">
            <PasswordField label="Current Password" placeholder="Enter current password" />
            <PasswordField label="New Password" placeholder="Enter new password" />
            <PasswordField label="Confirm Password" placeholder="Confirm new password" />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600"
            >
              Update Password
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-800/70 p-6 space-y-6">
          <header>
            <h2 className="text-lg font-semibold text-white">Security Settings</h2>
            <p className="text-sm text-slate-400">Additional security options for your account</p>
          </header>
          <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-700/60 p-4">
            <div>
              <p className="text-sm font-semibold text-white">Two-Factor Authentication</p>
              <p className="text-xs text-slate-300">Add an extra layer of security to your account</p>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-teal-500 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-600"
            >
              Enable
            </button>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-700/60 p-4">
            <div>
              <p className="text-sm font-semibold text-white">Active Sessions</p>
              <p className="text-xs text-slate-300">Manage devices that are currently logged in</p>
            </div>
            <button
              type="button"
              onClick={() => setIsSessionsOpen(true)}
              className="rounded-lg bg-slate-600 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-500"
            >
              View Sessions
            </button>
          </div>
        </section>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          overlayClassName="bg-slate-900/80"
          panelClassName="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Two-Factor Authentication</h3>
              <p className="text-sm text-slate-600">
                Choose how you&apos;d like to receive verification codes to secure your account.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCloseModal}
              className="rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <button
              type="button"
              onClick={() => setSelectedOption('email')}
              className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                selectedOption === 'email'
                  ? 'border-teal-400 bg-teal-50'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1 flex h-4 w-4 items-center justify-center rounded border ${
                    selectedOption === 'email' ? 'border-teal-400 bg-teal-500' : 'border-slate-300'
                  }`}
                >
                  {selectedOption === 'email' && <span className="h-2 w-2 rounded-sm bg-white" />}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <p className="text-base font-semibold text-slate-900">Email Address</p>
                  </div>
                  <p className="text-sm text-slate-600">Receive verification codes via email.</p>
                  {selectedOption === 'email' && (
                    <input
                      type="email"
                      value={emailValue}
                      onChange={(event) => setEmailValue(event.target.value)}
                      placeholder="Enter your email address"
                      className="mt-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                    />
                  )}
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedOption('mobile')}
              className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                selectedOption === 'mobile'
                  ? 'border-teal-400 bg-teal-50'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1 flex h-4 w-4 items-center justify-center rounded border ${
                    selectedOption === 'mobile' ? 'border-teal-400 bg-teal-500' : 'border-slate-300'
                  }`}
                >
                  {selectedOption === 'mobile' && <span className="h-2 w-2 rounded-sm bg-white" />}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <p className="text-base font-semibold text-slate-900">Mobile Number</p>
                  </div>
                  <p className="text-sm text-slate-600">Receive verification codes via SMS.</p>
                  {selectedOption === 'mobile' && (
                    <input
                      type="tel"
                      value={mobileValue}
                      onChange={(event) => setMobileValue(event.target.value)}
                      placeholder="Enter your mobile number"
                      className="mt-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                    />
                  )}
                </div>
              </div>
            </button>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCloseModal}
              className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleContinue}
              className="rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-600"
            >
              Continue
            </button>
          </div>
        </Modal>
      )}

      {isVerifyOpen && (
        <Modal
          isOpen={isVerifyOpen}
          overlayClassName="bg-slate-900/80"
          panelClassName="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-xl"
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              {selectedOption === 'mobile' ? 'Check your mobile number for a code' : 'Check your email for a code'}
            </h3>
            <p className="text-sm text-slate-600">
              We&apos;ve sent a 6-character code to{' '}
              <span className="font-semibold text-slate-700">
                {selectedOption === 'mobile'
                  ? mobileValue || '+63 917 654 3210'
                  : emailValue || 'anna.bautista@gmail.com'}
              </span>
              .
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(event) => handleCodeChange(index, event.target.value)}
                onKeyDown={(event) => handleCodeKeyDown(index, event)}
                onPaste={handleCodePaste}
                ref={(el) => {
                  codeInputRefs.current[index] = el;
                }}
                className="h-12 w-12 rounded-lg border border-slate-300 bg-slate-100 text-center text-base font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between text-sm text-slate-500">
            <button type="button" onClick={handleBackToSelection} className="font-semibold text-slate-600 hover:text-slate-900">
              &larr; Back
            </button>
            <div className="flex items-center gap-3">
              <button type="button" className="font-semibold text-slate-600 hover:text-slate-900">
                Resend Code
              </button>
              <button
                type="button"
                className="rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-600"
              >
                Confirm Code
              </button>
            </div>
          </div>
        </Modal>
      )}

      {isSessionsOpen && (
        <Modal
          isOpen={isSessionsOpen}
          overlayClassName="bg-slate-900/80"
          panelClassName="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Active Sessions</h3>
              <p className="text-sm text-slate-600">
                Manage devices that are currently logged in. If you see an unfamiliar device, log it out immediately.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCloseSessions}
              className="rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {[
              {
                id: 'macbook',
                name: 'MacBook Pro',
                browser: 'Chrome on macOS',
                location: 'Manila, PH • 192.168.1.100',
                activity: 'Active now',
                isCurrent: true,
              },
              {
                id: 'iphone',
                name: 'iPhone 14 Pro',
                browser: 'Safari on iOS',
                location: 'Manila, PH • 192.168.1.101',
                activity: '3 hours ago',
              },
              {
                id: 'windows',
                name: 'Windows PC',
                browser: 'Edge on Windows',
                location: 'Manila, PH • 192.168.0.25',
                activity: '1 day ago',
              },
            ].map((session) => (
              <div key={session.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{session.name}</p>
                    <p className="text-xs text-slate-500">{session.browser}</p>
                    <div className="mt-2 flex flex-col gap-1 text-xs text-slate-500">
                      <span>{session.location}</span>
                      <span>{session.activity}</span>
                    </div>
                  </div>
                  {session.isCurrent ? (
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Current Device
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmAction({ type: 'logout', label: session.name })}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                    >
                      Log Out
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={() => setConfirmAction({ type: 'logoutAll', label: 'all sessions' })}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
            >
              Log Out All Other Sessions
            </button>
          </div>
        </Modal>
      )}

      {confirmAction && (
        <Modal
          isOpen={!!confirmAction}
          overlayClassName="bg-slate-900/70"
          containerClassName="px-4 z-[60]"
          panelClassName="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xl"
        >
          <h4 className="text-base font-semibold text-slate-900">Confirm Logout</h4>
          <p className="mt-2 text-sm text-slate-600">
            {confirmAction.type === 'logout'
              ? 'This device will be logged out immediately. You will need to login again to access your account on this device.'
              : 'This will log out all devices except your current one. You will need to log in again on those devices.'}
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setConfirmAction(null)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
            >
              Confirm
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

function PasswordField({ label, placeholder }) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
      {label}
      <div className="mt-2 flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-700/70 px-3 py-2 text-sm text-slate-100">
        <Lock className="h-4 w-4 text-slate-300" />
        <input
          type={isVisible ? 'text' : 'password'}
          placeholder={placeholder}
          className="w-full bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="text-teal-300 hover:text-teal-200"
          aria-label={isVisible ? 'Hide password' : 'See password'}
        >
          {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </label>
  );
}

export default Profile;
