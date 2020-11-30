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

## Overview

Datadog Agent 6+ collects logs from containers. The recommended setup to collect logs from ECS containers is [deploying the Datadog Agent on your host](#setup) and enabling containerized logging within your `datadog-agent-ecs.json` or `datadog-agent-ecs1.json` file. This configuration allows the Datadog Agent to collect logs written to `stdout`/`stderr` with Docker socket.

If your application writes all or some logs to files (logs that are not written to `stdout`/`stderr`), you will need to [deploy the Datadog Agent on your host and use a third-party integration](#logs-written-to-files) to tail logs to the Datadog Agent.

## Setup

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

4. Additional environment variables for Amazon ECS containers are available for configuration. See the [Docker environment variables documentation][5] for more information.

[1]: https://docs.datadoghq.com/agent/amazon_ecs/
[2]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[3]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
[4]: https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/
[5]: https://docs.datadoghq.com/agent/docker/?tab=standard#environment-variables
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

4. Additional environment variables for Amazon ECS containers are available for configuration. See the [Docker environment variables documentation][4] for more information.

[1]: https://docs.datadoghq.com/agent/amazon_ecs/
[2]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-win.json
[3]: https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/
[4]: https://docs.datadoghq.com/agent/docker/?tab=standard#environment-variables
{{% /tab %}}
{{< /tabs >}}

### Logs written to files

If your application writes all or some of its logs to files, you will need to use a [third-party integration][1], such as [Fluent Bit][2], to collect logs from files and tail them to the Agent using a custom logs configuration.

1. Complete the setup of a third-party service or integration to forward logs to the Agent.
2. Refer to the [Custom Log Collection documentation][3] to tail logs to the Agent.

## Activate log integrations

The `source` attribute is used to identify the integration to use for each container. Override it directly in your containers labels to start using [log integrations][4]. Read Datadog's [Autodiscovery guide for logs][5] to learn more about this process.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/#cat-log-collection
[2]: /integrations/fluentbit/
[3]: /agent/logs/?tab=tailfiles#custom-log-collection
[4]: /getting_started/agent/#installation
[5]: /logs/processing/#log-processing
