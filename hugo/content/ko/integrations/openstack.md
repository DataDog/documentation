---
app_id: openstack
categories:
- cloud
- log collection
- network
- provisioning
- configuration & deployment
custom_kind: 통합
description: 하이퍼바이저 및 VM 수준 리소스 사용량과 Neutron 메트릭을 추적합니다.
further_reading:
- link: https://www.datadoghq.com/blog/openstack-monitoring-nova
  tag: 블로그
  text: OpenStack Nova 모니터링
- link: https://www.datadoghq.com/blog/install-openstack-in-two-commands
  tag: 블로그
  text: 개발 및 테스트용 명령 2개로 OpenStack 설치
- link: https://www.datadoghq.com/blog/openstack-host-aggregates-flavors-availability-zones
  tag: 블로그
  text: 'OpenStack: 호스트 집계, 플레이버 및 가용성 영역'
integration_version: 4.0.1
media: []
supported_os:
- linux
- windows
- macos
title: OpenStack(레거시)
---
![OpenStack 기본 대시보드](https://raw.githubusercontent.com/DataDog/integrations-core/master/openstack/images/openstack_dashboard.png)

## 개요

**참고**: 이 통합은 OpenStack v12 이하에만 적용됩니다. OpenStack v13 이상에서 메트릭을 수집하려면 [OpenStack Controller 통합](https://docs.datadoghq.com/integrations/openstack_controller)을 사용합니다.

OpenStack 서비스에서 실시간으로 메트릭을 받아 다음을 수행할 수 있습니다.

- OpenStack 상태를 시각화 및 모니터링합니다.
- OpenStack 실패 복구 및 이벤트에 대한 알림을 받습니다.

## 설정

### 설치

OpenStack 메트릭을 캡처하려면 [에이전트를 설치합니다](https://app.datadoghq.com/account/settings/agent/latest) on your hosts running hypervisors.

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

1. Datadog Agent가 Keystone 서버에 연결하도록 설정하고 모니터할 개별 프로젝트를 지정하려면 [Agent 설정 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory)의 루트에 있는 `conf.d/` 폴더의 `openstack.d/conf.yaml` 파일을 편집합니다. 이때 아래의 설정을 따릅니다. 모든 가용 설정 옵션을 보려면 [샘플 openstack.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/openstack/datadog_checks/openstack/data/conf.yaml.example)을 참조하세요.

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

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### 로그 수집

1. Datadog 에이전트에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화할 수 있습니다.

   ```yaml
   logs_enabled: true
   ```

1. Openstack 로그 수집을 시작하려면 `openstack.d/conf.yaml` 파일에 설정 블록을 추가하세요.

   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: openstack
   ```

   `path` 파라미터 값을 변경하고 환경에 맞게 설정합니다. 모든 가용 설정 옵션은 [샘플 openstack.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/openstack/datadog_checks/openstack/data/conf.yaml.example)을 참조하세요.

### 검증

[Agent의 상태 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 점검 섹션 아래에서 `openstack`을 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **openstack.nova.current_workload**<br>(게이지) | Nova 하이퍼바이저의 현재 워크로드|
| **openstack.nova.disk_available_least**<br>(게이지) | Nova 하이퍼바이저에서 사용 가능한 디스크<br>_기가바이트로 표시_ |
| **openstack.nova.free_disk_gb**<br>(게이지) | Nova 하이퍼바이저의 빈 디스크<br>_기가바이트로 표시_ |
| **openstack.nova.free_ram_mb**<br>(게이지) | Nova 하이퍼바이저의 빈 RAM<br>_메가바이트로 표시_ |
| **openstack.nova.hypervisor_load.1**<br>(게이지) | 1분 동안의 평균 하이퍼바이저 로드입니다. |
| **openstack.nova.hypervisor_load.15**<br>(게이지) | 15분 간의 평균 하이퍼바이저 로드입니다.|
| **openstack.nova.hypervisor_load.5**<br>(게이지) | 5분 간의 평균 하이퍼바이저 로드입니다.|
| **openstack.nova.limits.max_image_meta**<br>(게이지) | 이 테넌트에 최대로 허용된 이미지 메타데이터 정의|
| **openstack.nova.limits.max_personality**<br>(게이지) | 이 테넌트에 최대로 허용된 퍼스낼리티 수|
| **openstack.nova.limits.max_personality_size**<br>(게이지) | 이 테넌트에 허용된 단일 퍼스낼리티 최대 크기|
| **openstack.nova.limits.max_security_group_rules**<br>(게이지) | 이 테넌트에 허용된 보안 그룹 규칙의 최대 숫자|
| **openstack.nova.limits.max_security_groups**<br>(게이지) | 이 테넌트에 허용된 보안 그룹 최대 숫자|
| **openstack.nova.limits.max_server_meta**<br>(게이지) | 이 테넌트의 최대 허용 서비스 메타데이터 정의|
| **openstack.nova.limits.max_total_cores**<br>(게이지) | 이 테넌트의 최대 허용 코어|
| **openstack.nova.limits.max_total_floating_ips**<br>(게이지) | 이 테넌트의 최대 허용 플로팅 IP|
| **openstack.nova.limits.max_total_instances**<br>(게이지) | 이 테넌트에 허용된 최대 인스턴스 수|
| **openstack.nova.limits.max_total_keypairs**<br>(게이지) | 이 테넌트에 허용된 최대 허용 키 페어|
| **openstack.nova.limits.max_total_ram_size**<br>(게이지) | 이 테넌트의 최대 허용 RAM 크기(메가바이트(MB)<br>_메가바이트로 표시_ |
| **openstack.nova.limits.total_cores_used**<br>(게이지) | 이 테넌트에서 사용된 총 코어|
| **openstack.nova.limits.total_floating_ips_used**<br>(게이지) | 이 테넌트에서 사용된 플로팅 IP|
| **openstack.nova.limits.total_instances_used**<br>(게이지) | 이 테넌트에서 사용된 총 인스턴스|
| **openstack.nova.limits.total_ram_used**<br>(게이지) | 이 테넌트에서 사용된 현재 RAM(메가바이트(MB))<br>_메가바이트로 표시_ |
| **openstack.nova.limits.total_security_groups_used**<br>(게이지) | 이 테넌트에서 사용된 보안 그룹 총 개수|
| **openstack.nova.local_gb**<br>(게이지) | 이 하이퍼바이저 호스트에 존재하는 임시 디스크 크기(GB)<br>_기가바이트로 표시_ |
| **openstack.nova.local_gb_used**<br>(게이지) | 이 하이퍼바이저 호스트에서 사용된 디스크 크기(GB)<br>_기가바이트로 표시_ |
| **openstack.nova.memory_mb**<br>(게이지) | 이 하이퍼바이저 호스트에 있는 RAM 크기(MB)<br>_메가바이트로 표시_ |
| **openstack.nova.memory_mb_used**<br>(게이지) | 이 하이퍼바이저 호스트에서 사용된 RAM 크기(MB)<br>_메가바이트로 표시_ |
| **openstack.nova.running_vms**<br>(게이지) | 이 하이퍼바이저에서 실행되는 VM 개수|
| **openstack.nova.server.cpu0_time**<br>(게이지) | 이 가상 CPU의 CPU 시간(나노초)<br>_나노초로 표시_ |
| **openstack.nova.server.hdd_errors**<br>(게이지) | HDD 디바이스 액세스 시 서버에서 확인된 오류 개수|
| **openstack.nova.server.hdd_read**<br>(게이지) | 이 서버에서 HDD 디바이스를 통해 읽은 바이트 수<br>_바이트로 표시_ |
| **openstack.nova.server.hdd_read_req**<br>(게이지) | 이 서버에서 HDD 디바이스에 요청한 읽기 개수|
| **openstack.nova.server.hdd_write**<br>(게이지) | 이 서버에서 HDD 디바이스에 쓴 바이트 수<br>_바이트로 표시_ |
| **openstack.nova.server.hdd_write_req**<br>(게이지) | 이 서버에서 HDD 디바이스에 요청한 쓰기 개수|
| **openstack.nova.server.memory**<br>(게이지) | 이 서버에서 프로비저닝한 메모리 크기(MB)<br>_메가바이트로 표시_ |
| **openstack.nova.server.memory_actual**<br>(게이지) | 이 서버에서 프로비저닝한 메모리 크기(MB)<br>_메가바이트로 표시_ |
| **openstack.nova.server.memory_rss**<br>(게이지) | 스택 및 힙 메모리 등 디스크 페이지와 관련 없는 이 서버 프로세스에서 사용된 메모리 크기<br>_메가바이트로 표시_ |
| **openstack.nova.server.vda_errors**<br>(게이지) | VDA 디바이스 액세스 시 서버에서 확인된 오류 개수|
| **openstack.nova.server.vda_read**<br>(게이지) | 이 서버에서 VDA 디바이스를 통해 읽은 바이트 수<br>_바이트로 표시_ |
| **openstack.nova.server.vda_read_req**<br>(게이지) | 이 서버에서 VDA 디바이스에 요청한 읽기 개수|
| **openstack.nova.server.vda_write**<br>(게이지) | 이 서버에서 VDA 디바이스에 쓴 바이트 수<br>_바이트로 표시_ |
| **openstack.nova.server.vda_write_req**<br>(게이지) | 이 서버에서 VDA 디바이스에 요청한 쓰기 개수|
| **openstack.nova.vcpus**<br>(게이지) | 이 하이퍼바이저 호스트에서 사용 가능한 vCPU 개수|
| **openstack.nova.vcpus_used**<br>(게이지) | 이 하이퍼바이저 호스트에서 사용된 vCPU 개수|

### 이벤트

OpenStack 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

**openstack.neutron.api.up**

Agent가 Neutron API에 쿼리할 수 없는 경우 `CRITICAL`이 반환됩니다. Keystone API에 문제가 있는 경우 `UNKNOWN`이 반환되며, 그 외 경우에는 `OK`가 반환됩니다.

_상태: ok, critical, unknown_

**openstack.nova.api.up**

Agent가 Nova API에 쿼리할 수 없는 경우 `CRITICAL`이 반환됩니다. Keystone API에 문제가 있는 경우 이 반환되며, 그 외 경우에는 `OK`가 반환됩니다.

_상태: ok, critical, unknown_

**openstack.keystone.api.up**

Agent가 Keystone API에 쿼리할 수 없는 경우 `CRITICAL`이 반환되며, 그 외 경우에는 `OK`가 반환됩니다.

_상태: ok, critical_

**openstack.nova.hypervisor.up**

Agent가 하이퍼바이저 상태를 가져올 수 없는 경우 `UNKNOWN`이 반환됩니다. 하이퍼바이저가 중단된 경우 `CRITICAL`이 반환되며 그 외의 경우에는 `OK`가 반환됩니다.

_상태: ok, critical, unknown_

**openstack.neutron.network.up**

Agent가 네트워크 상태를 가져올 수 없는 경우 `UNKNOWN`이 반환됩니다. 네트워크가 중단된 경우 `CRITICAL`이 반환되며, 그 외의 경우에는 `OK`가 반환됩니다.

_상태: ok, critical, unknown_

## 트러블슈팅

도움이 필요하세요? [Datadog 고객지원팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [OpenStack Nova 모니터링](https://www.datadoghq.com/blog/openstack-monitoring-nova)
- [개발 및 테스트용 명령 2개로 OpenStack 설치](https://www.datadoghq.com/blog/install-openstack-in-two-commands)
- [OpenStack: 호스트 집계, 플레이버 및 가용 영역](https://www.datadoghq.com/blog/openstack-host-aggregates-flavors-availability-zones)