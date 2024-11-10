import { createSignal, Show } from 'solid-js';
import WelcomePage from './components/WelcomePage';
import Questionnaire from './components/Questionnaire';
import CareerSelection from './components/CareerSelection';
import RoleDetails from './components/RoleDetails';
import ChatWithProfessional from './components/ChatWithProfessional';

function App() {
  const [selectedRole, setSelectedRole] = createSignal(null);
  const [recommendedRoles, setRecommendedRoles] = createSignal([]);
  const [started, setStarted] = createSignal(false);
  const [loading, setLoading] = createSignal(false);

  const handleStart = () => {
    setStarted(true);
  };

  const selectRole = (role) => {
    setSelectedRole(role);
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-yellow-100 to-green-100 p-4">
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
          <RoleDetails
            role={selectedRole()}
            setSelectedRole={setSelectedRole}
          />
          <ChatWithProfessional
            role={selectedRole()}
            loading={loading}
            setLoading={setLoading}
          />
        </Show>
      </div>
    </div>
  );
}

export default App;