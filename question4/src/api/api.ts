import axios from 'axios'


const request = axios.create()


interface Props{
  id?: string;
  user?: string;
  email?: string;
  password?: string;
}

export const getUsers = () => (request.get('http://127.0.0.1:8080/users/')).then((res) => res.data);

export const getSingleUser = async (id:string) => request.get(`http://127.0.0.1:8080/users/${id}`).then((res) => res.data);

export const deleteUsers = async (id:string) => request.delete(`http://127.0.0.1:8080/users/${id}`).then((res) => res.data);

export const createUsers = async (props:Props) => request.post('http://127.0.0.1:8080/users/', {
  username: props.user,
  email: props.email,
  password: props.password,
}).then((res) => res.data);

export const updateUsers = async (props:Props) => request.put(`http://127.0.0.1:8080/users/${props.id}`, {
  username: props.user,
  email: props.email,
  password: props.password,
}).then((res) => res.data);