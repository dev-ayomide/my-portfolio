import React from 'react';
import { FaCode, FaMobile, FaDesktop } from 'react-icons/fa';

export default function Services() {
    return (
        <div className="flex flex-col items-center gap-6 py-12 ">
            <div className="text-center mb-8">
                <p className="text-sm uppercase text-gray-400">SERVICES</p>
                <div className="w-16 h-0.5 bg-green-primary mx-auto my-2"></div>
                <h1 className="text-4xl font-bold">SERVICES I OFFER</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center gap-4 p-8 bg-gray-900 hover:bg-green-dark rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div className="bg-green-dark hover:bg-gray-900 p-4 rounded-lg transition-colors duration-300">
                        <FaCode size={32} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-center">Web Development</h2>
                    <p className="text-center text-gray-300 group-hover:text-white">
                        Custom website development using modern frameworks like React. I create responsive, fast-loading websites with clean code and SEO best practices. From simple landing pages to complex web applications.
                    </p>
                </div>
                
                <div className="flex flex-col items-center gap-4 p-8 bg-gray-900 hover:bg-green-dark rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div className="bg-green-dark hover:bg-gray-900 p-4 rounded-lg transition-colors duration-300">
                        <FaMobile size={32} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-center">Responsive UI Design</h2>
                    <p className="text-center text-white">
                        Creating beautiful, responsive user interfaces that work flawlessly across all devices and screen sizes. I focus on intuitive navigation, accessibility, and conversion-optimized designs that engage your users.
                    </p>
                </div>
                
                <div className="flex flex-col items-center gap-4 p-8 bg-gray-900 hover:bg-green-dark rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div className="bg-green-dark hover:bg-gray-900 p-4 rounded-lg transition-colors duration-300">
                        <FaDesktop size={32} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-center">Frontend Optimization</h2>
                    <p className="text-center text-gray-300 group-hover:text-white">
                        Improving the performance and user experience of existing websites. I optimize load times, enhance accessibility, fix UI bugs, and implement modern frontend practices to keep your site running at peak performance.
                    </p>
                </div>
            </div>
            
            <div className='p-16 flex flex-col justify-center items-center gap-8'>
            <div className="text-center mb-8">
                <p className="text-sm uppercase tracking-wider text-gray-400">TECHNOLOGIES</p>
                <div className="w-16 h-0.5 bg-green-primary mx-auto my-2"></div>
                <h1 className="text-4xl font-bold">TECHNOLOGIES I USE</h1>
            </div>
               <div className='grid gap-12 grid-cols-3 lg:grid-cols-6 m-auto'>
                <img src="./html.png" alt="tech"/>
                <img src="./css.png" alt="tech"/>
                <img src="./tailwind.png" alt="tech"/>
                <img src="./javascript.png" alt="tech"/>
                <img src="./vite.svg" alt="tech"/>
                <img src="./react.png" alt="tech"/>
                <img src="./python.png" alt="tech"/>
                <img src="./django.png" alt="tech"/>
                <img src="./figma.png" alt="tech"/>
                <img src="./coreldraw.png" alt="tech"/>
                <img src="./photoshop.png" alt="tech"/>
               </div>
            </div>
        </div>
    );
}