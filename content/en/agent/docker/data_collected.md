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

{{< get-service-checks-from-git "docker" >}}
