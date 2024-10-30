import { Button, Card, Skeleton, useDisclosure } from "@nextui-org/react";
import { Album, CircleCheck, CircleMinus, Clock, Plus } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import AddForm from "@/components/AddForm";
import useFetch from "@/hooks/useFetch";
import { Mosaic } from "react-loading-indicators";

function Home() {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const {
    isLoading,
    error,
    data: { projects },
  } = useFetch("/projects");
  
    console.log(projects)

  if (isLoading) {
    return (
      <div className="max-w-5xl m-auto flex items-center justify-center">
        <Mosaic color="#222" size="large" text="Getting data" textColor="" />
      </div>
    );
  }
  
  if (error) {
    return <p>{error.message}</p>;
  }

  let completed = 0;
  let inProgress = 0;
  let notStarted = 0;
  projects.forEach((p) => {
    if (p.status === "completed") completed++;
    else if (p.status === "in-progress") inProgress++;
    else notStarted++;
  });


  return (
    <>
      {isOpen && (
        <AddForm
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        />
      )}
      <div className="max-w-5xl m-auto flex flex-col py-6">
        <h1 className="text-5xl font-semibold">Projects Overview</h1>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-14">
          <ProjectCard
            text="Projects"
            number={projects.length}
            status=""
            icon={<Album />}
          />
          <ProjectCard
            text="Not Started"
            number={notStarted}
            status="notStarted"
            icon={<CircleMinus />}
          />
          <ProjectCard
            text="In Progress"
            number={inProgress}
            status="inProgress"
            icon={<Clock />}
          />
          <ProjectCard
            text="Completed"
            number={completed}
            status="completed"
            icon={<CircleCheck />}
          />
        </div>
        <Button
          startContent={<Plus />}
          size="lg"
          color="light"
          variant="ghost"
          radius="sm"
          className="hover:bg-black hover:text-white mt-6 border-2 border-black"
          onClick={onOpen}
        >
          New Project
        </Button>
      </div>
    </>
  );
}

export default Home;
