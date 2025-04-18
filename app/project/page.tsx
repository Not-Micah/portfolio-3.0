"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getProjectBySlug, Project } from '@/data/projects';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { HiOutlineDotsVertical } from 'react-icons/hi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProjectPage() {
  const searchParams = useSearchParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = searchParams.get('name');
    if (slug) {
      const foundProject = getProjectBySlug(slug);
      setProject(foundProject || null);
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="max-w-[1200px] w-full mx-auto px-6 py-16 max-lg:py-8">
        <div className="w-full animate-pulse">
          <div className="h-8 bg-gray-200 rounded-md w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded-lg w-full mb-8"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-[1200px] w-full mx-auto px-6 py-16 max-lg:py-8">
        <div className="text-center py-16">
          <h1 className="default-heading mb-4">Project Not Found</h1>
          <p className="default-text mb-8">The project you're looking for doesn't exist or has been removed.</p>
          <Link href="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] w-full mx-auto px-6 py-16 max-lg:py-8">
      {/* Back button - GitHub style */}
      <Link 
        href="/" 
        className="inline-flex items-center text-gray-700 hover:text-gray-900 mb-8 group transition-colors"
      >
        <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
        Back to Projects
      </Link>

      {/* Project header - GitHub style */}
      <div className="mb-10 border-b border-gray-200 pb-6">
        <div className="flex items-center gap-x-4 mb-4">
          <h1 className="default-subheading text-3xl md:text-4xl font-bold">{project.title}</h1>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full default-label font-medium">
            {project.category}
          </span>
        </div>
        <p className="default-text text-gray-600 max-w-3xl">{project.description}</p>
      </div>

      {/* Image showcase */}
      {project.images && project.images.length > 0 ? (
        <div className="w-full mb-12 rounded-lg overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ 
              clickable: true,
              type: 'bullets',
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active'
            }}
            loop={true}
            className="rounded-lg"
          >
            {project.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative pb-[56.25%] h-0">
                  <img 
                    src={image} 
                    alt={`${project.title} image ${index + 1}`} 
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
              </SwiperSlide>
            ))}
            
            {/* Custom navigation buttons */}
            <div className="swiper-button-prev !w-10 !h-10 !text-white !bg-black/20 rounded-full !left-4 after:!text-lg hover:!bg-black/40 transition-colors"></div>
            <div className="swiper-button-next !w-10 !h-10 !text-white !bg-black/20 rounded-full !right-4 after:!text-lg hover:!bg-black/40 transition-colors"></div>
            
            {/* Standard pagination */}
            <div className="swiper-pagination !bottom-4"></div>
          </Swiper>
        </div>
      ) : null}

      {/* Project content - GitHub style layout */}
      <div className="mt-10 flex flex-col gap-6">
        {/* Project overview card */}
        <div className="bg-white border border-gray-200 rounded-md p-6">
          <h2 className="default-text text-xl font-semibold mb-4">
            Project Overview
          </h2>
          <p className="default-text text-gray-700 leading-relaxed whitespace-pre-line">
            {project.overview}
          </p>
        </div>

        {/* Technologies & Links - Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Technologies */}
          <div className="bg-white border border-gray-200 rounded-md p-6">
            <h2 className="default-text text-xl font-semibold mb-4">
              Technologies
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.techs.map((tech, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-100"
                >
                  <span className="text-gray-700">{tech.icon}</span>
                  <span className="font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Project links */}
          <div className="bg-white border border-gray-200 rounded-md p-6">
            <h2 className="default-text text-xl font-semibold mb-4">
              Project Links
            </h2>
            <div className="space-y-4">
              {project.appUrl && (
                <a 
                  href={project.appUrl}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center p-4 rounded-md bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex-1">
                    <h3 className="default-label font-medium mb-1">Live Demo</h3>
                    <p className="default-label text-sm text-gray-500 truncate">{project.appUrl}</p>
                  </div>
                  <HiOutlineDotsVertical className="text-gray-500" />
                </a>
              )}
              
              {project.repositoryUrl && (
                <a 
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center p-4 rounded-md bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex-1">
                    <h3 className="default-label font-medium mb-1">Source Code</h3>
                    <p className="default-label text-sm text-gray-500 truncate">{project.repositoryUrl}</p>
                  </div>
                  <HiOutlineDotsVertical className="text-gray-500" />
                </a>
              )}
              
              {project.videoUrl && (
                <a 
                  href={project.videoUrl.replace('embed/', 'watch?v=')}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center p-4 rounded-md bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex-1">
                    <h3 className="default-label font-medium mb-1">Video Demo</h3>
                    <p className="default-label text-sm text-gray-500 truncate">Watch on YouTube</p>
                  </div>
                  <HiOutlineDotsVertical className="text-gray-500" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
