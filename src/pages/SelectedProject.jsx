import useFetch from "@/hooks/useFetch";
import React from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import ProjectCard from "@/components/ProjectCard";
import ProjectTasksTable from "@/components/ProjectTasksTable";
import { Button, Input } from "@nextui-org/react";
import { Search } from "lucide-react";

function SelectedProject() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isLoading, data, error } = useFetch(`/tasks?projectId=${id}`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found</p>;

  return (
    <div className="max-w-[1460px] m-auto">
      <div className="flex justify-between">
        <Button
          isIconOnly
          variant="flat"
          className="text-lg font-semibold"
          onClick={() => navigate(-1)}
        >
          &larr;
        </Button>
        <Input
          placeholder="Search"
          startContent={<Search size={32} />}
          type="search"
          radius="sm"
          classNames={{
            base: "max-w-full sm:max-w-[16rem] h-10",
            mainWrapper: "h-full",
            input: "text-medium",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
        />
      </div>
      <div className="grid grid-cols-3 gap-14 mt-8 items-start">
        <ProjectCard project={state} />
        <ProjectTasksTable
          projectTasks={data.tasks}
          className="col-span-2"
        />
      </div>
    </div>
  );
}

export default SelectedProject;
