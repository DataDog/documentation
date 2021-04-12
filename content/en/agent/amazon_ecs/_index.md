---
title: Amazon ECS
kind: documentation
aliases:
  - /integrations/amazon_ecs/
further_reading:
- link: "/agent/amazon_ecs/logs/"
  tag: "Documentation"
  text: "Collect your application logs"
- link: "/agent/amazon_ecs/apm/"
  tag: "Documentation"
  text: "Collect your application traces"
- link: "/agent/amazon_ecs/data_collected/#metrics"
  tag: "Documentation"
  text: "Collect ECS metrics"
---

## Overview

Amazon ECS is a highly scalable, high-performance container orchestration service that supports Docker containers. With the Datadog Agent, you can monitor ECS containers and tasks on every EC2 instance in your cluster.

This page covers Amazon ECS setup with the [Datadog Container Agent v6][1]. For other setups, see:

- [Datadog Container Agent v5 setup for Amazon ECS][2]
- [Datadog Host Agent setup with Autodiscovery][3]

**Note**: **If you are looking to set up ECS on Fargate, follow [this doc instead][4].**

## Setup

To begin setup, run the [Datadog Agent][5] on every EC2 instance in your ECS cluster. If you don't have a working EC2 Container Service cluster configured, review the [Getting Started section in the ECS documentation][6] to set up and configure a cluster. Once configured, follow the setup instructions below.

