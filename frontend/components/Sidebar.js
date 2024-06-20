import React from 'react';
import Link from 'next/link';

const Sidebar = ({ isVisible, toggleSidebar }) => {
  return (
    <div className={`fixed inset-y-0 left-0 transform ${isVisible ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out w-64 bg-gray-800 text-white shadow-md`}>
      <button onClick={toggleSidebar} className={`absolute top-2 right-0 transform ${isVisible ?  '' : 'translate-x-full'} p-2 bg-gray-800 text-white shadow-md rounded-r-md`}>
        {isVisible ? '<<' : '>>'}
      </button>
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
