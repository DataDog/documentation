---
title: Autodiscovery Container Identifier
kind: documentation
further_reading:
- link: "/agent/autodiscovery/integrations"
  tag: "Documentation"
  text: "Create and load an Autodiscovery Integration Template"
- link: "/agent/autodiscovery/management"
  tag: "Documentation"
  text: "Manage which Container to include in the Agent Autodiscovery"
---

Autodiscovery Container Identifiers or `ad_identifiers` allow you to apply an Autodiscovery configuration file template to a given container, either by [using the container short image](#short-image-container-identifiers) or with a [custom Autodiscovery container identifier](#custom-autodiscovery-container-identifiers).

**Note**: With the other types of configuration: Key-Value stores, Docker labels, or Kubernetes pod annotations, the matching between an integration configuration template and the corresponding container is based on the `<CONTAINER_IDENTIFIER>` included in the Key-Value stores, labels, or annotations configuration.

## Short image container identifiers

To apply the following Autodiscovery configuration template file to a given container, use the **container short image** name as `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`:

```
ad_identifier:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

For instance, the following Apache Autodiscovery configuration file template used by the Agent:

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

Matches **ANY** `httpd` container image on your host. Suppose you have one container running `library/httpd:latest` and another running `<WHATEVER>/httpd:v2`. The Agent would apply the above template to both containers since you have to provide short names for container images, e.g. `httpd`, NOT `library/httpd:latest`:

As a consequence, when using short image as Autodiscovery container identifiers, **the Agent cannot distinguish between identically named images from different sources or with different tags**.

## Custom Autodiscovery container identifiers

To apply different Autodiscovery Configuration file templates to different containers running the same image, use a custom value as `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` and apply it with the `com.datadoghq.ad.check.id` label to identify your container. Let's say you have the following configuration file:

```
ad_identifier:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

To **ONLY**  apply this Autodiscovery configuration file template to one of your container, add to it the following label:

```
com.datadoghq.ad.check.id: <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
```

The Agent then knows to apply the Autodiscovery configuration file to this specific container and not to another one.

**Note**: The `com.datadoghq.ad.check.id` label takes precedence over the image/name.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
