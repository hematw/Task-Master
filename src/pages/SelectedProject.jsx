import useFetch from "@/hooks/useFetch";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectCard from "@/components/ProjectCard";
import ProjectTasksTable from "@/components/ProjectTasksTable";
import { Button } from "@nextui-org/react";

function SelectedProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, error } = useFetch(`/projects/${id}`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found</p>;

  return (
    <div className="max-w-[1460px] m-auto">
      <div>
        <Button
          isIconOnly
          variant="flat"
          className="text-lg font-semibold"
          onClick={() => navigate(-1)}
        >
          &larr;
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-14 mt-8">
        <ProjectCard project={data.project} />
        <ProjectTasksTable
          projectTasks={data.project.tasks}
          className="col-span-2"
        />
      </div>
    </div>
  );
}

export default SelectedProject;
