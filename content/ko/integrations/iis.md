---
app_id: iis
app_uuid: 4620121f-b5ca-4b9c-aca2-c69bf18bc362
assets:
  dashboards:
    IIS-Overview: assets/dashboards/iis_overview.json
    iis: assets/dashboards/iis_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: iis.uptime
      metadata_path: metadata.csv
      prefix: iis.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 46
    source_type_name: IIS
  monitors:
    404 errors is high: assets/monitors/err.json
    Locked errors is high: assets/monitors/lock.json
    Request number is high: assets/monitors/req.json
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    response_time_overview: assets/saved_views/response_time.json
    status_code_overview: assets/saved_views/status_code_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- 윈도우즈(Windows)
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/iis/README.md
display_on_public_website: true
draft: false
git_integration_title: iis
integration_id: iis
integration_title: IIS
integration_version: 5.2.0
is_public: true
manifest_version: 2.0.0
name: iis
public_title: IIS
short_description: 총 메트릭 또는 사이트별 메트릭을 추적하고 각 사이트의 업/다운 상태를 모니터링하기.
supported_os:
- 윈도우즈(Windows)
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Windows
  - Supported OS::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: 총 메트릭 또는 사이트별 메트릭을 추적하고 각 사이트의 업/다운 상태를 모니터링하기.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: IIS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![IIS Graph][1]

## 개요

사이트 전체나 사이트별로 집계된 IIS 메트릭을 수집하세요. IIS 에이전트 점검에서는 활성 연결, 송수신된 바이트, HTTP 메서드별 요청 개수 등의 메트릭을 수집합니다. 또 각 사이트의 서비스 점검을 전송해 사이트가 정상인지 아니면 다운되었는지 알려줍니다.

## 설정

### 설치

IIS 점검은 에이전트 패키지에 포함되어 있습니다. IIS 메트릭과 로그 수집을 시작하려면 IIS 서버에 [에이전트를 설치][2]하세요.

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. [에이전트 구성 파일][4]의 루트에 있는 [에이전트 `conf.d` 디렉터리][3]의 `iis.d/conf.yaml` 파일을 편집해 IIS 사이트 데이터 수집을 시작하세요. 사용할 수 있는 구성 옵션 전체를 보려면 [샘플 iis.d/conf.yaml][5]를 참고하세요.

2. [에이전트를 재시작][6]해 IIS 메트릭을 Datadog로 전송하기 시작합니다.

**참고**: 이 점검의 2.14.0 이상 버전에서는 메트릭 수집에 새로운 구현을 사용하므로 Python 3이 필요합니다. Python 3을 사용할 수 없는 호스트의 경우 또는 이 점검의 레거시 버전을 사용하려는 경우 다음 [config][7]를 참고하세요.

##### 로그 수집

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. 이 구성 블록을 `iis.d/conf.yaml` 파일에 추가해 IIS 로그 수집을 시작하세요.

   ```yaml
   logs:
     - type: file
       path: C:\inetpub\logs\LogFiles\W3SVC1\u_ex*
       service: myservice
       source: iis
   ```

   `path`와 `service` 파라미터 값을 내 환경에 맞게 변경하세요. 사용할 수 있는 구성 옵션 전체를 보려면  [샘플 iis.d/conf.yaml][5]을 참고하세요.

3. [에이전트를 재시작합니다][6].

**참고**: 수집하고자하는 로그 파일을 테일링할 수 있도록`datadog-agent` 사용자에게 읽기 및 실행 액세스를 부여해야 합니다. IIS에서 새 하위 폴더를 생성할 때(새 사이트가 생성되었을 떄) 상위 폴더 권한이 자동으로 부여되지 않습니다. 자세한 정보는 [로그 파일 테일링 권한 문제][8]를 참고하세요.


### 검증

[에이전트 상태 하위 명령을 실행하고][9] Checks 섹션 아래에서 `iis`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "iis" >}}


### 이벤트

IIS 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "iis" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][12]에 문의하세요.


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/iis/images/iisgraph.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/basic_agent_usage/windows/#agent-check-directory-structure
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/iis/datadog_checks/iis/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://github.com/DataDog/integrations-core/blob/7.33.x/iis/datadog_checks/iis/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ko/logs/guide/log-collection-troubleshooting-guide/#permission-issues-tailing-log-files
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/iis/metadata.csv
[11]: https://github.com/DataDog/integrations-core/blob/master/iis/assets/service_checks.json
[12]: https://docs.datadoghq.com/ko/help/