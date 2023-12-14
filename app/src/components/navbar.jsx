import { useEffect, useState } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { ChevronDown, LogOut, Menu } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils'
import useStore from '@/store'

import api from '@/services/api'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export const Navbar = () => {
  return (
    <nav className='bg-black'>
      <div className='container py-5 text-white flex items-center justify-between gap-x-5'>
        <div className='flex items-center gap-x-5'>
          <MatterLogo />
          <ul className='items-center gap-x-10 !text-base lg:flex hidden ml-14'>
            {menus.map((menu, i) =>
              menu.items ? (
                <li key={i}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='nav' className='font-normal'>
                        {menu.title}
                        <ChevronDown className='ml-2' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='bg-black text-white border-black'>
                      {menu.items.map((item, i) => (
                        <DropdownMenuItem key={i} asChild>
                          <Link className='block' to={item.to}>
                            {item.title}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ) : (
                <li key={i}>
                  <NavLink activeClassName='font-bold' to={menu.to}>
                    {menu.title}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>
        <div className='items-center gap-x-4 lg:flex hidden'>
          <FundSelector />

          <User />
        </div>
        <NavMobile />
      </div>
    </nav>
  )
}

const NavMobile = () => {
  return (
    <nav className='block lg:hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <Menu className='cursor-pointer' />
        </SheetTrigger>
        {/* To override gleap feedback button */}
        <SheetContent className='bg-black text-white z-[999999999999999]'>
          <MatterLogo className='mb-10' />
          <ul>
            {menus.map((menu, i) =>
              menu.items ? (
                <Accordion type='single' collapsible key={i}>
                  <AccordionItem value={menu.title}>
                    <AccordionTrigger className='text-lg font-normal hover:no-underline'>{menu.title}</AccordionTrigger>
                    <AccordionContent className='divide-y pl-10'>
                      {menu.items.map((item, i) => (
                        <li key={i} className='last:pt-2 first:pb-2'>
                          <Link to={item.to} key={i} className={`block text-lg`}>
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <li key={i}>
                  <Link to={menu.to} className='py-4 block text-lg border-b'>
                    {menu.title}
                  </Link>
                </li>
              )
            )}
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

const FundSelector = () => {
  const [funds, setFunds] = useState([])

  const { fund, setFund } = useStore()

  useEffect(() => {
    getFunds()
  }, [])

  const getFunds = async () => {
    const { data, ok } = await api.post('/fund/search', { search: '' })
    if (!ok) return toast.error('Something went wrong')
    setFunds(data.sort(e => e.name))
    setFund(data[0])
  }

  if (!fund) return null

  return (
    <Select
      value={fund._id}
      onValueChange={value => {
        const f = funds.find(p => value === p._id)
        setFund(f)
      }}
      className='min-w-min'
    >
      <SelectTrigger className='text-left text-black min-w-[200px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {funds.map(fund => (
          <SelectItem className='cursor-pointer' value={fund._id} key={fund._id}>
            {fund.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const User = () => {
  const { user, setUser } = useStore()
  const history = useHistory()

  const handleLogout = async () => {
    try {
      const res = await api.post(`/user/logout`)
      if (!res.ok) throw new Error('Something went wrong')
      setUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='nav' className='font-normal'>
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-black text-white border-black'>
        <DropdownMenuItem onClick={() => history.push('/account')}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const MatterLogo = ({ className }) => {
  return (
    <Link to='/' className='block'>
      <svg width='122' height='17' viewBox='0 0 122 17' fill='none' xmlns='http://www.w3.org/2000/svg' className={cn(className, 'shrink-0')}>
        <path
          d='M0 17V0H7.03739L8.3461 5.97965C8.41194 6.24321 8.49426 6.62209 8.59303 7.11628C8.6918 7.59403 8.7988 8.10465 8.91403 8.64826C9.02926 9.19186 9.12803 9.68605 9.21034 10.1308H9.43258C9.49842 9.78488 9.58073 9.3731 9.6795 8.89535C9.79473 8.40116 9.90173 7.8987 10.0005 7.38808C10.0993 6.87743 10.1898 6.41618 10.2721 6.00436L11.5561 0H18.396V17H13.5562V11.3663C13.5562 10.6086 13.5645 9.87544 13.5809 9.16715C13.5974 8.4423 13.6139 7.79171 13.6303 7.21512C13.6467 6.62209 13.655 6.15262 13.655 5.80669H13.4575C13.4081 6.08673 13.3423 6.41618 13.2599 6.79506C13.1941 7.15742 13.12 7.51991 13.0377 7.88227C12.9719 8.24463 12.906 8.5577 12.8402 8.82122L10.9882 17H7.16086L5.28422 8.82122C5.23483 8.5577 5.16076 8.24463 5.06199 7.88227C4.97967 7.51991 4.90559 7.15742 4.83975 6.79506C4.77391 6.41618 4.71629 6.09496 4.6669 5.8314H4.46936C4.48582 6.24321 4.50229 6.76211 4.51875 7.38808C4.55167 7.99754 4.56813 8.64826 4.56813 9.34012C4.58459 10.032 4.59282 10.7074 4.59282 11.3663V17H0ZM24.9936 17L30.0803 0H36.4263L41.513 17H36.13L35.562 14.5538H30.7717L30.2038 17H24.9936ZM31.6606 10.7733H34.6978L33.9817 7.63517C33.9488 7.45393 33.8994 7.23155 33.8336 6.96802C33.7676 6.70446 33.7018 6.41618 33.636 6.1032C33.5866 5.79022 33.529 5.48546 33.4632 5.18895C33.3972 4.87597 33.3314 4.60417 33.2656 4.37355H33.0681C33.0187 4.67006 32.9528 5.00775 32.8706 5.38663C32.7882 5.76551 32.7059 6.15262 32.6236 6.54797C32.5413 6.94331 32.4508 7.30568 32.352 7.63517L31.6606 10.7733ZM49.9435 17V4.17587H45.2766V0H59.6477V4.17587H55.0302V17H49.9435ZM70.3149 17V4.17587H65.648V0H80.0191V4.17587H75.4016V17H70.3149ZM87.0565 17V0H99.7979V4.00291H92.1432V6.42442H98.662V10.3285H92.1432V12.9971H99.9707V17H87.0565ZM107.259 17V0H116.123C117.391 0 118.42 0.247093 119.21 0.741279C120 1.23547 120.576 1.88615 120.938 2.69331C121.317 3.50048 121.506 4.38179 121.506 5.33721C121.506 6.35853 121.317 7.28097 120.938 8.10465C120.56 8.92834 120 9.60364 119.259 10.1308L122 17H116.469L114.444 11.2922H112.345V17H107.259ZM112.345 7.58576H115.061C115.473 7.58576 115.794 7.40451 116.024 7.04215C116.255 6.66327 116.37 6.20203 116.37 5.65843C116.37 5.3125 116.312 4.99952 116.197 4.71948C116.098 4.43943 115.95 4.21705 115.753 4.05233C115.572 3.8876 115.341 3.80523 115.061 3.80523H112.345V7.58576Z'
          fill='white'
        />
      </svg>
    </Link>
  )
}

const menus = [
  {
    title: 'Campaigns',
    to: '/campaign'
    // items: [
    //   {
    //     title: 'Company',
    //     to: '/campaign/company'
    //   }
    // ]
  },
  {
    title: 'Companies',
    to: '/company'
    // items: [
    //   {
    //     title: 'Private',
    //     to: '/company/private'
    //   },
    //   {
    //     title: 'Invested',
    //     to: '/company/invested'
    //   }
    // ]
  },
  {
    title: 'Users',
    to: '/user'
  }
]
