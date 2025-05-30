import { socialLinks } from "@/data";
import React from "react";

const Hero = () => {
  const linkClass = "underline text-gray-500 hover:text-gray-700 transition-colors";

  return (
    <section className="
      max-w-[1200px] w-full mx-auto 
      min-h-[calc(100vh-200px)]
      default-padding py-[120px] max-lg:py-20 max-md:py-12
      flex flex-col justify-center gap-y-8
      max-lg:justify-start
    ">

      <h1 className="default-subheading font-bold z-10">
        I&apos;m Micah, I build <br className="max-sm:hidden" />
        <span className="font-accent font-medium">full-stack</span> applications.
      </h1>

      <p className="default-text">
        I&apos;m an incoming Software Engineering major at the <a href="https://www.unl.edu/" className={linkClass} target="_blank">Raikes School in University of Nebraska-Lincoln</a>. Previously I scored the highest mark in Indonesia for AS Level Computer Science. I am currently leading the development of <a href="/projects" className={linkClass}>Mira</a>!
      </p>

      {/* <ButtonLink text="Visit Portfolio" link="/portfolio" /> */}

      <div className="flex items-center gap-x-4 mt-4">
        {socialLinks.map((link, index) => (
          <a 
            key={index} 
            href={link.href} 
            className="default-text hover:opacity-70 transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Social link ${index + 1}`}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </section>  
  );
};

export default Hero;