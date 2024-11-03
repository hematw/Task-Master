import { Button, useDisclosure } from "@nextui-org/react";
import { Album, CircleCheck, CircleMinus, Clock, Plus } from "lucide-react";
import SummaryCard from "@/components/SummaryCard";
import AddForm from "@/components/AddForm";
import useFetch from "@/hooks/useFetch";
import { Mosaic } from "react-loading-indicators";

function Home() {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const { isLoading, error, data } = useFetch("/projects/summary");

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return (
      <div className="max-w-5xl m-auto flex items-center justify-center">
        <Mosaic color="#222" size="large" text="Getting data" textColor="" />
      </div>
    );
  }
  const {
    allProjects,
    completedProjects,
    notStartedProjects,
    inProgressProjects,
  } = data;

  return (
    <>
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
        />
      )}
      <div className="max-w-5xl m-auto flex flex-col py-6">
        <h1 className="text-5xl font-semibold">Projects Overview</h1>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-14">
          <SummaryCard
            text="Projects"
            number={allProjects}
            status=""
            icon={<Album />}
          />
          <SummaryCard
            text="Not Started"
            number={notStartedProjects}
            status="notStarted"
            icon={<CircleMinus />}
          />
          <SummaryCard
            text="In Progress"
            number={inProgressProjects}
            status="inProgress"
            icon={<Clock />}
          />
          <SummaryCard
            text="Completed"
            number={completedProjects}
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
