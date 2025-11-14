---
title: Amazon ECS Managed Instances
description: Install and configure the Datadog Agent on Amazon Elastic Container Service Managed Instances
aliases:
  - /agent/amazon_ecs/managed_instances
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
    - link: "/agent/amazon_ecs/tags/"
      tag: "Documentation"
      text: "Assign tags to all data emitted by a container"
    - link: "https://www.datadoghq.com/blog/ecs-default-monitors/"
      tag: "Blog"
      text: "Catch and remediate ECS issues faster with default monitors and the ECS Explorer"
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

1. Download [datadog-agent-ecs-managed-instances-sidecar.json][7]. This files provide minimal configuration for core infrastructure monitoring. For more sample task definition files with various features enabled, see the [Set up additional Agent features][27] section on this page.
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

{{< tabs >}}
{{% tab "Web UI" %}}
##### Web UI

After you have your task definition file, use the AWS Console to register the file.
1. Log in to your AWS Console and navigate to the Elastic Container Service section.
2. Select **Task Definitions** in the navigation pane. On the **Create new task definition** menu, select **Create new task definition with JSON**.
3. In the JSON editor box, paste the contents of your task definition file.
4. Select **Create**.

{{% /tab %}}
{{% tab "AWS CLI" %}}

##### AWS CLI
After you have created your task definition file, execute the following command to register the file in AWS.

```bash
aws ecs register-task-definition --cli-input-json file://<path to datadog-agent-ecs-managed-instances-sidecar.json>
```
{{% /tab %}}
{{< /tabs >}}

### Run the task as a replica service

As ECS Managed Instances does not support daemon scheduling yet, run the task as a [Replica Service][8].

{{< tabs >}}
{{% tab "Web UI" %}}

##### Web UI Replica Service

1. Log in to your [AWS Web Console][4] and navigate to the ECS section.
2. Choose the cluster to run the Datadog Agent on.
3. On the **Services** tab, click the **Create** button.
4. For **Task Definition**, select the task created in the previous steps.
5. Enter a **Service name**.
6. For **Launch type**, choose **Capacity Provider** and select the Manged Instance capcity provider tied to the cluster.
7. For **Number of tasks** enter `1`, then click the **Next step** button.
8. Fill in the rest of the optional fields based on your preference.
9. Click the **Next step** button, then click the **Create service** button.

[4]: https://aws.amazon.com/console
{{% /tab %}}
{{% tab "AWS CLI" %}}

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
[11]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

### Set up additional Agent features

#### Metrics Collection

Docker labels are not supported for ECS Managed Instances. In order to provide a custom integration configuration, a config file must be mounted directly onto the agent container.

The following is an example of setting up an Agent with custom configuration files mounted. Create the following file structure:
```
|- datadog
  |- Dockerfile
  |- conf.d
    |-redis.yaml
```

The `redis.yaml` contains the configurations for the [redis][28] integration.
```
ad_identifiers:
  - redis

init_config:

instances:
    - host: %%host%%
      port: 6379
```
The `Dockerfile` is used to build a Datadog Agent image and include the redis.yaml file at the right location:
```
FROM public.ecr.aws/datadog/agent:latest

COPY conf.d/ /etc/datadog-agent/conf.d/
```

Once the image is built and pushed to an image repository, reference the custom image in the ECS task definition:
```
{
    "containerDefinitions": [
        {
            "image": "<registry-domain>/<namespace-or-account>/<repository>:<tag>",
            "name": "datadog-agent",
            ...
        }
    ],
    ...
}
```

#### APM

Instrument your application based on your setup:

| Language                           |
|------------------------------------|
| [Java][17] |
| [Python][18] |
| [Ruby][19] |
| [Go][20] |
| [Node.js][21] |
| [PHP][22] |
| [C++][23] |
| [.NET Core][24] |
| [.NET Framework][25] |

##### UDP

To collect traces over UDP, do not set `DD_AGENT_HOST` - the default of `localhost` works.

##### UDS

To collect traces over UDS:
1. Add an empty volume onto the task definition using the `volumes` parameter.
2. Mount the volume onto the agent and application container using the `mountPoints` parameter.
3. Configure the environmental variable `DD_DOGSTATSD_SOCKET` on the application container and set it to `/var/run/datadog/dsd.socket`.

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
                    "name": "DD_DOGSTATSD_SOCKET",
                    "value": "/var/run/datadog/dsd.socket"
                }
            ],
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

The setup for log collection is identical to ECS fargate. Follow the instructions outlined in the [ECS Fargate documentation][14] to set up log collection with the AWS FireLens integration built on Datadog's Fluent Bit output plugin or the awslogs log driver to store the logs in a CloudWatch Log Group, and then a Lambda function to route logs to Datadog

#### Process collection

You can monitor processes in ECS Managed Instances in Datadog by using the [Live Processes page][15]. To enable process collection, add the [`PidMode` parameter][16] in the Task Definition and set it to `task` as follows:

```
"pidMode": "task"
```

## Troubleshooting

Need help? Contact [Datadog support][26].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/getting-started-managed-instances.html
[2]: #create-an-ecs-task-definition
[3]: #run-the-task-as-a-replica-service
[4]: https://aws.amazon.com/console
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate
[7]: /resources/json/datadog-agent-ecs-managed-instances-sidecar.json
[8]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_service-options.html#service_scheduler_replica
[9]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[10]: /getting_started/site/
[11]: https://aws.amazon.com/cli
[12]: /containers/amazon_ecs/apm/
[13]: /resources/json/datadog-agent-ecs-apm.json
[14]: https://docs.datadoghq.com/integrations/ecs_fargate/?tab=awscli#log-collection
[15]: /process
[16]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_pidmode
[17]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/java?tab=containers#automatic-instrumentation
[18]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/python?tab=containers#instrument-your-application
[19]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/ruby#instrument-your-application
[20]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/go/?tab=containers#activate-go-integrations-to-create-spans
[21]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/nodejs?tab=containers#instrument-your-application
[22]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/php?tab=containers#automatic-instrumentation
[23]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/cpp?tab=containers#instrument-your-application
[24]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/dotnet-core?tab=containers#custom-instrumentation
[25]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/dotnet-framework?tab=containers#custom-instrumentation
[26]: https://docs.datadoghq.com/help/
[27]: #set-up-additional-agent-features
[28]: https://docs.datadoghq.com/integrations/redis/?tab=ecs
