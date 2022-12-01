---
title: Amazon ECS Log Collection
kind: documentation
aliases:
  - /agent/amazon_ecs/logs
further_reading:
- link: "/agent/amazon_ecs/apm/"
  tag: "Documentation"
  text: "Collect your application traces"
- link: "/agent/amazon_ecs/data_collected/#metrics"
  tag: "Documentation"
  text: "Collect ECS metrics"
---

## Overview

Datadog Agent 6+ collects logs from containers. The recommended way to collect logs from ECS containers is to enable log collection within your Agent's Task Definition. This can be done by modifying the previously used [Task Definition file][7] and [registering your updated Task Definition][8]. Alternatively you can edit the Task Definition directly from the Amazon Web UI.

Once enabled the Datadog Agent container collects the logs emitted from the other application containers on the same respective host as itself. This is limited to the logs emitted to the `stdout` and `stderr` log stream when using the `default` or `json-file` logging driver.

- If your containers are creating log files isolated within *their* containers you will need to perform some [extra steps](#log-file-within-a-container) to ensure the Agent container has visibility to those log files.
- If your containers are using the `awslogs` [logging driver to send the logs to cloudwatch][9] then those logs will not be visible to the Agent, and you will instead need to use one of the [AWS log collection integrations][10] in order to collect those.

## Installation

### ECS Task Definition

To collect all logs written by running applications in your ECS containers, update your Agent's Task Definition from the [original ECS Setup][11] with the environment variables and mounts below.

{{< tabs >}}
{{% tab "Linux" %}}

Use [datadog-agent-ecs-logs.json][1] as a reference point for the required base configuration. Your Task Definition should have:

  ```json
  {
    "containerDefinitions": [
      {
        (...)
        "mountPoints": [
          (...)
          {
            "containerPath": "/opt/datadog-agent/run",
            "sourceVolume": "pointdir",
            "readOnly": false
          },
          {
            "containerPath": "/var/lib/docker/containers",
            "sourceVolume": "containers_root",
            "readOnly": true
          }
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
          }
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
      {
        "host": {
          "sourcePath": "/var/lib/docker/containers/"
        },
        "name": "containers_root"
      }
    ],
    "family": "datadog-agent-task"
  }
  ```

[1]: /resources/json/datadog-agent-ecs-logs.json
{{% /tab %}}
{{% tab "Windows" %}}

Use [datadog-agent-ecs-win-logs.json][1] as a reference point for the required base configuration. Your Task Definition should have:

  ```json
  {
    "containerDefinitions": [
      {
        (...)
        "mountPoints": [
          (...)
          {
            "containerPath": "C:/programdata/datadog/run",
            "sourceVolume": "pointdir",
            "readOnly": false
          },
          {
            "containerPath": "c:/programdata/docker/containers",
            "sourceVolume": "containers_root",
            "readOnly": true
          }
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
          }
        ]
      }
    ],
    "volumes": [
      (...)
      {
        "name": "pointdir",
        "dockerVolumeConfiguration": {
          "autoprovision": true,
          "scope": "shared",
          "driver": "local"
        }
      },
      {
        "host": {
          "sourcePath": "c:/programdata/docker/containers"
        },
        "name": "containers_root"
      }
    ],
    "family": "datadog-agent-task"
  }
  ```

[1]: /resources/json/datadog-agent-ecs-win-logs.json
{{% /tab %}}
{{< /tabs >}}

These Task Definitions set the environment variable `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true` to collect logs from every container that the Agent discovers. This can be disabled if you'd like to only collect logs when containers have [Autodiscovery Labels](#autodiscovery-labels) present.

If you have a local file for your Agent's Task Definition you can repeat the steps to [register your updated Task Definition][8]. This will create a new revision for you. You can then reference this updated revision in the Daemon Service for the Datadog Agent.

## Custom log collection

### Autodiscovery labels
If the environment variable `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true` is set the Agent will collect logs from all containers by default. When doing so it will set the `service` and `source` tags on the logs to the short image name of the container that emitted those logs. You can provide Docker Labels on your ECS application containers as Autodisocovery labels to customize the log configuration that the Agent will use for *that* container.

You can consult [the Docker Log Collection setup instructions][12] for information on how to utilize Autodiscovery configurations. For example a log configuration like the following can be used to override the `source` and `service` of the logs collected:

```json
[{"source": "example-source", "service": "example-service"}]
```

With respect to ECS, this can be added to the label `com.datadoghq.ad.logs` within the `dockerLabels` of the Task Definition for the application container emitting those logs.

```json
{
  "containerDefinitions": [
    {
      "name": "<CONTAINER_NAME>",
      "image": "<CONTAINER_IMAGE>",
      "dockerLabels": {
        "com.datadoghq.ad.logs": "[{\"source\": \"example-source\", \"service\": \"example-service\"}]"
      }
    }
  ]
}
```

You can further customize this by [adding tags to your log configuration][4] or any `log_processing_rules` for [advanced log collection options][5].

### Log file within a container

Docker with the `default` or `json-file` driver will expose the `stdout` and `stderr` log streams in a format that the Agent can readily find. However, if an application container is creating a log file isolated within its container then the Agent won't natively have visibility to that file. Datadog recommends that you use the `stdout` and `stderr` output streams for containerized applications when possible, so that you can more automatically set up log collection. Otherwise this can be done by providing Autodiscovery Labels to point towards the desired file path, while also having the Agent container and application container share a directory on the host.

The log configuration below can be provided to tell the Agent to [collect this custom log file][3] at the `/var/log/example/app.log` path.
```json
[{
  "type": "file",
  "path": "/var/log/example/app.log",
  "source": "example-source",
  "service": "example-service"
}]
```

As an example the Task Definition below is
1. Writing some logs to that file `/var/log/example/app.log` file
2. Has the `dockerLabels` present to setup the log configuration
3. Has the host path `volumes` and `mountPoints` specified for this `/var/log/example` directory

```json
{
  "containerDefinitions": [
    {
      "name": "example-logger",
      "image": "busybox",
      "entryPoint": ["/bin/sh", "-c", "--"],
      "command": ["while true; do sleep 1; echo `date` example file log >> /var/log/example/app.log; done;"],
      "mountPoints": [
        {
          "containerPath": "/var/log/example",
          "sourceVolume": "applogs"
        }
      ],
      "dockerLabels": {
        "com.datadoghq.ad.logs": "[{\"type\":\"file\",\"path\":\"/var/log/example/app.log\",\"source\":\"example-source\",\"service\":\"example-service\"}]"
      }
    }
  ],
  "volumes": [
    {
      "host": {
        "sourcePath": "/var/log/example"
      },
      "name": "applogs"
    }
  ],
  "family": "example-logger"
}
```

The file paths for the configuration are always relative to the Agent. So that same `volume` and `mountPoint` need to be present within the Agent's Task Definition as well to give visibility to that log file.

See the [AWS Bind mounts documentation][6] for additional details on volume management with ECS.

**Note**: When using this kind of configuration with a container the `stdout` and `stderr` logs streams are not collected automatically from the container, only the file. If collection from both the container streams and a file are needed it should be explicitly enabled in the configuration. For example:

```json
[
  {
    "type": "file",
    "path": "/var/log/example/app.log",
    "source": "example-file",
    "service": "example-service"
  },
  {
    "source": "example-stream",
    "service": "example-service"
  }
]
```

## Activate log integrations

The `source` attribute is used to identify the integration to use for each container. Override it directly in your containers labels to start using [the Datadog log integrations][2]. Read Datadog's [Autodiscovery guide for logs][1] to learn more about this process.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/docker/log/?tab=containerinstallation#log-integrations
[2]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[3]: /agent/logs/?tab=tailfiles#custom-log-collection
[4]: /getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#methods-for-assigning-tags
[5]: /agent/logs/advanced_log_collection?tab=docker
[6]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/bind-mounts.html
[7]: /containers/amazon_ecs/?tab=awscli#managing-the-task-definition-file
[8]: /containers/amazon_ecs/?tab=awscli#registering-the-task-definition
[9]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
[10]: /integrations/amazon_web_services/?tab=allpermissions#log-collection
[11]: /containers/amazon_ecs/?tab=awscli#setup
[12]: /containers/docker/log/?tab=dockerfile#log-integrations
