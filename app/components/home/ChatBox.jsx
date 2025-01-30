import React from 'react'

const ChatBox = () => {
  return (
    <>
        <div className='container mx-auto px-4 bg-[--foreground] '>
            <div className='grid grid-cols-12 gap-4 h-[80vh]'>
                    <div className='col-span-3 p-5'>
                            <h1 className="w-32 text-black text-xl font-normal font-sans">Messages List</h1>
                    </div>
                    <div className='col-span-9 bg-gray-300 w-full flex justify-start items-end h-full' >
                        <input type="text" className="w-full p-2 border rounded-md" placeholder="Type a message"/>
                    </div>
            </div>
        </div>
    </>
  )
}

export default ChatBox