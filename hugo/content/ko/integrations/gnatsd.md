---
app_id: gnatsd
app_uuid: 91ef7414-0d7b-4ccd-b1a0-d23ef8b6780f
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: gnatsd.connz.connections.in_bytes
      metadata_path: metadata.csv
      prefix: gnatsd.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10234
    source_type_name: Gnatsd
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: dev@goldstar.com
  support_email: dev@goldstar.com
categories:
- message queues
- notifications
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gnatsd/README.md
display_on_public_website: true
draft: false
git_integration_title: gnatsd
integration_id: gnatsd
integration_title: Gnatsd
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: gnatsd
public_title: Gnatsd
short_description: Datadog으로 gnatsd 클러스터를 모니터링합니다.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::메시지 큐
  - Category::알림
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog으로 gnatsd 클러스터를 모니터링합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Gnatsd
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Gnatsd 서비스에서 실시간으로 메트릭을 받아 다음을 수행할 수 있습니다.

- Gnatsd 상태 시각화 및 모니터링
- Gnatsd 페일오버와 이벤트에 대한 알림을 받습니다.

## 설정

Gnatsd 점검은 [Datadog 에이전트][1] 패키지에 포함되어 있지 않기 때문에 별도로 설치해야 합니다.

### 설치

Agent v7.21+ / v6.21+의 경우 아래 지침에 따라 호스트에 Gnatsd 점검을 설치합니다. Docker 에이전트 또는 이전 버전의 에이전트와 함께 설치하려면 [커뮤니티 통합 사용][2]을 참조하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-gnatsd==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][3]과 유사하게 설정하세요.

### 설정

1. [에이전트 설정 디렉토리][4]의 루트에 있는 `conf.d/` 폴더에서 `gnatsd.d/conf.yaml` 파일을 편집하여 Gnatsd [메트릭](#metrics) 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [gnatsd.d/conf.yaml 샘플][5]을 참조하세요.

2. [에이전트 재시작][6]

### 검증

[에이전트 상태 하위 명령을 실행하고][7] 점검 섹션에서 `gnatsd`를 찾으세요.

## 호환성

gnatsd 점검은 다른 주요 플랫폼과 모두 호환됩니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "gnatsd" >}}


**참고**: 커스텀 Nats 클러스터 이름을 사용하는 경우 메트릭은 다음과 같이 표시될 수 있습니다.
`gnatsd.connz.connections.cluster_name.in_msgs`

### 이벤트

gnatsd 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "gnatsd" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ko/getting_started/integrations/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd/datadog_checks/gnatsd/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/datadog-sdk-testing/blob/master/lib/config/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/