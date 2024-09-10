import { useState } from "react";
import { processPrompt } from "./Config/ai-config";
import "./assets/styles/App.css";
import micIcon from "./assets/icons/mic-icon.svg";
import sendIcon from "./assets/icons/send-icon.svg";
import speaker from "./assets/icons/speaker.svg";
import copyIcon from "./assets/icons/copy.svg";
import { convertSpeechToText } from "./Config/speech";

function App() {

  const [prompt, setPrompt] = useState("");
  const [messages,setMessages] = useState([]);
  const [listening,setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e){
    e.preventDefault();
    setPrompt(e.target.value);
  }

  async function handleSubmit(input){
    setIsListening(false);

    if(input){
      setLoading(true);
      let data = await processPrompt(input);
      setMessages((messages)=>[...messages,{user:input,bot:data}]);
      setPrompt(""); 
      setLoading(false);
    }
  }

  function handleAudioPrompt(){
    setIsListening(true)
    try{
      convertSpeechToText()
      .then(async (text)=>{
        await handleSubmit(text)
        })
    }catch(error){
      console.error(error)
    }; 
  }

  return (
    <div>
      <h1>Chatter</h1>
      <div className="chats-container">  
          {messages.length > 0 && messages.map((item,index)=>{
              return (
                <div className="messages" key={index}>
                    <div className="user">
                      <p>{item.user}</p>
                    </div>
                    <div className="bot">
                      <p>{item.bot}</p>

                      {/* Speech button */}
                      <button
                        className="btn btn-sm m-1 btn-secondary" 
                        onClick={()=>{
                        let msg = new SpeechSynthesisUtterance();
                        msg.text = item.bot;
                        window.speechSynthesis.speak(msg);
                      }}><img src={speaker}/></button>

                      {/* Copy button */}
                      <button 
                        className="btn btn-sm m-1 btn-secondary" 
                        onClick={()=>{
                        navigator.clipboard.writeText(item.bot)
                      }}>
                        <img src={copyIcon}/>
                      </button>
                    </div>
                </div>
              )
          })}
      </div>

      {/* Loading and listening states */}
      {listening && <div><b>I&apos;m listening...</b></div>}
      {loading && <div className="loading">Thinking...</div>}


      <div className="input-container">
        <input 
          placeholder="Ask me anything..."
          type="text"
          id="prompt"
          name="prompt"
          value={prompt}
          onChange={handleChange}
          onKeyDown={async (e)=>{
            if(e.code == "Enter" && prompt.trim() !== ""){
                await handleSubmit(prompt)
              }
            console.log(e.code)
          }}
          className="form-field"
        />
        {prompt === "" ? (
          <button className="btn btn-sm m-1 btn-secondary" onClick={handleAudioPrompt}><img src={micIcon} alt="send icon"/></button>
        ):(
          <button className="btn btn-sm m-1 btn-secondary" onClick={()=>{handleSubmit(prompt)}}><img src={sendIcon} alt="send icon"/></button>
        )}
      </div>
    </div>
  )
}

export default App