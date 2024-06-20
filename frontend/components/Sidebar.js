import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 h-full shadow-md bg-gray-800 text-white fixed">
      <div className="p-4">
        <h2 className="text-2xl font-bold">サイドバー</h2>
      </div>
      <ul className="relative">
        <li className="relative">
          <Link href="/dashboard">
            <span className="block py-2 px-4 text-sm hover:bg-gray-700">
              ダッシュボード
            </span>
          </Link>
        </li>
        <li className="relative">
          <Link href="/profile">
            <span className="block py-2 px-4 text-sm hover:bg-gray-700">
              プロフィール
            </span>
          </Link>
        </li>
        <li className="relative">
          <Link href="/settings">
            <span className="block py-2 px-4 text-sm hover:bg-gray-700">
              設定
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
