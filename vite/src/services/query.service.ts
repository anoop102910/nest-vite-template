import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from './api.service';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: apiService.auth.login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: apiService.auth.register,
  });

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: apiService.auth.getProfile,
    enabled: !!localStorage.getItem('token'),
  });

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    user: userQuery.data,
    isLoading: userQuery.isLoading,
  };
};

export const usePosts = () => {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: apiService.posts.getAll,
  });

  const createPostMutation = useMutation({
    mutationFn: apiService.posts.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return {
    posts: postsQuery.data,
    isLoading: postsQuery.isLoading,
    createPost: createPostMutation.mutate,
  };
}; 