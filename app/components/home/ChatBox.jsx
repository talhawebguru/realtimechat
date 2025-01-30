"use client";
import React, { useState, useEffect, useRef } from 'react';
import { addDoc, collection, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import MessagesList from './MessagesList';
import TypingIndicator from './TypingIndicator';
import ActiveUsers from './ActiveUsers';
import Header from "@/app/components/common/Header"

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);

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
        readBy: [],
      });
      setMessage('');
      setIsTyping(false);
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  const handleTypingChange = (e) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden ">
      <div className="flex-none">
        <Header />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 p-5 dark:bg-gray-800 border">
          <h1 className="text-xl font-normal font-sans">Messages List</h1>
          <ActiveUsers />
        </div>
        <div className="flex-1 flex flex-col bg-gray-300 dark:bg-gray-800">
          <div className="flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-500 dark:scrollbar-track-gray-800  p-4">
            <MessagesList user={user} />
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4">
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
    </div>
  );
};

export default ChatBox;