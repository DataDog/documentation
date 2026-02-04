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
{{% tab "Mount Volumes" %}}

This approach provides writable volumes for the required directories at runtime:

1. **Provide writable volumes** for the required directories
2. **Use an init container** to copy default configuration files before the Agent starts
3. **Mount volumes** to both the init and Agent containers

Specific implementation varies by platform (Kubernetes, Docker, ECS, etc.), but the pattern remains the same.

### Example

The following is complete Docker Compose example demonstrating the read-only root filesystem configuration pattern:

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

- `datadog-init` service copies default configuration files to the `datadog-config` volume.
- `datadog` service starts only after init completes successfully.
- All required directories are mounted as writable volumes.

To adapt this pattern to other container orchestrators like ECS, Kubernetes, or plain Docker:
1. Create an init container that copies `/etc/datadog-agent/*` to a shared volume
2. Mount that volume to `/etc/datadog-agent` in the main Datadog Agent container
3. Mount writable volumes for other runtime directories (like `/opt/datadog-agent/run` and `/var/run/datadog`)
4. Enable read-only root filesystem

{{% /tab %}}
{{% tab "Custom Image" %}}

Create a custom Datadog Agent image with pre-defined volumes for writable directories. This is particularly useful when you cannot use init containers or dynamic volume mounting.

### Example

**Step 1:** Create a Dockerfile that extends the Datadog Agent image and declares volumes for required paths:

```dockerfile
FROM gcr.io/datadoghq/agent:latest
# Create volumes for all paths the Agent needs to write to
VOLUME ["/etc/datadog-agent", "/opt/datadog-agent/run", "/var/run/datadog", "/tmp", "/var/log/datadog"]
# Optional: Copy a custom datadog.yaml if needed
# ADD datadog.yaml /etc/datadog-agent/datadog.yaml
```

**Step 2:** Build and tag the custom image:

```shell
docker build -t your-registry/datadog-agent:7.x-rofs .
docker push your-registry/datadog-agent:7.x-rofs
```

**Step 3:** Use the custom image in your container orchestrator with read-only root filesystem enabled:

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
```

**Note**: When using the `VOLUME` directive in a Dockerfile, the container runtime automatically creates anonymous volumes for those paths. This removes the need for an init container, but these volumes are ephemeral and any customizations to `datadog.yaml` or `conf.d/` need to be baked into the image or provided through environment variables.

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

