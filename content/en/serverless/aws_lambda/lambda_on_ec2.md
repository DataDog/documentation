---
title: Monitoring Lambda on EC2
description: Install and configure the Datadog Agent for AWS Lambda on Amazon EC2
---

Datadog Serverless Monitoring enables visibility into AWS Lambda functions running on Amazon EC2.

## Setup


1. [Create a task definition file](#create-a-task-definition-file)
2. [Register the task definition](#register-the-task-definition)
3. [Run the task as a replica service](#run-the-task-as-a-replica-service)

### Create a task definition file

This task definition launches the Datadog Agent container with the necessary configurations. 

1. Download (TBD: file). This files provide minimal configuration for core infrastructure monitoring. For more sample task definition files with various features enabled, see the [Set up additional Agent features](#set-up-additional-datadog-agent-features) section on this page.
2. Modify the task definition file:
    - Set the `DD_API_KEY` environment variable by replacing `<YOUR_DATADOG_API_KEY>` with the [Datadog API key][1] for your account. Alternatively, you can also [supply the ARN of a secret stored in AWS Secrets Manager][2].
    - Set the `DD_SITE` environment variable to your [Datadog site][3]. Your site is: {{< region-param key="dd_site" code="true" >}}
3. (Optional) To add an Agent health check, add the following line to your task definition:
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```

### Register the task definition

{{< tabs >}}
{{% tab "AWS Console" %}}

1. Log in to your [AWS Console][1] and navigate to (TBD: where?)
2. Select **Task Definitions** in the navigation pane. On the **Create new task definition** menu, select **Create new task definition with JSON**.
3. In the JSON editor box, paste the contents of your task definition file.
4. Select **Create**.

[1]: https://aws.amazon.com/console
{{% /tab %}}

{{% tab "AWS CLI" %}}
Use the [AWS CLI][1] to execute the following command:

```bash
(TBD: command)
```
[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}


### Run the task as a replica service

{{< tabs >}}
{{% tab "AWS Console" %}}
1. Log in to your [AWS Web Console][1] and navigate to (TBD: where?)
2. Choose the cluster to run the Datadog Agent on.
3. On the **Services** tab, click **Create**.
4. For **Task Definition**, select the task created in the previous steps.
5. Enter a **Service name**.
6. For **Launch type**, choose **Capacity Provider** and select the Manged Instance capacity provider tied to the cluster.
7. For **Number of tasks**, enter `1`. Click **Next step**.
8. Fill in the rest of the optional fields based on your preference.
9. Click **Next step**.
10. Click **Create service**.

[1]: https://aws.amazon.com/console
{{% /tab %}}

{{% tab "AWS CLI" %}}
Use the [AWS CLI][1] to execute the following command:

```bash
(TBD: command)
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

## Set up additional Datadog Agent features

### Metrics collection

To provide a custom integration configuration, you must mount a configuration file directly onto the Datadog Agent container.

**Example**: Setting up a Datadog Agent with custom configuration files mounted

Create the following file structure:
```
|- datadog
  |- Dockerfile
  |- conf.d
    |-redis.yaml
```

The `redis.yaml` file contains the configurations for the [Redis][4] integration.

{{< code-block lang="yaml" filename="redis.yaml" disable_copy="false" collapsible="true" >}}
ad_identifiers:
  - redis

init_config:

instances:
    - host: %%host%%
      port: 6379
{{< /code-block >}}

The `Dockerfile` is used to build a Datadog Agent image and include the `redis.yaml` file at the correct location:

{{< code-block lang="Dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
FROM public.ecr.aws/datadog/agent:latest

COPY conf.d/ /etc/datadog-agent/conf.d/
{{< /code-block >}}

After the image is built and pushed to an image registry, reference the custom image in the ECS task definition:
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

### Trace collection (APM)

Instrument your application based on your setup:

| Language                           |
|------------------------------------|
| [Java][5] |
| [Python][6] |
| [Ruby][7] |
| [Go][8] |
| [Node.js][9] |
| [PHP][10] |
| [C++][11] |
| [.NET Core][12] |
| [.NET Framework][13] |

#### UDP

To collect traces over UDP, do not set `DD_AGENT_HOST`. Keep the default `localhost` value.

#### UDS

To collect traces over UDS:
1. Add an empty volume onto the task definition using the `volumes` parameter.
2. Mount the volume onto the agent and application container using the `mountPoints` parameter.
3. Configure the environmental variable `DD_DOGSTATSD_SOCKET` on the application container and set it to `/var/run/datadog/dsd.socket`.

**Example**: Container definitions that configure collecting traces over UDS
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

### Log collection

The setup for log collection is identical to the setup for log collection in ECS Fargate. Follow the instructions in the [ECS Fargate documentation][14]. These instructions give you the option to use either AWS FireLens in combination with Datadog's Fluent Bit output plugin, or the `awslogs` log driver.

### Process collection

You can monitor processes in Datadog by using the [Live Processes page][15]. To enable process collection, add the [`PidMode` parameter][16] in the task definition and set it to `task` as follows:

```
"pidMode": "task"
```

## Troubleshooting

Need help? Contact [Datadog support][17].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[3]: /getting_started/site/
[4]: /integrations/redis/?tab=ecs
[5]: /tracing/trace_collection/dd_libraries/java?tab=containers#automatic-instrumentation
[6]: /tracing/trace_collection/dd_libraries/python?tab=containers#instrument-your-application
[7]: /tracing/trace_collection/dd_libraries/ruby#instrument-your-application
[8]: /tracing/trace_collection/dd_libraries/go/?tab=containers#activate-go-integrations-to-create-spans
[9]: /tracing/trace_collection/dd_libraries/nodejs?tab=containers#instrument-your-application
[10]: /tracing/trace_collection/dd_libraries/php?tab=containers#automatic-instrumentation
[11]: /tracing/trace_collection/dd_libraries/cpp?tab=containers#instrument-your-application
[12]: /tracing/trace_collection/dd_libraries/dotnet-core?tab=containers#custom-instrumentation
[13]: /tracing/trace_collection/dd_libraries/dotnet-framework?tab=containers#custom-instrumentation
[14]: integrations/ecs_fargate/?tab=awscli#log-collection
[15]: /process
[16]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_pidmode
[17]: https://docs.datadoghq.com/help/
