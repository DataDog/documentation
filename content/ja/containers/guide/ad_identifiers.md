---
aliases:
- /ja/agent/autodiscovery/ad_identifiers
- /ja/agent/guide/ad_identifiers
further_reading:
- link: /containers/kubernetes/integrations/
  tag: Documentation
  text: Configure integrations with Autodiscovery on Kubernetes
- link: /containers/docker/integrations/
  tag: Documentation
  text: Configure integrations with Autodiscovery on Docker
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: Agent オートディスカバリーに含めるコンテナの管理
title: オートディスカバリーコンテナ識別子
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

### 複数の識別子

`ad_identifiers` に次のように追加することで、複数のイメージ名を指定できます。

```yaml
ad_identifiers:
  - httpd
  - my-custom-httpd-image
```

This matches **any** container images on your host that match `httpd` **or** `my-custom-httpd-image`.

## カスタムなオートディスカバリーコンテナ識別子

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
   ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check.id: 'foo'
   ```

   Replace `<CONTAINER_IDENTIFIER>` with the container name within the pod.

   **Note**: Supported in Datadog Agent v6.25+ and v7.25. The `ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check.id` label takes precedence over the image name.
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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/containers/autodiscovery
[2]: /ja/glossary/#short-image