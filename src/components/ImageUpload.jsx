import React, { useState } from 'react';
import { FaUpload, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';
import { uploadImageToCloudinary } from '../lib/cloudinary';

export default function ImageUpload({ onImageUpload, currentImage, className = '' }) {
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [preview, setPreview] = useState(currentImage || '');

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setUploadError('Please select a valid image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setUploadError('Image size must be less than 5MB');
            return;
        }

        setUploading(true);
        setUploadError('');

        try {
            // Create preview
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);

            // Upload to Cloudinary
            const imageUrl = await uploadImageToCloudinary(file);
            
            // Clean up preview URL
            URL.revokeObjectURL(previewUrl);
            
            setPreview(imageUrl);
            onImageUpload(imageUrl);
        } catch (error) {
            setUploadError('Failed to upload image. Please try again.');
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = () => {
        setPreview('');
        onImageUpload('');
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <label className="block text-white mb-2">Project Image</label>
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-green-primary transition-colors">
                {preview ? (
                    <div className="space-y-4">
                        <div className="relative inline-block">
                            <img 
                                src={preview} 
                                alt="Preview" 
                                className="max-h-48 max-w-full rounded-lg object-cover"
                            />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                                <FaTimes className="w-3 h-3" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-400">Click to change image</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <FaUpload className="mx-auto text-4xl text-gray-400" />
                        <div>
                            <p className="text-white">Click to upload or drag and drop</p>
                            <p className="text-sm text-gray-400">PNG, JPG, GIF up to 5MB</p>
                        </div>
                    </div>
                )}
                
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>

            {/* Upload Status */}
            {uploading && (
                <div className="flex items-center justify-center gap-2 text-green-primary">
                    <FaSpinner className="animate-spin" />
                    <span>Uploading image...</span>
                </div>
            )}

            {uploadError && (
                <div className="bg-red-500 text-white p-3 rounded text-sm">
                    {uploadError}
                </div>
            )}

            {/* Manual URL Input (Fallback) */}
            <div className="mt-4">
                <label className="block text-sm text-gray-400 mb-2">Or enter image URL manually:</label>
                <input
                    type="url"
                    value={preview}
                    onChange={(e) => {
                        setPreview(e.target.value);
                        onImageUpload(e.target.value);
                    }}
                    placeholder="https://example.com/image.jpg"
                    className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:border-green-primary focus:outline-none text-sm"
                />
            </div>
        </div>
    );
}

