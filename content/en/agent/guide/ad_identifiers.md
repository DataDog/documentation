---
title: Autodiscovery Container Identifiers
kind: documentation
aliases:
 - /agent/autodiscovery/ad_identifiers
further_reading:
- link: "/agent/kubernetes/integrations/"
  tag: "Documentation"
  text: "Create and load an Autodiscovery Integration Template"
- link: "/agent/guide/autodiscovery-management/"
  tag: "Documentation"
  text: "Manage which Container to include in the Agent Autodiscovery"
---

Autodiscovery container identifiers, or `ad_identifiers`, allow you to apply an Autodiscovery configuration file template to a given container, either by using the [container short image](#short-image-container-identifiers) or with a [custom Autodiscovery container identifier](#custom-autodiscovery-container-identifiers).

**Note**: For other configuration types—key-value stores, Docker labels, or Kubernetes pod annotations—the matching between an integration configuration template and the corresponding container is based on the `<CONTAINER_IDENTIFIER>` included in the key-value stores, labels, or annotations configuration.

## Short image container identifiers

To apply the following Autodiscovery configuration template to a given container, use the **container short image** name as the `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`:

```text
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

For example, the following Apache Autodiscovery configuration template can be used by the Agent:

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

This matches **ANY** `httpd` container image on your host. Suppose you have one container running `library/httpd:latest` and another running `<WHATEVER>/httpd:v2`. The Agent applies the above template to both containers since you have to provide short names for container images, for example: `httpd`, NOT `library/httpd:latest`.

When using short image names as Autodiscovery container identifiers, **the Agent cannot distinguish between identically named images from different sources or with different tags**.

## Adding tags from standard labels

Even if Autodiscovery configuration is defined within a custom configuration file, the standard labels for tagging `env`, `service`, and `version` can be used in conjunction.

See [Unified Service Tagging][1] for more information on how to configure these labels on your containers.

### Multiple identifiers

Specify multiple image names by adding to the `ad_identifiers` list, for example:

```yaml
ad_identifiers:
  - httpd
  - my-custom-httpd-image
```

## Custom Autodiscovery container identifiers

To apply different Autodiscovery configuration templates to containers running the same image, use a custom value `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` and apply it with the `com.datadoghq.ad.check.id` label to identify your container. Using the following configuration file:

```text
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

Add the following label to apply this Autodiscovery configuration template to a specific container.

```text
com.datadoghq.ad.check.id: <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
```

**Note**: The `com.datadoghq.ad.check.id` label takes precedence over the image/name.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
