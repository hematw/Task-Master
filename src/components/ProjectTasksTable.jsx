import User from "@/components/User";
import {
  Button,
  Chip,
  Divider,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ListPlus } from "lucide-react";

const columns = [
  {
    key: "_id",
    label: "TICKET NO",
  },
  {
    key: "title",
    label: "TASK TITLE",
  },
  {
    key: "assignee",
    label: "ASSIGNEE",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "deadline",
    label: "DEADLINE",
  },
];

const statusColors = {
  "not-started": "default",
  "in-progress": "primary",
  paused: "danger",
  completed: "success",
  activated: "warning",
};

const renderCell = (task, columnKey) => {
  switch (columnKey) {
    case "assignee":
      return <User user={getKeyValue(task, columnKey)} />;
    case "status":
      return (
        <Chip
          color={statusColors[getKeyValue(task, columnKey)]}
          variant="flat"
          radius="md"
          className="min-w-full inline-flex p-1.5 h-auto"
        >
          &#x25cf; {getKeyValue(task, columnKey)}
        </Chip>
      );
    default:
      return getKeyValue(task, columnKey);
  }
};
let tasks = [];

function ProjectTasksTable({ projectTasks, onMoreClick, className }) {
  if (projectTasks) {
    tasks = projectTasks.map((task) => ({
      ...task,
      deadline: new Date(task.deadline).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }));
  }

  return (
    <div className={`${className}`}>
      <Table isStriped aria-label="Collection of created Tasks" removeWrapper>
        <TableHeader columns={columns}>
          {(col) => <TableColumn>{col.label}</TableColumn>}
        </TableHeader>
        <TableBody items={tasks} emptyContent="No Tasks to display!">
          {(task) => (
            <TableRow key={task._id}>
              {(columnKey) => (
                <TableCell>{renderCell(task, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Divider className="mt-8" />
      <div className="flex justify-center">
        <Button
          color="light"
          variant="ghost"
          radius="sm"
          endContent={<ListPlus />}
          className="hover:bg-black hover:text-white mt-6 border-2 border-black"
          onClick={onMoreClick}
        >
          More
        </Button>
      </div>
    </div>
  );
}

export default ProjectTasksTable;
