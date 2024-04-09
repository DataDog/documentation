---
title: Amazon Elastic Container Service with Agent v5
kind: faq
private: true
---

<div class="alert alert-warning">
This documentation is to setup Amazon EC2 container Service with <strong>Datadog Agent 5</strong>
</div>

## Setup

### Installation

To monitor your ECS containers and tasks with Datadog, run the Agent as a container on every EC2 instance in your ECS cluster. As detailed below, there are a few setup steps:

1. **Add an ECS Task**
2. **Create or Modify your IAM Policy**
3. **Schedule the Datadog Agent as a Daemon Service**

This documentation assume you already have a working EC2 Container Service cluster configured. If not, see [Getting started with Amazon ECS][1].

#### Create an ECS task

This task launches the Datadog container. When you need to modify the configuration, update this Task Definition as described further down in this guide. If you're using APM or Logs, set the appropriate flags in the Task Definition.

You may either configure the task using the [AWS CLI tools][2] or using the Amazon Web Console.

##### AWS CLI

1. Download [datadog-agent-ecs.json][3] ([datadog-agent-ecs1.json][4] if you are using an original Amazon Linux AMI).
2. Edit `datadog-agent-ecs.json` and set `<YOUR_DATADOG_API_KEY>` with the [Datadog API key][5] for your account.
3. Execute the following command:

```shell
Amazon Elastic Container Service register-task-definition --cli-input-json file:<PATH_TO_JSON_DD_AGENT_ECS>.json
```

##### Web UI

1. Log in to your AWS Console and navigate to the EC2 Container Service section.
2. Click on the cluster you wish to add Datadog to.
3. Click on **Task Definitions** on the left side and click the button **Create new Task Definition**.
4. Enter a **Task Definition Name**, such as `dd-agent-task`.
5. Click on the **Add volume** link.
6. For **Name** enter `docker_sock`. For **Source Path**, enter `/var/run/docker.sock`. Click **Add**.
7. Add another volume with the name `proc` and source path of `/proc/`.
8. Add another volume with the name `cgroup` and source path of `/cgroup/` (Use `/sys/fs/cgroup/`if you are using an original Amazon Linux AMI)
9. Click the large **Add container** button.
10. For **Container name** enter `dd-agent`.
11. For **Image** enter `gcr.io/datadoghq/docker-dd-agent:latest`.
12. For **Maximum memory** enter `256`. **Note**: For high resource usage, you may need a higher memory limit.
13. Scroll down to the **Advanced container configuration** section and enter `10` in **CPU units**.
14. For **Env Variables**, add a **Key** of `API_KEY` and enter your Datadog API Key in the value. *If you feel more comfortable storing secrets like this in s3, take a [look at the ECS Configuration guide][6].*
15. Add another Environment Variable for any tags you want to add using the key `TAGS`.
16. Scroll down to the **Storage and Logging** section.
17. In **Mount points** select the **docker_sock** source volume and enter `/var/run/docker.sock` in the Container path. Leave the **Read only** checkbox un-checked.
18. Add another mount point for **proc** and enter `/host/proc/` in the Container path. Check the **Read only** checkbox.
19. Add a third mount point for **cgroup** and enter `/host/sys/fs/cgroup` in the Container path. Check the **Read only** checkbox.

#### Create or modify your IAM policy

1. Add those permissions to your [Datadog IAM policy][7] in order to collect Amazon ECS metrics:

  * `ecs:ListClusters`: List available clusters.
  * `ecs:ListContainerInstances`: List instances of a cluster.
  * `ecs:DescribeContainerInstances`: Describe instances to add metrics on resources and tasks running, adds cluster tag to ec2 instances.

  For more information on ECS policies, see [Identity and access management for Amazon ECS][8].

2. Using the Identity and Access Management (IAM) console, create a new role called `dd-agent-ecs`.
3. Select **Amazon EC2 Role for EC2 Container Service**. On the next screen do not check any checkboxes and click **Next Step**.
4. Click **Create Role**.
5. Click on the newly created role.
6. Expand the **Inline Policies** section. Click the link to create a new inline policy.
7. Choose **Custom Policy** and press the button.
8. For **Policy Name** enter `dd-agent-policy`. Copy the following text into the **Policy Document**:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "ecs:RegisterContainerInstance",
          "ecs:DeregisterContainerInstance",
          "ecs:DiscoverPollEndpoint",
          "ecs:Submit*",
          "ecs:Poll",
          "ecs:StartTask",
          "ecs:StartTelemetrySession"
        ],
        "Resource": ["*"]
      }
    ]
  }
  ```

9. Click **Create Policy**

#### Run the Agent as a daemon service

Ideally you want the Datadog Agent to load on one container on each EC2 instance. The easiest way to achieve this is to run the Datadog Agent as a [daemon service][9].

##### Schedule a daemon service in AWS with an ECS task

1. Log in to the AWS console and navigate to the ECS Clusters section. Click into the cluster you want to run the Agent on.
2. Create a new service by clicking the **Create** button under Services.
3. For launch type, select EC2. Then select the Task Definition created before.
4. For service type, select `DAEMON`, and enter a Service name. Click **Next**.
5. Since the Service runs once on each instance, you don't need a load balancer. Select None. Click **Next**.
6. Daemon services don't need Auto Scaling, so click **Next Step**, and then **Create Service**.

If you're not using APM or Logs, you are finished. Otherwise, point your application containers to the underlying IP address of the host they are running on to ship information.

##### Dynamic detection and monitoring of running services

Datadog's [Autodiscovery][10] can be used in conjunction with ECS and Docker to automatically discover and monitor running tasks in your environment.

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/getting-started.html
[2]: https://aws.amazon.com/cli
[3]: /resources/json/dd-agent-ecs.json
[4]: /resources/json/dd-agent-ecs1.json
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html#ecs-config-s3
[7]: /integrations/amazon_web_services/#installation
[8]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/security-iam.html
[9]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[10]: /agent/docker/integrations/
