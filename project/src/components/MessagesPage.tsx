import React, { useEffect, useState } from 'react';
import { MockAPI } from '../services/mockApi';

export function MessagesPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    MockAPI.getChatRooms().then((data) => {
      setRooms(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Messages</h1>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          <span className="ml-4 text-white text-lg">Loading chat rooms...</span>
        </div>
      ) : rooms.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-8 shadow text-white text-center">
          <p className="text-lg">No chat rooms found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rooms.map((room) => (
            <div key={room.id} className="bg-gray-800 rounded-xl p-5 shadow text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-xl font-semibold mb-1">{room.name}</div>
                <div className="text-gray-400 text-sm mb-1">{room.description}</div>
                <div className="text-xs text-gray-400">{room.members} members • {room.category}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-300 font-medium">{room.lastMessage}</div>
                <div className="text-xs text-gray-400">{room.lastMessageTime}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 