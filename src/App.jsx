import { useRef, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";

import PacmanLoader from "react-spinners/PacmanLoader";

const firebaseConfig = {
  apiKey: "AIzaSyBynaykA9csOj-2Nt0XCKvS-kfFVnh2pcg",
  authDomain: "fir-test-c940c.firebaseapp.com",
  projectId: "fir-test-c940c",
  storageBucket: "fir-test-c940c.appspot.com",
  messagingSenderId: "673253296329",
  appId: "1:673253296329:web:e7540bf408a73ae23d6518",
};

function App() {
  const nameInputRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [app] = useState(() => {
    return initializeApp(firebaseConfig);
  });
  const [db] = useState(() => {
    return getFirestore(app);
  });

  async function getTodos() {
    setLoading(true);
    try {
      const todosCol = collection(db, "todos");
      const todoSnapshot = await getDocs(todosCol);
      const todoList = todoSnapshot.docs.map((doc) => doc.data());
      setData(todoList);
      setLoading(false);
      setError(false);
    } catch (e) {
      setError(true);
      setLoading(false);
      console.error("Error adding document: ", e);
    }
  }

  async function addItem(data) {
    try {
      const myCollection = collection(db, "todos");
      await addDoc(myCollection, data);
      setLastUpdate(Date.now());
      setLoading(false);
      setError(false);
    } catch (e) {
      setError(true);
      setLoading(false);
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    getTodos();
  }, [lastUpdate]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const value = nameInputRef.current.value;
    addItem({ id: data.length + 1, name: value });
  };

  return (
    <>
      <h1>Test</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" ref={nameInputRef} />
          <button> Insertar </button>
        </label>
      </form>
      {loading && <PacmanLoader color="#36d7b7" />}
      {error && <div>An error has occurred </div>}
      <ul>
        {data.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
