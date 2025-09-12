---
app_id: zenoh-router
app_uuid: 8ef30e8d-955c-4456-b176-a01f2560bda1
assets:
  dashboards:
    Zenoh routers - Overview: assets/dashboards/zenoh_routers_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: zenoh.router.sessions
      metadata_path: metadata.csv
      prefix: zenoh.router.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10445
    source_type_name: Zenoh router
  monitors:
    No active sessions: assets/monitors/zenoh_router_disconnected.json
author:
  homepage: https://zenoh.io/
  name: ZettaScale
  sales_email: contact@zettascale.tech
  support_email: alexander@bushnev.pro
categories:
- network
- iot
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/zenoh_router/README.md
display_on_public_website: true
draft: false
git_integration_title: zenoh_router
integration_id: zenoh-router
integration_title: Zenoh router
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: zenoh_router
public_title: Zenoh router
short_description: Zenoh 라우터에서 네트워크 메트릭을 수집합니다.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Network
  - Category::IoT
  - Offering::Integration
  - Queried Data Type::Metrics
  - 제출한 데이터 유형::메트릭
  configuration: README.md#Setup
  description: Zenoh 라우터에서 네트워크 메트릭을 수집합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Zenoh router
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검은 Zenoh 라우터를 모니터링합니다.

[Zenoh][1]는 개방형 소스 Zero Overhead Network Protocol입니다.

Zenoh(/zeno/)는 이동 중 데이터, 저장 데이터, 컴퓨팅 연산을 통합하는 퍼브/서브/쿼리 프로토콜입니다. 기존 퍼브/서브와 지리적으로 분산된 스토리지, 쿼리 및 컴퓨팅 연산을 원활하게 결합하며 메인스트림 스택을 훨씬 뛰어넘는 수준의 시간 및 공간 효율성을 유지하도록 도와줍니다.

Zenoh 라우터 통합으로 라우터 메트릭 및 라우터/피어/클라이언트 연결 상태를 Datadog에서 모니터링할 수 있습니다.

## 설정

### Datadog Agent(v7.21+ 및 v6.21+)로 설치하기

Agent v7.21+ / v6.21+의 경우 아래 지침에 따라 호스트에 Zenoh 라우터 점검을 설치합니다.

1. 호스트에서 다음 명령을 실행해 Agent 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-zenoh_router==<INTEGRATION_VERSION>
   ```

### 소스 코드로 설치하기

다음에 따라 호스트에 Zenoh 라우터를 설치합니다.

1. 모든 머신에 [개발자 툴킷][2]을 설치합니다.

2. `ddev release build zenoh_router`를 실행하여 패키지를 빌드합니다.

3. 빌드 아티팩트를 [설치된 Agent][3]가 있는 호스트에 업로드합니다.

4. 호스트에서 `datadog-agent integration install -w path/to/zenoh_router/dist/<ARTIFACT_NAME>.whl` 을 실행합니다.

### 설정

1. [Zenoh REST API 플러그인][4]이 활성화되어 있는지 확인합니다.

2. Zenoh 라우터 [메트릭](#metrics) 수집을 시작하려면 [Agent 설정 디렉터리][5]의 루트에 있는 `conf.d/` 폴더에서 `zenoh_router.d/conf.yaml` 파일을 편집합니다.
사용 가능한 모든 설정 옵션은 [zenoh_router.d/conf.yaml 샘플][6]을 참조하세요.

3. [에이전트 다시 시작][7].

### 검증

[Agent 상태 하위 명령][8]을 실행하고 점검 섹션에서 `zenoh_router`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "zenoh_router" >}}


### 이벤트

Zenoh는 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "zenoh_router" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.


[1]: https://zenoh.io/
[2]: https://docs.datadoghq.com/ko/developers/integrations/python/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://zenoh.io/docs/apis/rest/
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/zenoh_router/datadog_checks/zenoh_router/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/zenoh_router/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/zenoh_router/assets/service_checks.json
[11]: https://docs.datadoghq.com/ko/help/