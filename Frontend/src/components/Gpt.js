import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://joke-gpt-api.vercel.app";

const Gpt = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ${BASE_URL}
    // Send a request to the server with the prompt
    axios
      .post(`${BASE_URL}/joke`, { prompt })
      .then((res) => {
        // Update the response state with the server's response
        setResponse(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{response}</p>
    </div>
  );
};

export default Gpt;
