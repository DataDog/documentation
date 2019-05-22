---
title: Container Discovery Management
kind: documentation
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: "Collect your processes"
- link: "tracing"
  tag: "Documentation"
  text: "Collect your traces"
---


### Include or Exclude Containers

Containers can be included or excluded from Autodiscovery via environment variables:

* `DD_AC_INCLUDE`: Rules that whitelist of containers to always include
* `DD_AC_EXCLUDE`: Rules that blacklist of containers to exclude

Rules are Regexp applied to the `image` or the `name` of a container. If a container matches an exclude rule, it won't be included unless it first matches an include rule.

The lists are formatted as space-separated strings. For example, if you only want to monitor `ubuntu` or `debian` images, and exclude the rest, specify:

```
DD_AC_EXCLUDE = "image:.*"
DD_AC_INCLUDE = "image:ubuntu, image:debian"
```

Or to exclude a specific container name:

```
DD_AC_EXCLUDE = "name:dd-agent"
```

**Note**: the `docker.containers.running`, `.stopped`, `.running.total` and
`.stopped.total` metrics are not affected by these settings and always count all containers. This does not affect your per-container billing too.

#### Exclude default containers from DockerCloud

The following configuration instructs the Agent to ignore the containers from Docker Cloud. You can remove the ones you want to collect:

```
DD_AC_EXCLUDE = "image:dockercloud/network-daemon, image:dockercloud/cleanup, image:dockercloud/logrotate, image:dockercloud/events, image:dockercloud/ntpd"

DD_AC_INCLUDE = ""
```

Note: You can also use the regex to ignore them all `DD_AC_EXCLUDE = "image:dockercloud/*"`
