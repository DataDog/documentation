---
algolia:
  tags:
  - unified service tags
  - unified
  - unified service
  - service tags
further_reading:
- link: /getting_started/tagging/using_tags
  tag: Documentation
  text: Learn how to use tags in the Datadog app
- link: /tracing/version_tracking
  tag: Documentation
  text: Use Version tags within Datadog APM to monitor deployments
- link: https://www.datadoghq.com/blog/autodiscovery-docker-monitoring/
  tag: Blog
  text: Learn more about Autodiscovery
kind: documentation
title: Unified Service Tagging
---

## Overview

Unified service tagging ties Datadog telemetry together by using three [reserved tags][1]: `env`, `service`, and `version`.

With these three tags, you can:

- Identify deployment impact with trace and container metrics filtered by version
- Navigate seamlessly across traces, metrics, and logs with consistent tags
- View service data based on environment or version in a unified fashion

{{< img src="tagging/unified_service_tagging/overview.mp4" alt="Unified Service Tagging" video=true >}}

**Notes**:

- The `version` tag is expected to change with each new application deployment. Two different versions of your application's code should have distinct `version` tags.
- The official service of a log defaults to the container short-image if no Autodiscovery logs configuration is present. To override the official service of a log, add Autodiscovery [Docker labels/pod annotations][2]. For example: `"com.datadoghq.ad.logs"='[{"service": "service-name"}]'`
- Host information is excluded for database and cache spans because the host associated with the span is not the database/cache host.

### Requirements

- Unified service tagging requires the setup of a [Datadog Agent][3] that is 6.19.x/7.19.x or higher.

- Unified service tagging requires a tracer version that supports new configurations of the [reserved tags][1]. More information can be found per language in the [setup instructions][4].


| Language         | Minimum Tracer Version |
|--------------|------------|
| .NET    |  1.17.0+       |
| C++    |  0.1.0+       |
| Go         |  1.24.0+       |
| Java   |  0.50.0+      |
| Node    |  0.20.3+       |
| PHP  |  0.47.0+      |
| Python  |  0.38.0+      |
| Ruby  |  0.34.0+      |

- Unified service tagging requires knowledge of configuring tags. If you are unsure of how to configure tags, read the [Getting Started with Tagging][1] and [Assigning Tags][5] documentation before proceeding to configuration.

## 構成

To start configuring unified service tagging, choose your environment:

