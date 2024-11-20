import { Controller, useForm } from "react-hook-form";
import axiosIns from "@/axios";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { Upload } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";

function Profile() {
  const fileInputRef = useRef();
  const [imgPath, setImgPath] = useState("");
  const [selectedImg, setSelectedImg] = useState();
  const {userData, setUser} = useContext(AuthContext);
  const user = userData || JSON.parse(localStorage.getItem("user"));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: joiResolver(registerSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      profile: user.profile,
      dob: new Date(user.dob).toISOString().substring(0, 10),
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // handle click on button to browse for files
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // handle file input change
  const handleChange = () => {
    const path = URL.createObjectURL(fileInputRef.current.files[0]);
    console.log(path);
    setImgPath(path);
    setSelectedImg(fileInputRef.current.files[0]);
  };

  async function onSubmit(values) {
    const formData = new FormData();

    for (let key in values) {
      formData.append(key, values[key]);
    }

    if (selectedImg) {
      console.log(selectedImg);
      formData.set("profile", selectedImg);
    }

    try {
      const { data } = await axiosIns.patch("/users", formData);
      setUser(data.user)
      localStorage.setItem("user", JSON.stringify(data.user))
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong, please try again later!");
      }
    }
  }

  return (
    <>
      <ToastContainer position="top-center" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4 max-w-2xl m-auto">
            <div className="w-52 h-52 border-2 border-gray-500 rounded-xl relative  overflow-hidden">
              <img
                src={imgPath || user.profile}
                alt={`Profile photo of`}
                className="w-full h-full object-cover"
              />
              <Button
                isIconOnly
                radius="sm"
                className="bg-black/50 text-white absolute bottom-0 right-0"
                onClick={handleClick}
              >
                <Upload />
              </Button>
              <Controller
                name="profile"
                control={control}
                render={({ field }) => (
                  <Input
                    type="file"
                    accept="image/* .jpg, .jpeg, .png"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleChange}
                  />
                )}
              />
            </div>
            <div className="grow">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    label="First name"
                    radius="sm"
                    variant="bordered"
                    className="mb-6"
                    {...field}
                    isInvalid={errors.firstName ? true : false}
                    errorMessage={errors.firstName?.message}
                    firstName
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Last name"
                    radius="sm"
                    variant="bordered"
                    className="mb-6"
                    {...field}
                    isInvalid={errors.lastName ? true : false}
                    errorMessage={errors.lastName?.message}
                  />
                )}
              />
              <Controller
                name="dob"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      type="date"
                      variant="bordered"
                      radius="sm"
                      className="mb-6"
                      value={field.value}
                      {...field}
                      label="Date of birth"
                      isInvalid={errors.dob ? true : false}
                      errorMessage={errors.dob?.message}
                    />
                  );
                }}
              />
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Country"
                    radius="sm"
                    variant="bordered"
                    className="mb-6"
                    selectedKeys={[field.value]}
                    value={field.value}
                    {...field}
                    isInvalid={errors.country ? true : false}
                    errorMessage={errors.country?.message}
                  >
                    <SelectItem key="AFG">Afghanistan</SelectItem>
                    <SelectItem key="USA">USA</SelectItem>
                    <SelectItem key="IRI">Iran</SelectItem>
                  </Select>
                )}
              />
              <Divider className="mb-6" />
              <Controller
                name="currentPassword"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      variant="bordered"
                      radius="sm"
                      className="mb-6"
                      value={field.value}
                      {...field}
                      label="Current Password"
                      isInvalid={errors.dob ? true : false}
                      errorMessage={errors.dob?.message}
                    />
                  );
                }}
              />
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      variant="bordered"
                      radius="sm"
                      className="mb-6"
                      value={field.value}
                      {...field}
                      label="New Password"
                      isInvalid={errors.dob ? true : false}
                      errorMessage={errors.dob?.message}
                    />
                  );
                }}
              />
              <Controller
                name="confirmNewPassword"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      variant="bordered"
                      radius="sm"
                      className="mb-6"
                      value={field.value}
                      {...field}
                      label="Confirm New Password"
                      isInvalid={errors.dob ? true : false}
                      errorMessage={errors.dob?.message}
                    />
                  );
                }}
              />
              <Button
                className="bg-black text-white"
                radius="sm"
                size="lg"
                type="submit"
                fullWidth
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Profile;
