import React, { useEffect } from 'react'
import {LINK_CLASSES, menuItems, PRODUCTIVITY_CARD,TIP_CARD, SIDEBAR_CLASSES} from '../assets/dummy'
import { useState } from 'react'
import {  Sparkles,Lightbulb,Menu, X  } from 'lucide-react';
import { NavLink } from 'react-router-dom';



const Sidebar = ({user,tasks}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const[showModal , setShowModal] = useState(false);
  const totalTask = tasks?.length || 0;
  // const completedTask = tasks?.filter((t) => t.completed === 'completed').length || 0;
  const completedTask =
  tasks?.filter(
    t =>
      t.completed === true ||
      t.completed === 1 ||
      (typeof t.completed === 'string' &&
       t.completed.toLowerCase() === 'yes')
  ).length || 0;

  const productivity = totalTask > 0
  ? Math.round((completedTask / totalTask) * 100)
  : 0;

  const username = user?.name || 'User';
  const initial = username.charAt(0).toUpperCase();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto"}
    },[mobileOpen]);

    const renderMenuItems = (isMobile = false) => (
      <ul className='space-y-2'>
        {menuItems.map(({text, path,icon}) => (
          <li key={text}>
            <NavLink to={path} className = {({isActive}) =>[
              LINK_CLASSES.base,
              isActive ? LINK_CLASSES.active : LINK_CLASSES.inactive,
              isMobile ? "justify-start" : "lg:justify-start"
            ].join(" ")} onClick={() => setMobileOpen(false)}>
              <span className={LINK_CLASSES.icon}>
                {icon}

              </span>
              <span className={` ${isMobile ? "block" : "hidden lg:block"} ${LINK_CLASSES.text}`}>
                {text}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    )
  
 return (
  <>
  <div className={SIDEBAR_CLASSES.desktop}>
    
    {/* Header */}
    <div className="p-5 border-b border-purple-100 lg:block hidden">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600
          flex items-center justify-center text-white font-bold shadow-md">
          {initial}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700">
            Hello, {username}!
          </h2>

          <p className="text-sm text-purple-500 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Lets be productive today!
          </p>
        </div>
      </div>
    </div>

    {/* Body */}
    <div className="p-4 space-y-6 overflow-y-auto flex-1">
      
      {/* Productivity Card */}
      <div className={PRODUCTIVITY_CARD.container}>
        <div className={PRODUCTIVITY_CARD.header}>
          <h3 className={PRODUCTIVITY_CARD.label}>Productivity</h3>
          <span className={PRODUCTIVITY_CARD.badge}>
            {productivity}%
          </span>
        </div>

        <div className={PRODUCTIVITY_CARD.barBg}>
          <div
            className={PRODUCTIVITY_CARD.barFg}
            style={{ width: `${productivity}%` }}
          />
        </div>
      </div>

      {/* Menu */}
      {renderMenuItems()}

      {/* Tip Card */}
      <div className="mt-auto pt-6 lg:block hidden">
        <div className={TIP_CARD.container}>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-purple-400" />
          </div>

          <div>
            <h3 className={TIP_CARD.title}>Pro Tip</h3>
            <p className={TIP_CARD.text}>
              Use keyboard shortcuts to navigate.
            </p>
            <a
              href="#"
              className="block text-sm mt-2 text-purple-500 hover:underline"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>

  {!mobileOpen && (
    <button onClick={() => setMobileOpen(true)}
    className={SIDEBAR_CLASSES.mobileButton}>
    <Menu className='w-5 h-5' />
    </button>
  )}
  {mobileOpen && (
    <div className='fixed inset-0 z-40'>
    <div className={SIDEBAR_CLASSES.mobileDrawerBackdrop} onClick={() => setMobileOpen(false)} />

      <div className={SIDEBAR_CLASSES.mobileDrawer} onClick={() => setMobileOpen(false)} />
        <div className='flex justify-between items-center mb-4 border-b pb-2'>
          <h2 className='text-lg font-bold text-purple-600'>Menu</h2>
          <button onClick={() => setMobileOpen(false)} className='
          text-gray-700 hover:text-purple-600'>
            <X className='w-5 h-5' />
          </button>

          <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600
          flex items-center justify-center text-white font-bold shadow-md">
          {initial}
        </div>

         <div>
          <h2 className="text-lg mt-16 font-bold text-gray-800">
            Hello, {username}!</h2>
          <p className="text-sm text-purple-500 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Lets be productive today!
          </p>
        </div>


        </div>
        {renderMenuItems(true)}
        </div>
    </div>
  )}
  </>
);
};
export default Sidebar