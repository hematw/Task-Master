import { Avatar } from "@nextui-org/react";
import { User2 } from "lucide-react";
import React from "react";

function User({ user }) {
  return (
    <div className="flex items-center gap-2">
      <Avatar size="sm" fallback={<User2 />} src={user.profile} radius="md" />
      <p>{user.firstName}</p>
    </div>
  );
}

export default User;
