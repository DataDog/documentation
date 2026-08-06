---
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: 설명서
  text: 로그 처리 파이프라인
title: 대상
---
## 개요 {#overview}

Observability Pipelines Worker를 사용하여 처리된 로그와 메트릭({{< tooltip glossary="미리 보기" case="title" >}})을 다양한 대상으로 전송할 수 있습니다. 대부분의 Observability Pipelines 대상은 이벤트를 배치 단위로 다운스트림 통합으로 전송합니다. 자세한 내용은 [Event batching](#event-batching)을 참조하세요. 일부 Observability Pipelines 대상에는 템플릿 구문을 지원하는 필드도 있으므로 특정 필드를 기준으로 해당 필드의 값을 설정할 수 있습니다. 자세한 내용은 [Template syntax](#template-syntax)를 참조하세요.

왼쪽 탐색 메뉴에서 대상을 선택하면 자세한 정보를 확인할 수 있습니다.

## 대상 {#destinations}

사용 가능한 대상은 다음과 같습니다.

{{< tabs >}}
{{% tab "로그" %}}

- [Amazon OpenSearch][1]
- [Amazon S3][22]
- [Amazon Security Lake][3]
- [Azure Storage][4]
- [CrowdStrike Next-Gen SIEM][6]
- [Databricks (Zerobus)][23]
- [Datadog Archives][2]
- [Datadog BYOC Logs][5]
- [Datadog Logs][7]
- [Elasticsearch][8]
- [Google Cloud Storage][10]
- [Google Pub/Sub][11]
- [Google SecOps][9]
- [HTTP 클라이언트][12]
- [Kafka][13]
- [Microsoft Sentinel][14]
- [New Relic][15]
- [OpenSearch][16]
- [SentinelOne][17]
- [Socket][18]
- [Splunk HTTP Event Collector (HEC)][19]
- [Sumo Logic Hosted Collector][20]
- [Syslog][21]

[1]: /ko/observability_pipelines/destinations/amazon_opensearch/
[2]: /ko/observability_pipelines/destinations/datadog_archives/
[3]: /ko/observability_pipelines/destinations/amazon_security_lake/
[4]: /ko/observability_pipelines/destinations/azure_storage/
[5]: /ko/observability_pipelines/destinations/datadog_byoc_logs/
[6]: /ko/observability_pipelines/destinations/crowdstrike_ng_siem/
[7]: /ko/observability_pipelines/destinations/datadog_logs/
[8]: /ko/observability_pipelines/destinations/elasticsearch/
[9]: /ko/observability_pipelines/destinations/google_secops/
[10]: /ko/observability_pipelines/destinations/google_cloud_storage/
[11]: /ko/observability_pipelines/destinations/google_pubsub/
[12]: /ko/observability_pipelines/destinations/http_client/
[13]: /ko/observability_pipelines/destinations/kafka/
[14]: /ko/observability_pipelines/destinations/microsoft_sentinel/
[15]: /ko/observability_pipelines/destinations/new_relic/
[16]: /ko/observability_pipelines/destinations/opensearch/
[17]: /ko/observability_pipelines/destinations/sentinelone/
[18]: /ko/observability_pipelines/destinations/socket/
[19]: /ko/observability_pipelines/destinations/splunk_hec/
[20]: /ko/observability_pipelines/destinations/sumo_logic_hosted_collector/
[21]: /ko/observability_pipelines/destinations/syslog/
[22]: /ko/observability_pipelines/destinations/amazon_s3/
[23]: /ko/observability_pipelines/destinations/databricks/

{{% /tab %}}

{{% tab "Metrics" %}}

- [Datadog Metrics][1]
- [Elasticsearch][2]
- [HTTP/S Client][3]

[1]: /ko/observability_pipelines/destinations/datadog_metrics/
[2]: /ko/observability_pipelines/destinations/elasticsearch/
[3]: /ko/observability_pipelines/destinations/http_client/

{{% /tab %}}
{{< /tabs >}}

## 템플릿 구문 {#template-syntax}

로그는 일반적으로 서비스, 환경 또는 기타 로그 속성과 같은 로그 데이터를 기준으로 별도의 인덱스에 저장됩니다. Observability Pipelines에서는 템플릿 구문을 사용하여 특정 로그 필드를 기준으로 로그를 서로 다른 인덱스로 라우팅할 수 있습니다.

Observability Pipelines Worker가 템플릿 구문으로 지정된 필드를 확인할 수 없는 경우 Worker는 해당 대상에 대해 미리 정의된 기본 동작을 수행합니다. 예를 들어 `{{application_id}}` for the Datadog Archives destination's **Prefix** field, but there isn't an `application_id` field in the log, the Worker creates a folder called `OP_UNRESOLVED_TEMPLATE_LOGS/`이며 해당 위치에 로그를 게시합니다.

다음 표에는 템플릿 구문을 지원하는 대상과 필드, 그리고 Worker가 해당 필드를 확인할 수 없을 때의 동작이 나와 있습니다.

| 대상       | 템플릿 구문을 지원하는 필드 | 필드를 확인할 수 없는 경우의 동작                                                                                 |
|-------------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| Amazon Opensearch | Index                               | Worker는 로그를 `datadog-op` 인덱스에 기록합니다.                                                                          |
| Datadog Archives  | Prefix                              | Worker는 `OP_UNRESOLVED_TEMPLATE_LOGS/`이라는 폴더를 생성하고 해당 위치에 로그를 기록합니다.                                |
| Azure Blob        | Prefix                              | Worker는 `OP_UNRESOLVED_TEMPLATE_LOGS/`이라는 폴더를 생성하고 해당 위치에 로그를 기록합니다.                                |
| Elasticsearch     | Index                               | Worker는 로그를 `datadog-op` 인덱스에 기록합니다.                                                                          |
| Google Chronicle  | Log type                            | 기본값으로 `DATADOG` 로그 유형을 사용합니다.                                                                                            |
| Google Cloud      | Prefix                              | Worker는 `OP_UNRESOLVED_TEMPLATE_LOGS/`이라는 폴더를 생성하고 해당 위치에 로그를 기록합니다.                                |
| Opensearch        | Index                               | Worker는 로그를 `datadog-op` 인덱스에 기록합니다.                                                                          |
| Splunk HEC        | Index<br>Source type                | Worker는 Splunk에 구성된 기본 인덱스로 로그를 전송합니다.<br>Worker는 기본적으로 `httpevent` 소스 유형을 사용합니다. |

#### 예시{#example}

로그의 애플리케이션 ID 필드(예: `application_id`)를 기준으로 Datadog Archives 대상으로 로그를 라우팅하려면 **Prefix to apply to all object keys** 필드에서 이벤트 필드 구문을 사용합니다.

{{< img src="observability_pipelines/amazon_s3_prefix_20250709.png" alt="이벤트 필드 구문 /application_id={{ application_id }}/를 사용하는 Prefix 필드를 보여주는 Datadog Archives 대상" style="width:40%;" >}}

### 구문 {#syntax}

#### 이벤트 필드 {#event-fields}

개별 로그 이벤트 필드에 접근하려면 `{{ <field_name> }}`를 사용합니다. 예를 들면 다음과 같습니다.

```
{{ application_id }}
```

#### strftime 지정자 {#strftime-specifiers}

날짜 및 시간에는 [strftime 지정자][3]를 사용합니다. 예를 들면 다음과 같습니다.

```
year=%Y/month=%m/day=%d
```

#### 이스케이프 문자 {#escape-characters}

문자를 이스케이프하려면 해당 문자 앞에 `\`를 붙입니다. 다음 예에서는 이벤트 필드 구문을 이스케이프합니다.

```
\{{ field_name }}
```

다음 예에서는 strftime 지정자를 이스케이프합니다.

```
year=\%Y/month=\%m/day=\%d/
```

## 이벤트 배치 처리 {#event-batching}

Observability Pipelines 대상은 이벤트를 배치 단위로 다운스트림 통합에 전송합니다. 다음 파라미터 중 하나를 만족하면 이벤트 배치가 플러시됩니다.

- 최대 이벤트 수
- 최대 바이트 수
- 시간 초과(초)

예를 들어 대상의 파라미터가 다음과 같다고 가정합니다.

- 최대 이벤트 수 = 2
- 최대 바이트 수 = 100,000
- 시간 초과(초) = 5

그리고 대상이 5초 동안 이벤트 1개를 수신하면 5초의 시간 초과에 도달했을 때 배치를 플러시합니다.

대상이 2초 안에 이벤트 3개를 수신하면 이벤트 2개로 구성된 첫 번째 배치를 플러시한 다음, 5초 후 나머지 이벤트로 두 번째 배치를 플러시합니다. 대상이 100,000바이트를 초과하는 이벤트 1개를 수신하면 해당 이벤트 1개를 포함한 배치를 플러시합니다.

{{% observability_pipelines/destination_batching %}}

[1]: /ko/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: https://docs.rs/chrono/0.4.19/chrono/format/strftime/index.html#specifiers