- [Containerized](#containerized-environment)
- [Non-Containerized](#non-containerized-environment)

### Containerized environment

In containerized environments, `env`, `service`, and `version` are set through the service's environment variables or labels (for example, Kubernetes deployment and pod labels, Docker container labels). The Datadog Agent detects this tagging configuration and applies it to the data it collects from containers.

To setup unified service tagging in a containerized environment:

1. Enable [Autodiscovery][6]. This allows the Datadog Agent to automatically identify services running on a specific container and gathers data from those services to map environment variables to the `env`, `service,` and `version` tags.

2. If you are using [Docker][2], make sure the Agent can access your container's [Docker socket][7]. This allows the Agent detect the environment variables and map them to the standard tags.

3. Configure your environment that corresponds to your container orchestration service based on either full configuration or partial configuration as detailed below.

#### 構成

{{< tabs >}}
{{% tab "Kubernetes" %}}

If you deployed the Datadog Cluster Agent with [Admission Controller][1] enabled, the Admission Controller mutates the pod manifests and injects all required environment variables (based on configured mutation conditions). In that case, manual configuration of `DD_` environment variables in pod manifests is unnecessary. For more information, see the [Admission Controller documentation][1].

##### Full configuration

To get the full range of unified service tagging when using Kubernetes, add environment variables to both the deployment object level and the pod template spec level:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    tags.datadoghq.com/env: "<ENV>"
    tags.datadoghq.com/service: "<SERVICE>"
    tags.datadoghq.com/version: "<VERSION>"
...
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
  containers:
  -  ...
     env:
          - name: DD_ENV
            valueFrom:
              fieldRef:
                fieldPath: metadata.labels['tags.datadoghq.com/env']
          - name: DD_SERVICE
            valueFrom:
              fieldRef:
                fieldPath: metadata.labels['tags.datadoghq.com/service']
          - name: DD_VERSION
            valueFrom:
              fieldRef:
                fieldPath: metadata.labels['tags.datadoghq.com/version']
```

##### Partial configuration

###### Pod-level metrics

To configure pod-level metrics, add the following standard labels (`tags.datadoghq.com`) to the pod spec of a Deployment, StatefulSet, or Job:

```yaml
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
```
These labels cover pod-level Kubernetes CPU, memory, network, and disk metrics, and can be used for injecting `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` into your service's container through [Kubernetes's downward API][2].

If you have multiple containers per pod, you can specify standard labels by container:

```yaml
tags.datadoghq.com/<container-name>.env
tags.datadoghq.com/<container-name>.service
tags.datadoghq.com/<container-name>.version
```

###### State metrics

To configure [Kubernetes State Metrics][3]:

1. Set `join_standard_tags` to `true` in your configuration file. See this [example configuration file][4] for the setting location.

2. Add the same standard labels to the collection of labels for the parent resource, for example: `Deployment`.

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
  spec:
    template:
      metadata:
        labels:
          tags.datadoghq.com/env: "<ENV>"
          tags.datadoghq.com/service: "<SERVICE>"
          tags.datadoghq.com/version: "<VERSION>"
  ```

###### APM tracer and StatsD client

To configure [APM tracer][5] and [StatsD client][6] environment variables, use the [Kubernetes's downward API][2] in the format below:

```yaml
containers:
-  ...
    env:
        - name: DD_ENV
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['tags.datadoghq.com/env']
        - name: DD_SERVICE
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['tags.datadoghq.com/service']
        - name: DD_VERSION
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['tags.datadoghq.com/version']
```


[1]: /ja/agent/cluster_agent/admission_controller/
[2]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#capabilities-of-the-downward-api
[3]: /ja/agent/kubernetes/data_collected/#kube-state-metrics
[4]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/conf.yaml.example
[5]: /ja/tracing/send_traces/
[6]: /ja/integrations/statsd/
{{% /tab %}}

{{% tab "Docker" %}}
##### Full configuration

Set the `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` environment variables and corresponding Docker labels for your container to get the full range of unified service tagging.

The values for `service` and `version` can be provided in the Dockerfile:

```yaml
ENV DD_SERVICE <SERVICE>
ENV DD_VERSION <VERSION>

LABEL com.datadoghq.tags.service="<SERVICE>"
LABEL com.datadoghq.tags.version="<VERSION>"
```

Since `env` is likely determined at deploy time, you can inject the environment variable and label later:

```shell
docker run -e DD_ENV=<ENV> -l com.datadoghq.tags.env=<ENV> ...
```

You may also prefer to set everything at deploy time:

```shell
docker run -e DD_ENV="<ENV>" \
           -e DD_SERVICE="<SERVICE>" \
           -e DD_VERSION="<VERSION>" \
           -l com.datadoghq.tags.env="<ENV>" \
           -l com.datadoghq.tags.service="<SERVICE>" \
           -l com.datadoghq.tags.version="<VERSION>" \
           ...
```

##### Partial configuration

If your service has no need for the Datadog environment variables (for example, third party software like Redis, PostgreSQL, NGINX, and applications not traced by APM) you can just use the Docker labels:

```yaml
com.datadoghq.tags.env
com.datadoghq.tags.service
com.datadoghq.tags.version
```

As explained in the full configuration, these labels can be set in a Dockerfile or as arguments for launching the container.

{{% /tab %}}

{{% tab "ECS" %}}
##### Full configuration

Set the `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` environment variables and corresponding Docker labels in the runtime environment of each service's container to get the full range of unified service tagging. For instance, you can set all of this configuration in one place through your ECS task definition:

```
"environment": [
  {
    "name": "DD_ENV",
    "value": "<ENV>"
  },
  {
    "name": "DD_SERVICE",
    "value": "<SERVICE>"
  },
  {
    "name": "DD_VERSION",
    "value": "<VERSION>"
  }
],
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```

##### Partial configuration

If your service has no need for the Datadog environment variables (for example, third party software like Redis, PostgreSQL, NGINX, and applications not traced by APM) you can just use the Docker labels in your ECS task definition:

```
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```

{{% /tab %}}
{{< /tabs >}}

### Non-containerized environment

Depending on how you build and deploy your services' binaries or executables, you may have several options available for setting environment variables. Since you may run one or more services per host, Datadog recommends scoping these environment variables to a single process.

To form a single point of configuration for all telemetry emitted directly from your services' runtime for [traces][8], [logs][9], [RUM resources][10], [Synthetics tests][11], [StatsD metrics][12], or system metrics, either:

1. Export the environment variables in the command for your executable:

   ```
   DD_ENV=<env> DD_SERVICE=<service> DD_VERSION=<version> /bin/my-service
   ```

2. Or use [Chef][13], [Ansible][14], or another orchestration tool to populate a service's systemd or initd configuration file with the `DD` environment variables. When the service process starts, it has access to those variables.

   {{< tabs >}}
   {{% tab "Traces" %}}

   When configuring your traces for unified service tagging:

   1. Configure the [APM Tracer][1] with `DD_ENV` to keep the definition of `env` closer to the application that is generating the traces. This method allows the `env` tag to be sourced automatically from a tag in the span metadata.

   2. Configure spans with `DD_VERSION` to add version to all spans that fall under the service that belongs to the tracer (generally `DD_SERVICE`). This means that if your service creates spans with the name of an external service, those spans do not receive `version` as a tag.

      As long as version is present in spans, it is added to trace metrics generated from those spans. The version can be added manually in-code or automatically by the APM Tracer. When configured, these are used by the APM and [DogStatsD clients][2] to tag trace data and StatsD metrics with `env`, `service`, and `version`. If enabled, the APM tracer also injects the values of these variables into your logs.

      **Note**: There can only be **one service per span**. Trace metrics generally have a single service as well. However, if you have a different service defined in your hosts' tags, that configured service tag shows up on all trace metrics emitted from that host.

[1]: /ja/tracing/setup/
[2]: /ja/developers/dogstatsd/
   {{% /tab %}}

   {{% tab "Logs" %}}

   If you're using [connected logs and traces][1], enable automatic logs injection if supported for your APM Tracer. Then, the APM Tracer automatically injects `env`, `service`, and `version` into your logs, therefore eliminating manual configuration for those fields elsewhere.

[1]: /ja/tracing/other_telemetry/connect_logs_and_traces/
   {{% /tab %}}

{{% tab "RUM とセッションリプレイ" %}}

   If you're using [connected RUM and traces][1], specify the browser application in the `service` field, define the environment in the `env` field, and list the versions in the `version` field of your initialization file.

[RUM アプリケーションの作成][2]の際に、`env` と `service` の名前を確認します。


[1]: /ja/real_user_monitoring/platform/connect_rum_and_traces/
[2]: /ja/real_user_monitoring/browser/setup
   {{% /tab %}}

   {{% tab "Synthetics" %}}

   If you're using [connected Synthetic browser tests and traces][1], specify a URL to send headers to under the **APM Integration for Browser Tests** section of the [Integration Settings page][2].

ワイルドカードとして `*` を使用することができます。例えば、`https://*.datadoghq.com` のように指定します。

[1]: /ja/synthetics/apm/
[2]: https://app.datadoghq.com/synthetics/settings/integrations
   {{% /tab %}}

{{% tab "カスタムメトリクス" %}}

タグは、[カスタム StatsD メトリクス][1]の付加のみの方法で追加されます。たとえば、`env` に 2 つの異なる値がある場合、メトリクスは両方の環境でタグ付けされます。1 つのタグが同じ名前の別のタグをオーバーライドする順序はありません。

サービスが `DD_ENV`、`DD_SERVICE`、`DD_VERSION` にアクセスできる場合、DogStatsD クライアントは対応するタグをカスタムメトリクスに自動的に追加します。

**注**: .NET および PHP 用の Datadog DogStatsD クライアントは、この機能をサポートしていません。

[1]: /ja/metrics/
   {{% /tab %}}

{{% tab "システムメトリクス" %}}

インフラストラクチャーメトリクスには、`env` タグと `service` タグを追加することができます。コンテナ化されていないコンテキストでは、サービスメトリクスのタグ付けは Agent レベルで構成されます。

この構成はサービスのプロセスを起動するたびに変更されるわけではないので、`version` を追加することは推奨されません。

#### ホスト毎の単一サービス

Agent の[メインコンフィギュレーションファイル][1]に、以下のコンフィギュレーションを適用します。

```yaml
env: <ENV>
tags:
  - service:<SERVICE>
```

この設定により、Agent が送信するすべてのデータに対する `env` と `service` のタグ付けの一貫性が保証されます。

#### ホスト毎の複数のサービス

Agent の[メインコンフィギュレーションファイル][1]に、以下のコンフィギュレーションを適用します。

```yaml
env: <ENV>
```

CPU、メモリ、ディスク I/O のメトリクスに一意の `service` タグをプロセスレベルで取得するには、Agent の構成フォルダ (例えば、`process.d/conf.yaml` 下の `conf.d` フォルダ) で[プロセスチェック][2]を構成します。

```yaml
init_config:
instances:
    - name: web-app
      search_string: ["/bin/web-app"]
      exact_match: false
      service: web-app
    - name: nginx
      search_string: ["nginx"]
      exact_match: false
      service: nginx-web-app
```

**注**: Agent のメインコンフィギュレーションファイルで既に `service` タグをグローバルに設定している場合は、プロセスのメトリクスが 2 つのサービスにタグ付けされます。これによってメトリクスの解釈に相違が生じることがあるため、`service` タグはプロセスチェックのコンフィギュレーションのみで構成することをお勧めします。

[1]: /ja/agent/configuration/agent-configuration-files
[2]: /ja/integrations/process
    {{% /tab %}}
    {{< /tabs >}}

### サーバーレス環境

AWS Lambda 関数については、[タグを使った Lambda のテレメトリー接続方法][15]を参照してください。
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/
[2]: /ja/agent/docker/integrations/?tab=docker
[3]: /ja/getting_started/agent
[4]: /ja/tracing/setup
[5]: /ja/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments
[6]: /ja/getting_started/agent/autodiscovery
[7]: /ja/agent/docker/?tab=standard#optional-collection-agents
[8]: /ja/getting_started/tracing/
[9]: /ja/getting_started/logs/
[10]: /ja/real_user_monitoring/platform/connect_rum_and_traces/
[11]: /ja/getting_started/synthetics/
[12]: /ja/integrations/statsd/
[13]: https://www.chef.io/
[14]: https://www.ansible.com/
[15]: /ja/serverless/configuration/#connect-telemetry-using-tags