import axiosIns from "@/axios";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Joi from "joi";
import { User } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import useFetch from "@/hooks/useFetch";
import { toast } from "react-toastify";

const projectSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  assignee: Joi.string(),
  manager: Joi.string(),
  deadline: Joi.date(),
});

function AddForm({
  isOpen,
  onOpenChange,
  onSubmitSuccess,
  onClose,
  selectElName,
  submitUrl,
  title
}) {
  const { data, error, isLoading } = useFetch("/users");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      deadline: "",
      [selectElName]: "",
    },
  });

  if (error) {
    return <p>{error.message}</p>;
  }

  const onSubmit = async (values) => {
    try {
      const { data } = await axiosIns.post(submitUrl, values);
      console.log(data);
      toast.success(data.message)
      onSubmitSuccess()
      onClose();
    } catch (error) {
      console.error(error);
      toast.success(error.response.message)
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent radius="" className="p-4 w-[420px] relative">
        <ModalHeader>
          <h2 className="text-3xl font-semibold">{title}</h2>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  variant="bordered"
                  radius="sm"
                  size="sm"
                  label="Title"
                  {...field}
                  isInvalid={errors.title ? true : false}
                  errorMessage={errors.title?.message}
                  className="mt-4"
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input
                  variant="bordered"
                  radius="sm"
                  size="sm"
                  label="Description"
                  {...field}
                  isInvalid={errors.description ? true : false}
                  errorMessage={errors.description?.message}
                  className="mt-4"
                />
              )}
            />
            <Controller
              name={selectElName}
              control={control}
              render={({ field }) => (
                <Select
                  variant="bordered"
                  radius="sm"
                  size="sm"
                  label={selectElName}
                  {...field}
                  isInvalid={errors[selectElName] ? true : false}
                  errorMessage={errors[selectElName]?.message}
                  className="mt-4"
                >
                  {isLoading ? (
                    <SelectItem key="loading" textValue="Loading...">
                      <div>Loading...</div>
                    </SelectItem>
                  ) : (
                    data.users.map(({ _id, firstName, lastName, profile }) => (
                      <SelectItem
                        key={_id}
                        textValue={firstName + " " + lastName}
                      >
                        <div className="flex items-center gap-2">
                          <Avatar src={profile} fallback={<User />} />
                          <p>{firstName + " " + lastName}</p>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}
            />
            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <Input
                  type="date"
                  variant="bordered"
                  radius="sm"
                  size="sm"
                  label="Deadline "
                  {...field}
                  isInvalid={errors.deadline ? true : false}
                  errorMessage={errors.deadline?.message}
                  className="mt-4"
                />
              )}
            />
            <Button
              type="submit"
              radius="sm"
              size="lg"
              className="mt-6 bg-black text-white"
            >
              Add
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddForm;
