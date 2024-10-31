import AddForm from "@/components/AddForm";
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
import { ListPlus, Plus } from "lucide-react";
import { Mosaic } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    key: "id",
    label: "TICKET NO",
  },
  {
    key: "task",
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

function ProjectTasksTable({ projectTasks, className }) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  let tasks = [];
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

  console.log(projectTasks);
  // if(!projectTasks.length){
  //   return <p>No task</p>
  // }

  const renderCell = (task, columnKey) => {
    switch (columnKey) {
      case "assignee":
        return <User user={getKeyValue(task, columnKey)} />;
      case "status":
        return (
          <Chip color="danger" variant="flat">
            good
          </Chip>
        );
      default:
        return getKeyValue(task, columnKey);
    }
  };

  return (
    <div className={`${className}`}>
      <Table isStriped aria-label="Collection of created Tasks" removeWrapper>
        <TableHeader columns={columns}>
          {(col) => <TableColumn>{col.label}</TableColumn>}
        </TableHeader>
        <TableBody items={tasks} emptyContent="No Tasks to display!">
          {(task) => (
            <TableRow
              key={task._id}
              className="cursor-pointer hover:bg-zinc-200 transition-all duration-200"
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
        >
          More
        </Button>
      </div>
    </div>
  );
}

export default ProjectTasksTable;
