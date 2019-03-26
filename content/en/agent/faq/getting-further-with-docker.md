---
title: Getting further with Docker
kind: faq
further_reading:
- link: "agent/"
  tag: "Documentation"
  text: "Learn more about the Datadog Agent"
- link: "integrations/docker_daemon"
  tag: "Integration"
  text: "Learn more about the Datadog-SNMP integration"
- link: "integrations/disk"
  tag: "Integration"
  text: "Learn more about the Datadog-Disk integration"
---

## How to report host disk metrics when dd-agent runs in a docker container?

`dd-agent` has two mechanisms to report disk statistics: the common disk check (works for any storage mounted on the host and exposed to the container as a volume) and the collect_disk_stats option to the docker_daemon check (only works for devicemapper storage, for example ECS).

### Disk check
#### Metrics are not sent for all partitions

The layered nature of the Linux storage subsystem (block devices, logical volumes, and partitions) makes it necessary to have a partition mounted to be able to report its free space, as the block layer has no means of knowing what part if the allocated size is used or free, and that logic is specific to every filesystem.

`dd-agent` reports disk metrics and rates for every partition that is accessible (even if only partially) to its container, but not others, as this separation is enforced by cgroups and Docker. To allow disk usage reporting on a partition, you need to expose it through a Docker volume via the `-v` argument to `docker run`. Here are three ways to do so, from most secure to most convenient:

* Create a dummy file in the filesystem they want to watch, and expose it through Docker: `-v /mnt/loop/dummyfile:/host/loop0:ro`; the Agent isn't able to access any file on this partition.

* Expose the whole mountpoint they want to monitor as read-only: `-v /mnt/loop:/host/loop0:ro`; the Agent is able to access the folder hierarchy and world-readable files.

* If the mount path is unknown (dynamically mounted volumes), but the parent directory is constant, expose the parent folder: `-v /mnt/:/host/mnt:ro`; the Agent is able to access all volumes mounted in this folder's children.

* Expose their whole host filesystem to the container: `-v /:/host/rootfs:ro`; this can be useful if mount points are unpredictable or rapidly changing. The Agent reports every partition mounted on the system, but might throw a "permission denied" warning on some virtual mount points (shm, netns...)

If your Agent container runs with `--privileged`, it has full access to the `/dev` folder and its block devices. You can mount the desired block devices into the container so that they are reported by the Agent. To monitor `loop0`, one could add to `entrypoint.sh`:

```
mkdir -p /tmp/mnt/loop0 && mount /dev/loop0 /tmp/mnt/loop0
```

This automount logic isn't added to the standard entrypoint, as unforeseen edge cases might lead to issues and data loss, but this should be safe if tailored to the specifics of the system.

#### No disk metrics are sent at all

If you customized the Docker image or mount a custom directory to `/etc/dd-agent/conf.d`, make sure the `disk.yaml.default` (or a customized `disk.yaml`) file is present, or the disk check is disabled.

#### Permission denied errors

You may see permission denied errors with the containerized Agent when collecting disk metrics from certain virtual mount points. This usually occurs when the host's entire root filesystem is exposed to the container. The Agent finds `shm` or `netns` mount points, which cannot generate metrics.

Here is an example of a related log reported by the Agent:

```
10:12:52 PST | WARN | (datadog_agent.go:149 in LogMessage) | (disk.py:114) | Unable to get disk metrics for /run/docker/netns/9ec58235910c: [Errno 13] Permission denied: '/run/docker/netns/9ec58235910c'
```

Ideally, you should only expose useful paths to the Agent's container. If needed, prevent these logs from being reported by the Agent by updating the Disk integration `conf.yaml` to exclude the relevant file systems. Use one of the following parameters:

* `file_system_blacklist` for Agent v6.8.0+
* `excluded_filesystems` for older Agent versions

### Docker_daemon check

#### No disk metrics are sent at all with collect_disk_stats enabled

The `collect_disk_stats` feature of `docker_daemon` only supports devicemapper-backed Docker storage. This is not the case in vanilla Docker or Kubernetes, but is the default configuration for ECS. If you use a different storage driver (aufs, overlayfs, etc.), you should use the disk check or `collect_container_size`.

#### collect_container_size is slow and hangs Docker

This option enables container size computation through the Docker ps system. It virtually runs df in every container and doesn't scale to large container counts, but Datadog runs the size computation once every 5 runs to reduce system impact.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

