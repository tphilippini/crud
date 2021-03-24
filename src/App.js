import React, { useState } from "react";
import UserTable from "./components/UserTable";
import AddUserForm from "./components/forms/AddUserForm";
import EditUserForm from "./components/forms/EditUserForm";

const App = () => {
  const usersData = [
    { id: 1, name: "Carl", username: "dog" },
    { id: 2, name: "Ben", username: "cat" },
    { id: 3, name: "Mike", username: "fish" },
  ];

  const initialFormState = { id: null, name: "", username: "" };
  const [users, setUsers] = useState(usersData);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setEditing(false);
    setUsers(users.filter((user) => user.id !== id));
  };

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  return (
    <div className='container'>
      <h1>CRUD Application running on ReactJS</h1>
      <div className='rows'>
        <div className='row'>
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className='row'>
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
};

export default App;
