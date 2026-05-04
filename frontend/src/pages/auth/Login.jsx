import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authService';
import { useAuth } from '../../hooks/useAuth';
import { HiCheckCircle } from 'react-icons/hi';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const slides = [
  {
    title: 'Seamless work experience',
    description: 'Everything you need in an easily customizable dashboard. Manage tasks, track time, and collaborate effortlessly.',
    visual: 'dashboard',
  },
  {
    title: 'Team collaboration made easy',
    description: 'Assign tasks, set deadlines, and keep your entire team aligned with real-time project tracking.',
    visual: 'projects',
  },
  {
    title: 'Track progress in real-time',
    description: 'Visual dashboards and status updates help you stay on top of every project milestone.',
    visual: 'tasks',
  },
];

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await loginUser(data);
      const { token, ...userData } = res.data.data;
      login(userData, token);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-20 xl:px-28 bg-white">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 shadow-lg shadow-primary-500/30">
              <HiCheckCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-surface-900 tracking-tight">TaskFlow</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-surface-900 mb-1">Welcome back</h1>
          <p className="text-surface-500 mb-8">Sign in to your account</p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-surface-800">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-surface-900 placeholder:text-surface-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${errors.email ? 'border-rose-400 focus:border-rose-500' : 'border-surface-200 focus:border-primary-500'}`}
                {...register('email')}
              />
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-surface-800">Password</label>
                <span className="text-xs font-medium text-primary-600 hover:text-primary-700 cursor-pointer">Forgot password?</span>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-surface-900 placeholder:text-surface-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${errors.password ? 'border-rose-400 focus:border-rose-500' : 'border-surface-200 focus:border-primary-500'}`}
                {...register('password')}
              />
              {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="h-4 w-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500" />
              <label htmlFor="remember" className="text-sm text-surface-600">Remember me</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-surface-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">Sign up</Link>
          </p>

          {/* Demo Credentials */}
          <div className="mt-8 rounded-xl bg-surface-50 p-4 border-l-4 border-primary-500">
            <p className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-2">Demo Credentials</p>
            <p className="text-xs text-surface-600"><span className="font-semibold">Admin:</span> admin@taskmanager.com / admin123</p>
            <p className="text-xs text-surface-600"><span className="font-semibold">Member:</span> sarah@taskmanager.com / member123</p>
          </div>
        </div>
      </div>

      {/* Right Side - Sliding Showcase */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-primary-500 via-primary-600 to-violet-700 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-300/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12">
          {/* Mock Dashboard Card */}
          <div className="w-full max-w-lg mb-10">
            <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl p-1 transition-all duration-700">
              <div className="rounded-xl bg-surface-900/80 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-rose-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  <div className="ml-4 h-5 w-48 rounded bg-surface-700" />
                </div>

                {slides[currentSlide].visual === 'dashboard' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex gap-3">
                      <div className="flex-1 rounded-lg bg-primary-500/20 p-3">
                        <div className="h-3 w-12 rounded bg-primary-400/50 mb-2" />
                        <div className="h-6 w-8 rounded bg-primary-400 font-bold text-white text-lg flex items-center justify-center">12</div>
                      </div>
                      <div className="flex-1 rounded-lg bg-emerald-500/20 p-3">
                        <div className="h-3 w-16 rounded bg-emerald-400/50 mb-2" />
                        <div className="h-6 w-8 rounded bg-emerald-400 font-bold text-white text-lg flex items-center justify-center">8</div>
                      </div>
                      <div className="flex-1 rounded-lg bg-amber-500/20 p-3">
                        <div className="h-3 w-14 rounded bg-amber-400/50 mb-2" />
                        <div className="h-6 w-8 rounded bg-amber-400 font-bold text-white text-lg flex items-center justify-center">4</div>
                      </div>
                    </div>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-3 rounded-lg bg-surface-800/60 p-3">
                        <div className="h-8 w-8 rounded-lg bg-primary-500/30" />
                        <div className="flex-1">
                          <div className="h-3 w-32 rounded bg-surface-600 mb-1.5" />
                          <div className="h-2 w-20 rounded bg-surface-700" />
                        </div>
                        <div className="h-5 w-16 rounded-full bg-emerald-500/30" />
                      </div>
                    ))}
                  </div>
                )}

                {slides[currentSlide].visual === 'projects' && (
                  <div className="space-y-3 animate-fade-in">
                    {[{ color: 'primary', w: 'w-3/4' }, { color: 'violet', w: 'w-1/2' }, { color: 'amber', w: 'w-5/6' }].map((item, i) => (
                      <div key={i} className="rounded-lg bg-surface-800/60 p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`h-9 w-9 rounded-lg bg-${item.color}-500/30`} />
                          <div>
                            <div className="h-3 w-28 rounded bg-surface-600 mb-1" />
                            <div className="h-2 w-16 rounded bg-surface-700" />
                          </div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-surface-700">
                          <div className={`h-2 ${item.w} rounded-full bg-${item.color}-500 transition-all duration-1000`} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {slides[currentSlide].visual === 'tasks' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {['Todo', 'In Progress', 'Done'].map(label => (
                        <div key={label} className="text-center text-xs font-medium text-surface-400 py-1 rounded bg-surface-800/60">{label}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        ['bg-rose-500/20', 'bg-amber-500/20'],
                        ['bg-primary-500/20', 'bg-violet-500/20'],
                        ['bg-emerald-500/20']
                      ].map((col, ci) => (
                        <div key={ci} className="space-y-2">
                          {col.map((bg, i) => (
                            <div key={i} className={`rounded-lg ${bg} p-3`}>
                              <div className="h-2.5 w-full rounded bg-surface-600/50 mb-2" />
                              <div className="h-2 w-2/3 rounded bg-surface-700/50" />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Slide Text */}
          <div className="text-center max-w-md transition-all duration-500">
            <h2 className="text-2xl xl:text-3xl font-bold text-white mb-3">{slides[currentSlide].title}</h2>
            <p className="text-primary-100/80 text-sm leading-relaxed">{slides[currentSlide].description}</p>
          </div>

          {/* Slide Indicators */}
          <div className="flex gap-2 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
