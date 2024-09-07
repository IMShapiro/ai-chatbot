import { useState } from "react";
import { processPrompt } from "./Config/ai-config";
import "./assets/styles/App.css";
import micIcon from "./assets/icons/mic-icon.svg";
import sendIcon from "./assets/icons/send-icon.svg";

function App() {

  const [prompt, setPrompt] = useState("");
  const [messages,setMessages] = useState([]);

  function handleChange(e){
    e.preventDefault;
    setPrompt(e.target.value);
  }

  async function handleSubmit(){
    if(prompt){
      let data = await processPrompt(prompt);
      setMessages((messages)=>[...messages,{user:prompt,bot:data}])
      setPrompt(""); 
    }
  }

  return (
    <div>
      <h1>Chatter</h1>
      <div className="chats-container">  
          {messages.length > 0 && messages.map((item,index)=>{
              return (
                <div className="messages" key={index}>
                    <p className="user">{item.user}</p>
                    <p className="bot">{item.bot}</p>
                </div>
              )
          })}
      </div>
      <div className="input-container">
        <input 
          placeholder="Ask me anything..."
          type="text"
          id="prompt"
          name="prompt"
          value={prompt}
          onChange={handleChange}
          className="form-field"
        />
        <button className="btn btn-sm m-1 btn-secondary" onClick={handleSubmit}><img src={prompt != "" ? sendIcon: micIcon} alt="send icon"/></button>
      </div>
    </div>
  )
}

export default App