---
aliases:
- /integrations/mesos_master/
- /integrations/mesos_slave/
integration_title: Mesos
is_public: true
kind: integration
short_description: Track cluster resource usage, master and slave counts, tasks statuses, and more.
---


<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


This check collects metrics for Mesos masters. For Mesos slave metrics, see the [Mesos Slave integration][1].

![Mesos master Dashboard][2]

## Overview

This check collects metrics from Mesos masters for:

- Cluster resources
- Slaves registered, active, inactive, connected, disconnected, etc
- Number of tasks failed, finished, staged, running, etc
- Number of frameworks active, inactive, connected, and disconnected

And many more.

## セットアップ

### インストール

The installation is the same on Mesos with and without DC/OS. Run the datadog-agent container on each of your Mesos master nodes:

```shell
docker run -d --name datadog-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e DD_API_KEY=<YOUR_DATADOG_API_KEY> \
  -e MESOS_MASTER=true \
  -e MARATHON_URL=http://leader.mesos:8080 \
  datadog/agent:latest
```

Substitute your Datadog API key and Mesos Master's API URL into the command above.

### 構成

If you passed the correct Master URL when starting datadog-agent, the Agent is already using a default `mesos_master.d/conf.yaml` to collect metrics from your masters. See the [sample mesos_master.d/conf.yaml][3] for all available configuration options.

Unless your masters' API uses a self-signed certificate. In that case, set `disable_ssl_validation: true` in `mesos_master.d/conf.yaml`.

#### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

    ```yaml
    logs_enabled: true
    ```

2. Add this configuration block to your `mesos_master.d/conf.yaml` file to start collecting your Mesos logs:

    ```yaml
    logs:
      - type: file
        path: /var/log/mesos/*
        source: mesos
    ```

    Change the `path` parameter value based on your environment, or use the default docker stdout:

    ```yaml
    logs:
      - type: docker
        source: mesos
    ```

    See the [sample mesos_master.d/conf.yaml][3] for all available configuration options.

3. [Restart the Agent][4].

To enable logs for Kubernetes environments, see [Kubernetes Log Collection][5].

### Validation

In Datadog, search for `mesos.cluster` in the Metrics Explorer.

## 収集データ

### メトリクス
{{< get-metrics-from-git "mesos_master" >}}


### イベント

The Mesos-master check does not include any events.

### サービスチェック
{{< get-service-checks-from-git "mesos_master" >}}


## トラブルシューティング

Need help? Contact [Datadog support][6].

## Further Reading

- [Installing Datadog on Mesos with DC/OS][7]




<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## Mesos Slave Integration

![Mesos Slave Dashboard][8]

## Overview

This Agent check collects metrics from Mesos slaves for:

- System load
- Number of tasks failed, finished, staged, running, etc
- Number of executors running, terminated, etc

And many more.

This check also creates a service check for every executor task.

## セットアップ

### インストール

See [Installing Datadog on Mesos with DC/OS][7] to install the Datadog Agent on each Mesos agent node with the DC/OS web UI.

### 構成

#### DC/OS

1. In the DC/OS web UI, click on the **Universe** tab. Find the **datadog** package and click the Install button.
1. Click the **Advanced Installation** button.
1. Enter your Datadog API Key in the first field.
1. In the Instances field, enter the number of slave nodes in your cluster (You can determine the number of nodes in your cluster by clicking the Nodes tab on the left side of the DC/OS web ui).
1. Click **Review and Install** then **Install**

#### Marathon

If you are not using DC/OS, use the Marathon web UI or post to the API URL the following JSON to define the Datadog Agent. You must change `<YOUR_DATADOG_API_KEY>` with your API Key and the number of instances with the number of slave nodes on your cluster. You may also need to update the docker image used to more recent tag. You can find the latest [on Docker Hub][9]

