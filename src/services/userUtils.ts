import api from './api';

export interface User {
  id: string;
  email: string;
  name: string;
  age: string;
}

export async function getUsers(setLoading: React.Dispatch<React.SetStateAction<boolean>>, setUsers: React.Dispatch<React.SetStateAction<User[]>>) {
  setLoading(true);
  try {
    const response = await api.get<User[]>('/usuarios');
    setUsers(response.data);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  } finally {
    setLoading(false);
  }
}

export async function createUsers(
  inputName: React.RefObject<HTMLInputElement>,
  inputAge: React.RefObject<HTMLInputElement>,
  inputEmail: React.RefObject<HTMLInputElement>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  getUsers: () => Promise<void>
) {
  if (!(inputName.current?.value && inputEmail.current?.value && inputAge.current?.value)) {
    if (inputName.current) inputName.current.value = '';
    if (inputEmail.current) inputEmail.current.value = '';
    if (inputAge.current) inputAge.current.value = '';
    return;
  }
  try {
    setLoading(true);
    await api.post('/usuarios', {
      name: inputName.current?.value,
      age: inputAge.current?.value,
      email: inputEmail.current?.value,
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  } finally {
    if (inputName.current) inputName.current.value = '';
    if (inputEmail.current) inputEmail.current.value = '';
    if (inputAge.current) inputAge.current.value = '';
    getUsers();
    setLoading(false);
  }
}

export   async function DelUsers(id:string,   setLoading: React.Dispatch<React.SetStateAction<boolean>>,   getUsers: () => Promise<void>) {
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
