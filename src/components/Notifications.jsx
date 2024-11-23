import React from "react";
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, Button } from "@nextui-org/react";
import axiosIns from "@/axios";
import { Badge, Bell } from "lucide-react";
import { useState, useEffect } from "react";

const notifications = [
    {
        id: 1,
        title: "Status Change",
        description: "Mohib changed the status for ticket no 9837 from Not Started to In Progress",
    },
    {
        id: 2,
        title: "Deadline Change",
        description: "Mohib changed the status for ticket no 9837 from Not Started to In Progress",
    },
    {
        id: 3,
        title: "Title Change",
        description: "Mohib changed the status for ticket no 9837 from Not Started to In Progress",
    },
    {
        id: 4,
        title: "Notification Title",
        description: "Mohib changed the status for ticket no 9837 from Not Started to In Progress",
    },
    {
        id: 5,
        title: "Notification Title",
        description: "Mohib changed the status for ticket no 9837 from Not Started to In Progress",
    },
];

function Notifications() {
    // const [notifications, setNotifications] = useState([])

    useEffect(() => {
        const getNotifications = async () => {
            try {
                const { data } = await axiosIns.get("/notifications")
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }
        getNotifications()
    })

    return (
        <Dropdown className="relative">
            <DropdownTrigger>
                <Button isIconOnly radius="sm" className="bg-black text-white">
                    <Badge content="4" shape="rectangle" color="danger">
                        <Bell />
                        open
                    </Badge>
                </Button>
            </DropdownTrigger>
            <DropdownMenu from className="max-w-md w-[400px] mx-auto bg-white shadow-md rounded-lg p-4 absolute">
                {notifications.map((notification) => (
                    <DropdownItem
                        key={notification.id}
                    ><div className="flex items-start gap-4 p-3 border-b last:border-none">
                            <div className="flex-shrink-0">
                                <div className="bg-black text-white p-2 rounded-lg">
                                    <Bell size={20} />
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold">{notification.title}</h4>
                                <p className="text-gray-600 text-sm">{notification.description}</p>
                            </div>
                        </div>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}

export default Notifications