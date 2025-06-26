import React, { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();

  const previewImage = selectedImage
    ? URL.createObjectURL(selectedImage)
    : userData?.image;

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [selectedImage]);

  const handleImageClick = () => {
    if (isEdit && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Profile updated successfully!");
        await loadUserProfileData();
        setIsEdit(false);
        setSelectedImage(null);
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!userData) return null;

  return (

    <Spin spinning={loading} tip="Loading..." className="custom-spin" size="large">
      <div className="mt-8 w-full">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={previewImage}
            alt="Profile"
            className="rounded-lg w-40 h-40 object-cover cursor-pointer"
            onClick={handleImageClick}
          />
          {isEdit && (
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          )}
        </div>

        {/* User Name */}
        {isEdit ? (
          <input
            type="text"
            className="text-2xl font-medium my-2 uppercase bg-gray-100"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        ) : (
          <p className="text-2xl font-medium my-2 uppercase">{userData.name}</p>
        )}
        <hr />

        {/* Contact Information */}
        <div className="my-4">
          <p className="underline text-gray-700 text-base">CONTACT INFORMATION</p>
          <div className="flex flex-col gap-y-2 mt-4">
            <div className="flex items-center gap-4">
              <p className="font-medium w-32">Email id:</p>
              <p className="text-blue-500">{userData.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-medium w-32">Phone:</p>
              {isEdit ? (
                <input
                  type="text"
                  className="bg-gray-100"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  required
                />
              ) : (
                <p className="text-blue-500">{userData.phone}</p>
              )}
            </div>
            <div className="flex items-start gap-4">
              <p className="font-medium w-32">Address:</p>
              {isEdit ? (
                <div>
                  <input
                    type="text"
                    className="block bg-gray-100"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <input
                    type="text"
                    className="block bg-gray-100"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </div>
              ) : (
                <p className="text-gray-600 flex-1">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="my-4">
          <p className="underline text-gray-700 text-base">BASIC INFORMATION</p>
          <div className="flex flex-col gap-y-2 mt-4">
            <div className="flex items-center gap-4">
              <p className="font-medium w-32">Gender:</p>
              {isEdit ? (
                <select
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="NOT SELECTED">Not Selected</option>
                </select>
              ) : (
                <p className="text-gray-600">{userData.gender}</p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <p className="font-medium w-32">Birthday:</p>
              {isEdit ? (
                <input
                  type="date"
                  className="bg-gray-100"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              ) : (
                <p className="text-gray-600">{userData.dob}</p>
              )}
            </div>
          </div>
        </div>

        {/* Save/Edit Buttons */}
        <div>
          {isEdit ? (
            <button
              className="py-2 px-8 border border-primary hover:bg-primary hover:text-white rounded-full"
              onClick={handleSave}
            >
              Save information
            </button>
          ) : (
            <button
              className="py-2 px-8 border border-primary hover:bg-primary hover:text-white rounded-full"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </Spin>

  );
};

export default MyProfile;
