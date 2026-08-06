---
aliases:
- /ko/integrations/google_kubernetes_engine
- /ko/integrations/gke
app_id: google-kubernetes-engine
categories:
- cloud
- containers
- google cloud
- Kubernetes
- log collection
- network
custom_kind: integration
description: 컨테이너화된 애플리케이션을 실행하는 강력한 클러스터 관리 및 오케스트레이션 시스템입니다.
media: []
title: Google 쿠버네티스(Kubernetes) 엔진
---
## 개요

Google Kubernetes Engine(GKE)은 도커(Docker) 컨테이너 실행을 위한 강력한 클러스터 관리자 및 오케스트레이션 시스템입니다.

Google Kubernetes Engine으로 메트릭을 수집하면 다음 작업을 수행할 수 있습니다.

- GKE 컨테이너와 GKE 컨트롤 플레인의 성능을 시각화합니다.
- GKE 컨테이너의 성능과 애플리케이션의 상관 관계를 파악합니다.

본 통합에는 다음과 같은 두 개의 별도 프리셋 대시보드가 제공됩니다.

- 표준 GKE 대시보드는 Google 통합으로 수집한 GKE 및 GKE 컨트롤 플레인 메트릭을 제공합니다.
- 강화 GKE 대시보드는 Datadog의 에이전트 기반 쿠버네티스(Kubernetes) 통합으로 수집한 메트릭과 Google 통합으로 수집한 GKE 컨트롤 플레인 메트릭 을 제공합니다.

표준 대시보드는 간단한 설정만으로 GKE에서 옵저빌리티를 제공합니다. 강화 대시보드는 추가 설정 단계가 필요하지만, 실시간 쿠버네티스(Kubernetes) 메트릭을 더 제공합니다. 대개 프로덕션 환경에서 워크로드를 모니터링할 목적으로 대시보드를 복제 및 사용자 정의할 때 더 적합합니다.

자체 호스팅된 쿠버네티스(Kubernetes) 클러스터와 달리, GKE 컨트롤 플레인은 Google이 관리하며 클러스터에서 실행되는 Datadog 에이전트에서는 접근할 수 없습니다. 따라서 GKE 컨트롤 플레인의 옵저빌리티를 활용하려면 클러스터를 모니터링하는데 Datadog 에이전트를 주로 사용하더라도 Google 통합이 필요합니다.

## 설정

### 메트릭 수집

#### 설치

