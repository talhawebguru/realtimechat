import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import MessageBubble from './MessageBubble';

const MessagesList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="overflow-y-scroll h-[85vh] p-4 dark:bg-gray-800">
      {messages.map((message) => (
        <div key={message.id} className="mb-4">
          <MessageBubble date={message.createdAt?.toDate().toLocaleString()} text={message.text} />
        </div>
      ))}
    </div>
  );
};

export default MessagesList;