import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@tremor/react";

const ButtonLogin = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            audience: `https://hello-world.example.com`,
            redirect_uri: window.location.origin,
          },
        })
      }
    >
      Log In
    </Button>
  );
};

export default ButtonLogin;
