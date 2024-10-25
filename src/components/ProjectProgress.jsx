import { Progress } from "@nextui-org/react";

function ProjectProgress({ project }) {
  const { tasksNum, completedNum } = project;
  const progress = (100 * completedNum) / tasksNum || 0;

  /*
    0 - 40 red
    40 - 80 blue
    80 - 100
  */

  let color = progress < 40 ? "danger" : progress < 80 ? "primary" : "success";

  return (
    <Progress
      aria-label="Project progress"
      showValueLabel
      value={progress}
      color={color}
      classNames={{
        base: "max-w-md flex-row-reverse items-center",
        track: "grow",
      }}
    />
  );
}

export default ProjectProgress;
