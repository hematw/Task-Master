import AddForm from "@/components/AddForm";
import User from "@/components/User";
import ProjectProgress from "@/components/ProjectProgress";
import useFetch from "@/hooks/useFetch";
import {
  Button,
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
import { toast } from "react-toastify";

const columns = [
  {
    key: "title",
    label: "TITLE",
  },
  {
    key: "manager",
    label: "MANAGER",
  },
  {
    key: "allTasks",
    label: "TASKS",
  },
  {
    key: "inProgressTasks",
    label: "IN PROGRESS",
  },
  {
    key: "completedTasks",
    label: "COMPLETED",
  },
  {
    key: "progress",
    label: "PROGRESS",
  },
  {
    key: "deadline",
    label: "DEADLINE",
  },
];

const renderCell = (project, columnKey) => {
  switch (columnKey) {
    case "manager":
      return <User user={getKeyValue(project, columnKey)} />;
    case "progress":
      return <ProjectProgress project={project} />;
    default:
      return getKeyValue(project, columnKey);
  }
};

function Projects() {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  let { data, isLoading, error } = useFetch("/projects");

  if (isLoading) {
    return (
      <div className="max-w-5xl m-auto flex items-center justify-center">
        <Mosaic color="#222" size="large" text="Getting data" textColor="" />
      </div>
    );
  }

  let projects = data?.projects ?? [];

  if (projects) {
    projects = projects.map((project) => ({
      ...project,
      deadline: new Date(project.deadline).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }));
  }

  return (
    <div>
      {isOpen && (
        <AddForm
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          firstInputName={"title"}
          secInputName={"description"}
          selectElName={"manager"}
          dateElName={"deadline"}
          submitUrl={"/projects"}
          title="New Project"
        />
      )}
      <div className="max-w-7xl m-auto">
        <Table
          isStriped
          aria-label="Collection of created Projects"
        >
          <TableHeader columns={columns}>
            {(col) => <TableColumn>{col.label}</TableColumn>}
          </TableHeader>
          <TableBody
            items={projects || []}
            emptyContent="No Projects to display!"
          >
            {(project) => (
              <TableRow
                key={project._id}
                onClick={() => navigate(project._id, { state: project })}
                className="cursor-pointer hover:bg-zinc-200 transition-all duration-200"
              >
                {(columnKey) => (
                  <TableCell>{renderCell(project, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Divider className="mt-8" />
        <div className="flex justify-between">
          <Button
            startContent={<Plus />}
            color="light"
            variant="ghost"
            radius="sm"
            className="hover:bg-black hover:text-white mt-6 border-2 border-black"
            onClick={onOpen}
          >
            New Project
          </Button>
          <Button
            color="light"
            variant="ghost"
            radius="sm"
            endContent={<ListPlus />}
            className="hover:bg-black hover:text-white mt-6 border-2 border-black"
            // onClick={}
          >
            More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Projects;
