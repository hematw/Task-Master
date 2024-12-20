import useFetch from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import axiosIns from "@/axios";
import { Mosaic } from "react-loading-indicators";

function SelectedProject() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [needFetch, setNeedFetch] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const handlePagination = () => {
    setPage((prevPage) => (prevPage < totalPages ? ++prevPage : 1));
  };

  useEffect(() => {
    setIsLoading(true);
    const getTasks = async () => {
      try {
        const { data } = await axiosIns.get(`/tasks?projectId=${id}`, {
          params: {
            page,
          },
        });
        setTotalPages(data.totalPages);
        setTasks(
          data.tasks.map((task) => ({
            ...task,
            deadline: new Date(task.deadline).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
          }))
        );
      } catch (error) {
        console.error(error);
        toast.error(
          error.message || "Something went wrong please try again later"
        );
      } finally {
        setIsLoading(false);
        setNeedFetch(false);
      }
    };
    getTasks();
  }, [page, needFetch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (search.length >= 3) {
      try {
        const { data } = await axiosIns.get(`/tasks?projectId=${id}`, {
          params: {
            page,
            search
          },
        });
        setTotalPages(data.totalPages);
        setTasks(
          data.tasks.map((task) => ({
            ...task,
            deadline: new Date(task.deadline).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
          }))
        );
      } catch (error) {
        console.error(error);
        toast.error(
          error.message || "Something went wrong please try again later"
        );
      } finally {
        setIsLoading(false);
        setNeedFetch(false);
      }
    // }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl m-auto flex items-center justify-center">
        <Mosaic color="#222" size="large" text="Getting data" textColor="" />
      </div>
    );
  }

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
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Search"
            startContent={<Search size={32} />}
            type="search"
            radius="sm"
            onChange={(e) => setSearch(e.target.value)}
            classNames={{
              base: "max-w-full sm:max-w-[16rem] h-10",
              mainWrapper: "h-full",
              input: "text-medium",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
          />
        </form>
      </div>
      <div className="grid grid-cols-3 gap-14 mt-8 items-start">
        <ProjectCard
          project={state}
          onSubmitSuccess={() => setNeedFetch(!needFetch)}
        />
        <ProjectTasksTable
          projectTasks={tasks}
          className="col-span-2"
          onMoreClick={handlePagination}
        />
      </div>
    </div>
  );
}

export default SelectedProject;
