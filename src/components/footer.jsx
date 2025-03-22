import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import SocialIcon from "./social-icon";


export default function Footer() {
  return (
    <div className="flex flex-row justify-between p-4 md:p-16">
      <h2 className="text-md">&copy; 2025 Dev Ayomide</h2>
      <div className="flex space-x-4">
      <SocialIcon href="https://github.com/dev-ayomide" icon="FaGithub" />
        <SocialIcon
          href="https://www.linkedin.com/in/taiwoayomide/"
          icon="FaLinkedin"
        />
        <SocialIcon
          href="https://www.instagram.com/dev_ayomide_/"
          icon="FaInstagram"
        />
        <SocialIcon href="https://x.com/dev_ayomide" icon="FaTwitter" />
      </div>
    </div>
  );
}
