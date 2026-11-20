---
app_id: cyral
app_uuid: da6e2ea6-1611-4d37-9cc6-efce73bc4f31
assets:
  dashboards:
    Cyral Overview: assets/dashboards/cyral_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cyral.analysis_time
      metadata_path: metadata.csv
      prefix: cyral.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10115
    source_type_name: Cyral
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Cyral
  sales_email: product@cyral.com
  support_email: product@cyral.com
categories:
- 데이터 스토어
- 보안
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cyral/README.md
display_on_public_website: true
draft: false
git_integration_title: cyral
integration_id: cyral
integration_title: Cyral
integration_version: 0.0.1
is_public: true
manifest_version: 2.0.0
name: cyral
public_title: Cyral
short_description: Cyral 인스턴스 모니터링 MySQL에서 런타임 메트릭 수집
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::Security
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Cyral 인스턴스 모니터링 MySQL에서 런타임 메트릭 수집
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cyral
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검은 Datadog 에이전트를 통해 [Cyral][1] MySQL 사이드카를 모니터링합니다.

## 설정

[Datadog 에이전트][2] 패키지에는 Cyral 점검이 포함되어 있지 않기 때문에 설치해야 합니다.

### 설치

에이전트 v7.21+/v6.21+의 경우, 하단 지침에 따라 호스트에 Cyral 점검을 설치하세요. Docker 에이전트 또는 이전 버전의 에이전트와 같이 설치하려면 [커뮤니티 통합][3]을 참고하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-cyral==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 설정

1. 에이전트 구성 디렉터리의 루트 수준에 있는 `conf.d/` 폴더에서 `cyral.d/conf.yaml` 파일을 편집해 cyral 성능 데이터 수집을 시작하세요. 사용할 수 있는 구성 옵션을 모두 보려면 [sample cyral.d/conf.yaml][5]을 참고하세요.

    ```yaml
    init_config:

    instances:
     # url of the metrics endpoint of prometheus
     - prometheus_url: http://localhost:9018/metrics
    ```

2. [에이전트를 재시작합니다][6].

### 검증

[에이전트 상태 하위 명령을 실행][7]하고 Checks 섹션 아래에서 `cyral`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "cyral" >}}


### 서비스 점검

Cyral에는 서비스 점검이 포함되어 있지 않습니다.

### 이벤트

Cyral에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

### 에이전트 연결 불가

```text
    cyral
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 0 service check
```

`cyral.yaml` 내의 `url`이 올바른지 확인하세요.

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://cyral.com/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/cyral/datadog_checks/cyral/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/cyral/metadata.csv
[9]: https://docs.datadoghq.com/ko/help/