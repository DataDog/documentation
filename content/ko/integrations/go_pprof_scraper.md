---
app_id: GO-PPROF-SCRAPPER
app_uuid: 2b13f6b1-d3ba-4254-93c0-2ceaf783cd85
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10309
    source_type_name: GO_PPROF_SCRAPPER
author:
  homepage: https://www.datadoghq.com
  name: 커뮤니티
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories: []
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/go_pprof_scraper/README.md
display_on_public_website: true
draft: false
git_integration_title: GO_PPROF_SCRAPPER
integration_id: GO-PPROF-SCRAPPER
integration_title: Go pprof scraper
integration_version: 1.0.4
is_public: true
manifest_version: 2.0.0
name: GO_PPROF_SCRAPPER
public_title: Go pprof scraper
short_description: debug/pprof 엔드포인트를 통해 Go 프로그램에서 프로필을 수집하세요.
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
  - 제공::통합
  configuration: README.md#Setup
  description: debug/pprof 엔드포인트를 통해 Go 프로그램에서 프로필을 수집하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Go pprof scraper
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검은 [`/debug/pprof`][1] 엔드포인트를 노출하는 Go 애플리케이션에서 프로필을 수집합니다.

참고: 가능한 경우 [dd-trace-go][2] 프로파일링 클라이언트 라이브러리를 사용하여 서비스를 계측하는 것이 좋습니다.
이 클라이언트 라이브러리는 [코드 핫스팟 및 엔드포인트 필터링][3]과 같은 Datadog의 다른 서비스와 더 나은 통합을 제공합니다.
소스 코드를 제어할 수 없는 서비스에는 이 통합을 사용하세요.

참고: 이 통합을 사용하면 Datadog의 [Continuous Profiler][4] 서비스 기준으로 호스트 요금이 청구됩니다.
Continuous Profiler 요금에 관한 자세한 내용은 [빌링 설명서][5]를 참고하세요.

## 설정

아래 지침에 따라 호스트에서 실행 중인 Agent에 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿][6]에서 이 지침을 적용하는 방법에 관한 지침을 참고하세요.

### 설치

Agent 버전 >= 7.21/6.21을 사용하는 경우 아래 지침에 따라 호스트에 `go_pprof_scraper` 점검을 설치하세요. Agent 버전 < v7.21/v6.21][8] 또는 [Docker Agent][9]로 점검을 설치하려면 [커뮤니티 통합 설치][7] 전용 Agent 가이드를 참고하세요.

1. [Datadog Agent를 다운로드하고 실행합니다][10].
2. 다음 명령을 실행해 통합 에이전트와 통합 휠을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-go-pprof-scraper==<INTEGRATION_VERSION>
   ```
  [Datadog 통합 릴리스 페이지][11]에서 최신 버전을 확인할 수 있습니다.

   **참조**: 필요한 경우 설치 명령어에 `sudo -u dd-agent` 접두어를 덧붙이세요.

### 구성

1. Agent의 구성 디렉터리 루트에 있는 `conf.d/` 폴더 내 `go_pprof_scraper.d/conf.yaml` 파일을 편집하여 Go 성능 데이터 수집을 시작합니다. 사용 가능한 모든 구성 옵션은 [샘플 go_pprof_scraper.d/conf.yaml][12]을 참고하세요.

2. [에이전트를 다시 시작합니다][13].

### 검증

[Agent 의 상태 하위 명령][14]을 실행하고 확인 섹션에서 `go_pprof_scraper`를 찾습니다.

## 수집한 데이터

### 메트릭

Go-pprof-scraper 통합은 메트릭을 생성하지 않습니다.

### 이벤트

Go-prof-스크래퍼 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "go-pprof-scraper" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][16]에 문의해 주세요.


[1]: https://pkg.go.dev/net/http/pprof
[2]: https://docs.datadoghq.com/ko/profiler/enabling/go/
[3]: https://docs.datadoghq.com/ko/profiler/connect_traces_and_profiles/
[4]: https://docs.datadoghq.com/ko/profiler/
[5]: https://docs.datadoghq.com/ko/account_management/billing/apm_tracing_profiler/
[6]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[7]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/?tab=agentv721v621
[8]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/?tab=agentearlierversions
[9]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/?tab=docker
[10]: https://app.datadoghq.com/account/settings/agent/latest
[11]: https://github.com/DataDog/integrations-extras/tags
[12]: https://github.com/DataDog/integrations-extras/blob/master/go_pprof_scraper/datadog_checks/go_pprof_scraper/data/conf.yaml.example
[13]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[14]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[15]: https://github.com/DataDog/integrations-extras/blob/master/go_pprof_scraper/assets/service_checks.json
[16]: https://docs.datadoghq.com/ko/help/