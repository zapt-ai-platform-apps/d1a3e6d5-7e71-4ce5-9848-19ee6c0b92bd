function RoleDetails(props) {
  const { role, setSelectedRole } = props;

  return (
    <div class="bg-white p-6 rounded-lg shadow-md mb-4">
      <h2 class="text-2xl font-bold mb-4 text-green-600">Your Selected Role: {role.role}</h2>
      <p class="mb-4 text-gray-700">{role.description}</p>
      <button
        onClick={() => setSelectedRole(null)}
        class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        Choose Another Role
      </button>
    </div>
  );
}

export default RoleDetails;