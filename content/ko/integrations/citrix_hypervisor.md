---
app_id: citrix-hypervisor
app_uuid: cf4ad6ea-85ae-4f7d-8e79-7b8d36924425
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: citrix_hypervisor.host.cpu
      metadata_path: metadata.csv
      prefix: citrix_hypervisor.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10198
    source_type_name: Citrix Hypervisor
  logs:
    source: citrix_hypervisor
  monitors:
    Host CPU high: assets/monitors/host_cpu_high.json
    VM CPU high: assets/monitors/vm_cpu_high.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- 로그 수집
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/README.md
display_on_public_website: true
draft: false
git_integration_title: citrix_hypervisor
integration_id: citrix-hypervisor
integration_title: Citrix Hypervisor
integration_version: 3.2.0
is_public: true
kind: 통합
manifest_version: 2.0.0
name: citrix_hypervisor
public_title: Citrix Hypervisor
short_description: Citrix Hypervisor 호스트의 상태 및 성능을 모니터링합니다.
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
  - "\b카테고리::클라우드"
  - Category::Log Collection
  configuration: README.md#Setup
  description: Citrix Hypervisor 호스트의 상태 및 성능을 모니터링합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Citrix Hypervisor
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 Datadog 에이전트를 통해 [Citrix Hypervisor][1]를 모니터링합니다.

## 설정

호스트에서 실행 중인 에이전트의 경우 다음 지침에 따라 설치하고 구성하세요. 컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][2]에 다음 지침을 적용하는 방법이 안내되어 있습니다.

### 설치

Citrix Hypervisor 점검은 [Datadog 에이전트][3] 패키지에 포함되어 있습니다.
서버에서 추가 설치가 필요하지 않습니다.
Citrix hypervisors를 모니터링하는 권장 방법은 각 하이퍼바이저에 하나의 Datadog 에이전트를 설치하는 것입니다.

#### Datadog 사용자

Citrix Hypervisor 통합에는 서비스 모니터링을 위한 최소  [`read-only`][4] 액세스 권한이 있는 사용자를 필요로 합니다.

### 설정

#### 호스트

1. 에이전트의 설정 디렉터리의 루트에 있는 `conf.d/` 폴더에는 `citrix_hypervisor.d/conf.yaml` 파일을 편집하여 Citrix Hypervisor 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 citrix_hypervisor.d/conf.yaml][5]을 참조하세요.

2. [에이전트를 재시작합니다][6].

#### 로그 수집

_에이전트 버전 > 6.0 이상 사용 가능_

1. 로그 수집은 기본적으로 Datadog 에이전트에서 비활성화되어 있습니다. `datadog.yaml`에서 활성화하세요.

   ```yaml
   logs_enabled: true
   ```

2. 이 설정 블록을 `citrix_hypervisor.d/conf.yaml` 파일에 추가해 Citrix Hypervisor 로그 수집을 시작합니다.
    ```yaml
    logs:
    - type: file
      path: /var/log/xensource.log
      source: citrix_hypervisor
    ```
   `path` 값을 변경하고 환경에 설정합니다. 사용 가능한 모든 설정 옵션은 [샘플 `citrix_hypervisor.d/conf.yaml` 파일][5]을 참조합니다.

3. [에이전트를 재시작합니다][6].

### 검증

[에이전트 상태 하위 명령을 실행하고][7] 점검 섹션에서 `citrix_hypervisor`를 찾습니다. 

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "citrix_hypervisor" >}}


### 이벤트

Citrix Hypervisor 통합은 이벤트를 포함하지 않습니다.

### 서비스 검사
{{< get-service-checks-from-git "citrix_hypervisor" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog를 통한 Citrix Hypervisor 성능 모니터링][11]

[1]: https://www.citrix.com/products/citrix-hypervisor/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.citrix.com/en-us/xencenter/7-1/rbac-roles.html
[5]: https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/datadog_checks/citrix_hypervisor/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/
[11]: https://www.datadoghq.com/blog/monitor-citrix-hypervisor-datadog/