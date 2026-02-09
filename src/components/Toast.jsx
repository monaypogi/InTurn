import { useEffect } from 'react';

export default function Toast({ type = 'success', message, onDismiss, durationMs = 3000 }) {
  useEffect(() => {
    if (!message || !onDismiss) {
      return undefined;
    }
    const timer = setTimeout(() => onDismiss(), durationMs);
    return () => clearTimeout(timer);
  }, [message, onDismiss, durationMs]);

  if (!message) {
    return null;
  }

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
}
