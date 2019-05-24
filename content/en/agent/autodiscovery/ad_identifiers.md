---
title: Autodiscovery Container Identifier
kind: documentation
disable_toc: true
further_reading:
- link: "/agent/autodiscovery/integrations"
  tag: "Documentation"
  text: "Create and load an Autodiscovery Integration Template"
- link: "/agent/autodiscovery/management"
  tag: "Documentation"
  text: "Manage which Container to include in the Agent Autodiscovery"
---

Autodiscovery Container Identifiers or `ad_identifiers` are used when configuring the Agent Autodiscovery with files. The use case solved is to properly match the configuration file defined for an Autodiscovery Integration with a given container.

The general format of an Autodiscovery file configuration is:

```
ad_identifier:
  <INTEGRATION_AUTODISCOVEY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

With the other types of configuration: Key-Value, Docker labels, or Kubernetes pod annotations, the matching between an integration configuration and the corresponding container is based on the `<CONTAINER_IDENTIFIER>` included in the labels/annotations, but with file configuration there is a need of properly matching the configuration file with the corresponding container.

This can be achieved in two ways:

1. Use the **container short image** name as `<INTEGRATION_AUTODISCOVEY_IDENTIFIER>` in order to apply the configuration file to it.
2. Use a custom `<INTEGRATION_AUTODISCOVEY_IDENTIFIER>` and define the corresponding ID with the `com.datadoghq.ad.check.id:` label on your container.

For instance, the following Autodiscovery integration template configuration file used by the Agent:

```yaml
ad_identifiers:
  - httpd
init_config:
instances:
  - apache_status_url: http://%%host%%/server-status?auto
logs:
  source: apache
  service: webapp
```

Matches **Any** `httpd` image on your host/pod. Suppose you have one container running `library/httpd:latest` and another running `<WHATEVER>/httpd:v2`. Autodiscovery applies the above template to both containers since you have to provide short names for container images, e.g. `httpd`, NOT `library/httpd:latest`:

As a consequence **Autodiscovery cannot distinguish between identically named images from different sources or with different tags**.

If this is too limiting&mdash;if you need to apply different check configurations to different containers running the same image&mdash; use the second method by applying a `com.datadoghq.ad.check.id` label to identify your container. Let's say you have the following configuration file:

```
ad_identifier:
  <INTEGRATION_AUTODISCOVEY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

To **ONLY**  apply this Autodiscovery configuration file to your container, add to it the following label:

```
com.datadoghq.ad.check.id: <INTEGRATION_AUTODISCOVEY_IDENTIFIER>
```

The Agent then knows to apply the Autodiscovery configuration file to this specific container and not to another one.

**Note**: The `com.datadoghq.ad.check.id` label takes precedence over the image/name.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
