import "./App.css";
import ButtonLogin from "./ButtonLogin";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonLogout from "./ButtonLogout";
import { Link } from "react-router-dom";
import { Button, Flex } from "@tremor/react";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <header className="flex">
        <h1 className="flex">Auth0 Multi-tenant example</h1>
      </header>
      <Flex>
        {isAuthenticated ? <ButtonLogout /> : <ButtonLogin />}
        {isAuthenticated && (
          <>
            <Link to="/orgs">
              <Button>Organizations</Button>
            </Link>
          </>
        )}
      </Flex>
    </>
  );
}

export default App;
