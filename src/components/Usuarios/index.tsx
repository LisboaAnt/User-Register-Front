import React from 'react';
import { FaTrashAlt } from "react-icons/fa";

// Definição da interface do usuário
interface Usuario {
  id: string;
  name: string;
  age: string;
  email: string;
}

// Definição das propriedades do componente
interface UsuarioProps {
  users: Usuario[];
  DelUsers: (id: string ) => void;
}

const Usuario: React.FC<UsuarioProps> = ({ users, DelUsers }) => {
  return (
    <div className='container mx-auto p-5'>
      {users.map((usuario, index) => (
        <div key={index} className='bg-gray-800 bg-opacity-75 p-5 rounded-lg mb-5 max-w-lg mx-auto flex'>
          <div className="flex flex-col gap-2 w-auto text-left mr-auto">
            <p className='text-white'>Nome: <span className='text-lg pl-2'>{usuario.name}</span></p>
            <p className='text-white'>Idade: <span className='text-lg pl-2'>{usuario.age}</span></p>
            <p className='text-white'>Email: <span className='text-lg pl-2'>{usuario.email}</span></p>
          </div>
          <button className='mt-2 px-6 p-2 text-white rounded hover:text-red-700 transition-colors' onClick={() => { DelUsers(usuario.id) }}>
            <FaTrashAlt size={24} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Usuario;
