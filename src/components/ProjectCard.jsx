import { Button, Card, CardBody, useDisclosure } from "@nextui-org/react";
import User from "./User";
import { Edit, Plus } from "lucide-react";
import ProjectProgress from "./ProjectProgress";
import AddForm from "./AddForm";
import EditProject from "./EditProject";
import { useState } from "react";

function ProjectCard({ project, onSubmitSuccess }) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [isOnEdit, setIsOnEdit] = useState(false);

  return (
    <>
      {isOpen &&
        (isOnEdit ? (
          <EditProject
            projectId={project._id}
            title={project.title}
            manager={project.manager._id}
            deadline={new Date(project.deadline).toISOString().slice(0, 10)}
            description={project.description}
            isEditModalOpen={isOpen}
            onEditModalClose={onClose}
            onEditModalOpen={onOpen}
            onEditModalOpenChange={onOpenChange}
          />
        ) : (
          <AddForm
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            selectElName={"assignee"}
            submitUrl={`/tasks?projectId=${project._id}`}
            title="New Task"
            onSubmitSuccess={onSubmitSuccess}
          />
        ))}
      <Card className="p-4 max-w-xl" radius="lg">
        <CardBody className="flex gap-10">
          {/* title and description */}
          <div className="">
            <h1 className="text-4xl font-semibold">{project.title}</h1>
            <p className="mt-6">{project.description}</p>
          </div>

          {/* Other details */}
          <div>
            <div className="flex  items-center h-12">
              <span className="text-gray-p w-1/2">Manager</span>
              <User className="w-1/2" user={project.manager} />
            </div>
            <div className="flex items-center h-12">
              <span className="text-gray-p w-1/2">Progress</span>
              <ProjectProgress project={project} className="w-1/2" />
            </div>
            <div className="flex items-center h-12">
              <span className="text-gray-p w-1/2">Deadline</span>
              <span className="w-1/2">
                {new Date(project.deadline).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* footer buttons */}
          <div className="flex justify-between items-center">
            <Button
              isIconOnly
              variant="flat"
              onClick={() => {
                setIsOnEdit(true);
                onOpen();
              }}
            >
              <Edit />
            </Button>
            <Button
              startContent={<Plus />}
              color="light"
              variant="ghost"
              radius="sm"
              className="hover:bg-black hover:text-white border-2 border-black"
              onClick={() => {
                setIsOnEdit(false);
                onOpen();
              }}
            >
              Add Task
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default ProjectCard;
