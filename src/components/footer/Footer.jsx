import React from 'react'
import { Link } from 'react-router'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden pt-10  bg-gray-950 text-white border border-t-2 border-t-slate-200 border-x-0">
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-8">
          <div className="-m-6 flex flex-wrap">
              <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                  <div className="flex h-full flex-col justify-between">
                      <div className="mb-4 inline-flex items-center">
                          <Logo width="100px" />
                      </div>
                  </div>
              </div>
              <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                  <div className="h-full">
                      <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                          Company
                      </h3>
                      <ul>
                          <li className="mb-4">
                              <Link
                                  className=" text-base font-medium text-gray-400 hover:text-gray-500"
                                  to="/"
                              >
                                  Features
                              </Link>
                          </li>
                          <li className="mb-4">
                              <Link
                                  className=" text-base font-medium text-gray-400 hover:text-gray-500"
                                  to="/"
                              >
                                  Pricing
                              </Link>
                          </li>
                          <li className="mb-4">
                              <Link
                                  className=" text-base font-medium text-gray-400 hover:text-gray-500"
                                  to="/"
                              >
                                  Affiliate Program
                              </Link>
                          </li>
                          <li>
                              <Link
                                  className=" text-base font-medium text-gray-400 hover:text-gray-500"
                                  to="/"
                              >
                                  Press Kit
                              </Link>
                          </li>
                      </ul>
                  </div>
              </div>
              <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                  <div className="h-full">
                      <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                          Support
                      </h3>
                      <ul>
                          <li className="mb-4">
                              <Link
                                  className=" text-base font-medium text-gray-400 hover:text-gray-500"
                                  to="/"
                              >
                                  Account
                              </Link>
                          </li>
                          <li className="mb-4">
                              <Link
                                  className=" text-base font-medium text-gray-400 hover:text-gray-500"
                                  to="/"
                              >
                                  Help
                              </Link>
                          </li>
                          <li className="mb-4">
                              <Link
                                  className=" text-base font-medium text-gray-400 hover:text-gray-500"
                                  to="/"
                              >
                                  Contact Us
                              </Link>
                          </li>
                          <li>
                              <Link
                                  className=" text-base font-medium text-gray-400 hover:text-gray-500"
                                  to="/"
                              >
                                  Customer Support
                              </Link>
                          </li>
                      </ul>
                  </div>
              </div>
              <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                  <div className="h-full">
                      <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                          Legals
                      </h3>
                      <ul>
                          <li className="mb-4">
                              <Link
                                  className=" text-base font-medium text-gray-400 hover:text-gray-500"
                                  to="/"
                              >
                                  Terms &amp; Conditions
                              </Link>
                          </li>
                          <li className="mb-4">
                              <Link
                                  className=" text-base font-medium text-gray-400 hover:text-gray-500"
                                  to="/"
                              >
                                  Privacy Policy
                              </Link>
                          </li>
                          <li>
                              <Link
                                  className=" text-base font-medium text-gray-400 hover:text-gray-500"
                                  to="/"
                              >
                                  Licensing
                              </Link>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
      <div className='py-8 border border-t-2 border-t-slate-400 border-x-0 border-b-0'>
          <p className="text-sm text-gray-500 text-center ">
              &copy; Copyright 2025. All Rights Reserved by Ashish Rana.
          </p>
      </div>
    </section>
  )
}

export default Footer