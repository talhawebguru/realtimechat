import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { FaCircle } from 'react-icons/fa';

const ActiveUsers = () => {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().isOnline) {
          users.push(doc.data());
        }
      });
      setActiveUsers(users);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 light:bg-white dark:bg-blue-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Users</h2>
      <ul className="space-y-4">
        {activeUsers.map((user, index) => (
          <li key={index} className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={`https://i.pravatar.cc/150?u=${user.uid}`}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <FaCircle className="absolute bottom-0 right-0 text-green-500 w-3 h-3" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveUsers;