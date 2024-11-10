import { createSignal, onMount, Show, For } from 'solid-js';
import { createEvent } from '../supabaseClient';

function RoleDetails(props) {
  const { role, setSelectedRole, loading, setLoading } = props;
  const [detailedInfo, setDetailedInfo] = createSignal(null);

  onMount(async () => {
    setLoading(true);
    try {
      const prompt = `
        Provide detailed information about the following construction role: "${role.role}"
        Include the following information in JSON format:
        {
          "role": "Role Name",
          "description": "Detailed description of the role suitable for kids.",
          "routesToEntry": "Routes to entry for the role.",
          "qualificationsNeeded": "Qualifications needed for the role.",
          "helpfulLinks": [
            {
              "name": "Organisation 1",
              "url": "https://organisation1.com"
            },
            {
              "name": "Organisation 2",
              "url": "https://organisation2.com"
            }
          ]
        }
        Include links to helpful information from organisations such as CIOB, Construction Industry Training, and other well-known bodies.
        Ensure the information is specifically about the construction industry role.
      `;
      const result = await createEvent('chatgpt_request', {
        prompt,
        response_type: 'json',
      });
      if (result && result.role) {
        setDetailedInfo(result);
      } else {
        alert('Sorry, something went wrong while fetching role details. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching role details:', error);
      alert('Sorry, something went wrong while fetching role details. Please try again.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <Show when={detailedInfo()}>
      <div class="bg-white p-6 rounded-lg shadow-md mb-4 flex-1 flex flex-col">
        <h2 class="text-2xl font-bold mb-4 text-green-600">Your Selected Role: {detailedInfo().role}</h2>
        <p class="mb-4 text-gray-700">{detailedInfo().description}</p>
        <h3 class="text-xl font-semibold mb-2 text-green-600">Routes to Entry</h3>
        <p class="mb-4 text-gray-700">{detailedInfo().routesToEntry}</p>
        <h3 class="text-xl font-semibold mb-2 text-green-600">Qualifications Needed</h3>
        <p class="mb-4 text-gray-700">{detailedInfo().qualificationsNeeded}</p>
        <h3 class="text-xl font-semibold mb-2 text-green-600">Helpful Links</h3>
        <ul class="list-disc list-inside mb-4 text-blue-600">
          <For each={detailedInfo().helpfulLinks}>
            {(link) => (
              <li>
                <a href={link.url} target="_blank" rel="noopener noreferrer" class="hover:underline">
                  {link.name}
                </a>
              </li>
            )}
          </For>
        </ul>
        <button
          onClick={() => setSelectedRole(null)}
          class="mt-auto px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          Choose Another Role
        </button>
      </div>
    </Show>
  );
}

export default RoleDetails;