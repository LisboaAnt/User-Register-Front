import { useState, useEffect, useRef } from 'react'
import './App.css'
import { FaSpinner } from 'react-icons/fa'; 
import Usuario from './components/Usuarios';
import ModalCadUsarios from './components/ModalCadUsarios';
import { getUsers, createUsers, DelUsers, User } from './services/userUtils';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const inputName = useRef<HTMLInputElement>(null);
  const inputAge = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getUsers(setLoading, setUsers);
  }, []);

  return (
    <div>
      {loading && (
        <div className="loading-overlay">
          <FaSpinner className="animate-spin text-white text-3xl" />
        </div>
      )}
    <main>
      <ModalCadUsarios
      createUsers={() => createUsers(inputName, inputAge, inputEmail, setLoading, () => getUsers(setLoading, setUsers))}
      inputName={inputName} 
      inputAge={inputAge} 
      inputEmail={inputEmail} />

      <Usuario
      users= {users}
      DelUsers={(id) => DelUsers(id, setLoading, () => getUsers(setLoading, setUsers))}
      />
    </main>
    </div>
  )
}

export default App
