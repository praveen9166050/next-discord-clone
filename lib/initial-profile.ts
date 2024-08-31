import { auth, currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();
  // console.log("User:", user);
  if (!user) {
    return auth().redirectToSignIn();
  }
  
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id
    }
  });
  // console.log("Profile:", profile);
  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: user.fullName as string,
      imageUrl: user.imageUrl,
      email: user.primaryEmailAddress?.emailAddress as string
    }
  });
  // console.log("New Profile:", newProfile);
  return newProfile;
}