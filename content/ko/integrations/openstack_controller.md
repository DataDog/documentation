---
app_id: openstack-controller
app_uuid: f5c2cc69-1efc-40b2-8dcd-61e1215b237d
assets:
  dashboards:
    OpenStack Controller Overview: assets/dashboards/openstack-controller.json
    OpenStack Controller Overview [Default Microversion]: assets/dashboards/openstack_controller_overview_[default_microversion].json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: openstack.controller
      metadata_path: metadata.csv
      prefix: openstack.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10226
    source_type_name: Openstack_controller
  logs:
    source: openstack
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- 로그 수집
- 프로비저닝
- 오케스트레이션
- 설정 및 배포
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/openstack_controller/README.md
display_on_public_website: true
draft: false
git_integration_title: openstack_controller
integration_id: openstack-controller
integration_title: OpenStack Controller
integration_version: 8.6.0
is_public: true
manifest_version: 2.0.0
name: openstack_controller
public_title: OpenStack Controller
short_description: 하이퍼바이저 및 VM 수준 리소스 사용량과 Neutron 메트릭을 추적합니다.
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
  - Category::Cloud
  - Category::Log Collection
  - Category::Provisioning
  - Category::Orchestration
  - Category::Configuration & Deployment
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: 하이퍼바이저 및 VM 수준 리소스 사용량과 Neutron 메트릭을 추적합니다.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/openstack-controller-integration/
  support: README.md#Support
  title: OpenStack Controller
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

**참고**: 본 통합은 OpenStack v13+에서만 적용됩니다. OpenStack v12 이하에서 메트릭을 수집하려면 [OpenStack 통합][1]를 사용하세요.

본 점검은 컨트롤러 노드에서 [OpenStack][2]을 모니터링합니다.

## 설정

### 설치

OpenStack Controller 점검은 [Datadog 에이전트][3] 패키지에 포함되어 있으므로 서버에 추가 설치할 필요가 없습니다.

### 설정

OpenStack Controller 통합은 모든 컴퓨팅 노드와 이를 실행하는 서버로부터 정보를 수집하도록 설계되었습니다. 통합은 단일 에이전트에서 실행되어 OpenStack 환경을 모니터링하며, 컨트롤러 노드 또는 Keystone, Nova, Neutron, Cinder, Ironic, Octavia 엔드포인트에 액세스할 수 있는 인접 서버에 배포할 수 있습니다.

#### OpenStack 준비

`openstack_controller.d/conf.yaml` 파일에 사용되는 `datadog` 사용자를 생성합니다. 이 사용자는 환경 전반의 읽기 전용 권한이 필요한데, 그래야 단일 노드에서 실행되고 모든 노드 및 서버의 상위 시스템 정보를 읽을 수 있습니다.

#### 에이전트 설정

1. 에이전트의 설정 디렉토리 루트에 있는 `conf.d/` 폴더에서 `openstack_controller.d/conf.yaml` 파일을 편집하여 OpenStack Controller 성능 데이터를 수집합니다. 사용 가능한 모든 설정 옵션은 [openstack_controller.d/conf.yaml 샘플][4]을 참조하세요.

   ```yaml
   init_config:

   instances:
     - keystone_server_url: "<AUTH_URL>"
       password: "<PASSWORD>"
       username: "<USER_NAME>"
       domain_id: "<DOMAIN_ID>"
   ```

2. [에이전트를 재시작하세요][5].

**참고**: 통합을 v5.0.0 이하에서 v6.0.0 이상으로 업그레이드하는 경우, `use_legacy_check_version` 플래그를 활성화해야 최신 기능을 사용할 수 있습니다. 아울러, 호환성을 유지하기 위해 설정을 변경해야 할 수도 있습니다. 자세한 내용은 [openstack controller.d/conf.yaml 샘플][4]을 참조하세요.  

##### 로그 수집

1. Datadog 에이전트에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화할 수 있습니다.

   ```yaml
   logs_enabled: true
   ```

2. Openstack 로그 수집을 시작하려면 `openstack_controller.d/conf.yaml` 파일에 설정 블록을 추가하세요.

   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: openstack
   ```

    `path` 파라미터 값을 변경하고 환경에 맞게 설정하세요. 사용 가능한 모든 설정 옵션은 [openstack_controller.d/conf.yaml 샘플][4]을 참조하세요.


### 검증

[에이전트 `status` 하위 명령을 실행][6]하고 점검 섹션에서 `openstack_controller`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "openstack_controller" >}}


### 이벤트

OpenStack Controller는 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "openstack_controller" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog을 사용한 OpenStack 컴포넌트 모니터링][10]


[1]: https://docs.datadoghq.com/ko/integrations/openstack/
[2]: https://www.openstack.org
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/datadog_checks/openstack_controller/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/assets/service_checks.json
[9]: https://docs.datadoghq.com/ko/help/
[10]: https://www.datadoghq.com/blog/openstack-controller-integration/