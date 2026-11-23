---
aliases:
- /ja/opentelemetry/guide/semantic_mapping/
- /ja/opentelemetry/schema_semantics/semantic_mapping/
further_reading:
- link: /opentelemetry/guide/metrics_mapping
  tag: ドキュメント
  text: OpenTelemetry から Datadog へのメトリクスのマッピング
- link: /metrics/open_telemetry/otlp_metric_types
  tag: ドキュメント
  text: OpenTelemetry メトリクスの種類
- link: https://github.com/DataDog/opentelemetry-mapping-go/blob/main/pkg/otlp/attributes/attributes.go
  tag: ソースコード
  text: これらのマッピングの実装コード
multifiltersearch:
  data:
  - datadog_convention: '`env`'
    opentelemetry_convention: '`deployment.environment.name` <sup>*</sup>'
    type: Unified service tagging
  - datadog_convention: '`service`'
    opentelemetry_convention: '`service.name`'
    type: Unified service tagging
  - datadog_convention: '`version`'
    opentelemetry_convention: '`service.version`'
    type: Unified service tagging
  - datadog_convention: '`container_id`'
    opentelemetry_convention: '`container.id`'
    type: Containers
  - datadog_convention: '`container_name`'
    opentelemetry_convention: '`container.name`'
    type: Containers
  - datadog_convention: '`image_name`'
    opentelemetry_convention: '`container.image.name`'
    type: Containers
  - datadog_convention: '`image_tag`'
    opentelemetry_convention: '`container.image.tag`'
    type: Containers
  - datadog_convention: '`cloud_provider`'
    opentelemetry_convention: '`cloud.provider`'
    type: Cloud
  - datadog_convention: '`region`'
    opentelemetry_convention: '`cloud.region`'
    type: Cloud
  - datadog_convention: '`zone`'
    opentelemetry_convention: '`cloud.availability_zone`'
    type: Cloud
  - datadog_convention: '`task_family`'
    opentelemetry_convention: '`aws.ecs.task.family`'
    type: ECS
  - datadog_convention: '`task_arn`'
    opentelemetry_convention: '`aws.ecs.task.arn`'
    type: ECS
  - datadog_convention: '`ecs_cluster_name`'
    opentelemetry_convention: '`aws.ecs.cluster.arn`'
    type: ECS
  - datadog_convention: '`task_version`'
    opentelemetry_convention: '`aws.ecs.task.revision`'
    type: ECS
  - datadog_convention: '`ecs_container_name`'
    opentelemetry_convention: '`aws.ecs.container.arn`'
    type: ECS
  - datadog_convention: '`kube_container_name`'
    opentelemetry_convention: '`k8s.container.name`'
    type: Kubernetes
  - datadog_convention: '`kube_cluster_name`'
    opentelemetry_convention: '`k8s.cluster.name`'
    type: Kubernetes
  - datadog_convention: '`kube_deployment`'
    opentelemetry_convention: '`k8s.deployment.name`'
    type: Kubernetes
  - datadog_convention: '`kube_replica_set`'
    opentelemetry_convention: '`k8s.replicaset.name`'
    type: Kubernetes
  - datadog_convention: '`kube_stateful_set`'
    opentelemetry_convention: '`k8s.statefulset.name`'
    type: Kubernetes
  - datadog_convention: '`kube_daemon_set`'
    opentelemetry_convention: '`k8s.daemonset.name`'
    type: Kubernetes
  - datadog_convention: '`kube_job`'
    opentelemetry_convention: '`k8s.job.name`'
    type: Kubernetes
  - datadog_convention: '`kube_cronjob`'
    opentelemetry_convention: '`k8s.cronjob.name`'
    type: Kubernetes
  - datadog_convention: '`kube_namespace`'
    opentelemetry_convention: '`k8s.namespace.name`'
    type: Kubernetes
  - datadog_convention: '`pod_name`'
    opentelemetry_convention: '`k8s.pod.name`'
    type: Kubernetes
  - datadog_convention: '`kube_app_name`'
    opentelemetry_convention: '`app.kubernetes.io/name`'
    type: Kubernetes labels
  - datadog_convention: '`kube_app_instance`'
    opentelemetry_convention: '`app.kubernetes.io/instance`'
    type: Kubernetes labels
  - datadog_convention: '`kube_app_version`'
    opentelemetry_convention: '`app.kubernetes.io/version`'
    type: Kubernetes labels
  - datadog_convention: '`kube_app_component`'
    opentelemetry_convention: '`app.kubernetes.io/component`'
    type: Kubernetes labels
  - datadog_convention: '`kube_app_part_of`'
    opentelemetry_convention: '`app.kubernetes.io/part-of`'
    type: Kubernetes labels
  - datadog_convention: '`kube_app_managed_by`'
    opentelemetry_convention: '`app.kubernetes.io/managed-by`'
    type: Kubernetes labels
  - datadog_convention: '`http.client_ip`'
    opentelemetry_convention: '`client.address`'
    type: HTTP
  - datadog_convention: '`http.response.content_length`'
    opentelemetry_convention: '`http.response.body.size`'
    type: HTTP
  - datadog_convention: '`http.response.headers.<header-name>`'
    opentelemetry_convention: '`http.response.header.<header-name>`'
    type: HTTP
  - datadog_convention: '`http.status_code`'
    opentelemetry_convention: '`http.response.status_code`'
    type: HTTP
  - datadog_convention: '`http.request.content_length`'
    opentelemetry_convention: '`http.request.body.size`'
    type: HTTP
  - datadog_convention: '`http.referrer`'
    opentelemetry_convention: '`http.request.header.referrer`'
    type: HTTP
  - datadog_convention: '`http.request.headers.<header-name>`'
    opentelemetry_convention: '`http.request.header.<header-name>`'
    type: HTTP
  - datadog_convention: '`http.method`'
    opentelemetry_convention: '`http.request.method`'
    type: HTTP
  - datadog_convention: '`http.route`'
    opentelemetry_convention: '`http.route`'
    type: HTTP
  - datadog_convention: '`http.version`'
    opentelemetry_convention: '`network.protocol.version`'
    type: HTTP
  - datadog_convention: '`http.server_name`'
    opentelemetry_convention: '`server.address`'
    type: HTTP
  - datadog_convention: '`http.url`'
    opentelemetry_convention: '`url.full`'
    type: HTTP
  - datadog_convention: '`http.useragent`'
    opentelemetry_convention: '`user_agent.original`'
    type: HTTP
  headers:
  - id: opentelemetry_convention
    name: OpenTelemetry 規則
  - id: datadog_convention
    name: Datadog 規則
  - id: type
    name: タイプ
