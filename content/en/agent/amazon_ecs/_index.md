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
- link: "/agent/amazon_ecs/metrics/"
  tag: "Documentation"
  text: "Collect ECS metrics"
---

## Overview

Amazon ECS on EC2 is a highly scalable, high-performance container management service for Docker containers running on EC2 instances.

This page covers Amazon ECS setup with [Datadog Container Agent v6][1]. For other setups, see:

- [Datadog Container Agent v5 setup for Amazon ECS][2]
- [Datadog Host Agent setup with Autodiscovery][3]

**Note**: **If you are looking to set up ECS on Fargate, follow [this doc instead][4].**

## Setup

To monitor your ECS containers and tasks with Datadog, run the Agent as a container on every EC2 instance in your ECS cluster. As detailed below, there are a few setup steps:

1. Add an ECS Task
2. Create or modify your IAM Policy
3. Schedule the Datadog Agent as a Daemon Service

If you don't have a working EC2 Container Service cluster configured, review the [Getting Started section in the ECS documentation][5].

### Metric collection

#### Create an ECS Task

This task launches the Datadog container. When you need to modify the configuration, update this task definition as described [further down in this guide](#create-or-modify-your-iam-policy).

If you're [using APM][6], [DogStatsD][7], or [log management][8], set the appropriate flags in the task definition:

  - If you are using APM, set `portMappings` so your downstream containers can ship traces to the Agent service. APM uses `TCP` on port `8126` to receive traces, so set this as the `hostPort` in your task's definition.

**Note**: To enable trace collection from other containers, ensure that the `DD_APM_NON_LOCAL_TRAFFIC` environment variable is set to `true`. Learn more about [APM with containers][9].

  - If you are using DogStatsD, set the `hostPort` as `UDP` on port `8125` in your task's definition.

**Note**: To enable DogStatsD metrics collection from other containers, ensure the `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` environment variable is set to `true`.

  - If you are using log management, refer to the dedicated [Log collection documentation][8].

Double check the security group settings on your EC2 instances. Make sure these ports are not open to the public. Datadog uses the private IP to route to the Agent from the containers.

Configure the task using either the [AWS CLI tools][10] or using the Amazon Web Console.

{{< tabs >}}
{{% tab "AWS CLI" %}}

1. For Linux containers, download [datadog-agent-ecs.json][1] ([datadog-agent-ecs1.json][2] if you are using an original Amazon Linux 1 AMI). For Windows, download [datadog-agent-ecs-win.json][3].
2. Edit `datadog-agent-ecs.json` and set `<YOUR_DATADOG_API_KEY>` with the [Datadog API key][4] for your account.
3. Optionally - Add an [Agent health check](#agent-health-check).
4. Optionally - If you are in Datadog EU site, edit `datadog-agent-ecs.json` and set `DD_SITE` to `DD_SITE:datadoghq.eu`.
5. Optionally - See [log collection][5] to activate log collection.
6. Optionally - See [process collection](#process-collection) to activate process collection.
7. Optionally - See [trace collection (APM)][6] to activate trace collection.
8. Optionally - See [network performance monitoring (NPM)](#network-performance-monitoring-collection) to activate network collection
9. Execute the following command:

```bash
aws ecs register-task-definition --cli-input-json <path to datadog-agent-ecs.json>
```

##### Agent health check

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

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[2]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
[3]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-win.json
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
11. For **Image** enter `datadog/agent:latest`.
12. For **Maximum memory** enter `256`. **Note**: For high resource usage, you may need a higher memory limit.
13. Scroll down to the **Advanced container configuration** section and enter `10` in **CPU units**.
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

#### Create or Modify your IAM Policy

Add the following permissions to your [Datadog IAM policy][11] to collect Amazon ECS metrics. For more information on ECS policies, review the [documentation on the AWS website][12].

| AWS Permission                   | Description                                                   |
| -------------------------------- | ------------------------------------------------------------- |
| `ecs:ListClusters`               | Returns a list of existing clusters.                          |
| `ecs:ListContainerInstances`     | Returns a list of container instances in a specified cluster. |
| `ecs:ListServices`               | Lists the services that are running in a specified cluster.   |
| `ecs:DescribeContainerInstances` | Describes Amazon ECS container instances.                     |

#### Run the Agent as a Daemon Service

Ideally, you want the Datadog Agent to load on one container on each EC2 instance. The easiest way to achieve this is to run the Datadog Agent as a [Daemon Service][13].

##### Schedule a Daemon Service in AWS using Datadog's ECS Task

1. Log in to the AWS console and navigate to the ECS Clusters section. Click into your cluster you run the Agent on.
2. Create a new service by clicking the **Create** button under Services.
3. For launch type, select EC2 then the task definition created previously.
4. For service type, select `DAEMON`, and enter a Service name. Click **Next**.
5. Since the Service runs once on each instance, you won't need a load balancer. Select None. Click **Next**.
6. Daemon services don't need Auto Scaling, so click **Next Step**, and then **Create Service**.

#### Dynamic detection and monitoring of running services

Datadog's [Autodiscovery][14] can be used in conjunction with ECS and Docker to automatically discover and monitor running tasks in your environment.

#### AWSVPC Mode

For Agent v6.10+, `awsvpc` mode is supported for both applicative containers and the Agent container, provided:

1. For the apps and the Agent in `awsvpc` mode, security groups must be set to allow:

    - The Agent's security group to reach the applicative containers on relevant ports.
    - The Agent's security group to reach the host instances on TCP port 51678. The ECS Agent container must either run in host network mode (default) or have a port binding on the host.

2. For apps in `awsvpc` mode and the Agent in bridge mode, security groups must be set to allow the host instances security group to reach the applicative containers on relevant ports.

### Process collection

To collect processes information for all your containers and send it to Datadog:

{{< tabs >}}
{{% tab "Linux" %}}

1. Follow the [above instructions](#aws-cli) to install the Datadog Agent.
2. Update your [datadog-agent-ecs.json][1] file ([datadog-agent-ecs1.json][2] if you are using an original Amazon Linux AMI) with the following configuration:

```json
{
  "containerDefinitions": [
    (...)
      "mountPoints": [
        (...)
        {
          "containerPath": "/etc/passwd",
          "sourceVolume": "passwd",
          "readOnly": true
        },
        (...)
      ],
      "environment": [
        (...)
        {
          "name": "DD_PROCESS_AGENT_ENABLED",
          "value": "true"
        }
      ]
    }
  ],
  "volumes": [
    (...)
    {
      "host": {
        "sourcePath": "/etc/passwd"
      },
      "name": "passwd"
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

### Network Performance Monitoring collection (Linux only)

 1. Follow the [above instructions](#aws-cli) to install the Datadog Agent.
  - If you are installing for the first time, there is a `datadog-agent-ecs.json` file available, [datadog-agent-sysprobe-ecs.json][15] ([datadog-agent-sysprobe-ecs1.json][16] if you are using an original Amazon Linux AMI), for use with the [above instructions](#aws-cli). Note that initial NPM setup requires the CLI, as you cannot add `linuxParameters` in the AWS UI.
 2. If you already have a task definition, update your [datadog-agent-ecs.json][17] file ([datadog-agent-ecs1.json][18] if you are using an original Amazon Linux AMI) with the following configuration:

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

## Troubleshooting

Need help? Contact [Datadog support][19].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[2]: https://docs.datadoghq.com/integrations/faq/agent-5-amazon-ecs/
[3]: https://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[4]: https://docs.datadoghq.com/integrations/ecs_fargate/
[5]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted_EC2.html
[6]: /agent/amazon_ecs/apm/
[7]: /developers/dogstatsd/
[8]: /agent/amazon_ecs/logs/
[9]: https://docs.datadoghq.com/tracing/setup/docker/
[10]: https://aws.amazon.com/cli
[11]: https://docs.datadoghq.com/integrations/amazon_web_services/#datadog-aws-iam-policy
[12]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_amazonelasticcontainerservice.html
[13]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[14]: https://docs.datadoghq.com/agent/autodiscovery/
[15]: https://docs.datadoghq.com/resources/json/datadog-agent-sysprobe-ecs.json
[16]: https://docs.datadoghq.com/resources/json/datadog-agent-sysprobe-ecs1.json
[17]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[18]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
[19]: https://docs.datadoghq.com/help/
