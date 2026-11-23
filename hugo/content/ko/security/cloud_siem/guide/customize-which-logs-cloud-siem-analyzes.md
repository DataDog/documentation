---
aliases:
- /ko/security_monitoring/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /ko/security_platform/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /ko/security_monitoring/guide/how-to-setup-security-filters-using-cloud-siem-api/
- /ko/cloud_siem/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /ko/security_platform/guide/how-to-setup-security-filters-using-cloud-siem-api/
- /ko/security_platform/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
- /ko/security/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /ko/security/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
description: 보안 필터 또는 로그 인덱스 필터를 구성하여 Cloud SIEM이 분석할 수집 로그를 사용자 지정합니다. 조직에 적용되는 Cloud
  SIEM 제품, UI 및 API 구성, 지원되는 필터 필드와 지원되지 않는 필터 필드에 대해 살펴보고 AWS, Azure, Google Cloud,
  ID 공급자 등에 대한 일반적인 패턴을 다룹니다.
further_reading:
- link: /security/detection_rules/
  tag: 설명서
  text: 탐지 규칙
- link: /security/cloud_siem/ingest_and_enrich/content_packs
  tag: 설명서
  text: 콘텐츠 팩
- link: /security/cloud_siem/guide/determine-cloud-siem-product/
  tag: 설명서
  text: 현재 조직에서 사용 중인 Cloud SIEM 제품 확인
title: Cloud SIEM이 분석할 로그 사용자 지정
---
## 개요 {#overview}

Cloud SIEM은 [탐지 규칙][1]을 사용하여 수집된 로그를 분석해 위협을 탐지합니다. 대부분의 조직은 [콘텐츠 팩][7]을 사용하여 Cloud SIEM이 분석할 로그를 관리합니다. 각 콘텐츠 팩에는 해당 로그 소스에 대해 사전 구축된 필터가 포함되어 있습니다. 더 세부적인 제어가 필요한 경우(예: 환경을 제외하거나 사용자 지정 로그 세트로 분석을 제한하려는 경우) 로그 필터링을 직접 구성하세요.

## 필터링 도구 및 구성 방법 {#filtering-tools-and-configuration-methods}

사용 가능한 필터링 도구 및 구성 방법은 Cloud SIEM 제품에 따라 다릅니다.

