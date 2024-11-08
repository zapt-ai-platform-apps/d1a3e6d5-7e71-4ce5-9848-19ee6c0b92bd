import { createSignal, For } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { SolidMarkdown } from 'solid-markdown';

function ChatWithProfessional(props) {
  const { role, loading, setLoading } = props;
  const [messages, setMessages] = createSignal([
    { sender: 'professional', text: `Hi! I'm a ${role.role}. What would you like to know about my job?` },
  ]);
  const [userInput, setUserInput] = createSignal('');

  const handleSendMessage = async () => {
    if (!userInput()) return;
    const userMessage = { sender: 'user', text: userInput() };
    setMessages([...messages(), userMessage]);
    setUserInput('');
    setLoading(true);
    try {
      const conversation = messages()
        .map((msg) => `${msg.sender === 'user' ? 'User' : role.role}: ${msg.text}`)
        .join('\n');
      const prompt = `
        You are a helpful and friendly ${role.role} explaining to a kid.
        Please respond using UK English spelling and vocabulary.
        Continue the conversation based on the following dialogue:
        ${conversation}
        ${role.role}:
      `;
      const aiResponse = await createEvent('chatgpt_request', {
        prompt,
        response_type: 'text',
      });
      setMessages([...messages(), { sender: 'professional', text: aiResponse }]);
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div class="bg-white p-6 rounded-lg shadow-md flex-1 flex flex-col">
      <h2 class="text-2xl font-bold mb-4 text-green-600">Chat with a {role.role}</h2>
      <div class="flex-1 overflow-y-auto mb-4 pr-4">
        <For each={messages()}>
          {(msg) => (
            <div
              class={`mb-4 p-4 rounded-lg ${
                msg.sender === 'user' ? 'bg-yellow-100 self-end' : 'bg-green-100 self-start'
              }`}
            >
              <p class="font-semibold text-gray-700">{msg.sender === 'user' ? 'You' : role.role}</p>
              {msg.sender === 'user' ? (
                <p class="text-gray-700">{msg.text}</p>
              ) : (
                <SolidMarkdown class="text-gray-700" children={msg.text} />
              )}
            </div>
          )}
        </For>
      </div>
      <textarea
        value={userInput()}
        onInput={(e) => setUserInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent mb-4 box-border"
        rows="3"
      />
      <button
        onClick={handleSendMessage}
        disabled={loading() || !userInput()}
        class={`px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
          loading() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading() ? 'Sending...' : 'Send Message'}
      </button>
    </div>
  );
}

export default ChatWithProfessional;