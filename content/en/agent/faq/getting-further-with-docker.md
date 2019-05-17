---
title: Host Metrics with the Container Agent
kind: faq
further_reading:
- link: "/agent/docker/"
  tag: "Documentation"
  text: "Learn more about the Datadog Docker Agent"
---

## Disk check
The [Disk check][1] reports host metrics with the container Agent for any storage mounted on the host and exposed to the container as a volume. No additional setup is required.

### Metrics for partitions
The layered nature of Linux storage (block devices, logical volumes, and partitions) makes it necessary to have a partition mounted to report its free space.

The container Agent reports disk metrics and rates for every partition that is accessible (even if only partially). This separation is enforced by cgroups and Docker. To allow disk usage reporting on a partition, you need to expose it through a Docker volume with the `-v` argument to `docker run`. The following options are available:

* Create a dummy file in the filesystem to watch and expose it through Docker. The Agent can't access any other file on this partition.
    ```
    -v /mnt/loop/dummyfile:/host/loop0:ro
    ```

* Expose the whole mount-point as read-only. The Agent can access the folder hierarchy and world-readable files.
    ```
    -v /mnt/loop:/host/loop0:ro
    ```

* If the mount path is unknown (dynamically mounted volumes), but the parent directory is constant, expose the parent folder. The Agent is able to access all volumes mounted in this folder's children.
    ```
    -v /mnt/:/host/mnt:ro
    ```

### Troubleshooting
#### Missing disk metrics
If you customized the Docker image or mount a custom directory to the Agent's `conf.d` folder, make sure the Disk check's default `conf.yaml` (or a customized `conf.yaml`) is present, or the check is disabled.

#### Permission denied errors
You may see permission denied errors with the containerized Agent when collecting disk metrics from certain virtual mount points. This usually occurs when the host's entire root filesystem is exposed to the container. The Agent finds `shm` or `netns` mount points, which cannot generate metrics.

Here is an example of a related log reported by the Agent:

```
10:12:52 PST | WARN | (datadog_agent.go:149 in LogMessage) | (disk.py:114) | Unable to get disk metrics for /run/docker/netns/9ec58235910c: [Errno 13] Permission denied: '/run/docker/netns/9ec58235910c'
```

Ideally, you should only expose useful paths to the Agent's container. If needed, prevent these logs from being reported by the Agent by updating the Disk check's `conf.yaml` to exclude the relevant file systems by using one of the following parameters:

* `file_system_blacklist` for Agent v6.8.0+
* `excluded_filesystems` for older Agent versions

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/disk
