import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  Button,
} from "@nextui-org/react";
import axiosIns from "@/axios";
import { Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const unread = notifications.filter((notification) => notification.unread);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const { data } = await axiosIns.get("/notifications");
        setNotifications(data.notifications);
      } catch (error) {
        console.error(error);
      }
    };
    getNotifications();
  }, []);

  const handleReadNotification = async (id) => {
    setNotifications((prev) =>
      prev.map((notify) =>
        id === notify._id ? { ...notify, unread: false } : notify
      )
    );
    try {
      const { data } = await axiosIns.post(`/notifications/${id}`);
      console.log(data);
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <Dropdown className="relative">
      <DropdownTrigger className="z-0 text-sm">
        <Button isIconOnly radius="sm" className="bg-black text-white">
          {!!unread.length && (
            <span className="block w-4 h-4 text-xs bg-red-500 rounded-full absolute top-0 right-0 z-100">
              {unread.length}
            </span>
          )}
          <Bell />
        </Button>
      </DropdownTrigger>
      <DropdownMenu className="max-w-md w-[430px] mx-auto max-h-[600px] overflow-auto bg-white shadow-xl rounded-xl p-4 absolute top-0 right-0 border-2 border-black scroll">
        {notifications.map((notification) => (
          <DropdownItem
            key={notification._id}
            textValue={notification.title}
            className={`border my-1 overflow-auto shadow-md ${
              !notification.unread && "bg-gray-200"
            }`}
            onClick={() => handleReadNotification(notification._id)}
          >
            <div className="flex items-center gap-4 p-2 border-b last:border-none">
              <div className="flex-shrink-0">
                <div
                  className={`${
                    notification.unread ? "bg-black" : "bg-gray-400"
                  } text-white p-2 rounded-lg`}
                >
                  <Bell size={20} />
                </div>
              </div>
              <div>
                <h4 className="font-semibold">{notification.title}</h4>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {notification.message}
                </p>
              </div>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default Notifications;
