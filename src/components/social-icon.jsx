import React from "react";
import { 
  FaTwitter, 
  FaGithub, 
  FaLinkedin, 
  FaInstagram 
} from "react-icons/fa";

const iconComponents = {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaInstagram
};

const SocialIcon = ({ href, icon }) => {
  const IconComponent = iconComponents[icon];
  
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:text-green-dark transition-colors"
    >
      <IconComponent size={24} />
    </a>
  );
};

export default SocialIcon;
