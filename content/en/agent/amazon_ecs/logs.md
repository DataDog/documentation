---
title: Amazon ECS Log Collection
kind: documentation
further_reading:
- link: "/agent/amazon_ecs/apm/"
  tag: "Documentation"
  text: "Collect your application traces"
- link: "/agent/amazon_ecs/data_collected/#metrics"
  tag: "Documentation"
  text: "Collect ECS metrics"
---

## Setup

To collect all logs written by running applications in your ECS containers and send it to your Datadog application:

{{< tabs >}}
{{% tab "Linux" %}}

1. Follow the [Amazon ECS setup instructions][1].
2. Update your [datadog-agent-ecs.json][2] file ([datadog-agent-ecs1.json][3] if you are using an original Amazon Linux AMI) with the following configuration:

    ```text
    {
        "containerDefinitions": [
        (...)
          "mountPoints": [
            (...)
            {
              "containerPath": "/opt/datadog-agent/run",
              "sourceVolume": "pointdir",
              "readOnly": false
            },
            (...)
          ],
          "environment": [
            (...)
            {
              "name": "DD_LOGS_ENABLED",
              "value": "true"
            },
            {
              "name": "DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL",
              "value": "true"
            },
            (...)
          ]
        }
      ],
      "volumes": [
        (...)
        {
          "host": {
            "sourcePath": "/opt/datadog-agent/run"
          },
          "name": "pointdir"
        },
        (...)
      ],
      "family": "datadog-agent-task"
    }
    ```

3. Make sure your container definition doesn't contain a `logConfiguration.logDriver` parameter, so that the logs are written to `stdout/stderr` and collected by the Agent. If this parameter is set to `awslogs`, collect your Amazon ECS logs without the Agent by using [AWS Lambda to collect ECS logs from CloudWatch][4].

[1]: https://docs.datadoghq.com/agent/amazon_ecs/
[2]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[3]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
[4]: https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/
{{% /tab %}}
{{% tab "Windows" %}}

1. Follow the [Amazon ECS setup instructions][1].
2. Update your [datadog-agent-ecs-win.json][2] file with the following configuration:

    ```text
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

3. Make sure your container definition doesn't contain a `logConfiguration.logDriver` parameter, so that the logs are written to `stdout/stderr` and collected by the Agent. If this parameter is set to `awslogs`, collect your Amazon ECS logs without the Agent by using [AWS Lambda to collect ECS logs from CloudWatch][3].

[1]: https://docs.datadoghq.com/agent/amazon_ecs/
[2]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-win.json
[3]: https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/
{{% /tab %}}
{{< /tabs >}}

## Activate log integrations

The `source` attribute is used to identify the integration to use for each container. Override it directly in your containers labels to start using [log integrations][1]. Read Datadog's [Autodiscovery guide for logs][2] to learn more about this process.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/agent/#installation
[2]: https://docs.datadoghq.com/logs/processing/#log-processing
[2]: https://docs.datadoghq.com/logs/log_collection/docker/?tab=containerinstallation#activate-log-integrations
