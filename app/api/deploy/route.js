import { RunTaskCommand } from "@aws-sdk/client-ecs";
import ecsClient from "@/lib/aws_ecs";

export const POST = async (req) => {
  try {
    const { projectId, gitURL } = await req.json();
    const config = {
      CLUSTER: "arn:aws:ecs:ap-south-1:835975842698:cluster/builder-cluster",
      TASK: "arn:aws:ecs:ap-south-1:835975842698:task-definition/builder-task:5",
    };

    if (!projectId || !gitURL) {
      return new Response(
        JSON.stringify({ error: "Prject ID and Git URL are required!" }),
        { status: 400 }
      );
    }

    const command = new RunTaskCommand({
      cluster: config.CLUSTER,
      taskDefinition: config.TASK,
      launchType: "FARGATE",
      count: 1,
      networkConfiguration: {
        awsvpcConfiguration: {
          assignPublicIp: "ENABLED",
          subnets: [
            "subnet-009911b1799a8962a",
            "subnet-09488d0c635566955",
            "subnet-04c625007cfa73dd7",
          ],
          securityGroups: ["sg-0f5c90513eee2cd79"],
        },
      },
      overrides: {
        containerOverrides: [
          {
            name: "builder-image",
            environment: [
              { name: "GIT_REPOSITORY__URL", value: gitURL },
              { name: "PROJECT_ID", value: projectId },
              { name: "REDIS_URL", value: process.env.REDIS_URL },
            ],
          },
        ],
      },
    });

    await ecsClient.send(command);
    return new Response(
      JSON.stringify({
        message: "success",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Server Problem!" }), {
      status: 400,
    });
  }
};
