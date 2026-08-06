---
app_id: ignite
app_uuid: 0e1f1ef2-ea62-4ae4-a99f-8c40171b729c
assets:
  dashboards:
    Ignite Overview: assets/dashboards/ignite_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ignite.received_messages
      metadata_path: metadata.csv
      prefix: ignite.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10100
    source_type_name: Ignite
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 캐싱
- 데이터 스토어
- 로그 수집
- 네트워크
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ignite/README.md
display_on_public_website: true
draft: false
git_integration_title: ignite
integration_id: ignite
integration_title: ignite
integration_version: 3.1.0
is_public: true
manifest_version: 2.0.0
name: ignite
public_title: ignite
short_description: Ignite 서버에서 메트릭 수집하기.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Category::Log Collection
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Ignite 서버에서 메트릭 수집하기.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: ignite
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검에서는 [Ignite][1]를 모니터링합니다.

## 설정

### 설치

Ignite 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있습니다. 서버에 추가 설치를 할 필요가 없습니다.

### 구성

#### Ignite 설정

기본적으로 JMX 메트릭 내보내기가 활성화되어 있지만 노출할 포트를 선택해야 하거나 내 네트워크 보안에 따라 인증을 활성화해야 합니다. 공식 docker 이미지에서는 기본적으로 `49112`를 사용합니다.

로깅하려면 [log4j][3]를 활성화해 전체 날짜가 있는 로그를 사용해 혜택을 극대화하는 것이 좋습니다.

{{< tabs >}}
{{% tab "호스트" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

1. 에이전트 구성 디렉터리의 루트에 있는 `conf.d/` 폴더에서 `ignite.d/conf.yaml` 파일을 편집해 ignite 성능 데이터 수집을 시작하세요. 사용할 수 있는 설정 옵션 전체를 보려면 [샘플 ignite.d/conf.yaml][1]을 참고하세요.

   이 점검의 제한 값은 인스턴스당 메트릭 350개입니다. 반환된 메트릭 개수는 [상태 출력][2]에 표시됩니다.
   아래 구성을 편집해 관심 있는 메트릭을 지정할 수 있습니다.
   수집할 메트릭을 사용자 지정하는 방법을 배우려면 [JMX 점검 설명서][3]를 참고하세요.
   더 많은 메트릭을 모니터링해야 하는 경우 [Datadog 지원팀][4]에 문의하세요.

2. [에이전트를 재시작하세요][5].

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. Datadog 에이전트에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

   ```yaml
   logs_enabled: true
   ```

2. Ignote 로그 수집을 시작하려면 이 구성 블록을 `ignite.d/conf.yaml` 파일에 추가하세요.

   ```yaml
     logs:
       - type: file
         path: <IGNITE_HOME>/work/log/ignite-*.log
         source: ignite
         service: '<SERVICE_NAME>'
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \[\d{4}\-\d{2}\-\d{2}
   ```

   `path`와 `service` 파라미터 값을 내 환경에 맞게 변경하세요. 사용할 수 있는 구성 옵션 전체를 보려면 [샘플 ignite.d/conf.yaml][1]을 참고하세요.

3. [에이전트를 재시작하세요][5].

[1]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ko/integrations/java/
[4]: https://docs.datadoghq.com/ko/help/
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화된 환경" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

Datadog-Ignite 통합으로 메트릭을 수집하려면 [JMX로 자동탐지][2] 가이드를 참고하세요.

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

기본적으로 로그 수집은 Datadog 에이전트에서 비활성화되어 있습니다. 활성화하려면 [Docker 로그 수집][2]을 참고하세요.

| 파라미터      | 값                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ignite", "service": "<SERVICE_NAME>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-\d{2}\-\d{2}"}}` |

[1]: https://docs.datadoghq.com/ko/agent/autodiscovery/integrations/
[2]: https://docs.datadoghq.com/ko/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[3]: https://docs.datadoghq.com/ko/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트의 `status` 하위 명령을 실행][4]하고 Checks 섹션 아래에서 `ignite`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "ignite" >}}


### 이벤트

Ignite 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "ignite" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.



[1]: https://ignite.apache.org/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://apacheignite.readme.io/docs/logging#section-log4j
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example