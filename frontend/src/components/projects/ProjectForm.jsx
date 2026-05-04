import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../common/Input';
import Button from '../common/Button';

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100),
  description: z.string().min(1, 'Description is required').max(500),
  status: z.enum(['active', 'completed', 'archived']).optional(),
});

const ProjectForm = ({ onSubmit, initialData = null, loading = false, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || { name: '', description: '', status: 'active' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Project Name" placeholder="Enter project name" error={errors.name?.message} {...register('name')} />
      <div className="space-y-1">
        <label className="block text-sm font-medium text-surface-700">Description</label>
        <textarea
          className={`w-full rounded-lg border border-surface-300 bg-white px-3.5 py-2.5 text-sm text-surface-900 placeholder:text-surface-400 transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 min-h-[100px] resize-none ${errors.description ? 'border-rose-500' : ''}`}
          placeholder="Describe your project"
          {...register('description')}
        />
        {errors.description && <p className="text-xs text-rose-600">{errors.description.message}</p>}
      </div>
      {initialData && (
        <div className="space-y-1">
          <label className="block text-sm font-medium text-surface-700">Status</label>
          <select className="w-full rounded-lg border border-surface-300 bg-white px-3.5 py-2.5 text-sm text-surface-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20" {...register('status')}>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      )}
      <div className="flex justify-end gap-3 pt-2">
        {onCancel && <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" loading={loading}>{initialData ? 'Update Project' : 'Create Project'}</Button>
      </div>
    </form>
  );
};

export default ProjectForm;
