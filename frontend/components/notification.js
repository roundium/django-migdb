import { notification } from "antd";

const openNotification = (title, description, icon, onClose) => {
  notification.open({
    message: title,
    description: description,
    icon: icon,
    onClose: onClose,
  });
};

export default openNotification;
