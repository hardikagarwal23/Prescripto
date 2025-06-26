import React, { useContext, useState } from 'react';
import { Flex, Spin } from 'antd';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { requestFormReset } from 'react-dom';



const AddDoctor = () => {
  const [loading, setLoading] = useState(false);

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!docImg) {
      return toast.error("Upload a profile picture");
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(
        backendUrl + '/api/admin/add-doctor',
        formData,
        { headers: { Authorization: `Bearer ${aToken}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setEmail('');
        setPassword('');
        setAddress1('');
        setAddress2('');
        setDegree('');
        setAbout('');
        setFees('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDocImg(null);
    setName("");
    setSpeciality("");
    setEmail("");
    setDegree("");
    setPassword("");
    setAddress1("");
    setAddress2("");
    setExperience("");
    setFees("");
    setAbout("");
  };


  return (
    <div className="flex-1 px-6 pb-6 bg-[#F8F9FD] min-h-screen">
      <p className="font-semibold text-black text-lg my-4">Add Doctor</p>

      {/* Wrap your form in the Spin component */}
      <Flex align="center" gap="middle">
        <Spin
          spinning={loading}
          tip="Loading..."
          size="large"
          className="custom-spin"
        >
          <form
            onSubmit={onSubmitHandler}
            className="max-w-5xl my-2 p-6 border border-gray-300 rounded-md shadow-sm bg-white overflow-y-auto max-h-[80vh]"
          >
            {/* Image Upload Section */}
            <div className="flex items-center gap-4">
              <label htmlFor="doc-img" className="cursor-pointer">
                <img
                  src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                  alt="Upload Doctor"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </label>
              <input
                onChange={(e) => setDocImg(e.target.files[0])}
                type="file"
                id="doc-img"
                className="hidden"
              />
              <div className="text-gray-600">
                <p className="text-base font-medium">Upload Doctor</p>
                <p className="text-base font-medium">Picture</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
              {/* Your Name */}
              <div>
                <label className="block text-gray-900 mb-1">Your Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Name"
                  type="text"
                  className="w-full border border-gray-300 rounded-sm px-2 py-1"
                  required
                />
              </div>

              {/* Speciality */}
              <div>
                <label className="block text-gray-900 mb-1">Speciality</label>
                <select
                  onChange={(e) => setSpeciality(e.target.value)}
                  value={speciality}
                  className="w-full border border-gray-300 rounded-sm px-2 py-1"
                  required
                >
                  <option>General Physician</option>
                  <option>Gynecologist</option>
                  <option>Dermatologist</option>
                  <option>Pediatricians</option>
                  <option>Neurologist</option>
                  <option>Gastroenterologist</option>
                </select>
              </div>

              {/* Doctor Email */}
              <div>
                <label className="block text-gray-900 mb-1">Doctor Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Email"
                  type="email"
                  className="w-full border border-gray-300 rounded-sm px-2 py-1"
                  required
                />
              </div>

              {/* Degree */}
              <div>
                <label className="block text-gray-900 mb-1">Degree</label>
                <input
                  onChange={(e) => setDegree(e.target.value)}
                  value={degree}
                  placeholder="Degree"
                  type="text"
                  className="w-full border border-gray-300 rounded-sm px-2 py-1"
                  required
                />
              </div>

              {/* Set Password */}
              <div>
                <label className="block text-gray-900 mb-1">Set Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                  type="password"
                  className="w-full border border-gray-300 rounded-sm px-2 py-1"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-900 mb-1">Address</label>
                <input
                  onChange={(e) => setAddress1(e.target.value)}
                  value={address1}
                  placeholder="Address 1"
                  type="text"
                  className="w-full border border-gray-300 rounded-sm px-2 py-1 mb-1"
                  required
                />
                <input
                  onChange={(e) => setAddress2(e.target.value)}
                  value={address2}
                  placeholder="Address 2"
                  type="text"
                  className="w-full border border-gray-300 rounded-sm px-2 py-1"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-gray-900 mb-1">Experience</label>
                <select
                  onChange={(e) => setExperience(e.target.value)}
                  value={experience}
                  className="w-full border border-gray-300 rounded-sm px-2 py-1"
                  required
                >
                  <option>1 Year</option>
                  <option>2 Year</option>
                  <option>3 Year</option>
                  <option>4 Year</option>
                  <option>5 Year</option>
                  <option>6 Year</option>
                  <option>8 Year</option>
                  <option>9 Year</option>
                  <option>10 Year</option>
                </select>
              </div>

              {/* Fees */}
              <div>
                <label className="block text-gray-900 mb-1">Fees</label>
                <input
                  onChange={(e) => setFees(e.target.value)}
                  value={fees}
                  placeholder="Doctor Fees"
                  type="number"
                  className="w-full border border-gray-300 rounded-sm px-2 py-1"
                  required
                />
              </div>

              {/* About Doctor - Full Width */}
              <div className="md:col-span-2">
                <label className="block text-gray-900 mb-1">About Doctor</label>
                <textarea
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                  placeholder="Write about doctor"
                  rows={5}
                  className="w-full border border-gray-300 rounded-md px-2 py-1 resize"
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 bg-primary text-white rounded-full px-6 py-2"
            >
              Add Doctor
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="mt-4 ml-4 bg-primary text-white rounded-full px-6 py-2"
            >
              Reset
            </button>


          </form>
        </Spin>
      </Flex>
    </div>
  );
};

export default AddDoctor;
