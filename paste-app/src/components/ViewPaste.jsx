// import React, { useEffect, useState } from 'react'
// import { useParams, useSearchParams } from "react-router-dom";
// import {useDispatch, useSelector} from 'react-redux'
// import { addToPastes, updateToPastes } from '../features/pasteSlice';

// const ViewPaste = () => {

// //   const {id} = useParams();
//   const { pasteId } = useParams();
//   console.log("Extracted pasteId:", pasteId);
  
//   const allPaste = useSelector((state)=>state.paste.pastes);

//   const paste = allPaste.filter((p)=>p._id === pasteId)[0];
//   console.log("final paste",paste);

//   return (
//     <div className='w-full '>
//       <div className='flex flex-col  items-center w-full max-w-[800px]'> 
//           <div className='flex flex-row place-content-evenly gap-7 mt-5'>
//               <input className='text-white bg-gray-800 p-2 rounded-2xl w-[600px] border-2 pl-3 '
//               type="text" 
//               placeholder='Give Title to paste'
//               value={paste.title}
//               disabled
//               onChange={(e) => setTitle(e.target.value)}/>

//               {/* <button className='text-white bg-gray-800 border-2 rounded-2xl w-[150px]'
//               onClick={createPaste}>
//                   {
//                       pasteId ? "Update Paste" : "Create Paste"
//                   } 
//               </button> */}
//           </div>
//           <div className=' text-white rounded-2xl mt-5'>
//               <textarea 
//               className='h-[550px] border-2 bg-gray-800 w-[800px] text-white pl-5 '
//               value={paste.content}
//               disabled
//               onChange={(e)=>setValue(e.target.value)}
//               placeholder='enter text here'
//               rows={20}
//               />
//           </div>
//       </div>
//   </div>
//   )
// }

// export default ViewPaste


import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

const ViewPaste = () => {
  const { pasteId } = useParams();
  console.log("Extracted pasteId:", pasteId);

  const allPaste = useSelector((state) => state.paste.pastes);
  const paste = allPaste.find((p) => p._id === pasteId);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-5">
      <div className="flex flex-col items-center w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-gray-700">
        
        <input
          className="w-full rounded-xl bg-gray-700 text-white p-3 outline-none shadow-md focus:ring-2 focus:ring-purple-400 transition-all duration-300"
          type="text"
          placeholder="Give Title to paste"
          value={paste?.title || ''}
          disabled
        />

        <textarea
          className="w-full h-[500px] mt-5 rounded-xl bg-gray-700 text-white p-4 shadow-md resize-none outline-none transition-all duration-300"
          value={paste?.content || ''}
          disabled
          rows={20}
        />

        <div className="text-sm text-gray-400 mt-4">{paste?.createAt}</div>
      </div>
    </div>
  );
};

export default ViewPaste;
