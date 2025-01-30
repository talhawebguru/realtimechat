import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import MessageBubble from './MessageBubble';

const MessagesList = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

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
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeMessages();
    };
  }, []);

  return (
    <div className="overflow-y-scroll h-[85vh] p-4 dark:bg-gray-800">
      {messages.map((message) => (
        <div key={message.id} className="mb-4">
          <MessageBubble
            text={message.text}
            senderName={users[message.senderID]?.name || users[message.senderID]?.email || 'Unknown'}
            timestamp={message.timestamp?.toDate().toLocaleString()}
            readBy={message.readBy}
            isOwnMessage={user && message.senderID === user.uid}
          />
        </div>
      ))}
    </div>
  );
};

export default MessagesList;