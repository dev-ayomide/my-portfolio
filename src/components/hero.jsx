import SocialIcon from "./social-icon";

export default function Hero() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = './Taiwo_Ayomide_Resume.pdf';
    link.download = 'Taiwo_Ayomide_Resume.pdf';
    link.click();
  };

  return (
    <section
      id="home"
      className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-24 p-8 md:p-16"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Hi, I'm <span className="text-green-primary">Taiwo Ayomide</span>
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Software Engineer
        </h2>
        <p className="text-muted-foreground text-lg">
          Passionate and results-driven software engineer with experience in
          full-stack web development and AI-driven applications.
          Works with React, Django with a
          focus on building scalable and efficient solutions. Proven ability to
          work independently and in teams, with participation in hackathons and
          bounty challenges. Enthusiastic about problem-solving and innovation.
        </p>
        <div className="flex flex-row gap-4 pt-4">
          <button
            type="button"
            onClick={handleDownload}
            className="w-full flex justify-center items-center bg-gray-800 hover:bg-green-dark text-white font-medium md:py-4 rounded-md transition-colors"
          >
            Download Resume
          </button>
          <a
            href="#contact"
            className="w-full flex justify-center items-center bg-gray-800 hover:bg-green-dark text-white font-medium md:py-4 rounded-md transition-colors"
          >
            Contact Me
          </a>
        </div>
        <div className="flex gap-4 mt-4"></div>
      </div>
      <div className="flex justify-center">
        <div className="relative w-81 h-81 overflow-hidden border-4 border-primary">
          <img src="/mypic.jpg" alt="Taiwo Ayomide" className="object-cover w-full h-full"/>
        </div>
      </div>

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
    </section>
  );
}
