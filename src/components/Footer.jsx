import React from 'react';
import Logo from '../assets/Picture11.png';
import { Link } from 'react-router';
const Footer = () => {
    return (
        <div>
            <footer className="bg-white dark:bg-gray-900">
                <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                    <div className="md:flex md:justify-between">
                        <div className="mb-6 md:mb-0">
                            <Link to="/" className="flex items-center">
                                <img src={Logo} alt="Logo" className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20  object-contain" />
                                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Project Management Unit</span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <Link to="/scholarships" className="hover:underline">Scholarships</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link to="/projects" className="hover:underline">Projects</Link>
                                    </li>
                                    <li>
                                        <Link to="/jobs" className="hover:underline">Jobs</Link>
                                    </li>

                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <a href="https://www.facebook.com/share/12KRjGrDMTX/?mibextid=wwXIfr" target='_blank' className="hover:underline ">Facebook</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://www.instagram.com/pmu_hed?igsh=MTV0bHFkOWw2d2FjMQ==" target='_blank' className="hover:underline">Instagram</a>
                                    </li>
                                    <li>
                                        <a href="https://x.com/pmuhedkp?s=21" className="hover:underline" target='_blank'>Twitter</a>
                                    </li>

                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <p >Privacy Policy</p>
                                    </li>
                                    <li>
                                        <p >Terms &amp; Conditions</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="" className="hover:underline">Project Management Unit™</a>. All Rights Reserved.
                        </span>
                        <div className="flex mt-4 sm:justify-center sm:mt-0">
                            <a href="https://www.facebook.com/share/12KRjGrDMTX/?mibextid=wwXIfr" target='_blank' className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd" />
                                </svg>

                                <span className="sr-only">Facebook page</span>
                            </a>
                            <a href="https://www.instagram.com/pmu_hed?igsh=MTV0bHFkOWw2d2FjMQ==" target='_blank' className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path fill="currentColor" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd" />
                                </svg>

                                <span className="sr-only">Instagram Page</span>
                            </a>
                            <a href="https://x.com/pmuhedkp?s=21" target='_blank' className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z" clipRule="evenodd" />
                                </svg>

                                <span className="sr-only">Twitter page</span>
                            </a>


                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Footer;