import AddForm from "@/components/AddForm";
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
    console.log(Object.keys(projects));
  }

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
                  <TableCell>{getKeyValue(project, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Divider className="mt-8"/>
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
