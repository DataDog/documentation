---
title: Autodiscovery Container Identifiers
description: Configure Autodiscovery templates to target specific containers using container identifiers and image names
aliases:
 - /agent/autodiscovery/ad_identifiers
 - /agent/guide/ad_identifiers
further_reading:
- link: "/containers/kubernetes/integrations/"
  tag: "Documentation"
  text: "Configure integrations with Autodiscovery on Kubernetes"
- link: "/containers/docker/integrations/"
  tag: "Documentation"
  text: "Configure integrations with Autodiscovery on Docker"
- link: "/agent/guide/autodiscovery-management/"
  tag: "Documentation"
  text: "Manage which Container to include in the Agent Autodiscovery"
---

This document explains how to apply an [Autodiscovery][1] configuration template to a specific container. The `ad_identifiers` parameter can match a container image name or a custom identifier.

## Container image name

To apply the following Autodiscovery configuration template to a given container, replace `<AUTODISCOVERY_IDENTIFIER>` with the [short][2] container image name:

```yaml
ad_identifiers:
  <AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

**Example**: The following Apache Autodiscovery configuration template applies to a container image named `httpd`:

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

This matches **any** `httpd` container image on your host. If you have one container running `foo/httpd:latest` and another running `bar/httpd:v2`, the Agent applies the above template to both containers.

When using short image names as Autodiscovery container identifiers, the Agent cannot distinguish between identically named images from different sources or with different tags.

### Multiple identifiers

Specify multiple image names by adding to the `ad_identifiers` list, for example:

```yaml
ad_identifiers:
  - httpd
  - my-custom-httpd-image
```

This matches **any** container images on your host that match `httpd` **or** `my-custom-httpd-image`.

## Custom Autodiscovery container identifiers

If you want to apply different configuration templates to containers running the same image, use custom container identifiers.

1. Supply a custom container identifier to your container using a Docker label or Kubernetes annotation.

   **Example**:
   Apply a Docker label or Kubernetes annotation to identify your container as `foo`:

   {{< tabs >}}
   {{% tab "Docker label" %}}

   ```yaml
   LABEL com.datadoghq.ad.check.id="foo"
   ```

   **Note**: The `com.datadoghq.ad.check.id` label takes precedence over the image name.

   {{% /tab %}}
   {{% tab "Kubernetes annotation" %}}

   ```text
   ad.datadoghq.com/<CONTAINER_NAME>.check.id: 'foo'
   ```

   Replace `<CONTAINER_NAME>` with the container name within the pod.

   **Note**: Supported in Datadog Agent v6.25+ and v7.25. The `ad.datadoghq.com/<CONTAINER_NAME>.check.id` label takes precedence over the image name.
   {{% /tab %}}
   {{< /tabs >}}

2. Reference this custom value in your Autodiscovery configuration template.

   **Example**:
   The following Apache Autodiscovery configuration template designates a container image with the custom name `foo`:

   ```yaml
   ad_identifiers:
     - foo
   init_config:
   instances:
     - apache_status_url: http://%%host%%/server-status?auto
   logs:
     source: apache
     service: webapp
   ```

## Advanced container identifiers

For use cases which require further granularity on Agent v7.73.0+, you can use the `cel_selector` check configuration option to target specific containers based on additional container attributes. These rules are based on the [Common Expression Language][3] syntax.

Note: To be a valid Autodiscovery configuration, the check configuration must either include an `ad_identifier` or `cel_selector` container rule with the `container.image.reference` parameter.

**Example**:
The following NGINX Autodiscovery configuration template designates a container image with the name `nginx` on two selected namespaces. Separately listed conditions are joined together through an **OR** operation.

```yaml
ad_identifiers:
  - nginx
cel_selector:
  containers:
    - container.pod.namespace == "target-ns-1"
    - container.pod.namespace == "target-ns-2"
```

| Attribute                    | Description                                                |
|------------------------------|------------------------------------------------------------|
| `container.name`             | The name of the container.                                 |
| `container.image.reference`  | The full reference of the container image (registry, repo, tag/digest).  |
| `container.pod.name`         | The name of the pod running the container.                 |
| `container.pod.namespace`    | The Kubernetes namespace of the pod.                       |
| `container.pod.annotations`  | The annotations applied to the pod (key-value map).        |

These attributes can be used with the [CEL syntax][4] to define rules to select specific containers for check scheduling. Below is a list of example rules that could be defined:

### Examples

To select the container running the image `nginx` with a specific pod annotation:

```yaml
ad_identifiers:
  - nginx
cel_selector:
  containers:
    - container.pod.annotations["monitoring"] == "true"
```

To select the container running the image `nginx` in namespaces without the substring `-dev`:

```yaml
ad_identifiers:
  - nginx
cel_selector:
  containers:
    - !container.pod.namespace.matches("-dev")
```

To select the container running the image `nginx` with the container name `nginx-server` only in the namespace `prod`:

```yaml
ad_identifiers:
  - nginx
cel_selector:
  containers:
    - container.name == "nginx-server" && container.pod.namespace == "prod"
```

To select the container running an image with the substring `nginx`:

```yaml
cel_selector:
  containers:
    - container.image.reference.matches("nginx")
```

To select containers using grouped logic (for example, a specific container name in either of two namespaces):

```yaml
ad_identifiers:
  - nginx
cel_selector:
  containers:
    - container.name == "my-app" && (container.pod.namespace == "production" || container.pod.namespace == "staging")
```

<div class="alert alert-danger">

Broad conditions can unintentionally target containers on your host. For example, using a containers `cel_selector` like `!container.image.reference.matches("nginx")` selects **every** container on the host except nginx, including system components and likely unrelated applications. This can lead to additional telemetry collection which can impact billing.

</div>

To globally exclude particular workloads from being collected regardless of the check integration, see the [Container Discovery Management][5] documentation.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/containers/autodiscovery
[2]: /glossary/#short-image
[3]: https://cel.dev/
[4]: https://github.com/google/cel-spec/blob/master/doc/langdef.md
[5]: /containers/guide/container-discovery-management
