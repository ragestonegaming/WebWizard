import React, { useEffect, useRef, useState } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { FaGithub } from 'react-icons/fa6';

const NavBar = () => {
  const [currUser, setCurrUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const ft = useRef(null);
  const handleClick = () => {
    ft.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // const navigate = useNavigate();

  useEffect(() => {
    // fetch("http://localhost:5000/api/v1/users/1")
    // .then((res) => res.json())
    // .then((data) => {
    //     setCurrUser(data)
    //     document.cookie = "LOGIN_INFO=" + data.token + ";max-age=60*60;path=/"
    //     setLoggedIn(true)
    // })
    // .catch((err) => console.log(err))
  }, []);

  const scrollToComponent = (e) => {
    // e.preventDefault();
    console.log('scroll To component ');
  };
  return (
    <div className="flex justify-between px-10 py-3 font-normal items-center font-bricolage">
      <a href="/">
        <img className="w-40 h-10 mr-2" src="/be-well.png" alt="logo" />
      </a>

    </div>
  );
};

export default NavBar;
