---
title: Autodiscovery Troubleshooting
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


When you're not sure if Autodiscovery is loading certain checks you've configured, use the Agent's `configcheck` init script command. For example, to confirm that your Redis template is being loaded from a Docker label annotation&mdash;not the default `redisdb.d/auto_conf.yaml` file:

```
# docker exec -it <agent_container_name> agent configcheck
.
..
...
=== Provider: Docker container labels ===

--- redisdb check ---
Instance 1:
host: 172.17.0.3
port: "6379"
tags:
- short_image:redis
- image_tag:latest
- docker_image:redis:latest
- image_name:redis
~
Auto-discovery IDs:
* docker://81e66fd4c948a502b4428417d8cf2ebc58caaff55a6e5879a41887057342aec2
```

**Note**: Use the `-v` option to see all templates that are loaded but couldn't be resolved:

```
# docker exec -it <agent_container_name> agent configcheck -v
.
..
...
=== Resolve warnings ===

redisdb
* No service found with this AD identifier: redis
* Can't resolve the template for redisdb at this moment.

=== Unresolved Configs ===

Auto-discovery IDs: redis
Template:
init_config:
instances:
- host: '%%host%%'
  port: '%%port%%'
```
