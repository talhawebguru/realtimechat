"use client";
import React, { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import MessagesList from './MessagesList';
import TypingIndicator from './TypingIndicator';
import ActiveUsers from './ActiveUsers';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleTyping = async () => {
      if (user) {
        await updateDoc(doc(db, 'typingStatus', user.uid), {
          isTyping: isTyping,
        });
      }
    };

    handleTyping();
  }, [isTyping, user]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '' || !user) return;

    try {
      await addDoc(collection(db, 'messages'), {
        text: message,
        senderID: user.uid,
        timestamp: serverTimestamp(),
        isTyping: false,
        readBy: [],
      });
      setMessage('');
      setIsTyping(false);
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  const handleTypingChange = (e) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  return (
    <div className="container mx-auto px-4 max-h-[calc(100vh-86px)] overflow-x-hidden">
      <div className="grid grid-cols-12 gap-4 max-h-full dark:bg-gray-800 border">
        <div className="col-span-3 p-5 dark:bg-gray-800 border">
          <h1 className="w-32 text-black text-xl font-normal font-sans">Messages List</h1>
          <ActiveUsers />
        </div>
        <div className="col-span-9 bg-gray-300 dark:bg-gray-800 w-full flex flex-col justify-end ">
          <MessagesList />
          <TypingIndicator />
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Type a message"
              value={message}
              onChange={handleTypingChange}
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md ml-2">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;