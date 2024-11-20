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
  firstInputName,
  secInputName,
  selectElName,
  dateElName,
  submitUrl,
  title
}) {
  const { data, error, isLoading } = useFetch("/users");

  console.log(data?.users, isLoading);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(projectSchema),
    defaultValues: {
      [firstInputName]: "",
      [secInputName]: "",
      [selectElName]: "",
      [dateElName]: "",
    },
  });

  if (error) {
    return <p>{error.message}</p>;
  }

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const { data } = await axiosIns.post(submitUrl, values);
      console.log(data);
      onSubmitSuccess()
      onClose();
    } catch (error) {
      console.log(error);
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
              name={firstInputName}
              control={control}
              render={({ field }) => (
                <Input
                  variant="bordered"
                  radius="sm"
                  size="sm"
                  label={firstInputName}
                  {...field}
                  isInvalid={errors[firstInputName] ? true : false}
                  errorMessage={errors[firstInputName]?.message}
                  className="mt-4"
                />
              )}
            />
            <Controller
              name={secInputName}
              control={control}
              render={({ field }) => (
                <Input
                  variant="bordered"
                  radius="sm"
                  size="sm"
                  label={secInputName}
                  {...field}
                  isInvalid={errors[secInputName] ? true : false}
                  errorMessage={errors[secInputName]?.message}
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
              name={dateElName}
              control={control}
              render={({ field }) => (
                <Input
                  type="date"
                  variant="bordered"
                  radius="sm"
                  size="sm"
                  label={dateElName}
                  {...field}
                  isInvalid={errors[dateElName] ? true : false}
                  errorMessage={errors[dateElName]?.message}
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
