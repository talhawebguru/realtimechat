import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import MessageBubble from './MessageBubble';

const MessagesList = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = {};
      usersSnapshot.forEach((doc) => {
        usersData[doc.id] = doc.data();
      });
      setUsers(usersData);
    };

    fetchUsers();

    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribeMessages = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        const messageData = doc.data();
        if (user && !messageData.readBy.includes(user.uid)) {
          updateDoc(doc.ref, {
            readBy: [...messageData.readBy, user.uid],
          });
        }
        messages.push({ ...messageData, id: doc.id });
      });
      setMessages(messages);
    });

    return () => {
      unsubscribeMessages();
    };
  }, [user]);

  return (
    <div className="overflow-y-scroll h-[85vh] p-4 dark:bg-gray-800">
      {messages.map((message) => (
        <div key={message.id} className="mb-4">
          <MessageBubble
            text={message.text}
            senderName={users[message.senderID]?.name || users[message.senderID]?.email || 'Unknown'}
            timestamp={message.timestamp?.toDate().toLocaleString()}
            readBy={message.readBy.map(uid => users[uid]?.name || users[uid]?.email || 'Unknown')}
            isOwnMessage={user && message.senderID === user.uid}
          />
        </div>
      ))}
    </div>
  );
};

export default MessagesList;