---
description: 조회 데이터셋을 사용하여 로그에 컨텍스트를 추가하는 Enrichment Table 프로세서 사용 방법을 알아보세요.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/observability-pipelines-reference-tables-log-enrichment/
  tag: 블로그
  text: Reference Tables와 Observability Pipelines를 사용하여 로그에 동적으로 업데이트되는 컨텍스트 추가
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: 블로그
  text: Observability Pipelines를 사용하여 AI 앱의 OTel 데이터를 ClickHouse 및 Datadog으로 라우팅
- link: https://www.datadoghq.com/blog/observability-pipelines-servicenow-cmdb-enrichment
  tag: 블로그
  text: SIEM 또는 로깅 도구로 라우팅하기 전에 ServiceNow CMDB 컨텍스트로 로그 보강
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Enrichment Table 프로세서
---
{{< product-availability >}}

## 개요 {#overview}

로그에는 추가 컨텍스트가 필요한 IP 주소, 사용자 ID 또는 서비스 이름과 같은 정보가 포함될 수 있습니다. Enrichment Table 프로세서를 사용하면 Datadog [Reference Tables][1], 로컬 파일 또는 MaxMind GeoIP 표에 저장된 조회 데이터셋을 사용하여 로그에 컨텍스트를 추가할 수 있습니다. 프로세서는 지정된 키를 기반으로 로그를 일치시키고 조회 파일의 정보를 로그에 추가합니다. Reference Tables를 사용하는 경우, ServiceNow, Snowflake, S3 등에 직접 저장된 SaaS 기반 데이터셋에 연결하여 로그를 보강할 수 있습니다.

