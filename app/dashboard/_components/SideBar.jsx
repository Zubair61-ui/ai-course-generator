"use client";
import Image from 'next/image';
import React, { useContext } from 'react';
import { HiHome } from "react-icons/hi2";
import { MdOutlineExplore } from "react-icons/md";
import { GrUpgrade } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress";
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { Button } from '@/components/ui/button'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const SideBar = () => {
  const { userCourseList } = useContext(UserCourseListContext);
  const { signOut } = useClerk();
  const router = useRouter();
  const path = usePathname();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/sign-in');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const Menu = [
    {
      id: 1,
      name: 'Home',
      icon: <HiHome />,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Explore',
      icon: <MdOutlineExplore />,
      path: '/dashboard/explore',
    },
    {
      id: 3,
      name: 'Upgrade',
      icon: <GrUpgrade />,
      path: '/dashboard/upgrade',
    },
    {
      id: 4,
      name: 'Logout',
      icon: <BiLogOut />,
      onClick: handleLogout,
    }
  ];

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Image alt="placeholder" src={'/logo.svg'} width={160} height={100} />
      <hr className="my-5" />
      <div className="flex flex-col justify-between h-[calc(100vh-160px)]">
        <div>
          <ul>
            {Menu.map((item) => (
              <li key={item.id}>
                {item.path ? (
                  <Link href={item.path}>
                    <div
                      className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3 ${
                        item.path === path && 'bg-gray-100 text-black'
                      }`}
                    >
                      <div className="text-2xl">{item.icon}</div>
                      <h2>{item.name}</h2>
                    </div>
                  </Link>
                ) : (
                  <div
                    onClick={item.onClick}
                    className="flex items-center gap-2 text-red-500 p-3 cursor-pointer hover:bg-red-50 hover:text-red-700 rounded-lg mb-3"
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <h2>{item.name}</h2>
                  </div>
                )}
              </li>
            ))}
          </ul>
          
          <div className="mt-8">
            <Progress value={(userCourseList?.length / 5) * 100} />
            <h2 className="text-sm my-2">{userCourseList?.length} out of 5 created</h2>
            <h2 className="text-xs text-gray-500">
              Upgrade your plan for unlimited course generation
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;