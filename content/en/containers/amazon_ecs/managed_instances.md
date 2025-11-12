---
title: Amazon ECS Managed Instances
description: Install and configure the Datadog Agent on Amazon Elastic Container Service Managed Instances
aliases:
  - /agent/amazon_ecs/managed_instances
further_reading:
    - link: "/agent/amazon_ecs/logs/"
      tag: "Documentation"
      text: "Collect your application logs"
    - link: "/agent/amazon_ecs/tags/"
      tag: "Documentation"
      text: "Assign tags to all data emitted by a container"
---

## Overview

Amazon ECS Managed Instances is a compute option for Amazon ECS that combines the flexibility of using Amazon EC2 instances with the ease of a fully managed service. AWS handles the management of the underlying EC2 infrastructure, including provisioning, scaling, patching, and maintenance, while you retain control over specific EC2 instance types, such as those with GPUs or high network performance.

To configure Amazon ECS Managed Instances with Datadog, add the Datadog agent as a sidecar alongside your application containers as described below.
**Note:** this setup is only supported on **Agent version >= 7.73.0**.

<div class="alert alert-info">
Amazon ECS Managed Instances does not support daemon scheduling. In order to monitor every task in the cluster, the agent needs to be added alongside each task as a sidecar.
</div>

## Setup

The following instructions assume that you have configured an ECS Managed Instances cluster. See the [Amazon ECS Managed Instances documentation for creating a cluster][1].

To monitor your ECS Managed Instances tasks with Datadog, run the Agent as a container in **same task definition** as your application container. To collect metrics with Datadog, each task definition should include a Datadog Agent container in addition to the application containers. Follow these setup steps:

1. [Create an ECS Managed Instances task][2]
2. [Run the task as a replica service][3]

### Create an ECS task definition

This ECS task definition launches the Datadog Agent container with the necessary configurations. You can configure this task definition by using the AWS Management Console, or with the AWS CLI.


#### Create and manage the task definition file

1. Download [datadog-agent-ecs-managed-instances-sidecar.json][7]. This files provide minimal configuration for core infrastructure monitoring. For more sample task definition files with various features enabled, see the Set up additional Agent features section on this page.
2. Modify the task definition file:
    - Set the `DD_API_KEY` environment variable by replacing `<YOUR_DATADOG_API_KEY>` with the [Datadog API key][5] for your account. Alternatively, you can also [supply the ARN of a secret stored in AWS Secrets Manager][9].
    - Set the `DD_SITE` environment variable to your [Datadog site][10]. Your site is: {{< region-param key="dd_site" code="true" >}}
3. (Optional) To add an Agent health check, add the following line to your ECS task definition:
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```

#### Register the task definition

<!-- xxx tabs xxx -->
<!-- xxx tab "Web UI" xxx -->
##### Web UI

After you have your task definition file, use the AWS Console to register the file.
1. Log in to your AWS Console and navigate to the Elastic Container Service section.
2. Select **Task Definitions** in the navigation pane. On the **Create new task definition** menu, select **Create new task definition with JSON**.
3. In the JSON editor box, paste the contents of your task definition file.
4. Select **Create**.

<!-- xxz tab xxx -->

<!-- xxx tab "AWS CLI" xxx -->
##### AWS CLI
After you have created your task definition file, execute the following command to register the file in AWS.

```bash
aws ecs register-task-definition --cli-input-json file://<path to datadog-agent-ecs-managed-instances-sidecar.json>
```
<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### Run the task as a replica service

As ECS Managed Instances does not support daemon scheduling yet, run the task as a [Replica Service][8].

<!-- xxx tabs xxx -->
<!-- xxx tab "Web UI" xxx -->

##### Web UI Replica Service

1. Log in to your [AWS Web Console][4] and navigate to the ECS section.
2. Choose the cluster to run the Datadog Agent on.
3. On the **Services** tab, click the **Create** button.
4. For **Task Definition**, select the task created in the previous steps.
5. Enter a **Service name**.
6. For **Launch type**, choose **Capacity Provider** and select the Manged Instance capcity provider tied to the cluster.
7. For **Number of tasks** enter `1`, then click the **Next step** button.
8. Fill in the rest of the optional fields based on your preference.
9. Click the **Next step** button.
10. Click the **Next step** button, then click the **Create service** button.

<!-- xxz tab xxx -->

<!-- xxx tab "AWS CLI" xxx -->
##### AWS CLI Replica Service

Run the following commands using the [AWS CLI tools][11].

Run the task as a service for your cluster:

```bash
aws ecs create-service --cluster <CLUSTER_NAME> \
--service-name <SERVICE_NAME> \
--task-definition <TASK_DEFINITION_ARN> \
--desired-count 1 \
--network-configuration "awsvpcConfiguration={subnets=[subnet-abcd1234],securityGroups=[sg-abcd1234]}"
```

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### Set up additional Agent features

#### APM

Instrument your application based on your setup:

| Language                           |
|------------------------------------|
| [Java][47] |
| [Python][48] |
| [Ruby][49] |
| [Go][50] |
| [Node.js][51] |
| [PHP][52] |
| [C++][53] |
| [.NET Core][54] |
| [.NET Framework][55] |

##### UDP

To collect traces over UDP, do not set DD_AGENT_HOST - the default of localhost works.

##### UDS

To collect traces over UDS:
1. Add a volume onto the task definition using the `volumes` parameter.
2. Mount the volume onto the agent and application container using the `mountPoints` parameter.
3. Configure the environmental variable `DD_TRACE_AGENT_URL` on the application container and set it to `"unix:///var/run/datadog/apm.socket"`.

Below is an example of a UDS setup:
```
{
    "containerDefinitions": [
        {
            "image": "datadog/agent:latest",
            "mountPoints": [
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": false,
                    "sourceVolume": "dd-sockets"
                }
            ],
            "name": "datadog-agent",
            ...
            ...
        },
        {
            "environment": [
                {
                    "name": "DD_TRACE_AGENT_URL",
                    "value": "unix:///var/run/datadog/apm.socket"
                }
            ],
            "image": "ghcr.io/datadog/apps-tracegen:main",
            "mountPoints": [
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": false,
                    "sourceVolume": "dd-sockets"
                }
            ],
            "name": "app",
            ...
            ...
        }
    ],
    ...
    "volumes": [
        {
            "host": {},
            "name": "dd-sockets"
        }
    ]
}

```

#### Logs

The setup for log collection is identical to ECS fargate. Follow the instructions outlined in the [ECS Fargate documentation][14] to set up log collection with the AWS FireLens integration built on Datadog’s Fluent Bit output plugin or the awslogs log driver to store the logs in a CloudWatch Log Group, and then a Lambda function to route logs to Datadog

#### Process collection

You can monitor processes in ECS Fargate in Datadog by using the [Live Processes page][15]. To enable process collection, add the [`PidMode` parameter][16] in the Task Definition and set it to `task` as follows:

```
text
"pidMode": "task"
```


[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/getting-started-managed-instances.html
[2]: #create-an-ecs-task-definition
[3]: #run-task-replica-service
[4]: https://aws.amazon.com/console
[5]: /organization-settings/api-keys
[6]: http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate
[7]: /resources/json/datadog-agent-ecs-managed-instances-sidecar.json
[8]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_replica
[9]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[10]: /getting_started/site/
[11]: https://aws.amazon.com/cli
[12]: /containers/amazon_ecs/apm/
[13]: /resources/json/datadog-agent-ecs-apm.json
[14]: https://docs.datadoghq.com/integrations/ecs_fargate/?tab=awscli#log-collection
[15]: /process
[16]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#other_task_definition_params
