import { useState } from 'react';
import './App.css';
import UserTable from './components/usertable';

//import uuid after install it with "npm i uuidv4"
import  {v4 as uuidv4 } from 'uuid';

import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';

function App() {

  const userData = [
    {id: uuidv4(), name: 'Fuancho', username: 'theriper'},
    {id: uuidv4(), name: 'Alma', username: 'Fear2'},
    {id: uuidv4(), name: 'Lia', username: 'Catherine2'}
    ]

//state
    const [users, setUsers] = useState(userData); 

//Add user
    const AddUser = (user) => {
      user.id = uuidv4()
      setUsers([
        ...users,
        user
      ])
    }

    //Delete users
    const DeleteUser = (id) => {
      //console.log(id)
      //We filter the id, if is equal, delete it
      setUsers(users.filter(user => user.id !== id)) 
    }

    //Edit users
    const [editing, setEditing] = useState(false);

    const [currentUser, setCurrentUser] = useState(
      {
        id: null,
        name: '',
        username: ''
      }
    );

    const editRow = (user) => {
      setEditing(true)
      setCurrentUser(
      {
        id: user.id, 
        name: user.name, 
        username: user.username
      }
      )
    }

    //actualize
    const updateUser = (id, updateUser) => {
      setEditing(false);

        //Takes a tour of users, if user.id is = updateUser so update
      setUsers(users.map(user => (user.id === id ? updateUser : user)))
    }


    //The condition in the third div is to validate if user clicks on edit o add button, then run the function
  return (
    <div className="container">
      <h1>CRUD app</h1>
      <div className="flex-row">
          <div className="flex-large">

            {
              editing ? (
                <div>
                  <h2>Edit User</h2>
                  <EditUserForm 
                  currentUser={ currentUser }
                  updateUser={updateUser}
                  />
                </div>
              ) : (
                <div>
                  <h2>Add user</h2>
                  <AddUserForm AddUser={AddUser}/>
                </div>
              )
            }       

            </div> 
            
          <div className="flex-large">
            <h2>View Users</h2>
            <UserTable 
            users={users} 
            DeleteUser={DeleteUser}
            setEditing={setEditing}
            editRow={editRow}
            />
          </div>
      </div>
    </div>
  );
}

export default App;
