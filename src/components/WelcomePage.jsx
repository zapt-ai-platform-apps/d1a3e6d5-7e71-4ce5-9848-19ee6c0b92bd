function WelcomePage(props) {
  const { onStart } = props;

  return (
    <div class="bg-white p-6 rounded-lg shadow-md flex-1 flex flex-col items-center justify-center">
      <h2 class="text-3xl font-bold mb-4 text-green-600">Welcome to Construction Career Explorer!</h2>
      <p class="mb-6 text-center text-gray-700">
        Discover exciting roles in the construction industry that match your interests.
        Answer a few questions, and we'll recommend career paths just for you!
      </p>
      <img src="https://images.unsplash.com/photo-1489514354504-1653aa90e34e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHwzfHxBJTIwY29sb3JmdWwlMjBpbGx1c3RyYXRpb24lMjBvZiUyMGNoaWxkcmVuJTIwaGFwcGlseSUyMGV4cGxvcmluZyUyMHZhcmlvdXMlMjBjb25zdHJ1Y3Rpb24lMjBjYXJlZXJzfGVufDB8fHx8MTczMTI2MDU3Mnww&ixlib=rb-4.0.3&q=80&w=1080" 
        alt="Kids exploring construction careers"
        class="w-full max-w-md mb-6 rounded-lg shadow-md"
        data-image-request="A colorful illustration of children happily exploring various construction careers"
      />
      <button
        onClick={onStart}
        class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        Start Exploration
      </button>
    </div>
  );
}

export default WelcomePage;