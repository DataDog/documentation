---
algolia:
  tags:
  - log usage
  - grok
  - grok parser
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
  - parsing
aliases:
- /ko/logs/guide/logs-monitors-on-volumes/
description: Datadog에서 로그를 효율적으로 관리하고 모니터링하기 위한 모범 사례입니다.
further_reading:
- link: https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/
  tag: 아키텍처 센터
  text: Datadog을 사용한 Log Management 인덱싱 전략 가이드
- link: /logs/log_configuration/processors
  tag: 문서
  text: 로그 처리 방법 알아보기
- link: /logs/log_configuration/parsing
  tag: 문서
  text: 구문 분석에 대해 배우기
- link: https://www.datadoghq.com/blog/log-management-policies/
  tag: 블로그
  text: 팀과 함께 Log Management 정책을 구현하는 방법
- link: https://www.datadoghq.com/blog/volkswagen-organizations/
  tag: 블로그
  text: 대규모 Datadog 조직 관리의 모범 사례
- link: https://www.youtube.com/watch?v=2OEzAE7c2c0&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=1&pp=iAQB
  tag: 비디오
  text: 'Datadog 팁 및 요령: Datadog 로그 제외 필터를 사용하여 로그 활용도 개선하기'
- link: https://learn.datadoghq.com/courses/debugging-log-pipelines
  tag: 학습 센터
  text: 로그 파이프라인 디버깅
title: Log Management 모범 사례
---
## 개요 {#overview}

Datadog Log Management는 로그를 수집, 처리, 보관, 탐색 및 모니터링하여 시스템 문제에 대한 가시성을 확보할 수 있도록 합니다. 그러나 로그에서 적절한 수준의 가시성을 확보하기 어려울 수 있으며 로그 처리량이 크게 달라져 예상치 못한 리소스 사용이 발생할 수 있습니다.

따라서 이 가이드에서는 거버넌스, 사용량 속성 및 예산 제어에 유연성을 제공하는 다양한 Log Management 모범 사례와 계정 구성을 안내합니다. 구체적으로는 다음과 같은 방법을 안내합니다.

