const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'en-US';

export function convertSpeechToText(){
    return new Promise((resolve,reject)=>{
        let text = "";
    
        recognition.start()
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            text = transcript;
            console.log(text)
            resolve(text)
        },
        
        recognition.onerror = (event)=>{
            reject(event.error);
    }})   
}