
import { useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router";
import { isPending } from "@reduxjs/toolkit";
const Header = () => {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate();

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
        <header className="py-3 shadow bg-gray-900 text-white">
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
                            <li key={item.slug} className="px-6 py-2 inline-block duration-200 hover:bg-blue-200 hover:text-gray-950 rounded-full">
                                <NavLink to={item.slug} key={item.name} className={({isActive, isPending})=> isPending ? 'pending' : isActive ? 'active font-bold' : ''} >{item.name}</NavLink>
                            </li>
                        ) : ( null )
                    )}
                    {authStatus && (
                        <li>
                        <LogoutBtn />
                        </li>
                    )
                    }
                    </ul>
                </nav>
            </Container>

        </header>
    </>
  )
}

export default Header
