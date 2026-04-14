---
app_id: cfssl
app_uuid: dfcfda46-a2e3-44e4-8f80-1603e0317b2d
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: cfssl.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10284
    source_type_name: cfssl
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: JeanFred1@gmail.com
  support_email: JeanFred1@gmail.com
categories:
- 네트워크
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cfssl/README.md
display_on_public_website: true
draft: false
git_integration_title: cfssl
integration_id: cfssl
integration_title: cfssl
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: cfssl
public_title: cfssl
short_description: cfssl 인스턴스 모니터링
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
  - Category::Network
  - 제공::통합
  configuration: README.md#Setup
  description: cfssl 인스턴스 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: cfssl
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 검사는 Datadog Agent를 통해 [cfssl][1]를 모니터링합니다. 

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [오토파일럿 통합 템플릿][3]을 참조하세요.

### 설치

Agent v7.21+/v6.21+의 경우 아래 지침에 따라 호스트에 cfssl 검사를 설치하세요. Docker Agent 또는 이전 버전의 Agent를 설치하려면 [커뮤니티 통합 사용][3]을 참조하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-cfssl==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 구성

1. Agent 설정 디렉터리의 루트의 `conf.d/` 폴더에 있는 `cfssl.d/conf.yaml` 파일을 편집하여 cfssl 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 exim.d/conf.yaml][5]을 참조하세요.

2. [Agent를 재시작합니다][6].

### 검증

[Agent 상태 하위 명령][7]을 실행하고 확인 섹션에서 `cfssl`를 찾습니다.

## 수집한 데이터

### 메트릭

cfssl 통합에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

cfssl 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "cfssl" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.


[1]: https://github.com/cloudflare/cfssl
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/cfssl/datadog_checks/cfssl/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/cfssl/assets/service_checks.json
[9]: https://www.datadoghq.com/support/