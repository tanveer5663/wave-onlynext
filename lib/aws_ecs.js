import { ECSClient } from "@aws-sdk/client-ecs";

let ecsClient;

if (!global.ecsClient) {
  const accessKeyId = process.env.ACCESSKEYID;
  const secretAccessKey = process.env.SECRETACCESSKEY;

  if (!accessKeyId || !secretAccessKey) {
    throw new Error("Missing AWS credentials in environment variables");
  }

  global.ecsClient = new ECSClient({
    region: "ap-south-1",
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
  console.log("[ECS] Client initialized");
}

ecsClient = global.ecsClient;

export default ecsClient;
