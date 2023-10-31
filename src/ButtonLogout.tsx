import { useAuth0 } from "@auth0/auth0-react";
import { useSWRConfig } from "swr";
import { useAuthStore } from "./state/auth";
import { Button } from "@tremor/react";

const ButtonLogout = () => {
  const { logout } = useAuth0();
  const { setToken } = useAuthStore();
  const { mutate } = useSWRConfig();

  return (
    <Button
      variant="secondary"
      onClick={() => {
        mutate(() => true, undefined, false);
        setToken(null);
        logout({ logoutParams: { returnTo: "http://localhost:4040" } });
      }}
    >
      Log Out
    </Button>
  );
};

export default ButtonLogout;
