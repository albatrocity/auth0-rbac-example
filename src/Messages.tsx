import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";

type Props = {};

type MsgResponse = {
  text: string;
};

export default function Messages({}: Props) {
  const [messages, setMessages] = useState<string[]>([]);
  const { getAccessTokenSilently, user } = useAuth0();
  console.log(user);
  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_API_AUDIENCE,
          scope: import.meta.env.VITE_AUTH0_API_SCOPE,
        },
      });
      console.log("TOKEN", token);
      const response = await fetch(
        `${import.meta.env.API_URL}/api/messages/admin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData: MsgResponse = await response.json();
      console.log(responseData);
      setMessages([responseData.text]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          callApi();
        }}
      >
        Call API
      </button>
      {messages.map((msg, i) => (
        <div key={i}>{msg}</div>
      ))}
    </div>
  );
}
