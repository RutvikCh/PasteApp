// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { removeFromPastes } from '../features/pasteSlice';
// import toast from 'react-hot-toast';

// const Paste = () => {

//   const pastes = useSelector((state) => state.paste.pastes) || [];
//   console.log(pastes);

//   const [searchTerm, setSearchTerm] = useState('');

//   const dispatch = useDispatch();

//   const filterData = pastes.filter((paste)=>paste.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()));

//   function handleDelete(pasteId){
//     dispatch(removeFromPastes(pasteId));
//   }

//   return (
//     <div className='w-full flex flex-col  items-center'>
//         <input
//         className='p-2 min-w-[600px] mt-5 text-white  bg-gray-800 rounded-2xl' 
//         type='search'
//         value={searchTerm}
//         placeholder='Search your Paste here' 
//         onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <div className='flex flex-col gap-7 p-2 mt-5 rounded-2xl max-w-[800px] min-h-[800px] bg-gray-800'>
//             {
//               filterData.length > 0 && 
//                 filterData.map(
//                   (paste) =>{
//                     return(
//                       <div className='bg-gray-800 text-white p-4 rounded-lg shadow-md transition transform hover:scale-105 ' key={paste?._id}>   
//                         <div>
//                           {paste.title}
//                         </div>
//                         <div className='overflow-hidden text-ellipsis line-clamp-3'>
//                           {paste.content}
//                         </div>
//                         <div className='flex flex-row place-content-evenly gap-15'>
//                           <button className='px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm'>
//                             <a href={`/?pasteId=${paste?._id}`}>
//                               Edit
//                             </a>
//                           </button>
//                           <button className='px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm'>
//                             <a href={`/pastes/${paste?._id}`}>
//                               View
//                             </a>
//                           </button>
//                           <button onClick={() => handleDelete(paste?._id)} className='px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm'>
//                             Delete
//                           </button>
//                           <button onClick={()=>{
//                             navigator.clipboard.writeText(paste?.content);
//                             toast("Copied Successfully")
//                           }} className='px-4 py-2 bg-orange-600 hover:bg-orange-400 rounded-lg text-sm'>
//                             Copy
//                           </button>
//                           <button className='px-4 py-2 bg-black hover:bg-gray-950 rounded-lg text-sm'>
//                             Share
//                           </button>
//                         </div>
//                         <div>
//                           {paste.createAt}
//                         </div>
//                       </div>
//                     )
//                   }
//                 )
//             }
//         </div>
//     </div>
//   )
// }

// export default Paste


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../features/pasteSlice';
import toast from 'react-hot-toast';
import { PencilSquareIcon, EyeIcon, TrashIcon, ClipboardDocumentIcon, ShareIcon } from '@heroicons/react/24/solid';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes) || [];
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

      function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true, // Makes it 12-hour format with AM/PM
        });
      }
    function handleShare(paste) {
        const pasteURL = `${window.location.origin}/pastes/${paste._id}`;
      
        if (navigator.share) {
          navigator.share({
            title: paste.title,
            text: paste.content,
            url: pasteURL,
          }).catch(err => console.error("Error sharing:", err));
        } else {
          navigator.clipboard.writeText(pasteURL);
          toast.success("Link copied to clipboard!");
        }
    }
      

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-5">
      <div className="flex flex-col items-center w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-gray-700">
        
        <input
          className="w-full rounded-xl bg-gray-700 text-white p-3 outline-none shadow-md focus:ring-2 focus:ring-purple-400 transition-all duration-300"
          type="search"
          value={searchTerm}
          placeholder="Search your Paste here..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-col gap-5 mt-5 w-full">
          {filterData.length > 0 &&
            filterData.map((paste) => (
              <div
                key={paste?._id}
                className="bg-gray-700 text-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105"
              >
                <div className="text-lg font-bold">{paste.title}</div>
                <div className="overflow-hidden text-ellipsis line-clamp-3 mt-2 text-gray-300">
                  {paste.content}
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <button className="px-4 py-2 bg-green-500 hover:bg-green-400 rounded-lg text-sm shadow-md transition-all flex items-center gap-2">
                    <PencilSquareIcon className="h-5 w-5" />
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg text-sm shadow-md transition-all flex items-center gap-2">
                    <EyeIcon className="h-5 w-5" />
                    <a href={`/pastes/${paste?._id}`}>View</a>
                  </button>
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-400 rounded-lg text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <TrashIcon className="h-5 w-5" />
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied Successfully");
                    }}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-400 rounded-lg text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <ClipboardDocumentIcon className="h-5 w-5" />
                    Copy
                  </button>
                  <button onClick={() => handleShare(paste)} className="px-4 py-2 bg-black hover:bg-gray-800 rounded-lg text-sm shadow-md transition-all flex items-center gap-2">
                    <ShareIcon className="h-5 w-5" />
                    Share
                  </button>
                </div>
                <div className="text-sm text-gray-400 mt-4 text-center">
                  📅 Created on: <span className="font-semibold">{formatDate(paste?.createdAt)}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Paste;
