function ModalContainer({ children }) {
  return (
    <div className="h-screen w-screen flex items-center justify-center fixed top-0 left-0 z-10 backdrop-blur-lg">
      {children}
    </div>
  );
}

export default ModalContainer;
