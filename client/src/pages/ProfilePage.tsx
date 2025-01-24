import { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const fetchUserById = async (userId: string, token: string) => {
    try {
        // Retrieve the token from localStorage
        const userIdd = localStorage.getItem('userId');
        console.log('user id: ', userIdd)
        if (!userIdd) {
          throw new Error('Unauthorized: Token missing');
        }
        const response = await fetch(`http://localhost:3000/users/${userIdd}`, {
                headers: {
                    // Add the Bearer token
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        console.log('ProfilePage: ', response.json);
        return response.json();
    } catch (error: any) {
        throw new Error(error.message || 'An unexpected error occurred');
    }
};

const Profile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  console.log('Profile function: ',userId);
  const token = localStorage.getItem('token');

  useEffect(() => {
    document.title = "Profile";
  }, []);

  // Use React Query to fetch the user's data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user', userId],
    // Ensure `userId` exists
    queryFn: () => fetchUserById(userId!, token!), 
    // Only fetch if `userId` is truthy
    enabled: !!userId && !!token,
  });

  const gotoHome = () => {
      navigate('/');
  };

  if (!userId || !token) {
    return(
        <Layout>
            <p>No user ID found. Please register or log in.</p>
        </Layout>
    );
  }

  if (isLoading) return <p>Loading profile...</p>;
  if (isError) return <p>Error: {error instanceof Error ? error.message : 'An error occurred'}</p>;

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[70vh] bg-gray-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">Profile</h2>        
            <div className="p-4 rounded-lg">

                <p className="text-gray-600"><span className="font-medium">Email:</span> {data.email}</p>
                <p className="text-gray-600"><span className="font-medium">Username:</span> {data.username}</p>
                <p className="text-gray-600"><span className="font-medium">Name:</span> {data.name}</p>

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={gotoHome}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
