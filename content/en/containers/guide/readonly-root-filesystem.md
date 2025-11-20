---
title: Running the Datadog Agent with a Read-Only Root Filesystem
description: Understand Agent filesystem writes and configure volumes for read-only root filesystem environments
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
aliases:
    - /agent/guide/readonly-root-filesystem
---

## Overview

A read-only root filesystem (ROFS) is a container security practice where the container's root filesystem is mounted with read-only permissions. This prevents unauthorized modifications and reduces the attack surface. ROFS is recommended by major security frameworks including [AWS Security Hub ECS.5][1], [AWS EKS Best Practices][2], and the [NSA/CISA Kubernetes Hardening Guide][3].

The Datadog Agent performs filesystem write operations during startup and runtime. To run the Agent in ROFS environments, you need to provide writable volumes for specific directories. This guide explains which directories require write access and provides examples to help you configure your deployment.

## Agent filesystem writes

Understanding where and why the Agent writes to the filesystem helps you configure the necessary volumes.

### Startup initialization

During container startup, the Agent runs initialization scripts that modify configuration files based on the detected environment. These scripts require write access to `/etc/datadog-agent/` to create symlinks, copy configurations, and set up integration checks.

Since mounting an empty volume to `/etc/datadog-agent/` would overwrite the default configuration files from the container image, you need to use an init container or setup script to copy the default files to the mounted volume before the Agent starts.

### Runtime directories

During normal operation, the Agent writes to the following directories:

| Directory | Purpose | Required |
|-----------|---------|----------|
| `/etc/datadog-agent/` | Configuration and check files | Yes |
| `/opt/datadog-agent/run/` | Runtime state files (transaction logs, cache, registry) | Yes |
| `/var/run/datadog/` | APM and DogStatsD sockets | Yes |
| `/var/log/datadog/` | Agent log output | No |
| `/tmp/` | Temporary files for flares and diagnostics | No |


## Configuration pattern

To run the Agent with ROFS, you need to:

1. **Provide writable volumes** for the required directories
2. **Use an init container** to copy default configuration files before the Agent starts
3. **Mount the volumes** to both the init container and the Agent container

The specific implementation varies by platform (Kubernetes, Docker, ECS, etc.), but the pattern remains the same.

### Docker Compose example

For self-managed deployments, here's a complete Docker Compose example that demonstrates the ROFS configuration pattern:

```yaml
version: '3.8'
services:
  datadog-init:
    image: gcr.io/datadoghq/agent:latest
    command: ["sh", "-c", "cp -r /etc/datadog-agent/* /opt/datadog-agent-config/"]
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
      - DD_SITE=${DD_SITE}
      - DD_DISABLE_FILE_LOGGING=true
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
      - datadog-config:/etc/datadog-agent:rw
      - datadog-run:/opt/datadog-agent/run:rw
      - datadog-sockets:/var/run/datadog:rw

volumes:
  datadog-config:
  datadog-run:
  datadog-sockets:
```

**Key elements:**
- `datadog-init` service copies default configuration files to the `datadog-config` volume
- `datadog` service starts only after init completes successfully
- All required directories are mounted as writable named volumes
- `DD_DISABLE_FILE_LOGGING=true` eliminates the need for `/var/log/datadog` volume

You can adapt this pattern to other container orchestrators like ECS, Nomad, or plain Docker by:
1. Creating an init container that copies `/etc/datadog-agent/*` to a shared volume
2. Mounting that volume to `/etc/datadog-agent` in the main Agent container
3. Providing writable volumes for `/opt/datadog-agent/run` and `/var/run/datadog`
4. Enabling the read-only root filesystem constraint

## Adding custom configurations

To add custom check configurations or integration files in a ROFS environment:

**Option 1**: Build a custom image with your configuration files:

```dockerfile
FROM gcr.io/datadoghq/agent:latest
COPY my-integration.yaml /etc/datadog-agent/conf.d/my-integration.yaml
```

**Option 2**: In Kubernetes, use ConfigMaps to mount additional configuration files into the Agent container. For example with the Helm chart:

```yaml
agents:
  customAgentConfig:
    my-integration.yaml: |-
      instances:
        - host: my-service
          port: 8080
```

## Troubleshooting

**Agent fails to start with "read-only file system" errors:**
Check the Agent logs to identify which directory needs write access. The most common required directories are `/etc/datadog-agent/`, `/opt/datadog-agent/run/`, and `/var/run/datadog/`.

**Metrics or traces not being collected:**
Verify that `/var/run/datadog/` is mounted as writable—this directory contains the APM and DogStatsD socket files needed for trace and metric collection.

**Flare creation fails:**
The Agent flare command requires write access to `/tmp/`. If generating flares is important for your troubleshooting workflow, mount `/tmp/` as a writable volume.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/ecs-controls.html#ecs-5
[2]: https://docs.aws.amazon.com/eks/latest/best-practices/pod-security.html
[3]: https://media.defense.gov/2022/Aug/29/2003066362/-1/-1/0/CTR_KUBERNETES_HARDENING_GUIDANCE_1.2_20220829.PDF

