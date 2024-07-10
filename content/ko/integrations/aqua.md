---
app_id: aqua
app_uuid: d3819b09-3e08-492f-b0f8-b0d3f53fbdf5
assets:
  dashboards:
    aqua: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: aqua.running_containers
      metadata_path: metadata.csv
      prefix: aqua.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10042
    source_type_name: Aqua
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Aqua
  sales_email: oran.moshai@aquasec.com
  support_email: oran.moshai@aquasec.com
categories:
- cog-2
- 로그 수집
- 보안
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/aqua/README.md
display_on_public_website: true
draft: false
git_integration_title: aqua
integration_id: aqua
integration_title: Aqua
integration_version: 1.0.0
is_public: true
custom_kind: 통합
manifest_version: 2.0.0
name: aqua
public_title: Aqua
short_description: 개발에서 프로덕션까지 전 과정을 커버하는 컨테이너 및 클라우드 네이티브 애플리케이션용 보안 솔루션
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 개발에서 프로덕션까지 전 과정을 커버하는 컨테이너 및 클라우드 네이티브 애플리케이션용 보안 솔루션
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Aqua
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검은 [Aqua][1]를 모니터링합니다.

Aqua 점검에서는 총 취약도의 심각도가 높을 경우나 Aqua에 등록되지 않은 호스트 내에서 컨테이너가 실행 중일 경우 알림을 보냅니다. 또 런타임에서 차단된 이벤트와 관련해 데이터 알림을 보냅니다. Aqua 스캐너가 더 많이 필요할 경우에는 웹훅 규모 조정 인프라스트럭처를 트리거할 수 있습니다.

## 설정

Aqua 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있지 않기 때문에 설치해야 합니다.

### 설치

에이전트 v7.21+/v6.21+의 경우, 하단 지침에 따라 호스트에 Aqua 점검을 설치하세요. Docker 에이전트 또는 이전 버전의 에이전트와 같이 설치하려면 [커뮤니티 통합][3]을 참고하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-aqua==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 설정

#### 메트릭 수집

1. [에이전트 구성 디렉터리][5]의 루트에 있는 `conf.d/` 폴더에서 `aqua.d/conf.yaml` 파일을 편집하여 Aqua [메트릭](#metrics) 수집을 시작합니다. 사용 가능한 설정 옵션 전체를 보려면 [샘플 conf.yaml][6]을 참고하세요.

   ```yaml
   instances:
     - url: http://your-aqua-instance.com
       api_user: "<API_USERNAME>"
       password: "<API_USER_PASSWORD>"
   ```

   `api_user`와 `password` 파라미터 값을 내 환경에 맞는 값으로 변경하고 구성하세요.

2. [에이전트를 다시 시작][7]합니다.

#### 로그 수집

Aqua에서 생성하는 로그에는 두 가지 종류가 있습니다.

- Aqua 감사 로그
- Aqua 엔포서 로그

Aqua 감사 로그 수집하는 방법:

1. Aqua 계정에 연결
2. `Integration` 페이지의 `Log Management` 섹션으로 이동
3. Webhook 통합 활성화
4. 엔드포인트 `{{< region-param key="http_endpoint" code="true" >}}/v1/input/<DATADOG_API_KEY>?ddsource=aqua`를 추가하고 활성화
   - `<DATADOG_API_KEY>`를 내 [Datadog API 키][8]로 변경하세요.

Aqua Enforcer 로그는 **에이전트 >6.0에서 사용 가능**

5. Datadog 에이전트에서는 기본적으로 로그 수집이 비활성화되어 있습니다. [daemonset 구성][9]에서 활성화하세요.

   ```yaml
     # (...)
     env:
       # (...)
       - name: DD_LOGS_ENABLED
           value: "true"
       - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
           value: "true"
     # (...)
   ```

   Docker 소켓이 Datadog 에이전트에 연결되어 있어야 합니다. [매니페스트 예시][10]를 보려면 쿠버네티스 설명서를 참고하세요.

6. [에이전트를 다시 시작][7]합니다.

### 검증

[에이전트의 `status` 하위 명령을 실행][11]하고 점검 섹션 아래에서 `aqua`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "aqua" >}}


### 이벤트

Aqua에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사
{{< get-service-checks-from-git "aqua" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][14]에 문의하세요.


[1]: https://www.aquasec.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://docs.datadoghq.com/ko/agent/faq/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/aqua/datadog_checks/aqua/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/faq/agent-commands/#start-stop-restart-the-agent
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: https://docs.datadoghq.com/ko/agent/kubernetes/daemonset_setup/#log-collection
[10]: https://docs.datadoghq.com/ko/agent/kubernetes/?tab=daemonset#installation
[11]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#service-status
[12]: https://github.com/DataDog/integrations-extras/blob/master/aqua/metadata.csv
[13]: https://github.com/DataDog/integrations-extras/blob/master/aqua/assets/service_checks.json
[14]: https://docs.datadoghq.com/ko/help/