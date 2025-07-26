import connectRedis from "@/lib/redis";
import { db } from "@/firebase/admin";
export const POST = async (req) => {
  let redi = await connectRedis();

  let pid;
  try {
    const { projectId, gitURL } = await req.json();

    pid = projectId;
    const streamKey = `logs:${projectId}`;
    let lastId = "0";
    let outerLoop = true;
    let logsData = [];

    while (outerLoop) {
      const result = await redi.xread("BLOCK", 0, "STREAMS", streamKey, lastId);

      if (result) {
        const [[key, entries]] = result;
        for (const [id, fields] of entries) {
          lastId = id;

          const log = fields[1];
          // console.log("log:", log);
          logsData.push(log);

          if (log === "Done") {
            outerLoop = false;
            break;
          } else if (
            log == "No vite.config.js or react-scripts found in package.json"
          ) {
            throw new Error(
              "No vite.config.js or react-scripts found in package.json"
            );
          }
        }
      } else {
        // console.log("No logs found");
        throw new Error("No logs found");
      }
    }

    const user = getGitUser(gitURL);
    const newUrl = `https://vercel-clone-30.s3.ap-south-1.amazonaws.com/${user.username}/${user.repoName}/index.html`;

    const projectRef = db.collection("projects").doc(projectId);
    await projectRef.update({
      deployUrl: newUrl,
      updatedAt: new Date(),
    });

    return new Response(JSON.stringify({ logs: logsData, uri: newUrl }), {
      status: 200,
    });
  } catch (error) {
    await db.collection("projects").doc(pid).delete();
    // console.log(error);
    if (
      error.message ==
      "No vite.config.js or react-scripts found in package.json"
    ) {
      return new Response(
        JSON.stringify({
          error:
            "you cannot deploy this project, vite.config.js or react-scripts not found in package.json",
        }),
        { status: 400 }
      );
    } else if (error.message == "No logs found") {
      return new Response(
        JSON.stringify({
          error: "No logs found",
        }),
        { status: 400 }
      );
    }
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
};

function getGitUser(url) {
  const result = url.split("github.com/")[1];
  const parts = result.split("/");
  const username = parts[0];
  const repoName = parts[1].replace(".git", "");

  return { username, repoName };
}
