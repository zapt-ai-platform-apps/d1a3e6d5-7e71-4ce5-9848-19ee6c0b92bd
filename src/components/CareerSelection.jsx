import { For } from 'solid-js';

function CareerSelection(props) {
  const { recommendedRoles, selectRole, loading } = props;

  return (
    <div class="bg-white p-6 rounded-lg shadow-md flex-1 flex flex-col">
      <h2 class="text-2xl font-bold mb-4 text-green-600">Recommended Careers</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-y-auto pr-4">
        <For each={recommendedRoles()}>
          {(role) => (
            <div class="p-4 border border-gray-300 rounded-lg flex flex-col">
              <h3 class="text-xl font-semibold mb-2 text-green-600">{role.role}</h3>
              <p class="text-gray-700 mb-4">{role.description}</p>
              <button
                onClick={() => selectRole(role)}
                disabled={loading()}
                class={`mt-auto self-start px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
                  loading() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading() ? 'Loading...' : 'Choose this Role'}
              </button>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

export default CareerSelection;