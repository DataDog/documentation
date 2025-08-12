---
app_id: nextcloud
app_uuid: a48ccc77-3e72-4e3b-b439-3ebe7e2688b7
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: nextcloud.server.database.size
      metadata_path: metadata.csv
      prefix: nextcloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10214
    source_type_name: Nextcloud
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: emeric.planet@gmail.com
  support_email: emeric.planet@gmail.com
categories:
- 협업
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nextcloud/README.md
display_on_public_website: true
draft: false
git_integration_title: nextcloud
integration_id: nextcloud
integration_title: Nextcloud
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: nextcloud
public_title: Nextcloud
short_description: Nextcloud 인스턴스에서 전체 통계 추적
supported_os:
- linux
- macos
- 윈도우즈(Windows)
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Collaboration
  - Offering::Integration
  configuration: README.md#Setup
  description: Nextcloud 인스턴스에서 전체 통계 추적
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nextcloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검은 [Nextcloud][1]를 모니터링합니다.

## 설정

Nextcloud 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있지 않기 때문에 설치해야 합니다.

### 설치

에이전트 v7.21+/v6.21+의 경우, 하단 지침에 따라 호스트에 Nextcloud 점검을 설치하세요. Docker 에이전트 또는 이전 버전의 에이전트와 같이 설치하려면 [커뮤니티 통합][3]을 참고하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-nextcloud==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 설정

1. [에이전트 설정 디렉토리][5]의 루트에 있는 `conf.d/` 폴더에서 `nextcloud.d/conf.yaml` 파일을 편집하여 Nextcloud [메트릭](#metrics) 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [nextcloud.d/conf.yaml 샘플][6]을 참고하세요.

2. [에이전트 다시 시작][7] 

### 검증

[에이전트의 상태 하위 명령을 실행][8]하고 Checks 섹션 아래에서 `nextcloud`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "nextcloud" >}}


### 이벤트

Nextcloud에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "nextcloud" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.


[1]: https://nextcloud.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/datadog_checks/nextcloud/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/assets/service_checks.json
[11]: https://docs.datadoghq.com/ko/help/