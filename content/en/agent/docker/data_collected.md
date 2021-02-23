---
title: Docker Data Collected
kind: documentation
---

## Metrics

Metrics collected by the Agent when deployed in a Docker container:

{{< get-metrics-from-git "docker_daemon" >}}

## Events

The Docker Agent produces the following events:

- Delete Image
- Die
- Error
- Fail
- Kill
- Out of memory (oom)
- Pause
- Restart container
- Restart Daemon
- Update

## Service checks

- **docker.service_up**:
    Returns `CRITICAL` if the Agent is unable to collect the list of containers from the Docker daemon, otherwise returns `OK`.

- **docker.container_health**:
    This Service Check is only available for Agent v5. It returns `CRITICAL` if a container is unhealthy, `UNKNOWN` if the health is unknown, and `OK` otherwise.

- **docker.exit**:
    Returns `CRITICAL` if a container exited with a non-zero exit code, otherwise returns `OK`.

