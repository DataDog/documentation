---
title: Container Discovery Management with host Agent
kind: documentation
further_reading:
- link: "/agent/kubernetes/integrations"
  tag: "Documentation"
  text: "Create and load an Autodiscovery Integration Template"
- link: "/agent/guide/ad_identifiers"
  tag: "Documentation"
  text: "Match a container with the corresponding Integration Template"
---

Datadog Agent auto-discovers all containers available by default. To restrict its discovery perimeter and limit data collection to a subset of containers only, include or exclude them through a dedicated configuration.

**Note**: The `docker.containers.running`, `.stopped`, `.running.total`, and `.stopped.total` metrics are not affected by these settings and always count all containers. This does not affect your per-container billing.

If running the Agent as a binary on a host, configure your Autodiscovery perimeter with the instructions below, otherwise If running the Agent as a container, configure your Autodiscovery perimeter with the Containerized Agent instructions for Docker and Kubernetes.

## Exclude containers

Exclude containers from the Agent Autodiscovery perimeter with an exclude rule based on their `name` or `image` to collect **NO DATA** out of it. If a container matches an exclude rule, it won't be included unless it first matches an include rule.

**Note**: Exclude rules support regexes, and are defined as a list of comma-separated strings.

To remove a given Docker container with the image `<IMAGE_NAME>` from Autodiscovery, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
ac_exclude: [image:<IMAGE_NAME>]
```

To remove a given Docker container with the name `<NAME>` from Autodiscovery, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
ac_exclude: [name:<NAME>]
```


**Note**: If you are using Kubernetes, the container `<NAME>` is the one in your manifest `.spec.containers[0].name`.

## Include Containers

Include containers from the Agent Autodiscovery perimeter with an include rule based on their `name` or `image` to collect data **ONLY** from those containers. If a container matches an include rule, it's always included in the Autodiscovery perimeter.

**Note**: Include rules support regexes, and are defined as a list of comma-separated strings.

To include a given Docker container with the image `<IMAGE_NAME>` from Autodiscovery, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
ac_include: [image:<IMAGE_NAME>]
```

To include a given Docker container with the name `<NAME>` from Autodiscovery, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
ac_include: [name:<NAME>]
```


**Note**: If you are using Kubernetes, the container `<NAME>` is the one in your manifest `.spec.containers[0].name`.

### Pause containers

Datadog Agent excludes Kubernetes and OpenShift pause containers by default. They are still counted in the container count like excluded containers.

To disable this behavior and include pause containers in the Autodiscovery perimeter, set the parameter `exclude_pause_container` to `false` in the [Agent `datadog.yaml` configuration file][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
