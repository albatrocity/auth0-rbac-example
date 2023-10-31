import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useAuthStore } from "./state/auth";
import { useSWRConfig } from "swr";

type Props = {};

export default function Auth({}: Props) {
  const { getAccessTokenSilently } = useAuth0();
  const { mutate } = useSWRConfig();

  const { setToken, token } = useAuthStore();
  useEffect(() => {
    async function getToken() {
      const fetchedToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `https://hello-world.example.com`,
        },
      });
      console.log("fetchedToken", fetchedToken);
      if (fetchedToken) {
        mutate(() => true, undefined, false);
        setToken(fetchedToken);
      }
    }

    if (!token) {
      getToken();
    }
  }, [token]);

  return null;
}
