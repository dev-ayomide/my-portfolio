import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function Projects() {
    const projects = [
        // {
        //     id: 1,
        //     title: "E-commerce Dashboard",
        //     description: "A responsive admin dashboard for e-commerce platforms with real-time analytics, inventory management, and order processing features.",
        //     image: "/project1.jpg", 
        //     technologies: ["React", "Chart.js", "Tailwind CSS", "Firebase"],
        //     github: "https://github.com/yourusername/ecommerce-dashboard",
        //     liveDemo: "https://ecommerce-dashboard-demo.com"
        // },
        {
            id: 1,
            title: "Recipe Recommender",
            description: "A smart meal planning tool that helps users discover recipes based on available ingredients and dietary preferences.",
            image: "./recipe-app.png", 
            technologies: ["React.js", "Tailwind CSS", 'Gemini API'],
            github: "https://github.com/dev-ayomide/Recipe-Recommender.git",
            liveDemo: "https://recipe-recommender-ai.vercel.app/"
        },
        {
            id: 2,
            title: "Chart Capstone Limited Website",
            description: "A modern corporate website built for Chart Capstone Limited, a company specializing in Oil & Gas, Agriculture, and Solid Minerals.",
            image: "./cci-app.png", 
            technologies: ["React", "Tailwind CSS"],
            github: "https://github.com/dev-ayomide/chart-and-capstone-integrated-limited.git",
            liveDemo: "https://chartandcapstone.com/"
        },
        {
            id: 3,
            title: "Event Ticketing Generator",
            description: "A conference ticketing system that allows users to register, validate details, and generate tickets with avatars. ",
            image: "./event-app.png", 
            technologies: ["React", "Tailwind CSS", "Cloudinary API"],
            github: "https://github.com/dev-ayomide/conference-ticket-generator.git",
            liveDemo: "https://conference-ticket-generator-drab.vercel.app/"
        },
        {
            id: 4,
            title: "Arbitrum Token App",
            description: "Token Management Hub is a web3 application built on Arbitrum Sepolia testnet that provides seamless token interactions for blockchain developers ",
            image: "./token-app.png", 
            technologies: ["React", "Tailwind CSS", "Cloudinary API"],
            github: "https://github.com/dev-ayomide/arbitrum-token-app",
            liveDemo: "https://arbitrum-token-app.vercel.app/"
        }
    ];

    return (
        <section id="project" className="flex flex-col items-center gap-6 py-12">
            <div className="text-center mb-8">
                <p className="text-sm uppercase text-gray-400">PORTFOLIO</p>
                <div className="w-16 h-0.5 bg-green-primary mx-auto my-2"></div>
                <h1 className="text-4xl font-bold">MY PROJECTS</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4 md:px-16">
                {projects.map((project) => (
                    <div key={project.id} className="bg-gray-900 rounded-lg overflow-hidden flex flex-col">
                        <div className="h-48 bg-gray-800 relative">
                            <img src={project.image} alt={project.title} className="object-cover w-full h-full" />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                            <h3 className="text-sm mb-2 text-green-primary">{project.technologies.join(' + ')}</h3>
                            <h3 className="text-sm mb-2">{project.description}</h3>
                            <div className="flex gap-4 mt-auto">
                                <a 
                                    href={project.github} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-white hover:text-green-light transition-colors"
                                >
                                    <FaGithub /> GitHub
                                </a>
                                <a 
                                    href={project.liveDemo} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-white hover:text-green-light transition-colors"
                                >
                                    <FaExternalLinkAlt /> Live Demo
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