title: OpenTelemetry のセマンティック規則と Datadog の規則
---
OpenTelemetry は、さまざまな種類のデータの名前を指定するための [セマンティック規約][1]を使用します。このページでは、OpenTelemetry のセマンティック規約から Datadog のセマンティック規約へのマッピングを一覧表示しています。

{{< multifilter-search >}}

<sup>*</sup>非推奨の `deployment.environment` 規約を置き換えます。Datadog Agent 7.58.0 以降、Datadog Exporter v0.110.0 以降、または Datadog OTLP intake が必要です。

## スパンタイプのマッピング {#span-type-mapping}

Datadog には、`span.type` 属性で表される「スパンタイプ」というベンダー固有の規約があります。

スパンに含まれる属性に基づいて、Datadog Agent および Datadog OpenTelemetry コンポーネントは、他の Datadog サービスとの互換性を高めるために、適切なスパンタイプを推測しようとします。[attributes][5] プロセッサーや [transform][6] プロセッサーを使用したり、OpenTelemetry SDK で適切な設定値を指定したりすることで、任意のスパンに `span.type` 属性を明示的に設定し、このロジックを上書きすることもできます。

### OpenTelemetry スパン属性を Datadog スパンタイプにマッピングする {#map-opentelemetry-span-attribute-to-datadog-span-type}

次の表は、スパンタイプのマッピングロジックを示しています。この表は、優先順位に従ってマッピングを一覧表示しています。 
| # | スパン属性 | Datadog span.type |
|---|----------------|-------------------|
| 1 | `span.type` | `span.type`属性値 |
| 2 | [スパンの種類 server][7] | `web` |
| 3 | [スパンの種類 client][8] | 3a/b を参照 |
| 3a | [スパンの種類 client]、`db.system`属性が見つかりません | `http` |
| 3b | [スパンの種類 client]、`db.system`属性が見つかりました | [OpenTelemetry データベースシステムタイプから Datadog スパンタイプへのマッピング][10]の表を参照してください |  
| 4 | 上記の条件がいずれも満たされませんでした | `custom` |

### OpenTelemetry データベースシステムタイプから Datadog スパンタイプへのマッピング {#mapping-opentelemetry-database-system-type-to-datadog-span-type}

上記のテーブルにおいて、スパンが[スパンの種類 client]であり、[`db.system` 属性][9]を含む場合、Datadog のスパンタイプには以下のマッピングが適用されます。スパンに `span.type` 属性を設定すると、このロジックが上書きされます。

