
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { dTheme, lTheme } from "../../store/themeSlice";


const Header = () => {
    const authStatus = useSelector((state) => state.auth.status)
    const [theme, setTheme] = useState(true);
    const dispatch = useDispatch();

    useEffect(()=>{
        theme ? dispatch(dTheme()) : dispatch(lTheme()) ;
        
    },[theme])
    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name:'Signup',
            slug: '/signup',
            active: !authStatus
        },
        {
            name: 'All Posts',
            slug: '/posts',
            active: authStatus
        },
        {
            name: 'Add Posts',
            slug: '/add-post',
            active: authStatus
        }

    ]

    
    
  return (
    <>
        <header className={`py-3 shadow`}>
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to='/'>
                            <Logo />
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {navItems.map((item)=>
                           item.active ? (
                            <li key={item.slug} className="">
                                <NavLink to={item.slug} key={item.name} className={({isActive, isPending})=> isPending ? 'px-6 py-2 inline-block duration-200 hover:bg-blue-200 hover:text-gray-950 rounded-full' : isActive ? 'active font-bold px-6 py-2 inline-block duration-200 hover:bg-blue-200 hover:text-gray-950 rounded-full' : ' px-6 py-2 inline-block duration-200 hover:bg-blue-200 hover:text-gray-950 rounded-full'} >{item.name}</NavLink>
                            </li>
                            ) : ( null )
                        )}
                    {authStatus && (
                        <li>
                        <LogoutBtn />
                        </li>
                    )}
                    <li className="flex align-middle pl-5">
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" value={theme} onClick={()=>setTheme((prev)=> !prev)} />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </li>
                    </ul>
                </nav>
            </Container>

        </header>
    </>
  )
}

export default Header
