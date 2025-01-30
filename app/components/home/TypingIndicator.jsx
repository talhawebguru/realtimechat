import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const TypingIndicator = () => {
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'typingStatus'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().isTyping) {
          users.push(doc.id);
        }
      });
      setTypingUsers(users);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-2">
      {typingUsers.length > 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {typingUsers.join(', ')} {typingUsers.length > 1 ? 'are' : 'is'} typing...
        </p>
      )}
    </div>
  );
};

export default TypingIndicator;