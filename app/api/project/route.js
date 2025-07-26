import { db } from "@/firebase/admin";
export async function POST(request) {
  try {
    let { userId, gitURL } = await request.json();
    console.log(userId, gitURL);

    if (!userId || !gitURL) {
      return new Response(
        JSON.stringify({ error: "User ID and Git URL are required!" }),
        { status: 400 }
      );
    }
    gitURL = normalizeGitURL(gitURL);

    const snapshot = await db
      .collection("projects")
      .where("gitURL", "==", gitURL)
      .where("userId", "==", userId)
      .limit(1)
      .get();

    const deployedProject = await snapshot.docs.find(
      (doc) => doc.data().deployUrl != null
    );
    if (deployedProject) {
      return new Response(
        JSON.stringify({
          error: "Project already deployed!",
          url: deployedProject.data().deployUrl,
        }),
        { status: 409 }
      );
    } else {
      const docRef = db.collection("projects").doc();
      await docRef.set({
        userId,
        gitURL,
        deployUrl: null,

        createdAt: new Date(),
      });
      return new Response(
        JSON.stringify({
          message: "Project created successfully",
          id: docRef.id,
        }),
        { status: 200 }
      );
    }

    // return new Response(JSON.stringify(projectId), { status: 200 });
  } catch (err) {
    console.error("Redis GET Error:", err);
    return new Response(JSON.stringify({ error: "Server Error!" }), {
      status: 400,
    });
  }
}
function normalizeGitURL(url) {
  if (!url.endsWith(".git")) {
    return url + ".git";
  }
  return url;
}
