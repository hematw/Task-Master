import {
  Divider,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@nextui-org/react";

function DeleteConfirmModal({ isOpen, onOpenChange, onOpen, onDelete, title }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="min-w-[400px] p-4">
        {(onClose) => (
          <>
            <ModalHeader>
              <h2 className="text-3xl font-semibold mt-4">{title}</h2>
            </ModalHeader>
            <ModalBody>
              <p className="text-gray-p">This can not be undone!</p>
              <Divider/>
            </ModalBody>
            <ModalFooter className="flex gap-4 justify-end">
              <Button
                type="submit"
                className="bg-red-500 text-white"
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
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default DeleteConfirmModal;
