import { createSignal } from 'solid-js';
import { createEvent } from '../supabaseClient';

function Questionnaire(props) {
  const { setSelectedRole, loading, setLoading } = props;
  const [answers, setAnswers] = createSignal({
    likesOutdoors: '',
    prefersTeamwork: '',
    enjoysMath: '',
    likesDesign: '',
  });

  const questions = [
    {
      key: 'likesOutdoors',
      question: 'Do you enjoy working outdoors?',
      options: ['Yes', 'No'],
    },
    {
      key: 'prefersTeamwork',
      question: 'Do you prefer working in a team?',
      options: ['Yes', 'No'],
    },
    {
      key: 'enjoysMath',
      question: 'Do you enjoy math and problem-solving?',
      options: ['Yes', 'No'],
    },
    {
      key: 'likesDesign',
      question: 'Are you interested in design and creativity?',
      options: ['Yes', 'No'],
    },
  ];

  const handleAnswerChange = (key, value) => {
    setAnswers({ ...answers(), [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const prompt = `
        Based on the following answers, recommend a suitable construction career role at Tilbury Douglas for a kid:
        ${JSON.stringify(answers())}
        Provide the result in the following JSON format:
        {
          "role": "Role Name",
          "description": "Brief description of the role suitable for kids."
        }
      `;
      const result = await createEvent('chatgpt_request', {
        prompt,
        response_type: 'json',
      });
      if (result && result.role) {
        setSelectedRole(result);
      } else {
        alert('Sorry, something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error generating role:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="bg-white p-6 rounded-lg shadow-md flex-1 flex flex-col">
      <h2 class="text-2xl font-bold mb-4 text-green-600">Start Exploration</h2>
      {questions.map((q) => (
        <div class="mb-4" key={q.key}>
          <p class="font-semibold mb-2">{q.question}</p>
          <div class="flex space-x-4">
            {q.options.map((option) => (
              <label class="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={q.key}
                  value={option}
                  checked={answers()[q.key] === option}
                  onChange={() => handleAnswerChange(q.key, option)}
                  class="form-radio text-green-600"
                />
                <span class="ml-2">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        disabled={loading()}
        class={`mt-auto px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
          loading() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading() ? 'Processing...' : 'Get Recommendation'}
      </button>
    </div>
  );
}

export default Questionnaire;