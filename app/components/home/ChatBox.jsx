"use client";
import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import MessagesList from './MessagesList';

const ChatBox = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    try {
      await addDoc(collection(db, 'messages'), {
        text: message,
        createdAt: serverTimestamp(),
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  return (
    <div className="container mx-auto px-4 max-h-[calc(100vh-86px)] overflow-x-hidden">
      <div className="grid grid-cols-12 gap-4 max-h-full dark:bg-gray-800 border">
        <div className="col-span-3 p-5 dark:bg-gray-800 border">
          <h1 className="w-32 light:text-black text-xl font-normal font-sans">Messages List</h1>
        </div>
        <div className="col-span-9 bg-gray-300 dark:bg-gray-800 w-full flex flex-col justify-end ">
          <MessagesList />          
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md ml-2">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;