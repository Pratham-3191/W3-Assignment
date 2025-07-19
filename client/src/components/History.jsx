import React from "react";

const History = ({ history, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">🕓 Claim History</h2>

      <div className="overflow-auto max-h-64 bg-gray-50 rounded-lg">
        {Array.isArray(history) && history.length > 0 ? (
          history.map((entry) => (
            <div
              key={entry._id}
              className="flex items-center justify-between px-4 py-3 border-t border-gray-200"
            >
              {/* Name and Avatar */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-orange-600">
                  {entry.userName[0]}
                </div>
                <p className="text-sm font-semibold">{entry.userName}</p>
              </div>

              {/* Points */}
              <div className="text-sm font-bold text-pink-600 text-center">
                +{entry.points}
              </div>

              {/* Time */}
              <div className="text-xs text-gray-500">
                {new Date(entry.claimedAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">No history yet.</p>
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ⬅ Prev
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default History;
