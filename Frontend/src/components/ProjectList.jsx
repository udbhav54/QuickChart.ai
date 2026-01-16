import React from "react";

const ProjectList = ({
  projects,
  selectedProject,
  onSelectProject,
  onCreateProject,
}) => {
  return (
    <div className="sidebar">
      <h2>Projects</h2>
      <ul className="project-list">
        {projects.map((project) => (
          <li
            key={project._id}
            className={`project-item ${
              selectedProject?._id === project._id ? "active" : ""
            }`}
            onClick={() => onSelectProject(project)}
          >
            {project.name}
          </li>
        ))}
      </ul>
      <button className="btn create-project-btn" onClick={onCreateProject}>
        + New Project
      </button>
    </div>
  );
};

export default ProjectList;
