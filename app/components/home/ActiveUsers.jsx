import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { FaCircle } from 'react-icons/fa';

const ActiveUsers = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      let total = 0;
      querySnapshot.forEach((doc) => {
        total += 1;
        if (doc.data().isOnline) {
          users.push(doc.data());
        }
      });
      setActiveUsers(users);
      setTotalUsers(total);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 bg-white dark:bg-blue-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Users</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Total Users: {totalUsers}</p>
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