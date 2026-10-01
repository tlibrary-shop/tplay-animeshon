'use client'
import React, { useState, useEffect, useRef } from 'react'
import { UserRound, Bookmark, Search, Bell, Menu, X, Home, Film, Heart, Calendar, Tv, Compass, Loader2, Languages } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { API_URL } from '@/utils/config';
import { LANGUAGES, useLanguage } from '@/components/LanguageProvider';

interface NotificationAnime {
  img: string;
  alt: string;
  slug: string;
  type: string;
  score: string;
  title: string;
  total_views: number;
  description: string;
  genres: { tag: string; link: string }[];
  detail_url: string;
}

interface NotificationResponse {
  data: NotificationAnime[];
  total_items: number;
  current_page: number;
  total_page: number;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationAnime[]>([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true);
  const notificationRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsNotificationOpen(false);
  }, [pathname]);

  // Fetch notifications when menu opens
  useEffect(() => {
    const fetchNotifications = async () => {
      if (isNotificationOpen && notifications.length === 0) {
        setIsLoadingNotifications(true);
        try {
          const response = await fetch(`${API_URL}/order-anime/latest-update`);
          const data: NotificationResponse = await response.json();
          setNotifications(data.data.slice(0, 10)); // Show only 10 latest
        } catch (error) {
          console.error('Failed to fetch notifications:', error);
        } finally {
          setIsLoadingNotifications(false);
        }
      }
    };
    fetchNotifications();
  }, [isNotificationOpen, notifications.length]);

  // Close notification menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    if (isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/', label: t('home'), icon: Home },
    { href: '/popular', label: t('browse'), icon: Compass },
    { href: '/genres', label: t('genres'), icon: Film },
    { href: '/type', label: t('type'), icon: Tv },
    { href: '/schedule', label: t('schedule'), icon: Calendar },
    { href: '/profile', label: t('myList'), icon: Heart },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navbarClasses = isScrolled 
    ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-blue-500/20' 
    : 'bg-gradient-to-b from-slate-900 via-slate-900/80 to-transparent border-b border-blue-500/10';

  const mobileMenuClasses = isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full';
  const overlayClasses = isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none';

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navbarClasses}`}>
        <div className='flex min-w-0 justify-between items-center px-4 py-3 md:px-8'>
          {/* Logo & Menu */}
          <div className='flex min-w-0 items-center gap-3 md:gap-6'>
            <Link href="/" className='flex min-w-0 items-center gap-2 group'>
              <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 group-hover:from-blue-400 group-hover:to-blue-600 transition-all'>
                <span className='text-white font-bold text-lg'>▶</span>
              </div>
              <span className='text-blue-400 font-heading text-base sm:text-lg md:text-2xl font-bold tracking-wider truncate group-hover:text-blue-300 transition-colors hidden sm:block'>
                TPLAY
              </span>
              <span className='text-blue-300 font-heading text-[10px] sm:text-xs md:text-sm font-bold tracking-wider ml-1 group-hover:text-blue-200 transition-colors hidden sm:block'>
                ANIMESHON
              </span>
            </Link>
            
            {/* Desktop Menu */}
            <ul className='hidden md:flex items-center gap-0.5'>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className={`px-3 py-2 text-xs font-semibold transition-all rounded-md ${
                      isActiveLink(link.href) 
                        ? 'text-white bg-blue-500/20 text-blue-300' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Icons */}
          <div className='flex flex-shrink-0 items-center gap-2 md:gap-4'>
            <label className="flex items-center gap-1 text-gray-300 text-xs" title={t('language')}>
              <Languages className="w-4 h-4" aria-hidden="true" />
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value as typeof language)}
                aria-label={t('language')}
                className="max-w-[5.5rem] cursor-pointer rounded-md border border-blue-500/30 bg-slate-800 px-1.5 py-1 text-xs font-medium text-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30"
              >
                {LANGUAGES.map((item) => (
                  <option key={item.code} value={item.code} className="bg-slate-800 text-white">
                    {item.short}
                  </option>
                ))}
              </select>
            </label>
            <Link href="/search" aria-label={t('search')} className='text-gray-300 hover:text-blue-400 transition-colors p-2 hover:bg-gray-800/50 rounded-md'>
              <Search className='w-4 h-4 md:w-5 md:h-5' />
            </Link>
            {/* Notification Button & Menu */}
            <div className='hidden md:block relative' ref={notificationRef}>
              <button
                aria-label="Buka notifikasi" 
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  if (!isNotificationOpen) setHasNewNotifications(false);
                }}
                className='text-gray-300 hover:text-blue-400 transition-colors p-2 hover:bg-gray-800/50 rounded-md relative'
              >
                <Bell className='w-4 h-4 md:w-5 md:h-5' />
                {hasNewNotifications && (
                  <span className='absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse'></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className='absolute right-0 top-full mt-2 w-96 bg-slate-800 border border-blue-500/20 rounded-lg shadow-2xl overflow-hidden z-50'>
                  {/* Header */}
                  <div className='flex items-center justify-between px-4 py-3 border-b border-blue-500/20 bg-slate-900'>
                    <h3 className='text-white font-semibold flex items-center gap-2 text-sm'>
                      <Bell className='w-4 h-4 text-blue-400' />
                      {t('latest')}
                    </h3>
                    <Link 
                      href="/latest" 
                      className='text-xs text-blue-400 hover:text-blue-300 transition-colors'
                      onClick={() => setIsNotificationOpen(false)}
                    >
                      Lihat Semua
                    </Link>
                  </div>

                  {/* Notification List */}
                  <div className='max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500/40 scrollbar-track-slate-900'>
                    {isLoadingNotifications ? (
                      <div className='flex items-center justify-center py-12'>
                        <Loader2 className='w-6 h-6 text-blue-400 animate-spin' />
                      </div>
                    ) : notifications.length > 0 ? (
                      <div className='divide-y divide-blue-500/10'>
                        {notifications.map((anime, index) => (
                          <Link
                            key={index}
                            href={`/anime${anime.detail_url.replace('/detail-anime', '')}`}
                            onClick={() => setIsNotificationOpen(false)}
                            className='flex gap-3 p-3 hover:bg-blue-500/10 transition-colors group'
                          >
                            <div className='relative w-14 h-20 flex-shrink-0 rounded-md overflow-hidden border border-blue-500/20'>
                              <Image
                                src={anime.img}
                                alt={anime.alt || anime.title}
                                onError={(event) => { event.currentTarget.src = '/not_found.png'; }}
                                fill
                                className='object-cover group-hover:scale-105 transition-transform'
                                sizes='56px'
                              />
                              {anime.type && (
                                <span className='absolute top-1 left-1 text-[8px] px-1 py-0.5 bg-blue-500 text-white rounded font-medium'>
                                  {anime.type}
                                </span>
                              )}
                            </div>
                            <div className='flex-1 min-w-0'>
                              <h4 className='text-xs font-semibold text-white line-clamp-2 group-hover:text-blue-300 transition-colors'>
                                {anime.title}
                              </h4>
                              <p className='text-[11px] text-gray-400 line-clamp-2 mt-1'>
                                {anime.description}
                              </p>
                              {anime.score && (
                                <div className='flex items-center gap-1 mt-1'>
                                  <span className='text-yellow-500 text-xs'>★</span>
                                  <span className='text-[11px] text-gray-400'>{anime.score}</span>
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className='flex flex-col items-center justify-center py-12 text-gray-500'>
                        <Bell className='w-8 h-8 mb-2' />
                        <p className='text-xs'>Tidak ada notifikasi</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <Link href="/profile" className='hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity p-2 hover:bg-gray-800/50 rounded-md'>
              <div className='w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0'>
                <UserRound className='w-4 h-4 text-white' />
              </div>
            </Link>
            
            {/* Hamburger Button - Mobile Only */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='md:hidden text-gray-300 hover:text-blue-400 transition-colors p-2 hover:bg-gray-800/50 rounded-md'
              aria-label='Toggle menu'
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className='w-5 h-5' />
              ) : (
                <Menu className='w-5 h-5' />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${overlayClasses}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[min(18rem,85vw)] bg-slate-900 z-50 md:hidden transform transition-transform duration-300 ease-out border-l border-blue-500/20 ${mobileMenuClasses}`}
      >
        {/* Menu Header */}
        <div className='flex items-center justify-between p-4 border-b border-blue-500/20'>
          <span className='text-blue-400 font-heading text-lg font-bold tracking-wider'>TPLAY</span>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Tutup menu"
            className='text-gray-400 hover:text-white transition-colors p-1'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Menu Links */}
        <nav className='p-3'>
          <ul className='space-y-1'>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                      isActiveLink(link.href)
                        ? 'bg-blue-500/20 text-blue-400 font-medium'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon className='w-4 h-4' />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Divider */}
        <div className='mx-3 border-t border-blue-500/20' />

        {/* Additional Links */}
        <div className='p-3'>
          <ul className='space-y-1'>
            <li>
              <Link 
                href="/search"
                className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all text-sm'
              >
                <Search className='w-4 h-4' />
                <span>{t('search')}</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/latest"
                className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all w-full text-sm'
              >
                <Bell className='w-4 h-4' />
                <span>{t('latest')}</span>
                {hasNewNotifications && (
                  <span className='ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse'></span>
                )}
              </Link>
            </li>
            <li>
              <Link 
                href="/profile"
                className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all w-full text-sm'
              >
                <Bookmark className='w-4 h-4' />
                <span>{t('myList')}</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* User Profile Section */}
        <div className='absolute bottom-0 left-0 right-0 p-3 border-t border-blue-500/20 bg-slate-900'>
          <Link href="/profile" className='flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-gray-800 transition-all'>
            <div className='w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0'>
              <UserRound className='w-5 h-5 text-white' />
            </div>
            <div className='text-left text-sm'>
              <p className='text-white font-medium'>Guest User</p>
              <p className='text-gray-500 text-xs'>Profile & My List</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
