import React, { useState } from 'react';
import Paragraph from './Components/top_paragraph';
import { PiFlowerTulipThin } from "react-icons/pi";
import { FaRegCompass } from "react-icons/fa";
import { IoRocket } from "react-icons/io5";
import { IoTrophyOutline } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import  partyCelebrationIcon  from './icons/party-popper.svg';
// import axios from 'axios';

function App() {
  const [step, setStep] = useState(1);
  const [activeButton, setActiveButton] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    github: '',
    selectedOption: '',
    selectedOptionPage3: '',
  })
  const [activeButtonPage3, setActiveButtonPage3] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (isFormFilled(step)) {
       setStep(step + 1);
    } else {
      alert('Please fill in all fields.')
    }
  };

  const handleChange = (e) => {
   setFormData({
    ...formData,
    [e.target.name]: e.target.value
   })
  };

  const handleOptionSelect = (option) => {
    setFormData({
      ...formData,
     selectedOption: option
     });
     setActiveButton(option);
  };

  const handleOptionSelectedPage3 = (option) => {
    setFormData({
      ...formData,
     selectedOptionPage3: option
     });
     setActiveButtonPage3(option);
     setIsChecked(true);
  }

  const handleBack = () => {
    setStep(step - 1);
  }

  const isFormFilled = (step) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone && formData.github;
      case 2:
        return formData.selectedOption;
      case 3:
        return formData.selectedOptionPage3
      default:
        return true;

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await
      fetch('https://formspree.io/f/xayrgaqj', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitted(true);
      }else {
        const errorData = await
        response.json();
        alert(`Submission failed: ${errorData.message}`)
      }
    } catch (error) {
      alert(`An error occured: ${error.message}`)
    }
  };

  
  return (
    <div >
      {submitted ? ( //render Congratulations page if submitted
        <div className="flex flex-col items-center justify-center bg-gray-200 h-screen overflow-y-scroll md:overflow-y-auto">
           <Paragraph className=''/>
          <div className='md:w-[550px] w-[360px] md:h-[370px] h-[400px] bg-white rounded-xl shadow-lg flex flex-col items-center justify-center'>
          <IoIosCheckmarkCircle  size={70}  className='text-orange-600'/>
          <div className='flex flex-row items-center justify-center' >
          <h1 className='font-bold text-3xl'>Congratulations! </h1>
          <img src={partyCelebrationIcon} className='w-16' alt="" />
          </div>
          <p className='text-center pl-5 pr-5 '>Your profile has been created and you are now ready to start participating in challenges that match your interests and coding experience level</p>
          </div>
        </div>
      ) : (

        <form  onSubmit={handleSubmit} className={`flex flex-col items-center justify-center bg-gray-200  overflow-y-scroll md:overflow-y-auto h-screen ${step === 4 ? 'h-[115vh]':''}`}>
          <Paragraph className=''/>

        {step === 1 && (
          <div className='md:w-[450px] w-80 md:h-[370px] h-[560px] bg-white rounded-xl shadow-lg'> 
             <div className='flex flex-row items-center justify-between gap-3 pl-5 pr-5 pt-5'>
               <p className='text-white bg-orange-600 h-6 w-6 rounded-full text-center'>1</p>
               <div className='h-1 md:w-20 w-10 bg-gray-300 rounded' ></div>
               <p className='text-black bg-gray-300 h-6 w-6 rounded-full text-center'>2</p>
               <div className='h-1 md:w-20 w-10 bg-gray-300 rounded'></div>
               <p className='text-black bg-gray-300 h-6 w-6 rounded-full text-center'>3</p>
               <div className='h-1 md:w-20 w-10 bg-gray-300 rounded'></div>
               <p className='text-black bg-gray-300 h-6 w-6 rounded-full text-center'>4</p>
             </div>
             <hr  className='mt-4 ml-5 mr-5'/>
             <div className='pt-4 pl-3 '>
               <h1 className='font-bold text-2xl pb-2'>Personal Information</h1>
               <p className='text-xs text-gray-300'>Please provide your personal details so we can get to know you better.</p>
             </div>
             <div className='pt-5 md:pl-4 pr-4'>
              <div className='flex md:flex-row flex-col items-center justify-between'>
                <div className=''>
                  <p className='font-bold pb-2'>Full Name</p>
                  <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Enter your name' className='border border-black rounded-lg pl-2 hover:border-orange-600 outline-none md:h-7 h-10 md:w-48 w-64'/>
                </div>
                <div>
                   <p className='font-bold pb-2'>Email Address</p>
                   <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='name@email.com' className='border border-black rounded-lg pl-2 hover:border-orange-600 outline-none md:h-7 h-10 md:w-52 w-64'/>
                </div>
              </div>
              <div className='flex md:flex-row flex-col items-center justify-between pt-4'>
                <div>
                  <p className='font-bold pb-2'>Phone Number</p>
                  <input type="phone" name='phone' value={formData.phone} onChange={handleChange} placeholder='+91 1234567890' className='border border-black rounded-lg pl-2 hover:border-orange-600 outline-none  md:h-7 h-10 md:w-48 w-64' />
                </div>
                <div>
                  <p className='font-bold pb-2'>Portfolio/GitHub Link</p>
                  <input type="text" name='github' value={formData.github} onChange={handleChange} placeholder='github.com/rishipurwar1' className='border border-black rounded-lg pl-2 hover:border-orange-600 outline-none md:h-7 h-10 md:w-52 w-64' />
                </div>
              </div>
             </div>
              <hr className='mt-3 ml-5 mr-5 ' />
              <button onClick={handleNext} className='bg-orange-600 text-white rounded-xl md:h-8 h-11 md:w-24 w-32 mt-3 md:ml-80 ml-44'>Next Step</button>
          </div>
        )} 
        {step === 2 && (
          <div className='md:w-[450px] w-[360px] md:h-[370px] h-[400px] bg-white rounded-xl shadow-lg'>
            <div className='flex flex-row items-center justify-between gap-3 pl-5 pr-5 pt-5'>
               <p className='text-white bg-orange-600 h-6 w-6 rounded-full text-center'>1</p>
               <div className='h-1 md:w-20 w-10 bg-orange-600 rounded' ></div>
               <p className='text-white bg-orange-600 h-6 w-6 rounded-full text-center'>2</p>
               <div className='h-1 md:w-20 w-10 bg-gray-300 rounded'></div>
               <p className='text-black bg-gray-300 h-6 w-6 rounded-full text-center'>3</p>
               <div className='h-1 md:w-20 w-10 bg-gray-300 rounded'></div>
               <p className='text-black bg-gray-300 h-6 w-6 rounded-full text-center'>4</p>
             </div>
             <hr  className='mt-4 ml-5 mr-5'/>
             <div className='pt-4 pl-3 '>
               <h1 className='font-bold text-2xl pb-2'>Skill Level</h1>
               <p className='text-xs text-gray-300'>Please tell us about your skill level in frontend development.</p>
             </div>

             <div className='grid grid-cols-2 gap-4 mb-4 '>
               {[ 
                 { option: 'Beginner', icon: <PiFlowerTulipThin className='bg-orange-600 text-white rounded-full h-5 w-5 px-1' /> },
                 { option: 'Intermediate', icon: <FaRegCompass className='bg-orange-600 text-white  md:h-5 h-6 md:w-5 w-6 px-[4px] rounded-full' />},
                 { option: 'Advanced', icon: <IoRocket className='bg-orange-600 text-white rounded-full h-5 w-5 px-1'/> },
                 { option: 'Expert', icon: <IoTrophyOutline className='bg-orange-600 text-white rounded-full h-5 w-5 px-1' /> }
                 
               ].map(({ option, icon }) => (
                <button key={option} type='button' onClick={() => handleOptionSelect(option)} className={`px-4 py-2 m-1 rounded-xl flex items-center hover:border-orange-600 gap-3 ${activeButton === option ? 'border-4 border-orange-600' : 'border'}`}>
                  {icon}
                  <span>{option}</span>
                </button>
               ))}
             </div>
             
             
             <hr  className='mt-4 ml-5 mr-5'/>
             <div className='flex flex-row items-center justify-between pl-10 pr-10 pt-3'>
                <button onClick={handleBack} className='w-24 h-10 border border-orange-600 rounded-xl text-orange-600'>Go Back</button>
                <button onClick={handleNext} className='w-24 h-10 border bg-orange-600 rounded-xl text-white'>Next Step</button>
             </div>

          </div>
        )}
        {step === 3 && (
          <div className='md:w-[450px] w-[360px] md:h-[370px] h-[400px] bg-white rounded-xl shadow-lg'>
             <div className='flex flex-row items-center justify-between gap-3 pl-5 pr-5 pt-5'>
               <p className='text-white bg-orange-600 h-6 w-6 rounded-full text-center'>1</p>
               <div className='h-1 md:w-20 w-10 bg-orange-600 rounded' ></div>
               <p className='text-white bg-orange-600 h-6 w-6 rounded-full text-center'>2</p>
               <div className='h-1 md:w-20 w-10 bg-orange-600 rounded'></div>
               <p className='text-white bg-orange-600 h-6 w-6 rounded-full text-center'>3</p>
               <div className='h-1 md:w-20 w-10 bg-gray-300 rounded'></div>
               <p className='text-black bg-gray-300 h-6 w-6 rounded-full text-center'>4</p>
             </div>
             <hr  className='mt-4 ml-5 mr-5'/>
             <div className='pt-4 pl-3 '>
               <h1 className='font-bold text-2xl pb-2'>Challenge Preference</h1>
               <p className='text-xs text-gray-300'>Please tell us which frontend challenge you would like to participate in.</p>
             </div>
              
              <div className='grid grid-cols-2 gap-4 mb-4 pl-4 pr-4 pt-6 '>
                {[
                   { option: 'HTML/CSS/JS'  },
                   { option: 'ReactJs' },
                   { option: 'AngularJs' },
                   { option: 'Vue.js' }
                ].map(({option}) => (
                  <button key={option} type='button' onClick={() => handleOptionSelectedPage3(option)} className={`px-3 py-2 rounded-xl flex items-center ${activeButtonPage3 === option ? 'border-4 border-orange-600':'border'}`}>
                    <input type="checkbox" checked={activeButtonPage3 === option} onChange={() => handleOptionSelectedPage3(option)} className='mr-2 appearance-none w-4 h-4 border border-black checked:bg-orange-600 checked:border-transparent rounded-lg  '/>
                    <span>{option}</span>
                  </button>
                ))}
              </div>
                

             <hr  className='mt-4 ml-5 mr-5'/>
             <div className='flex flex-row items-center justify-between pl-10 pr-10 pt-3'>
                <button onClick={handleBack} className='w-24 h-10 border border-orange-600 rounded-xl text-orange-600'>Go Back</button>
                <button onClick={handleNext} className='w-24 h-10 border bg-orange-600 rounded-xl text-white'>Next Step</button>
             </div>
          </div>
        )}

        {step === 4 &&(
           <div className='md:w-[680px] w-[350px] md:h-[370px] h-[680px] bg-white rounded-xl shadow-lg  page-four-mobile'>
             <div className='flex flex-row items-center justify-between gap-3 pl-5 pr-5 pt-5'>
               <p className='text-white bg-orange-600 h-6 w-6 rounded-full text-center'>1</p>
               <div className='h-1 md:w-32 w-14 bg-orange-600 rounded' ></div>
               <p className='text-white bg-orange-600 h-6 w-6 rounded-full text-center'>2</p>
               <div className='h-1 md:w-32 w-14 bg-orange-600 rounded'></div>
               <p className='text-white bg-orange-600 h-6 w-6 rounded-full text-center'>3</p>
               <div className='h-1 md:w-32 w-14 bg-orange-600 rounded'></div>
               <p className='text-white bg-orange-600 h-6 w-6 rounded-full text-center'>4</p>
             </div>
             <hr  className='mt-4 ml-5 mr-5'/>
             <div className='pt-4 pl-3 '>
               <h1 className='font-bold text-2xl pb-2'>Review and Confirm</h1>
               <p className='text-xs text-gray-300'>Please review your information to make sure everything is accurate</p>
             </div>

             <div className='grid md:grid-cols-3 grid-cols-1 gap-4 md:gap-2 mb-4 pl-4 pr-4 pt-6'>
              
              <div className='bg-gray-300 w-64 md:w-[auto] pl-2 pt-1 pb-1 rounded-xl'>
                <p>Full Name</p>
                <p className='font-bold'>{formData.name}</p>
              </div>
              <div className=' md:-ml-0 bg-gray-300 pt-1 pb-1 rounded-xl pl-2 w-64 md:w-[auto]'>
               <p>Email Address</p>
               <p className='font-bold'>{formData.email}</p>
              </div>
              <div className='bg-gray-300  pl-3 pt-1 pb-1 rounded-xl w-64 md:w-[auto]'>
                <p>Phone Number</p>
                <p className='font-bold'>{formData.phone}</p>
              </div> 
             
              <div className=' md:-ml-0 bg-gray-300 pt-1 pb-1 pl-2 rounded-xl w-64 md:w-[auto]'>
                <p>Portfolio/GitHub Link</p>
                <p className='font-bold'>{formData.github}</p>
              </div>
              <div className='bg-gray-300  pl-2 pt-1 pb-1 rounded-xl w-64 md:w-[auto]'>
                <p>Skill Level</p>
                <p className='font-bold'>{formData.selectedOption}</p>
              </div>
              <div className=' md:-ml-0 bg-gray-300 pl-2 pt-1 pb-1 rounded-xl w-64 md:w-[auto]'>
                <p>Challenge Preference</p>
                <p className='font-bold'>{formData.selectedOptionPage3}</p>
              </div>
              
             </div>

 
             <hr  className='mt-4 ml-5 mr-5'/>
             <div className='flex flex-row items-center justify-between pl-10 pr-10 pt-3'>
                <button onClick={handleBack} className='w-24 h-10 border border-orange-600 rounded-xl text-orange-600'>Go Back</button>
                <button type='submit'  className='w-24 h-10 border bg-orange-600 rounded-xl text-white'>Submit</button>
             </div>

           </div>
        )}


       
        </form>
      )}

    </div>
  );
}

export default App;