| Cloud SIEM 제품    | 필터링 도구                           | 구성 방법                                                                                                 |
|-----------------------|------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| Standalone            | 로그 인덱스 필터(보안 필터 아님) | [로그 구성 UI](#cloud-siem-standalone-filter-the-cloud-siem-index)                                            |
| Flex Logs 적용 애드온 | 보안 필터                         | [UI](#configure-security-filters-in-the-ui-add-on-with-flex-logs) 및 [API](#configure-security-filters-with-the-api) |
| 레거시                | 보안 필터                         | [API](#configure-security-filters-with-the-api)                                                                       |

12개월 보존 Standalone은 신규 Cloud SIEM 조직을 위한 기본 제품입니다. 조직에서 사용하는 Cloud SIEM 제품을 확실히 알 수 없는 경우 [조직에서 사용 중인 Cloud SIEM 제품 확인][2]을 참조하세요.

<div class="alert alert-info">보안 필터 및 로그 인덱스 필터는 Cloud SIEM에서 분석하는 로그만 제어합니다. Datadog Agent for Workload Protection(<code>source:runtime-security-agent</code>) 및 Cloud Security Misconfigurations(<code>source:compliance-agent</code>)에서 생성한 로그는 필터 구성과 관계없이 분석된 로그로 청구되지 않습니다.</div>

### Cloud SIEM Standalone: Cloud SIEM 인덱스 필터링 {#cloud-siem-standalone-filter-the-cloud-siem-index}

Cloud SIEM Standalone은 보안 필터를 사용하지 않습니다. Standalone 채택 조직은 Cloud SIEM 로그 인덱스에서 인덱스 필터를 구성하여 Cloud SIEM이 분석할 로그를 제어합니다.

인덱스 필터는 어떤 로그가 인덱스로 들어갈지 지정하는 쿼리입니다. 필터와 일치하지 않는 로그는 인덱싱되지 않으므로 Cloud SIEM에서 분석하지 않습니다. 쿼리 구문은 표준 Datadog 로그 검색 구문과 동일합니다.

전체 구성 지침은 로그 구성 설명서의 [인덱스 필터][3]를 참조하세요.

**이 가이드는 Cloud SIEM Standalone에는 적용되지 않습니다.**

## 보안 필터가 작동하는 방식{#how-security-filters-work}

보안 필터는 Cloud SIEM에서 어떤 수집 로그를 분석할지 지정합니다. Cloud SIEM은 활성화된 모든 보안 필터에 대해 모든 수집 로그를 평가합니다.

보안 필터는 **포괄적**임: 로그가 활성화된 보안 필터 중 하나 이상과 일치하고 해당 필터의 제외 규칙에 따라 제거되지 않으면 Datadog은 해당 로그를 분석합니다. 보안 필터는 다음과 같은 3부분으로 구성됩니다.

- 필터가 일치하는 로그를 선택하는 **쿼리**
- 각각 고유한 쿼리를 가진 **제외 필터** 0개 이상. 메인 쿼리와 일치하는 로그가 제외 쿼리와도 일치하면 분석에서 제외됩니다.
-  **상태**(활성 또는 비활성). 비활성 필터는 Cloud SIEM에서 무시되지만 나중에 사용할 수 있도록 저장된 상태로 유지됩니다.

Cloud SIEM은 보안 필터가 분석 대상으로 로그를 선택했는지 여부에 따라 모든 수집 로그에 `datadog.cloud_siem:true` 또는 `datadog.cloud_siem:false` 태그를 지정합니다. Logs Explorer에서 이 태그를 사용하여 특정 로그에 대한 보안 필터의 효과를 검증할 수 있습니다.

### 보안 필터 쿼리에 대한 제한 사항 {#limitations-on-security-filter-queries}

Datadog은 Cloud SIEM이 geoIP, 위협 인텔리전스 및 OCSF 관찰 가능 항목 보강을 적용하기 전에 보안 필터를 평가합니다. 보강 기능으로 채워지는 필드는 보안 필터에서 평가할 때 로그에 존재하지 않으므로 보안 필터 쿼리에서 이러한 필드를 안정적으로 참조할 수 없습니다. 이 제약 조건은 다음과 같은 2가지 방식으로 적용됩니다.

- **필터 평가 시점에 존재하지 않는 필드.** 이러한 필드는 보안 필터 이후에 실행되는 Cloud SIEM의 기본 제공 보강 기능을 통해서만 채워집니다. 이러한 필드 중 하나를 참조하는 보안 필터 쿼리는 일치하는 로그가 없습니다.
  - `network.ip.list`
  - `network.ip.attributes`
  - `network.client.is_private_network_ip`
  - `network.destination.is_private_network_ip`
  - `ocsf.observables`
  - `ocsf.type_uid`

  이러한 데이터 카테고리를 필터링하려면 `source`, `service`, `host`, 태그 및 구문 분석된 로그 속성과 같이 수집 시점에 존재하는 속성을 사용하여 쿼리를 다시 작성하세요.

- **가용성이 파이프라인 구성에 따라 달라지는 필드.** 이러한 필드는 로그 파이프라인 프로세서(보안 필터 적용 이전) 또는 Cloud SIEM의 기본 제공 보강 기능(보안 필터 적용 이후)이 채울 수 있습니다. 이러한 필드에 대한 보안 필터 쿼리가 작동하는지 여부는 해당 파이프라인 프로세서가 구성되었는지 여부에 따라 달라집니다.
  - `network.client.geoip`(및 `network.client.geoip.country.iso_code`와 같은 하위 속성)
  - `threat_intel.results`
  - `threat_intel.indicators_matched`

  이러한 필드를 보안 필터 쿼리에서 사용할 수 있게 만들려면 [로그 파이프라인][8]에서 해당 GeoIP 또는 위협 인텔리전스 보강 프로세서를 구성하세요. 프로세서가 설정되면 보안 필터가 실행되기 전에 필드가 채워집니다.

Cloud SIEM의 GeoIP 보강은 파이프라인 GeoIP 프로세서와 동일한 GeoIPFilter 및 IPinfo 데이터베이스를 사용하므로, 어떤 경로로 채워지든 GeoIP 데이터는 동일합니다. 위협 인텔리전스 해결 방법은 다릅니다. 파이프라인 위협 인텔리전스 보강 프로세서는 사용자의 위협 인텔리전스 소스를 활용하며(설정 지침은 [사용자 보유 위협 인텔리전스 활용][9] 참조), 이는 Cloud SIEM의 기본 제공 Datadog 관리형 위협 인텔리전스와는 다른 일치 항목을 생성합니다. Cloud SIEM의 기본 제공 위협 인텔리전스를 사용하는 경우 일치 단계를 보안 필터 이전으로 이동할 수 없습니다.

보강 전 평가는 보안 필터에만 적용됩니다. 탐지 규칙, 억제 규칙 및 신호 쿼리는 보강 후 로그에 대해 실행되며 계속해서 이러한 필드를 참조할 수 있습니다.

## UI에서 보안 필터 구성(Flex Logs 적용 애드온) {#configure-security-filters-in-the-ui-add-on-with-flex-logs}

**적용 대상:** Cloud SIEM Flex Logs 적용 애드온. Cloud SIEM Legacy 조직은 [API](#configure-security-filters-with-the-api)를 통해 보안 필터를 구성해야 합니다.

<div class="alert alert-info">대부분의 사용 사례에서 Cloud SIEM이 분석할 로그를 관리하는 가장 쉬운 방법은 <a href="/security/cloud_siem/ingest_and_enrich/content_packs">콘텐츠 팩</a>을 활성화하거나 비활성화하는 것입니다. 각 콘텐츠 팩은 자체 보안 필터를 관리하므로 콘텐츠 팩을 전환하면 해당 필터가 자동으로 추가되거나 제거됩니다. 아래에서 설명하는 보안 필터 UI는 콘텐츠 팩이 다루는 범위를 벗어난 세부 조정 및 사용자 지정 로그 제어를 위해 제공됩니다.</div>

{{< ui >}}Security Filters Configuration{{< /ui >}} 섹션에는 모든 보안 필터, 해당 쿼리, 제외 항목 및 현재 활성 상태인지 여부가 목록으로 표시됩니다. 섹션 하단의 {{< ui >}}Preview{{< /ui >}} 창은 활성화된 모든 필터가 적용된 후 Cloud SIEM 분석에 도달하는 로그를 스트리밍합니다. {{< ui >}}Preview{{< /ui >}} 창을 사용하여 필터 구성이 예상한 결과를 생성하는지 확인합니다.

{{< img src="security/cloud_siem/guide/siem_settings_page_security_filters.png" alt="이름, 필터, 활성 열이 있는 구성된 필터 목록과 일치하는 로그를 스트리밍하는 미리 보기 창이 표시된 Cloud SIEM 설정 페이지의 보안 필터 구성 섹션" style="width:100%;" >}}

### 보안 필터 생성 {#create-a-security-filter}

1. Datadog에서 {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > [**Settings**][4]로 이동합니다.
1. **Security Filters Configuration** 섹션으로 스크롤하고 클릭하여 확장합니다.
1. **Security Filters Configuration** 섹션에서 {{< ui >}}\+ New Security Filter{{< /ui >}}를 클릭합니다. {{< ui >}}New Security Filter{{< /ui >}} 창이 열립니다.
1. **New Security Filter** 창에서 다음 항목을 입력합니다.
   - **Name:** 짧은 설명적 이름입니다(예: `AWS CloudTrail`).
   - **Query:** Cloud SIEM이 분석할 로그를 선택하는 로그 쿼리입니다(예: `source:cloudtrail`).
   - **Exclusion filters**(선택 사항): 필터의 일치 항목에서 로그를 제외하는 하나 이상의 제외 쿼리입니다. 추가하려면 {{< ui >}}\+ New Exclusion Filter{{< /ui >}}를 클릭하고 제외 쿼리를 입력합니다.
   - **Filter status:** 저장 시 필터를 활성화하려면 {{< ui >}}Active{{< /ui >}}로 설정합니다.
1. **Preview** 창을 검토하여 필터가 예상한 로그와 일치하는지 확인합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

{{< img src="security/cloud_siem/guide/siem_settings_add_security-filter_empty.png" alt="Name 및 Query 필드가 비어 있고, 제외 필터가 없으며, Filter status가 Active로 설정되어 있고, Preview 창에 실시간 로그 수집 통계가 표시되는 New Security Filter 대화 상자" style="width:100%;" >}}

### 보안 필터 편집 또는 비활성화 {#edit-or-disable-a-security-filter}

1. **Security Filters Configuration** 섹션에서 필터 행에 있는 **Edit** {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} 아이콘을 클릭합니다.
2. **Edit Security Filter** 대화 상자에서 이름, 쿼리, 제외 항목 또는 필터 상태를 업데이트합니다.
3. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

필터를 삭제하지 않고 비활성화하려면 **Filter status**를 inactive로 설정합니다. 필터는 저장된 상태로 유지되므로 나중에 다시 활성화할 수 있습니다.

### 보안 필터 삭제{#delete-a-security-filter}

**Security Filters Configuration** 섹션에서 필터 행에 있는 **Delete** 아이콘을 {{< img src="icons/delete.png" inline="true" style="width:14px;">}} 클릭하여 삭제를 확인합니다.

내장 `all ingested logs` 필터는 삭제할 수 없지만 비활성화할 수는 있습니다.

## API로 보안 필터 구성{#configure-security-filters-with-the-api}

**적용 대상:** Cloud SIEM Flex Logs 적용 애드온 및 Cloud SIEM Legacy.

API로 작업할 때는 사용 중인 Cloud SIEM 버전을 알고 있어야 합니다. 버전은 보안 필터의 논리에 영향을 미치며, Cloud SIEM은 존재하는 필터의 논리를 기반으로 로그를 분석합니다.
- **Flex Logs 적용 애드온**의 경우 처음 온보딩할 때는 보안 필터가 없습니다. 활성화하는 각 콘텐츠 팩은 보안 필터를 추가하므로 Cloud SIEM이 해당 로그를 분석할 수 있습니다.
- **Legacy**는 다르게 작동합니다. 모든 로그를 분석할 수 있는 기본 필터가 함께 제공됩니다. 로그 볼륨을 줄이기 위해 기본 필터에 제외 필터를 추가하는 것이 좋습니다.

### Cloud SIEM API 사용을 위한 전제 조건{#prerequisites-for-the-cloud-siem-api}

- 관리자 사용자의 API 키 및 애플리케이션 키. 둘 다 [Datadog 계정 API 키 페이지][5]에서 확인할 수 있습니다. 이 섹션의 예시에 나오는 `<DATADOG_API_KEY>` 및 `<DATADOG_APP_KEY>`를 사용자의 API 키와 애플리케이션 키로 바꿉니다.
- `curl` : 예시를 실행하는 머신에 설치되어 있습니다. 다른 언어로 된 예시는 [보안 모니터링 API 설명서][6]를 참조하세요.

<div class="alert alert-info">여러 보안 필터 API 페이로드에는 <code>version</code> 속성이 포함되어 있습니다. <code>version</code> 은 선택 사항입니다. 생략하면 API가 필터의 최신 버전을 업데이트합니다. 요청이 특정 알려진 버전에 대해서만 성공하도록 하려는 경우(예: 동시 변경 사항을 덮어쓰지 않으려는 경우) <code>version</code> 을 포함합니다.</div>

### 사용자 지정 보안 필터 생성 {#create-a-custom-security-filter}

사용자 지정 보안 필터는 Cloud SIEM에 분석해야 할 로그를 알려줍니다. 이 예시 호출은 `source:cloudtrail`과 일치하는 필터를 생성하므로, Cloud SIEM은 AWS CloudTrail의 로그를 분석합니다.

```bash
curl -L -X POST 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "type": "security_filters",
        "attributes": {
            "is_enabled": true,
            "name": "cloudtrail",
            "exclusion_filters": [],
            "filtered_data_type": "logs",
            "query": "source:cloudtrail"
        }
    }
}'
```

응답 예시:

```json
{
    "data": {
        "attributes": {
            "is_enabled": true,
            "is_builtin": false,
            "name": "cloudtrail",
            "filtered_data_type": "logs",
            "exclusion_filters": [],
            "version": 1,
            "query": "source:cloudtrail"
        },
        "type": "security_filters",
        "id": "qa6-tzm-rp7"
    }
}
```

### 기존 보안 필터에 제외 항목 추가 {#add-an-exclusion-to-an-existing-security-filter}

제외 필터를 사용하여 기존 보안 필터를 세부 조정할 수 있습니다. 제외 필터는 기본 보안 필터 쿼리가 처리할 로그를 제거하는 데 유용합니다. 이 예시에서는 `env:staging` 태그가 지정된 로그를 제외합니다.

1. 기존 보안 필터를 GET하여 필터의 `id`를 찾습니다.
   ```bash
   curl -L -X GET 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
   --header 'Content-Type: application/json' \
   --header 'DD-API-KEY: <DATADOG_API_KEY>' \
   --header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>'
   ```

   Example response:

   ```json
   {
       "data": [
           {
               "attributes": {
                   "is_enabled": true,
                   "is_builtin": true,
                   "name": "all ingested logs",
                   "filtered_data_type": "logs",
                   "exclusion_filters": [],
                   "version": 1,
                   "query": "*"
               },
               "type": "security_filters",
               "id": "l6l-rmx-mqx"
           }
       ]
   }
   ```

   응답 예시에서 필터 `id`는 `l6l-rmx-mqx`입니다. 모든 조직에는 고유한 필터 ID가 있으므로 PATCH를 보내기 전에 항상 현재 `id`를 검색합니다.
2. 필터를 PATCH하여 제외 항목을 추가합니다. `<FILTER_ID>`를 목록 요청에서 반환된 `id`로 바꿉니다.
   ```bash
   curl -L -X PATCH 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/<FILTER_ID>' \
   --header 'Content-Type: application/json' \
   --header 'DD-API-KEY: <DATADOG_API_KEY>' \
   --header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
   --data-raw '{
       "data": {
           "attributes": {
                "exclusion_filters": [
                   {
                       "query": "env:staging",
                       "name": "exclude env:staging"
                   }
               ],
               "version": 1
           },
           "type": "security_filters"
       }
   }'
   ```

   Example response:

   ```json
   {
       "data": {
           "attributes": {
               "is_enabled": true,
               "is_builtin": true,
               "name": "all ingested logs",
               "filtered_data_type": "logs",
               "exclusion_filters": [
                   {
                       "query": "env:staging",
                       "name": "exclude env:staging"
                   }
               ],
               "version": 2,
               "query": "*"
           },
           "type": "security_filters",
           "id": "<FILTER_ID>"
       }
   }
   ```

### 보안 필터 비활성화 {#disable-a-security-filter}

보안 필터를 활성화 및 비활성화하여 관련 로그 분석 여부를 제어할 수 있습니다. `is_enabled` 속성을 `false`로 설정하여 필터를 비활성화하되 목록에는 계속 표시할 수 있습니다.

```bash
curl -L -X PATCH 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/<FILTER_ID>' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "attributes": {
            "is_enabled": false
        },
        "type": "security_filters"
    }
}'
```

응답 예시:

```json
{
    "data": {
        "attributes": {
            "is_enabled": false,
            "is_builtin": true,
            "name": "all ingested logs",
            "filtered_data_type": "logs",
            "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 3,
            "query": "*"
        },
        "type": "security_filters",
        "id": "l6l-rmx-mqx"
    }
}
```

### 보안 필터 삭제 {#delete-a-security-filter-1}

사용자 지정 보안 필터를 삭제하려면 필터 `id`를 사용하여 DELETE 요청을 보내세요.

```bash
curl -L -X DELETE 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/<FILTER_ID>' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>'
```

요청에 성공하면 `HTTP 204 No Content`가 반환됩니다.

## 보안 필터 문제 해결 {#troubleshoot-security-filters}

Cloud SIEM에서 분석할 것으로 예상한 로그에서 신호가 생성되지 않는 경우 다음 확인 사항을 순서대로 수행하세요.

1. **보안 필터가 분석할 로그를 선택했는지 확인합니다.** Logs Explorer에서 로그를 열고 `datadog.cloud_siem`의 값을 확인합니다.
   - 태그가 `false`이면 보안 필터가 해당 로그를 제외한 것입니다. 필터 세트를 검토하고 활성화된 필터 중 하나 이상이 로그와 일치하는지, 제외 항목에 의해 로그가 제거되지 않는지 확인합니다.
   - 태그가 `true`이면 로그가 분석 대상으로 선택되었으며 문제는 보안 필터 이후 단계에 있는 것입니다(예: 일치하는 탐지 규칙 없음).
2. **필터 쿼리가 지원되지 않는 필드를 참조하는지 확인합니다.** [보안 필터 쿼리에 대한 제한 사항](#limitations-on-security-filter-queries)을 참조하세요.
   - 필터 평가 시점에 존재하지 않는 필드에 대한 쿼리는 일치 항목을 반환하지 않습니다.
   - 파이프라인 구성에 따라 가용성이 달라지는 필드에 대한 쿼리는 해당 파이프라인 프로세서가 구성된 경우에만 일치 항목을 반환합니다.
3. **모든 보안 필터의 결합 효과를 검증합니다.**
   - UI에서 {{< ui >}}Security Filters Configuration{{< /ui >}} 섹션의 **Preview** 창을 확장하여 모든 활성화된 필터가 적용된 후 분석에 도달하는 로그를 스트리밍합니다.
   - API를 사용하여 `GET` 요청을 보내 모든 필터를 나열하고 결합된 `query` 및 `exclusion_filters` 페이로드를 검토합니다.

## 보안 필터 쿼리에 유용한 태그 및 속성 {#useful-tags-and-attributes-for-security-filter-queries}

특정 로그 카테고리로 분석을 제한하는 경우 중요한 보안 관련 사용자, 엔터티 또는 소스가 포함된 로그를 제외하지 않도록 주의하세요. 이 섹션의 표에는 사용할 수 있거나 조정할 수 있는 일반적인 쿼리가 나와 있습니다.

### 보안 필터 쿼리의 주요 사용자 및 엔터티 {#key-users-and-entities-for-security-filter-queries}

| 이름              | 쿼리                                           |
| ----------------- | ----------------------------------------------- |
| 모든 명명된 이벤트  | `@evt.name:*`                                   |
| 모든 클라이언트 IP    | `@network.client.ip:*`                          |
| 모든 대상 IP | `@network.destination.ip:*`                   |
| 모든 사용자         | `@usr.id:* OR @usr.name:* OR @usr.email:*`      |
| 모든 호스트         | `host:* OR instance-id:*`                       |

### 보안 필터 쿼리의 주요 보안 소스 {#key-security-sources-for-security-filter-queries}

| 이름                    | 쿼리                                            |
| ----------------------- | ------------------------------------------------ |
| AWS 보안 로그       | `source:(cloudtrail OR guardduty OR route53)`    |
| AWS 네트워크 로그        | `source:(vpc OR waf OR elb OR alb)`              |
| Google Cloud 로그       | `source:gcp*`                                    |
| Azure 로그              | `source:azure*`                                  |
| Kubernetes 감사 로그   | `source:kubernetes.audit`                        |
| ID 공급자 로그  | `source:(okta OR gsuite OR auth0)`               |
| CDN 로그                | `source:(cloudfront OR cloudflare OR fastly)`    |
| 웹 서버 로그         | `source:(nginx* OR apache OR iis)`               |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/default_rules/#cat-cloud-siem
[2]: /ko/security/cloud_siem/guide/determine-cloud-siem-product/
[3]: /ko/logs/log_configuration/indexes/#indexes-filters
[4]: https://app.datadoghq.com/security/configuration/siem/setup
[5]: /ko/account_management/api-app-keys/
[6]: /ko/api/latest/security-monitoring/#get-all-security-filters
[7]: /ko/security/cloud_siem/ingest_and_enrich/content_packs
[8]: /ko/logs/log_configuration/pipelines/
[9]: /ko/security/cloud_siem/ingest_and_enrich/threat_intelligence/