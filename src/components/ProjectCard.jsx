import { Card, CardBody } from "@nextui-org/react";


function ProjectCard({ number, text, icon, status }) {
  const cardClasses = {
    total: "",
    notStarted: "bg-gray-200 text-gray-p",
    inProgress: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-500",
  };

  return (
    <Card className={`p-4 ${cardClasses[status]}`}>
      <CardBody>
        <h2 className="text-4xl font-semibold text-black">{number}</h2>
        <div className="text-2xl flex items-center justify-between mt-3">
          <p className="">{text}</p>
          {icon ? icon : ""}
        </div>
      </CardBody>
    </Card>
  );
}

export default ProjectCard;
