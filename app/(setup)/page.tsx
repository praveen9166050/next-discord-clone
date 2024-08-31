import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile"
import { redirect } from "next/navigation";

export default async function SetupPage() {
  const profile = await initialProfile();
  // console.log("Setup Profile:", profile);
  
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id
        }
      }
    }
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return (
    <div>Create a server</div>
  )
}