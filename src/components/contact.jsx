import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";

export default function Contact() {
return (
    <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-12">
                    <h2 className="text-2xl font-bold mb-8">CONTACT ME</h2>

                    <div className="flex items-start space-x-6">
                        <div className="bg-gray-900 p-4 rounded-lg">
                            <FaEnvelope size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-gray-400 font-medium mb-2">MAIL US</h3>
                            <a href="mailto:ayomidepaul784@gmail.com" className="text-white">ayomidepaul784@gmail.com</a>
                        </div>
                    </div>

                    <div className="flex items-start space-x-6">
                        <div className="bg-gray-900 p-4 rounded-lg">
                            <FaPhone size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-gray-400 font-medium mb-2">CONTACT US</h3>
                            <a href="tel:+2349168897258" className="text-white">+234 9168897258</a><br/>
                            <a href="tel:+234902595668" className="text-white">+234 902595668</a>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-6">SOCIAL INFO</h2>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.linkedin.com/in/taiwoayomide/"
                                className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedin size={20} />
                            </a>
                            <a
                                href="https://github.com/dev-ayomide"
                                className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGithub size={20} />
                            </a>
                            <a
                                href="https://wa.me/qr/MKEHQ4R4AOQKO1"
                                className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaWhatsapp size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 p-8 rounded-lg">
                    <h2 className="text-4xl font-bold mb-8">
                        Let's work <span className="text-green-primary">together.</span>
                    </h2>

                    <form className="space-y-6">
                        <div>
                            <input
                                type="text"
                                placeholder="Name *"
                                className="w-full bg-gray-800 border-none rounded-md p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-primary focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email *"
                                className="w-full bg-gray-800 border-none rounded-md p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-primary focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <textarea
                                placeholder="Your Message *"
                                rows={6}
                                className="w-full bg-gray-800 border-none rounded-md p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-primary focus:outline-none resize-none"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-4 rounded-md transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
);
}