또한 Enrichment Table 프로세서를 조회 파일과 함께 사용하여 Datadog API 키, Splunk HEC 토큰 또는 HTTP 요청의 사용자 지정 헤더와 같은 시크릿에 매핑하여 로그를 필터링 및 라우팅할 수 있습니다. 자세한 내용은 [시크릿을 소스 속성으로 사용](#use-a-secret-as-a-source-attribute)을 참조하세요.

### 이 프로세서를 사용하는 경우 {#when-to-use-this-processor}

다음은 통합에서 로그를 보강하는 사용 사례입니다.

#### 클라우드 객체 스토리지 {#cloud-object-storage}

클라우드 객체 스토리지 서비스(Amazon S3, Azure Blob Storage, Google Cloud Storage)는 대규모 정형 및 비정형 참조 데이터를 위한 확장 가능한 스토리지 서비스입니다.

Enrichment Table 프로세서를 사용하여 위협 인텔리전스 피드, 허용 및 차단 목록, 자산 인벤토리, CSV로 저장된 규정 준수 매핑 또는 정기적으로 업데이트되는 기타 파일 형식과 같이 외부에서 관리되는 참조 데이터셋으로 로그를 보강하세요.

#### Databricks {#databricks}

Databricks는 머신러닝(ML), 고급 분석 및 빅 데이터 워크로드에 사용되는 클라우드 기반 데이터 레이크하우스입니다.

Enrichment Table 프로세서를 사용하여 다음을 수행할 수 있습니다.
- 사기 가능성 및 이상 탐지 결과와 같이 ML 모델에서 생성된 예측 또는 점수를 추가합니다.
- Databricks에 저장된 고객 프로필, 장치 정보 또는 보안 정보와 같은 데이터셋을 참조합니다.

Datadog의 Databricks 통합 문서에서 Databricks용 Reference Tables를 설정하는 방법에 대한 정보는 [Reference Tables 구성][6]을 참조하세요.

#### Salesforce {#salesforce}

Salesforce는 영업 기회, 계정, 연락처, 거래 및 계약을 추적하고 저장하는 데 사용되는 고객 관계 관리(CRM) 도구입니다.

Enrichment Table 프로세서를 사용하여 다음을 수행할 수 있습니다.
- 인시던트의 우선순위를 지정하기 위해 산업 유형, ARR, 소유자와 같은 고객 및 계정 정보를 운영 로그에 첨부합니다.
- 고객과 관련된 지연 시간 급증과 같은 운영 신호로 마케팅 또는 영업 중심 대시보드를 보강합니다.

Datadog의 Salesforce 통합 문서에서 Salesforce용 Reference Tables를 설정하는 방법에 대한 정보는 [Reference Tables 수집 활성화][2]를 참조하세요.

#### ServiceNow (CMDB) {#servicenow-cmdb}

ServiceNow는 인프라 자산, 애플리케이션 및 종속성을 추적하는 구성 관리 데이터베이스(CMDB)를 갖춘 IT 서비스 관리 플랫폼입니다.

Enrichment Table 프로세서를 사용하여 다음을 수행할 수 있습니다.
- 호스트를 소유한 팀과 해당 팀이 지원하는 사업부 등의 인프라 소유권 및 종속성 컨텍스트로 로그를 보강합니다.
- CMDB 레코드의 정보를 텔레메트리에 직접 추가합니다.

Datadog의 ServiceNow CMDB 문서에서 ServiceNow CMDB용 Reference Tables를 설정하는 방법에 대한 정보는 [Reference Tables][7]을 참조하세요.

#### Snowflake {#snowflake}

Snowflake는 정형 및 반정형 데이터를 중앙 집중화하는 클라우드 네이티브 데이터 웨어하우스/레이크입니다.

Enrichment Table 프로세서를 사용하여 다음을 수행할 수 있습니다.
- 로그에 고객 메타데이터(계정 등급, 리전, SLA)를 추가합니다.
- 보안 이벤트를 Snowflake에 저장된 사용자 또는 자산 속성과 결합합니다.

Datadog의 Snowflake 통합 문서에서 Snowflake용 Reference Tables를 설정하는 방법에 대한 정보는 [Reference Tables][3]을 참조하세요.

## 설정 {#setup}

Enrichment Table 프로세서를 설정하려면 다음 단계를 따르세요.

1. {{< ui >}}Add enrichment{{< /ui >}}를 클릭합니다.
1. {{< ui >}}filter query{{< /ui >}}를 정의합니다. 자세한 내용은 [로그 검색 구문][8]을 참조하세요.
   - 필터와 일치하는 로그만 프로세서를 통해 전송됩니다.
   - 모든 로그는 필터 쿼리와 일치하는지 여부에 관계없이 파이프라인의 다음 단계로 전송됩니다.
1. {{< ui >}}Set lookup mapping{{< /ui >}} 섹션에서 사용할 조회 데이터셋 유형을 선택합니다.
  {{< tabs >}}
  {{% tab "Reference Table" %}}

  1. 드롭다운 메뉴에서 Reference Table을 선택합니다. 자세한 내용은 [Reference Tables 사용](#using-reference-tables)을 참조하세요.
  1. {{< ui >}}Manage{{< /ui >}}를 클릭하여 Reference Tables 구성 페이지로 이동합니다.
  1. (필요시) 로그를 보강할 특정 열을 선택합니다.
      - 기본적으로 Observability Pipelines는 표의 모든 열을 사용하여 로그를 보강합니다. 표의 각 열은 로그에 속성으로 추가되며, 이때 속성 이름은 열 이름이고 속성 값은 열 값으로 설정됩니다.
      - Reference Table의 특정 열로 로그를 보강하려면 드롭다운 메뉴에서 해당 열의 속성을 선택하세요.
  1. Datadog 애플리케이션 키 식별자를 입력합니다. Observability Pipelines는 데이터를 보강할 때 Datadog의 프로그래밍 방식 API에 액세스하기 위해 [애플리케이션 키][1]를 사용합니다. 애플리케이션 키가 다음 조건을 충족하는지 확인하세요.
      - [서비스 계정][2]과 연결되어 있어야 합니다. 개인 Datadog 사용자 계정과 연결되어 있으면 안 됩니다.
      - [`reference_tables_read`][3] 범위로 제한되어야 합니다.
  1. 로그의 소스 속성을 입력합니다. 소스 속성 값은 Observability Pipelines가 Reference Table에서 찾고자 하는 값입니다. 자세한 내용은 [보강 예시](#enrichment-example)를 참조하세요.
  1. 대상 속성을 입력합니다. 대상 속성 값은 Reference Table에서 찾은 정보를 JSON 객체로 저장합니다. 자세한 내용은 [보강 파일 예시](#enrichment-file-example)를 참조하세요.
  1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

[1]: /ko/account_management/api-app-keys/#application-keys
[2]: /ko/account_management/org_settings/service_accounts#service-account-application-keys
[3]: /ko/account_management/rbac/permissions/#reference-tables

  {{% /tab %}}
  {{% tab "파일" %}}

  1. 파일 경로를 입력합니다.
      - **참고**: 모든 파일 경로는 구성 데이터 디렉터리 기준 상대 경로이며, 기본 경로는 `/var/lib/observability-pipelines-worker/config/`입니다. 파일은 `observability-pipelines-worker group` 및 `observability-pipelines-worker` 사용자가 소유하거나, 최소한 해당 그룹 또는 사용자가 읽기 권한이 있어야 합니다. 자세한 정보는 [고급 Worker 구성][1]을 참조하세요.
  1. 열 이름을 입력합니다. 보강 표의 열 이름은 소스 속성 값을 일치시키는 데 사용됩니다. 자세한 내용은 [보강 예시](#enrichment-example)를 참조하세요.
  1. (미리{{< tooltip glossary="보기" case="title" >}}) 시크릿을 소스 속성으로 사용하는 경우, {{< ui >}}Use Secret as source attribute{{< /ui >}}를 토글하여 활성화하세요.
      - 시크릿 유형({{< ui >}}Datadog API Key{{< /ui >}} 또는 {{< ui >}}Splunk HEC token{{< /ui >}})을 선택하세요.
      - 자세한 정보는 [시크릿을 소스 속성으로 사용하는 예시](#use-a-secret-as-a-source-attribute)를 참조하세요.
  1. 시크릿을 사용하지 않는 경우, 로그의 소스 속성을 입력합니다. 소스 속성 값은 로컬 파일의 열 이름과 일치시키는 키로 사용됩니다.
  1. 대상 속성을 입력합니다. 대상 속성 값은 파일에서 찾은 정보를 JSON 객체로 저장합니다.
  1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

[1]: /ko/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
  {{% /tab %}}
  {{% tab "GeoIP" %}}

  1. GeoIP의 경우, `<DD_OP_DATA_DIR>/config` 디렉터리를 기준으로 `.mmdb` 파일의 GeoIP 경로를 입력하세요.
      - **참고**: 모든 파일 경로는 구성 데이터 디렉터리 기준 상대 경로이며, 기본 경로는 `/var/lib/observability-pipelines-worker/config/`입니다. 파일은 `observability-pipelines-worker group` 및 `observability-pipelines-worker` 사용자가 소유하거나, 최소한 해당 그룹 또는 사용자가 읽기 권한이 있어야 합니다. 자세한 정보는 [고급 Worker 구성][1]을 참조하세요.
  1. 로그의 소스 속성을 입력합니다. 소스 속성 값은 Observability Pipelines가 Reference Table에서 찾고자 하는 값입니다. 자세한 내용은 [보강 파일 예시](#enrichment-file-example)를 참조하세요.
  1. 대상 속성을 입력합니다. 대상 속성 값은 Reference Table에서 찾은 정보를 JSON 객체로 저장합니다. 자세한 내용은 [보강 파일 예시](#enrichment-file-example)를 참조하세요.
  1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

[1]: /ko/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
  {{% /tab %}}
  {{< /tabs >}}

### 보강 예시 {#enrichment-example}

이 예시에서는 다음을 사용합니다.

- Enrichment Table 프로세서가 사용하는 Reference Table 또는 파일은 다음과 같습니다.
  | merch_id | merchant_name   | city      | state    |
  | -------- | --------------- | --------- | -------- |
  | 803      | Andy's Ottomans | Boise     | Idaho    |
  | 536      | Cindy's Couches | Boulder   | Colorado |
  | 235      | Debra's Benches | Las Vegas | Nevada   |
- `merchant_id`는 소스 속성으로, `merchant_info`는 대상 속성으로 사용됩니다.
프로세서가 소스 속성의 값을 찾는 데 사용하는 열 이름은 - `merch_id`로 설정됩니다. **참고**: 소스 속성 값이 열 이름과 일치하지 않아도 됩니다.

보강 프로세서가 `"merchant_id":"536"`를 포함한 로그를 수신하는 경우 다음과 같이 처리합니다.

- 프로세서는 Reference Table의 `merch_id` 열에서 값 `536`을 찾습니다.
- 값을 찾으면 Reference Table에서 가져온 행 전체의 정보를 JSON 객체로 `merchant_info` 속성에 추가합니다.

```
merchant_info {
    "merchant_name":"Cindy's Couches",
    "city":"Boulder",
    "state":"Colorado"
}
```

### 시크릿을 소스 속성으로 사용{#use-a-secret-as-a-source-attribute}

파일 조회 옵션의 경우, {{< ui >}}Use Secret as source attribute{{< /ui >}}를 활성화하여 로컬 CSV 파일의 Datadog API 키, Splunk HEC 토큰 또는 HTTP 요청의 사용자 지정 헤더와 같은 시크릿에 매핑할 수 있습니다. 시크릿은 로컬 파일의 열 이름과 일치시키는 키로 사용됩니다.

**참고**: Splunk HEC 토큰에 매핑하려면 [Splunk HEC 소스][9]를 사용하고 소스에서 {{< ui >}}Store HEC token{{< /ui >}}을 활성화하세요.

#### Splunk HEC 예시 {#splunk-hec-example}

예를 들어, Splunk HEC 토큰을 기반으로 로그를 필터링하고 라우팅하려는 경우 다음 단계를 따르세요.

1. Splunk HEC 소스에서 {{< ui >}}Store HEC token{{< /ui >}}을 활성화하여 이벤트 메타데이터에 토큰을 저장합니다.
1. Enrichment Table 프로세서의 파일 조회 옵션을 사용하여 이벤트 메타데이터에 저장된 HEC 토큰을 조회 키로 사용합니다. Worker는 해당 값을 기반으로 로그를 필터링하고 라우팅할 수 있도록 이벤트를 보강합니다.

Splunk HEC 토큰이 값에 매핑된 로컬 조회 CSV 파일의 예시는 다음과 같습니다.

| Splunk HEC 토큰(시크릿) | HEC 토큰 값 |
| ------------------------- | --------------- |
| `abcdef`                  | `hec_token_one` |
| `uvwxyz`                  | `hec_token_two` |

이 예시에서는 프로세서를 설정할 때 열 이름으로 `Splunk HEC token (secret)`을 입력하세요. `token_value`가 대상 속성 경로인 경우, 예시 로그에 다음 HEC 토큰 값이 추가됩니다.

```
{
  "message": "this is a test"
  "token_value": "hec_token_one"
}

```

`token_value: hec_token_one`을 기반으로 로그를 필터링하고 라우팅할 수 있습니다.

## 상태 메트릭 {#health-metrics}

### 프로세서 메트릭 {#processor-metrics}

Enrichment Table 프로세서에 대한 메트릭을 보려면 프로세서 메트릭에 `component_type=enrichment_table` 및 `component_id=<processor_id>` 태그를 추가하세요.

`pipelines.enrichment_rows_not_found_total`
: 표에 해당 행이 없는 처리된 로그 수입니다.

`pipelines.component_errors_total`
: 오류로 인해 보강할 수 없는 로그 수입니다. 이러한 오류는 `error_code=did_not_enrich_event` 태그와 함께 보고됩니다.
: `reason` 태그에는 다음 값이 포함될 수 있습니다.<br>- `target_exists`: 보강된 데이터를 저장할 대상 값이 이미 존재하며 객체가 아닙니다.<br>- `too_many_pending_lookups`: 버퍼 또는 조회 대기열이 가득 찼습니다.<br>- `lookup_failed`: 로그에서 조회 키를 찾을 수 없거나, 문자열 또는 정수가 아닙니다.

### 버퍼 메트릭(Reference Tables 사용 시) {#buffer-metrics-when-using-reference-tables}

Enrichment Table 프로세서의 버퍼는 Reference Table에서 보강할 때만 활성화됩니다.

Enrichment Table 프로세서의 버퍼 메트릭을 확인하려면 버퍼 메트릭에 다음 태그를 추가하세요.

- `component_type=enrichment_table`
- `component_id=<processor_id>`
- `buffer_id=enrichment_table_buffer`

`pipelines.buffer_events`
: **설명**: 프로세서 버퍼의 이벤트 수입니다.
: **메트릭 유형**: 게이지

`pipelines.buffer_size_bytes`
: **설명**: 프로세서 버퍼의 바이트 수입니다.
: **메트릭 유형**: 게이지

`pipelines.buffer_received_events_total`
: **설명**: 프로세서 버퍼가 수신한 이벤트 수입니다.
: **메트릭 유형**: 카운터

`pipelines.buffer_received_bytes_total`
: **설명**: 프로세서의 버퍼가 수신한 바이트 수입니다.
: **메트릭 유형**: 카운터

`pipelines.buffer_sent_events_total`
: **설명**: 프로세서의 버퍼가 다운스트림으로 전송한 이벤트 수입니다.
: **메트릭 유형**: 카운터

`pipelines.buffer_sent_bytes_total`
: **설명**: 프로세서의 버퍼가 다운스트림으로 전송한 바이트 수입니다.
: **메트릭 유형**: 카운터

### Reference Table 메트릭 {#reference-table-metrics}

Reference Table을 사용하는 Enrichment Table 프로세서에 대한 메트릭을 보려면 아래 메트릭에 `component_type:enrichment_table` 및 `component_id=<processor_id>` 태그를 추가하세요. `reference_table_id:<table_uuid>` 태그를 사용하여 동일한 Reference Table을 사용하는 모든 프로세서에서 집계할 수도 있습니다.

`pipelines.enrichment_rows_not_found_total`
: 표에서 해당 행이 없는 각 처리된 로그마다 카운터가 증가합니다. Worker 버전 2.14 이상에서 사용할 수 있습니다.

`pipelines.enrichment_cache_hits_total`
: 캐시 적중 횟수, 즉 버퍼링 없이 보강할 수 있었던 로그 수입니다.

`pipelines.enrichment_cache_misses_total`
: 캐시 미스 횟수, 즉 버퍼링이 필요하여 Reference Tables API로 요청을 전송해야 했던 로그 수입니다.

`pipelines.component_errors_total`
: 오류로 인해 보강할 수 없는 로그 수입니다. 이러한 오류는 `error_code=did_not_enrich_event` 태그와 함께 보고됩니다.
: `reason` 태그에는 다음 값이 포함될 수 있습니다. <br>- `target_exists`: 보강된 데이터를 저장할 대상 값이 이미 존재하며 객체가 아닙니다.<br>- `too_many_pending_lookups`: 버퍼 또는 조회 대기열이 가득 찼습니다.<br>- `lookup_failed`: 로그에서 조회 키를 찾을 수 없거나 문자열 또는 정수가 아닙니다.<br>- `reference_table_read_error`: Reference Table을 읽는 중 복구할 수 없는 오류가 발생했거나 연속으로 너무 많은 오류가 발생했습니다.


아래 메트릭은 동일한 Reference Table을 사용하는 모든 프로세서에 공통적으로 적용되며 `component_type:enrichment_table`, `component_id=reference_table_<table_uuid>` 및 `reference_table:<table_uuid>` 태그를 사용합니다.

`pipelines.reference_table_cached_rows`
: 이 게이지 메트릭은 로컬 캐시에 저장된 행 수를 보고합니다. `found:true` 태그는 표에 존재하는 행을 보고하고, `found:false` 태그는 표에 존재하지 않는 행을 보고합니다.

`pipelines.reference_table_queued_keys`
: 이 게이지 메트릭은 Reference Tables API에서 읽기를 대기하는 행 키 수를 보고합니다. 대기열의 최대 용량은 키 5,000개입니다. 로그가 이 제한을 초과하는 키를 삽입하려고 하면, 해당 로그는 보강 없이 즉시 다운스트림으로 전송됩니다.

`pipelines.reference_table_fetched_keys_total`
: Reference Tables API로 요청을 전송할 때마다 해당 요청에서 가져온 행 수만큼 카운터가 증가합니다.

## 프로세서 작동 방식 {#how-the-processor-works}

### Reference Tables 사용 {#using-reference-tables}

[Reference Tables][4]를 사용하면 고객 세부 정보, 자산 목록, 서비스 종속성 정보와 같은 정보를 Datadog에 저장할 수 있습니다. Enrichment Table 프로세서는 필요에 따라 Reference Table에서 행을 가져와 로컬에 캐싱합니다. 표 행은 캐시에 약 10분 동안 유지됩니다. 표에서 행을 찾지 못한 경우에는 30분 동안 유지됩니다. 이후에는 캐시에서 제거되거나 새로고침됩니다.

프로세서가 캐시에 대응하는 행이 없는 로그를 발견하면, 해당 행이 Reference Table에서 검색될 때까지 로그 데이터가 메모리에 버퍼링됩니다. 버퍼가 최대 용량(이벤트 20,000개)에 도달하면, 가장 오래된 버퍼링된 로그부터 보강 없이 다운스트림으로 전송하기 시작합니다. 프로세서는 업스트림 백프레셔를 가하지 않습니다.

Reference Table 읽기 요청은 매초 또는 조회 대기열에 키가 250개 추가될 때마다 전송됩니다.

Reference Table에 연결하는 동안 또는 일련의 요청 실패 후에 인증 오류가 발생하면, Datadog은 로그가 무기한 대기하는 것을 방지하기 위해 버퍼링된 로그를 보강 없이 다운스트림으로 플러시하며, 버퍼는 새로운 로그 수신을 중단합니다. 프로세서는 주기적으로 요청을 재시도하며 요청이 성공하면 자동으로 정상 작동을 재개합니다.

보강 없이 로그가 전송되는 오류가 발생하면 Worker 로그에서 해당 오류를 조회할 수 있습니다. 또한 [`pipelines.component_errors_total`](#processor-metrics) 메트릭을 증가시킵니다.

Datadog은 카디널리티가 높은(10분 시간 프레임 내에 10,000개 이상의 가능한 값이 있는) 로그 필드에는 이 프로세서를 사용하는 것을 권장하지 않습니다. Reference Tables API에는 속도 제한이 적용되며 Worker 요청이 거부될 수 있습니다. 프로세서를 실행하는 동안 Worker 로그에서 속도 제한 경고가 계속 표시되면 [Datadog 지원][5]에 문의하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/reference_tables/?tab=cloudstorage
[2]: /ko/integrations/salesforce/#optional-enable-ingestion-of-reference-tables
[3]: /ko/integrations/snowflake-web/#reference-tables
[4]: https://docs.datadoghq.com/ko/reference_tables/?tab=cloudstorage#reference-table-limits
[5]: /ko/help/
[6]: /ko/integrations/databricks/?tab=useaserviceprincipalforoauth#reference-table-configuration
[7]: /ko/integrations/guide/servicenow-cmdb-enrichment-setup/#reference-tables
[8]: /ko/observability_pipelines/search_syntax/logs/
[9]: /ko/observability_pipelines/sources/splunk_hec/?tab=secretsmanagement