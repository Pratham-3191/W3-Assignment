import React from "react";

const LiveRank = ({ users }) => {
  const sorted = [...users].sort((a, b) => b.totalPoints - a.totalPoints);

  const topThree = sorted.slice(0, 3);
  const others = sorted.slice(3);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 mb-10">
      <h2 className="text-2xl font-bold text-center mb-6">🏆 Live Ranking</h2>

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end gap-4 mb-6">
        {topThree.map((user, i) => (
          <div
            key={user._id}
            className={`flex flex-col items-center justify-end p-3 rounded-xl ${
              i === 1 ? "order-1 h-40" : i === 0 ? "order-2 h-48" : "order-3 h-36"
            } bg-gradient-to-br from-yellow-100 to-yellow-50 shadow-md w-24`}
          >
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 border-2 border-yellow-400 flex items-center justify-center text-lg font-bold">
              {user?.name?.[0]}
            </div>
            <div className="text-sm font-medium text-gray-800 text-center">
              {user.name}
            </div>
            <div className="text-xs text-yellow-600">{medals[i]}</div>
            <div className="text-sm font-bold text-pink-600 mt-1">{user?.totalPoints?.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveRank;
