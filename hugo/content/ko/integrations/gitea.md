---
app_id: gitea
app_uuid: f4cd02de-cfb8-4de9-a809-7a772ba738ca
assets:
  dashboards:
    Gitea Overview Dashboard: assets/dashboards/gitea_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: gitea.process.start_time
      metadata_path: metadata.csv
      prefix: gitea.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10283
    source_type_name: Gitea
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: florent.clarret@gmail.com
  support_email: florent.clarret@gmail.com
categories:
- 협업
- 소스 컨트롤
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gitea/README.md
display_on_public_website: true
draft: false
git_integration_title: gitea
integration_id: gitea
integration_title: Gitea
integration_version: 1.0.2
is_public: true
manifest_version: 2.0.0
name: gitea
public_title: Gitea
short_description: 'Datadog를 사용해 모든 Gitea 지표를 추적하세요. '
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Category::Source Control
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Datadog를 사용해 모든 Gitea 지표를 추적하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Gitea
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Gitea][1]는 Go로 작성된 커뮤니티 관리형 경량 코드 호스팅 솔루션입니다.

이 통합은 Datadog [Agent][2]를 통해 Gitea 인스턴스를 모니터링합니다.

## 설정

### 사전 요구 사항

Gitea는 기본적으로 내부 메트릭을 노출하지 않습니다. `app.ini` 설정 파일에서 메트릭 엔드포인트를 노출하는 기본 제공 HTTP 서버를 활성화해야 합니다.

```ini
[metrics]
ENABLED = true
```

자세한 내용은 공식 [설명서][1]를 참조하세요.

### 설치

Gitea 통합은 기본적으로 [Datadog Agent][3] 패키지에 포함되어 있지 않으므로 설치해야 합니다.

Agent v7.36+의 경우 아래 지침에 따라 호스트에 Gitea 점검을 설치하세요. Docker Agent 또는 이전 버전의 Agent 과 함께 설치하려면 [커뮤니티 통합 사용][4]을 참조하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

```shell
datadog-agent integration install -t datadog-gitea==<INTEGRATION_VERSION>
```

2. Agent 기반 [통합][5]과 유사하게 통합을 설정합니다.

### 구성

1. Agent 설정 디렉터리 루트의 `conf.d/` 폴더에서 `gitea.d/conf.yaml` 파일을 편집하여 Gitea 데이터 수집을 시작합니다. 사용 가능한 모든 구성 옵션은 [샘플 gitea.d/conf.yaml][6]을 참조하세요.

2. [에이전트를 다시 시작][7]합니다.

### 검증

[Agent 상태 하위 명령][8]을 실행하고 확인 섹션에서 `gitea`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "gitea" >}}


### 이벤트

Gitea 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "gitea" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.

[1]: https://docs.gitea.io/en-us/
[2]: https://docs.datadoghq.com/ko/agent/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/ko/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/gitea/datadog_checks/gitea/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/gitea/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/gitea/assets/service_checks.json
[11]: https://docs.datadoghq.com/ko/help/