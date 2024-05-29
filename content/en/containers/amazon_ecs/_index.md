---
title: Amazon ECS
kind: documentation
aliases:
  - /agent/amazon_ecs/
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
- link: "https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/"
  tag: "Blog"
  text: "Announcing support for Amazon ECS Anywhere"
- link: "https://www.datadoghq.com/blog/cloud-cost-management-container-support/"
  tag: "blog"
  text: "Understand your Kubernetes and ECS spend with Datadog Cloud Cost Management"
algolia:
  tags: ['ecs']
---

## Overview

Amazon ECS is a scalable, high-performance container orchestration service that supports Docker containers. With the Datadog Agent, you can monitor ECS containers and tasks on every EC2 instance in your cluster.

This page covers Amazon ECS setup with the Datadog Container Agent. For other setups, see:

- [Datadog Container Agent v5 setup for Amazon ECS][1]
- [Datadog Host Agent setup with Autodiscovery][2]

**Note**: If you are looking to set up **ECS on Fargate**, see [Amazon ECS on AWS Fargate][3] instructions. The Datadog Agent container deployed on EC2 instances cannot monitor Fargate Tasks. Additionally, AWS Batch is not supported.

## Setup

The Datadog Agent in ECS should be deployed as a container once on every EC2 instance in your ECS cluster. This is done by creating a Task Definition for the Datadog Agent container and deploying it as a Daemon service. Each Datadog Agent container then monitors the other containers on their respective EC2 instances.

If you don't have a working EC2 Container Service cluster configured, review the [Getting Started section in the ECS documentation][4] to set up and configure a cluster. Once configured, follow the setup instructions below.