- [로그 세분화를 위한 다중 인덱스 설정](#set-up-multiple-indexes-for-log-segmentation)
- [장기 보관을 위한 다중 아카이브 설정](#set-up-multiple-archives-for-long-term-storage)
- [사용자 지정 역할을 위한 RBAC 설정](#set-up-rbac-for-custom-roles)

이 가이드에서는 다음을 통해 로그 사용량을 모니터링하는 방법도 다룹니다.

- [예상치 못한 로그 트래픽 급증에 대한 경보 설정](#alert-on-unexpected-log-traffic-spikes)
- [볼륨이 지정된 임계값을 초과하는 인덱싱된 로그에 대한 경보 설정](#alert-when-an-indexed-log-volume-passes-a-specified-threshold)
- [어떤 인덱스가 활발하게 쿼리되는지 모니터링](#monitor-which-indexes-are-queried-actively)
- [대용량 로그에 대한 제외 필터 설정](#set-up-exclusion-filters-on-high-volume-logs)

로그가 환경을 벗어나기 전에 로그를 변환하거나 민감한 데이터를 수정하려면 [Observability Pipelines를 사용하여 로그 데이터를 집계, 처리 및 변환하는 방법][29]을 참조하세요.

## 로그 계정 구성 {#log-account-configuration}

### 로그 세분화를 위한 다중 인덱스 설정 {#set-up-multiple-indexes-for-log-segmentation}

서로 다른 보존 기간이나 일일 할당량, 사용량 모니터링 및 청구 등으로 로그를 세분화하려면 다중 인덱스를 설정하세요.

예를 들어, 7일 동안만 보관하면 되는 로그와 30일 동안 보관해야 하는 로그가 있는 경우, 다중 인덱스를 사용하여 두 보관 기간별로 로그를 분리할 수 있습니다.

다중 인덱스를 설정하려면 다음 단계를 따르세요.

1. [로그 인덱스][1]로 이동합니다.
2. {{< ui >}}New Index{{< /ui >}} 또는 {{< ui >}}Add a new index{{< /ui >}}를 클릭합니다.
3. 인덱스의 이름을 입력합니다.
4. 이 인덱스에 포함할 로그를 필터링하기 위한 검색 쿼리를 입력합니다.
5. 인덱스별로 하루 동안 저장할 수 있는 로그 수를 제한하는 일일 할당량을 설정합니다.
6. 이 로그를 보관할 기간을 설정합니다.
7. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

인덱스에 일일 할당량을 설정하면 새로운 로그 소스가 추가되거나 개발자가 의도치 않게 로깅 수준을 디버그 모드로 변경할 때 발생하는 청구 초과를 방지하는 데 도움이 됩니다. 지난 24시간 동안 일일 할당량의 일정 비율에 도달했을 때 경보를 설정하는 방법은 [일일 할당량에 도달한 인덱스에 대한 경보 설정](#alert-on-indexes-reaching-their-daily-quota)을 참조하세요.

### 장기 보관을 위한 스토리지 설정 {#set-up-storage-for-long-term-retention}

표준 인덱싱과 유사한 쿼리 속도를 유지하면서 로그를 장기간 보관하려면 [Flex Logs][30]를 구성하세요. 이 계층은 장기간 보관 기간이 필요하고 가끔 긴급하게 쿼리해야 하는 로그에 가장 적합합니다. Flex Logs는 스토리지 비용과 컴퓨팅 비용을 분리하므로 가시성을 희생하지 않고도 더 많은 로그를 더 오랫동안 비용 효율적으로 보관할 수 있습니다. 자주 쿼리해야 하는 로그는 표준 인덱스에 저장해야 합니다.

### 장기 보관을 위한 다중 아카이브 설정 {#set-up-multiple-archives-for-long-term-storage}

로그를 더 장기간 보관하려면 [로그 아카이브][2]를 설정하여 Amazon S3, Azure Storage 또는 Google Cloud Storage와 같은 스토리지 최적화 시스템으로 로그를 전송하세요. [Archive Search][32]를 사용하면 스토리지에서 이러한 로그를 실시간으로 직접 쿼리할 수 있습니다. 전체 플랫폼 기능에 액세스하거나 로그를 더 오래 보존해야 하는 경우 Archive Search의 **Search & Rehydration** 모드를 사용하세요. 다중 아카이브를 사용하면 규정 준수 이유로 로그를 세분화하고 비용을 관리할 수 있습니다.

#### 비용 관리를 위해 최대 스캔 크기 설정 {#set-up-max-scan-size-to-manage-costs}

한 번에 스캔할 수 있는 로그 볼륨에 제한을 설정하세요. 아카이브를 설정할 때 Archive Search 또는 리하이드레이션당 스캔할 수 있는 최대 로그 데이터 볼륨을 정의할 수 있습니다. 자세한 내용은 [최대 스캔 크기 정의][4]를 참조하세요.

### 사용자 지정 역할을 위한 RBAC 설정 {#set-up-rbac-for-custom-roles}

[기본 Datadog 역할][5]에는 Admin, Standard, Read-only의 3가지가 있습니다. 고유한 권한 세트를 가진 사용자 지정 역할을 생성할 수도 있습니다. 예를 들어, 의도치 않은 비용 급증을 방지하기 위해 사용자가 인덱스 보존 정책을 수정하지 못하도록 제한하는 역할을 생성할 수 있습니다. 마찬가지로, 잘 정의된 로그 구조 및 형식이 원치 않게 변경되는 것을 방지하기 위해 로그 구문 분석 구성을 수정할 수 있는 사용자를 제한할 수 있습니다.

사용자 지정 역할을 권한과 함께 설정하려면 다음을 수행합니다.

1. Admin 권한으로 [Datadog][6]에 로그인합니다.
2. [Organization Settings > Roles][7]로 이동합니다.
3. 사용자 지정 역할을 활성화하려면 왼쪽 상단의 톱니바퀴 아이콘을 클릭한 다음 {{< ui >}}Enable{{< /ui >}}을 클릭합니다.
4. 활성화되면 {{< ui >}}New Role{{< /ui >}}을 클릭합니다.
5. 새 역할의 이름을 입력합니다.
6. 역할에 대한 권한을 선택합니다. 이를 통해 로그 리하이드레이션 및 로그 기반 메트릭 생성과 같은 특정 작업에 대한 액세스를 제한할 수 있습니다. 자세한 내용은 [Log Management 권한][8]을 참조하세요.
7. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

예시 사용 사례에 대해 특정 권한을 가진 역할을 설정하고 할당하는 방법에 대한 단계별 가이드는 [로그에 대한 RBAC를 설정하는 방법][9]을 참조하세요.

## 로그 사용량 모니터링 {#monitor-log-usage}

다음 항목을 설정하여 로그 사용량을 모니터링할 수 있습니다.

- [예상치 못한 로그 트래픽 급증에 대한 경보 설정](#alert-on-unexpected-log-traffic-spikes)
- [볼륨이 지정된 임계값을 초과하는 인덱싱된 로그에 대한 경보 설정 ](#alert-when-an-indexed-log-volume-passes-a-specified-threshold)

### 예상치 못한 로그 트래픽 급증에 대한 경보 설정 {#alert-on-unexpected-log-traffic-spikes}

#### 로그 사용량 메트릭{#log-usage-metrics}

기본적으로 [로그 사용량 메트릭][10]을 사용하여 수집된 로그 수, 수집된 바이트 수, 인덱싱된 로그 수를 추적할 수 있습니다. 이러한 메트릭은 무료이며 15개월 동안 보관됩니다.

- `datadog.estimated_usage.logs.ingested_bytes`
- `datadog.estimated_usage.logs.ingested_events`

사용량 메트릭으로 이상 징후 모니터를 생성하는 단계는 [이상 징후 탐지 모니터][11]를 참조하세요.

**참고**: Datadog은 [메트릭 요약 페이지][12]에서 `datadog.estimated_usage.logs.ingested_bytes`의 단위를 `byte`로 설정할 것을 권장합니다.

{{< img src="logs/guide/logs_estimated_bytes_unit.png" alt="단위가 byte로 설정된 datadog.estimated_usage.logs.ingested_bytes 사이드 패널을 보여주는 메트릭 요약 페이지" style="width:70%;">}}

#### 이상 징후 탐지 모니터 {#anomaly-detection-monitors}

예상치 못한 로그 인덱싱 급증에 대해 경보를 받을 수 있도록 이상 징후 탐지 모니터를 생성하세요.

1. [Monitors > New Monitor][13]로 이동한 다음 {{< ui >}}Anomaly{{< /ui >}}를 선택합니다.
2. **Define the metric** 섹션에서 `datadog.estimated_usage.logs.ingested_events` 메트릭을 선택합니다.
3. **from** 필드에 `datadog_is_excluded:false` 태그를 추가하여 수집된 로그가 아닌 인덱싱된 로그를 모니터링합니다.
4. **sum by** 필드에 `service` 및 `datadog_index` 태그를 추가하여 특정 서비스가 급증하거나 인덱스에서 로그 전송을 중단할 경우 알림을 받도록 합니다.
5. 사용 사례에 맞게 경보 조건을 설정합니다. 예를 들어, 평가된 값이 예상 범위를 벗어날 경우 경보를 보내도록 모니터를 설정합니다.
6. 알림 제목과 실행 가능한 지침이 포함된 메시지를 추가합니다. 예를 들어, 다음은 상황별 링크가 포함된 알림입니다.
    ```text
    An unexpected amount of logs has been indexed in the index: {{datadog_index.name}}

    1. [Check Log patterns for this service](https://app.datadoghq.com/logs/patterns?from_ts=1582549794112&live=true&to_ts=1582550694112&query=service%3A{{service.name}})
    2. [노이즈 패턴에 대한 제외 필터 추가](https://app.datadoghq.com/logs/pipelines/indexes)
    ```
7. {{< ui >}}Create{{< /ui >}}을 클릭합니다.

### 볼륨이 지정된 임계값을 초과하는 인덱싱된 로그에 대한 경보 설정{#alert-when-an-indexed-log-volume-passes-a-specified-threshold}

인프라의 모든 범위(예: `service`, `availability-zone` 등)에서 인덱싱된 로그 볼륨이 예기치 않게 증가하는 경우 경보를 보내도록 모니터를 설정합니다.

1. [로그 탐색기][14]로 이동합니다.
2. 인덱스 이름(예: `index:main`)을 포함하는 [검색 쿼리][15]를 입력하여 모니터링하려는 로그 볼륨을 캡처합니다.
3. {{< ui >}}More...{{< /ui >}}를 클릭하고 {{< ui >}}Create monitor{{< /ui >}}를 선택합니다.
4. {{< ui >}}group by{{< /ui >}} 필드에 태그(예: `host, `서비스 등)를 추가합니다.
5. 사용 사례에 맞는 {{< ui >}}Alert threshold{{< /ui >}}를 입력합니다. 선택적으로 {{< ui >}}Warning threshold{{< /ui >}}를 입력합니다.
6. 알림 제목을 추가합니다. 예를 들어 다음과 같습니다.
    ```
    Unexpected spike on indexed logs for service {{service.name}}
    ```
6. Add a message, for example:
    ```
    이 서비스의 볼륨이 임계값을 초과했습니다. 추가 제외 필터를 정의하거나 샘플링 속도를 높여 볼륨을 줄이세요.
    ```
7. {{< ui >}}Create{{< /ui >}}을 클릭합니다.

#### 월초부터의 인덱싱된 로그 볼륨에 대한 경보 설정{#alert-on-indexed-logs-volume-since-the-beginning-of-the-month}

`datadog.estimated_usage.logs.ingested_events` 메트릭을 `datadog_is_excluded:false`로 필터링하여 인덱싱된 로그만 계산하고 [메트릭 모니터 누적 기간][28]을 사용하여 월초부터의 건수를 모니터링합니다.

{{< img src="logs/guide/monthly_usage_monitor.png" alt="월초부터 인덱싱된 로그 수에 대해 경보를 보내도록 모니터를 설정합니다." style="width:70%;">}}

#### 일일 할당량에 도달한 인덱스에 대한 경보 설정{#alert-on-indexes-reaching-their-daily-quota}

하루에 지정된 수 이상의 로그가 인덱싱되지 않도록 인덱스에 [일일 할당량을 설정][16]합니다. 인덱스에 일일 할당량이 있는 경우, Datadog은 지난 24시간 이내에 이 할당량의 80%에 도달했을 때 경보를 발송하도록 [해당 인덱스의 볼륨에 대해 알림을 보내는 모니터](#alert-when-an-indexed-log-volume-passes-a-specified-threshold)를 설정할 것을 권장합니다.

일일 할당량에 도달하면 이벤트가 생성됩니다. 이러한 이벤트에는 인덱스 이름이 포함된 `datadog_index` 태그가 있습니다. 따라서 이 이벤트가 생성되면 `datadog_index` 태그에 [패싯을 생성][17]하여 다중 경보 모니터를 설정하는 `group by` 단계에서 `datadog_index`를 사용할 수 있습니다.

인덱스의 일일 할당량에 도달했을 때 경보를 보내도록 모니터를 설정하려면 다음 단계를 따르세요.

1. [Monitors > New Monitor][13]로 이동한 다음 {{< ui >}}Event{{< /ui >}}를 클릭합니다.
2. **Define the search query** 섹션에 `source:datadog datadog_index:* "daily quota reached"`를 입력합니다. 인덱스 관련 이벤트만 선택되도록 `datadog_index:*`를 포함합니다.
3. **Count of** 필드에 인덱스별로 그룹화할 `datadog_index`를 추가합니다. 이렇게 하면 쿼리가 `Show Count of * by datadog_index (datadog_index)`로 표시되도록 업데이트됩니다.
4. **Evaluate the query over**에서 **current day**를 선택합니다. **Starting at**에서 인덱스가 재설정되는 시간을 선택합니다. 이렇게 하면 할당량이 재설정될 때까지 모니터가 경보 상태로 유지됩니다. 다음은 Datadog에서 정의했을 때 검색 쿼리가 어떻게 보이는지에 대한 예시입니다.
   {{< img src="logs/guide/daily_quota_notification_search_query.png" alt="Datadog 인덱스 할당량 도달 경보 검색 쿼리 구성" style="width:100%;">}}
5. **Set alert conditions** 섹션에서 `above or equal to`를 선택하고 **Alert threshold**에 `1`을 입력합니다.
6. {{< ui >}}Configure notifications and automations{{< /ui >}} 섹션에 알림 제목과 메시지를 추가합니다. 모니터가 `datadog_index(datadog_index)`로 그룹화되어 있으므로 {{< ui >}}Multi Alert{{< /ui >}} 버튼이 자동으로 선택됩니다.
7. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

**참고**: `datadog_index(datadog_index)` 태그는 이벤트가 이미 생성된 경우에만 사용할 수 있습니다.

다음은 Slack에서 알림이 어떻게 보이는지에 대한 예시입니다.

{{< img src="logs/guide/daily_quota_notification.png" alt="datadog_index:retention-7에 대한 일일 할당량 도달 Slack 알림" style="width:70%;">}}

### 추정 사용량 대시보드 검토{#review-the-estimated-usage-dashboard}

로그 수집을 시작하면 로그 사용량 메트릭을 요약하는 기본 [대시보드][18]가 계정에 자동으로 설치됩니다.

{{< img src="logs/guide/logslight.png" alt="인덱싱된 로그와 수집된 로그의 분석 내용을 다양한 위젯으로 보여주는 로그 추정 사용량 대시보드" style="width:70%;">}}

**참고**: 이 대시보드에 사용된 메트릭은 추정치이며 공식 청구 금액과 다를 수 있습니다.

이 대시보드를 찾으려면 {{< ui >}}Dashboards{{< /ui >}} > {{< ui >}}Dashboards List{{< /ui >}}로 이동하여 [Log Management - Estimated Usage][19]를 검색하세요.

### 어떤 인덱스가 활발하게 쿼리되는지 모니터링{#monitor-which-indexes-are-queried-actively}

쿼리 활동을 모니터링하면 인덱싱된 데이터의 가치를 평가하고 비용을 최적화하는 데 도움이 됩니다. 예를 들어, 거의 쿼리되지 않는 인덱스를 식별하여 보존 기간을 줄이거나 데이터를 Flex Logs 또는 아카이브로 이동할 수 있습니다.

어떤 인덱스가 활발하게 쿼리되는지 분석하려면 다음을 수행하세요.

1. [Audit Trail][31]로 이동합니다. 이 링크는 필요한 쿼리와 그룹화를 미리 채워줍니다.
2. 쿼리가 `@evt.name:"Log Management" @action:queried`로 설정되어 있는지 확인합니다.
3. {{< ui >}}Table{{< /ui >}} 시각화를 선택하여 선택한 시간 프레임 기간 동안 가장 많이 사용된 인덱스와 가장 적게 사용된 인덱스의 순위 목록을 확인합니다.
4. {{< ui >}}By{{< /ui >}} 섹션에서 로그를 `@asset.new_value.query.indexes`로 그룹화합니다.

### 대용량 로그에 대한 제외 필터를 설정{#set-up-exclusion-filters-on-high-volume-logs}

사용량 모니터가 경보를 보내면 제외 필터를 설정하고 샘플링 비율을 높여 볼륨을 줄일 수 있습니다. 설정 방법은 [제외 필터][20]를 참조하세요. [Log Patterns][21]를 사용하여 대용량 로그를 그룹화하고 식별할 수도 있습니다. 그런 다음 Log Patterns의 사이드 패널에서 {{< ui >}}Add Exclusion Filter{{< /ui >}}를 클릭하여 해당 로그의 인덱싱을 중지하는 필터를 추가합니다.

{{< img src="logs/guide/patterns_exclusion.png" alt="로그 탐색기 페이지. 패턴의 사이드 패널 세부 정보를 표시하며, 상단에 제외 필터 추가 버튼이 있음" style="width:80%;">}}

제외 필터를 사용하더라도 로그 기반 메트릭을 사용하여 모든 로그 데이터에 걸친 추세와 이상 징후를 시각화할 수 있습니다. 자세한 내용은 [수집된 로그에서 메트릭 생성][22]을 참조하세요.

### 개인 식별 정보(PII) 탐지를 위해 Sensitive Data Scanner 활성화 {#enable-sensitive-data-scanner-for-personally-identifiable-information-pii-detection}

데이터 유출을 방지하고 규정 미준수 위험을 줄이려면 Sensitive Data Scanner를 사용하여 민감한 데이터를 식별하고 태그를 지정한 다음, 필요에 따라 삭제하거나 해시 처리하세요. 예를 들어 로그, APM 스팬 및 RUM 이벤트에서 신용카드 번호, 은행 라우팅 번호 및 API 키를 스캔할 수 있습니다. 스캔할 데이터를 결정하기 위한 스캔 규칙 설정 방법은 [Sensitive Data Scanner][23]를 참조하세요.

**참고**: [Sensitive Data Scanner][24]는 별도로 청구되는 제품입니다.

### 사용자 활동을 확인하기 위해 Audit Trail을 활성화 {#enable-audit-trail-to-see-user-activities}

누가 인덱스의 보존 기간을 변경했는지 또는 누가 제외 필터를 수정했는지와 같은 사용자 활동을 확인하려면 Audit Trail을 활성화하여 이러한 이벤트를 확인하세요. 사용 가능한 플랫폼 및 제품별 이벤트 목록은 [Audit Trail 이벤트][25]를 참조하세요. Audit Trail을 활성화하고 구성하려면 [Audit Trail 문서][26]의 단계를 따르세요.

**참고**: [Audit Trail][27]은 별도로 청구되는 제품입니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /ko/logs/log_configuration/archives/
[4]: /ko/logs/log_configuration/archives/?tab=awss3#define-maximum-scan-size
[5]: /ko/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[6]: https://app.datadoghq.com/
[7]: https://app.datadoghq.com/organization-settings/roles
[8]: /ko/account_management/rbac/permissions/?tab=ui#log-management
[9]: /ko/logs/guide/logs-rbac/
[10]: /ko/logs/logs_to_metrics/#logs-usage-metrics
[11]: /ko/monitors/types/anomaly/
[12]: https://app.datadoghq.com/metric/summary?filter=datadog.estimated_usage.logs.ingested_bytes&metric=datadog.estimated_usage.logs.ingested_bytes
[13]: https://app.datadoghq.com/monitors/create
[14]: https://app.datadoghq.com/logs
[15]: /ko/logs/explorer/search/
[16]: /ko/logs/indexes/#set-daily-quota
[17]: /ko/events/explorer/facets
[18]: https://app.datadoghq.com/dash/integration/logs_estimated_usage
[19]: https://app.datadoghq.com/dashboard/lists?q=Log+Management+-+Estimated+Usage
[20]: /ko/logs/log_configuration/indexes/#exclusion-filters
[21]: /ko/logs/explorer/analytics/patterns
[22]: /ko/logs/log_configuration/logs_to_metrics/
[23]: /ko/security/sensitive_data_scanner/
[24]: https://www.datadoghq.com/pricing/?product=sensitive-data-scanner#sensitive-data-scanner
[25]: /ko/account_management/audit_trail/events/
[26]: /ko/account_management/audit_trail/
[27]: https://www.datadoghq.com/pricing/?product=audit-trail#audit-trail
[28]: /ko/monitors/configuration/?tab=thresholdalert#evaluation-window
[29]: /ko/observability_pipelines/
[30]: /ko/logs/log_configuration/flex_logs/
[31]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40action%3Aqueried&agg_m=count&agg_m_source=base&agg_q=%40asset.new_value.query.indexes&agg_q_source=base&agg_t=count&audit__diff=unified&cols=log_usr.id%2Clog_action%2Clog_evt.name&fromUser=true&messageDisplay=expanded-md&refresh_mode=sliding&stream_sort=desc&top_n=10&top_o=top&viz=query_table&x_missing=true&live=true
[32]: /ko/logs/explorer/archive_search/