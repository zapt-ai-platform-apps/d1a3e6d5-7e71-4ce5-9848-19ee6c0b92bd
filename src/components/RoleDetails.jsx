import { createSignal, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';

function RoleDetails(props) {
  const { role, setSelectedRole, loading, setLoading } = props;
  const [imageUrl, setImageUrl] = createSignal('');

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const result = await createEvent('generate_image', {
        prompt: `A kid-friendly illustration of a ${role.role} at work in a construction site`,
      });
      setImageUrl(result);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="bg-white p-6 rounded-lg shadow-md mb-4">
      <h2 class="text-2xl font-bold mb-4 text-green-600">Your Recommended Role: {role.role}</h2>
      <p class="mb-4">{role.description}</p>
      <Show when={imageUrl()}>
        <img src={imageUrl()} alt={role.role} class="w-full rounded-lg shadow-md mb-4" />
      </Show>
      <button
        onClick={handleGenerateImage}
        disabled={loading()}
        class={`px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
          loading() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading() ? 'Generating Image...' : 'Show Me an Image'}
      </button>
      <button
        onClick={() => setSelectedRole(null)}
        class="ml-4 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        Choose Another Role
      </button>
    </div>
  );
}

export default RoleDetails;