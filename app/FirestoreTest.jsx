"use client"
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const addTestMessage = async () => {
  try {
    await addDoc(collection(db, "messages"), {
      text: "Hello, Firebase!",
      createdAt: new Date(),
    });
    console.log("Message added!");
  } catch (error) {
    console.error("Error adding message: ", error);
  }
};

function FirestoreTest() {
  return (
    <div>
      <button onClick={addTestMessage}>Add Test Message</button>
    </div>
  );
}

export default FirestoreTest;
