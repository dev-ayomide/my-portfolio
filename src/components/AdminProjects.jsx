import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaSave, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { projectsService } from '../services/projectsService';
import { supabase } from '../lib/supabase';
import AdminLogin from './AdminLogin';
import ImageUpload from './ImageUpload';

export default function AdminProjects() {
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        short_summary: '',
        description: '',
        image: '',
        technologies: '',
        github: '',
        liveDemo: '',
        key_features: [''],
        is_hackathon: false,
        hackathon_position: ''
    });

    useEffect(() => {
        // Check if user is already logged in
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                fetchProjects();
            } else {
                setLoading(false);
            }
        };
        
        checkUser();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                setUser(session.user);
                fetchProjects();
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const { data, error } = await projectsService.getProjects();
            
            if (error) {
                setError('Failed to load projects');
            } else {
                setProjects(data || []);
            }
        } catch (err) {
            setError('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFeatureChange = (index, value) => {
        setFormData(prev => {
            const updated = [...prev.key_features];
            updated[index] = value;
            return { ...prev, key_features: updated };
        });
    };

    const addFeature = () => {
        setFormData(prev => ({ ...prev, key_features: [...prev.key_features, ''] }));
    };

    const removeFeature = (index) => {
        setFormData(prev => {
            const updated = prev.key_features.filter((_, i) => i !== index);
            return { ...prev, key_features: updated.length ? updated : [''] };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const projectData = {
                ...formData,
                technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
                key_features: formData.key_features.map(f => f.trim()).filter(Boolean),
                hackathon_position: formData.is_hackathon ? formData.hackathon_position : ''
            };

            if (editingProject) {
                const { error } = await projectsService.updateProject(editingProject.id, projectData);
                if (error) throw error;
            } else {
                const { error } = await projectsService.createProject(projectData);
                if (error) throw error;
            }

            setShowForm(false);
            setEditingProject(null);
            setFormData({
                title: '',
                short_summary: '',
                description: '',
                image: '',
                technologies: '',
                github: '',
                liveDemo: '',
                key_features: [''],
                is_hackathon: false,
                hackathon_position: ''
            });
            fetchProjects();
        } catch (err) {
            setError('Failed to save project');
            console.error('Error:', err);
        }
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            short_summary: project.short_summary || '',
            description: project.description,
            image: project.image,
            technologies: project.technologies.join(', '),
            github: project.github,
            liveDemo: project.liveDemo,
            key_features: project.key_features?.length ? project.key_features : [''],
            is_hackathon: project.is_hackathon || false,
            hackathon_position: project.hackathon_position || ''
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const { error } = await projectsService.deleteProject(id);
                if (error) throw error;
                fetchProjects();
            } catch (err) {
                setError('Failed to delete project');
                console.error('Error:', err);
            }
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingProject(null);
        setFormData({
            title: '',
            short_summary: '',
            description: '',
            image: '',
            technologies: '',
            github: '',
            liveDemo: '',
            key_features: [''],
            is_hackathon: false,
            hackathon_position: ''
        });
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    // Show login if not authenticated
    if (!user) {
        return <AdminLogin onLogin={setUser} />;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <FaSpinner className="animate-spin text-green-primary text-4xl" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Manage Projects</h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 bg-green-primary text-white px-4 py-2 rounded hover:bg-green-dark transition-colors"
                    >
                        <FaPlus /> Add Project
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-500 text-white p-4 rounded mb-6">
                    {error}
                </div>
            )}

            {showForm && (
                <div className="bg-gray-900 p-6 rounded-lg mb-8">
                    <h2 className="text-xl font-bold text-white mb-4">
                        {editingProject ? 'Edit Project' : 'Add New Project'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white mb-2">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:border-green-primary focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <ImageUpload
                                    onImageUpload={(imageUrl) => setFormData(prev => ({ ...prev, image: imageUrl }))}
                                    currentImage={formData.image}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-white mb-1">Short Summary</label>
                            <p className="text-gray-400 text-xs mb-2">A punchy one-liner that appears as a subtitle in the project modal</p>
                            <input
                                type="text"
                                name="short_summary"
                                value={formData.short_summary}
                                onChange={handleInputChange}
                                placeholder="e.g. AI-powered room planner built in 48 hours at a hackathon"
                                className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:border-green-primary focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-white mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:border-green-primary focus:outline-none"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-white mb-2">Technologies (comma-separated)</label>
                            <input
                                type="text"
                                name="technologies"
                                value={formData.technologies}
                                onChange={handleInputChange}
                                placeholder="React, Tailwind CSS, Node.js"
                                className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:border-green-primary focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white mb-2">Key Features</label>
                            <div className="space-y-2">
                                {formData.key_features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <span className="text-xs font-mono text-green-400 font-bold w-6 flex-shrink-0">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <input
                                            type="text"
                                            value={feature}
                                            onChange={(e) => handleFeatureChange(i, e.target.value)}
                                            placeholder={`Feature ${i + 1}, e.g. Real-time collaboration`}
                                            className="flex-1 bg-gray-800 text-white p-2.5 rounded border border-gray-700 focus:border-green-primary focus:outline-none text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(i)}
                                            disabled={formData.key_features.length === 1 && !feature}
                                            className="w-8 h-8 flex items-center justify-center rounded text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                                            title="Remove feature"
                                        >
                                            <FaTimes size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={addFeature}
                                className="mt-2 flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
                            >
                                <FaPlus size={10} />
                                Add Feature
                            </button>
                        </div>

                        <div className="flex items-start gap-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                            <label className="flex items-center gap-3 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    name="is_hackathon"
                                    checked={formData.is_hackathon}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 accent-green-500 cursor-pointer"
                                />
                                <span className="text-white font-medium">Hackathon Project</span>
                            </label>
                            {formData.is_hackathon && (
                                <div className="flex-1">
                                    <label className="block text-gray-400 text-sm mb-2">Position / Award</label>
                                    <select
                                        name="hackathon_position"
                                        value={formData.hackathon_position}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-green-primary focus:outline-none text-sm"
                                    >
                                        <option value="">— Select position —</option>
                                        <option value="1st Place">🥇 1st Place</option>
                                        <option value="2nd Place">🥈 2nd Place</option>
                                        <option value="3rd Place">🥉 3rd Place</option>
                                        <option value="Finalist">Finalist</option>
                                        <option value="Runner-up">Runner-up</option>
                                        <option value="Participant">Participant</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white mb-2">GitHub URL</label>
                                <input
                                    type="url"
                                    name="github"
                                    value={formData.github}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:border-green-primary focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">Live Demo URL</label>
                                <input
                                    type="url"
                                    name="liveDemo"
                                    value={formData.liveDemo}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:border-green-primary focus:outline-none"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex items-center gap-2 bg-green-primary text-white px-6 py-2 rounded hover:bg-green-dark transition-colors"
                            >
                                <FaSave /> {editingProject ? 'Update' : 'Create'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex items-center gap-2 bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
                            >
                                <FaTimes /> Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-gray-900 rounded-lg overflow-hidden">
                        <div className="h-48 bg-gray-800 relative">
                            <img src={project.image} alt={project.title} className="object-cover w-full h-full" />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                {project.is_hackathon && (
                                    <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ background: '#f59e0b', color: '#fff' }}>
                                        🏆 {project.hackathon_position || 'Hackathon'}
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-300 text-sm mb-2">{project.description}</p>
                            <div className="flex flex-wrap gap-1 mb-4">
                                {project.technologies.map((tech, index) => (
                                    <span key={index} className="bg-green-primary text-white text-xs px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
