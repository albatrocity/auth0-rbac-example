import useSWR from "swr";
import { useAuthStore } from "../state/auth";

type Org = {
  id: string;
  display_name: string;
  name: string;
  organizations?: Org[];
};

type Member = {
  id: string;
  name: string;
  picture: string;
  user_id: string;
};

type OrgResponse = {
  organization: Org;
  members: Member[];
};

export default function useOrganization(orgId: string) {
  const { token } = useAuthStore();
  const fetcher = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/organizations/${orgId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseData: OrgResponse = await response.json();
    return responseData;
  };
  return useSWR(`/api/organizations/${orgId}`, fetcher);
}
