import useSWR from "swr";
import { useAuthStore } from "../state/auth";

type Org = {
  id: string;
  display_name: string;
  name: string;
  organizations?: Org[];
};

type OrgsResponse = {
  organizations: Org[];
};

export default function useOrganizations() {
  const { token } = useAuthStore();
  const fetcher = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/organizations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseData: OrgsResponse = await response.json();
    return responseData.organizations;
  };
  return useSWR("/api/organizations", fetcher);
}
