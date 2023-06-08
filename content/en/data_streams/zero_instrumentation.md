---
title: Setup Data Streams Monitoring without code instrumentation
kind: documentation
---

{{< callout url="#" btn_hidden="true" >}}
  This instrumentation method is in beta. Contact <a href="/help">Support</a> to have it enabled for your organization.
{{< /callout >}}

## Overview

Data Streams Monitoring supports an option that provides visibility into your Kafka client-server metrics, universally, across your entire stack—without having to instrument your code. This option relies on the Datadog Agent and [Unified Service Tagging][1], and provides performance data about your uninstrumented Kafka services.

## Setup

### Prerequisites

- Datadog Agent 6.44+ or 7.44+
- Your containerized service is running on Linux Kernel 4.14+, or CentOS or RHEL 8.0+
- [Unified Service Tagging][1], where the `env` tag has been applied to your deployment

## Enablement

Enable Data Stream Monitoring in your Agent by using one of the following methods depending on how your service is deployed and your Agent configured:

{{< tabs >}}
{{% tab "Helm" %}}

Using the Datadog chart v3.30.0+, add the following to your values file:

```
datadog:
  ...
  dataStreamsMonitoring:
    enabled: true
```

If your cluster is running Google Container-Optimized OS (COS), add the following to your values file as well:

```
providers:
  gke:
    cos: true
```

{{% /tab %}}
{{% tab "Docker" %}}

Add the following to your `docker run` command:

```
docker run --cgroupns host \
  --pid host \
  -e DD_API_KEY="<DATADOG_API_KEY>" \
  -e DD_SYSTEM_PROBE_DATA_STREAMS_ENABLED=true \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /sys/kernel/debug:/sys/kernel/debug \
  -v /lib/modules:/lib/modules:ro \
  -v /usr/src:/usr/src:ro \
  -v /var/tmp/datadog-agent/system-probe/build:/var/tmp/datadog-agent/system-probe/build \
  -v /var/tmp/datadog-agent/system-probe/kernel-headers:/var/tmp/datadog-agent/system-probe/kernel-headers \
  -v /etc/apt:/host/etc/apt:ro \
  -v /etc/yum.repos.d:/host/etc/yum.repos.d:ro \
  -v /etc/zypp:/host/etc/zypp:ro \
  -v /etc/pki:/host/etc/pki:ro \
  -v /etc/yum/vars:/host/etc/yum/vars:ro \
  -v /etc/dnf/vars:/host/etc/dnf/vars:ro \
  -v /etc/rhsm:/host/etc/rhsm:ro \
  --security-opt apparmor:unconfined \
  --cap-add=SYS_ADMIN \
  --cap-add=SYS_RESOURCE \
  --cap-add=SYS_PTRACE \
  --cap-add=NET_ADMIN \
  --cap-add=NET_BROADCAST \
  --cap-add=NET_RAW \
  --cap-add=IPC_LOCK \
  --cap-add=CHOWN \
  gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

Add the following to your `docker-compose.yml` file:

```
services:
  ...
  datadog:
    ...
    environment:
     - DD_SYSTEM_PROBE_DATA_STREAMS_ENABLED: 'true'
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock:ro
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
     - /sys/kernel/debug:/sys/kernel/debug
     - /lib/modules:/lib/modules
     - /usr/src:/usr/src
     - /var/tmp/datadog-agent/system-probe/build:/var/tmp/datadog-agent/system-probe/build
     - /var/tmp/datadog-agent/system-probe/kernel-headers:/var/tmp/datadog-agent/system-probe/kernel-headers
     - /etc/apt:/host/etc/apt
     - /etc/yum.repos.d:/host/etc/yum.repos.d
     - /etc/zypp:/host/etc/zypp
     - /etc/pki:/host/etc/pki
     - /etc/yum/vars:/host/etc/yum/vars
     - /etc/dnf/vars:/host/etc/dnf/vars
     - /etc/rhsm:/host/etc/rhsm
    cap_add:
     - SYS_ADMIN
     - SYS_RESOURCE
     - SYS_PTRACE
     - NET_ADMIN
     - NET_BROADCAST
     - NET_RAW
     - IPC_LOCK
     - CHOWN
    security_opt:
     - apparmor:unconfined
```

{{% /tab %}}
{{% tab "Configuration files (Linux)" %}}

If you are not using Helm Charts or environment variables, set the following in your `system-probe.yaml` file:

```
data_streams_config:
  enabled: true
