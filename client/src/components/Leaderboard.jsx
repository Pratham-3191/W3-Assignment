import React from "react";

const Leaderboard = ({ users, currentPage, totalPages, onPageChange }) => {
  const sorted = [...users].sort((a, b) => b.totalPoints - a.totalPoints); // optional, already sorted from backend

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">📊 Leaderboard</h2>

      <div className="bg-gray-50 rounded-lg overflow-hidden">
        {sorted.map((user, i) => (
          <div
            key={user._id}
            className={`flex items-center justify-between px-4 py-3 border-t border-gray-200 ${
              i === 0 ? "bg-yellow-50" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-700 w-5">
                {(currentPage - 1) * 5 + i + 1}
              </span>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-orange-600">
                {user.name[0]}
              </div>
              <p className="text-sm font-semibold">{user.name}</p>
            </div>
            <div className="text-sm font-bold text-pink-600">
              {user.totalPoints.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
         className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium disabled:opacity-50"
        >
          ⬅ Prev
        </button>

        <span className="text-gray-700 ">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
