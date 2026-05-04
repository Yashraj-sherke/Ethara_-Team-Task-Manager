import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/taskService';
import { getProjects } from '../api/projectService';
import { getUsers } from '../api/userService';
import TaskCard from '../components/tasks/TaskCard';
import TaskForm from '../components/tasks/TaskForm';
import TaskFilters from '../components/tasks/TaskFilters';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { HiPlus } from 'react-icons/hi';
import toast from 'react-hot-toast';

const Tasks = () => {
  const { user, isAdmin } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({});
  const [formLoading, setFormLoading] = useState(false);

  const fetchTasks = (f = filters) => {
    setLoading(true);
    getTasks(f)
      .then((res) => setTasks(res.data.data || []))
      .catch(() => toast.error('Failed to load tasks'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTasks();
    getProjects().then((res) => setProjects(res.data.data || [])).catch(() => {});
    if (isAdmin) {
      getUsers().then((res) => setAllMembers(res.data.data || [])).catch(() => {});
    }
  }, []);

  useEffect(() => { fetchTasks(filters); }, [filters]);

  const handleCreate = async (data) => {
    setFormLoading(true);
    try {
      await createTask(data);
      toast.success('Task created!');
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task');
    } finally { setFormLoading(false); }
  };

  const handleUpdate = async (data) => {
    setFormLoading(true);
    try {
      await updateTask(editingTask._id, data);
      toast.success('Task updated!');
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update task');
    } finally { setFormLoading(false); }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      toast.success('Task deleted');
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      await updateTask(taskId, { status });
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Tasks</h1>
          <p className="text-sm text-surface-500 mt-1">{tasks.length} task{tasks.length !== 1 ? 's' : ''}</p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowForm(true)}>
            <HiPlus className="h-4 w-4" /> New Task
          </Button>
        )}
      </div>

      <TaskFilters filters={filters} onChange={setFilters} />

      {loading ? <LoadingSpinner /> : tasks.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-surface-100">
          <h3 className="text-lg font-semibold text-surface-700 mb-2">No tasks found</h3>
          <p className="text-sm text-surface-400">Try changing your filters or create a new task</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onStatusChange={handleStatusChange} onEdit={setEditingTask} onDelete={handleDelete} isAdmin={isAdmin} currentUserId={user?._id} />
          ))}
        </div>
      )}

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Create Task">
        <TaskForm onSubmit={handleCreate} projects={projects} members={allMembers} loading={formLoading} onCancel={() => setShowForm(false)} />
      </Modal>

      <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)} title="Edit Task">
        {editingTask && <TaskForm onSubmit={handleUpdate} initialData={editingTask} projects={projects} members={allMembers} loading={formLoading} onCancel={() => setEditingTask(null)} />}
      </Modal>
    </div>
  );
};

export default Tasks;
