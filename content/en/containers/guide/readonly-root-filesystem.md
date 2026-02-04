---
title: Running the Datadog Agent with a Read-Only Root Filesystem (ROFS)
description: Understand Agent filesystem writes and configure for read-only root filesystem container environments
further_reading:
    - link: '/agent/docker/'
      tag: 'Documentation'
      text: 'Datadog Docker Agent documentation'
    - link: '/agent/kubernetes/'
      tag: 'Documentation'
      text: 'Datadog Kubernetes documentation'
    - link: 'https://docs.aws.amazon.com/securityhub/latest/userguide/ecs-controls.html#ecs-5'
      tag: 'External'
      text: 'AWS Security Hub ECS.5 Control'
---

## Overview

Enabling read-only root filesystem (ROFS) has become a common container security practice to prevent unauthorized modifications to the container's filesystem. ROFS is recommended by major security frameworks including [AWS Security Hub ECS.5][1], [AWS EKS Best Practices][2], and the [NSA/CISA Kubernetes Hardening Guide][3].

If you're using a managed deployment method for the Datadog Agent (Helm chart, Datadog Operator, ECS Terraform module, etc.) then ROFS is already enabled. Otherwise, this guide explains how to run the Datadog Agent with ROFS enabled: by configuring writable volume mounts for your self-managed Datadog Agent installation.

## Configuration options

There are two approaches to configure the Datadog Agent for ROFS:

{{< tabs >}}
{{% tab "Mount writable volumes" %}}

Use writable volumes on your Datadog Agent container to ensure write access at runtime. This method works with any container orchestrator, such as Docker Compose, ECS, or Kubernetes.

### Steps

1. Create named volumes for the required directories (`/etc/datadog-agent`, `/opt/datadog-agent/run`, `/var/run/datadog`, and optionally `/var/log/datadog`).
2. Configure an init container to copy default configuration files from the Agent image to the shared `datadog-config` volume.
3. Configure the Agent container with `read_only: true` and mount the volumes with read-write permissions.

Complete example:
```yaml
services:
  datadog-init:
    image: gcr.io/datadoghq/agent:latest
    command: ["sh", "-c", "cp -R /etc/datadog-agent/* /opt/datadog-agent-config/"]
    volumes:
      - datadog-config:/opt/datadog-agent-config

  datadog:
    image: gcr.io/datadoghq/agent:latest
    read_only: true
    pid: host
    depends_on:
      datadog-init:
        condition: service_completed_successfully
    environment:
      - DD_API_KEY=${DD_API_KEY}
      - DD_SITE="datadoghq.com"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - datadog-config:/etc/datadog-agent:rw
      - datadog-run:/opt/datadog-agent/run:rw
      - datadog-sockets:/var/run/datadog:rw
      - datadog-logs:/var/log/datadog:rw
    tmpfs:
      - /tmp

volumes:
  datadog-config:
  datadog-run:
  datadog-sockets:
  datadog-logs:
```

**Note**: The init container copies default configuration files into the shared volume before the Agent starts. While the Agent can start without the init container prepopulating this volume, some checks might be missing or incomplete.

{{% /tab %}}
{{% tab "Create a custom Agent image" %}}

Create a custom Datadog Agent image with pre-defined volumes for writable directories. This is particularly useful when you cannot use init containers or dynamic volume mounting.

### Steps

1. Create a Dockerfile that extends the Datadog Agent image and declares volumes for required paths:
```dockerfile
FROM gcr.io/datadoghq/agent:latest

VOLUME ["/etc/datadog-agent", "/opt/datadog-agent/run", "/var/run/datadog", "/var/log/datadog"]

# Optional: If needed, copy a custom datadog.yaml or check config.
# ADD datadog.yaml /etc/datadog-agent/datadog.yaml
```
2. Build and tag your custom image:

```shell
docker build -t your-registry/datadog-agent:7.x-rofs .
docker push your-registry/datadog-agent:7.x-rofs
```

3. Use the custom image in your container orchestrator with read-only root filesystem enabled:
```yaml
services:
  datadog:
    image: your-registry/datadog-agent:7.x-rofs
    read_only: true
    pid: host
    environment:
      - DD_API_KEY=${DD_API_KEY}
      - DD_SITE="datadoghq.com"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
    tmpfs:
      - /tmp
```

**Note**: When using the `VOLUME` directive in a Dockerfile, the container runtime automatically creates anonymous volumes for those paths. This removes the need for an init container, but these volumes are ephemeral so any customizations to `datadog.yaml` or `conf.d/` need to be baked into the image or mounted as named volumes.

{{% /tab %}}
{{< /tabs >}}

## Datadog Agent filesystem write footprint

Following [Linux Filesystem Hierarchy Standard (FHS)][4] guidelines, the Datadog Agent writes defaults to the following directories, which require read/write permissions:

| Directory | Purpose | Read/Write Required |
|-----------|---------|----------|
| `/etc/datadog-agent/` | Configuration and check files | Yes |
| `/opt/datadog-agent/run/` | Runtime state files | Yes |
| `/var/run/datadog/` | APM and DogStatsD sockets | Yes |
| `/var/log/datadog/` | Agent log output | No |
| `/tmp/` | Temporary files for flares and diagnostics | No |

## Troubleshooting

### Agent fails to start with "read-only file system" errors
Check the Agent logs to identify which directory needs write access. The most common required directories are `/etc/datadog-agent/`, `/opt/datadog-agent/run/`, and `/var/run/datadog/`.

### Metrics or traces not being collected
1. Verify that `/var/run/datadog/` is mounted as writable. This directory contains the APM and DogStatsD socket files needed for trace and metric collection.
2. Confirm default `/etc/datadog-agent/conf.d` checks aren't overwritten by an empty volume.

### Flare creation fails
Agent flare requires write access to `/tmp/`. If generating flares is important for your troubleshooting workflow, mount `/tmp/` as a writable volume.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/ecs-controls.html#ecs-5
[2]: https://docs.aws.amazon.com/eks/latest/best-practices/pod-security.html
[3]: https://media.defense.gov/2022/Aug/29/2003066362/-1/-1/0/CTR_KUBERNETES_HARDENING_GUIDANCE_1.2_20220829.PDF
[4]: https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html

