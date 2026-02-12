---
app_id: fastly
app_uuid: baa14f81-c988-4262-9a9f-e268e9476689
assets:
  dashboards:
    fastly: assets/dashboards/fastly_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: fastly.requests
      metadata_path: metadata.csv
      prefix: fastly.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 57
    source_type_name: Fastly
  monitors:
    5XX errors are higher than usual: assets/monitors/rec_monitor_5xx_errors.json
    'Hit Ratio is low ': assets/monitors/rec_monitor_hit_ratio.json
    Sent bandwidth is abnormally high: assets/monitors/rec_monitor_bandwidth.json
    Web application firewall rule is triggered: assets/monitors/waf_rules.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- log collection
- metrics
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: fastly
integration_id: fastly
integration_title: Fastly
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: fastly
public_title: Fastly
short_description: 다른 Datadog 메트릭과 함께 주요 Fastly 메트릭을 확인하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::로그 수집
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: 다른 Datadog 메트릭과 함께 주요 Fastly 메트릭을 확인하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-fastly-performance-metrics/
  - resource_type: other
    url: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_fastly_account
  - resource_type: other
    url: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_fastly_service
  support: README.md#Troubleshooting
  title: Fastly
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
![캐시 적중률, 성공률, 기타 메트릭을 보여주는 Fastly 대시보드][1]

## 개요

Fastly를 Datadog에 연결하여 Fastly 주요 메트릭(캐시 커버리지, 헤더 크기 등)을 Datadog의 다른 메트릭과 함께 확인할 수 있습니다.

이 통합에는 즉시 사용 가능한 모니터와 대시보드가 ​​포함되어 있으며, 이를 통해 메트릭을 종합적으로 표시하고 Fastly 메트릭과 관련 로그 간에 비교하며 메트릭이 사용자 정의 임계값을 초과하거나 비정상적인 동작을 나타낼 때 알리는 모니터를 생성할 수 있습니다.

## 설정

### 설치

설치 단계가 필요하지 않습니다.

### 구성

#### 메트릭 수집

Fastly의 토큰 관리 페이지에서 읽기 전용 액세스 API 토큰을 생성하고 대시보드에서 서비스 ID를 받아 [Fastly 통합 타일][2]에 입력합니다.

<div class="alert alert-info">
ServiceID는 영숫자 코드입니다. 예: <code>5VqE6MOOy1QFJbgmCK41pY</code>(<a href="https://docs.fastly.com/api/auth">Fastly API 문서</a>의 예시).
</div>

하나의 계정에서 여러 서비스 ID를 사용하는 경우 각 줄에 API 토큰을 입력합니다.

계정 이름은 계정을 구성하는 방법이며 데이터 수집 프로세스의 일부로 사용되지 않습니다.

#### 로그 수집


{{< site-region region="us3" >}}

로그 수집은 이 사이트에서 지원되지 않습니다.

{{< /site-region >}}



{{< site-region region="us,us5,eu,gov" >}}

Fastly 로그를 Datadog에 전달하도록 Datadog 엔드포인트를 구성합니다. `Datadog` 또는 `Datadog (via Syslog)` 엔드포인트를 선택할 수 있습니다. Syslog를 통해 로그를 보다 안정적으로 전달하려면 `Datadog` 엔드포인트를 사용하는 것이 좋습니다.

##### 로깅 엔드포인트 선택

1. Fastly 웹 인터페이스에 로그인하고 **Configure link**를 클릭합니다.
2. **Service** 메뉴에서 적절한 서비스를 선택합니다.
3. **Configuration** 버튼을 클릭한 다음 **Clone active**를 선택하면 도메인 페이지가 나타납니다.
4. **Logging** 링크를 클릭하면 로깅 엔드포인트 페이지가 나타납니다. **Datadog** 또는 **Datadog (with Syslog)** 옵션에서 **Create Endpoint**를 클릭합니다.

##### Datadog 엔드포인트 설정(권장)

1. 엔드포인트에 이름을 지정합니다(예: `Datadog`).
2. 로그 형식을 설정합니다. 기본적으로 권장되는 [Datadog-Fastly 로그 형식][2]이 이미 제공되며 사용자에 맞게 변경할 수 있습니다.
3. Datadog 계정 지역과 일치하는 지역을 선택합니다: {{< region-param key="dd_site_name" code="true" >}}
4. [Datadog API 키][3]를 추가합니다.
5. 하단의 **Create** 버튼을 클릭합니다.
6. 새 설정을 적용하려면 오른쪽 상단의 **Activate**를 클릭합니다. 몇 분 후에 로그가 계정으로 유입되기 시작합니다.

##### Syslog 엔드포인트 설정

1. 엔드포인트에 이름을 지정합니다(예: `Datadog`).
2. 시작 시 [Datadog API 키][3]를 사용하여 권장 Datadog-Fastly 로그 형식을 포함하도록 로그 형식을 구성합니다. 예시는 Fastly 문서의 [JSON 로깅 형식 사용][2]을 참조하세요.

    ```text
    <DATADOG_API_KEY> <DATADOG_FASTLY_LOG_FORMAT>
    ```

   **참고**: 로그가 Datadog에 표시되려면 Datadog API 키가 Datadog-Fastly 로그 형식 앞에 있어야 합니다. 자세한 내용은 [로그에 유용한 변수][4]를 참조하세요.

3. **Syslog Address**를 {{< region-param key="web_integrations_endpoint" code="true" >}}로 설정합니다
4. **Port**를 {{< region-param key="web_integrations_port" code="true" >}}로 설정합니다.
5. **TLS**를 `yes`로 설정합니다.
6. **TLS Hostname**을 {{< region-param key="web_integrations_endpoint" code="true" >}}로 설정합니다.
7. 고급 옵션 섹션에서 **로그 줄 형식**을 `Blank`로 선택합니다.
8. 마지막으로 엔드포인트를 저장하고 서비스를 배포합니다. [Datadog Logs Explorer][5]에서 로그를 확인하세요.

[2]: https://docs.fastly.com/en/guides/log-streaming-datadog#using-the-json-logging-format
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.fastly.com/guides/streaming-logs/useful-variables-to-log
[5]: https://app.datadoghq.com/logs

{{< /site-region >}}


## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "fastly" >}}


### 이벤트

Fastly 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Fastly 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

## 추가 읽기

- [Datadog으로 Fastly 성능 모니터링][5]
- [Terraform을 사용하여 Fastly 계정 생성 및 관리][6]
- [Terraform을 사용하여 Fastly 서비스 생성 및 관리][7]

[1]: images/fastly_dashboard.png
[2]: https://app.datadoghq.com/account/settings#integrations/fastly
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/fastly/fastly_metadata.csv
[4]: https://docs.datadoghq.com/ko/help/
[5]: https://www.datadoghq.com/blog/monitor-fastly-performance-metrics/
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_fastly_account
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_fastly_service