import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaJs, FaNodeJs, FaGitAlt, 
  FaFigma, FaSass, FaPython, FaDocker, 
  FaHtml5,
  FaJava
} from 'react-icons/fa';
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, 
  SiGraphql, SiMongodb, SiPostgresql, SiRedux, 
  SiMysql,
  SiVisualstudiocode,
  SiPhp,
  SiC,
  SiReact
} from 'react-icons/si';
import './Skills.css';

const Skills = () => {
  const skillsCategories = [
    {
      title: "Frontend",
      skills: [
        { 
          name: "HTML5", 
          icon: <FaHtml5 />, 
          href: "https://developer.mozilla.org/en-US/docs/Web/HTML", 
          color: "#f05e1aff" 
        },
        { 
          name: "Tailwind CSS", 
          icon: <SiTailwindcss />, 
          href: "https://tailwindcss.com/",
          color: "#06B6D4" 
        },
        { 
          name: "JavaScript", 
          icon: <FaJs />, 
          href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
          color: "#F7DF1E" 
        },
        { 
          name: "TypeScript", 
          icon: <SiTypescript />, 
          href: "https://www.typescriptlang.org/",
          color: "#3178C6" 
        },
        { 
          name: "React", 
          icon: <FaReact />, 
          href: "https://reactjs.org/",
          color: "#61DAFB" 
        },
      ]
    },
    {
      title: "Backend",
      skills: [
        { 
          name: "Node.js", 
          icon: <FaNodeJs />, 
          href: "https://nodejs.org/",
          color: "#339933" 
        },
        { 
          name: "Python", 
          icon: <FaPython />, 
          href: "https://www.python.org/",
          color: "#3776AB" 
        },
        { 
          name: "PHP", 
          icon: <SiPhp />, 
          href: "https://www.php.net/",
          color: "#777BB4" 
        },
        { 
          name: "Java", 
          icon: <FaJava />, 
          href: "https://www.java.com/",
          color: "#007396" 
        },
        { 
          name: "MySQL", 
          icon: <SiMysql />, 
          href: "https://www.mysql.com/",
          color: "#4479A1" 
        },
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        { 
          name: "VSCode", 
          icon: <SiVisualstudiocode />, 
          href: "https://code.visualstudio.com/",
          color: "#007ACC" 
        },
        { 
          name: "Git", 
          icon: <FaGitAlt />, 
          href: "https://git-scm.com/",
          color: "#F05032" 
        },
        { 
          name: "Docker", 
          icon: <FaDocker />, 
          href: "https://www.docker.com/",
          color: "#2496ED" 
        },
        { 
          name: "Figma", 
          icon: <FaFigma />, 
          href: "https://www.figma.com/",
          color: "#F24E1E" 
        },
        { 
          name: "SASS", 
          icon: <FaSass />, 
          href: "https://sass-lang.com/",
          color: "#CC6699" 
        },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-subtitle">Keahlian Saya</span>
          <h2 className="section-title">Keterampilan & Teknologi</h2>
          <p className="section-description">
            Teknologi dan alat yang saya gunakan untuk mewujudkan ide menjadi nyata.
          </p>
        </motion.div>

        <div className="skills-container">
          {skillsCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="skills-category"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h3 className="category-title">{category.title}</h3>
              <motion.div
                className="skills-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.skills.map((skill, index) => (
                  <motion.a
                    key={skill.name}
                    href={skill.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="skill-card"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="skill-icon" style={{ color: skill.color }}>
                      {skill.icon}
                    </div>
                    <div className="skill-info">
                      <h4 className="skill-name">{skill.name}</h4>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;