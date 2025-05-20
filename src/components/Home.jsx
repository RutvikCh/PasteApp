// import React, { useEffect, useState } from 'react'
// import { useSearchParams } from "react-router-dom";
// import {useDispatch, useSelector} from 'react-redux'
// import { addToPastes, updateToPastes } from '../features/pasteSlice';


// const Home = () => {

//     const [title, setTitle] = useState('');
//     const [value, setValue] = useState('');
//     const [searchParams, setSearchParams] = useSearchParams();
//     const pasteId = searchParams.get("pasteId");
//     const dispatch = useDispatch();
//     const allPaste = useSelector((state)=>state.paste.pastes);

//     useEffect(()=>{
//         if(pasteId){
//             const paste = allPaste.find((p)=>p?._id === pasteId);
//             setTitle(paste.title);
//             setValue(paste.content);
//         }
//     },[pasteId])

//     function createPaste(){
//         const paste = {
//             title : title,
//             content : value,
//             _id : pasteId ||
//                 Date.now().toString(36),
//             createAt:new Date().toISOString(),
//         }

//         if(pasteId){
//             //update function
//             dispatch(updateToPastes(paste));
//         }
//         else{
//             //create function
//             dispatch(addToPastes(paste));
//         }

//         setTitle('');
//         setValue('');
//         setSearchParams({});
//     }

//   return (
//     <div className='w-full '>
//         <div className='flex flex-col  items-center w-full'> 
//             <div className='flex flex-row place-content-evenly gap-7 p-2 mt-5'>
//                 <input className='rounded-2xl bg-gray-800 text-white w-[600px]  pl-3 '
//                 type="text" 
//                 placeholder='Give Title to paste'
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}/>

//                 <button className='  bg-gray-800 text-white rounded-2xl p-2 w-[150px]'
//                 onClick={createPaste}>
//                     {
//                         pasteId ? "Update Paste" : "Create Paste"
//                     } 
//                 </button>
//             </div>
//             <div className=' rounded-2xl mt-5'>
//                 <textarea 
//                 className='h-[550px] rounded-2xl bg-gray-800 text-white w-[800px] pl-5 '
//                  value={value}
//                  onChange={(e)=>setValue(e.target.value)}
//                  placeholder='enter text here'
//                  rows={20}
//                 />
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Home

import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { addToPastes, updateToPastes } from '../features/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPaste = useSelector((state)=>state.paste.pastes);

    useEffect(()=>{
        if(pasteId){
            const paste = allPaste.find((p)=>p?._id === pasteId);
            setTitle(paste?.title || '');
            setValue(paste?.content || '');
        }
    },[pasteId]);

    function createPaste(){
        const existingPaste = allPaste.find((p) => p?._id === pasteId);
    
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: existingPaste?.createdAt || new Date().toISOString()
        };

        pasteId ? dispatch(updateToPastes(paste)) : dispatch(addToPastes(paste));

        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-5">
            <div className="flex flex-col items-center w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-gray-700">
                <div className="flex flex-row gap-5 w-full">
                    <input
                        className="flex-1 rounded-xl bg-gray-700 text-white p-3 outline-none shadow-md focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                        type="text" 
                        placeholder="Give Title to paste"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                        className="bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl px-5 py-3 shadow-md transition-transform transform hover:scale-105"
                        onClick={createPaste}
                    >
                        {pasteId ? "Update Paste" : "Create Paste"}
                    </button>
                </div>
                <textarea
                    className="w-full h-[500px] mt-5 rounded-xl bg-gray-700 text-white p-4 shadow-md resize-none focus:ring-2 focus:ring-purple-400 outline-none transition-all duration-300"
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}
                    placeholder="Enter text here..."
                    rows={20}
                />
            </div>
        </div>
    );
}

export default Home;
