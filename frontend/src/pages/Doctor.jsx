import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Doctor = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoctor, setFilterDoctor] = useState([]);
  const applyFilter = () => {
    if (speciality) {
      setFilterDoctor(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoctor(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const [seeFilter, setSeeFilter] = useState(false);

  return (
    <div className=''>
      <p className='txet-gray-600'>Browse through the doctors specialist.</p>

      <button onClick={() => setSeeFilter(prev => !prev)} className={`text-sm border border-gray-300 rounded px-3 py-1 transition-all mt-2 sm:hidden ${seeFilter ? 'bg-primary text-white' : ''}`}>Filters</button>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5 '>



        <div className={` text-sm text-gray-600 flex-col gap-4 ${seeFilter ? 'flex' : 'hidden sm:flex'} `}>
          <p onClick={() => { navigate('/doctors/General physician'); setFilterToken(true); }} className={`w-[94vw] sm:w-auto px-1 py-1 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === 'General physician' ? 'bg-indigo-100 text-black font-medium' : ''}`}>General physician</p>
          <p onClick={() => navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto px-1 py-1 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === 'Gynecologist' ? 'bg-indigo-100 text-black font-medium' : ''}`}>Gynecologist</p>
          <p onClick={() => navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto px-1 py-1 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === 'Dermatologist' ? 'bg-indigo-100 text-black font-medium' : ''}`}>Dermatologist</p>
          <p onClick={() => navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto px-1 py-1 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === 'Pediatricians' ? 'bg-indigo-100 text-black font-medium' : ''}`}>Pediatricians</p>
          <p onClick={() => navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto px-1 py-1 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === 'Neurologist' ? 'bg-indigo-100 text-black font-medium' : ''}`}>Neurologist</p>
          <p onClick={() => navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto px-1 py-1 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === 'Gastroenterologist' ? 'bg-indigo-100 text-black font-medium' : ''}`}>Gastroenterologist</p>

        </div>

        <div className='grid grid-cols-auto gap-4 gap-y-6 w-full scroll-item'>


          {filterDoctor.length > 0 && filterDoctor.filter(item => item.available).length > 0 ? (
            filterDoctor
              .filter(item => item.available)
              .map((item, index) => (
                <div
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  key={index}
                  className="border border-blue-300 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
                >
                  <img src={item.image} alt={`${item.name} profile`} className="bg-blue-100" />

                  <div className="p-4 text-left">
                    <p className="text-green-600 inline-flex items-center font-semibold">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      Available
                    </p>
                    <p className="text-1xl font-semibold">{item.name}</p>
                    <p className="text-gray-600">{item.speciality}</p>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              No doctors available for this specialty!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctor;

