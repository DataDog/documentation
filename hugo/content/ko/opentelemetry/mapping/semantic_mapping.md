---
aliases:
- /ko/opentelemetry/guide/semantic_mapping/
- /ko/opentelemetry/schema_semantics/semantic_mapping/
further_reading:
- link: /opentelemetry/guide/metrics_mapping
  tag: 문서
  text: OpenTelemetry에서 Datadog으로의 메트릭 매핑
- link: /metrics/open_telemetry/otlp_metric_types
  tag: 문서
  text: OpenTelemetry 메트릭 유형
- link: https://github.com/DataDog/opentelemetry-mapping-go/blob/main/pkg/otlp/attributes/attributes.go
  tag: 소스 코드
  text: 이러한 매핑을 위한 구현 코드
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
    name: OpenTelemetry 규칙
  - id: datadog_convention
    name: Datadog 규칙
  - id: type
    name: 유형
title: OpenTelemetry 의미 체계 규칙 및 Datadog 규칙
---
OpenTelemetry는 다양한 데이터 유형의 이름을 지정하는 [의미 체계 규칙][1]을 사용합니다. 이 페이지는 OpenTelemetry 의미 체계 규칙과 Datadog 의미 체계 규칙 간의 매핑을 나열합니다.

{{< multifilter-search >}}

<sup>*</sup>지원이 중단된 `deployment.environment` 규칙을 대체합니다. Datadog Agent 7.58.0+, Datadog Exporter v0.110.0+ 또는 Datadog OTLP 수집이 필요합니다.

## 스팬 유형 매핑 {#span-type-mapping}

Datadog에는 `span.type` 속성으로 표시되는 '스팬 유형'에 대한 벤더별 규칙이 있습니다.

스팬에 포함된 속성을 기반으로 Datadog Agent 및 Datadog OpenTelemetry 구성 요소는 다른 Datadog 서비스와의 더 나은 호환성을 위해 적절한 스팬 유형을 추론하려고 시도합니다. [attributes][5] 또는 [transform][6] 프로세서를 사용하거나 OpenTelemetry SDK에서 적절한 구성 값을 설정하여 특정 스팬에 `span.type` 속성을 명시적으로 설정함으로써 이 로직을 재정의할 수도 있습니다.

### OpenTelemetry 스팬 속성을 Datadog 스팬 유형으로 매핑 {#map-opentelemetry-span-attribute-to-datadog-span-type}

다음 표는 스팬 유형 매핑 로직을 보여줍니다. 이 차트는 우선순위 순서대로 매핑을 나열합니다.  
| # | 스팬 속성 | Datadog span.type |
|---|----------------|-------------------|
| 1 | `span.type` | `span.type` 속성 값 |
| 2 | [스팬 종류 서버][7] | `web` |
| 3 | [스팬 종류 클라이언트][8] | 3a/b 참조 |
| 3a | 클라이언트 스팬 종류, `db.system` 속성을 찾을 수 없음 | `http` |
| 3b | 클라이언트 스팬 종류, `db.system` 속성 발견 | [OpenTelemetry 데이터베이스 시스템 유형을 Datadog 스팬 유형으로 매핑][10] 표 참조 |  
| 4 | 위 조건 중 충족되는 것이 없음 | `custom` |

### OpenTelemetry 데이터베이스 시스템 유형을 Datadog 스팬 유형으로 매핑 {#mapping-opentelemetry-database-system-type-to-datadog-span-type}

위 표에서 스팬이 '클라이언트' 종류이고 [`db.system` 속성][9]을 포함하는 경우, Datadog의 스팬 유형에 다음 매핑이 적용됩니다. 스팬에 `span.type` 속성을 설정하면 이 로직이 재정의됩니다.

| `db.system`                            | Datadog 스팬 유형 |
| -------------------------------------- | ----------------- |
| SQL 유형 DBMS(아래 나열됨)           | `sql`             |
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
| 기타 DB 유형                         | 아래 참조         |
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
| 위에 나열되지 않은 `db.system` 값 | `db`              |

## 메트릭 속성 매핑 {#metrics-attribute-mapping}

기본적으로 Datadog은 위의 의미 체계 규칙 표에 나열된 OpenTelemetry 리소스 속성만 Datadog 메트릭 태그로 매핑합니다.

OTLP 메트릭 페이로드의 모든 리소스 속성을 태그로 첨부하려면 `metrics::resource_attributes_as_tags` 설정을 활성화하세요.
이 설정을 활성화하면 위의 표에 표시된 매핑된 의미 체계 규칙 태그 외에도 모든 리소스 속성 `key:value` 쌍이 Datadog 태그로 추가됩니다.

**참고**: 이 옵션을 활성화하면 태그 카디널리티가 크게 증가할 수 있습니다. 어떤 태그가 추가되는지 검증하려면 [Metrics Explorer][12]에서 메트릭을 검사하세요.

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

이 옵션을 활성화하면 OpenTelemetry 리소스 속성과 Datadog 의미 체계 규칙이 모두 메트릭 태그에 추가됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/concepts/semantic-conventions/
[2]: /ko/getting_started/tagging/unified_service_tagging#opentelemetry
[3]: https://opentelemetry.io/docs/specs/semconv/resource/container/
[4]: https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.27.0
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/attributesprocessor
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor
[7]: https://opentelemetry.io/docs/concepts/signals/traces/#server
[8]: https://opentelemetry.io/docs/concepts/signals/traces/#client
[9]: https://opentelemetry.io/docs/specs/semconv/attributes-registry/db/#db-system
[10]: #mapping-opentelemetry-database-system-type-to-datadog-span-type
[11]: /ko/opentelemetry/schema_semantics/hostname#cloud-provider-specific-conventions
[12]: https://app.datadoghq.com/metric/explorer