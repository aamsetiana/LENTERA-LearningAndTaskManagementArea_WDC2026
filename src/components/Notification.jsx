import { useEffect, useState } from "react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

/**
 * Toast Notification Component
 * Tipe: success, error, warning, info
 */
export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const notify = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications((prev) => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, duration);
    }

    return id;
  };

  const remove = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return { notifications, notify, remove };
};

export function NotificationContainer({ notifications, onRemove }) {
  return (
    // DI SINI KUNCINYA: top-28 bikin posisinya turun aman di bawah Navbar,
    // left-1/2 dan -translate-x-1/2 bikin dia pas presisi di tengah layar horizontal.
    <div className="fixed top-28 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-3 w-full max-w-md px-4 pointer-events-none">
      {notifications.map((notif) => (
        <Toast
          key={notif.id}
          notification={notif}
          onClose={() => onRemove(notif.id)}
        />
      ))}
    </div>
  );
}

function Toast({ notification, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: {
      bg: "bg-emerald-500",
      border: "border-emerald-600",
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
    error: {
      bg: "bg-red-500",
      border: "border-red-600",
      icon: <AlertCircle className="h-5 w-5" />,
    },
    warning: {
      bg: "bg-amber-500",
      border: "border-amber-600",
      icon: <AlertCircle className="h-5 w-5" />,
    },
    info: {
      bg: "bg-[#362A1F]",
      border: "border-[#1A140F]",
      icon: <Info className="h-5 w-5 text-[#F9A826]" />,
    },
  };

  const style = styles[notification.type] || styles.info;

  return (
    <div
      className={`${style.bg} ${style.border} border-2 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-[fadeScale_0.3s_ease-out] pointer-events-auto w-full`}
    >
      <div className="flex-shrink-0">{style.icon}</div>
      <p className="flex-1 font-bold text-sm tracking-wide">
        {notification.message}
      </p>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:opacity-75 transition-opacity bg-white/10 p-1.5 rounded-full"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
