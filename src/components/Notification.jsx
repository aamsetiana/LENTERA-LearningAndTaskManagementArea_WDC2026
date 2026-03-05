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
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
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
      bg: "bg-blue-500",
      border: "border-blue-600",
      icon: <Info className="h-5 w-5" />,
    },
  };

  const style = styles[notification.type] || styles.info;

  return (
    <div
      className={`${style.bg} ${style.border} border-2 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-slideInRight pointer-events-auto max-w-md`}
    >
      <div className="flex-shrink-0">{style.icon}</div>
      <p className="flex-1 font-medium">{notification.message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:opacity-75 transition-opacity"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
