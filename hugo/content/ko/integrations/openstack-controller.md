---
aliases:
- /ko/integrations/openstack_controller
app_id: openstack-controller
categories:
- cloud
- log collection
- provisioning
- orchestration
- configuration & deployment
custom_kind: integration
description: 하이퍼바이저 및 VM 수준 리소스 사용량과 Neutron 메트릭을 추적합니다.
further_reading:
- link: https://www.datadoghq.com/blog/openstack-controller-integration/
  tag: 블로그
  text: Datadog을 사용한 OpenStack 컴포넌트 모니터링
integration_version: 9.0.0
media: []
supported_os:
- linux
- macos
- 윈도우즈(Windows)
title: OpenStack Controller
---
## 개요

**참고**: 이 통합은 OpenStack v13+에만 적용됩니다. OpenStack v12 이하에서 메트릭을 수집하려면 [OpenStack 통합](https://docs.datadoghq.com/integrations/openstack/)을 사용합니다.

본 점검은 컨트롤러 노드에서 [OpenStack](https://www.openstack.org)을 모니터링합니다.

## 설정

### 설치

OpenStack Controller 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있으므로 서버에 별도로 설치할 필요가 없습니다.

### 설정

OpenStack Controller 통합은 모든 컴퓨팅 노드와 이를 실행하는 서버로부터 정보를 수집하도록 설계되었습니다. 통합은 단일 에이전트에서 실행되어 OpenStack 환경을 모니터링하며, 컨트롤러 노드 또는 Keystone, Nova, Neutron, Cinder, Ironic, Octavia 엔드포인트에 액세스할 수 있는 인접 서버에 배포할 수 있습니다.

#### OpenStack 준비

`openstack_controller.d/conf.yaml` 파일에 사용되는 `datadog` 사용자를 생성합니다. 이 사용자는 환경 전반의 읽기 전용 권한이 필요한데, 그래야 단일 노드에서 실행되고 모든 노드 및 서버의 상위 시스템 정보를 읽을 수 있습니다.

#### 에이전트 설정

1. Agent의 구성 디렉터리 루트에서 `conf.d/` 폴더의 `openstack_controller.d/conf.yaml` 파일을 편집해 OpenStack Controller 성능 데이터 수집을 시작합니다. 모든 가용 구성 옵션을 보려면 [샘플 openstack_controller.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/openstack_controller/datadog_checks/openstack_controller/data/conf.yaml.example)을 참조하세요.

   ```yaml
   init_config:

   instances:
     - keystone_server_url: "<AUTH_URL>"
       password: "<PASSWORD>"
       username: "<USER_NAME>"
       domain_id: "<DOMAIN_ID>"
   ```

1. [Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) 다시 시작하기

**참고**: 통합을 v5.0.0 이하에서 v6.0.0 이상으로 업그레이드하는 경우, `use_legacy_check_version` 플래그를 활성화해야 최신 기능을 사용할 수 있습니다. 아울러, 호환성을 유지하기 위해 설정을 변경해야 할 수도 있습니다. 자세한 내용은 [openstack controller.d/conf.yaml 샘플](https://github.com/DataDog/integrations-core/blob/master/openstack_controller/datadog_checks/openstack_controller/data/conf.yaml.example)을 참조하세요.  

##### 로그 수집

1. Datadog 에이전트에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화할 수 있습니다.

   ```yaml
   logs_enabled: true
   ```

1. Openstack 로그 수집을 시작하려면 `openstack_controller.d/conf.yaml` 파일에 설정 블록을 추가하세요.

   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: openstack
   ```

   `path` 파라미터 값을 변경하고 환경에 맞게 설정합니다. 모든 가용 설정 옵션은 [샘플 openstack_controller.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/openstack_controller/datadog_checks/openstack_controller/data/conf.yaml.example)을 참조하세요.

### 검증

[Agent `status` 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `openstack_controller`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **openstack.cinder.cluster.count** <br>(gauge) | Cinder 클러스터 수|
| **openstack.cinder.cluster.num_down_hosts** <br>(gauge) | 다운된 Cinder 클러스터 수|
| **openstack.cinder.cluster.num_hosts** <br>(gauge) | Cinder 클러스터 호스트 수|
| **openstack.cinder.pool.capabilities.free_capacity_gb** <br>(gauge) | 백엔드 볼륨의 여유 용량|
| **openstack.cinder.pool.capabilities.reserved_percentage** <br>(gauge) | 내부용으로 예약된 CPU 사용량 백분율<br>_percent로 표시_ |
| **openstack.cinder.pool.capabilities.total_capacity_gb** <br>(gauge) | 백엔드 볼륨의 총 용량|
| **openstack.cinder.pool.count** <br>(gauge) | Cinder 풀 수|
| **openstack.cinder.response_time** <br>(gauge) | Cinder 엔드포인트에 요청 시 HTTP 요청이 완료되는 데 걸리는 시간<br>_millisecond로 표시_ |
| **openstack.cinder.snapshot.count** <br>(gauge) | Cinder 스냅샷 수|
| **openstack.cinder.snapshot.size** <br>(gauge) | Cinder 스냅샷 크기|
| **openstack.cinder.volume.count** <br>(gauge) | Cinder 볼륨 수|
| **openstack.cinder.volume.size** <br>(gauge) | Cinder 볼륨 크기|
| **openstack.cinder.volume.transfer.count** <br>(gauge) | Cinder 볼륨 전송 수|
| **openstack.glance.image.count** <br>(gauge) | 퍼블릭 가상 머신 이미지 수|
| **openstack.glance.image.member.count** <br>(gauge) | 이미지와 연결된 멤버 수|
| **openstack.glance.image.size** <br>(gauge) | 이미지 파일 크기(바이트)|
| **openstack.glance.image.up** <br>(gauge) | Glance 이미지 활성화 여부|
| **openstack.glance.response_time** <br>(gauge) | Glance 엔드포인트에 요청 시 HTTP 요청이 완료되는 데 걸리는 시간<br>_millisecond로 표시_ |
| **openstack.heat.response_time** <br>(gauge) | Heat 엔드포인트에 요청 시 HTTP 요청이 완료되는 데 걸리는 시간<br>_millisecond로 표시_ |
| **openstack.heat.stack.count** <br>(gauge) | 퍼블릭 가상 머신 스택 수|
| **openstack.ironic.allocation.count** <br>(gauge) | Ironic 할당 수|
| **openstack.ironic.conductor.count** <br>(gauge) | Ironic 컨덕터 수|
| **openstack.ironic.conductor.up** <br>(gauge) | Ironic 컨덕터 활성화 여부|
| **openstack.ironic.driver.count** <br>(gauge) | Ironic 드라이버 수|
| **openstack.ironic.node.count** <br>(gauge) | Ironic 노드 수|
| **openstack.ironic.node.portgroup.count** <br>(gauge) | 노드와 연결된 포트 그룹 수|
| **openstack.ironic.node.up** <br>(gauge) | Ironic 노드 활성화 여부|
| **openstack.ironic.port.count** <br>(gauge) | 포트 수|
| **openstack.ironic.response_time** <br>(gauge) | Ironic 엔드포인트에 요청 시 HTTP 요청이 완료되는 데 걸리는 시간<br>_millisecond로 표시_ |
| **openstack.ironic.volume.connector.count** <br>(gauge) | 볼륨 커넥터 수|
| **openstack.ironic.volume.target.count** <br>(gauge) | 볼륨 타겟 수|
| **openstack.keystone.domain.count** <br>(gauge) | Openstack 배포의 도메인 수|
| **openstack.keystone.domain.enabled** <br>(gauge) | 1로 설정하면 도메인이 활성화되고, 0으로 설정하면 비활성화됩니다.|
| **openstack.keystone.group.count** <br>(gauge) | Openstack 배포의 그룹 수|
| **openstack.keystone.group.users** <br>(gauge) | Openstack 배포 그룹의 사용자 수|
| **openstack.keystone.limit.limit** <br>(gauge) | keystone Openstack 리소스 통합 한도 값|
| **openstack.keystone.project.count** <br>(gauge) | Openstack 배포의 프로젝트 수|
| **openstack.keystone.project.enabled** <br>(gauge) | 1로 설정하면 프로젝트가 활성화되고, 0으로 설정하면 비활성화됩니다.|
| **openstack.keystone.region.count** <br>(gauge) | Openstack 배포의 리전 수|
| **openstack.keystone.response_time** <br>(gauge) | Keystone 엔드포인트에 요청 시 HTTP 요청이 완료되는 데 걸리는 시간<br>_millisecond로 표시_ |
| **openstack.keystone.service.count** <br>(gauge) | Openstack 배포의 keystone 서비스 수|
| **openstack.keystone.service.enabled** <br>(gauge) | 1로 설정하면 서비스가 활성화되고, 0으로 설정하면 비활성화됩니다.|
| **openstack.keystone.user.count** <br>(gauge) | Openstack 배포의 사용자 수|
| **openstack.keystone.user.enabled** <br>(gauge) | 1로 설정하면 사용자가 활성화되고, 0으로 설정하면 비활성화됩니다.|
| **openstack.neutron.agent.admin_state_up** <br>(gauge) | Agent 관리 상태입니다.|
| **openstack.neutron.agent.alive** <br>(gauge) | Agent가 정상 상태이며 실행 중인지 여부입니다.|
| **openstack.neutron.agent.count** <br>(gauge) | 네트워크 Agent 수|
| **openstack.neutron.network.admin_state_up** <br>(gauge) | 네트워크 관리 상태(업 또는 다운 상태)|
| **openstack.neutron.network.count** <br>(gauge) | 총 네트워크 수|
| **openstack.neutron.network.is_default** <br>(gauge) | 해당 네트워크가 기본 풀인지 여부입니다.|
| **openstack.neutron.network.l2_adjacency** <br>(gauge) | 네트워크 전반에서 L2 연결을 사용할 수 있는지 여부를 나타냅니다.|
| **openstack.neutron.network.mtu** <br>(gauge) | 조각화를 해결하기 위한 최대 전송 단위(MTU) 값입니다. 최솟값은 IPv4의 경우 68, IPv6의 경우 1280입니다.|
| **openstack.neutron.network.port_security_enabled** <br>(gauge) | 네트워크의 포트 보안 상태입니다. 유효한 값은 활성화 및 비활성화입니다.|
| **openstack.neutron.network.shared** <br>(gauge) | 이 네트워크가 모든 테넌트에서 공유되는지 여부를 나타냅니다. 기본적으로 관리자 권한이 있는 사용자만 해당 값을 변경할 수 있습니다.|
| **openstack.neutron.network.vlan_transparent** <br>(gauge) | 네트워크의 VLAN 투명성 모드(VLAN 투명성 지원 또는 VLAN 투명성 미지원)를 나타냅니다.|
| **openstack.neutron.quota.floatingip** <br>(gauge) | 각 프로젝트에 허용되는 플로팅 IP 주소의 수입니다. 값이 -1이면 제한 없음을 의미합니다.|
| **openstack.neutron.quota.network** <br>(gauge) | 각 프로젝트에 허용되는 네트워크의 수입니다. 값이 -1이면 제한 없음을 의미합니다.|
| **openstack.neutron.quota.port** <br>(gauge) | 각 프로젝트에 허용되는 포트의 수입니다. 값이 -1이면 제한 없음을 의미합니다.|
| **openstack.neutron.quota.rbac_policy** <br>(gauge) | 각 프로젝트에 허용되는 역할 기반 액세스 컨트롤(RBAC) 정책의 수입니다. 값이 -1이면 제한 없음을 의미합니다.|
| **openstack.neutron.quota.router** <br>(gauge) | 각 프로젝트에 허용되는 라우터의 수입니다. 값이 -1이면 제한 없음을 의미합니다.|
| **openstack.neutron.quota.security_group** <br>(gauge) | 각 프로젝트에 허용되는 보안 그룹의 수입니다. 값이 -1이면 제한 없음을 의미합니다.|
| **openstack.neutron.quota.security_group_rule** <br>(gauge) | 각 프로젝트에 허용되는 보안 그룹 규칙의 수입니다. 값이 -1이면 제한 없음을 의미합니다.|
| **openstack.neutron.quota.subnet** <br>(gauge) | 각 프로젝트에 허용되는 서브넷의 수입니다. 값이 -1이면 제한 없음을 의미합니다.|
| **openstack.neutron.quota.subnetpool** <br>(gauge) | 각 프로젝트에 허용되는 서브넷 풀의 수입니다. 값이 -1이면 제한 없음을 의미합니다.|
| **openstack.neutron.response_time** <br>(gauge) | Neutron 엔드포인트에 요청 시 HTTP 요청이 완료되는 데 걸리는 시간<br>_millisecond로 표시_ |
| **openstack.nova.current_workload** <br>(gauge) | Nova 하이퍼바이저의 현재 워크로드 \[Legacy\]|
| **openstack.nova.disk_available_least** <br>(gauge) | Nova 하이퍼바이저에서 사용 가능한 디스크 \[Legacy\]<br>_gibibyte로 표시_ |
| **openstack.nova.flavor.disk** <br>(gauge) | 생성될 루트 디스크의 크기(GiB)<br>_gibibyte로 표시_ |
| **openstack.nova.flavor.ram** <br>(gauge) | 플레이버의 RAM 용량(MiB)<br>_mebibyte로 표시_ |
| **openstack.nova.flavor.rxtx_factor** <br>(gauge) | 네트워크 백엔드가 QOS 확장을 지원하는 경우 포트에 설정할 수신/송신 계수(플로트)입니다.|
| **openstack.nova.flavor.swap** <br>(gauge) | 할당될 전용 스왑 디스크의 크기입니다(MiB). 0(기본값)이면 전용 스왑 디스크가 생성되지 않습니다.|
| **openstack.nova.flavor.vcpus** <br>(gauge) | 서버에 할당될 가상 CPU 수.<br>_mebibyte로 표시_ |
| **openstack.nova.free_disk_gb** <br>(gauge) | Nova 하이퍼바이저의 여유 디스크 \[Legacy\]<br>_gibibyte로 표시_ |
| **openstack.nova.free_ram_mb** <br>(gauge) | Nova 하이퍼바이저의 여유 RAM \[Legacy\]<br>_mebibyte로 표시_ |
| **openstack.nova.hypervisor.count** <br>(gauge) | 하이퍼바이저 수|
| **openstack.nova.hypervisor.current_workload** <br>(gauge) | 하이퍼바이저가 담당하는 작업의 수|
| **openstack.nova.hypervisor.disk_available_least** <br>(gauge) | 이 하이퍼바이저의 실제 사용 가능한 디스크<br>_gigabyte로 표시_ |
| **openstack.nova.hypervisor.free_disk_gb** <br>(gauge) | 이 하이퍼바이저의 남아 있는 여유 디스크<br>_gigabyte로 표시_ |
| **openstack.nova.hypervisor.free_ram_mb** <br>(gauge) | 이 하이퍼바이저의 여유 RAM<br>_megabyte로 표시_ |
| **openstack.nova.hypervisor.load_1** <br>(gauge) | 이 하이퍼바이저 시스템의 1분 로드 평균|
| **openstack.nova.hypervisor.load_15** <br>(gauge) | 이 하이퍼바이저 시스템의 15분 로드 평균|
| **openstack.nova.hypervisor.load_5** <br>(gauge) | 이 하이퍼바이저 시스템의 5분 로드 평균|
| **openstack.nova.hypervisor.local_gb** <br>(gauge) | 이 하이퍼바이저의 디스크<br>_gigabyte로 표시_ |
| **openstack.nova.hypervisor.local_gb_used** <br>(gauge) | 이 하이퍼바이저에서 사용된 디스크<br>_gigabyte로 표시_ |
| **openstack.nova.hypervisor.memory_mb** <br>(gauge) | 이 하이퍼바이저의 메모리<br>_megabyte로 표시_ |
| **openstack.nova.hypervisor.memory_mb_used** <br>(gauge) | 이 하이퍼바이저에서 사용된 메모리<br>_megabyte로 표시_ |
| **openstack.nova.hypervisor.running_vms** <br>(gauge) | 이 하이퍼바이저에서 실행 중인 VM 수|
| **openstack.nova.hypervisor.up** <br>(gauge) | 1로 설정하면 하이퍼바이저가 활성화되고, 0으로 설정하면 비활성화됩니다.|
| **openstack.nova.hypervisor.vcpus** <br>(gauge) | 이 하이퍼바이저의 vCPU 수|
| **openstack.nova.hypervisor.vcpus_used** <br>(gauge) | 이 하이퍼바이에서 사용된 vCPU 수|
| **openstack.nova.hypervisor_load.1** <br>(gauge) | 1분 동안의 하이퍼바이저 평균 로드입니다. \[Legacy\]|
| **openstack.nova.hypervisor_load.15** <br>(gauge) | 15분 동안의 하이퍼바이저 평균 로드입니다. \[Legacy\]|
| **openstack.nova.hypervisor_load.5** <br>(gauge) | 5분 동안의 하이퍼바이저 평균 로드입니다. \[Legacy\]|
| **openstack.nova.limit.absolute.max_image_meta** <br>(gauge) | 각 이미지에 허용되는 메타데이터 항목 수|
| **openstack.nova.limit.absolute.max_personality** <br>(gauge) | 각 테넌트에 허용되는 주입 파일 수|
| **openstack.nova.limit.absolute.max_personality_size** <br>(gauge) | 주입된 각 파일에 허용된 콘텐츠 바이트 수<br>_byte로 표시_ |
| **openstack.nova.limit.absolute.max_security_group_rules** <br>(gauge) | 각 보안 그룹에 허용되는 규칙 수|
| **openstack.nova.limit.absolute.max_security_groups** <br>(gauge) | 각 테넌트에 허용되는 보안 그룹 수|
| **openstack.nova.limit.absolute.max_server_group_members** <br>(gauge) | 각 서버 그룹에 허용되는 멤버 수|
| **openstack.nova.limit.absolute.max_server_groups** <br>(gauge) | 각 테넌트에 허용되는 서버 그룹 수|
| **openstack.nova.limit.absolute.max_server_meta** <br>(gauge) | 각 서버에 허용되는 메타데이터 항목 수|
| **openstack.nova.limit.absolute.max_total_cores** <br>(gauge) | 각 테넌트에 허용되는 서버 코어 수|
| **openstack.nova.limit.absolute.max_total_floating_ips** <br>(gauge) | 각 테넌트에 허용되는 플로팅 IP 주소 수|
| **openstack.nova.limit.absolute.max_total_instances** <br>(gauge) | 각 테넌트에 허용되는 서버 수|
| **openstack.nova.limit.absolute.max_total_keypairs** <br>(gauge) | 각 사용자에게 허용되는 키 쌍의 수|
| **openstack.nova.limit.absolute.max_total_ram_size** <br>(gauge) | 각 테넌트에 허용된 서버 RAM 용량<br>_megabyte로 표시_ |
| **openstack.nova.limit.absolute.total_cores_used** <br>(gauge) | 각 테넌트에 사용되는 서버 코어 수|
| **openstack.nova.limit.absolute.total_floating_ips_used** <br>(gauge) | 각 테넌트에 사용되는 플로팅 IP 주소 수|
| **openstack.nova.limit.absolute.total_instances_used** <br>(gauge) | 각 테넌트의 서버 수|
| **openstack.nova.limit.absolute.total_ram_used** <br>(gauge) | 각 테넌트에 사용되는 서버 RAM 용량<br>_megabyte로 표시_ |
| **openstack.nova.limit.absolute.total_security_groups_used** <br>(gauge) | 각 테넌트에 사용되는 보안 그룹 수|
| **openstack.nova.limit.absolute.total_server_groups_used** <br>(gauge) | 각 테넌트에 사용되는 서버 그룹 수|
| **openstack.nova.limits.max_image_meta** <br>(gauge) | 이 테넌트에 최대로 허용된 이미지 메타데이터 정의 \[Legacy\]|
| **openstack.nova.limits.max_personality** <br>(gauge) | 이 테넌트에 최대로 허용된 퍼스널리티 수 \[Legacy\]|
| **openstack.nova.limits.max_personality_size** <br>(gauge) | 이 테넌트에 허용된 단일 퍼스널리티의 최대 크기 \[Legacy\]|
| **openstack.nova.limits.max_security_group_rules** <br>(gauge) | 이 테넌트에 허용된 보안 그룹 규칙의 최대 수 \[Legacy\]|
| **openstack.nova.limits.max_security_groups** <br>(gauge) | 이 테넌트에 허용된 보안 그룹 규칙의 최대 수 \[Legacy\]|
| **openstack.nova.limits.max_server_meta** <br>(gauge) | 이 테넌트에 최대로 허용된 서비스 메타데이터 정의 \[Legacy\]|
| **openstack.nova.limits.max_total_cores** <br>(gauge) | 이 테넌트에 최대로 허용된 코어 수 \[Legacy\]|
| **openstack.nova.limits.max_total_floating_ips** <br>(gauge) | 이 테넌트에 최대로 허용된 플로팅 IP 수 \[Legacy\]|
| **openstack.nova.limits.max_total_instances** <br>(gauge) | 이 테넌트에 허용된 최대 인스턴스 수 \[Legacy\]|
| **openstack.nova.limits.max_total_keypairs** <br>(gauge) | 이 테넌트에 허용된 최대 키 쌍의 수 \[Legacy\]|
| **openstack.nova.limits.max_total_ram_size** <br>(gauge) | 이 테넌트의 최대 허용 RAM 크기(메가바이트(MB)) \[Legacy\]<br>_mebibyte로 표시_ |
| **openstack.nova.limits.total_cores_used** <br>(gauge) | 이 테넌트에서 사용된 총 코어 \[Legacy\]|
| **openstack.nova.limits.total_floating_ips_used** <br>(gauge) | 이 테넌트에서 사용된 총 플로팅 IP \[Legacy\]|
| **openstack.nova.limits.total_instances_used** <br>(gauge) | 이 테넌트에서 사용된 총 인스턴스 \[Legacy\]|
| **openstack.nova.limits.total_ram_used** <br>(gauge) | 이 테넌트에서 사용된 현재 RAM(메가바이트(MB)) \[Legacy\]<br>_mebibyte로 표시_ |
| **openstack.nova.limits.total_security_groups_used**<br>(gauge) | 이 테넌트에서 사용된 보안 그룹 총 개수 \[Legacy\]|
| **openstack.nova.local_gb**<br>(gauge) | 이 하이퍼바이저 호스트에 있는 임시 디스크 크기(GB) \[Legacy\]<br>_gibibyte로 표시_ |
| **openstack.nova.local_gb_used** <br>(gauge) | 이 하이퍼바이저 호스트에서 사용되는 디스크 크기(GB) \[Legacy\]<br>_gibibyte로 표시_ |
| **openstack.nova.memory_mb** <br>(gauge) | 이 하이퍼바이저 호스트에 있는 RAM 크기(MB) \[Legacy\]<br>_mebibyte로 표시_ |
| **openstack.nova.memory_mb_used** <br>(gauge) | 이 하이퍼바이저 호스트에서 사용되는 RAM 크기(MB) \[Legacy\]<br>_mebibyte로 표시_ |
| **openstack.nova.quota_set.cores** <br>(gauge) | 각 테넌트에 허용되는 서버 코어 수|
| **openstack.nova.quota_set.fixed_ips** <br>(gauge) | 각 테넌트에 허용되는 고정 IP 주소 수|
| **openstack.nova.quota_set.floating_ips** <br>(gauge) | 각 테넌트에 허용되는 플로팅 IP 주소 수|
| **openstack.nova.quota_set.injected_file_content_bytes** <br>(gauge) | 주입된 각 파일에 허용되는 콘텐츠 바이트 수|
| **openstack.nova.quota_set.injected_file_path_bytes** <br>(gauge) | 주입된 각 파일 경로에 허용되는 바이트 수|
| **openstack.nova.quota_set.injected_files** <br>(gauge) | 각 테넌트에 허용되는 주입 파일 수|
| **openstack.nova.quota_set.instances** <br>(gauge) | 각 테넌트에 허용되는 서버 수|
| **openstack.nova.quota_set.key_pairs** <br>(gauge) | 각 사용자에게 허용되는 키 쌍의 수|
| **openstack.nova.quota_set.metadata_items** <br>(gauge) | 각 서버에 허용되는 메타데이터 항목 수|
| **openstack.nova.quota_set.ram** <br>(gauge) | 각 테넌트에 허용된 서버 RAM 용량<br>_megabyte로 표시_ |
| **openstack.nova.quota_set.security_group_rules** <br>(gauge) | 각 보안 그룹에 허용되는 규칙 수|
| **openstack.nova.quota_set.security_groups** <br>(gauge) | 각 테넌트에 허용되는 보안 그룹 수|
| **openstack.nova.quota_set.server_group_members** <br>(gauge) | 각 서버 그룹에 허용되는 멤버 수|
| **openstack.nova.quota_set.server_groups** <br>(gauge) | 각 테넌트에 허용되는 서버 그룹 수|
| **openstack.nova.response_time** <br>(gauge) | Nova 엔드포인트에 요청 시 HTTP 요청이 완료되는 데 걸리는 시간<br>_millisecond로 표시_ |
| **openstack.nova.running_vms** <br>(gauge) | 이 하이퍼바이저 호스트에서 실행 중인 VM 수 \[Legacy\]|
| **openstack.nova.server.active** <br>(gauge) | 1로 설정된 경우 서버는 활성화 상태입니다|
| **openstack.nova.server.count** <br>(gauge) | 각 테넌트의 서버 수|
| **openstack.nova.server.cpu0_time** <br>(gauge) | 이 가상 CPU의 CPU 시간(나노초) \[Legacy\]<br>_nanosecond로 표시_ |
| **openstack.nova.server.diagnostic.cpu0_time** <br>(gauge) | 이 가상 CPU의 CPU 시간(나노초) \[Nova Microversion- default\]<br>_nanosecond로 표시_ |
| **openstack.nova.server.diagnostic.cpu_details.time** <br>(gauge) | CPU 시간(나노초) \[Nova Microversion >= 2.48\]<br>_nanosecond로 표시_ |
| **openstack.nova.server.diagnostic.cpu_details.utilisation** <br>(gauge) | CPU 활용률(퍼센트) \[Nova Microversion >= 2.48\]<br>_percent로 표시_ |
| **openstack.nova.server.diagnostic.disk_details.errors_count** <br>(gauge) | 디스크 오류 \[Nova Microversion >= 2.48\]|
| **openstack.nova.server.diagnostic.disk_details.read_bytes** <br>(gauge) | 디스크 읽기량(바이트) \[Nova Microversion >= 2.48\]<br>_byte로 표시_ |
| **openstack.nova.server.diagnostic.disk_details.read_requests** <br>(gauge) | 읽기 요청 수 \[Nova Microversion >= 2.48\]|
| **openstack.nova.server.diagnostic.disk_details.write_bytes** <br>(gauge) | 디스크 쓰기량(바이트) \[Nova Microversion >= 2.48\]<br>_byte로 표시_ |
| **openstack.nova.server.diagnostic.disk_details.write_requests** <br>(gauge) | 쓰기 요청 수 \[Nova Microversion >= 2.48\]|
| **openstack.nova.server.diagnostic.memory** <br>(gauge) | 이 서버에서 프로비저닝한 메모리 양(MB) \[Nova Microversion- default\]<br>_mebibyte로 표시_ |
| **openstack.nova.server.diagnostic.memory_actual** <br>(gauge) | 이 서버에서 프로비저닝한 메모리 양(MB) \[Nova Microversion- default\]<br>_mebibyte로 표시_ |
| **openstack.nova.server.diagnostic.memory_available** <br>(gauge) | \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.memory_details.maximum** <br>(gauge) | 이 VM에서 프로비저닝한 메모리 양(MiB) \[Nova Microversion >= 2.48\]<br>_mebibyte로 표시_ |
| **openstack.nova.server.diagnostic.memory_details.used** <br>(gauge) | 현재 게스트 운영 체제 및 해당 애플리케이션에서 사용 중인 메모리 양(MiB) \[Nova Microversion >= 2.48\].|
| **openstack.nova.server.diagnostic.memory_disk_caches** <br>(gauge) | \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.memory_hugetlb_pgalloc** <br>(gauge) | \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.memory_hugetlb_pgfail** <br>(gauge) | \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.memory_last_update** <br>(gauge) | \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.memory_major_fault** <br>(gauge) | \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.memory_minor_fault** <br>(gauge) | \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.memory_rss** <br>(gauge) | \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.memory_swap_in** <br>(gauge) | \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.memory_swap_out** <br>(gauge) | \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.memory_unused** <br>(gauge) | \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.memory_usable** <br>(gauge) | \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.nic_details.rx_drop** <br>(gauge) | 삭제된 수신 패킷 \[Nova Microversion >= 2.48\]|
| **openstack.nova.server.diagnostic.nic_details.rx_errors** <br>(gauge) | 수신 오류 \[Nova Microversion >= 2.48\]|
| **openstack.nova.server.diagnostic.nic_details.rx_octets** <br>(gauge) | 수신 옥텟 \[Nova Microversion >= 2.48\]|
| **openstack.nova.server.diagnostic.nic_details.rx_packets** <br>(gauge) | 수신 패킷 \[Nova Microversion >= 2.48\]|
| **openstack.nova.server.diagnostic.nic_details.rx_rate** <br>(gauge) | 수신 속도 \[Nova Microversion >= 2.48\]|
| **openstack.nova.server.diagnostic.nic_details.tx_drop** <br>(gauge) | 삭제된 패킷 송신 \[Nova Microversion >= 2.48\]|
| **openstack.nova.server.diagnostic.nic_details.tx_errors** <br>(gauge) | 송신 오류 \[Nova Microversion >= 2.48\]|
| **openstack.nova.server.diagnostic.nic_details.tx_octets** <br>(gauge) | 송신 옥텟 \[Nova Microversion >= 2.48\]|
| **openstack.nova.server.diagnostic.nic_details.tx_packets** <br>(gauge) | 전송 패킷 \[Nova Microversion >= 2.48\]|
| **openstack.nova.server.diagnostic.nic_details.tx_rate** <br>(gauge) | 송신율 \[Nova Microversion >= 2.48\]|
| **openstack.nova.server.diagnostic.num_cpus** <br>(gauge) | vCPU 수 \[Nova Microversion >= 2.48\]|
| **openstack.nova.server.diagnostic.num_disks** <br>(gauge) | 디스크 수 \[Nova Microversion >= 2.48\]|
| **openstack.nova.server.diagnostic.num_nics** <br>(gauge) | vNIC 수 \[Nova Microversion >= 2.48\]|
| **openstack.nova.server.diagnostic.rx** <br>(gauge) | 수신 속도 \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.rx_drop** <br>(gauge) | 삭제된 수신 패킷 \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.rx_errors** <br>(gauge) | 수신 오류 \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.rx_packets** <br>(gauge) | 수신 패킷 \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.tx** <br>(gauge) | 송신 속도 \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.tx_drop** <br>(gauge) | 삭제된 패킷 송신 \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.tx_errors** <br>(gauge) | 송신 오류 \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.tx_packets** <br>(gauge) | 송신 패킷 \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.uptime** <br>(gauge) | VM이 실행된 시간(초) \[Nova Microversion >= 2.48\]<br>_second로 표시_ |
| **openstack.nova.server.diagnostic.vda_errors** <br>(gauge) | VDA 디바이스 액세스 시 서버에서 확인된 오류 수 \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.vda_read** <br>(gauge) | 이 서버에서 VDA 디바이스를 통해 읽은 바이트 수 \[Nova Microversion- default\]<br>_byte로 표시_ |
| **openstack.nova.server.diagnostic.vda_read_req** <br>(gauge) | 이 서버에서 VDA 디바이스에 전송한 읽기 요청 수 \[Nova Microversion- default\]|
| **openstack.nova.server.diagnostic.vda_write** <br>(gauge) | 이 서버에서 VDA 디바이스를 통해 작성한 바이트 수 \[Nova Microversion- default\]<br>_byte로 표시_ |
| **openstack.nova.server.diagnostic.vda_write_req** <br>(gauge) | 이 서버에서 VDA 디바이스에 전송한 쓰기 요청 수 \[Nova Microversion- default\]|
| **openstack.nova.server.error** <br>(gauge) | 1로 설정된 경우 서버는 오류 상태입니다|
| **openstack.nova.server.flavor.disk** <br>(gauge) | 이 서버에서 생성된 루트 디스크의 크기(GiB)<br>_gibibyte로 표시_ |
| **openstack.nova.server.flavor.ephemeral** <br>(gauge) | 이 서버에서 생성된 임시 디스크의 크기(GiB)<br>_gibibyte로 표시_ |
| **openstack.nova.server.flavor.os_flv_ext_data_ephemeral** <br>(gauge) | 생성된 임시 디스크의 크기<br>_gibibyte로 표시_ |
| **openstack.nova.server.flavor.ram** <br>(gauge) | 이 서버 플레이버의 RAM 용량(MiB)<br>_mebibyte로 표시_ |
| **openstack.nova.server.flavor.rxtx_factor** <br>(gauge) | 수신/송신 계수|
| **openstack.nova.server.flavor.swap** <br>(gauge) | 이 서버에 할당된 전용 스왑 디스크의 크기(MiB)<br>_mebibyte로 표시_ |
| **openstack.nova.server.flavor.vcpus** <br>(gauge) | 이 서버에 할당된 가상 CPU 수|
| **openstack.nova.server.hdd_errors**<br>(측정) | HDD 디바이스 액세스 시 서버에서 확인된 오류 수 \[Legacy\]|
| **openstack.nova.server.hdd_read**<br>(측정) | 이 서버에서 HDD 디바이스를 통해 읽은 바이트 수 \[Legacy\]<br>_byte로 표시_ |
| **openstack.nova.server.hdd_read_req**<br>(측정) | 이 서버에서 HDD 디바이스에 전송한 읽기 요청 수 \[Legacy\]|
| **openstack.nova.server.hdd_write**<br>(측정) | 이 서버에서 HDD 디바이스에 작성한 바이트 수 \[Legacy\]<br>_byte로 표시_ |
| **openstack.nova.server.hdd_write_req**<br>(측정) | 이 서버에서 HDD 디바이스에 전송한 쓰기 요청 수 \[Legacy\]|
| **openstack.nova.server.memory**<br>(측정) | 이 서버에서 프로비저닝한 메모리 크기(MB) \[Legacy\]<br>_mebibyte로 표시_ |
| **openstack.nova.server.memory_actual**<br>(측정) | 이 서버에서 프로비저닝한 메모리 크기(MB) \[Legacy\]<br>_mebibyte로 표시_ |
| **openstack.nova.server.memory_rss**<br>(측정) | 스택 및 힙 메모리 등 디스크 페이지와 관련 없는 이 서버 프로세스에서 사용된 메모리 크기 \[Legacy\]<br>_mebibyte로 표시_ |
| **openstack.nova.server.vda_errors**<br>(측정) | VDA 디바이스 액세스 시 서버에서 확인된 오류 수 \[Legacy\]|
| **openstack.nova.server.vda_read**<br>(측정) | 이 서버에서 VDA 디바이스를 통해 읽은 바이트 수 \[Legacy\]<br>_byte로 표시_ |
| **openstack.nova.server.vda_read_req**<br>(측정) | 이 서버에서 VDA 디바이스에 전송한 읽기 요청 수 \[Legacy\]|
| **openstack.nova.server.vda_write**<br>(측정) | 이 서버에서 VDA 디바이스에 작성한 바이트 수 \[Legacy\]<br>_byte로 표시_ |
| **openstack.nova.server.vda_write_req**<br>(측정) | 이 서버에서 VDA 디바이스에 전송한 쓰기 요청 수 \[Legacy\]|
| **openstack.nova.service.count** <br>(gauge) | 서비스 수|
| **openstack.nova.service.up** <br>(gauge) | 서버 활성화 여부|
| **openstack.nova.vcpus**<br>(측정) | 이 하이퍼바이저 호스트에서 사용 가능한 vCPU 수 \[Legacy\]|
| **openstack.nova.vcpus_used**<br>(측정) | 이 하이퍼바이저 호스트에서 사용하는 vCPUS 수 \[Legacy\]|
| **openstack.octavia.amphora.count** <br>(gauge) | 각 프로젝트당 Octavia Amphora 수|
| **openstack.octavia.amphora.stats.active_connections** <br>(gauge) | 현재 활성화된 Amphora 연결|
| **openstack.octavia.amphora.stats.bytes_in** <br>(gauge) | 수신된 총 바이트 수|
| **openstack.octavia.amphora.stats.bytes_out** <br>(gauge) | 전송된 총 바이트 수|
| **openstack.octavia.amphora.stats.request_errors** <br>(gauge) | 처리 불가 총 요청 수|
| **openstack.octavia.amphora.stats.total_connections** <br>(gauge) | 처리한 총 연결 수|
| **openstack.octavia.healthmonitor.admin_state_up** <br>(gauge) | Healthmonitor의 관리 상태(업 또는 다운 상태)|
| **openstack.octavia.healthmonitor.count** <br>(gauge) | Octavia healthmonitor 수|
| **openstack.octavia.healthmonitor.delay** <br>(gauge) | 멤버에게 프로브(상태 확인)를 보내는 시간 간격<br>_second로 표시_ |
| **openstack.octavia.healthmonitor.max_retries** <br>(gauge) | 멤버의 작동 상태를 ONLINE으로 변경하기 전 필요한 점검 성공 횟수|
| **openstack.octavia.healthmonitor.max_retries_down** <br>(gauge) | 멤버의 작동 상태를 ERROR로 변경하기 전까지 허용되는 점검 실패 횟수|
| **openstack.octavia.healthmonitor.timeout** <br>(gauge) | 타임아웃되기 전 모니터의 연결 대기 최대 시간<br>_second로 표시_ |
| **openstack.octavia.listener.connection_limit** <br>(gauge) | 이 리스너에 허용되는 최대 연결 수|
| **openstack.octavia.listener.count** <br>(gauge) | Octavia 리스너 수|
| **openstack.octavia.listener.stats.active_connections** <br>(gauge) | 현재 활성 상태인 리스너 연결|
| **openstack.octavia.listener.stats.bytes_in** <br>(gauge) | 수신된 총 바이트 수|
| **openstack.octavia.listener.stats.bytes_out** <br>(gauge) | 전송된 총 바이트 수|
| **openstack.octavia.listener.stats.request_errors** <br>(gauge) | 처리할 수 없었던 총 요청 수|
| **openstack.octavia.listener.stats.total_connections** <br>(gauge) | 처리한 총 연결 수|
| **openstack.octavia.listener.timeout_client_data** <br>(gauge) | 프론트엔드 클라이언트 비활성 타임아웃<br>_millisecond로 표시_ |
| **openstack.octavia.listener.timeout_member_connect** <br>(gauge) | 백엔드 멤버 연결 타임아웃<br>_millisecond로 표시_ |
| **openstack.octavia.listener.timeout_member_data** <br>(gauge) | 백엔드 멤버 비활성 타임아웃<br>_millisecond로 표시_ |
| **openstack.octavia.listener.timeout_tcp_inspect** <br>(gauge) | 콘텐츠 검사를 위한 추가 TCP 패킷 대기 시간<br>_millisecond로 표시_ |
| **openstack.octavia.loadbalancer.admin_state_up** <br>(gauge) | 로드밸런서의 관리 상태(업 또는 다운 상태)|
| **openstack.octavia.loadbalancer.count** <br>(gauge) | Octavia 로드밸런서 수|
| **openstack.octavia.loadbalancer.stats.active_connections** <br>(gauge) | 현재 활성 상태인 로드밸런서 연결|
| **openstack.octavia.loadbalancer.stats.bytes_in** <br>(gauge) | 수신된 총 바이트 수|
| **openstack.octavia.loadbalancer.stats.bytes_out** <br>(gauge) | 전송된 총 바이트 수|
| **openstack.octavia.loadbalancer.stats.request_errors** <br>(gauge) | 처리할 수 없었던 총 요청 수|
| **openstack.octavia.loadbalancer.stats.total_connections** <br>(gauge) | 처리한 총 연결 수|
| **openstack.octavia.pool.admin_state_up** <br>(gauge) | 풀 관리 상태(업 또는 다운 상태)|
| **openstack.octavia.pool.count** <br>(gauge) | Octavia 풀 수|
| **openstack.octavia.pool.member.admin_state_up** <br>(gauge) | 풀 멤버 관리 상태(업 또는 다운 상태)|
| **openstack.octavia.pool.member.count** <br>(gauge) | Octavia 풀 멤버 수|
| **openstack.octavia.pool.member.weight** <br>(gauge) | 풀의 다른 멤버과 비교하여 해당 멤버가 처리하는 요청 또는 연결의 비율|
| **openstack.octavia.quota.count** <br>(gauge) | 각 프로젝트당 Octavia 쿼터 수|
| **openstack.octavia.quota.health_monitor** <br>(gauge) | 설정된 상태 모니터 쿼터 제한|
| **openstack.octavia.quota.healthmonitor** <br>(gauge) | 설정된 상태 모니터 쿼터 제한|
| **openstack.octavia.quota.l7policy** <br>(gauge) | 구성된 l7policy 쿼터 제한|
| **openstack.octavia.quota.l7rule** <br>(gauge) | 구성된 l7rule 쿼터 제한|
| **openstack.octavia.quota.listener** <br>(gauge) | 구성된 리스너 쿼터 제한|
| **openstack.octavia.quota.load_balancer** <br>(gauge) | 구성된 로드밸런서 쿼터 제한|
| **openstack.octavia.quota.loadbalancer** <br>(gauge) | 구성된 로드밸런서 쿼터 제한|
| **openstack.octavia.quota.member** <br>(gauge) | 구성된 멤버 쿼터 제한|
| **openstack.octavia.quota.pool** <br>(gauge) | 구성된 풀 쿼터 제한|
| **openstack.octavia.response_time** <br>(gauge) | Octavia 엔드포인트에 요청 시 HTTP 요청이 완료되는 데 걸리는 시간<br>_millisecond로 표시_ |
| **openstack.swift.container.bytes** <br>(gauge) | Swift 컨테이너의 바이트 수|
| **openstack.swift.container.count** <br>(gauge) | Swift 컨테이너의 수|
| **openstack.swift.response_time** <br>(gauge) | Swift 엔드포인트에 요청 시 HTTP 요청이 완료되는 데 걸리는 시간<br>_millisecond로 표시_ |

### 이벤트

OpenStack Controller는 이벤트를 포함하지 않습니다.

### 서비스 점검

**openstack.neutron.api.up**

Agent가 Neutron API에 쿼리할 수 없는 경우 `CRITICAL`이 반환됩니다. 엔드포인트를 카탈로그에서 찾을 수 없는 경우 `UNKNOWN`이 반환되며, 그 외 경우에는 `OK`가 반환됩니다.

_상태: ok, critical, unknown_

**openstack.nova.api.up**

Agent가 Nova API에 쿼리할 수 없는 경우 `CRITICAL`이 반환됩니다. 엔드포인트를 카탈로그에서 찾을 수 없는 경우 `UNKNOWN`이 반환되며, 그 외 경우에는 `OK`가 반환됩니다.

_상태: ok, critical, unknown_

**openstack.keystone.api.up**

Agent가 Keystone API에 쿼리할 수 없는 경우 `CRITICAL`이 반환됩니다. 엔드포인트를 카탈로그에서 찾을 수 없는 경우 `UNKNOWN`이 반환되며, 그 외 경우에는 `OK`가 반환됩니다.

_상태: ok, critical_

**openstack.ironic.api.up**

Agent가 Ironic API에 쿼리할 수 없는 경우 `CRITICAL`이 반환됩니다. 엔드포인트를 카탈로그에서 찾을 수 없는 경우 `UNKNOWN`이 반환되며, 그 외 경우에는 `OK`가 반환됩니다.

_상태: ok, critical_

**openstack.cinder.api.up**

Agent가 Cinder API에 쿼리할 수 없는 경우 `CRITICAL`이 반환됩니다. 엔드포인트를 카탈로그에서 찾을 수 없는 경우 `UNKNOWN`이 반환되며, 그 외 경우에는 `OK`가 반환됩니다.

_상태: ok, critical_

**openstack.octavia.api.up**

Agent가 Octavia API에 쿼리할 수 없는 경우 `CRITICAL`이 반환됩니다. 엔드포인트를 카탈로그에서 찾을 수 없는 경우 `UNKNOWN`이 반환되며, 그 외 경우에는 `OK`가 반환됩니다.

_상태: ok, critical_

**openstack.glance.api.up**

Agent가 Glance API에 쿼리할 수 없는 경우 `CRITICAL`이 반환됩니다. 엔드포인트를 카탈로그에서 찾을 수 없는 경우 `UNKNOWN`이 반환되며, 그 외 경우에는 `OK`가 반환됩니다.

_상태: ok, critical_

**openstack.nova.hypervisor.up**

Agent가 하이퍼바이저 상태를 가져올 수 없는 경우 `UNKNOWN`이 반환됩니다. 하이퍼바이저가 중단된 경우 `CRITICAL`이 반환되며 그 외의 경우에는 `OK`가 반환됩니다.

_상태: ok, critical, unknown_

**openstack.neutron.network.up**

Agent가 네트워크 상태를 가져올 수 없는 경우 `UNKNOWN`이 반환됩니다. 네트워크가 중단된 경우 `CRITICAL`이 반환되며, 그 외의 경우에는 `OK`가 반환됩니다.

_상태: ok, critical, unknown_

**openstack.heat.api.up**

Agent가 HEAT API에 쿼리할 수 없는 경우 `CRITICAL`이 반환됩니다. 엔드포인트를 카탈로그에서 찾을 수 없는 경우 `UNKNOWN`이 반환되며, 그 외 경우에는 `OK`가 반환됩니다.

_상태: ok, critical_

**openstack.swift.api.up**

Agent가 SWIFT API에 쿼리할 수 없는 경우 `CRITICAL`이 반환됩니다. 엔드포인트를 카탈로그에서 찾을 수 없는 경우 `UNKNOWN`이 반환되며, 그 외 경우에는 `OK`가 반환됩니다.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog으로 OpenStack 컴포넌트 모니터링](https://www.datadoghq.com/blog/openstack-controller-integration/)