1. 아직 설정하지 않았다면, 먼저 [Google Cloud Platform 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 표준 메트릭 및 프리셋 대시보드의 추가 설치 단계는 필요하지 않습니다.

1. 향상된 대시보드를 채우고 APM 추적, 로깅, 프로파일링, 보안 및 기타 Datadog 서비스를 활성화하려면 [GKE 클러스터에 Datadog Agent를 설치하세요](https://docs.datadoghq.com/integrations/google-kubernetes-engine/).

1. 컨트롤 플레인 메트릭을 채우려면 [GKE 컨트롤 플레인 메트릭](https://cloud.google.com/kubernetes-engine/docs/how-to/configure-metrics#enable-control-plane-metrics)을 활성화해야 합니다. 컨트롤 플레인 메트릭을 사용하면 Kubernetes 컨트롤 플레인 작업에 관한 옵저버빌리티를 활용할 수 있으며, 이는 GKE에서 Google이 관리합니다.

### 로그 수집

Google Kubernetes Engine 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 로깅을 설정하세요](https://docs.datadoghq.com/integrations/google-cloud-platform/?tab=datadogussite#log-collection).

해당 작업이 완료되면 Google Cloud Logging에서 Google Kubernetes Engine 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [GCP Logs Explorer 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Kubernetes 및 GKE 로그를 필터링하세요.

1. **Create Sink**를 클릭하고 그에 따라 싱크 이름을 지정합니다.

1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.

   {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub 로그를 Pub/Sub로 내보내기" >}}

1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.gke.container.accelerator.duty_cycle** <br>(gauge) | 지난 샘플링 기간 엑셀러레이터가 실제 처리 작업을 수행한 시간의 백분율.<br>_percent로 표시_ |
| **gcp.gke.container.accelerator.memory_total** <br>(gauge) | 총 엑셀레이터 메모리.<br>_byte로 표시_ |
| **gcp.gke.container.accelerator.memory_used** <br>(gauge) | 할당된 총 엑셀레이터 메모리.<br>_byte로 표시_ |
| **gcp.gke.container.accelerator.request** <br>(gauge) | 컨테이너가 요청한 엑셀러레이터 장치 수.<br>_device로 표시됨_ |
| **gcp.gke.container.cpu.core_usage_time** <br>(count) | 컨테이너가 사용한 모든 코어의 누적 CPU 사용량.<br>_second로 표시_ |
| **gcp.gke.container.cpu.limit_cores** <br>(gauge) | 컨테이너 CPU 코어 한도.<br>_core로 표시_ |
| **gcp.gke.container.cpu.limit_utilization** <br>(gauge) | 인스턴스에서 현재 사용 중인 CPU의 한도 대비 사용 비율(분수).<br>_fraction으로 표시_ |
| **gcp.gke.container.cpu.request_cores** <br>(gauge) | 컨테이너가 요청한 CPU 코어의 수.<br>_core로 표시됨_ |
| **gcp.gke.container.cpu.request_utilization** <br>(gauge) | 인스턴스에서 현재 사용 중인 요청 CPU의 대비 사용 비율(분수).<br>_fraction으로 표시_ |
| **gcp.gke.container.ephemeral_storage.limit_bytes** <br>(gauge) | 로컬 임시 스토리지 한도.<br>_byte로 표시_ |
| **gcp.gke.container.ephemeral_storage.request_bytes** <br>(gauge) | 로컬 임시 스토리지 요청.<br>_byte로 표시_ |
| **gcp.gke.container.ephemeral_storage.used_bytes** <br>(gauge) | 로컬 임시 스토리지 사용량.<br>_byte로 표시_ |
| **gcp.gke.container.memory.limit_bytes** <br>(gauge) | 컨테이너 메모리 한도.<br>_byte로 표시_ |
| **gcp.gke.container.memory.limit_utlization** <br>(gauge) | 인스턴스에서 현재 사용 중인 메모리의 한도 대비 사용 비율(분수).<br>_fraction으로 표시_ |
| **gcp.gke.container.memory.page_fault_count** <br>(count) | 유형별로 분류된 페이지 폴트 수.<br>_fault로 표시_ |
| **gcp.gke.container.memory.request_bytes** <br>(gauge) | 컨테이너 메모리 요청.<br>_byte로 표시_ |
| **gcp.gke.container.memory.request_utilization** <br>(gauge) | 인스턴스에서 현재 사용 중인 요청 메모리의 대비 사용 비율(분수).<br>_fraction으로 표시_ |
| **gcp.gke.container.memory.used_bytes** <br>(gauge) | 컨테이너 메모리 사용량.<br>_byte로 표시_ |
| **gcp.gke.container.restart_count** <br>(count) | 컨테이너가 재시작한 횟수.<br>_occurrence로 표시_ |
| **gcp.gke.container.uptime** <br>(gauge) | 컨테이너가 실행된 시간(초).<br>_second로 표시_ |
| **gcp.gke.node.cpu.allocatable_cores** <br>(gauge) | 노드에서 할당 가능한 CPU 코어 수.<br>_core로 표시_ |
| **gcp.gke.node.cpu.allocatable_utilization** <br>(gauge) | 인스턴스에서 현재 사용 중인 할당 가능한 CPU 대비 사용률(분수).<br>_fraction으로 표시_ |
| **gcp.gke.node.cpu.core_usage_time** <br>(count) | 노드에서 사용하는 모든 코어의 누적 CPU 사용량.<br>_second로 표시_ |
| **gcp.gke.node.cpu.total_cores** <br>(gauge) | 노드의 총 CPU 코어 수.<br>_core로 표시_ |
| **gcp.gke.node.ephemeral_storage.allocatable_bytes** <br>(gauge) | 노드에서 할당할 수 있는 로컬 임시 스토리지(바이트).<br>_Shown으로 표시_ |
| **gcp.gke.node.ephemeral_storage.inodes_free** <br>(gauge) | 로컬 임시 스토리지의 여유 inode 수.|
| **gcp.gke.node.ephemeral_storage.inodes_total** <br>(gauge) | 로컬 임시 스토리지의 총 inode 수.|
| **gcp.gke.node.ephemeral_storage.total_bytes** <br>(gauge) | 노드의 총 임시 스토리지(바이트).<br>_byte로 표시_ |
| **gcp.gke.node.ephemeral_storage.used_bytes** <br>(gauge) | 노드가 사용한 로컬 임시 스토리지(바이트).<br>_byte로 표시_ |
| **gcp.gke.node.memory.allocatable_bytes** <br>(gauge) | 노드가 사용한 누적 메모리(바이트).<br>_byte로 표시_ |
| **gcp.gke.node.memory.allocatable_utilization** <br>(gauge) | 인스턴스에서 현재 사용 중인 할당 가능한 메모리 대비 사용률(분수).<br>_fraction으로 표시_ |
| **gcp.gke.node.memory.total_bytes** <br>(gauge) | 노드에서 할당 가능한 메모리(바이트).<br>_ byte로 표시_  |
| **gcp.gke.node.memory.used_bytes** <br>(gauge) | 노드가 사용한 누적 메모리(바이트).<br>_byte로 표시_ |
| **gcp.gke.node.network.received_bytes_count** <br>(count) | 네트워크를 통해 노드가 수신한 누적 바이트.<br>_byte로 표시_ |
| **gcp.gke.node.network.sent_bytes_count** <br>(count) | 네트워크를 통해 노드가 전송한 누적 바이트.<br>_byte로 표시_ |
| **gcp.gke.node.pid_limit** <br>(gauge) | 노드 OS의 최대 PID.|
| **gcp.gke.node.pid_used** <br>(gauge) | 노드의 OS에서 실행 중인 프로세스 수.|
| **gcp.gke.node_daemon.cpu.core_usage_time** <br>(count) | 노드 레벨 시스템 Daemon이 사용한 모든 코어의 누적 CPU 사용량.<br>_second로 표시_ |
| **gcp.gke.node_daemon.memory.used_bytes** <br>(gauge) | 시스템 Daemon의 메모리 사용량.<br>_byte로 표시_ |
| **gcp.gke.pod.network.received_bytes_count** <br>(count) | 네트워크를 통해 포드가 수신한 누적 바이트.<br>_byte로 표시_ |
| **gcp.gke.pod.network.sent_bytes_count** <br>(count) | 네트워크를 통해 포드가 전송한 누적 바이트.<br>_byte로 표시_ |
| **gcp.gke.pod.volume.total_bytes** <br>(gauge) | 포드가 사용할 수 있는 총 디스크 바이트 수.<br>_byte로 표시_ |
| **gcp.gke.pod.volume.used_bytes** <br>(gauge) | 포드가 사용한 디스크 바이트 수.<br>_byte로 표시_ |
| **gcp.gke.pod.volume.utilization** <br>(gauge) | 인스턴스에서 현재 사용 중인 볼륨의 사용률(분수).<br>_fraction으로 표시_ |
| **gcp.gke.control_plane.apiserver.admission_controller_admission_duration_seconds** <br>(gauge) | 이름별로 식별되고 각 작업과 API 리소스 및 유형(유효성 검사 또는 어드미션)으로 구분된 초 단위의 어드미션 컨트롤러 지연 시간 히스토그램.<br>_second로 표시_ |
| **gcp.gke.control_plane.apiserver.admission_step_admission_duration_seconds** <br>(gauge) | 어드미션 하위 단계 지연 시간 히스토그램(초)으로, 각 작업과 API 리소스 및 단계 유형(유효성 검사 또는 어드미션)별로 구분됩니다.<br>_second로 표시_ |
| **gcp.gke.control_plane.apiserver.admission_webhook_admission_duration_seconds** <br>(gauge) | 이름별로 식별되고 각 작업과 API 리소스 및 유형(유효성 검사 또는 어드미션)으로 구분된 초 단위의 어드미션 웹훅 지연 시간 히스토그램.<br>_second로 표시_ |
| **gcp.gke.control_plane.apiserver.current_inflight_requests** <br>(gauge) | 요청 종류별로 이 apiserver가 현재 사용 중인 동시 요청 제한값의 최대 수.<br>_request로 표시_ |
| **gcp.gke.control_plane.apiserver.request_duration_seconds** <br>(gauge) | 각 verb, dry run value, group, version, resource, subresource, scope,  component에 대한 응답 지연 시간 분포(초).<br>_second로 표시_ |
| **gcp.gke.control_plane.apiserver.request_total** <br>(gauge) | 각 verb, dry run value, group, version, resource, scope, component, HTTP response code별로 분류된 apiserver 요청 수.<br>_request로 표시_ |
| **gcp.gke.control_plane.apiserver.response_sizes** <br>(gauge) | 각 group, version, verb, resource, subresource, scope, component별 바이트 단위 응답 크기 분포.<br>_byte로 표시_ |
| **gcp.gke.control_plane.apiserver.storage_objects** <br>(gauge) | 마지막 점검 시점에 저장되어 있는 객체 수를 유형별로 구분하여 나타낸 값. <br>_object로 표시_ |
| **gcp.gke.control_plane.controller_manager.node_collector_evictions_number** <br>(count) | NodeController의 현재 인스턴스가 시작된 이후 발생한 노드 축출(eviction) 횟수.<br>_event로 표시_ |
| **gcp.gke.control_plane.scheduler.pending_pods** <br>(gauge) | 대기열 유형별로 대기 중인 포드 수.<br>_event로 표시_ |
| **gcp.gke.control_plane.scheduler.pod_scheduling_duration_seconds** <br>(gauge) | 스케줄링 중인 포드의 E2e 지연 시간<br>_second로 표시_ |
| **gcp.gke.control_plane.scheduler.preemption_attempts_total** <br>(count) | 현재까지 클러스터의 총 선점 시도 횟수<br>_attempt로 표시_ |
| **gcp.gke.control_plane.scheduler.preemption_victims** <br>(gauge) | 선택된 선점 대상(victim) 수<br>_event로 표시_ |
| **gcp.gke.control_plane.scheduler.scheduling_attempt_duration_seconds** <br>(gauge) | 스케줄링 시도 지연 시간(초)<br>_second로 표시_ |
| **gcp.gke.control_plane.scheduler.schedule_attempts_total** <br>(gauge) | 포드 스케줄링 시도 횟수.<br>_attempt로 표시_ |
| **gcp.gke.control_plane.apiserver.aggregator_unavailable_apiservice** <br>(gauge) | (지원 중단됨)|
| **gcp.gke.control_plane.apiserver.audit_event_total** <br>(gauge) | (지원 중단됨) 생성되어 감사 백엔드로 전송된 감사 이벤트의 누적 횟수<br>_event로 표시_ |
| **gcp.gke.control_plane.apiserver.audit_level_total** <br>(gauge) | (지원 중단됨)|
| **gcp.gke.control_plane.apiserver.audit_requests_rejected_total** <br>(gauge) | (지원 중단됨)<br>_request로 표시_ |
| **gcp.gke.control_plane.apiserver.client_certificate_expiration_seconds** <br>(gauge) | (지원 중단됨)<br>_second로 표시_ |
| **gcp.gke.control_plane.apiserver.etcd_object_counts** <br>(gauge) | (지원 중단됨) 종류별로 구분된 저장 객체 수.<br>_object로 표시_ |
| **gcp.gke.control_plane.apiserver.etcd_request_duration_seconds** <br>(gauge) | (지원 중단됨)<br>_second로 표시_ |
| **gcp.gke.control_plane.apiserver.init_events_total** <br>(gauge) | (지원 중단됨)<br>_event로 표시_ |
| **gcp.gke.control_plane.apiserver.longrunning_gauge** <br>(gauge) | (지원 중단됨) 활성 상태의 모든 장기 실행 apiserver 요청 게이지.<br>_request로 표시_ |
| **gcp.gke.control_plane.apiserver.registered_watchers** <br>(gauge) | (지원 중단됨) 특정 리소스에 현재 등록된 watcher 수.<br>_object로 표시_ |
| **gcp.gke.control_plane.apiserver.workqueue_adds_total** <br>(count) | (지원 중단됨)|
| **gcp.gke.control_plane.apiserver.workqueue_depth** <br>(gauge) | (지원 중단됨)|
| **gcp.gke.control_plane.apiserver.workqueue_longest_running_processor_seconds** <br>(gauge) | (지원 중단됨) 가장 오래 실행 중인 프로세서의 실행 시간(초).<br>_second로 표시_ |
| **gcp.gke.control_plane.apiserver.workqueue_queue_duration_seconds** <br>(gauge) | (지원 중단됨)<br>_second로 표시_ |
| **gcp.gke.control_plane.apiserver.workqueue_retries_total** <br>(count) | (지원 중단됨)|
| **gcp.gke.control_plane.apiserver.workqueue_unfinished_work_seconds** <br>(gauge) | (지원 중단됨)<br>_second로 표시_ |
| **gcp.gke.control_plane.apiserver.workqueue_work_duration_seconds** <br>(gauge) | (지원 중단됨)<br>_second로 표시_ |
| **gcp.gke.control_plane.controller_manager.cloudprovider_gce_api_request_duration_seconds** <br>(gauge) | (지원 중단됨)<br>_second로 표시_ |
| **gcp.gke.control_plane.controller_manager.cronjob_controller_rate_limiter_use** <br>(gauge) | (지원 중단됨) Cronjob 컨트롤러의 레이트 리미터 사용량|
| **gcp.gke.control_plane.controller_manager.daemon_controller_rate_limiter_use** <br>(gauge) | (지원 중단됨) Daemon 컨트롤러의 레이트 리미터 사용량|
| **gcp.gke.control_plane.controller_manager.deployment_controller_rate_limiter_use** <br>(gauge) | (지원 중단됨) 배포 컨트롤러의 레이트 리미터 사용량|
| **gcp.gke.control_plane.controller_manager.endpoint_controller_rate_limiter_use** <br>(gauge) | (지원 중단됨) 엔드포인트 컨트롤러의 레이트 리미터 사용량|
| **gcp.gke.control_plane.controller_manager.gc_controller_rate_limiter_use** <br>(gauge) | (지원 중단됨) GC 컨트롤러의 레이트 리미터 사용량|
| **gcp.gke.control_plane.controller_manager.job_controller_rate_limiter_use** <br>(gauge) | (지원 중단됨) 작업 컨트롤러의 레이트 리미터 사용량|
| **gcp.gke.control_plane.controller_manager.leader_election_master_status** <br>(gauge) | (지원 중단됨)|
| **gcp.gke.control_plane.controller_manager.namespace_controller_rate_limiter_use** <br>(gauge) | (지원 중단됨) 네임스페이스 컨트롤러의 레이트 리미터 사용량|
| **gcp.gke.control_plane.controller_manager.node_collector_evictions_number** <br>(count) | (지원 중단됨) 노드 축출(eviction) 이벤트 수.|
| **gcp.gke.control_plane.controller_manager.node_collector_unhealthy_nodes_in_zone** <br>(gauge) | (지원 중단됨) 비정상 노드 수|
| **gcp.gke.control_plane.controller_manager.node_collector_zone_health** <br>(gauge) | (지원 중단됨)|
| **gcp.gke.control_plane.controller_manager.node_collector_zone_size** <br>(gauge) | (지원 중단됨)|
| **gcp.gke.control_plane.controller_manager.node_ipam_controller_rate_limiter_use** <br>(gauge) | (지원 중단됨) IPAM 컨트롤러의 레이트 리미터 사용량|
| **gcp.gke.control_plane.controller_manager.node_lifecycle_controller_rate_limiter_use** <br>(gauge) | (지원 중단됨) 라이프사이클 컨트롤러의 레이트 리미터 사용량|
| **gcp.gke.control_plane.controller_manager.persistentvolume_protection_controller_rate_limiter_use** <br>(gauge) | (지원 중단됨) 영구 볼륨 보호 컨트롤러의 레이트 리미터 사용량|
| **gcp.gke.control_plane.controller_manager.persistentvolumeclaim_protection_controller_rate_limiter_use** <br>(gauge) | (지원 중단됨) 영구 볼륨 클레임 보호 컨트롤러의 레이트 리미터 사용량|
| **gcp.gke.control_plane.controller_manager.replicaset_controller_rate_limiter_use** <br>(gauge) | (지원 중단됨) ReplicaSet 컨트롤러의 레이트 리미터 사용량|
| **gcp.gke.control_plane.controller_manager.replication_controller_rate_limiter_use** <br>(gauge) | (지원 중단됨) 복제 컨트롤러의 레이트 리미터 사용량|
| **gcp.gke.control_plane.controller_manager.route_controller_rate_limiter_use** <br>(gauge) | (지원 중단됨) 라우트 컨트롤러의 레이트 리미터 사용량|
| **gcp.gke.control_plane.controller_manager.service_controller_rate_limiter_use** <br>(gauge) | (지원 중단됨) 서비스 컨트롤러의 레이트 리미터 사용량|
| **gcp.gke.control_plane.controller_manager.serviceaccount_controller_rate_limiter_use** <br>(gauge) | (지원 중단됨) 서비스 계정 컨트롤러의 레이트 리미터 사용량|
| **gcp.gke.control_plane.controller_manager.serviceaccount_tokens_controller_rate_limiter_use** <br>(gauge) | (지원 중단됨) 서비스 계정 토큰 컨트롤러의 레이트 리미터 사용량|
| **gcp.gke.control_plane.controller_manager.workqueue_adds_total** <br>(count) | (지원 중단됨)|
| **gcp.gke.control_plane.controller_manager.workqueue_depth** <br>(gauge) | (지원 중단됨)|
| **gcp.gke.control_plane.controller_manager.workqueue_longest_running_processor_seconds** <br>(gauge) | (지원 중단됨) 가장 오래 실행 중인 프로세서가 실행된 시간(초).<br>_second로 표시_ |
| **gcp.gke.control_plane.controller_manager.workqueue_queue_duration_seconds** <br>(gauge) | (지원 중단됨)<br>_second로 표시_ |
| **gcp.gke.control_plane.controller_manager.workqueue_retries_total** <br>(count) | (지원 중단됨)|
| **gcp.gke.control_plane.controller_manager.workqueue_unfinished_work_seconds** <br>(gauge) | (지원 중단됨)<br>_second로 표시_ |
| **gcp.gke.control_plane.controller_manager.workqueue_work_duration_seconds** <br>(gauge) | (지원 중단됨)<br>_second로 표시_ |
| **gcp.gke.control_plane.scheduler.binding_duration_seconds** <br>(gauge) | (지원 중단됨) 지연 시간(초)<br>_second로 표시_ |
| **gcp.gke.control_plane.scheduler.e2e_scheduling_duration_seconds** <br>(gauge) | (지원 중단됨) 총 e2e 스케줄링 지연 시간.<br>_second로 표시_ |
| **gcp.gke.control_plane.scheduler.framework_extension_point_duration_seconds** <br>(gauge) | (지원 중단됨)<br>_second로 표시_ |
| **gcp.gke.control_plane.scheduler.leader_election_master_status** <br>(gauge) | (지원 중단됨)|
| **gcp.gke.control_plane.scheduler.scheduling_algorithm_duration_seconds** <br>(gauge) | (지원 중단됨) 총 스케줄링 알고리즘 지연 시간.<br>_second로 표시_ |
| **gcp.gke.control_plane.scheduler.scheduling_algorithm_preemption_evaluation_seconds** <br>(gauge) | (지원 중단됨)<br>_second로 표시_ |

### 이벤트

Google Kubernetes Engine 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Kubernetes Engine 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.