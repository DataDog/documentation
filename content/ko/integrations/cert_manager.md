---
app_id: cert-manager
app_uuid: d8bac6db-8cf7-49ca-a4b8-643714fbc7b9
assets:
  dashboards:
    Cert-Manager Overview Dashboard: assets/dashboards/certmanager_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cert_manager.clock_time
      metadata_path: metadata.csv
      prefix: cert_manager.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10161
    source_type_name: cert-manager
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 보안
- 설정 및 배포
- cog-2
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cert_manager/README.md
display_on_public_website: true
draft: false
git_integration_title: cert_manager
integration_id: cert-manager
integration_title: cert-manager
integration_version: 4.1.0
is_public: true
custom_kind: 통합
manifest_version: 2.0.0
name: cert_manager
public_title: cert-manager
short_description: Datadog를 사용해 모든 cert-manager 메트릭을 추적하세요.
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
  - Category::Security
  - Category::Configuration & Deployment
  - Category::Containers
  configuration: README.md#Setup
  description: Datadog를 사용해 모든 cert-manager 메트릭을 추적하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: cert-manager
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 [cert-manager][1]에서 메트릭을 수집합니다.

![Cert-Manager Overview Dashboard][2]

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [자동탐지 통합 템플릿][3]을 참조하세요.

### 설치

cert_manager 점검은 [Datadog 에이전트][3] 패키지에 포함되어 있습니다.
서버에서 추가 설치가 필요하지 않습니다.

### 설정

1. 에이전트의 설정 디렉터리 루트에 있는 `conf.d/` 폴더에서 `cert_manager.d/conf.yaml` 파일을 편집하여 cert_manager 성능 데이터를 수집하기 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 cert_manager.d/conf.yaml][4]을 참조하세요.

2. [에이전트를 재시작합니다][5].

### 검증

[에이전트의 상태 하위 명령을 실행하고][6] 점검 섹션에서 `cert_manager`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "cert_manager" >}}


### 이벤트

cert_manager 통합은 이벤트를 포함하지 않습니다.

### 서비스 검사
{{< get-service-checks-from-git "cert_manager" >}}


## 트러블슈팅

### 이름 태그 복제

각 인증서 이름은 프로메테우스 페이로드에서 `name` 레이블 내에 노출되어 있으며 Datadog 에이전트에 의해 태그로 변환됩니다. 호스트가 또한 `name` 태그를 사용하는 경우(예를 들어, [AWS 통합][9]으로 자동 수집되는 경우), 이 통합에 따른 메트릭은 양 값로 표시됩니다. `name` 복제 태그를 피하려면,  [`rename_labels` 설정 파라미터][10]를 사용하여 프로메테우스 레이블 `name`을 Datadog 태그 `cert_name`에 매핑할 수 있습니다. 이를 통해 `cert_name` 태그 내 단일 값으로 자격 증명을 식별할 수 있습니다. 
```yaml
init_config:
instances:
- openmetrics_endpoint: <OPENMETRICS_ENDPOINT>
  rename_labels:
    name: cert_name
```

도움이 필요하세요? [Datadog 지원팀][11]에 문의하세요.

[1]: https://github.com/jetstack/cert-manager
[2]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cert_manager/images/overview_dashboard.png
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/cert_manager/datadog_checks/cert_manager/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/cert_manager/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/cert_manager/assets/service_checks.json
[9]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[10]: https://github.com/DataDog/integrations-core/blob/81b91a54328f174c5c1e92cb818640cba1ddfec3/cert_manager/datadog_checks/cert_manager/data/conf.yaml.example#L153-L155
[11]: https://docs.datadoghq.com/ko/help/