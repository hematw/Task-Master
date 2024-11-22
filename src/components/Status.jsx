import { Chip, getKeyValue } from "@nextui-org/react";
import React from "react";

const statusColors = {
  "not-started": "default",
  "in-progress": "primary",
  paused: "danger",
  completed: "success",
  activated: "warning",
};

function Status({value}) {
  return (
    <Chip
      color={statusColors[value]}
      variant="flat"
      radius="md"
      className="min-w-full inline-flex p-1.5 h-auto capitalize"
    >
      &#x25cf; {value}
    </Chip>
  );
}

export default Status;
