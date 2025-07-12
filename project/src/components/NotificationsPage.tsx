import React from 'react';
import { dummyNotifications } from '../services/dummyData';

export function NotificationsPage() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Notifications</h1>
      <div className="space-y-4">
        {dummyNotifications.map((n) => (
          <div key={n.id} className="bg-gray-800 rounded-xl p-4 shadow text-white">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{n.icon}</span>
              <div>
                <div className="font-semibold">{n.message}</div>
                <div className="text-xs text-gray-400">{n.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 