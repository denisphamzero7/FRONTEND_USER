import { ref } from "vue";

interface Notification {
  id: string;
  message: string;
}

const notifications = ref<Notification[]>([]);

const addNotification = (message: string) => {
  const id = Date.now().toString(); 
  notifications.value.push({ id, message });

  setTimeout(() => removeNotification(id), 5000); 
};

const removeNotification = (id: string) => {
  notifications.value = notifications.value.filter(
    (notification) => notification.id !== id
  );
};

export function useNotification() {
  return {
    notifications,
    addNotification,
    removeNotification,
  };
}
