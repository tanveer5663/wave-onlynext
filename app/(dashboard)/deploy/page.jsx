import React from "react";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth.action";
import Home from "./Home";

async function page() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access_token")?.value;
  const userData = await getCurrentUser();
  const userId = userData?.uid;

//   console.log("userID", userId);

  const response = await fetch(
    `https://api.github.com/user/repos?per_page=10&page=1&sort=created&direction=desc`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    }
  );
  const data = await response.json();
  //   return <div>hiii</div>;

  return <Home repo={data} userId={userId} />;
}

export default page;
