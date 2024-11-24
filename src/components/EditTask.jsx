import { Controller, useForm } from "react-hook-form";
import { Trash2 } from "lucide-react";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Select,
  SelectItem,
  Input,
  Textarea,
  Divider,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import useFetch from "@/hooks/useFetch";
import DeleteConfirmModal from "./DeleteConfirmModal";
import axiosIns from "@/axios";
import { toast } from "react-toastify";
import Status from "./Status";
import User from "./User";

const projectSchema = Joi.object({
  // title: Joi.string(),
  description: Joi.string().required(),
  assignee: Joi.string().required(),
  deadline: Joi.date().required(),
  status: Joi.string().required(),
});

const statusOptions = [
  { key: "not-started", textValue: "Not Started" },
  { key: "in-progress", textValue: "In Progress" },
  { key: "paused", textValue: "Paused" },
  { key: "completed", textValue: "Completed" },
  { key: "activated", textValue: "Activated" },
];

function EditTask({
  taskId,
  title,
  assignee,
  deadline,
  status,
  description,
  isEditModalOpen,
  onEditModalClose,
}) {
  const { data } = useFetch("/users");
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(projectSchema),
    defaultValues: {
      assignee,
      description,
      deadline,
      status,
    },
  });

  const onSubmit = async (values) => {
    try {
      const { data } = await axiosIns.patch(`/tasks/${taskId}`, values);
      console.log(data.message);
      toast.success(data.message);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      onEditModalClose();
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axiosIns.delete(`/tasks/${taskId}`);
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      onClose();
      onEditModalClose();
    }
  };

  return (
    <>
      <Modal isOpen={isEditModalOpen} onOpenChange={onEditModalClose}>
        {/* {isOpen && (
          <DeleteConfirmModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onOpen={onOpen}
            onDelete={handleDelete}
          />
        )} */}
        <ModalContent className="min-w-[520px] p-4">
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader>
                <h2 className="text-3xl font-semibold mt-4">{title}</h2>
              </ModalHeader>
              <ModalBody>
                <Controller
                  name="assignee"
                  control={control}
                  render={({ field: { value, ...otherProps } }) => (
                    <div className="flex items-center justify-between">
                      <label className="text-gray-p text-sm w-1/2">
                        Assignee
                      </label>
                      <Select
                        {...otherProps}
                        items={data?.users || []}
                        variant="bordered"
                        radius="sm"
                        size="sm"
                        aria-label="Select task assignee"
                        isInvalid={errors.assignee ? true : false}
                        errorMessage={errors.assignee?.message}
                        className="w-1/2"
                        classNames={{
                          trigger: "border-none",
                        }}
                        placeholder="Choose assignee"
                        defaultSelectedKeys={[value]}
                        renderValue={(users) =>
                          users.map((user) => (
                            <User user={user.data} key={user.data._id} />
                          ))
                        }
                      >
                        {(user) => (
                          <SelectItem
                            key={user._id}
                            textValue={user.firstName + " " + user.lastName}
                          >
                            <User user={user} />
                          </SelectItem>
                        )}
                      </Select>
                    </div>
                  )}
                />
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { value, ...otherProps } }) => (
                    <div className="flex items-center justify-between">
                      <label className="text-gray-p text-sm w-1/2">
                        Status
                      </label>
                      <Select
                        {...otherProps}
                        aria-label="Select task status"
                        items={statusOptions}
                        variant="bordered"
                        radius="sm"
                        size="sm"
                        className=" w-1/2"
                        classNames={{
                          trigger: "border-none",
                        }}
                        placeholder="Select Status"
                        defaultSelectedKeys={[value]}
                        renderValue={(items) => {
                          return items.map((item) => (
                            <Status value={item.key} key={item.key} />
                          ));
                        }}
                      >
                        {(item) => (
                          <SelectItem key={item.key} textValue={item.textValue}>
                            <Status value={item.key} />
                          </SelectItem>
                        )}
                      </Select>
                    </div>
                  )}
                />
                <Controller
                  name="deadline"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center justify-between">
                      <label className="text-gray-p text-sm w-1/2">
                        Deadline
                      </label>
                      <Input
                        type="date"
                        size="sm"
                        variant="bordered"
                        {...field}
                        className=" w-1/2"
                        isInvalid={errors.deadline ? true : false}
                        errorMessage={errors.deadline?.message}
                      />
                    </div>
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      variant="bordered"
                      placeholder={"Description"}
                      radius="sm"
                      {...field}
                      className="mt-4"
                      isInvalid={errors.description ? true : false}
                      errorMessage={errors.description?.message}
                    />
                  )}
                />
              </ModalBody>
              <Divider className="my-4" />
              <ModalFooter className="flex justify-between">
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="bg-black text-white"
                    radius="sm"
                  >
                    Save
                  </Button>
                  <Button
                    className="border-black"
                    variant="bordered"
                    radius="sm"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </div>

                <Button
                  isIconOnly
                  onClick={() => {
                    console.log(isOpen);
                    onOpen();
                    console.log("hello");
                  }}
                  radius="sm"
                  variant="flat"
                  color="danger"
                >
                  <Trash2 color="#d00" />
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditTask;