1. [Create and add an ECS Task](#create-an-ecs-task)
2. [Create or modify your IAM Policy](#create-or-modify-your-iam-policy)
3. [Schedule the Datadog Agent as a Daemon Service](#run-the-agent-as-a-daemon-service)
4. **Optional**: [Set up Process collection](#process-collection)
5. **Optional**: [Set up Network Performance Monitoring collection](#network-performance-monitoring-collection)

**Note:** Datadog's [Autodiscovery][7] can be used in conjunction with ECS and Docker to automatically discover and monitor running tasks in your environment.

### Create an ECS task

This task launches the Datadog container. When you need to modify the configuration, update this task definition as described [further down in this guide](#create-or-modify-your-iam-policy).

If you're [using APM][8], [DogStatsD][9], or [log management][10], set the appropriate flags in the task definition:

  - If you are using APM, set `portMappings` so your downstream containers can ship traces to the Agent service. APM uses `TCP` on port `8126` to receive traces, so set this as the `hostPort` in your task's definition.

**Note**: To enable trace collection from other containers, ensure that the `DD_APM_NON_LOCAL_TRAFFIC` environment variable is set to `true`. Learn more about [APM with containers][11].

  - If you are using DogStatsD, set the `hostPort` as `UDP` on port `8125` in your task's definition.

**Note**: To enable DogStatsD metrics collection from other containers, ensure the `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` environment variable is set to `true`.

  - If you are using log management, refer to the dedicated [Log collection documentation][10].

Double check the security group settings on your EC2 instances. Make sure these ports are not open to the public. Datadog uses the private IP to route to the Agent from the containers.

Configure the task using either the [AWS CLI tools][12] or using the Amazon Web Console.

{{< tabs >}}
{{% tab "AWS CLI" %}}

1. For Linux containers, download [datadog-agent-ecs.json][1] ([datadog-agent-ecs1.json][2] if you are using an original Amazon Linux 1 AMI). For Windows, download [datadog-agent-ecs-win.json][3].
2. Edit `datadog-agent-ecs.json` and set `<YOUR_DATADOG_API_KEY>` with the [Datadog API key][4] for your account.
3. Optionally - Add an Agent health check.

    Add the following to your ECS task definition to create an Agent health check:

    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```

4. Optionally - If you are in Datadog EU site, edit `datadog-agent-ecs.json` and set `DD_SITE` to `DD_SITE:datadoghq.eu`.
5. Optionally - See [log collection][5] to activate log collection.
6. Optionally - See [process collection](#process-collection) to activate process collection.
7. Optionally - See [trace collection (APM)][6] to activate trace collection.
8. Optionally - See [network performance monitoring (NPM)](#network-performance-monitoring-collection) to activate network collection
9. Execute the following command:

```bash
aws ecs register-task-definition --cli-input-json <path to datadog-agent-ecs.json>
```

[1]: /resources/json/datadog-agent-ecs.json
[2]: /resources/json/datadog-agent-ecs1.json
[3]: /resources/json/datadog-agent-ecs-win.json
[4]: https://app.datadoghq.com/account/settings#api
[5]: /agent/amazon_ecs/logs/
[6]: /agent/amazon_ecs/apm/
{{% /tab %}}
{{% tab "Web UI" %}}

1. Log in to your AWS Console and navigate to the EC2 Container Service section.
2. Click on the cluster you wish to add Datadog to.
3. Click on **Task Definitions** on the left side and click the button **Create new Task Definition**.
4. Enter a **Task Definition Name**, such as `datadog-agent-task`.
5. Click on the **Add volume** link.
6. For **Name** enter `docker_sock`. For **Source Path**, enter `/var/run/docker.sock` on Linux or `\\.\pipe\docker_engine` on Windows. Click **Add**.
7. For Linux only, add another volume with the name `proc` and source path of `/proc/`.
8. For Linux only, add another volume with the name `cgroup` and source path of `/sys/fs/cgroup/` (or `/cgroup/` if you are using an original Amazon Linux 1 AMI).
9. Click the large **Add container** button.
10. For **Container name** enter `datadog-agent`.
11. For **Image** enter `gcr.io/datadoghq/agent:latest`.
12. For **Maximum memory** enter `256`. **Note**: For high resource usage, you may need a higher memory limit.
13. Scroll down to the **Advanced container configuration** section and enter `10` in **CPU units**.
**Note**: For Windows, enter at least `512` in **CPU units** to avoid getting the error `Timeout while starting the service`.
14. For **Env Variables**, add a **Key** of `DD_API_KEY` and enter your Datadog API Key in the value. *If you feel more comfortable storing secrets like this in s3, take a look at the [ECS Configuration guide][1].*
15. Add another Environment Variable for any tags you want to add using the key `DD_TAGS`.
16. Scroll down to the **Storage and Logging** section.
17. In **Mount points** select the **docker_sock** source volume and enter as Container path `/var/run/docker.sock` on Linux or `\\.\pipe\docker_engine` on Windows. Check the **Read only** checkbox.
18. For Linux only, add another mount point for **proc** and enter `/host/proc/` in the Container path. Check the **Read only** checkbox.
19. For Linux only, add a third mount point for **cgroup** and enter `/host/sys/fs/cgroup` in the Container path. Check the **Read only** checkbox.

**Note**: Setting the Datadog task definition to use 10 CPU units can cause the `aws.ecs.cpuutilization` for `service:datadog-agent` to display as running at 1000%. This is a peculiarity of how AWS displays CPU utilization. You can add more CPU units to avoid skewing your graph.

[1]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html#ecs-config-s3
{{% /tab %}}
{{< /tabs >}}

### Create or modify your IAM policy

Add the following permissions to your [Datadog IAM policy][13] to collect Amazon ECS metrics. For more information on ECS policies, review the [documentation on the AWS website][14].

| AWS Permission                   | Description                                                   |
| -------------------------------- | ------------------------------------------------------------- |
| `ecs:ListClusters`               | Returns a list of existing clusters.                          |
| `ecs:ListContainerInstances`     | Returns a list of container instances in a specified cluster. |
| `ecs:ListServices`               | Lists the services that are running in a specified cluster.   |
| `ecs:DescribeContainerInstances` | Describes Amazon ECS container instances.                     |

### Run the Agent as a daemon service

Ideally, you want the Datadog Agent to load on one container on each EC2 instance. The easiest way to achieve this is to run the Datadog Agent as a [Daemon Service][15].

#### Schedule a daemon service in AWS using Datadog's ECS task

1. Log in to the AWS console and navigate to the ECS Clusters section. Click into your cluster you run the Agent on.
2. Create a new service by clicking the **Create** button under Services.
3. For launch type, select EC2 then the task definition created previously.
4. For service type, select `DAEMON`, and enter a Service name. Click **Next**.
5. Since the Service runs once on each instance, you won't need a load balancer. Select None. Click **Next**.
6. Daemon services don't need Auto Scaling, so click **Next Step**, and then **Create Service**.

### Process collection

To collect processes information for all your containers and send it to Datadog:

{{< tabs >}}
{{% tab "Linux" %}}

1. Follow the [above instructions](#aws-cli) to install the Datadog Agent.
2. Update your [datadog-agent-ecs.json][1] file ([datadog-agent-ecs1.json][2] if you are using an original Amazon Linux AMI) with the following configuration:

```json
{
  "containerDefinitions": [
   {
      (...)
      "mountPoints": [
        {
          (...)
        },
        {
          "containerPath": "/var/run/docker.sock",
          "sourceVolume": "docker_sock",
          "readOnly": true
        },
        {
        (...)
        }
      ],
      "environment": [
        (...)
        {
          "name": "DD_API_KEY",
          "value": "<YOUR_DATADOG_API_KEY>"
        }
      ]
    }
  ],
  "volumes": [
    {
      "host": {
        "sourcePath": "/var/run/docker.sock"
      },
      "name": "docker_sock"
    },
    (...)
  ],
  "family": "datadog-agent-task"
}
```

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[2]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
{{% /tab %}}
{{% tab "Windows" %}}

1. Follow the [above instructions](#aws-cli) to install the Datadog Agent.
2. Update your [datadog-agent-ecs-win.json][1] file with the following configuration:

```json
{
  "containerDefinitions": [
    (...)
      "environment": [
        (...)
        {
          "name": "DD_PROCESS_AGENT_ENABLED",
          "value": "true"
        }
      ]
    }
  ],
  "family": "datadog-agent-task"
}
```

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-win.json
{{% /tab %}}
{{< /tabs >}}

### Network Performance Monitoring collection

**This feature is available for Linux only**

 1. Follow the [above instructions](#aws-cli) to install the Datadog Agent.
  - If you are installing for the first time, there is a `datadog-agent-ecs.json` file available, [datadog-agent-sysprobe-ecs.json][16] ([datadog-agent-sysprobe-ecs1.json][17] if you are using an original Amazon Linux AMI), for use with the [above instructions](#aws-cli). Note that initial NPM setup requires the CLI, as you cannot add `linuxParameters` in the AWS UI.
 2. If you already have a task definition, update your [datadog-agent-ecs.json][18] file ([datadog-agent-ecs1.json][19] if you are using an original Amazon Linux AMI) with the following configuration:

 ```json
 {
   "containerDefinitions": [
     (...)
       "mountPoints": [
         (...)
         {
           "containerPath": "/sys/kernel/debug",
           "sourceVolume": "debug"
         },
         (...)
       ],
       "environment": [
         (...)
         {
           "name": "DD_SYSTEM_PROBE_ENABLED",
           "value": "true"
         }
       ],
       "linuxParameters": {
        "capabilities": {
          "add": [
            "SYS_ADMIN",
            "SYS_RESOURCE",
            "SYS_PTRACE",
            "NET_ADMIN"
          ]
        }
      },
   ],
   "requiresCompatibilities": [
    "EC2"
   ],
   "volumes": [
     (...)
     {
      "host": {
        "sourcePath": "/sys/kernel/debug"
      },
      "name": "debug"
     },
     (...)
   ],
   "family": "datadog-agent-task"
 }
 ```

## AWSVPC mode

For Agent v6.10+, `awsvpc` mode is supported for applicative containers, provided that security groups are set to allow the host instances security group to reach the applicative containers on relevant ports.

While it's possible to run the Agent in `awsvpc` mode, it's not the recommended setup, because it may be difficult to retrieve the ENI IP to reach the Agent for Dogstatsd metrics and APM traces.

Instead, run the Agent in bridge mode with port mapping to allow easier retrieval of [host IP through the metadata server][8].

## Troubleshooting

Need help? Contact [Datadog support][20].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[2]: https://docs.datadoghq.com/integrations/faq/agent-5-amazon-ecs/
[3]: https://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[4]: https://docs.datadoghq.com/integrations/ecs_fargate/
[5]: https://hub.docker.com/r/datadog/agent
[6]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted_EC2.html
[7]: https://docs.datadoghq.com/agent/autodiscovery/
[8]: /agent/amazon_ecs/apm/
[9]: /developers/dogstatsd/
[10]: /agent/amazon_ecs/logs/
[11]: https://docs.datadoghq.com/tracing/setup/docker/
[12]: https://aws.amazon.com/cli
[13]: https://docs.datadoghq.com/integrations/amazon_web_services/#datadog-aws-iam-policy
[14]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_amazonelasticcontainerservice.html
[15]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[16]: https://docs.datadoghq.com/resources/json/datadog-agent-sysprobe-ecs.json
[17]: https://docs.datadoghq.com/resources/json/datadog-agent-sysprobe-ecs1.json
[18]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[19]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
[20]: https://docs.datadoghq.com/help/
