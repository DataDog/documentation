---
app_id: openstack
app_uuid: 38f1f51e-9f6a-49fc-84d5-358bde9e3782
assets:
  dashboards:
    openstack: assets/dashboards/openstack_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: openstack.nova.hypervisor_load.1
      metadata_path: metadata.csv
      prefix: openstack.
    process_signatures:
    - stack.sh
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 125
    source_type_name: OpenStack
  saved_views:
    openstack_processes: assets/saved_views/openstack_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- log collection
- network
- provisioning
- configuration & deployment
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/openstack/README.md
display_on_public_website: true
draft: false
git_integration_title: openstack
integration_id: openstack
integration_title: OpenStack (레거시)
integration_version: 4.0.0
is_public: true
manifest_version: 2.0.0
name: openstack
public_title: OpenStack (레거시)
short_description: 하이퍼바이저 및 VM 수준 리소스 사용량과 Neutron 메트릭을 추적합니다.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Log Collection
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Provisioning
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
    url: https://www.datadoghq.com/blog/openstack-monitoring-nova
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/install-openstack-in-two-commands
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/openstack-host-aggregates-flavors-availability-zones
  support: README.md#Support
  title: OpenStack (레거시)
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![OpenStack 기본값 대시보드][1]

## 개요

**참고**: 본 통합은 OpenStack v12 이하에만 적용됩니다. OpenStack v13 이상에서 메트릭을 수집하려면 [OpenStack 컨트롤러 통합][2]를 사용하세요.

OpenStack 서비스에서 실시간으로 메트릭을 받아 다음을 수행할 수 있습니다.

- OpenStack 상태를 시각화 및 모니터링합니다.
- OpenStack 실패 복구 및 이벤트에 대한 알림을 받습니다.

## 설정

### 설치

OpenStack 메트릭을 캡처하려면 하이퍼바이저를 실행 중인 호스트에 [에이전트에 설치하세요][3].

### 설정

#### OpenStack 준비

다음과 같이 ID 서버로 Datadog 역할과 사용자를 설정합니다.

```console
openstack role create datadog_monitoring
openstack user create datadog \
    --password my_password \
    --project my_project_name
openstack role add datadog_monitoring \
    --project my_project_name \
    --user datadog
```

그런 다음 `policy.json` 파일을 업데이트하여 필요한 권한을 부여합니다. `role:datadog_monitoring`에는 다음 작업에 대한 액세스 권한이 필요합니다.

**Nova**

```json
{
  "compute_extension": "aggregates",
  "compute_extension": "hypervisors",
  "compute_extension": "server_diagnostics",
  "compute_extension": "v3:os-hypervisors",
  "compute_extension": "v3:os-server-diagnostics",
  "compute_extension": "availability_zone:detail",
  "compute_extension": "v3:availability_zone:detail",
  "compute_extension": "used_limits_for_admin",
  "os_compute_api:os-aggregates:index": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-aggregates:show": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-hypervisors": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-server-diagnostics": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-used-limits": "rule:admin_api or role:datadog_monitoring"
}
```

**Neutron**

```json
{
  "get_network": "rule:admin_or_owner or rule:shared or rule:external or rule:context_is_advsvc or role:datadog_monitoring"
}
```

**Keystone**

```json
{
  "identity:get_project": "rule:admin_required or project_id:%(target.project.id)s or role:datadog_monitoring",
  "identity:list_projects": "rule:admin_required or role:datadog_monitoring"
}
```

정책 변경 사항이 적용되었는지 확인하려면 Keystone, Neutron, Nova API 서비스를 다시 시작해야 할 수도 있습니다.

**참고**: OpenStack 통합을 설치하면 Datadog이 모니터링하는 VM 수가 증가할 수 있습니다. 빌링에 미치는 영향에 대한 자세한 내용을 확인하려면 빌링 FAQ을 참조하세요.

#### 에이전트 설정

1. Datadog 에이전트를 설정하여 Keystone 서버에 연결하고, 개별 프로젝트를 모니터링하도록 지정합니다. 아래 설정으로 [에이전트 설정 디렉토리][4] 루트에 있는 `conf.d/` 폴더의 `openstack.d/conf.yaml` 파일을 수정하세요. 사용 가능한 모든 설정 옵션을 보려면 [ openstack.d/conf.yaml 샘플][5]을 참조하세요.

   ```yaml
   init_config:
     ## @param keystone_server_url - string - required
     ## Where your identity server lives.
     ## Note that the server must support Identity API v3
     #
     keystone_server_url: "https://<KEYSTONE_SERVER_ENDPOINT>:<PORT>/"

   instances:
     ## @param name - string - required
     ## Unique identifier for this instance.
     #
     - name: "<INSTANCE_NAME>"

       ## @param user - object - required
       ## User credentials
       ## Password authentication is the only auth method supported.
       ## `user` object expects the parameter `username`, `password`,
       ## and `user.domain.id`.
       ##
       ## `user` should resolve to a structure like:
       ##
       ##  {'password': '<PASSWORD>', 'name': '<USERNAME>', 'domain': {'id': '<DOMAINE_ID>'}}
       #
       user:
         password: "<PASSWORD>"
         name: datadog
         domain:
           id: "<DOMAINE_ID>"
   ```

2. [에이전트를 재시작합니다][6].

##### 로그 수집

1. Datadog 에이전트에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화할 수 있습니다.

   ```yaml
   logs_enabled: true
   ```

2. Openstack 로그 수집을 시작하려면 `openstack.d/conf.yaml` 파일에 설정 블록을 추가하세요.

   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: openstack
   ```

    `path` 파라미터 값을 변경하고 환경에 맞게 설정하세요. 사용 가능한 모든 설정 옵션은 [openstack.d/conf.yaml 샘플][5]을 참조하세요.


### 검증

[에이전트 상태 하위 명령을 실행하고][7] 점검 섹션에서 `openstack`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "openstack" >}}


### 이벤트

OpenStack 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "openstack" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [OpenStack Nova 모니터링하기][11]
- [개발 및 테스트용 명령 두 가지로 OpenStack 설치하기][12]
- [OpenStack: 집계, 작업, 가용 영역 호스팅][13]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/openstack/images/openstack_dashboard.png
[2]: https://docs.datadoghq.com/ko/integrations/openstack_controller
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/openstack/datadog_checks/openstack/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/openstack/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/openstack/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/
[11]: https://www.datadoghq.com/blog/openstack-monitoring-nova
[12]: https://www.datadoghq.com/blog/install-openstack-in-two-commands
[13]: https://www.datadoghq.com/blog/openstack-host-aggregates-flavors-availability-zones