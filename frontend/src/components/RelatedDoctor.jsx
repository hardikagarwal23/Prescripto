import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctor = ({ docId, speciality }) => {

  const { doctors } = useContext(AppContext)

  const [relDoc, setRelDoc] = useState([])

  const navigate = useNavigate()

  useEffect(() => {

    if (doctors.length > 0 && speciality) {
      const doctorData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
      setRelDoc(doctorData)
    }
  }, [doctors, speciality, docId]
  )


  return (

    <div className='text-center gap-y-4 flex flex-col mt-[70px]'>
      <h1 className='text-4xl font-medium text-gray-700'>Related Doctors</h1>
      <p>Simply browse through our extensive list of trusted doctors</p>

      <div className='grid grid-cols-auto gap-4 gap-y-6'>

        {
          relDoc.filter(item => item.available).length > 0 ? (
            relDoc
              .map((item, index) => (
                <div
                  onClick={() => {
                    navigate(`/appointment/${item._id}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  key={index}
                  className="border border-blue-300 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
                >
                  <img src={item.image} alt={`${item.name} profile`} className="bg-blue-100" />

                  <div className="p-4 text-left">
                    {item.available ? <p className="text-green-600 inline-flex items-center font-semibold">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      Available
                    </p> : <p className="text-gray-300 inline-flex items-center font-semibold">
                      <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                      Not Available
                    </p>}
                    <p className="text-1xl font-semibold">{item.name}</p>
                    <p className="text-gray-600">{item.speciality}</p>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              No other doctor available for this speciality!
            </p>
          )
        }
      </div>
    </div>
  );
};

export default RelatedDoctor;
