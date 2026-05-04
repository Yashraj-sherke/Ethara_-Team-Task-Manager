import { useState, useEffect } from 'react';
import { getProjects, createProject } from '../api/projectService';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectForm from '../components/projects/ProjectForm';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { HiPlus } from 'react-icons/hi';
import toast from 'react-hot-toast';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const { isAdmin } = useAuth();

  const fetchProjects = () => {
    setLoading(true);
    getProjects()
      .then((res) => setProjects(res.data.data || []))
      .catch(() => toast.error('Failed to load projects'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleCreate = async (data) => {
    setFormLoading(true);
    try {
      await createProject(data);
      toast.success('Project created!');
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create project');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Projects</h1>
          <p className="text-sm text-surface-500 mt-1">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowForm(true)}>
            <HiPlus className="h-4 w-4" /> New Project
          </Button>
        )}
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-surface-100">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-surface-100 flex items-center justify-center mb-4">
            <HiPlus className="h-8 w-8 text-surface-400" />
          </div>
          <h3 className="text-lg font-semibold text-surface-700 mb-2">No projects yet</h3>
          <p className="text-sm text-surface-400">Create your first project to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Create New Project">
        <ProjectForm onSubmit={handleCreate} loading={formLoading} onCancel={() => setShowForm(false)} />
      </Modal>
    </div>
  );
};

export default Projects;
