import { Link, useParams } from "react-router-dom";
import useOrganization from "./data/useOrganization";
import {
  Title,
  Subtitle,
  Card,
  List,
  ListItem,
  Grid,
  Col,
} from "@tremor/react";

type Props = {};

export default function PageOrganization(props: Props) {
  const { orgId } = useParams<{ orgId: string }>();
  const { data, isLoading } = useOrganization(orgId ?? "");

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Title>{data?.organization.display_name}</Title>
          <Grid>
            {(data?.organization?.organizations ?? []).length > 0 && (
              <Col>
                <Card>
                  <Subtitle>Sub Organizations</Subtitle>
                  <div>
                    {data?.organization?.organizations?.map((org) => (
                      <Card key={org.id}>
                        <Link to={`/orgs/${org.id}`}>{org.display_name}</Link>
                      </Card>
                    ))}
                  </div>
                </Card>
              </Col>
            )}
            <Col>
              <Card>
                <Subtitle>Members</Subtitle>
                <List>
                  {data?.members.map((member) => (
                    <ListItem
                      key={member.user_id}
                      style={{ textAlign: "left" }}
                    >
                      <img src={member.picture} alt={member.name} width={20} />
                      <span>{member.name}</span>
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Col>
          </Grid>
        </div>
      )}
    </div>
  );
}
