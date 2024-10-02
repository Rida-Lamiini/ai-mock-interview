import { UserButton, useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import logo from './../../../assets/logo.svg';

function Header() {
    const { '*': currentPath } = useParams();
    const { user, isSignedIn } = useUser();
    const navigate = useNavigate();

    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Question', path: '/question' },
        { name: 'Upgrade', path: '/upgrade' },
        { name: 'How it Works?', path: '/how-it-works' }
    ];

    useEffect(() => {
        if (isSignedIn && currentPath !== '/dashboard') {
            navigate('/dashboard');
        }
    }, [isSignedIn, currentPath, navigate]);

    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            <img src={logo} width={140} height={80} alt='logo' />

            <ul className='hidden md:flex gap-6'>
                {navItems.map((item) => (
                    <li
                        key={item.name}
                        className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                            currentPath === item.path ? 'text-primary font-bold' : ''
                        }`}
                    >
                        <Link to={item.path}>{item.name}</Link>
                    </li>
                ))}
            </ul>

            {isSignedIn ? (
                <UserButton />
            ) : (
                <Link to='/auth/sign-in'>
                    <Button className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark">
                        Get Started, It's Free
                    </Button>
                </Link>
            )}
        </div>
    );
}

export default Header;
