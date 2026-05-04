import { useState, useEffect } from 'react';
import { HiPlus, HiSearch } from 'react-icons/hi';
import { getProjects, createProject, updateProject, deleteProject } from '../api/projectService';
import { useAuth } from '../hooks/useAuth';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectForm from '../components/projects/ProjectForm';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAdmin } = useAuth();

  const fetchProjects = () => {
    getProjects()
      .then((res) => setProjects(res.data.data || []))
      .catch(() => toast.error('Failed to load projects'))
      .finally(() => setLoading(false));
  };
  useEffect(fetchProjects, []);

  const handleCreate = async (data) => {
    setFormLoading(true);
    try { await createProject(data); toast.success('Project created'); setModalOpen(false); fetchProjects(); }
    catch { toast.error('Failed to create project'); }
    finally { setFormLoading(false); }
  };

  const handleUpdate = async (data) => {
    setFormLoading(true);
    try { await updateProject(editProject._id, data); toast.success('Project updated'); setEditProject(null); fetchProjects(); }
    catch { toast.error('Failed to update project'); }
    finally { setFormLoading(false); }
  };

  const handleDelete = async () => {
    try { await deleteProject(deleteId); toast.success('Project deleted'); setDeleteId(null); fetchProjects(); }
    catch { toast.error('Failed to delete project'); }
  };

  if (loading) return <LoadingSpinner />;

  const filtered = projects.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-white">Projects</h1>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-1">{projects.length} total projects</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex-1 sm:flex-none">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-48 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 pl-9 pr-3 py-2 text-sm placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400"
            />
          </div>
          {isAdmin && <Button onClick={() => setModalOpen(true)} className="shrink-0"><HiPlus className="h-4 w-4 mr-1.5" /> New</Button>}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-white dark:bg-surface-900 p-8 sm:p-12 text-center border border-surface-100 dark:border-surface-800">
          <p className="text-surface-400 dark:text-surface-500">{searchTerm ? 'No projects match your search' : 'No projects yet. Create your first one!'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((p) => (
            <ProjectCard key={p._id} project={p} isAdmin={isAdmin} onEdit={() => setEditProject(p)} onDelete={() => setDeleteId(p._id)} />
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen || !!editProject} onClose={() => { setModalOpen(false); setEditProject(null); }} title={editProject ? 'Edit Project' : 'New Project'}>
        <ProjectForm onSubmit={editProject ? handleUpdate : handleCreate} initialData={editProject} loading={formLoading} onCancel={() => { setModalOpen(false); setEditProject(null); }} />
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} title="Delete Project" message="This will permanently delete the project and all its tasks." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export default Projects;
