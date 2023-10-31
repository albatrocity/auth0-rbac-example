import { Link } from "react-router-dom";
import { Card, Title, Subtitle, Text } from "@tremor/react";
import useOrganizations from "./data/useOrganizations";

type Props = {};

export default function PageOrganizations({}: Props) {
  const { data, isLoading } = useOrganizations();

  return (
    <div>
      <Title>Organizations</Title>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data?.map((org) => (
            <Card key={org.id}>
              <Link to={`/orgs/${org.id}`}>
                <Subtitle>{org.display_name}</Subtitle>
                <Text>{org.id}</Text>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
