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
  useDisclosure,
} from "@nextui-org/react";
import { ListPlus } from "lucide-react";
import { useState } from "react";
import Status from "./Status";
import EditTask from "./EditTask";

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

const renderCell = (task, columnKey) => {
  switch (columnKey) {
    case "assignee":
      return <User user={getKeyValue(task, columnKey)} />;
    case "status":
      return <Status value={getKeyValue(task, columnKey)} />;
    default:
      return getKeyValue(task, columnKey);
  }
};
let tasks = [];

function ProjectTasksTable({ projectTasks, onMoreClick, className }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

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

  console.log(selectedTask);
  return (
    <div className={`${className}`}>
      {selectedTask && (
        <EditTask
          taskId={selectedTask._id}
          title={selectedTask.title}
          assignee={selectedTask.assignee._id}
          deadline={new Date(selectedTask.deadline).toISOString().slice(0, 10)}
          description={selectedTask.description}
          status={selectedTask.status}
          isEditModalOpen={isOpen}
          onEditModalClose={() => {
            onClose();
            setSelectedTask(null);
          }}
          onEditModalOpen={onOpen}
          onEditModalOpenChange={onOpenChange}
        />
      )}
      <Table
        isStriped
        aria-label="Collection of created Tasks"
        removeWrapper
        isHeaderSticky
      >
        <TableHeader columns={columns}>
          {(col) => <TableColumn>{col.label}</TableColumn>}
        </TableHeader>
        <TableBody items={tasks} emptyContent="No Tasks to display!">
          {(task) => (
            <TableRow
              className="hover:bg-zinc-200 hover:shadow-small duration-150 cursor-pointer"
              key={task._id}
              onClick={() => {
                setSelectedTask(task);
                onOpen();
              }}
            >
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
      {/* <EditForm 
      title={}
      /> */}
    </div>
  );
}

export default ProjectTasksTable;
