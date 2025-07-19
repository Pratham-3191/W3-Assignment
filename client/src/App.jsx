import React, { useEffect, useState } from "react";
import axios from "axios";
import Leaderboard from "./components/Leaderboard";
import UserSelector from "./components/UserSelector";
import History from "./components/History";
import LiveRank from "./components/LiveRank";

const App = () => {
  const API = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [randomPoints, setRandomPoints] = useState(null);
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userTotalPages, setUserTotalPages] = useState(1);
  const [userPage, setUserPage] = useState(1);
    const [allUsers, setAllUsers] = useState([]);

  // ⬇ Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8; // entries per page\

  

  const fetchUsers = async (page = 1) => {
  const res = await axios.get(`${API}/api/leaderboard?page=${page}&limit=${limit}`);
  setUsers(res.data.data);
  setUserTotalPages(res.data.totalPages); 
  setUserPage(res.data.currentPage);
};

const fetchAllUsers = async () => {
      const res = await axios.get(`${API}/api/users/all`); // A new endpoint without pagination
      setAllUsers(res.data); // should be array of all users
    };


  const fetchHistory = async (currentPage = 1) => {
    const res = await axios.get(`${API}/api/history?page=${currentPage}&limit=${limit}`);
    setHistory(res.data.data);
    setTotalPages(res.data.totalPages);
  };

  const handleClaim = async () => {
    if (!selectedUserId) return alert("Please select a user.");
    const res = await axios.post(`${API}/api/claim/${selectedUserId}`);
    setRandomPoints(res.data.points);
    await fetchUsers();
    await fetchHistory(page); // refresh current page
  };

  const handleAddUser = async (name) => {
    await axios.post(`${API}/api/users`, { name });
    await fetchUsers();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchHistory(newPage);
  };
  

const handleUserPageChange = (newPage) => {
  if (newPage < 1 || newPage > userTotalPages) return;
  fetchUsers(newPage);
};

  useEffect(() => {
  fetchUsers();
  fetchHistory(page);
  fetchAllUsers();
}, [page]);  // page-dependent


  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🏆 Leaderboard App</h1>

      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 mb-6">
        <UserSelector
          users={filteredUsers}
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
          onAddUser={handleAddUser}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <button
          onClick={handleClaim}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl mt-4 hover:bg-blue-700 transition"
        >
          Claim Points
        </button>

        {randomPoints !== null && (
          <p className="text-green-600 mt-3 text-lg">
            🎉 {randomPoints} points awarded!
          </p>
        )}
      </div>

      <LiveRank users={allUsers} />
      <Leaderboard
  users={users}
  currentPage={userPage}
  totalPages={userTotalPages}
  onPageChange={handleUserPageChange}
/>


      <History
        history={history}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
