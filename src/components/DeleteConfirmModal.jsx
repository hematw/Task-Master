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

function DeleteConfirmModal({
  isOpen,
  onOpenChange,
  onOpen,
  onDelete,
  title,
}) {
    console.log("inside delete confirm")
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      {(onClose) => (
        <ModalContent className="min-w-[600px] p-4">
          <ModalHeader>
            <h2 className="text-3xl font-semibold mt-4">{title}</h2>
          </ModalHeader>
          <ModalBody>
            <p className="text-gray-p">This can not be undone!</p>
          </ModalBody>
          <Divider className="my-4" />
          <ModalFooter className="flex gap-4 justify-end">
            <Button
              type="submit"
              className="bg-red-400 text-white"
              radius="sm"
              onClick={onDelete}
            >
              Delete
            </Button>
            <Button
              className="border-black"
              variant="bordered"
              radius="sm"
              onClick={onClose}
            >
              Discard
            </Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
}

export default DeleteConfirmModal;
