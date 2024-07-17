import React, { RefObject } from 'react';

interface ModalCadUsariosProps {
  createUsers: () => void;
  inputName: RefObject<HTMLInputElement>;
  inputAge: RefObject<HTMLInputElement>;
  inputEmail: RefObject<HTMLInputElement>;
}

const ModalCadUsarios: React.FC<ModalCadUsariosProps> = ({ createUsers, inputName, inputAge, inputEmail }) => {
  return (
    <form className="flex flex-col gap-6 p-5 bg-gray-800 max-w-lg mb-10 mx-auto rounded-lg bg-opacity-85 text-white">
      <h1 className="text-center text-3xl p-2">Cadastrar Usuários</h1>
      <div className="flex flex-col gap-6">
        <input
          className="p-4 rounded-xl border border-gray-700 focus:outline-none focus:border-blue-500 bg-white bg-opacity-5"
          name="nome"
          type="text"
          placeholder="Nome"
          ref={inputName}
        />
        <input
          className="p-4 rounded-xl border border-gray-700 focus:outline-none focus:border-blue-500 bg-white bg-opacity-5"
          name="idade"
          type="text"
          placeholder="Idade"
          ref={inputAge}
        />
        <input
          className="p-4 rounded-xl border border-gray-700 focus:outline-none focus:border-blue-500 bg-white bg-opacity-5"
          name="email"
          type="email"
          placeholder="Email"
          ref={inputEmail}
        />
        <button
          className="p-4 bg-pcolor-200 text-white rounded-xl hover:bg-pcolor-500 transition-colors"
          type="button"
          onClick={createUsers}
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
};

export default ModalCadUsarios;
