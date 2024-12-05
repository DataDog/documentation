---
title: Docker Data Collected
aliases:
- /agent/docker/data_collected
---

## Docker integration

### Metrics

Metrics collected by the Agent when deployed in a Docker container:

{{< get-metrics-from-git "docker_daemon" >}}

### Events

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

### Service checks

{{< get-service-checks-from-git "docker" >}}

**Note**: To use `docker.exit`, add `collect_exit_codes: true` in your Docker `conf.yaml` file and restart the Agent.

## Container integration

### Metrics
{{< get-metrics-from-git "container" >}}

## Containerd integration

### Metrics

{{< get-metrics-from-git "containerd" >}}

### Events

The containerd check can collect events. Use `filters` to select the relevant events. See the sample [`containerd.d/conf.yaml`][1] for more details.

### Service checks

{{< get-service-checks-from-git "containerd" >}}

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/containerd.d/conf.yaml.default
