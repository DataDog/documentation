---
title: Setting up Cloud Workload Security
kind: documentation
description: "Follow the setup and installation instructions to get started with Cloud Workload Security."
aliases:
  - /security_platform/cloud_workload_security/getting_started
  - /security/cloud_workload_security/getting_started
further_reading:
- link: "/getting_started/cloud_security_management"
  tag: "Documentation"
  text: "Getting Started with Cloud Security Management"
- link: "https://www.datadoghq.com/blog/datadog-runtime-security/"
  tag: "Blog"
  text: "Learn more about Datadog Cloud Runtime Security"
- link: "https://www.datadoghq.com/blog/linux-security-threat-detection-datadog/"
  tag: "Blog"
  text: "How to detect security threats in your systems' Linux processes"
- link: "https://www.datadoghq.com/blog/pwnkit-vulnerability-overview-and-remediation/"
  tag: "Blog"
  text: "The PwnKit vulnerability: Overview, detection, and remediation"
- link: "https://www.datadoghq.com/blog/dirty-pipe-vulnerability-overview-and-remediation/"
  tag: "Blog"
  text: "The Dirty Pipe vulnerability: Overview, detection, and remediation"
- link: "https://www.datadoghq.com/blog/engineering/dirty-pipe-container-escape-poc/"
  tag: "Blog"
  text: "Using the Dirty Pipe Vulnerability to Break Out from Containers"
- link: "https://www.datadoghq.com/blog/dns-based-threat-detection/"
  tag: "Blog"
  text: "Catch attacks at the network layer with DNS-based threat detection"
---

Cloud Workload Security (CWS) monitors file, network, and process activity across your environment to detect real-time threats to your infrastructure. As part of the Datadog platform, you can combine the real-time threat detection of CWS with metrics, logs, traces, and other telemetry to see the full context surrounding a potential attack on your workloads.

## Prerequisites

* Datadog Agent 7.44 or later.
* Data collection is done using eBPF, so Datadog minimally requires platforms that have underlying Linux kernel versions of 4.15.0+ or have eBPF features backported. CWS supports the following Linux distributions:
  * Ubuntu 18.04 or later
  * Debian 10 or later
  * Amazon Linux 2
  * Fedora 26 or later
  * SUSE 15 or later
  * CentOS/RHEL 7.6 or later
  * Custom kernel builds are not supported.
* For compatibility with a custom Kubernetes network plugin like Cilium or Calico, see the [Troubleshooting page][3].

## Installation

In general, installing CWS involves the following steps:

### Enable Remote Configuration

[Remote Configuration][4] is a Datadog capability that allows you to remotely configure the behavior of Datadog resources deployed in your infrastructure. For CWS, enabling Remote Configuration allows you to receive new and updated Agent rules automatically when they're released.

To use Remote Configuration with CWS, add the Remote Configuration scope to a new or existing API key, and then update your Datadog Agent configuration. See the [Remote Configuration setup instructions][5] for more information.

**Notes**:

- Without Remote Configuration, new and updated Agent rules must be manually deployed to the Datadog Agent.
- At this time, Remote Configuration is only available for default rules. Custom rules must be manually deployed to the Datadog Agent.

### Configure the CWS Agent

#### Follow the in-app documentation (recommended)

Follow the [in-app instructions][6] in the Datadog app for the best experience, including step-by-step instructions scoped to your deployment configuration.

{{< tabs >}}
{{% tab "Kubernetes" %}}

1. If you have not already, install the [Datadog Agent][1].

2. Add the following to the `datadog` section of the `values.yaml` file:

    ```yaml
    # values.yaml file
    datadog:
      remoteConfiguration:
        enabled: true
      securityAgent:
        runtime:
          enabled: true
    ```

3. Restart the Agent.
4. **Optional, if Cloud SIEM is checked** Follow [these instructions][2] to collect audit logs for Kubernetes.


[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
[2]: https://docs.datadoghq.com/integrations/kubernetes_audit_logs/
{{% /tab %}}

{{% tab "Docker" %}}

The following command can be used to start the Runtime Security Agent and `system-probe` in a Docker environment:

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
  -e DD_RUNTIME_SECURITY_CONFIG_NETWORK_ENABLED=true \ # to enable the collection of CWS network events
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
                    value: "true" [...]
```

{{% /tab %}}

{{% tab "Host (Others)" %}}

For a package-based deployment, the Datadog package has to be deployed. Install the package with your package manager, and then update the `datadog.yaml`, `security-agent.yaml`, and `system-probe.yaml` files.

By default, Runtime Security is disabled. To enable it, both the `security-agent.yaml` and the `system-probe.yaml` files need to be updated.

```bash
# /etc/datadog-agent/datadog.yaml file 
remote_configuration:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable remote configuration.
  enabled: true
```

```bash
# /etc/datadog-agent/security-agent.yaml file 
runtime_security_config:
  ## @param enabled - boolean - optional - default: false 
  ## Set to true to enable full Cloud Workload Security. 
  enabled: true
```

```bash
# /etc/datadog-agent/system-probe.yaml file 
runtime_security_config:
  ## @param enabled - boolean - optional - default: false 
  ## Set to true to enable full Cloud Workload Security. 
  enabled: true

  remote_configuration:
    ## @param enabled - boolean - optional - default: false
    ## For [Datadog Agent] version 7.42 only, to enable remote configuration
    enabled: true
```

[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
{{% /tab %}}

{{% tab "Amazon Elastic Beanstalk" %}}

The following deployment can be used to start the Runtime Security Agent and `system-probe` in an Amazon Elastic Beanstalk environment with multiple Docker containers:

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: /security/cloud_security_management/troubleshooting
[4]: /agent/guide/how_remote_config_works
[5]: /agent/guide/how_remote_config_works/?tab=environmentvariable#enabling-remote-configuration
[6]: https://app.datadoghq.com/security/setup