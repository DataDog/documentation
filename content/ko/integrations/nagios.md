---
app_id: nagios
app_uuid: 7e61b923-1847-4c43-85cf-5f4c49ff4806
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: nagios.host.rta
      metadata_path: metadata.csv
      prefix: nagios.
    process_signatures:
    - nagios
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 3
    source_type_name: Nagios
  saved_views:
    nagios_processes: assets/saved_views/nagios_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- notifications
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/nagios/README.md
display_on_public_website: true
draft: false
git_integration_title: nagios
integration_id: nagios
integration_title: Nagios
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: nagios
public_title: Nagios
short_description: Nagios 서비스 플랩, 호스트 알림 등을 Datadog 이벤트 스트림 이벤트 스트림으로 보내세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::알림
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Nagios 서비스 플랩, 호스트 알림 등을 Datadog 이벤트 스트림 이벤트 스트림으로 보내세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/nagios-monitoring
  support: README.md#Support
  title: Nagios
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Nagios가 모니터링하는 인프라스트럭처에서 Datadog로 이벤트를 전송하여 더 풍부한 알림을 받고, Datadog 모니터링 인프라스트럭처에서 메트릭과 Nagios 이벤트를 상호 연결할 수 있습니다.

이 점검은 Nagios 서버의 로그를 감시하고 이벤트를 Datadog로 전송하여 다음을 수행합니다.

- 서비스 플랩
- 호스트 상태 변경
- 패시브 서비스 점검
- 호스트 및 서비스 다운타임

이 점검은 Nagios 성능 데이터를 메트릭으로 Datadog에 전송할 수도 있습니다.

## 설정

### 설치

Nagios 점검은 [Datadog 에이전트][1] 패키지 에 포함되어 있으므로 Nagios 서버에 다른 것을 설치할 필요가 없습니다.

### 구성

호스트에서 실행 중인 Agent에 대해 이 검사를 구성하려면 아래 지침을 따르세요. 컨테이너화된 환경의 경우 [Containerized](#containerized) 섹션을 참조하세요.

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

1. [에이전트 설정 디렉토리][1]의 루트에 있는 `conf.d/` 폴더에서 `nagios.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 설정 옵션은 [샘플 nagios.d/conf.yaml][2]을 참조하세요.

2. [에이전트][3]를 다시 시작하여 Nagios 이벤트 및 (선택 사항) 성능 데이터 메트릭을 Datadog로 전송하기 시작합니다.

**참고**: Nagios 점검은 잠재적으로 [커스텀 메트릭][4]를 릴리스하여 [빌링][5]에 영향을 줄 수 있습니다.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/nagios/datadog_checks/nagios/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ko/developers/metrics/custom_metrics/
[5]: https://docs.datadoghq.com/ko/account_management/billing/custom_metrics/
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

| 파라미터            | 값                                        |
| -------------------- | -------------------------------------------- |
| `<INTEGRATION_NAME>` | `nagios`                                     |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                |
| `<INSTANCE_CONFIG>`  | `{"nagios_conf": "/etc/nagios3/nagios.cfg"}` |

**참고**: 컨테이너화된 에이전트는 `/etc/nagios3/nagios.cfg` 파일에 액세스하여 Datadog-Nagios 통합 를 활성화할 수 있어야 합니다.

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령][2]을 실행하고 점검 섹션에서 `nagios`를 찾습니다.

## 수집한 데이터

### 메트릭

기본값 설정을 사용하면 Nagios 점검은 메트릭 를 수집하지 않습니다. 그러나 `collect_host_performance_data` 및/또는 `collect_service_performance_data`를 `True`로 설정하면 점검이 Nagios 성능 데이터를 감시하고 게이지 메트릭을 Datadog에 제출합니다.

### 로그 수집

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

    ```yaml
    logs_enabled: true
    ```

2. 이 설정 블록을 `nagios.d/conf.yaml` 파일에 추가하여 Nagios 로그 수집을 시작하세요.

    ```yaml
    logs:
      - type: file
        path: /opt/nagios/var/log/nagios.log
        source: nagios
    ```

   환겨을 기준으로 `path` 매개 변수를 변경하세요. nagios 설정 파일에서 `log_file` 값을 참조하세요. 사용 가능한 모든 설정 옵션을 보려면 [샘플 nagios.d/conf.yaml][3]을 참조하세요.

3. [Agent를 재시작합니다][4].

### 이벤트

점검은 Nagios 이벤트 로그에서 이러한 스트링을 포함하는 로그 라인을 찾습니다. 각 라인에 대해 이벤트를 릴리스합니다.

- SERVICE FLAPPING ALERT
- ACKNOWLEDGE_SVC_PROBLEM
- SERVICE ALERT
- HOST ALERT
- ACKNOWLEDGE_HOST_PROBLEM
- SERVICE NOTIFICATION
- HOST DOWNTIME ALERT
- PROCESS_SERVICE_CHECK_RESULT
- SERVICE DOWNTIME ALERT

### 서비스 점검

Nagios 점검은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

- [Datadog로 Nagios 알림을 이해하세요.][6]


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://github.com/DataDog/integrations-core/blob/master/nagios/datadog_checks/nagios/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/help/
[6]: https://www.datadoghq.com/blog/nagios-monitoring