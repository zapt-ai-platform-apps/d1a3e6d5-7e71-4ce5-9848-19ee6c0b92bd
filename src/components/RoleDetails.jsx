import { For } from 'solid-js';

function RoleDetails(props) {
  const { role, setSelectedRole } = props;

  return (
    <div class="bg-white p-6 rounded-lg shadow-md mb-4 flex-1 flex flex-col">
      <h2 class="text-2xl font-bold mb-4 text-green-600">Your Selected Role: {role.role}</h2>
      <p class="mb-4 text-gray-700">{role.description}</p>
      <h3 class="text-xl font-semibold mb-2 text-green-600">Routes to Entry</h3>
      <p class="mb-4 text-gray-700">{role.routesToEntry}</p>
      <h3 class="text-xl font-semibold mb-2 text-green-600">Qualifications Needed</h3>
      <p class="mb-4 text-gray-700">{role.qualificationsNeeded}</p>
      <h3 class="text-xl font-semibold mb-2 text-green-600">Helpful Links</h3>
      <ul class="list-disc list-inside mb-4 text-blue-600">
        <For each={role.helpfulLinks}>
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
  );
}

export default RoleDetails;