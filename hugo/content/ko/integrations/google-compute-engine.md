---
aliases:
- /ko/integrations/google_compute_engine
app_id: google-compute-engine
categories:
- cloud
- configuration & deployment
- google cloud
- log collection
- network
- os & system
custom_kind: integration
description: Google Compute Engine은 Google의 혁신적인 데이터 센터와 전 세계 파이버 네트워크에서 실행되는 가상 머신을
  제공합니다.
media: []
title: Google Compute Engine
---
## 개요

Google Cloud Compute Engine은 Google의 혁신적인 데이터 센터와 전 세계 파이버 네트워크에서 실행되는 가상 머신을 제공해 드립니다.

Google Compute Engine 메트릭을 수집하면 다음을 할 수 있습니다.

- Compute Engine 성능을 시각화합니다.
- Compute Engine 성능과 애플리케이션의 상관 관계를 파악합니다.

## 설정

### 메트릭 수집

#### 설치

아직 하지 않았다면, 먼저 [Google 클라우드 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

#### 설정

커스텀 Compute Engine 레이블을 태그로 수집하려면 클라우드 에셋 인벤토리 권한을 활성화합니다.

### 로그 수집

Google Compute Engine 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 로깅을 설정하세요](https://docs.datadoghq.com/integrations/google-cloud-platform/?tab=datadogussite#log-collection).

해당 작업이 완료되면 Google Cloud Logging에서 Google Compute Engine 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Compute Engine 로그를 필터링하세요.

1. **Create Sink**를 클릭하고 그에 따라 싱크 이름을 지정합니다.

1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.

   {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub 로그를 Pub/Sub로 내보내기" >}}

1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

### 설정

#### 호스트 수집 제한

Datadog을 사용하여 GCE 인스턴스의 하위 집합을 모니터링하려면 해당 GCE 인스턴스에 `datadog:true` 등의 GCE 레이블을 할당합니다. 그 다음 [Datadog GCP 통합 타일](https://app.datadoghq.com/integrations/google_cloud_platform)에서 **Optionally limit metrics collection** 텍스트 상자에 해당 태그를 지정합니다. 태그를 설정하여 가상 머신을 필터링하는 방법에 관한 자세한 내용을 확인하려면 [Google Cloud Platform 통합 문서](https://docs.datadoghq.com/integrations/google-cloud-platform/#configuration)를 참조하세요.

#### GCE 자동 음소거

Datadog은 GCE API의 호스트 상태에 따라 Google Compute Engine(GCE) 인스턴스의 수동 종료 및 GCE 오토스케일링으로 트리거된 인스턴스 종료와 관련된 모니터링을 사전 음소거할 수 있습니다. **Show automatically muted hosts**를 체크하여 자동 음소거된 GCE 인스턴스를 [Monitor Downtime](https://app.datadoghq.com/monitors/downtimes) 페이지에서 확인할 수 있습니다.

예상되는 GCE 인스턴스 종료에 관한 모니터링을 음소거하려면 [Google Cloud Platform 통합 타일](https://docs.datadoghq.com/integrations/google-cloud-platform/)의 **GCE automuting**란에 체크합니다.

{{< img src="integrations/google_compute_engine/gce_automuting.png" alt="GCE Automuting" >}}

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.gce.firewall.dropped_bytes_count** <br>(count) | 방화벽에 의해 드롭된 수신 바이트.<br>_byte로 표시_ |
| **gcp.gce.firewall.dropped_packets_count** <br>(count) | 방화벽에 의해 드롭된 수신 패킷.<br>_packet으로 표시_ |
| **gcp.gce.guest.cpu.runnable_task_count** <br>(gauge) | 실행 대기열에 있는 실행 가능한 작업의 평균 수.<br>_task로 표시_ |
| **gcp.gce.guest.cpu.usage_time** <br>(count) | CPU 사용량(초).<br>_second로 표시_ |
| **gcp.gce.guest.disk.bytes_used** <br>(gauge) | 사용 중인 디스크(바이트).<br>_byte로 표시_ |
| **gcp.gce.guest.disk.io_time** <br>(gauge) | 디스크 작업에 소요된 누적 IO 시간.<br>_millisecond로 표시_ |
| **gcp.gce.guest.disk.merged_operation_count** <br>(count) | 병합된 디스크 작업 수. 서로 인접한 디스크 작업은 효율성을 위해 커널에서 병합할 수 있습니다.<br>_operation으로 표시_ |
| **gcp.gce.guest.disk.operation_bytes_count** <br>(count) | 디스크 작업에서 전송된 바이트.<br>_byte로 표시_ |
| **gcp.gce.guest.disk.operation_count** <br>(count) | 디스크 작업 수.<br>_operation으로 표시_ |
| **gcp.gce.guest.disk.operation_time** <br>(gauge) | 디스크 작업에 소요된 시간.<br>_millisecond로 표시_ |
| **gcp.gce.guest.disk.queue_length** <br>(gauge) | 지난 60초 동안 디스크의 평균 대기열 길이.|
| **gcp.gce.guest.disk.weighted_io_time** <br>(count) | 디스크 작업에 소요된 누적 가중 IO 시간.<br>_millisecond로 표시_ |
| **gcp.gce.guest.memory.anonymous_used** <br>(gauge) | 익명 메모리 사용량(바이트). 모든 상태의 값을 합하면 총 익명 메모리 사용량이 산출됩니다.<br>_byte로 표시_ |
| **gcp.gce.guest.memory.bytes_used** <br>(gauge) | 각 메모리 상태별 메모리 사용량(바이트). 모든 상태의 값을 합하면 머신의 총 메모리가 산출됩니다.<br>_byte로 표시_ |
| **gcp.gce.guest.memory.dirty_used** <br>(gauge) | 더티 페이지 사용량(바이트).<br>_byte로 표시_ |
| **gcp.gce.guest.memory.page_cache_used** <br>(gauge) | 페이지 캐시 메모리 사용량(바이트). 모든 상태의 값을 합하면 총 익명 메모리 사용량이 산출됩니다.<br>_byte로 표시_ |
| **gcp.gce.guest.memory.unevictable_used** <br>(gauge) | 스왑아웃 불가 메모리 사용량(바이트).<br>_byte로 표시_ |
| **gcp.gce.guest.system.problem_count** <br>(count) | 머신 문제가 발생한 횟수.|
| **gcp.gce.guest.system.problem_state** <br>(gauge) | 문제가 시스템에 영향을 미치는지 여부를 나타냅니다. 1로 설정되면 문제가 시스템에 영향을 미치는 상태이며, 0으로 설정되면 시스템에 영향을 미치지 않는 상태입니다.|
| **gcp.gce.guest.system.uptime** <br>(gauge) | 운영체제가 실행된 후 경과한 시간(초).<br>_second로 표시_ |
| **gcp.gce.instance_group.size** <br>(gauge) | 인스턴스 그룹의 VM 수.|
| **gcp.gce.instance.cpu.reserved_cores** <br>(gauge) | 인스턴스 호스트에 예약된 코어 수.<br>_core로 표시_ |
| **gcp.gce.instance.cpu.scheduler_wait_time** <br>(gauge) | 대기 시간은 vCPU가 실행할 준비가 되었지만 예상치 못하게 실행 스케줄링이 되지 않아 대기한 시간을 뜻합니다. 여기서 반환되는 대기 시간은 모든 vCPU의 누적 값입니다.|
| **gcp.gce.instance.cpu.usage_time** <br>(gauge) | 모든 코어의 CPU 사용 시간(초).<br>_second로 표시_ |
| **gcp.gce.instance.cpu.utilization** <br>(gauge) | 현재 인스턴스에서 사용 중인 할당된 CPU의 비율. 일부 머신 유형은 100% 이상의 사용량까지 버스트가 허용됩니다.<br>_fraction으로 표시됨_ |
| **gcp.gce.instance.disk.average_io_latency** <br>(gauge) | 디스크 평균 io 지연 시간.<br>_millisecond로 표시_ |
| **gcp.gce.instance.disk.average_io_queue_depth** <br>(gauge) | 디스크 평균 io 대기열 깊이.|
| **gcp.gce.instance.disk.max_read_bytes_count** <br>(gauge) | 초당 최대 디스크 읽기 처리량.<br>_byte로 표시됨_ |
| **gcp.gce.instance.disk.max_read_ops_count** <br>(gauge) | 초당 최대 디스크 읽기 요청 수.|
| **gcp.gce.instance.disk.max_write_bytes_count** <br>(gauge) | 초당 최대 디스크 쓰기 처리량.|
| **gcp.gce.instance.disk.max_write_ops_count** <br>(gauge) | 초당 최대 디스크 쓰기 요청 수.|
| **gcp.gce.instance.disk.read_bytes_count** <br>(count) | 디스크에서 읽은 바이트 수<br>_byte로 표시됨_ |
| **gcp.gce.instance.disk.read_ops_count** <br>(count) | 디스크 읽기 IO 작업.<br>_operation으로 표시_ |
| **gcp.gce.instance.disk.write_bytes_count** <br>(count) | 디스크에 기록된 바이트 수<br>_byte로 표시됨_ |
| **gcp.gce.instance.disk.write_ops_count** <br>(count) | 디스크 쓰기 IO 작업.<br>_operation으로 표시_ |
| **gcp.gce.instance.integrity.early_boot_validation_status** <br>(gauge) | 초기 부팅 무결성 정책의 유효성 검사 상태.|
| **gcp.gce.instance.integrity.late_boot_validation_status** <br>(gauge) | 후기 부팅 무결성 정책의 유효성 검사 상태.|
| **gcp.gce.instance.is_running** <br>(gauge) | 인스턴스가 실행 중이면 1을 반환하는 상태 점검|
| **gcp.gce.instance.memory.balloon.ram_size** <br>(gauge) | VM의 총 메모리 용량.<br>_byte로 표시_ |
| **gcp.gce.instance.memory.balloon.ram_used** <br>(gauge) | VM에서 현재 사용 중인 메모리.<br>_byte로 표시_ |
| **gcp.gce.instance.memory.balloon.swap_in_bytes_count** <br>(count) | 게스트가 자체 스왑 공간에서 읽은 메모리 양.<br>_byte로 표시_ |
| **gcp.gce.instance.memory.balloon.swap_out_bytes_count** <br>(count) | 게스트가 자체 스왑 공간에서 읽은 메모리 양.<br>_byte로 표시_ |
| **gcp.gce.instance.network.received_bytes_count** <br>(count) | 네트워크에서 수신한 바이트.<br>_byte로 표시_ |
| **gcp.gce.instance.network.received_packets_count** <br>(count) | 네트워크에서 수신한 패킷.<br>_packet으로 표시_ |
| **gcp.gce.instance.network.sent_bytes_count** <br>(count) | 네트워크를 통해 전송된 바이트.<br>_byte로 표시_ |
| **gcp.gce.instance.network.sent_packets_count** <br>(count) | 네트워크를 통해 전송된 패킷.<br>_packet으로 표시_ |
| **gcp.gce.instance.uptime** <br>(gauge) | VM 실행 시간을 나타냅니다(초).<br>_second로 표시_ |
| **gcp.gce.mirroring.dropped_packets_count** <br>(count) | 드롭된 미러링 패킷 수.<br>_packet으로 표시_ |
| **gcp.gce.mirroring.mirrored_bytes_count** <br>(count) | 미러링된 바이트 수.<br>_byte로 표시_ |
| **gcp.gce.mirroring.mirrored_packets_count** <br>(count) | 미러링된 패킷 수.<br>_packet으로 표시_ |
| **gcp.gce.nat.allocated_ports** <br>(gauge) | NAT 게이트웨이가 모든 VM에 할당하는 포트의 수|
| **gcp.gce.nat.closed_connections_count** <br>(count) | 닫힌 NAT 게이트웨이의 연결 수<br>_connection으로 표시_ |
| **gcp.gce.nat.dropped_received_packets_count** <br>(count) | NAT 게이트웨이가 드롭한 수신 패킷 수<br>_packet으로 표시_ |
| **gcp.gce.nat.dropped_sent_packets_count** <br>(count) | NAT 게이트웨이가 드롭한 전송 패킷 수<br>_packet으로 표시_ |
| **gcp.gce.nat.new_connections_count** <br>(count) | NAT 게이트웨이의 신규 연결 수<br>_connection으로 표시_ |
| **gcp.gce.nat.open_connections** <br>(gauge) | NAT 게이트웨이에 열려 있는 연결 수<br>_connection으로 표시_ |
| **gcp.gce.nat.port_usage** <br>(gauge) | NAT 게이트웨이에 연결된 모든 VM 중 가장 높은 포트 사용량|
| **gcp.gce.nat.received_bytes_count** <br>(count) | NAT 게이트웨이가 수신한 바이트 수<br>_byte로 표시_ |
| **gcp.gce.nat.received_packets_count** <br>(count) | NAT 게이트웨이가 수신한 패킷 수<br>_packet으로 표시_ |
| **gcp.gce.nat.sent_bytes_count** <br>(gauge) | NAT 게이트웨이가 전송한 바이트 수<br>_byte로 표시_ |
| **gcp.gce.nat.sent_packets_count** <br>(gauge) | NAT 게이트웨이가 전송한 패킷 수<br>_packet으로 표시_ |
| **gcp.gce.project.quota.backend_buckets.limit** <br>(gauge) | 백엔드 버킷의 프로젝트 할당량 한도.|
| **gcp.gce.project.quota.backend_buckets.usage** <br>(gauge) | 백엔드 버킷의 프로젝트 할당량 사용량.|
| **gcp.gce.project.quota.backend_services.limit** <br>(gauge) | 백엔드 서비스 할당량 한도|
| **gcp.gce.project.quota.backend_services.usage** <br>(gauge) | 현재 백엔드 서비스 할당량 사용량|
| **gcp.gce.project.quota.external_vpn_gateways.limit** <br>(gauge) | 외부 VPN 게이트웨이의 프로젝트 할당량 한도.|
| **gcp.gce.project.quota.external_vpn_gateways.usage** <br>(gauge) | 외부 VPN 게이트웨이의 프로젝트 할당량 사용량.|
| **gcp.gce.project.quota.firewalls.limit** <br>(gauge) | 방화벽 할당량 한도|
| **gcp.gce.project.quota.firewalls.usage** <br>(gauge) | 현재 방화벽 할당량 사용량|
| **gcp.gce.project.quota.forwarding_rules.limit** <br>(gauge) | 포워딩 규칙 할당량 한도|
| **gcp.gce.project.quota.forwarding_rules.usage** <br>(gauge) | 현재 포워딩 규칙 할당량 사용량|
| **gcp.gce.project.quota.global_internal_addresses.limit** <br>(gauge) | 전역 내부 IP 주소의 프로젝트 할당량 한도.|
| **gcp.gce.project.quota.global_internal_addresses.usage** <br>(gauge) | 전역 내부 IP 주소의 프로젝트 할당량 사용량.|
| **gcp.gce.project.quota.health_checks.limit** <br>(gauge) | 상태 점검 할당량 한도|
| **gcp.gce.project.quota.health_checks.usage** <br>(gauge) | 현재 상태 점검 할당량 사용량|
| **gcp.gce.project.quota.images.limit** <br>(gauge) | 이미지 할당량 한도|
| **gcp.gce.project.quota.images.usage** <br>(gauge) | 현재 이미지 할당량 사용량|
| **gcp.gce.project.quota.in_use_addresses.limit** <br>(gauge) | in_use_addresses 할당량 한도|
| **gcp.gce.project.quota.in_use_addresses.usage** <br>(gauge) | 현재 in_use_addresses 할당량 사용량|
| **gcp.gce.project.quota.instance_templates.limit** <br>(gauge) | 인스턴스 템플릿 할당량 한도|
| **gcp.gce.project.quota.instance_templates.usage** <br>(gauge) | 현재 인스턴스 템플릿 할당량 사용량|
| **gcp.gce.project.quota.interconnects.limit** <br>(gauge) | 인터커넥트의 프로젝트 할당량 한도.|
| **gcp.gce.project.quota.interconnects.usage** <br>(gauge) | 인터커넥트의 프로젝트 할당량 사용량.|
| **gcp.gce.project.quota.machine_images.limit** <br>(gauge) | 머신 이미지의 프로젝트 할당량 한도.|
| **gcp.gce.project.quota.machine_images.usage** <br>(gauge) | 머신 이미지의 프로젝트 할당량 사용량.|
| **gcp.gce.project.quota.network_endpoint_groups.limit** <br>(gauge) | 네트워크 엔드포인트 그룹의 프로젝트 할당량 한도.|
| **gcp.gce.project.quota.network_endpoint_groups.usage** <br>(gauge) | 네트워크 엔드포인트 그룹의 프로젝트 할당량 사용량.|
| **gcp.gce.project.quota.networks.limit** <br>(gauge) | 네트워크 할당량 한도|
| **gcp.gce.project.quota.networks.usage** <br>(gauge) | 현재 네트워크 할당량 사용량|
| **gcp.gce.project.quota.packet_mirrorings.limit** <br>(gauge) | 미러링의 프로젝트 할당량 한도.|
| **gcp.gce.project.quota.packet_mirrorings.usage** <br>(gauge) | 미러링의 프로젝트 할당량 사용량.|
| **gcp.gce.project.quota.routers.limit** <br>(gauge) | 라우터의 프로젝트 할당량 한도.|
| **gcp.gce.project.quota.routers.usage** <br>(gauge) | 라우터의 프로젝트 할당량 사용량.|
| **gcp.gce.project.quota.routes.limit** <br>(gauge) | 라우트 할당량 한도|
| **gcp.gce.project.quota.routes.usage** <br>(gauge) | 현재 라우트 할당량 사용량|
| **gcp.gce.project.quota.security_policies.limit** <br>(gauge) | 보안 정책의 프로젝트 할당량 한도.|
| **gcp.gce.project.quota.security_policies.usage** <br>(gauge) | 보안 정책의 프로젝트 할당량 사용량.|
| **gcp.gce.project.quota.security_policy_ceval_rules.limit** <br>(gauge) | 보안 정책 Ceval 규칙의 프로젝트 할당량 한도.|
| **gcp.gce.project.quota.security_policy_ceval_rules.usage** <br>(gauge) | 보안 정책 Ceval 규칙의 프로젝트 할당량 사용량.|
| **gcp.gce.project.quota.security_policy_rules.limit** <br>(gauge) | 보안 정책 규칙의 프로젝트 할당량 한도.|
| **gcp.gce.project.quota.security_policy_rules.usage** <br>(gauge) | 보안 정책 규칙의 프로젝트 할당량 사용량.|
| **gcp.gce.project.quota.snapshots.limit** <br>(gauge) | 스냅샷 할당량 한도|
| **gcp.gce.project.quota.snapshots.usage** <br>(gauge) | 현재 스냅샷 할당량 사용량|
| **gcp.gce.project.quota.ssl_certificates.limit** <br>(gauge) | SSL 인증서 할당량 한도|
| **gcp.gce.project.quota.ssl_certificates.usage** <br>(gauge) | 현재 SSL 인증서 할당량 사용량|
| **gcp.gce.project.quota.static_addresses.limit** <br>(gauge) | 고정 주소 할당량 한도|
| **gcp.gce.project.quota.static_addresses.usage** <br>(gauge) | 현재 고정 주소 할당량 사용량|
| **gcp.gce.project.quota.subnetworks.limit** <br>(gauge) | 서브네트워크 할당량 한도|
| **gcp.gce.project.quota.subnetworks.usage** <br>(gauge) | 현재 서브네트워크 할당량 사용량|
| **gcp.gce.project.quota.target_http_proxies.limit** <br>(gauge) | 타겟 HTTP 프록시 할당량 한도|
| **gcp.gce.project.quota.target_http_proxies.usage** <br>(gauge) | 현재 타겟 HTTP 프록시 할당량 사용량|
| **gcp.gce.project.quota.target_https_proxies.limit** <br>(gauge) | 타겟 HTTPS 프록시 할당량 한도|
| **gcp.gce.project.quota.target_https_proxies.usage** <br>(gauge) | 현재 타겟 HTTPS 프록시 할당량 사용량|
| **gcp.gce.project.quota.target_instances.limit** <br>(gauge) | 타겟 인스턴스 할당량 한도|
| **gcp.gce.project.quota.target_instances.usage** <br>(gauge) | 현재 타겟 인스턴스 할당량 사용량|
| **gcp.gce.project.quota.target_pools.limit** <br>(gauge) | 타겟 풀 할당량 한도|
| **gcp.gce.project.quota.target_pools.usage** <br>(gauge) | 현재 타겟 풀 할당량 사용량|
| **gcp.gce.project.quota.target_ssl_proxies.limit** <br>(gauge) | 타겟 SSL 프록시의 프로젝트 할당량 한도.|
| **gcp.gce.project.quota.target_ssl_proxies.usage** <br>(gauge) | 타겟 SSL 프록시의 프로젝트 할당량 사용량.|
| **gcp.gce.project.quota.target_tcp_proxies.limit** <br>(gauge) | 타겟 TCP 프록시의 프로젝트 할당량 한도.|
| **gcp.gce.project.quota.target_tcp_proxies.usage** <br>(gauge) | 타겟 TCP 프록시의 프로젝트 할당량 사용량.|
| **gcp.gce.project.quota.target_vpn_gateways.limit** <br>(gauge) | 타겟 VPN 게이트웨이 할당량 한도|
| **gcp.gce.project.quota.target_vpn_gateways.usage** <br>(gauge) | 현재 VPN 게이트웨이 할당량 사용량|
| **gcp.gce.project.quota.url_maps.limit** <br>(gauge) | URL 맵 할당량 한도|
| **gcp.gce.project.quota.url_maps.usage** <br>(gauge) | 현재 URL 맵 할당량 사용량|
| **gcp.gce.project.quota.vpn_gateways.limit** <br>(gauge) | VPN 게이트웨이 할당량 한도|
| **gcp.gce.project.quota.vpn_gateways.usage** <br>(gauge) | 현재 사용 중인 VPN 게이트웨이의 수|
| **gcp.gce.project.quota.vpn_tunnels.limit** <br>(gauge) | VPN 터널 할당량 한도|
| **gcp.gce.project.quota.vpn_tunnels.usage** <br>(gauge) | 현재 VPN 터널 할당량 사용량.|
| **gcp.gce.region.quota.affinity_groups.limit** <br>(gauge) | 선호도 그룹 할당량 한도|
| **gcp.gce.region.quota.affinity_groups.percentage** <br>(gauge) | 사용 중인 선호도 그룹 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.affinity_groups.usage** <br>(gauge) | 현재 사용 중인 선호도 그룹의 수|
| **gcp.gce.region.quota.autoscalers.limit** <br>(gauge) | 오토스케일러 할당량 한도|
| **gcp.gce.region.quota.autoscalers.percentage** <br>(gauge) | 사용 중인 오토스케일러 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.autoscalers.usage** <br>(gauge) | 현재 사용 중인 오토스케일러의 수|
| **gcp.gce.region.quota.c2_cpus.limit** <br>(gauge) | C2 CPU 할당량 한도|
| **gcp.gce.region.quota.c2_cpus.percentage** <br>(gauge) | 사용 중인 C2 CPU 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.c2_cpus.usage** <br>(gauge) | 현재 사용 중인 C2 CPU의 수|
| **gcp.gce.region.quota.commitments.limit** <br>(gauge) | 약정 할당량 한도|
| **gcp.gce.region.quota.commitments.percentage** <br>(gauge) | 사용 중인 약정 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.commitments.usage** <br>(gauge) | 현재 사용 중인 약정의 수|
| **gcp.gce.region.quota.committed_c2_cpus.limit** <br>(gauge) | C2 CPU 할당량 한도|
| **gcp.gce.region.quota.committed_c2_cpus.percentage** <br>(gauge) | 사용 중인 C2 CPU 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.committed_c2_cpus.usage** <br>(gauge) | 현재 사용 중인 C2 CPU의 수|
| **gcp.gce.region.quota.committed_cpus.limit** <br>(gauge) | CPU 할당량 한도|
| **gcp.gce.region.quota.committed_cpus.percentage** <br>(gauge) | 사용 중인 CPU 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.committed_cpus.usage** <br>(gauge) | 현재 사용 중인 CPU의 수|
| **gcp.gce.region.quota.committed_local_ssd_total_gb.limit** <br>(gauge) | 로컬 SSD 총 GB 할당량 한도|
| **gcp.gce.region.quota.committed_local_ssd_total_gb.percentage** <br>(gauge) | 사용 중인 로컬 SSD 총 GB 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.committed_local_ssd_total_gb.usage** <br>(gauge) | 현재 사용 중인 로컬 SSD 총 GB의 수|
| **gcp.gce.region.quota.committed_n2_cpus.limit** <br>(gauge) | N2 CPU 할당량 한도|
| **gcp.gce.region.quota.committed_n2_cpus.percentage** <br>(gauge) | 사용 중인 N2 CPU 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.committed_n2_cpus.usage** <br>(gauge) | 현재 사용 중인 N2 CPU의 수|
| **gcp.gce.region.quota.committed_n2d_cpus.limit** <br>(gauge) | N2D CPU 할당량 한도|
| **gcp.gce.region.quota.committed_n2d_cpus.percentage** <br>(gauge) | 사용 중인 N2D CPU 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.committed_n2d_cpus.usage** <br>(gauge) | 현재 사용 중인 N2D CPU의 수|
| **gcp.gce.region.quota.committed_nvidia_k80_gpus.limit** <br>(gauge) | Nvidia K80 GPU 할당량 한도|
| **gcp.gce.region.quota.committed_nvidia_k80_gpus.percentage** <br>(gauge) | 사용 중인 Nvidia K80 GPU 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.committed_nvidia_k80_gpus.usage** <br>(gauge) | 현재 사용 중인 Nvidia K80 GPU의 수|
| **gcp.gce.region.quota.committed_nvidia_p100_gpus.limit** <br>(gauge) | Nvidia P100 GPU 할당량 한도|
| **gcp.gce.region.quota.committed_nvidia_p100_gpus.percentage** <br>(gauge) | 사용 중인 Nvidia P100 GPU 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.committed_nvidia_p100_gpus.usage** <br>(gauge) | 현재 사용 중인 Nvidia P100 GPU의 수|
| **gcp.gce.region.quota.committed_nvidia_p4_gpus.limit** <br>(gauge) | Nvidia P4 GPU 할당량 한도|
| **gcp.gce.region.quota.committed_nvidia_p4_gpus.percentage** <br>(gauge) | 사용 중인 Nvidia P4 GPU 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.committed_nvidia_p4_gpus.usage** <br>(gauge) | 현재 사용 중인 Nvidia P4 GPU의 수|
| **gcp.gce.region.quota.committed_nvidia_t4_gpus.limit** <br>(gauge) | Nvidia T4 GPU 할당량 한도|
| **gcp.gce.region.quota.committed_nvidia_t4_gpus.percentage** <br>(gauge) | 사용 중인 Nvidia T4 GPU 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.committed_nvidia_t4_gpus.usage** <br>(gauge) | 현재 사용 중인 Nvidia T4 GPU의 수|
| **gcp.gce.region.quota.committed_nvidia_v100_gpus.limit** <br>(gauge) | Nvidia V100 GPU 할당량 한도|
| **gcp.gce.region.quota.committed_nvidia_v100_gpus.percentage** <br>(gauge) | 사용 중인 Nvidia V100 GPU 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.committed_nvidia_v100_gpus.usage** <br>(gauge) | 현재 사용 중인 Nvidia V100 GPU의 수|
| **gcp.gce.region.quota.cpus.limit** <br>(gauge) | CPU 할당량 한도|
| **gcp.gce.region.quota.cpus.percentage** <br>(gauge) | 사용 중인 CPU 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.cpus.usage** <br>(gauge) | 현재 사용 중인 CPU의 수|
| **gcp.gce.region.quota.disks_total_gb.limit** <br>(gauge) | HDD 디스크 총 용량 할당량<br>_gibibyte로 표시_ |
| **gcp.gce.region.quota.disks_total_gb.percentage** <br>(gauge) | HDD 디스크 용량 할당량의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.disks_total_gb.usage** <br>(gauge) | 사용 중인 HDD 디스크 총 용량<br>_gibibyte로 표시_ |
| **gcp.gce.region.quota.in_use_addresses.limit** <br>(gauge) | 사용 중인 IP 주소(임시 + 고정) 할당량 한도|
| **gcp.gce.region.quota.in_use_addresses.percentage** <br>(gauge) | IP 주소(임시 + 고정) 할당량의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.in_use_addresses.usage** <br>(gauge) | 사용 중인 IP 주소(임시 + 고정)의 수|
| **gcp.gce.region.quota.in_use_backup_schedules.limit** <br>(gauge) | 백업 스케줄 할당량 한도|
| **gcp.gce.region.quota.in_use_backup_schedules.percentage** <br>(gauge) | 현재 사용 중인 백업 스케줄 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.in_use_backup_schedules.usage** <br>(gauge) | 현재 사용 중인 백업 스케줄의 수|
| **gcp.gce.region.quota.in_use_snapshot_schedules.limit** <br>(gauge) | 사용 중인 스냅샷 스케줄의 리전 할당량 한도.|
| **gcp.gce.region.quota.in_use_snapshot_schedules.percentage** <br>(gauge) | 사용 중인 스냅샷 스케줄의 리전 할당량 비율.<br>_percent로 표시_ |
| **gcp.gce.region.quota.in_use_snapshot_schedules.usage** <br>(gauge) | 사용 중인 스냅샷 스케줄의 리전 할당량 사용량.|
| **gcp.gce.region.quota.instance_group_managers.limit** <br>(gauge) | 인스턴스 그룹 관리자 할당량 한도|
| **gcp.gce.region.quota.instance_group_managers.percentage** <br>(gauge) | 인스턴스 그룹 관리자 할당량의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.instance_group_managers.usage** <br>(gauge) | 사용 중인 인스턴스 그룹 관리자 수|
| **gcp.gce.region.quota.instance_groups.limit** <br>(gauge) | 인스턴스 그룹 할당량 한도|
| **gcp.gce.region.quota.instance_groups.percentage** <br>(gauge) | 인스턴스 그룹 할당량의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.instance_groups.usage** <br>(gauge) | 현재 사용 중인 인스턴스 그룹 수|
| **gcp.gce.region.quota.instances.limit** <br>(gauge) | 인스턴스 할당량 한도|
| **gcp.gce.region.quota.instances.percentage** <br>(gauge) | 인스턴스 할당량의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.instances.usage** <br>(gauge) | 현재 사용 중인 인스턴스 수|
| **gcp.gce.region.quota.interconnect_attachments_per_region.limit** <br>(gauge) | 리전당 인터커넥트 연결 할당량 한도|
| **gcp.gce.region.quota.interconnect_attachments_per_region.percentage** <br>(gauge) | 리전당 인터커넥트 연결 할당량의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.interconnect_attachments_per_region.usage** <br>(gauge) | 사용 중인 리전당 인터커넥트 연결 수|
| **gcp.gce.region.quota.interconnect_attachments_total_mbps.limit** <br>(gauge) | 인터커넥트 연결의 총 Mbps 할당량 한도|
| **gcp.gce.region.quota.interconnect_attachments_total_mbps.percentage** <br>(gauge) | 인터커넥트 연결 총 Mbps 할당량의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.interconnect_attachments_total_mbps.usage** <br>(gauge) | 사용 중인 인터커넥트 연결의 총 Mbps|
| **gcp.gce.region.quota.internal_addresses.limit** <br>(gauge) | 내부 주소 할당량 한도|
| **gcp.gce.region.quota.internal_addresses.percentage** <br>(gauge) | 내부 주소 할당량의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.internal_addresses.usage** <br>(gauge) | 현재 사용 중인 내부 주소 수|
| **gcp.gce.region.quota.local_ssd_total_gb.limit** <br>(gauge) | 로컬 SSD 총 GB 할당량 한도<br>_gibibyte로 표시_ |
| **gcp.gce.region.quota.local_ssd_total_gb.percentage** <br>(gauge) | 로컬 SSD 총 GB 할당량의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.local_ssd_total_gb.usage** <br>(gauge) | 사용 중인 로컬 SSD 총 GB 할당량<br>_gibibyte로 표시_ |
| **gcp.gce.region.quota.n2_cpus.limit** <br>(gauge) | N2 CPU 할당량 한도|
| **gcp.gce.region.quota.n2_cpus.percentage** <br>(gauge) | N2 CPU의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.n2_cpus.usage** <br>(gauge) | 사용 중인 N2 CPU 할당량|
| **gcp.gce.region.quota.n2d_cpus.limit** <br>(gauge) | N2D CPU 할당량 한도|
| **gcp.gce.region.quota.n2d_cpus.percentage** <br>(gauge) | N2D CPU의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.n2d_cpus.usage** <br>(gauge) | 사용 중인 N2D CPU 할당량|
| **gcp.gce.region.quota.network_endpoint_groups.limit** <br>(gauge) | 네트워크 엔드포인트 그룹의 리전 할당량 한도.|
| **gcp.gce.region.quota.network_endpoint_groups.percentage** <br>(gauge) | 네트워크 엔드포인트 그룹의 리전 할당량 비율.<br>_percent로 표시_ |
| **gcp.gce.region.quota.network_endpoint_groups.usage** <br>(gauge) | 네트워크 엔드포인트 그룹의 리전 할당량 사용량.|
| **gcp.gce.region.quota.node_groups.limit** <br>(gauge) | 노드 그룹 할당량 한도|
| **gcp.gce.region.quota.node_groups.percentage** <br>(gauge) | 노드 그룹의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.node_groups.usage** <br>(gauge) | 사용 중인 노드 그룹 할당량|
| **gcp.gce.region.quota.node_templates.limit** <br>(gauge) | 노드 템플릿 할당량 한도|
| **gcp.gce.region.quota.node_templates.percentage** <br>(gauge) | 노드 템플릿의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.node_templates.usage** <br>(gauge) | 사용 중인 노드 템플릿 할당량|
| **gcp.gce.region.quota.nvidia_k80_gpus.limit** <br>(gauge) | Nvidia K80 GPU 할당량 한도|
| **gcp.gce.region.quota.nvidia_k80_gpus.percentage** <br>(gauge) | 사용 중인 Nvidia K80 GPU 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.nvidia_k80_gpus.usage** <br>(gauge) | 현재 사용 중인 Nvidia K80 GPU의 수|
| **gcp.gce.region.quota.nvidia_p100_gpus.limit** <br>(gauge) | Nvidia P100 GPU 할당량 한도|
| **gcp.gce.region.quota.nvidia_p100_gpus.percentage** <br>(gauge) | 사용 중인 Nvidia p100 GPU 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.nvidia_p100_gpus.usage** <br>(gauge) | 현재 사용 중인 Nvidia P100 GPU의 수|
| **gcp.gce.region.quota.nvidia_p100_vws_gpus.limit** <br>(gauge) | Nvidia P100 가상 워크스테이션의 할당량 한도|
| **gcp.gce.region.quota.nvidia_p100_vws_gpus.percentage** <br>(gauge) | Nvidia P100 가상 워크스테이션 할당량의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.nvidia_p100_vws_gpus.usage** <br>(gauge) | 현재 사용 중인 Nvidia P100 가상 워크스테이션의 수|
| **gcp.gce.region.quota.nvidia_p4_gpus.limit** <br>(gauge) | Nvidia P4 GPU 할당량 한도|
| **gcp.gce.region.quota.nvidia_p4_gpus.percentage** <br>(gauge) | 사용 중인 Nvidia P4 GPU 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.nvidia_p4_gpus.usage** <br>(gauge) | 현재 사용 중인 Nvidia P4 GPU의 수|
| **gcp.gce.region.quota.nvidia_p4_vws_gpus.limit** <br>(gauge) | Nvidia P4 가상 워크스테이션 GPU의 리전 할당량 한도.|
| **gcp.gce.region.quota.nvidia_p4_vws_gpus.percentage** <br>(gauge) | Nvidia P4 가상 워크스테이션 GPU의 리전 할당량 비율.<br>_percent로 표시_ |
| **gcp.gce.region.quota.nvidia_p4_vws_gpus.usage** <br>(gauge) | Nvidia P4 가상 워크스테이션 GPU의 리전 할당량 사용량.|
| **gcp.gce.region.quota.nvidia_t4_gpus.limit** <br>(gauge) | Nvidia T4 GPU의 리전 할당량 한도.|
| **gcp.gce.region.quota.nvidia_t4_gpus.percentage** <br>(gauge) | Nvidia T4 GPU의 리전 할당량 비율.<br>_percent로 표시_ |
| **gcp.gce.region.quota.nvidia_t4_gpus.usage** <br>(gauge) | Nvidia T4 GPU의 리전 할당량 사용량.|
| **gcp.gce.region.quota.nvidia_t4_vws_gpus.limit** <br>(gauge) | Nvidia T4 가상 워크스테이션 GPU의 리전 할당량 한도.|
| **gcp.gce.region.quota.nvidia_t4_vws_gpus.percentage** <br>(gauge) | Nvidia T4 가상 워크스테이션 GPU의 리전 할당량 비율.<br>_percent로 표시_ |
| **gcp.gce.region.quota.nvidia_t4_vws_gpus.usage** <br>(gauge) | Nvidia T4 가상 워크스테이션 GPU의 리전 할당량 사용량.|
| **gcp.gce.region.quota.nvidia_v100_gpus.limit** <br>(gauge) | Nvidia V100 GPU 할당량 한도|
| **gcp.gce.region.quota.nvidia_v100_gpus.percentage** <br>(gauge) | 사용 중인 Nvidia V100 GPU 할당량의 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.nvidia_v100_gpus.usage** <br>(gauge) | 현재 사용 중인 Nvidia V100 GPU의 수|
| **gcp.gce.region.quota.preemptible_cpus.limit** <br>(gauge) | 선점형 GPU 할당량 한도|
| **gcp.gce.region.quota.preemptible_cpus.percentage** <br>(gauge) | 선점형 CPU 할당량의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.preemptible_cpus.usage** <br>(gauge) | 현재 사용 중인 선점형 CPU의 수|
| **gcp.gce.region.quota.preemptible_local_ssd_gb.limit** <br>(gauge) | 선점형 로컬 SSD GB 할당량 한도<br>_gibibyte로 표시_ |
| **gcp.gce.region.quota.preemptible_local_ssd_gb.percentage** <br>(gauge) | 선점형 로컬 SSD GB 할당량의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.preemptible_local_ssd_gb.usage** <br>(gauge) | 사용 중인 선점형 로컬 SSD GB 할당량<br>_gibibyte로 표시_ |
| **gcp.gce.region.quota.preemptible_nvidia_k80_gpus.limit** <br>(gauge) | 선점형 Nvidia K80 GPU 할당량 한도|
| **gcp.gce.region.quota.preemptible_nvidia_k80_gpus.percentage** <br>(gauge) | 선점형 Nvidia K80 GPU 할당량의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.preemptible_nvidia_k80_gpus.usage** <br>(gauge) | 현재 사용 중인 선점형 Nvidia K80 GPU의 수|
| **gcp.gce.region.quota.preemptible_nvidia_p100_gpus.limit** <br>(gauge) | 선점형 Nvidia P100 GPU 할당량 한도|
| **gcp.gce.region.quota.preemptible_nvidia_p100_gpus.percentage** <br>(gauge) | 선점형 Nvidia P100 GPU 할당량의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.preemptible_nvidia_p100_gpus.usage** <br>(gauge) | 현재 사용 중인 선점형 Nvidia P100 GPU의 수|
| **gcp.gce.region.quota.preemptible_nvidia_p100_vws_gpus.limit** <br>(gauge) | 선점형 Nvidia P100 가상 워크스테이션 GPU의 리전 할당량 한도.|
| **gcp.gce.region.quota.preemptible_nvidia_p100_vws_gpus.percentage** <br>(gauge) | 선점형 Nvidia P100 가상 워크스테이션 GPU의 리전 할당량 비율.<br>_percent로 표시_ |
| **gcp.gce.region.quota.preemptible_nvidia_p100_vws_gpus.usage** <br>(gauge) | 선점형 Nvidia P100 가상 워크스테이션 GPU의 리전 할당량 사용량.|
| **gcp.gce.region.quota.preemptible_nvidia_p4_gpus.limit** <br>(gauge) | 선점형 Nvidia P4 GPU의 리전 할당량 한도.|
| **gcp.gce.region.quota.preemptible_nvidia_p4_gpus.percentage** <br>(gauge) | 선점형 Nvidia P4 GPU의 리전 할당량 비율.<br>_percent로 표시_ |
| **gcp.gce.region.quota.preemptible_nvidia_p4_gpus.usage** <br>(gauge) | 선점형 Nvidia P4 GPU의 리전 할당량 사용량.|
| **gcp.gce.region.quota.preemptible_nvidia_p4_vws_gpus.limit** <br>(gauge) | 선점형 Nvidia P4 가상 워크스테이션 GPU의 리전 할당량 한도.|
| **gcp.gce.region.quota.preemptible_nvidia_p4_vws_gpus.percentage** <br>(gauge) | 선점형 Nvidia P4 가상 워크스테이션 GPU의 리전 할당량 비율.<br>_percent로 표시_ |
| **gcp.gce.region.quota.preemptible_nvidia_p4_vws_gpus.usage** <br>(gauge) | 선점형 Nvidia P4 가상 워크스테이션 GPU의 리전 할당량 사용량.|
| **gcp.gce.region.quota.preemptible_nvidia_t4_gpus.limit** <br>(gauge) | 선점형 Nvidia T4 GPU의 리전 할당량 한도.|
| **gcp.gce.region.quota.preemptible_nvidia_t4_gpus.percentage** <br>(gauge) | 선점형 Nvidia T4 GPU의 리전 할당량 비율.<br>_percent로 표시_ |
| **gcp.gce.region.quota.preemptible_nvidia_t4_gpus.usage** <br>(gauge) | 선점형 Nvidia T4 GPU의 리전 할당량 사용량.|
| **gcp.gce.region.quota.preemptible_nvidia_t4_vws_gpus.limit** <br>(gauge) | 선점형 Nvidia T4 가상 워크스테이션 GPU의 리전 할당량 한도.|
| **gcp.gce.region.quota.preemptible_nvidia_t4_vws_gpus.percentage** <br>(gauge) | 선점형 Nvidia T4 가상 워크스테이션 GPU의 리전 할당량 비율.<br>_percent로 표시_ |
| **gcp.gce.region.quota.preemptible_nvidia_t4_vws_gpus.usage** <br>(gauge) | 선점형 Nvidia T4 가상 워크스테이션 GPU의 리전 할당량 사용량.|
| **gcp.gce.region.quota.preemptible_nvidia_v100_gpus.limit** <br>(gauge) | 선점형 Nvidia v100 GPU 할당량 한도|
| **gcp.gce.region.quota.preemptible_nvidia_v100_gpus.percentage** <br>(gauge) | 선점형 Nvidia v100 GPU 할당량의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.preemptible_nvidia_v100_gpus.usage** <br>(gauge) | 현재 사용 중인 선점형 Nvidia v100 GPU의 수|
| **gcp.gce.region.quota.regional_autoscalers.limit** <br>(gauge) | 리전 오토스케일러 할당량 한도|
| **gcp.gce.region.quota.regional_autoscalers.percentage** <br>(gauge) | 지역 오토스케일러 할당량의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.regional_autoscalers.usage** <br>(gauge) | 현재 사용 중인 지역 오토스케일러의 수|
| **gcp.gce.region.quota.regional_instance_group_managers.limit** <br>(gauge) | 지역 인스턴스 그룹 관리자 할당량 한도|
| **gcp.gce.region.quota.regional_instance_group_managers.percentage** <br>(gauge) | 지역 인스턴스 그룹 관리자 할당량의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.regional_instance_group_managers.usage** <br>(gauge) | 현재 사용 중인 지역 인스턴스 그룹 관리자의 수|
| **gcp.gce.region.quota.reservations.limit** <br>(gauge) | 예약 할당량 한도|
| **gcp.gce.region.quota.reservations.percentage** <br>(gauge) | 예약의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.reservations.usage** <br>(gauge) | 사용 중인 예약 할당량|
| **gcp.gce.region.quota.resource_policies.limit** <br>(gauge) | 리소스 정책 할당량 한도|
| **gcp.gce.region.quota.resource_policies.percentage** <br>(gauge) | 리소스 정책 할당량의 현재 사용 비율<br>_percent로 표시_ |
| **gcp.gce.region.quota.resource_policies.usage** <br>(gauge) | 현재 사용 중인 리소스 정책의 수|
| **gcp.gce.region.quota.ssd_total_gb.limit** <br>(gauge) | 총 SSD GB 할당량 한도<br>_gibibyte로 표시_ |
| **gcp.gce.region.quota.ssd_total_gb.percentage** <br>(gauge) | SSD GB 현재 사용률<br>_percent로 표시_ |
| **gcp.gce.region.quota.ssd_total_gb.usage** <br>(gauge) | 사용 중인 총 SSD GB<br>_gibibyte로 표시_ |
| **gcp.gce.region.quota.static_addresses.limit** <br>(gauge) | 고정 주소의 지역 할당량 한도.|
| **gcp.gce.region.quota.static_addresses.percentage** <br>(gauge) | 고정 IP 주소의 리전 할당량 비율.<br>_percent로 표시_ |
| **gcp.gce.region.quota.static_addresses.usage** <br>(gauge) | 고정 IP 주소의 지역 할당량 사용량.|

### 이벤트

Google Cloud Compute Engine 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Compute Engine 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

- [Google Compute Engine 메트릭 모니터링](https://www.datadoghq.com/blog/monitoring-google-compute-engine-performance)
- [Google Compute Engine 메트릭 수집 방법](https://www.datadoghq.com/blog/how-to-collect-gce-metrics)
- [Datadog으로  Google Compute Engine 모니터링하기](https://www.datadoghq.com/blog/monitor-google-compute-engine-with-datadog)