| `db.system`                            | Datadog span.type |
| -------------------------------------- | ----------------- |
| SQL タイプ DBMS (以下に記載)           | `sql`             |
| `adabas`                               | `sql`             |
| `cache`                                | `sql`             |
| `clickhouse`                           | `sql`             |
| `cloudscape`                           | `sql`             |
| `cockroachdb`                          | `sql`             |
| `coldfusion`                           | `sql`             |
| `db2`                                  | `sql`             |
| `derby`                                | `sql`             |
| `edb`                                  | `sql`             |
| `firebird`                             | `sql`             |
| `firstsql`                             | `sql`             |
| `filemaker`                            | `sql`             |
| `hanadb`                               | `sql`             |
| `h2`                                   | `sql`             |
| `hsqldb`                               | `sql`             |
| `informix`                             | `sql`             |
| `ingres`                               | `sql`             |
| `instantdb`                            | `sql`             |
| `interbase`                            | `sql`             |
| `mariadb`                              | `sql`             |
| `maxdb`                                | `sql`             |
| `mssql`                                | `sql`             |
| `mysql`                                | `sql`             |
| `netezza`                              | `sql`             |
| `oracle`                               | `sql`             |
| `other_sql`                            | `sql`             |
| `pervasive`                            | `sql`             |
| `pointbase`                            | `sql`             |
| `postgresql`                           | `sql`             |
| `progress`                             | `sql`             |
| `redshift`                             | `sql`             |
| `sqlite`                               | `sql`             |
| `sybase`                               | `sql`             |
| `teradata`                             | `sql`             |
| `vertica`                              | `sql`             |
| その他の DB タイプ                         | 以下を参照         |
| `cassandra`                            | `cassandra`       |
| `couchbase`                            | `db`              |
| `couchdb`                              | `db`              |
| `cosmosdb`                             | `db`              |
| `dynamodb`                             | `db`              |
| `elasticsearch`                        | `elasticsearch`   |
| `geode`                                | `db`              |
| `hive`                                 | `db`              |
| `memcached`                            | `memcached`       |
| `mongodb`                              | `mongodb`         |
| `opensearch`                           | `opensearch`      |
| `redis`                                | `redis`           |
| 上記に記載されていない `db.system` 値 | `db`              |

## メトリクス属性マッピング {#metrics-attribute-mapping}

デフォルトでは、Datadog は上記のセマンティック規約テーブルに記載されている OpenTelemetry リソース属性のみを Datadog メトリクスタグにマッピングします。

OTLP メトリックペイロードのすべてのリソース属性をタグとして付与するには、`metrics::resource_attributes_as_tags` 設定を有効にします。
この設定を有効にすると、上記のテーブルに示されているマッピングされたセマンティック規約タグに加えて、すべてのリソース属性 `key:value` ペアが Datadog タグとして追加されます。

**注**: このオプションを有効にすると、タグのカーディナリティが大幅に増加する可能性があります。追加されているタグを確認するには、[Metrics Explorer][12] でメトリクスを調査してください。

{{< tabs >}}
{{% tab "Datadog Exporter" %}}

```yaml
exporters:
    datadog:
        # Other configuration goes here...
        metrics:
            # Add all resource attributes as tags for metrics
            resource_attributes_as_tags: true
```

{{% /tab %}}

{{% tab "Datadog Agent" %}}

```yaml
otlp_config:
    # Other configuration goes here...
    metrics:
        # Add all resource attributes as tags for metrics
        resource_attributes_as_tags: true
```

{{% /tab %}}
{{< /tabs >}}

このオプションを有効にすると、OpenTelemetry リソース属性と Datadog セマンティック規約の両方がメトリクスタグに追加されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/concepts/semantic-conventions/
[2]: /ja/getting_started/tagging/unified_service_tagging#opentelemetry
[3]: https://opentelemetry.io/docs/specs/semconv/resource/container/
[4]: https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.27.0
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/attributesprocessor
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor
[7]: https://opentelemetry.io/docs/concepts/signals/traces/#server
[8]: https://opentelemetry.io/docs/concepts/signals/traces/#client
[9]: https://opentelemetry.io/docs/specs/semconv/attributes-registry/db/#db-system
[10]: #mapping-opentelemetry-database-system-type-to-datadog-span-type
[11]: /ja/opentelemetry/schema_semantics/hostname#cloud-provider-specific-conventions
[12]: https://app.datadoghq.com/metric/explorer