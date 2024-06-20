import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
    return (
        <div className="w-64 h-full shadow-md bg-white absolute">
            <div className="p-4">
                <h2 className="text-2xl font-bold">サイドバー</h2>
            </div>
            <ul className="relative">
                <li className="relative">
                    <Link href="/dashboard">
                        <span className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">
                            ダッシュボード
                        </span>
                    </Link>
                </li>
                <li className="relative">
                    <Link href="#">
                        <span className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">
                            プロフィール
                        </span>
                    </Link>
                </li>
                <li className="relative">
                    <Link href="#">
                        <span className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">
                            設定
                        </span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;