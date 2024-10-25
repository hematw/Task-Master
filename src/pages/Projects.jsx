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
    key: "tasksNum",
    label: "TASKS",
  },
  {
    key: "inProgressNum",
    label: "IN PROGRESS",
  },
  {
    key: "completedNum",
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

function Projects() {
  let {
    data: { projects },
  } = useFetch("/projects");

  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  if (projects) {
    projects = projects.map((project) => ({
      ...project,
      deadline: new Date(project.deadline).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      tasksNum: project.tasks.length,
      inProgressNum: project.tasks.filter((t) => t.status === "in-progress")
        .length,
      completedNum: project.tasks.filter((t) => t.status === "completed")
        .length,
    }));
    console.log(projects);
  }

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

  return (
    <div>
      {isOpen && (
        <AddForm isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
      )}
      <div className="max-w-7xl m-auto">
        <Table isStriped aria-label="Collection of created Projects">
          <TableHeader columns={columns}>
            {(col) => <TableColumn>{col.label}</TableColumn>}
          </TableHeader>
          <TableBody
            items={projects || []}
            emptyContent="No Projects to display!"
          >
            {(project) => (
              <TableRow key={project._id}>
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
