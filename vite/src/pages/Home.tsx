import { usePosts, useCreatePost } from '../services/post.service';
import { useUser } from '../services/auth.service';

export const Home = () => {
  const { user, isLoading: userLoading } = useUser();
  const { posts, isLoading: postsLoading } = usePosts();
  const { createPost, isPending: createLoading, error: createError } = useCreatePost();

  if (userLoading || postsLoading) return (
    <div className="min-h-screen bg-[#1a1b1e] text-white flex items-center justify-center">
      Loading...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1a1b1e] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Recent Posts</h1>
        <div className="grid gap-4">
          {posts?.map((post) => (
            <div key={post._id} className="p-6 bg-[#25262b] rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-300 mb-4">{post.content}</p>
              <p className="text-sm text-gray-400">
                By {post.author.username}
              </p>
            </div>
          ))}
        </div>
        {createLoading && <p>Creating post...</p>}
        {createError && <p>Error: {createError.message}</p>}
      </div>
    </div>
  );
}; 