---
title: Setting up CSM Workload Security
kind: documentation
further_reading:
  - link: "/security/cloud_security_management/setup"
    tag: "Documentation"
    text: "Setting up Cloud Security Management"
  - link: "/security/threats/"
    tag: "Documentation"
    text: "Cloud Security Management Threats"
  - link: "/agent/remote_config"
    tag: "Documentation"
    text: "Remote Configuration"
---

The Cloud Security Management (CSM) Workload Security package includes [CSM Threats][1]. To learn more about the available CSM packages, see [Setting up Cloud Security Management][2].

## Prerequisites

{{% csm-prereqs-workload-security %}}

## Installation

### Enable Remote Configuration

{{< site-region region="us3,us5,eu,gov,ap1" >}}
<div class="alert alert-warning">Remote Configuration for CSM Threats is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">Remote Configuration for CSM Threats is in beta. If you have any feedback or questions, contact <a href="/help">Datadog support</a>.</div>

[Remote Configuration][4] is a Datadog capability that allows you to remotely configure the behavior of Datadog resources deployed in your infrastructure. For CSM Threats, enabling Remote Configuration allows you to receive new and updated Agent rules automatically when they're released.

To use Remote Configuration with CSM Threats, add the Remote Configuration scope to a new or existing API key, and then update your Datadog Agent configuration. See the [Remote Configuration setup instructions][5] for more information.

**Note**: Without Remote Configuration, Agent rules must be manually deployed to the Datadog Agent.

### Configure the Agent

#### Follow the in-app instructions (recommended)

To enable CSM Workload Security on the Agent, navigate to the [**Cloud Security Management Setup** page][6] and click **Hosts and containers**.

{{< img src="security/csm/hosts_containers_setup_2.png" alt="The Hosts and containers section on the Cloud Security Management Setup page" width="80%">}}

For each version of the Agent that is installed, click **Enable** and follow the step-by-step instructions to enable CSM Workload Security.

Alternatively, use the following examples to enable CSM Workload Security:

{{< tabs >}}
{{% tab "Kubernetes (Helm)" %}}

1. Add the following to the `datadog` section of the `values.yaml` file:

    ```yaml
    # values.yaml file
    datadog:
      remoteConfiguration:
        enabled: true
      securityAgent:
        runtime:
          enabled: true
    ```

2. Restart the Agent.

{{% /tab %}}

{{% tab "Kubernetes (Operator)" %}}

1. Add the following to the `spec` section of the `values.yaml` file:

    ```yaml
    # values.yaml file
    spec:
      features:
        remoteConfiguration:
          enabled: true
        cws:
          enabled: true
    ```

2. Restart the Agent.


[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}

{{% tab "Docker" %}}

Use the following command to start the Runtime Security Agent and `system-probe` in a Docker environment:

{{< code-block lang="shell" filename="docker-runtime-security.sh" >}}

docker run -d --name dd-agent \
  --cgroupns host \
  --pid host \
  --security-opt apparmor:unconfined \
  --cap-add SYS_ADMIN \
  --cap-add SYS_RESOURCE \
  --cap-add SYS_PTRACE \
  --cap-add NET_ADMIN \
  --cap-add NET_BROADCAST \
  --cap-add NET_RAW \
  --cap-add IPC_LOCK \
  --cap-add CHOWN \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /etc/passwd:/etc/passwd:ro \
  -v /etc/group:/etc/group:ro \
  -v /:/host/root:ro \
  -v /sys/kernel/debug:/sys/kernel/debug \
  -v /etc/os-release:/etc/os-release \
  -e DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED=true \
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> \
  gcr.io/datadoghq/agent:7

{{< /code-block >}}

{{% /tab %}}

{{% tab "Daemonset" %}}

Add the following settings to the `env` section of `security-agent` and `system-probe` in the `daemonset.yaml` file:

```bash
  # Source: datadog/templates/daemonset.yaml
  apiVersion:app/1
  kind: DaemonSet
  [...]
  spec:
  [...]
  spec:
      [...]
        containers:
        [...]
          - name: agent
            [...]
            env:
              - name: DD_REMOTE_CONFIGURATION_ENABLED
                value: "true"
          - name: system-probe
            [...]
            env:
              - name: DD_RUNTIME_SECURITY_CONFIG_ENABLED
                value: "true"
              - name: DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED
                value: "true"
          [...]
```

