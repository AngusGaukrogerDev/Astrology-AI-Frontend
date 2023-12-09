'use client'
import { useState } from 'react';

const OpenAIResponse = () => {
    const [result, setResult] = useState(null);
    const handleGetReading = async () => {
        try {
          const response = await fetch('http://localhost:3000/generateCompletion');
          const data = await response.json()
          console.log(data);
          setResult(data.completion.message.content);
        } catch (error) {
          console.error('Error getting reading:', error);
        }
      };
        return(
            <div className="w-full h-screen flex flex-col justify-center items-center">
                <button onClick={handleGetReading}>Get Reading</button>

                <h2>
                    {result}
                </h2>
            </div>
        );
}
export default OpenAIResponse;