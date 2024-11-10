import { createSignal } from 'solid-js';
import { createEvent } from '../supabaseClient';

function Questionnaire(props) {
  const { setRecommendedRoles, loading, setLoading } = props;
  const [answers, setAnswers] = createSignal({
    likesOutdoors: '',
    prefersTeamwork: '',
    enjoysMaths: '',
    likesDesign: '',
    worksWithHands: '',
    interestedInTechnology: '',
    prefersPlanning: '',
    comfortableWithHeights: '',
    eyeForDetail: '',
    enjoysHelpingOthers: '',
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
      key: 'enjoysMaths',
      question: 'Do you enjoy maths and problem-solving?',
      options: ['Yes', 'No'],
    },
    {
      key: 'likesDesign',
      question: 'Are you interested in design and creativity?',
      options: ['Yes', 'No'],
    },
    {
      key: 'worksWithHands',
      question: 'Do you like building or fixing things with your hands?',
      options: ['Yes', 'No'],
    },
    {
      key: 'interestedInTechnology',
      question: 'Are you interested in technology and how things work?',
      options: ['Yes', 'No'],
    },
    {
      key: 'prefersPlanning',
      question: 'Do you enjoy planning and organising tasks?',
      options: ['Yes', 'No'],
    },
    {
      key: 'comfortableWithHeights',
      question: 'Are you comfortable working at heights?',
      options: ['Yes', 'No'],
    },
    {
      key: 'eyeForDetail',
      question: 'Do you have a keen eye for detail?',
      options: ['Yes', 'No'],
    },
    {
      key: 'enjoysHelpingOthers',
      question: 'Do you enjoy helping others and being supportive?',
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
        Based on the following answers, recommend ten suitable construction career roles for a kid:
        ${JSON.stringify(answers())}
        For each role, provide the following information in JSON format:
        {
          "roles": [
            {
              "role": "Role Name 1",
              "description": "Brief description of role 1 suitable for kids.",
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
            },
            // Continue up to Role Name 10
          ]
        }
        Include links to helpful information from organisations such as CIOB, Construction Industry Training, and other well-known bodies.
        Make sure the recommendations are based on the detailed answers and are tailored to the kid's interests and preferences.
      `;
      const result = await createEvent('chatgpt_request', {
        prompt,
        response_type: 'json',
      });
      if (result && result.roles && result.roles.length > 0) {
        setRecommendedRoles(result.roles);
      } else {
        alert('Sorry, something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error generating roles:', error);
      alert('Sorry, something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="bg-white p-6 rounded-lg shadow-md flex-1 flex flex-col">
      <h2 class="text-2xl font-bold mb-4 text-green-600">Questionnaire</h2>
      {questions.map((q) => (
        <div class="mb-4" key={q.key}>
          <p class="font-semibold mb-2 text-gray-700">{q.question}</p>
          <div class="flex space-x-4">
            {q.options.map((option) => (
              <label class="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={q.key}
                  value={option}
                  checked={answers()[q.key] === option}
                  onChange={() => handleAnswerChange(q.key, option)}
                  class="form-radio text-green-600 cursor-pointer"
                />
                <span class="ml-2 text-gray-700">{option}</span>
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
        {loading() ? 'Processing...' : 'Get Recommendations'}
      </button>
    </div>
  );
}

export default Questionnaire;