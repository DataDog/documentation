---
app_id: neutrona
app_uuid: f44f84d4-1436-4ab1-8023-b952850b64c8
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: neutrona.azure.expressroute.egress_bps
      metadata_path: metadata.csv
      prefix: neutrona.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10051
    source_type_name: Neutrona
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Neutrona
  sales_email: david@neutrona.com
  support_email: david@neutrona.com
categories:
- cloud
- 네트워크
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/neutrona/README.md
display_on_public_website: true
draft: false
git_integration_title: neutrona
integration_id: neutrona
integration_title: Neutrona
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: neutrona
public_title: Neutrona
short_description: Neutrona 텔레메트리
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - "\b카테고리::클라우드"
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Neutrona 텔레메트리
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Neutrona
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검은 [Neutrona][1]와 다음 클라우드 연결 서비스의 연결을 모니터링합니다.

- Azure(ExpressRoute)

## 설정

Neutrona 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있지 않기 때문에 설치해야 합니다.

### 설치

에이전트 v7.21+/v6.21+의 경우, 하단 지침에 따라 호스트에 Neutrona 점검을 설치하세요. Docker 에이전트 또는 이전 버전의 에이전트와 같이 설치하려면 [커뮤니티 통합][3]을 참고하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-neutrona==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 구성

1. Neutrona [메트릭](#metrics) 수집을 시작하려면 [에이전트 구성 디렉터리][5]의 루트에 있는 `conf.d/` 폴더에서 `neutrona.d/conf.yaml` 파일을 편집합니다.
   사용 가능한 모든 구성 옵션은 [샘플 neutrona.d/conf.yaml][6]을 참조하세요.

2. [에이전트 다시 시작][7]

### 검증

[에이전트의 상태 하위 명령을 실행][8]하고 Checks 섹션 아래에서 `neutrona`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "neutrona" >}}


### 서비스 점검

Neutrona에는 아직 서비스 점검이 포함되지 않습니다.

### 이벤트

Neutrona에는 아직 이벤트가 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

[1]: https://telemetry.neutrona.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/neutrona/datadog_checks/neutrona/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/neutrona/metadata.csv
[10]: https://docs.datadoghq.com/ko/help/