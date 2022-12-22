import React, {useState, useRef, useEffect} from 'react';
import { basePrompt, getResponse } from './gpt3';

import 'bootstrap/dist/css/bootstrap.min.css';
import "katex/dist/katex.min.css"

import ReactMarkdown from 'react-markdown';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import CodeBlock from './CodeBlock';

import { FaUser, FaRobot } from 'react-icons/fa';

import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [prompt, setPrompt] = useState(basePrompt);

  const messagesContainer = useRef(null);

  useEffect(() => {
    messagesContainer.current.scrollTo(0, messagesContainer.current.scrollHeight);
  }, [messages]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = async () => {

    const message = {
      id: messages.length,
      text: inputValue,
      user: true,
    };

    setMessages((messages) => ([...messages, message]));

    setInputValue('');

    const newPrompt = prompt + '\nMe:' + message.text + '\nYou:';

    const response = await getResponse(newPrompt);

    setPrompt(newPrompt + response);

    setMessages((messages) => ([...messages, 
      {
        id: messages.length + 1,
        text: response,
        user: false,
      }]));
  };

  return (
    <div className="container mt-3">
  <div className="messages" ref = {messagesContainer} style={{ height: 400, overflowY: 'scroll' }}>
  {messages.map((message) => (
  <div className="message-container" style={{ width: "100%" }}>
    <div className="icon-container">
    {message.user ? <FaUser size={30} className="mr-2" /> : <FaRobot size={30} className="mr-2" />}
    </div>
    <ReactMarkdown
      key={message.id}
      className="bg-light rounded p-2"
      children={message.text}
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      renderers={{ code: CodeBlock }}
    />
  </div>
))}
  </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type a message..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