```

{{% /tab %}}
{{% tab "Environment variables (Linux)" %}}

If you configure the `system-probe` with environment variables, as is common with Docker and ECS installations, pass the following environment variable to `system-probe`:

```
DD_SYSTEM_PROBE_DATA_STREAMS_ENABLED=true
```

{{% /tab %}}
{{% tab "ECS" %}}

For ECS, enable DSM support and system probe with the following JSON task definition. Deploy the task definition as a [daemon service][1].

```json
{
  "containerDefinitions": [
    {
      "name": "datadog-agent",
      "image": "public.ecr.aws/datadog/agent:7",
      "cpu": 500,
      "memory": 1024,
      "essential": true,
      "mountPoints": [
        ...
        {
          "containerPath": "/sys/kernel/debug",
          "sourceVolume": "sys_kernel_debug"
        },
        {
          "containerPath": "/host/proc",
          "sourceVolume": "proc"
        },
        {
          "containerPath": "/var/run/docker.sock",
          "sourceVolume": "var_run_docker_sock"
        },
        {
          "containerPath": "/host/sys/fs/cgroup",
          "sourceVolume": "sys_fs_cgroup"
        },
        {
          "readOnly": true,
          "containerPath": "/var/lib/docker/containers",
          "sourceVolume": "var_lib_docker_containers"
        },
        {
          "containerPath": "/lib/modules",
          "sourceVolume": "lib_modules"
        },
        {
          "containerPath": "/usr/src",
          "sourceVolume": "usr_src"
        },
        {
          "containerPath": "/var/tmp/datadog-agent/system-probe/build",
          "sourceVolume": "var_tmp_datadog_agent_system_probe_build"
        },
        {
          "containerPath": "/var/tmp/datadog-agent/system-probe/kernel-headers",
          "sourceVolume": "var_tmp_datadog_agent_system_probe_kernel_headers"
        },
        {
          "containerPath": "/host/etc/apt",
          "sourceVolume": "etc_apt"
        },
        {
          "containerPath": "/host/etc/yum.repos.d",
          "sourceVolume": "etc_yum_repos_d"
        },
        {
          "containerPath": "/host/etc/zypp",
          "sourceVolume": "etc_zypp"
        },
        {
          "containerPath": "/host/etc/pki",
          "sourceVolume": "etc_pki"
        },
        {
          "containerPath": "/host/etc/yum/vars",
          "sourceVolume": "etc_yum_vars"
        },
        {
          "containerPath": "/host/etc/dnf/vars",
          "sourceVolume": "etc_dnf_vars"
        },
        {
          "containerPath": "/host/etc/rhsm",
          "sourceVolume": "etc_rhsm"
        }
      ],
      "environment": [
        {
          "name": "DD_API_KEY",
          "value": "<YOUR_DATADOG_API_KEY>"
        },
        ...
        {
          "name": "DD_SYSTEM_PROBE_DATA_STREAMS_ENABLED",
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
      }
    }
  ],
  "requiresCompatibilities": [
    "EC2"
  ],
  "volumes": [
    ...
    {
      "host": {
        "sourcePath": "/sys/kernel/debug"
      },
      "name": "sys_kernel_debug"
    },
    {
      "host": {
        "sourcePath": "/proc/"
      },
      "name": "proc"
    },
    {
      "host": {
        "sourcePath": "/var/run/docker.sock"
      },
      "name": "var_run_docker_sock"
    },
    {
      "host": {
        "sourcePath": "/sys/fs/cgroup/"
      },
      "name": "sys_fs_cgroup"
    },
    {
      "host": {
        "sourcePath": "/var/lib/docker/containers/"
      },
      "name": "var_lib_docker_containers"
    },
    {
      "host": {
        "sourcePath": "/lib/modules"
      },
      "name": "lib_modules"
    },
    {
      "host": {
        "sourcePath": "/usr/src"
      },
      "name": "usr_src"
    },
    {
      "host": {
        "sourcePath": "/var/tmp/datadog-agent/system-probe/build"
      },
      "name": "var_tmp_datadog_agent_system_probe_build"
    },
    {
      "host": {
        "sourcePath": "/var/tmp/datadog-agent/system-probe/kernel-headers"
      },
      "name": "var_tmp_datadog_agent_system_probe_kernel_headers"
    },
    {
      "host": {
        "sourcePath": "/etc/apt"
      },
      "name": "etc_apt"
    },
    {
      "host": {
        "sourcePath": "/etc/yum.repos.d"
      },
      "name": "etc_yum_repos_d"
    },
    {
      "host": {
        "sourcePath": "/etc/zypp"
      },
      "name": "etc_zypp"
    },
    {
      "host": {
        "sourcePath": "/etc/pki"
      },
      "name": "etc_pki"
    },
    {
      "host": {
        "sourcePath": "/etc/yum/vars"
      },
      "name": "etc_yum_vars"
    },
    {
      "host": {
        "sourcePath": "/etc/dnf/vars"
      },
      "name": "etc_dnf_vars"
    },
    {
      "host": {
        "sourcePath": "/etc/rhsm"
      },
      "name": "etc_rhsm"
    }
  ],
  "family": "datadog-agent-task"
}
```

If the operating system image is Ubuntu or Debian, add the following after `environment`:

```yaml
"dockerSecurityOptions": [
  "apparmor:unconfined"
]
```

If you are using load balancers with your services, enable additional cloud integrations to allow Data Streams Monitoring to discover cloud-managed entities. Install the [AWS Integration][2] for visibility in AWS Load Balancer. You must also enable ENI and EC2 metric collection.

Then, add the following tags to each load balancer:
```conf
ENV=<env>
SERVICE=<service>
```

[1]: /containers/amazon_ecs/?tab=awscli#run-the-agent-as-a-daemon-service
[2]: /integrations/amazon_web_services/
{{% /tab %}}
{{< /tabs >}}

[1]: /getting_started/tagging/unified_service_tagging
