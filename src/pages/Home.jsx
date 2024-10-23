import { Button, useDisclosure } from "@nextui-org/react";
import { Album, CircleCheck, CircleMinus, Clock, Plus } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import AddForm from "@/components/AddForm";

function Home() {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  return (
    <>
      {isOpen && (
        <AddForm isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
      )}
      <div className="max-w-5xl m-auto flex flex-col py-6">
        <h1 className="text-5xl font-semibold">Projects Overview</h1>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-14">
          <ProjectCard text="Projects" number={30} status="" icon={<Album />} />
          <ProjectCard
            text="Not Started"
            number={12}
            status="notStarted"
            icon={<CircleMinus />}
          />
          <ProjectCard
            text="In Progress"
            number={6}
            status="inProgress"
            icon={<Clock />}
          />
          <ProjectCard
            text="Completed"
            number={12}
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
