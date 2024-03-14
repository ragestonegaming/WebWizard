import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import DownloadButton from '../components/DownloadButton';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const [threads, setThreads] = useState([])
  const getThreads = () => {
    const chat = localStorage.getItem("threads");
    setThreads(JSON.parse(chat));
    // console.log(messages);
  };

  useEffect(() => {
    getThreads();
  }, []);
  const navig = () => {
    return (
      <Navigate to="/check-up" />
    )
  }
  return (
    <section className=" bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black min-h-screen">
      <NavBar />
      <div className="flex justify-evenly flex-wrap gap-4 px-auto mx-8 mt-8">
        {
          threads?.map((thread, i) => <Card key={i} title={thread?.disease} />)
        }

        <div className="h-60 w-72 bg-white rounded-2xl border-none md:mt-0 sm:max-w-md xl:p-0 bg-clip-padding transition-all ease-in-out backdrop-filter backdrop-blur-3xl duration-500 bg-opacity-5 shadow-md hover:shadow-xl scale-100 card">
          <div className="h-full flex justify-center flex-col items-center">
            <a
              title="Add New"
              href='/check-up'
              className="group cursor-pointer outline-none hover:rotate-90 duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50px"
                height="50px"
                viewBox="0 0 24 24"
                className="stroke-white fill-none group-hover:fill-[#c64356] group-active:stroke-white group-active:fill-[#c64356] group-active:duration-0 duration-300"
              >
                <path
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  strokeWidth="1.5"
                ></path>
                <path d="M8 12H16" strokeWidth="1.5"></path>
                <path d="M12 16V8" strokeWidth="1.5"></path>
              </svg>
            </a>
            <div className="text-xl font-bold mt-2">Not feeling well?</div>
            <div className="go-corner">
              <div className="go-arrow">+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = ({title}) => {
  return (
    <div className="h-60 w-72 bg-white rounded-2xl border-none md:mt-0 sm:max-w-md xl:p-0 bg-clip-padding transition-all ease-in-out backdrop-filter backdrop-blur-3xl duration-500 bg-opacity-5 shadow-md hover:shadow-xl scale-100 card">
      <div className="w-full h-full flex justify-center items-center flex-col">
        <p className="card-title">{title}</p>
        <p className="small-desc"></p>
        <div className="go-corner">
          <div className="go-arrow">→</div>
        </div>
        <DownloadButton />
      </div>
    </div>
  );
};

export default Dashboard;
