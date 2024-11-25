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
import User from "./User";
import { useNavigate } from "react-router-dom";

const projectSchema = Joi.object({
  //   title: Joi.string(),
  description: Joi.string().required(),
  manager: Joi.string().required(),
  deadline: Joi.date().required(),
});

function EditProject({
  projectId,
  title,
  manager,
  deadline,
  description,
  isEditModalOpen,
  onEditModalClose,
}) {
  const { data } = useFetch("/users");
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(projectSchema),
    defaultValues: {
      manager,
      description,
      deadline,
    },
  });

  const onSubmit = async (values) => {
    try {
      const { data } = await axiosIns.patch(`/projects/${projectId}`, values);
      console.log(data.message);
      toast.success(data.message);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axiosIns.delete(`/projects/${projectId}`);
      toast.success(data.message);
      navigate("/projects");
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
        {isOpen && (
          <DeleteConfirmModal
            title={"Delete Project?"}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onOpen={onOpen}
            onDelete={handleDelete}
          />
        )}
        <ModalContent className="min-w-[520px] p-4">
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader>
                <h2 className="text-3xl font-semibold mt-4">{title}</h2>
              </ModalHeader>
              <ModalBody>
                <Controller
                  name="manager"
                  control={control}
                  render={({ field: { value, ...otherProps } }) => (
                    <div className="flex items-center justify-between">
                      <label className="text-gray-p text-sm w-1/2">
                        Manager
                      </label>
                      <Select
                        {...otherProps}
                        items={data?.users || []}
                        variant="bordered"
                        radius="sm"
                        size="sm"
                        aria-label="Select Project manager"
                        isInvalid={errors.manager ? true : false}
                        errorMessage={errors.manager?.message}
                        className="w-1/2"
                        classNames={{
                          trigger: "border-none",
                        }}
                        placeholder="Select manager"
                        defaultSelectedKeys={[value]}
                        selectedKeys={[value]}
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
                        className="w-1/2"
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

export default EditProject;
