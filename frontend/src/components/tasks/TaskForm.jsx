import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../common/Input';
import Button from '../common/Button';

const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required').max(200),
  description: z.string().max(1000).optional(),
  project: z.string().min(1, 'Project is required'),
  assignedTo: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.string().optional(),
  status: z.enum(['todo', 'in-progress', 'completed']).optional(),
});

const TaskForm = ({ onSubmit, initialData = null, projects = [], members = [], loading = false, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: initialData ? {
      ...initialData,
      project: initialData.project?._id || initialData.project || '',
      assignedTo: initialData.assignedTo?._id || initialData.assignedTo || '',
      dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '',
    } : { title: '', description: '', project: '', assignedTo: '', priority: 'medium', dueDate: '', status: 'todo' },
  });

  const handleFormSubmit = (data) => {
    const cleaned = { ...data };
    if (!cleaned.assignedTo) delete cleaned.assignedTo;
    if (!cleaned.dueDate) delete cleaned.dueDate;
    onSubmit(cleaned);
  };

  const selectClass = "w-full rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 px-3.5 py-2.5 text-sm text-surface-900 dark:text-surface-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20";

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input label="Task Title" placeholder="Enter task title" error={errors.title?.message} {...register('title')} />
      <div className="space-y-1">
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">Description</label>
        <textarea
          className="w-full rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 px-3.5 py-2.5 text-sm text-surface-900 dark:text-surface-200 placeholder:text-surface-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 min-h-[80px] resize-none"
          placeholder="Describe the task"
          {...register('description')}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">Project</label>
          <select className={`${selectClass} ${errors.project ? 'border-rose-500' : ''}`} {...register('project')}>
            <option value="">Select project</option>
            {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
          {errors.project && <p className="text-xs text-rose-600">{errors.project.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">Assign To</label>
          <select className={selectClass} {...register('assignedTo')}>
            <option value="">Unassigned</option>
            {members.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">Priority</label>
          <select className={selectClass} {...register('priority')}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <Input label="Due Date" type="date" error={errors.dueDate?.message} {...register('dueDate')} />
      </div>
      {initialData && (
        <div className="space-y-1">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">Status</label>
          <select className={selectClass} {...register('status')}>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      )}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
        {onCancel && <Button type="button" variant="secondary" onClick={onCancel} className="w-full sm:w-auto">Cancel</Button>}
        <Button type="submit" loading={loading} className="w-full sm:w-auto">{initialData ? 'Update Task' : 'Create Task'}</Button>
      </div>
    </form>
  );
};

export default TaskForm;
