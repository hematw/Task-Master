import { Controller, useForm } from "react-hook-form";
import { Trash2, User } from "lucide-react";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Avatar,
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

const projectSchema = Joi.object({
  //   title: Joi.string(),
  description: Joi.string().required(),
  manager: Joi.string().required(),
  deadline: Joi.date().required(),
});

function EditForm({ title, manager, deadline, description, onDeleteBtn }) {
  const {
    data: { users },
    loading,
  } = useFetch("/users");

  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(projectSchema),
    defaultValues: { manager, deadline, description },
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="min-w-[520px]">
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader>
                  <h2 className="text-3xl font-semibold mt-4">{title}</h2>
                </ModalHeader>
                <ModalBody>
                  <Controller
                    name="manager"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="manager"
                          className="text-gray-p text-sm w-1/2"
                        >
                          Manager
                        </label>
                        <Select
                          id="manager"
                          variant="bordered"
                          radius="sm"
                          size="sm"
                          label="Manager"
                          {...field}
                          isInvalid={errors.manager ? true : false}
                          errorMessage={errors.manager?.message}
                          className="mt-4 w-1/2"
                        >
                          {loading ? (
                            <SelectItem key="loading" textValue="Loading...">
                              <div>Loading...</div>
                            </SelectItem>
                          ) : (
                            users.map(
                              ({ _id, firstName, lastName, profile }) => (
                                <SelectItem
                                  key={_id}
                                  textValue={firstName + " " + lastName}
                                >
                                  <div className="flex items-center gap-2">
                                    <Avatar src={profile} fallback={<User />} />
                                    <p>{firstName + " " + lastName}</p>
                                  </div>
                                </SelectItem>
                              )
                            )
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
                          label="Deadline"
                          variant="bordered"
                          {...field}
                          className="mt-4 w-1/2"
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
                    onClick={onDeleteBtn}
                    radius="sm"
                    variant="flat"
                    color="danger"
                  >
                    <Trash2 color="#d00" />
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditForm;