1. [Create and add an ECS Task Definition](#create-an-ecs-task)
2. [Schedule the Datadog Agent as a Daemon Service](#run-the-agent-as-a-daemon-service)
3. **Optional** [Setup the additional Datadog Agent features](#setup-additional-agent-features)

**Note:** Datadog's [Autodiscovery][5] can be used in conjunction with ECS and Docker to automatically discover and monitor running tasks in your environment.

### Create an ECS task

The Task Definition launches the Datadog Agent container with the necessary configurations. When you need to modify the Agent configuration, update this Task Definition and redeploy the Daemon Service as needed. You can configure the Task Definition using either the [AWS CLI tools][9] or using the Amazon Web Console. 

The following sample is a minimal configuration for core infrastructure monitoring. However, additional Task Definition samples with various features enabled are provided in the [Setup additional Agent features](#setup-additional-agent-features) section if you want to use those instead.

#### Managing the task definition file

1. For Linux containers, download [datadog-agent-ecs.json][20]
    1. If you are using an original Amazon Linux 1 AMI use [datadog-agent-ecs1.json][21]
    2. If you are using Windows use [datadog-agent-ecs-win.json][22] 

2. Edit your base Task Definition file
    1. Set `<YOUR_DATADOG_API_KEY>` with the [Datadog API key][14] for your account.
    2. Set the `DD_SITE` environment variable to {{< region-param key="dd_site" code="true" >}} 

        **Note**: If the `DD_SITE` environment variable is not explicitly set, it defaults to the `US` site `datadoghq.com`. If you are using one of the other sites (`EU`, `US3`, or `US1-FED`) and do not set this, it results in an invalid API key message. Use the [documentation site selector][13] to see documentation appropriate for the site you're using.

3. Optionally - Add the following to your ECS task definition to deploy on an [ECS Anywhere cluster][15].
    ```json
    "requiresCompatibilities": ["EXTERNAL"]
    ```

4. Optionally - Add an Agent health check to your ECS Task Definition
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```

For all of these examples the `DD_API_KEY` environment variable can alternatively be populated by referencing the [ARN of a "Plaintext" secret stored in AWS Secret Manager][16]. Any additional tags can be added by the environment variable `DD_TAGS`.

#### Registering the task definition

{{< tabs >}}
{{% tab "AWS CLI" %}}
Once you have your Task Definition file created you can execute the following command to register this in AWS.

```bash
aws ecs register-task-definition --cli-input-json file://<path to datadog-agent-ecs.json>
```
{{% /tab %}}
{{% tab "Web UI" %}}
Once you have your Task Definition file created you can login to your AWS console to register this.
1. Log in to your AWS Console and navigate to the Elastic Container Service section.
2. Click on **Task Definitions** on the left side and click the button **Create new Task Definition**.
3. Choose "EC2" as the launch type, alternatively you can choose "External" if you plan to deploy the agent task on an ECS Anywhere cluster
4. Once on the "Configure task and container definitions" page scroll to the bottom and select **Configure via JSON**. From here you can copy and paste the configuration from your file.
5. Click **Save** on the JSON tab
6. You can make any additional changes from the page here or by repeating this **Configure via JSON** process
7. Click **Create** at the bottom to register this Task Definition

{{% /tab %}}
{{< /tabs >}}


### Run the Agent as a daemon service

Ideally, you want one running Datadog Agent container on each EC2 instance. The easiest way to achieve this is to run the Datadog Agent Task Definition as a [Daemon Service][10].

#### Schedule a daemon service in AWS using Datadog's ECS task

1. Log in to the AWS console and navigate to the ECS Clusters section. Click into your cluster you run the Agent on.
2. Create a new service by clicking the **Create** button under Services.
3. For launch type, select EC2 then the task definition created previously.
4. For service type, select `DAEMON`, and enter a Service name. Click **Next**.
5. Since the service runs once on each instance, you don't need a load balancer. Select None. Click **Next**.
6. Daemon services don't need Auto Scaling, so click **Next Step**, and then **Create Service**.

### Setup Additional Agent Features

The initial Task Definition provided above is a fairly minimal one. This Task Definition deploys an Agent container with a base configuration to collect core metrics about the containers in your ECS cluster. This Agent can also run Agent Integrations based on [Docker Autodiscovery Labels][12] discovered on your corresponding containers.

If you're using:
- APM: Consult the [APM setup documentation][6] and the sample [datadog-agent-ecs-apm.json][23]
- Log Management: Consult the [Log collection documentation][7] and the sample [datadog-agent-ecs-logs.json][24]

#### DogStatsD

If you're using [DogStatsD][8], add in a Host Port mapping for 8125/udp to your Datadog Agent's container definition:
```json
"portMappings": [
  {
    "hostPort": 8125,
    "protocol": "udp",
    "containerPort": 8125
  }
]
```

In addition to this port mapping, set the environment variable `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` to `true`.

This setup allows the DogStatsD traffic to be routed from the application containers, through the host and host port, to the Datadog Agent container. However, the application container must use the host's private IP address for this traffic. This can be enabled by setting the environment variable `DD_AGENT_HOST` to the private IP address of the EC2 instance, which can be retrieved from the Instance Metadata Service (IMDS). Alternatively, this can be set in the code during initialization. The implementation for DogStatsD is the same as for APM, see [configure the Trace Agent endpoint][17] for examples of setting the Agent endpoint.

Ensure that the security group settings on your EC2 instances do not publicly expose the ports for APM and DogStatsD.

#### Process collection

Live Container data is automatically collected by the Datadog Agent container. To collect Live Process information for all your containers and send it to Datadog updated your Task Definitions with the environment variable:

```json
{
  "name": "DD_PROCESS_AGENT_ENABLED",
  "value": "true"
}
```

#### Network Performance Monitoring collection

**This feature is available for Linux only**

1. Follow the [above instructions](#create-an-ecs-task) to install the Datadog Agent.
   - If you are installing for the first time you can use the [datadog-agent-sysprobe-ecs.json][25] file ([datadog-agent-sysprobe-ecs1.json][26] if you are using an original Amazon Linux AMI), for use with the [above instructions](#managing-the-task-definition-file). **Note**: Initial NPM setup requires the CLI, as you cannot add `linuxParameters` in the AWS UI.
2. If you already have a task definition, update your [datadog-agent-ecs.json][20] file ([datadog-agent-ecs1.json][21] if you are using an original Amazon Linux AMI) with the following configuration:

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
           "name": "DD_SYSTEM_PROBE_NETWORK_ENABLED",
           "value": "true"
         }
       ],
       "linuxParameters": {
        "capabilities": {
          "add": [
            "SYS_ADMIN",
            "SYS_RESOURCE",
            "SYS_PTRACE",
            "NET_ADMIN",
            "NET_BROADCAST",
            "NET_RAW",
            "IPC_LOCK",
            "CHOWN"
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

For Agent v6.10+, `awsvpc` mode is supported for applicative containers, provided that security groups are set to allow the host instance's security group to reach the applicative containers on relevant ports.

While it's possible to run the Agent in `awsvpc` mode, it's not the recommended setup, because it may be difficult to retrieve the ENI IP to reach the Agent for Dogstatsd metrics and APM traces.

Instead, run the Agent in bridge mode with port mapping to allow easier retrieval of [host IP through the metadata server][6].

{{% site-region region="gov" %}}
#### FIPS proxy for GOVCLOUD environments

To send data to Datadog's GOVCLOUD datacenter, add the `fips-proxy` sidecar container and open container ports to ensure proper communication for [supported features](https://docs.datadoghq.com/agent/configuration/agent-fips-proxy/?tab=helmonamazoneks#supported-platforms-and-limitations).

**Note**: This feature is available for Linux only.

```json
 {
   "containerDefinitions": [
     (...)
          {
            "name": "fips-proxy",
            "image": "datadog/fips-proxy:1.1.2",
            "portMappings": [
                {
                    "containerPort": 9803,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9804,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9805,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9806,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9807,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9808,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9809,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9810,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9811,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9812,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9813,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9814,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9815,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9816,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9817,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9818,
                    "protocol": "tcp"
                }
            ],
            "essential": true,
            "environment": [
                {
                    "name": "DD_FIPS_PORT_RANGE_START",
                    "value": "9803"
                },
                {
                    "name": "DD_FIPS_LOCAL_ADDRESS",
                    "value": "127.0.0.1"
                }
            ]
        }
   ],
   "family": "datadog-agent-task"
}
```

You also need to update the environment variables of the Datadog Agent's container to enable sending traffic through the FIPS proxy:

```json
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "image": "public.ecr.aws/datadog/agent:latest",
            (...)
            "environment": [
              (...)
                {
                    "name": "DD_FIPS_ENABLED",
                    "value": "true"
                },
                {
                    "name": "DD_FIPS_PORT_RANGE_START",
                    "value": "9803"
                },
                {
                    "name": "DD_FIPS_HTTPS",
                    "value": "false"
                },
             ],
        },
    ],
   "family": "datadog-agent-task"
}
```
{{% /site-region %}}

## Troubleshooting

Need help? Contact [Datadog support][11].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/faq/agent-5-amazon-ecs/
[2]: https://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[3]: https://docs.datadoghq.com/integrations/ecs_fargate/
[4]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted_EC2.html
[5]: https://docs.datadoghq.com/agent/autodiscovery/
[6]: /containers/amazon_ecs/apm/
[7]: /containers/amazon_ecs/logs/
[8]: /developers/dogstatsd/?tab=containeragent
[9]: https://aws.amazon.com/cli
[10]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[11]: https://docs.datadoghq.com/help/
[12]: https://docs.datadoghq.com/containers/docker/integrations/?tab=docker
[13]: /getting_started/site/
[14]: https://app.datadoghq.com/organization-settings/api-keys
[15]: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
[16]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[17]: /containers/amazon_ecs/apm/?tab=ec2metadataendpoint#configure-the-trace-agent-endpoint
[20]: /resources/json/datadog-agent-ecs.json
[21]: /resources/json/datadog-agent-ecs1.json
[22]: /resources/json/datadog-agent-ecs-win.json
[23]: /resources/json/datadog-agent-ecs-apm.json
[24]: /resources/json/datadog-agent-ecs-logs.json
[25]: /resources/json/datadog-agent-sysprobe-ecs.json
[26]: /resources/json/datadog-agent-sysprobe-ecs1.json
