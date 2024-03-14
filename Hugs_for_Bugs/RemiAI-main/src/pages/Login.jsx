import React from 'react';
import {redirect} from 'react-router-dom'
export default function Login() {

  return (
    <section className=" bg-gradient-to-bl from-slate-900 to-slate-700">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-40 h-10 mr-2" src="/be-well.png" alt="logo" />
        </a>
        <div className="w-full bg-gray-600 rounded-2xl border-none md:mt-0 sm:max-w-md xl:p-0 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5 shadow-md">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <div className="space-y-4 md:space-y-6" onSubmit={() => redirect("/dashboard")}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <div className='min-w-full'>

              <a
              href='/dashboard'
              className="min-w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-slate-900 to-slate-700"
              >
                Sign in
              </a>
                </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet?{' '}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SigninButton = () => {
  return (
    <button className="overflow-hidden relative w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer z-10 group">
      Hover me!
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"></span>
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"></span>
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"></span>
      <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
        Explore!
      </span>
    </button>
  );
};
