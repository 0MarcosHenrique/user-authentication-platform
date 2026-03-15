import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react'
import Trash from '../../assets/trash.svg';
import api from '../../services/api'
import "./style.css";

function Home() {
const [users, setUsers] = useState([]);

const inputName = useRef()
const inputAge = useRef()
const inputEmail = useRef()
const inputPassword = useRef()
  

 async function getUsers(){
    const usersFromApi = await api.get('/users')

    setUsers(usersFromApi.data)
  }

 async function createUsers(){

    await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
      password: inputPassword.current.value,
    })

    getUsers()
  }

 async function deleteUsers(id){
    await api.delete(`/users/${id}`)

    getUsers()

  }

  useEffect(() => {
      getUsers()
    }, []);

  return (
    <div className="container">
      <form>
        <h1>User Registration</h1>
        <input placeholder="Enter your name..." name="name" type="text" ref={inputName} />
        <input placeholder='Enter your age...' name="age" type="number" ref={inputAge}/>
        <input placeholder='Enter your email...' name="email" type="email" ref={inputEmail}/>
        <input placeholder='Enter your password...' name="password" type="password" ref={inputPassword}/>
        <button type="button" onClick={createUsers}>Register</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Name: <span>{user.name}</span></p>
            <p>Email: <span>{user.email}</span></p>
            <p>Password: <span>{user.password}</span></p>
            <p>Age: <span>{user.age}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="Trash-icon" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
