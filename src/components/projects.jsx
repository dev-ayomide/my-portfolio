import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaSpinner } from 'react-icons/fa';
import { projectsService } from '../services/projectsService';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const { data, error } = await projectsService.getProjects();
                
                if (error) {
                    setError('Failed to load projects');
                    console.error('Error:', error);
                } else {
                    setProjects(data || []);
                }
            } catch (err) {
                setError('Failed to load projects');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <section id="project" className="flex flex-col items-center gap-6 py-12">
                <div className="text-center mb-8">
                    <p className="text-sm uppercase text-gray-400">PORTFOLIO</p>
                    <div className="w-16 h-0.5 bg-green-primary mx-auto my-2"></div>
                    <h1 className="text-4xl font-bold">MY PROJECTS</h1>
                </div>
                <div className="flex items-center justify-center py-12">
                    <FaSpinner className="animate-spin text-green-primary text-4xl" />
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="project" className="flex flex-col items-center gap-6 py-12">
                <div className="text-center mb-8">
                    <p className="text-sm uppercase text-gray-400">PORTFOLIO</p>
                    <div className="w-16 h-0.5 bg-green-primary mx-auto my-2"></div>
                    <h1 className="text-4xl font-bold">MY PROJECTS</h1>
                </div>
                <div className="text-center py-12">
                    <p className="text-red-500 text-lg">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 px-4 py-2 bg-green-primary text-white rounded hover:bg-green-dark transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section id="project" className="flex flex-col items-center gap-6 py-12">
            <div className="text-center mb-8">
                <p className="text-sm uppercase text-gray-400">PORTFOLIO</p>
                <div className="w-16 h-0.5 bg-green-primary mx-auto my-2"></div>
                <h1 className="text-4xl font-bold">MY PROJECTS</h1>
            </div>
            
            {projects.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No projects found</p>
                </div>
            ) : (
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
            )}
        </section>
    );
}
