---
title: Running the Datadog Agent with a Read-Only Root Filesystem
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
aliases:
    - /agent/guide/readonly-root-filesystem
---

## Overview

Enabling read-only root filesystem (ROFS) has become a common container security practice to prevent unauthorized modifications to the container's filesystem. ROFS is recommended by major security frameworks including [AWS Security Hub ECS.5][1], [AWS EKS Best Practices][2], and the [NSA/CISA Kubernetes Hardening Guide][3].

To run the Agent with ROFS enabled, you need to configure writable volumes for each directory the Agent writes to. If you're using a managed deployment method (ie. Datadog Helm chart, Datadog Operator, ECS Terraform module, etc) then this configuration is already done for you. Otherwise, this guide explains how to configure writable volume mounts for your self-managed Agent installation.

## Configuration pattern

There are three steps when running configuring the Agent for ROFS:

1. **Provide writable volumes** for the required directories
2. **Use an init container** to copy default configuration files before the Agent starts
3. **Mount volumes** to both the init and Agent containers

Specific implementation varies by platform (Kubernetes, Docker, ECS, etc.), but the pattern remains the same.

### Example

For self-managed deployments, here's a complete Docker Compose example demonstrating the read-only root filesystem configuration pattern:

```yaml
services:
  # Init container populating 'datadog-config' volume with config files.
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
      - DD_SITE="datadoghq.com"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      # Mounting populated config volume with read-write permissions.
      - datadog-config:/etc/datadog-agent:rw
      - datadog-run:/opt/datadog-agent/run:rw
      - datadog-sockets:/var/run/datadog:rw
      # (optional) The Agent will operate mostly normally without these volumes
      - datadog-tmp:/tmp:rw
      - datadog-logs:/var/log/datadog:rw

volumes:
  datadog-config:
  datadog-run:
  datadog-sockets:
  datadog-tmp:
  datadog-logs:
```

**Key elements:**
- `datadog-init` service copies default configuration files to the `datadog-config` volume.
- `datadog` service starts only after init completes successfully,
- All required directories are mounted as writable volumes.

You can adapt this pattern to other container orchestrators like ECS, K8s, or plain Docker by:
1. Creating an init container that copies `/etc/datadog-agent/*` to a shared volume
2. Mounting that volume to `/etc/datadog-agent` in the main Agent container
3. Mounting writable volumes for other runtime directories (like `/opt/datadog-agent/run` and `/var/run/datadog`)
4. Enabling read-only root filesystem

## Agent filesystem writes

Historically, the Datadog Agent has followed the longstanding [Linux Filesystem Hierarchy Standard (FHS)][4], which is a guidelines outlining where applications should place their files. As a result,
the Datadog Agent defaults to a set of locations that need read/write permissions for normal operation.

### Write footprint

Following FHS guidelines, the Agent writes defaults to the following directories:

| Directory | Purpose | Required |
|-----------|---------|----------|
| `/etc/datadog-agent/` | Configuration and check files | Yes |
| `/opt/datadog-agent/run/` | Runtime state files | Yes |
| `/var/run/datadog/` | APM and DogStatsD sockets | Yes |
| `/var/log/datadog/` | Agent log output | No |
| `/tmp/` | Temporary files for flares and diagnostics | No |

## Troubleshooting

**Agent fails to start with "read-only file system" errors:**
- Check the Agent logs to identify which directory needs write access. The most common required directories are `/etc/datadog-agent/`, `/opt/datadog-agent/run/`, and `/var/run/datadog/`.

**Metrics or traces not being collected:**
1. Verify that `/var/run/datadog/` is mounted as writable—this directory contains the APM and DogStatsD socket files needed for trace and metric collection.
2. Confirm default `/etc/datadog-agent/conf.d` checks aren't overwritten by an empty volume.

**Flare creation fails:**
- Agent flares requires write access to `/tmp/`. If generating flares is important for your troubleshooting workflow, mount `/tmp/` as a writable volume.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/ecs-controls.html#ecs-5
[2]: https://docs.aws.amazon.com/eks/latest/best-practices/pod-security.html
[3]: https://media.defense.gov/2022/Aug/29/2003066362/-1/-1/0/CTR_KUBERNETES_HARDENING_GUIDANCE_1.2_20220829.PDF
[4]: https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html

