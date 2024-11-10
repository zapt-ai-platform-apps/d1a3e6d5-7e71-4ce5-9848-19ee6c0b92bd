import { createSignal, Show } from 'solid-js';
import WelcomePage from './components/WelcomePage';
import Questionnaire from './components/Questionnaire';
import CareerSelection from './components/CareerSelection';
import RoleDetails from './components/RoleDetails';
import ChatWithProfessional from './components/ChatWithProfessional';
import { createEvent } from './supabaseClient';

function App() {
  const [selectedRole, setSelectedRole] = createSignal(null);
  const [recommendedRoles, setRecommendedRoles] = createSignal([]);
  const [started, setStarted] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [detailedInfo, setDetailedInfo] = createSignal(null);
  const [roleLoading, setRoleLoading] = createSignal(false);

  const handleStart = () => {
    setStarted(true);
  };

  const selectRole = (role) => {
    setSelectedRole(role);
    setDetailedInfo(null);
    setRoleLoading(true);
    fetchRoleDetails(role);
  };

  const fetchRoleDetails = async (role) => {
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
      setRoleLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-yellow-100 to-green-100 p-4 text-gray-800">
      <div class="max-w-4xl mx-auto h-full flex flex-col">
        <h1 class="text-4xl font-bold text-green-600 mb-8 text-center">Construction Career Explorer</h1>
        <Show when={!started()}>
          <WelcomePage onStart={handleStart} />
        </Show>
        <Show when={started() && recommendedRoles().length === 0 && !selectedRole()}>
          <Questionnaire
            setRecommendedRoles={setRecommendedRoles}
            loading={loading}
            setLoading={setLoading}
          />
        </Show>
        <Show when={recommendedRoles().length > 0 && !selectedRole()}>
          <CareerSelection
            recommendedRoles={recommendedRoles}
            selectRole={selectRole}
            loading={loading}
          />
        </Show>
        <Show when={selectedRole()}>
          <Show when={roleLoading()}>
            <div class="flex-1 flex items-center justify-center">
              <p class="text-xl font-semibold text-green-600">
                Loading details about the {selectedRole().role}...
              </p>
            </div>
          </Show>
          <Show when={!roleLoading() && detailedInfo()}>
            <RoleDetails
              detailedInfo={detailedInfo()}
              setSelectedRole={setSelectedRole}
            />
            <ChatWithProfessional
              role={selectedRole()}
              loading={loading}
              setLoading={setLoading}
            />
          </Show>
        </Show>
      </div>
    </div>
  );
}

export default App;