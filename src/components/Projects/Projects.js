import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar, FiCode } from 'react-icons/fi';
import { projectsData } from '../../data/ProjectsData';
import './Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('Semua');
  const [hoveredProject, setHoveredProject] = useState(null);

  const categories = ['Semua', 'react', 'nextjs', 'javascript', 'fullstack'];

  const filteredProjects = filter === 'Semua' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-subtitle">Portofolio Saya</span>
          <h2 className="section-title">Proyek Unggulan</h2>
          <p className="section-description">
            Ini adalah beberapa proyek favorit yang telah saya buat belakangan ini.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="projects-filter"
        >
          {categories.map(category => (
            <motion.button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className={`project-overlay ${hoveredProject === project.id ? 'active' : ''}`}>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <FiGithub size={24} />
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <FiExternalLink size={24} />
                    </a>
                  </div>
                </div>
                <div className="project-badge">
                  <span>{project.category}</span>
                </div>
              </div>

              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-stats">
                    <span className="stat">
                      <FiCode /> {project.tech.length} techs
                    </span>
                  </div>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.tech.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;