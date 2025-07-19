import React, { useState } from "react";

const UserSelector = ({ users, selectedUserId, setSelectedUserId, onAddUser }) => {
  const [newUser, setNewUser] = useState("");

  const handleAdd = () => {
    if (!newUser.trim()) return;
    onAddUser(newUser);
    setNewUser("");
  };

  return (
    <div>
      <label className="block mb-2 font-medium">Select a User:</label>
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        className="w-full border rounded-xl p-2 mb-4"
      >
        <option value="">-- Select User --</option>
        {Array.isArray(users) &&
  users.map((user) => (
    <option key={user._id} value={user._id}>
      {user.name}
    </option>
  ))}

      </select>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add new user"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          className="flex-1 border rounded-xl p-2"
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 rounded-xl hover:bg-green-700 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default UserSelector;
