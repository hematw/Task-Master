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
import { useEffect, useRef, useState } from "react";
import axiosIns from "@/axios";

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
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [needFetch, setNeedFetch] = useState(false);

  const handlePagination = () => {
    setPage((prevPage) => (prevPage < totalPages ? ++prevPage : 1));
  };

  useEffect(() => {
    setIsLoading(true);
    const getProjects = async () => {
      try {
        const { data } = await axiosIns.get(`/projects`, {
          params: {
            page,
          },
        });

        setTotalPages(data.totalPages);
        setProjects(
          data.projects.map((project) => ({
            ...project,
            deadline: new Date(project.deadline).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
          }))
        );
      } catch (error) {
        console.error(error);
        toast.error(
          error.message || "Something went wron please try again later"
        );
      } finally {
        setIsLoading(false);
        setNeedFetch(false);
      }
    };
    getProjects();
  }, [page, needFetch]);

  if (isLoading) {
    return (
      <div className="max-w-5xl m-auto flex items-center justify-center">
        <Mosaic color="#222" size="large" text="Getting data" textColor="" />
      </div>
    );
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
          onSubmitSuccess={() => setNeedFetch(true)}
        />
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
              <TableRow
                key={project._id}
                onClick={() => navigate(project._id, { state: project })}
                className="hover:bg-zinc-200 hover:shadow-inner duration-150 cursor-pointer"
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
            onClick={handlePagination}
          >
            More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Projects;
