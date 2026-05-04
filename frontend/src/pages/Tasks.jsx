import { useState, useEffect } from 'react';
import { HiPlus, HiSearch } from 'react-icons/hi';
import { getTasks, createTask, updateTask, deleteTask } from '../api/taskService';
import { getProjects } from '../api/projectService';
import { getUsers } from '../api/userService';
import { useAuth } from '../hooks/useAuth';
import TaskCard from '../components/tasks/TaskCard';
import TaskForm from '../components/tasks/TaskForm';
import TaskFilters from '../components/tasks/TaskFilters';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [filters, setFilters] = useState({ status: '', priority: '' });
  const { user, isAdmin } = useAuth();

  const fetchTasks = () => {
    const params = {};
    if (filters.status) params.status = filters.status;
    if (filters.priority) params.priority = filters.priority;
    getTasks(params)
      .then(res => setTasks(res.data.data || []))
      .catch(() => toast.error('Failed to load tasks'))
      .finally(() => setLoading(false));
  };

  useEffect(fetchTasks, [filters]);
  useEffect(() => {
    getProjects().then(res => setProjects(res.data.data || [])).catch(() => {});
    getUsers().then(res => setMembers(res.data.data || [])).catch(() => {});
  }, []);

  const handleStatusChange = async (taskId, status) => {
    try { await updateTask(taskId, { status }); toast.success('Status updated'); fetchTasks(); }
    catch { toast.error('Failed to update'); }
  };

  const handleCreate = async (data) => {
    setFormLoading(true);
    try { await createTask(data); toast.success('Task created'); setModalOpen(false); fetchTasks(); }
    catch { toast.error('Failed to create task'); }
    finally { setFormLoading(false); }
  };

  const handleUpdate = async (data) => {
    setFormLoading(true);
    try { await updateTask(editTask._id, data); toast.success('Task updated'); setEditTask(null); fetchTasks(); }
    catch { toast.error('Failed to update task'); }
    finally { setFormLoading(false); }
  };

  const handleDelete = async () => {
    try { await deleteTask(deleteId); toast.success('Task deleted'); setDeleteId(null); fetchTasks(); }
    catch { toast.error('Failed to delete task'); }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-white">Tasks</h1>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-1">{tasks.length} tasks</p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="w-full sm:w-auto"><HiPlus className="h-4 w-4 mr-1.5" /> New Task</Button>
      </div>

      <TaskFilters filters={filters} onChange={setFilters} />

      {tasks.length === 0 ? (
        <div className="rounded-2xl bg-white dark:bg-surface-900 p-8 sm:p-12 text-center border border-surface-100 dark:border-surface-800">
          <p className="text-surface-400 dark:text-surface-500">No tasks found. Try adjusting filters or create a new task.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {tasks.map(t => (
            <TaskCard key={t._id} task={t} isAdmin={isAdmin} currentUserId={user?._id}
              onStatusChange={handleStatusChange} onEdit={setEditTask} onDelete={setDeleteId} />
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen || !!editTask} onClose={() => { setModalOpen(false); setEditTask(null); }} title={editTask ? 'Edit Task' : 'New Task'} size="lg">
        <TaskForm onSubmit={editTask ? handleUpdate : handleCreate} initialData={editTask}
          projects={projects} members={members} loading={formLoading} onCancel={() => { setModalOpen(false); setEditTask(null); }} />
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} title="Delete Task" message="This action cannot be undone." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export default Tasks;
