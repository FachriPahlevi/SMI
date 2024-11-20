import { usePage, Link } from '@inertiajs/react';
import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import {
    HomeModernIcon,
    UserGroupIcon,
    ClipboardDocumentCheckIcon,
    BanknotesIcon,
    DocumentDuplicateIcon,
    CurrencyDollarIcon,
    Cog8ToothIcon,
    UserIcon,
    ArrowRightEndOnRectangleIcon
} from '@heroicons/react/24/outline';


export default function Sidebar({auth}) {
    const { url } = usePage();
    const menu1 = [
        { name: 'Dashboard', icon: <HomeModernIcon width={18} />, path: '/' },
        { name: 'Siswa', icon: <UserGroupIcon width={18} />, path: '/siswa' },
        { name: 'Laporan', icon: <ClipboardDocumentCheckIcon width={18} />, path: '/laporan' },
        { name: 'Tabungan', icon: <BanknotesIcon width={18} />, path: '/tabungan' },
        { name: 'Daftar Ulang', icon: <DocumentDuplicateIcon width={18} />, path: '/daftar-ulang' },
        { name: 'SPP', icon: <CurrencyDollarIcon width={18} />, path: '/spp' },
        { name: 'Pengaturan', icon: <Cog8ToothIcon width={18} />, path: '/pengaturan' },
        { name: 'User', icon: <UserIcon width={18} />, path: '/user' },
        { name: 'Keluar', icon: <ArrowRightEndOnRectangleIcon width={18} />, onClick: () => Inertia.post(route('logout')) },
    ];

    return (
        <div className="bg-white z-999 text-slate-300 h-full sm:w-64 w-20 fixed top-0 left-0 tracking-wide">
            <div className="flex items-center text-white mx-3 rounded-md p-1 sm:p-2 mt-6">
                <img
                    className="object-cover w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                    src="https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="coba"
                />
                <div className="ml-3 hidden sm:block">
                    <div className="text-md font-bold text-black">{auth?.user?.name}</div>
                    <div className="text-xs font-medium text-slate-400">Admin</div>
                </div>
            </div>
            <div className="text-sm">
                <Menus menu={menu1} url={url} />
            </div>
        </div>
    );
}

function Menus({ menu, url }) {
    return (
        <div className="py-3">
            <ul>
                {menu.map((val, index) => {
                    const isActive = url.toLowerCase() === val.path?.toLowerCase();
                    const activeClass = isActive
                        ? 'bg-blue-500 text-blue-500 bg-opacity-10 rounded-md p-2'
                        : 'px-3 py-2';
                    const textActive = isActive ? 'text-blue-500' : 'text-slate-400';

                    return val.path ? (
                        <Link key={index} href={val.path}>
                            <li className={`${activeClass} cursor-pointer mx-5 text-lg font-medium mb-3 flex items-center hover:bg-blue-200 rounded-md`}>
                                {React.cloneElement(val.icon, { className: `w-6 h-6 ${textActive}` })}
                                <div className={`ml-2 hidden sm:block ${textActive}`}>
                                    {val.name}
                                </div>
                            </li>
                        </Link>
                    ) : (
                        <button
                            key={index}
                            onClick={val.onClick}
                            className={`${activeClass} cursor-pointer mx-5 text-lg font-medium mb-3 flex items-center rounded-md`}
                        >
                            {React.cloneElement(val.icon, { className: `w-6 h-6 ${textActive}` })}
                            <div className={`ml-2 hidden sm:block ${textActive}`}>
                                {val.name}
                            </div>
                        </button>
                    );
                })}
            </ul>
        </div>
    );
}
