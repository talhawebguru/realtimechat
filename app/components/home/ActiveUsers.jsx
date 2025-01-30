import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const ActiveUsers = () => {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().isOnline) {
          users.push(doc.data().name);
        }
      });
      setActiveUsers(users);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-2">
      <h2 className="text-lg font-semibold">Active Users</h2>
      <ul>
        {activeUsers.map((user, index) => (
          <li key={index} className="text-sm text-gray-500 dark:text-gray-400">
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveUsers;