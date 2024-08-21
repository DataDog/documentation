---
app_id: jmeter
app_uuid: be62a333-998e-4fea-b0e4-dd4a45b859b4
assets:
  dashboards:
    JMeter Overview: assets/dashboards/JMeterOverview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: jmeter.responses_count
      metadata_path: metadata.csv
      prefix: jmeter.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10164
    source_type_name: JMeter
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- 테스팅
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/jmeter/README.md
display_on_public_website: true
draft: false
git_integration_title: jmeter
integration_id: jmeter
integration_title: JMeter
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: jmeter
public_title: JMeter
short_description: Apache JMeter용 Datadog 플러그인
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Log Collection
  - Category::Testing
  - 제공::통합
  configuration: README.md#Setup
  description: Apache JMeter용 Datadog 플러그인
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-jmeter-test-results-datadog/
  support: README.md#Support
  title: JMeter
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Datadog Apache JMeter용 백엔드 리스너는 테스트 결과를 Datadog 플랫폼으로 전송하는 데 사용되는 오픈 소스 JMeter 플러그인입니다. 지연 시간, 송수신 바이트 수 등과 같은 테스트( 메트릭)에 대한 실시간 보고를 제공합니다. 또한 로그 항목으로 전체 테스트 결과를 Datadog로 보낼 수도 있습니다.

## 설정

### 설치

Datadog 백엔드 리스너 플러그인은 수동으로 설치해야 합니다. 최신 릴리스 및 자세한 설치 방법은 [GitHub 리포지토리][1]를 참조하세요.

#### 수동 설치

1. [릴리스 페이지][2]에서 Datadog 플러그인 JAR 파일을 다운로드하세요.
2. JMeter 설치 내 `lib/ext` 디렉터리에 JAR을 둡니다.
3. JMeter를 시작합니다(또는 애플리케이션을 종료했다가 다시 실행).

#### JMeter 플러그인 관리자

1. 아직 설정하지 않은 경우 [JMeter 플러그인 관리자 JAR][3]을 다운로드하세요.
2. 다운로드가 완료되면 `.jar`을 JMeter 설치 내 `lib/ext` 디렉토리에 둡니다. 
3. JMeter를 시작합니다(또는 애플리케이션을 종료했다가 다시 실행). 
4. `Options > Plugins Manager > Available Plugins`로 이동합니다. 
5. "Datadog 백엔드 리스너"를 검색합니다.
6. Datadog 백엔드 리스너 플러그인 옆의 확인란을 클릭합니다.
7. "변경 사항 적용 및 JMeter 재시작"을 클릭합니다.

### 구성

Datadog로 메트릭 보고를 시작하려면

1. 메트릭 Datadog 으로 보내려는 스레드 그룹 또는 테스트 계획을 마우스 오른쪽 버튼으로 클릭합니다. 
2. `Add > Listener > Backend Listener`로 이동합니다.
3. `Backend Listener Implementation`을 수정하고 드롭다운에서 `org.datadog.jmeter.plugins.DatadogBackendClient`를 선택합니다. 
4. `apiKey` 변수를 [ Datadog API 키][4]로 설정합니다.
5. 테스트를 실행하고 Datadog에 메트릭이 표시되는지 확인합니다.

플러그인에는 다음과 같은 설정 옵션이 있습니다.

| 이름       | 필수 | 기본값 | 설명|
|------------|:--------:|---------------|------------|
|apiKey | true | NA | Datadog API 키입니다.|
|datadogUrl | false | https://API.datadoghq.com/API/ | Datadog 인스턴스가 EU에 있는 경우(예: https://API.datadoghq.eu/API/) 다른 엔드포인트를 설정할 수 있습니다.|
|logIntakeUrl | false | https://http-intake.logs.datadoghq.com/v1/input/ | 예를 들어 Datadog 인스턴스가 EU에 있는 경우 다른 엔드포인트((예: https://http-intake.logs.datadoghq.eu/v1/input/)를 설정할 수 있습니다.|
|metricsMaxBatchSize|false|200|메트릭은 `metricsMaxBatchSize` 크기 배치로 10초마다 제출됩니다.|
|logsBatchSize|false|500|로그가 배치 크기에 도달하면 `logsBatchSize`로 제출됩니다.|
|sendResultsAsLogs|false|false|기본적으로 메트릭만 Datadog에 보고됩니다. 개별 테스트 결과를 로그 이벤트로 보고하려면 이 필드를 `true`로 설정합니다 .|
|includeSubresults|false|false|예를 들어 개별 HTTP 요청이 리디렉션을 따라야 하는 경우의 하위 결과입니다. 기본적으로 하위 결과는 무시됩니다.|
|excludeLogsResponseCodeRegex|false|`""`| `sendResultsAsLogs`을 설정하면 기본적으로 모든 결과가 로그로 Datadog로 전송됩니다. 이 옵션을 사용하면 응답 코드가 지정된 정규식과 일치하는 결과를 제외할 수 있습니다. 예를 들어 이 옵션을 `[123][0-5][0-9]`로 설정하여 오류만 제출할 수 있습니다.|
|samplersRegex|false|.*|선택적 정규식을 사용하여 샘플러를 모니터링합니다.|
|customTags|false|`""`|쉼표로 구분된 태그 목록을 모든 메트릭 항목에 추가합니다. 

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "jmeter" >}}


### 서비스 점검

JMeter에는 서비스 점검이 포함되어 있지 않습니다.

### 이벤트

JMeter에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][6]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

  - [Datadog를 사용한 JMeter 테스트 결과 모니터링][7]

[1]: https://github.com/DataDog/jmeter-datadog-backend-listener
[2]: https://github.com/DataDog/jmeter-datadog-backend-listener/releases
[3]: https://jmeter-plugins.org/wiki/PluginsManager/
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://github.com/DataDog/integrations-core/blob/master/jmeter/metadata.csv
[6]: https://docs.datadoghq.com/ko/help/
[7]: https://www.datadoghq.com/blog/monitor-jmeter-test-results-datadog/