```json
{
  "id": "/datadog-agent",
  "cmd": null,
  "cpus": 0.05,
  "mem": 256,
  "disk": 0,
  "instances": 1,
  "constraints": [
    ["hostname", "UNIQUE"],
    ["hostname", "GROUP_BY"]
  ],
  "acceptedResourceRoles": ["slave_public", "*"],
  "container": {
    "type": "DOCKER",
    "volumes": [
      {
        "containerPath": "/var/run/docker.sock",
        "hostPath": "/var/run/docker.sock",
        "mode": "RO"
      },
      { "containerPath": "/host/proc", "hostPath": "/proc", "mode": "RO" },
      {
        "containerPath": "/host/sys/fs/cgroup",
        "hostPath": "/sys/fs/cgroup",
        "mode": "RO"
      }
    ],
    "docker": {
      "image": "datadog/agent:latest",
      "network": "BRIDGE",
      "portMappings": [
        {
          "containerPort": 8125,
          "hostPort": 8125,
          "servicePort": 10000,
          "protocol": "udp",
          "labels": {}
        }
      ],
      "privileged": false,
      "parameters": [
        { "key": "name", "value": "datadog-agent" },
        { "key": "env", "value": "DD_API_KEY=<YOUR_DATADOG_API_KEY>" },
        { "key": "env", "value": "MESOS_SLAVE=true" }
      ],
      "forcePullImage": false
    }
  },
  "healthChecks": [
    {
      "protocol": "COMMAND",
      "command": { "value": "/probe.sh" },
      "gracePeriodSeconds": 300,
      "intervalSeconds": 60,
      "timeoutSeconds": 20,
      "maxConsecutiveFailures": 3
    }
  ],
  "portDefinitions": [
    { "port": 10000, "protocol": "tcp", "name": "default", "labels": {} },
    { "port": 10001, "protocol": "tcp", "labels": {} }
  ]
}
```

Unless you want to configure a custom `mesos_slave.d/conf.yaml`-perhaps you need to set `disable_ssl_validation: true`-you don't need to do anything after installing the Agent.

#### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

    ```yaml
    logs_enabled: true
    ```

2. Add this configuration block to your `mesos_slave.d/conf.yaml` file to start collecting your Mesos logs:

    ```yaml
    logs:
      - type: file
        path: /var/log/mesos/*
        source: mesos
    ```

    Change the `path` parameter value based on your environment, or use the default docker stdout:

    ```yaml
    logs:
      - type: docker
        source: mesos
    ```

    See the [sample mesos_slave.d/conf.yaml][10] for all available configuration options.

3. [Restart the Agent][4].

To enable logs for Kubernetes environments, see [Kubernetes Log Collection][5].

### Validation

#### DC/OS

Under the Services tab in the DC/OS web UI you should see the Datadog Agent shown. In Datadog, search for `mesos.slave` in the Metrics Explorer.

#### Marathon

If you are not using DC/OS, then datadog-agent is in the list of running applications with a healthy status. In Datadog, search for `mesos.slave` in the Metrics Explorer.

## 収集データ

### メトリクス
{{< get-metrics-from-git "mesos_slave" >}}


### イベント

The Mesos-slave check does not include any events.

### サービスチェック
{{< get-service-checks-from-git "mesos_slave" >}}


## トラブルシューティング

Need help? Contact [Datadog support][6].

## Further Reading

- [Installing Datadog on Mesos with DC/OS][7]


[1]: https://docs.datadoghq.com/integrations/mesos/#mesos-slave-integration
[2]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mesos_master/images/mesos_dashboard.png
[3]: https://github.com/DataDog/integrations-core/blob/master/mesos_master/datadog_checks/mesos_master/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/agent/kubernetes/log/
[6]: https://docs.datadoghq.com/help/
[7]: https://www.datadoghq.com/blog/deploy-datadog-dcos
[8]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mesos_slave/images/mesos_dashboard.png
[9]: https://hub.docker.com/r/datadog/agent/tags
[10]: https://github.com/DataDog/integrations-core/blob/master/mesos_slave/datadog_checks/mesos_slave/data/conf.yaml.example