{{% /tab %}}

{{% tab "Host (Others)" %}}

For a package-based deployment, install the Datadog package with your package manager, and then update the `datadog.yaml`, `security-agent.yaml`, and `system-probe.yaml` files.

By default, Runtime Security is disabled. To enable it, both the `security-agent.yaml` and `system-probe.yaml` files need to be updated.

```shell
sudo cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
```

```bash
# /etc/datadog-agent/datadog.yaml file
remote_configuration:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable remote configuration.
  enabled: true

runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable full CSM Threats.
  enabled: true
```

```bash
# /etc/datadog-agent/security-agent.yaml file
runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable full CSM Threats.
  enabled: true
```

```bash
# /etc/datadog-agent/system-probe.yaml file
runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable full CSM Threats.
  enabled: true

  remote_configuration:
    ## @param enabled - boolean - optional - default: false
    enabled: true
```

{{% /tab %}}

{{% tab "AWS Elastic Beanstalk" %}}

The following deployment can be used to start the Runtime Security Agent and `system-probe` in an AWS Elastic Beanstalk environment with multiple Docker containers:

```json
{
    "AWSEBDockerrunVersion": 2,
    "volumes": [
        {
            "name": "docker_sock",
            "host": {
                "sourcePath": "/var/run/docker.sock"
            }
        },
        {
            "name": "proc",
            "host": {
                "sourcePath": "/proc/"
            }
        },
        {
            "name": "cgroup",
            "host": {
                "sourcePath": "/cgroup/"
            }
        },
        {
            "name": "debug",
            "host": {
                "sourcePath": "/sys/kernel/debug"
            }
        },
        {
           "name": "os_release",
           "host": {
                "sourcePath": "/etc/os-release"
        }
        },
        {
           "name": "etc_passwd",
           "host": {
             "sourcePath": "/etc/passwd"
           }
        },
        {
           "name": "etc_group",
           "host": {
             "sourcePath": "/etc/group"
           }
        }
    ],
    "containerDefinitions": [
        {
            "image": "gcr.io/datadoghq/agent:7",
            "environment": [
                {
                    "name": "DD_API_KEY",
                    "value": "<YOUR_DD_API_KEY>"
                },
                {
                    "name": "DD_SITE",
                    "value": "<YOUR_DD_SITE>"
                },
                {
                    "name": "DD_TAGS",
                    "value": "<SIMPLE_TAG>, <KEY:VALUE_TAG>"
                },
                {
                   "name": "DD_RUNTIME_SECURITY_CONFIG_ENABLED",
                   "value": "true"
                },
                {
                    "name": "DD_REMOTE_CONFIGURATION_ENABLED",
                    "value": "true"
                },
                {
                    "name": "DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED",
                    "value": "true"
                }
            ],
            "memory": 256,
            "dockerSecurityOptions": ["apparmor:unconfined"],
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
            "mountPoints": [
                {
                    "sourceVolume": "docker_sock",
                    "containerPath": "/var/run/docker.sock",
                    "readOnly": false
                },
                {
                    "sourceVolume": "proc",
                    "containerPath": "/host/proc",
                    "readOnly": true
                },
                {
                    "sourceVolume": "cgroup",
                    "containerPath": "/host/sys/fs/cgroup",
                    "readOnly": true
                },
                {
                    "containerPath": "/sys/kernel/debug",
                    "sourceVolume": "debug"
                },
                {
                    "sourceVolume": "os_release",
                    "containerPath": "/host/etc/os-release",
                    "readOnly": false
                },
                {
                    "sourceVolume": "etc_passwd",
                    "containerPath": "/etc/passwd",
                    "readOnly": false
                },
                {
                    "sourceVolume": "etc_group",
                    "containerPath": "/etc/group",
                    "readOnly": false
                }
            ]
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/threats
[2]: /security/cloud_security_management/setup
[4]: /agent/remote_config
[5]: /agent/remote_config/?tab=environmentvariable#enabling-remote-configuration
[6]: https://app.datadoghq.com/security/configuration/csm/setup
[15]: /security/cloud_security_management/troubleshooting
[14]: /agent