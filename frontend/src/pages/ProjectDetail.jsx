import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProject, updateProject, deleteProject, addMember, removeMember } from '../api/projectService';
import { createTask, updateTask, deleteTask } from '../api/taskService';
import { getUsers } from '../api/userService';
import ProjectForm from '../components/projects/ProjectForm';
import TaskCard from '../components/tasks/TaskCard';
import TaskForm from '../components/tasks/TaskForm';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import ConfirmDialog from '../components/common/ConfirmDialog';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { HiPlus, HiPencil, HiTrash, HiUserAdd, HiArrowLeft } from 'react-icons/hi';
import { getInitials } from '../utils/helpers';
import toast from 'react-hot-toast';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [project, setProject] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchProject = () => {
    getProject(id)
      .then((res) => setProject(res.data.data))
      .catch(() => toast.error('Failed to load project'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProject();
    if (isAdmin) {
      getUsers().then((res) => setAllUsers(res.data.data || [])).catch(() => {});
    }
  }, [id]);

  const handleUpdate = async (data) => {
    setActionLoading(true);
    try {
      await updateProject(id, data);
      toast.success('Project updated!');
      setShowEdit(false);
      fetchProject();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally { setActionLoading(false); }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await deleteProject(id);
      toast.success('Project deleted!');
      navigate('/projects');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    } finally { setActionLoading(false); }
  };

  const handleAddMember = async () => {
    if (!selectedUserId) return;
    setActionLoading(true);
    try {
      await addMember(id, selectedUserId);
      toast.success('Member added!');
      setShowAddMember(false);
      setSelectedUserId('');
      fetchProject();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add member');
    } finally { setActionLoading(false); }
  };

  const handleRemoveMember = async (userId) => {
    try {
      await removeMember(id, userId);
      toast.success('Member removed');
      fetchProject();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove');
    }
  };

  const handleCreateTask = async (data) => {
    setActionLoading(true);
    try {
      await createTask({ ...data, project: id });
      toast.success('Task created!');
      setShowTaskForm(false);
      fetchProject();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task');
    } finally { setActionLoading(false); }
  };

  const handleUpdateTask = async (data) => {
    setActionLoading(true);
    try {
      await updateTask(editingTask._id, data);
      toast.success('Task updated!');
      setEditingTask(null);
      fetchProject();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update task');
    } finally { setActionLoading(false); }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      toast.success('Task deleted');
      fetchProject();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      await updateTask(taskId, { status });
      fetchProject();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!project) return <div className="text-center py-12 text-surface-500">Project not found</div>;

  const availableUsers = allUsers.filter(u => !project.members?.some(m => m._id === u._id));

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/projects')} className="flex items-center gap-1 text-sm text-surface-500 hover:text-primary-600 transition-colors">
        <HiArrowLeft className="h-4 w-4" /> Back to Projects
      </button>

      <div className="rounded-2xl bg-white p-6 shadow-sm border border-surface-100">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-surface-900">{project.name}</h1>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${project.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-surface-100 text-surface-600'}`}>{project.status}</span>
            </div>
            <p className="text-sm text-surface-500">{project.description}</p>
          </div>
          {isAdmin && (
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={() => setShowEdit(true)}><HiPencil className="h-4 w-4" /> Edit</Button>
              <Button variant="danger" size="sm" onClick={() => setShowDeleteConfirm(true)}><HiTrash className="h-4 w-4" /> Delete</Button>
            </div>
          )}
        </div>
      </div>

      {/* Members */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-surface-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-surface-900">Members ({project.members?.length || 0})</h2>
          {isAdmin && <Button size="sm" onClick={() => setShowAddMember(true)}><HiUserAdd className="h-4 w-4" /> Add</Button>}
        </div>
        <div className="flex flex-wrap gap-3">
          {project.members?.map((m) => (
            <div key={m._id} className="flex items-center gap-2 rounded-xl bg-surface-50 px-3 py-2 border border-surface-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-xs font-bold text-white">{getInitials(m.name)}</div>
              <div>
                <p className="text-sm font-medium text-surface-800">{m.name}</p>
                <p className="text-xs text-surface-400">{m.role}</p>
              </div>
              {isAdmin && !project.owner._id !== m._id && project.owner?._id !== m._id && (
                <button onClick={() => handleRemoveMember(m._id)} className="ml-2 text-xs text-surface-400 hover:text-rose-600">✕</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tasks */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-surface-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-surface-900">Tasks ({project.tasks?.length || 0})</h2>
          {isAdmin && <Button size="sm" onClick={() => setShowTaskForm(true)}><HiPlus className="h-4 w-4" /> Add Task</Button>}
        </div>
        {project.tasks?.length === 0 ? (
          <p className="text-sm text-surface-400 text-center py-6">No tasks yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {project.tasks?.map((task) => (
              <TaskCard key={task._id} task={task} onStatusChange={handleStatusChange} onEdit={setEditingTask} onDelete={handleDeleteTask} isAdmin={isAdmin} currentUserId={user?._id} />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <Modal isOpen={showEdit} onClose={() => setShowEdit(false)} title="Edit Project">
        <ProjectForm onSubmit={handleUpdate} initialData={project} loading={actionLoading} onCancel={() => setShowEdit(false)} />
      </Modal>

      <Modal isOpen={showTaskForm} onClose={() => setShowTaskForm(false)} title="Create Task">
        <TaskForm onSubmit={handleCreateTask} projects={[project]} members={project.members || []} loading={actionLoading} onCancel={() => setShowTaskForm(false)} />
      </Modal>

      <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)} title="Edit Task">
        {editingTask && <TaskForm onSubmit={handleUpdateTask} initialData={editingTask} projects={[project]} members={project.members || []} loading={actionLoading} onCancel={() => setEditingTask(null)} />}
      </Modal>

      <Modal isOpen={showAddMember} onClose={() => setShowAddMember(false)} title="Add Member" size="sm">
        <div className="space-y-4">
          <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)} className="w-full rounded-lg border border-surface-300 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
            <option value="">Select a user</option>
            {availableUsers.map(u => <option key={u._id} value={u._id}>{u.name} ({u.email})</option>)}
          </select>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setShowAddMember(false)}>Cancel</Button>
            <Button onClick={handleAddMember} loading={actionLoading} disabled={!selectedUserId}>Add Member</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} onConfirm={handleDelete} title="Delete Project" message="This will permanently delete this project and all its tasks. This action cannot be undone." loading={actionLoading} />
    </div>
  );
};

export default ProjectDetail;
