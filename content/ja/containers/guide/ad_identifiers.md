---
title: Autodiscovery Container Identifiers
aliases:
 - /agent/autodiscovery/ad_identifiers
 - /agent/guide/ad_identifiers
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Create and load an Autodiscovery Integration Template
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Manage which Container to include in the Agent Autodiscovery
---

Autodiscovery container identifiers, or `ad_identifiers`, allow you to apply an Autodiscovery configuration file template to a given container, either by using the container image name, or by using a custom Autodiscovery container identifier.

Even if Autodiscovery configuration is defined within a custom configuration file, you can use the standard labels for tagging `env`, `service`, and `version`. See [Unified Service Tagging][1] for more information on how to configure these labels on your containers.

**Note**: Other configuration types, including key-value stores, Docker labels, or Kubernetes pod annotations, use a different method to match integration configuration templates to their corresponding containers. For those configuration types, the matching between an integration configuration template and the container is based on the `<CONTAINER_IDENTIFIER>` included in the key-value stores, labels, or annotations.

## Container image name

To apply the following Autodiscovery configuration template to a given container, use the container image short name as the `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`:

```yaml
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

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

### 複数の識別子

`ad_identifiers` に次のように追加することで、複数のイメージ名を指定できます。

```yaml
ad_identifiers:
  - httpd
  - my-custom-httpd-image
```

This matches **any** container images on your host that match `httpd` **or** `my-custom-httpd-image`.

## カスタムなオートディスカバリーコンテナ識別子

To apply different Autodiscovery configuration templates to containers running the same image, choose a custom value to supply as `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`. Then, apply a Docker label or Kubernetes annotation to your container that contains this custom value.

**Example**: The following Apache Autodiscovery configuration template designates a container image with the custom name `foo`:

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

Then, apply a Docker label or Kubernetes annotation to identify your container as `foo`:

{{< tabs >}}
{{% tab "Docker label" %}}

```yaml
LABEL com.datadoghq.ad.check.id="foo"
```

**Note**: The `com.datadoghq.ad.check.id` label takes precedence over the image name.

{{% /tab %}}
{{% tab "Kubernetes annotation" %}}

```text
ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check.id: <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
```

Replace `<CONTAINER_IDENTIFIER>` with the container name within the pod.

**Note**: Supported in Datadog Agent v6.25+ and v7.25. The `ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check.id` label takes precedence over the image name.
{{% /tab %}}
{{< /tabs >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
