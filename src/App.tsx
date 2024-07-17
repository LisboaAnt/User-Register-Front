import { useState, useEffect, useRef } from 'react'
import './App.css'
import { FaTrashAlt } from "react-icons/fa";
import api from './services/api'
import { FaSpinner } from 'react-icons/fa'; 

interface User {
  id: string;
  email: string;
  name: string;
  age: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const inputName = useRef<HTMLInputElement>(null);
  const inputAge = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);

  async function getUsers() {
    setLoading(true);
    try {
      const response = await api.get<User[]>('/usuarios');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally{
      setLoading(false);
    }
  }

  async function createUsers() {
    if (!(inputName.current?.value && inputEmail.current?.value && inputAge.current?.value)) {
      if (inputName.current) inputName.current.value = '';
      if (inputEmail.current) inputEmail.current.value = '';
      if (inputAge.current) inputAge.current.value = '';
      
      return;
    }
    try {
      setLoading(true);
      await api.post('/usuarios',{
        name: inputName.current?.value,
        age: inputAge.current?.value,
        email: inputName.current?.value,
      })
      
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally{
      if (inputName.current) inputName.current.value = '';
      if (inputEmail.current) inputEmail.current.value = '';
      if (inputAge.current) inputAge.current.value = '';
      getUsers()
      setLoading(false);
    }
  }

  async function DelUsers(id:string) {
    try {
      setLoading(true);
      await api.delete<User[]>('/usuarios/'+id);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally{
      getUsers()
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <main>
            {loading && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <FaSpinner className="animate-spin text-white text-3xl" />
        </div>
      )}
      <form className='flex flex-col gap-6 p-5 bg-gray-800 max-w-lg mb-10 mx-auto rounded-lg bg-opacity-85 text-white'>
        <h1 className='text-center text-3xl'>Cadastrar Usuários</h1>
        <div className='flex flex-col gap-6'>
            <input
              className='p-4 rounded-xl border border-gray-700 focus:outline-none focus:border-blue-500 bg-white bg-opacity-5'
              name='nome'
              type='text'
              placeholder='Nome'
              ref={inputName} />
            <input
              className='p-4 rounded-xl border border-gray-700 focus:outline-none focus:border-blue-500  bg-white bg-opacity-5'
              name='idade'
              type='text'
              placeholder='Idade'
              ref={inputAge}
            />
            <input
              className='p-4 rounded-xl border border-gray-700 focus:outline-none focus:border-blue-500  bg-white bg-opacity-5'
              name='email'
              type='email'
              placeholder='Email'
              ref={inputEmail}
            />
            <button
              className='p-4 bg-pcolor-200 text-white rounded-xl hover:bg-pcolor-500 transition-colors'
              type='button'
              onClick={()=>{createUsers()}}
            >
              Cadastrar
            </button>
          </div>
        </form>

        <div className='container mx-auto p-5'>
      {users.map((usuario, index) => (
        <div key={index} className='bg-gray-800 bg-opacity-75 p-5 rounded-lg mb-5 max-w-lg mx-auto flex'>
          <div className="flex flex-col gap-2 w-auto text-left mr-auto">
            <p className='text-white'>Nome: <span className='text-lg pl-2'>{usuario.name}</span></p>
            <p className='text-white'>Idade: <span className='text-lg pl-2'>{usuario.age}</span></p>
            <p className='text-white'>Email: <span className='text-lg pl-2'>{usuario.email}</span></p>
          </div>
          <button className=' mt-2 px-6 p-2 text-white rounded hover:text-red-700 transition-colors' onClick={()=>{DelUsers(usuario.id)}}>
            <FaTrashAlt size={24}/>
          </button>
        </div>
      ))}
    </div>
    </main>
  )
}

export default App
