// lib/profileApi.ts
import { fetcherInstance } from "@/apiInstances/fetcherInstance";

export interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  created_at: string;
  username: string;
  status: "online" | "offline" | "away";
}

export interface ProfilesResponse {
  statusCode: number;
  data: {
    profile: Profile[];
  };
  message: string;
  success: boolean;
}

export const getProfiles = async (): Promise<ProfilesResponse> => {
  const result = await fetcherInstance<ProfilesResponse>("/profile");
  return result;
};
