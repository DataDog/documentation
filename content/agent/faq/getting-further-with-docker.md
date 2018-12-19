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

dd-agent has two mechanisms to report disk statistics: the common disk check (works for any storage mounted on the host and exposed to the container as a volume) and the collect_disk_stats option to the docker_daemon check (only works for devicemapper storage, for example ECS).

### Disk check
#### Metrics are not sent for all partitions

The layered nature of the Linux storage subsystem (block devices, logical volumes and partitions) makes it necessary to have a partition mounted to be able to report its free space, as the block layer has no means of knowing what part if the allocated size is used or free, and that logic is specific to every filesystem.

dd-agent reports disk metrics and rates for every partition that is accessible (even if only partially) to its container, but not others, as this separation is enforced by cgroups / docker. To allow disk usage reporting on a partition, you need to expose it through a docker volume via the -v argument to docker run ; here are three ways, from most secure to most convenient:

* Create a dummy file in the filesystem they want to watch and expose it through docker: `-v /mnt/loop/dummyfile:/host/loop0:ro` : the Agent isn't able to access any file on this partition

* Expose the whole mountpoint they want to monitor as read-only: `-v /mnt/loop:/host/loop0:ro` : the Agent is able to access the folder hierarchy and world-readable files

* If the mount path is unknown (dynamically mounted volumes), but the parent directory is constant, expose the parent folder: `-v /mnt/:/host/mnt:ro :` the Agent is able to access all volumes mounted in this folder's children

* Expose their whole host filesystem to the container: `-v /:/host/rootfs:ro` : this can be useful if mount points are unpredictable or rapidly changing. The Agent reports every partition mounted on the system, but might probably throw "permission denied" warning on some virtual mount points (shm, netns...)

If your Agent container runs with `--privileged`, it has full access to the `/dev` folder and its block devices. You can mount the desired block devices into the container so that they are reported by the Agent. To monitor `loop0`, one could add to `entrypoint.sh`:

```
mkdir -p /tmp/mnt/loop0 && mount /dev/loop0 /tmp/mnt/loop0
```

This automount logic isn't added to the standard entrypoint, as unforeseen edge cases might lead to issues and data loss, but this should be safe if tailored to the specifics of the system.

#### No disk metrics are sent at all

If you customized the docker image or mount a custom directory to `/etc/dd-agent/conf.d`, make sure the `disk.yaml.default` (or a customized `disk.yaml`) file is present, or the disk check is disabled.

#### Permission denied errors

This probably happens because the user exposed the host's whole root filesystem to the container, and the Agent stumbles upon shm or netns mount points, which one cannot get metrics from. You should get the user to only expose useful paths to the Agent's container, as the current disk check doesn't have path ignore settings.

### Docker_daemon check

#### No disk metrics are sent at all with collect_disk_stats enabled

The `collect_disk_stats` feature of docker_daemon only support devicemapper-backed docker storage. This is not the case in vanilla Docker or Kubernetes, but is the default configuration for ECS. If you use a different storage driver (aufs, overlayfs...), you should use the disk check or collect_container_size

#### collect_container_size is slow and hangs docker

This option enables container size computation through the docker ps system. It virtually runs df in every container and doesn't scale to large container count.
We run the size computation once every 5 runs to reduce system impact though

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

