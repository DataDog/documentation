---
algolia:
  subcategory: Marketplace 통합
app_id: mainstorconcept-ziris
app_uuid: dc8b4d40-72a3-46c2-9f9a-ffaadaeacb83
assets:
  dashboards:
    JDBC and z/OS: assets/dashboards/JDBC_Dashboard.json
    MQ Buffer Pool Manager: assets/dashboards/MQ_Buffer_Pool_Manager.json
    MQ Channel Initiator: assets/dashboards/MQ_Channel_Initiator.json
    MQ Data Manager: assets/dashboards/MQ_Data_Manager.json
    MQ Log Manager: assets/dashboards/MQ_Log_Manager.json
    MQ Message Manager: assets/dashboards/MQ_Message_Manager.json
    MQ Storage Manager: assets/dashboards/MQ_Storage_Manager.json
    z/OS Connect Metrics: assets/dashboards/z_OS_Connect_Metrics.json
    z/OS Infrastructure: assets/dashboards/z_OS_Infrastructure.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: mainstorconcept.zos.connect.elapsed_time
      metadata_path: metadata.csv
      prefix: mainstorconcept.zos.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: mainstorconcept-ziris
  monitors:
    MQ Active Dataset Reads: assets/monitors/mq_active_dataset_reads_monitor.json
    MQ Archive Dataset Reads: assets/monitors/mq_archive_dataset_reads_monitor.json
    MQ Checkpoints: assets/monitors/mq_checkpoints_monitor.json
    MQ Insufficient Storage Events: assets/monitors/mq_insufficient_storage_events_monitor.json
    MQ Storage Contractions: assets/monitors/mq_storage_contractions_monitor.json
    MQ Suspensions: assets/monitors/mq_suspensions_monitor.json
author:
  homepage: https://mainstorconcept.com
  name: mainstorconcept GmbH
  sales_email: sales@mainstorconcept.com
  support_email: support@mainstorconcept.com
  vendor_id: mainstorconcept
categories:
- mainframe
- marketplace
- 네트워크
- os & system
- 추적
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: mainstorconcept_ziris
integration_id: mainstorconcept-ziris
integration_title: z/IRIS
integration_version: ''
is_public: true
custom_kind: 통합
legal_terms:
  eula: EULA.pdf
manifest_version: 2.0.0
name: mainstorconcept_ziris
oauth: {}
pricing:
- billing_type: flat_fee
  includes_assets: false
  product_id: ziris
  short_description: 메인프레임에서 MSU 50개를 커버하는 가격.
  unit_price: 4000.0
public_title: z/IRIS
short_description: 메인프레임에서 IBM z/OS의 성능 데이터 수집
supported_os:
- ibm z/os
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Mainframe
  - Category::Marketplace
  - Category::Network
  - Category::OS & System
  - Category::Tracing
  - Offering::Integration
  - Supported OS::IBM z/OS
  - Supported OS::Linux
  configuration: README.md#Setup
  description: 메이프레임에서 IBM z/OS의 성능 데이터 수집
  media:
  - caption: z/IRIS - 메인프레임까지 포함하여 관측 가능
    image_url: images/thumbnail_mainstorconcept_ziris.PNG
    media_type: 비디오
    vimeo_id: 630489680
  - caption: z/IRIS가 생성한 스팬으로 서비스 매핑
    image_url: images/datadog-service-map-with-spans-created-by-ziris.png
    media_type: image
  - caption: z/IRIS 대시보드
    image_url: images/datadog-ziris-dashboards.png
    media_type: image
  - caption: Trace Explorer 내 z/OS 애플리케이션 성능 분석
    image_url: images/datadog-trace-explorer-filtering-zos-application-performance-measurements.png
    media_type: image
  - caption: z/IRIS를 플레임 그래프와 스팬 목록으로 확장 가능
    image_url: images/datadog-annotated-zosconnect-cics-db2-trace-page.png
    media_type: image
  - caption: z/IRIS와 Datadog 통합
    image_url: images/ziris-otel-integration-with-datadog.png
    media_type: image
  - caption: CICS 서비스 페이지
    image_url: images/datadog-annotated-cics-service-page.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: z/IRIS
  uninstallation: README.md#Uninstallation
---



## 개요

[z/IRIS][1]를 사용해 백엔드 메인프레임 애플리케이션에서 추가 트레이스와 메트릭을 얻어 엔터프라이즈 관측성을 높이고 다양한 혜택을 얻으세요.

* 클라우드, 서버, 또는 메인스트림에서 호스팅 중인 서비스와 애플리케이션 간 관계를 가시화합니다.
* 메인프레임 애플리케이션이 최종 사용자 경험에 어떤 영향을 미치는지 알아볼 수 있습니다.
* [Datadog Watchdog][23]를 활용해 복구 평균 시간(MTTR)을 줄이고 디지털 비즈니스 서비스에 영향을 주는 z/OS 애플리케이션 이상 징후를 감지할 수 있습니다.
* 대시보드를 공유하고 플랫폼 간 인시던트 분석을 도와주는 인터페이스를 활용해 애플리케이션 팀과 메인프레임 플랫폼 관리자 간의 의사소통을 개선합니다.


z/IRIS는 IBM 시스템 Z 메인프레임에서 실행 중인 트랜잭션과 애플리케이션의 텔레메트리(트레이스와 메트릭)을 Datadog로 전송합니다.

활성화하면 다음이 실행됩니다.

 * Datadog의 [Service Map][24]에 CICS, MQ, Db2와 같은 z/OS 서비스 통합이 나타납니다.
 * 호출 빈도, 오류율, 대기 시간은 메인프레임 서비스에서 활성화된 성능 지표입니다.
 * 메인프레임 애플리케이션으로 흐르는 요청이 플레임 그래프와 스팬 목록으로 가시화됩니다.
 * 트레이스 페이지에 관련 z/OS 시스템의 오류 메시지가 포함됩니다.


z/IRIS 텔레메트리를 이용하면 메인프레임의 내부 운영까지 가시성을 확장해 개발자 경험과 운영 경험을 향상할 수 있습니다. Datadog 사용자는 다음을 할 수 있습니다.

* z/IRIS 대시보드를 활성화해 z/OS 시스템과 애플리케이션 상태 모니터링
* 메인프레임 애플리케이션에 SLO 침해가 있을 시 팀에게 알리는 모니터 생성
* 메인프레임 애플리케이션이 총 반응 시간 및 전체적인 가용성에 미치는 영향 분석
* 메인프레임 내부 및 외부 변경 사항이 애플리케이션의 작동과 안전성에 미치는 영향 조사
* 메인프레임 애플리케이션에서 최종 사용자의 경험에 영향을 미치는 오류 메시지를 확인

### 통합 방법

z/IRIS를 Datadog와 통합하는 방법에는 두 가지가 있습니다.

* **OTEL(OpenTelemetry)**: 이 관측 프레임워크는 APM 통합을 표준화하며 Datadog에서 전체 지원이 됩니다. z/IRIS에서 OpenTelemetry Collector로 트레이스와 메트릭을 스트림하며, OpenTelemetry Collector에서는 Datadog 환경으로 텔레메트리를 전송하도록 구성되어 있습니다.
* **Datadog API(베타):** z/IRIS에서 Datadog의 HTTP REST API를 사용해 Datadog 에이전트 API와 이벤트를 통해 트레이스를 스트림할 수 있습니다. 이 통합은 z/IRIS를 평가하면서 관리 노고를 줄이기 위해 평가판과 POC(Proof of Concept) 프로젝트에서만 사용할 수 있습니다. 프로덕션 사용 사례에는 적합하지 않습니다.

z/IRIS의 통합과 관련한 자세한 내용은 [z/IRIS 설명서][3]를 참고하세요.

### 트러블슈팅

스팬은 작업 프로세스의 단위입니다. 스팬은 요청이 트리거될 때 애플리케이션과 서비스에서 요청이 어떻게 흐르는지를 나타내는 분산 트레이스의 구성 요소입니다.

z/IRIS의 경우 Datadog 내에서 트레이스를 스팬까지 확장해 IBM Z 메인프레임 애플리케이션의 프로세스와 트랜잭션까지 포함합니다. 이렇게 트레이스를 확장하면 사용자가 메인프레임의 서비스에서 클라우드와 서버 애플리케이션의 소비 상태를 확인할 수 있어 새로운 인사이트를 얻게 됩니다. 오류 빈도, 호출율, 요청 대기 시간 등과 같은 메인프레임 기반 애플리케이션의 성능 지표를 확인해 메인프레임 통합의 상태를 파악할 수 있습니다.

#### 스팬

z/IRIS에서는 다음 메인프레임 시스템에서 처리된 트랜잭션과 운영의 스팬을 생성합니다.

* [z/OS용 Db2][4]
* [z/OS Connect][5]
* [z/OS용 IBM MQ][7]
* [CICS 트랜잭션 서버(예: CICS TS)][8]
* [일괄 작업[6]
* [TSO 사용자 활동][6]

향후 더 많은 스팬이 추가될 예정입니다. 위 목록에 없는 z/OS 애플리케이션이나 하위 시스템 지원과 관련한 문의 사항은 [ziris@mainstorconcept.com][2]으로 연락하세요.

#### 워크플로우 추적

z/IRIS에서는 메인프레임의 작동이 외부 애플리케이션 요청으로 인해 트리거된 것인지를 파악하여 생성한 스팬이 반드시 애플리케이션 요청에 추가되도록 합니다. 예를 들어 클라우드 애플리케이션에서 메인프레임 애플리케이션으로 처리 요청을 보내면 z/IRIS가 메인프레임 애플리케이션의 처리 작업이 외부 요청과 관련이 있다는 것을 감지한 후, 클라우드 애플리케이션 요청 트레이스에 메인프레임 애플리케이션의 스팬이 추가되도록 합니다.

z/IRIS 워크플로 추적에서는 다음 요청 워크플로우를 추적합니다.

* REST API 요청 -> z/OS Connect EE -> SOR(CICS TS, z/OS용 Db2, IMS, 또는 IBM MQ) -> Db2 for z/OS 
* JDBC -> z/OS용 Db2
* IBM MQ(Linux, Windows, AIX) -> z/OS용 IBM MQ -> CICS TS -> z/OS용 Db2
* CICS TS -> z/OS용 Db2


#### 태그

요청과 관련한 메타데이터, 리소스 활용, 관련 z/OS 시스템에 관한 정보는 [Trace Explorer][9]에서 쿼리를 만들 때 사용하는 태그를 통해 제공됩니다. [Watchdog Insights][10]에서 이 정보를 처리하여 메인프레임 서비스의 이상 징후를 감지해 사용자에게 알려줍니다.

다음은 z/IRIS로 생성하는 태그의 전체 목록입니다.

| 트레이스 태그 이름                                    | 설명                                   |
|---------------------------------------------------|-----------------------------------------------|
| db.db2.collection.id                              | Db2 수집 ID                             |
| db.db2.instance_name                              | Db2 인스턴스 이름                             |
| db.system                                         | DB 시스템                                     |
| db.user                                           | DB 사용자                                       |
| enduser.id                                        | 최종 사용자 ID                                   |
| host.arch                                         | 호스트 아키텍처                             |
| host.name                                         | 호스트 이름                                     |
| http.client_ip                                    | HTTP 클라이언트 IP                                |
| http.method                                       | HTTP 메서드                                   |
| http.request_content_length                       | HTTP 요청 컨텐츠 길이                   |
| http.response_content_length                      | HTTP 응답 컨텐츠 길이                  |
| http.status_code                                  | HTTP 상태 코드                              |
| ibm-mq.manager                                    | IBM MQ 관리자                                |
| ibm.machine.logical_partition                     | IBM 컴퓨터 로지컬 파티션                 |
| ibm.machine.model                                 | IBM 컴퓨터 모델                             |
| ibm.machine.type                                  | IBM 컴퓨터 유형                              |
| messaging.conversation_id                         | 메시지 대화 ID                     |
| messaging.destination                             | 메시지 대상                         |
| messaging.destination_kind                        | 메시지 대상 유형                    |
| messaging.system                                  | 메시지 시스템                              |
| net.peer.ip                                       | 넷 피어 IP                                   |
| net.peer.port                                     | 넷 피어 포트                                 |
| net.sock.peer.addr                                | Net sock 피어 주소                            |
| net.sock.peer.cipher                              | Net sock 피어 암호화                          |
| net.sock.peer.port                                | Net sock 피어 포트                            |
| os.type                                           | OS 유형                                       |
| ziris.job.identifier                              | z/OS 작업 식별자                           |
| zos.cf.calls                                      | CF 요청                                      |
| zos.cf.elapsed.time_ms                            | CF 경과된 시간                               |
| zos.cics.application.name                         | CICS 애플리케이션 이름                         |
| zos.cics.application.operation                    | CICS 애플리케이션 작업                    |
| zos.cics.application.platform_name                | CICS 애플리케이션 플랫폼 이름                |
| zos.cics.application.version                      | CICS 애플리케이션 버전                      |
| zos.cics.atom_service_name                        | CICS ATOM 서비스 이름                        |
| zos.cics.bts.activity.id                          | CICS BTS 활동 ID                          |
| zos.cics.bts.activity.name                        | CICS BTS 활동 이름                        |
| zos.cics.bts.process.id                           | CICS BTS 프로세스 ID                           |
| zos.cics.bts.process.name                         | CICS BTS 프로세스 이름                         |
| zos.cics.bts.process.type                         | CICS BTS 프로세스 유형                         |
| zos.cics.connection.access_type                   | CICS 연결 액세스 유형                   |
| zos.cics.connection.name                          | CICS 연결 이름                          |
| zos.cics.connection.type                          | CICS 연결 유형                          |
| zos.cics.ipconn_name                              | CICS ipconn 이름                              |
| zos.cics.net.peer.name                            | CICS 넷 피어 이름                            |
| zos.cics.nodejs_application_name                  | CICS nodejs 애플리케이션 이름                  |
| zos.cics.pipeline_name                            | CICS 파이프라인 이름                            |
| zos.cics.region_name                              | CICS 리전 이름                              |
| zos.cics.session.id                               | CICS 세션 ID                               |
| zos.cics.session.type                             | CICS 세션 유형                             |
| zos.cics.tcpipservice.name                        | CICS TCP/IP 서비스 이름                      |
| zos.cics.tcpipservice.origin.client.ip            | CICS TCP/IP 서비스 시작 클라이언트 IP          |
| zos.cics.tcpipservice.origin.client.port          | CICS TCP/IP 서비스 시작 클라이언트 포트        |
| zos.cics.tcpipservice.origin.name                 | CICS TCP/IP 서비스 시작 이름               |
| zos.cics.tcpipservice.origin.port                 | CICS TCP/IP 서비스 시작 포트               |
| zos.cics.tcpipservice.port                        | CICS TCP/IP 서비스 포트                      |
| zos.cics.transaction.api.requests                 | CICS 트랜잭션 API 요청                 |
| zos.cics.transaction.auth.time_ms                 | CICS 트랜잭션 인증 시간                    |
| zos.cics.transaction.class                        | CICS 트랜잭션 클래스                        |
| zos.cics.transaction.cpu.time_ms                  | CICS 트랜잭션 CPU 시간                     |
| zos.cics.transaction.exception.wait.time_ms       | CICS 트랜잭션 예외 대기 시간          |
| zos.cics.transaction.gpu.time_ms                  | CICS 트랜잭션 GPU 시간                     |
| zos.cics.transaction.group_id                     | CICS 트랜잭션 그룹 ID                     |
| zos.cics.transaction.id                           | CICS 트랜잭션 ID                           |
| zos.cics.transaction.jvm.elapsed.time_ms          | CICS 트랜잭션 JVM 경과된 시간             |
| zos.cics.transaction.jvm.init.time_ms             | CICS 트랜잭선 JVM 초기화 시간                |
| zos.cics.transaction.jvm.wait.time_ms             | CICS 트랜잭션 JVM 대기 시간                |
| zos.cics.transaction.number                       | CICS 트랜잭션 수                       |
| zos.cics.transaction.origin.adapter.data1         | CICS 트랜잭션 시작 어댑터 데이터1         |
| zos.cics.transaction.origin.adapter.data2         | CICS 트랜잭션 시작 어댑터 데이터2         |
| zos.cics.transaction.origin.adapter.data3         | CICS 트랜잭션 시작 어댑터 데이터3         |
| zos.cics.transaction.origin.adapter.product       | CICS 트랜잭션 시작 어댑터 제품       |
| zos.cics.transaction.origin.application.id        | CICS 트랜잭션 시작 애플리케이션 ID        |
| zos.cics.transaction.origin.id                    | CICS 트랜잭션 시작 ID                    |
| zos.cics.transaction.origin.network.id            | CICS 트랜잭션 시작 네트워크 ID            |
| zos.cics.transaction.origin.number                | CICS 트랜잭션 시작 수                |
| zos.cics.transaction.origin.user_id               | CICS 트랜잭션 시작 사용자 ID               |
| zos.cics.transaction.priority                     | CICS 트랜잭션 우선 순위                     |
| zos.cics.transaction.program.name                 | CICS 트랜잭션 프로그램 이름                 |
| zos.cics.transaction.program.return_code_current  | CICS 트랜잭션 프로그램 현재 반환 코드  |
| zos.cics.transaction.program.return_code_original | CICS 트랜잭션 프로그램 시작 반환 코드 |
| zos.cics.transaction.remote.task.requests         | CICS 트랜잭션 원격 작업 요청         |
| zos.cics.transaction.rmi.elapsed.time_ms          | CICS 트랜잭션 RMI 경과된 시간             |
| zos.cics.transaction.rmi.wait.time_ms             | CICS 트랜잭션 RMI 대기 시간                |
| zos.cics.transaction.routed.host.name             | CICS 트랜잭션 라우팅된 호스트 이름             |
| zos.cics.transaction.start_type                   | CICS 트랜잭선 시작 유형                   |
| zos.cics.transaction.tcb.attachments              | CICS 트랜잭션 TCB 연결              |
| zos.cics.transaction.tcb.cpu.time_ms              | CICS 트랜잭션 TCB CPU 시간                 |
| zos.cics.transaction.tcb.elapsed.time_ms          | CICS 트랜잭션 TCB 경과된 시간             |
| zos.cics.transaction.tcb.wait.time_ms             | CICS 트랜잭션 TCB 대기 시간                |
| zos.cics.transaction.user_id                      | CICS 트랜잭션 사용자 ID                      |
| zos.cics.transaction.wait.time_ms                 | CICS 트랜잭션 대기 시간                    |
| zos.cics.transaction.ziip.time_ms                 | CICS 트랜잭션 ZIIP 시간                    |
| zos.cics.urimap.name                              | CICS URIMAP 이름                              |
| zos.cics.urimap.program_name                      | CICS URIMAP 프로그램 이름                      |
| zos.cics.webservice.name                          | CICS 웹 서비스 이름                         |
| zos.cics.webservice.operation_name                | CICS 웹 서비스 작업 이름               |
| zos.connect.api.name                              | z/OS Connect의 API 이름                      |
| zos.connect.api.version                           | z/OS Connect의 API 버전                   |
| zos.connect.request.id                            | 요청 ID                                    |
| zos.connect.request.timed_out                     | 요청 시간 초과                              |
| zos.connect.request.user_name                     | 요청 사용자 이름                             |
| zos.connect.service.name                          | 서비스 이름                                  |
| zos.connect.service.version                       | 서비스 버전                               |
| zos.connect.service_provider.name                 | 서비스 공급자 이름                         |
| zos.connect.sor.identifier                        | SOR 식별자                                |
| zos.connect.sor.reference                         | SOR 참조                                 |
| zos.connect.sor.request.received_time             | 받은 SOR 요청                          |
| zos.connect.sor.request.sent_time                 | SOR 요청 전송 시간                         |
| zos.connect.sor.resource                          | SOR 리소스                                  |
| zos.correlation.id                                | z/OS 상관 관계 ID                           |
| zos.cpu.time_ms                                   | z/OS CPU 시간                                 |
| zos.db2.abort.requests                            | Db2 중단 요청                             |
| zos.db2.ace                                       | Db2 ACE                                       |
| zos.db2.client.application.name                   | Db2 클라이언트 애플리케이션 이름                   |
| zos.db2.client.auth.id                            | Db2 클라이언트 인증 ID                            |
| zos.db2.client.platform                           | Db2 클라이언트 플랫폼                           |
| zos.db2.connection.id                             | Db2 연결 ID                             |
| zos.db2.consistency.token                         | Db2 일관성 토큰                         |
| zos.db2.cpu.time_ms                               | Db2 CPU 시간                                  |
| zos.db2.deadlock.resources                        | Db2 교착 리소스                        |
| zos.db2.elapsed.time_ms                           | Db2 경과된 시간                              |
| zos.db2.end.timestamp                             | Db2 종료 타임스탬프                             |
| zos.db2.location.name                             | Db2 위치 이름                             |
| zos.db2.lock.duration                             | Db2 잠금 시간                             |
| zos.db2.lock.request                              | Db2 잠금 요청                              |
| zos.db2.lock.state                                | Db2 잠금 상태                                |
| zos.db2.luw.id                                    | Db2 LUW ID                                    |
| zos.db2.plan.name                                 | Db2 플랜 이름                                 |
| zos.db2.product.id                                | Db2 제품 ID                                |
| zos.db2.program.name                              | Db2 프로그램 이름                              |
| zos.db2.received.bytes                            | Db2 수신 바이트                            |
| zos.db2.remote.location.name                      | Db2 원격 위치 이름                      |
| zos.db2.response.time_ms                          | Db2 응답 시간                             |
| zos.db2.sent.bytes                                | Db2 발신 바이트                                |
| zos.db2.sql.lock.statements                       | Db2 SQL 잠금 문                        |
| zos.db2.sql.open.statements                       | Db2 SQL 시작 문                        |
| zos.db2.sql.prepare.statements                    | Db2 SQL 준비 문                     |
| zos.db2.sql.storedprocedure.statements            | Db2 SQL 저장 프로시저                      |
| zos.db2.start.timestamp                           | Db2 시작 타임스탬프                           |
| zos.db2.statement.id                              | Db2 문 ID                              |
| zos.db2.statement.type                            | Db2 문 유형                            |
| zos.db2.su.factor                                 | Db2 SU 팩터                                 |
| zos.db2.thread.token                              | Db2 스레드 토큰                              |
| zos.db2.uniqueness.value                          | Db2 고유성 값                          |
| zos.db2.unlock.requests                           | Db2 잠금 해제 요청                            |
| zos.db2.version                                   | Db2 버전                                   |
| zos.db2.wait.time_ms                              | Db2 대기 시간                                 |
| zos.db2.workload.service.class.name               | Db2 워크로드 서비스 클래스 이름               |
| zos.db2.ziip.time_ms                              | Db2 ZIIP 시간                                 |
| zos.jes.job.correlator                            | JES 작업 상관 관계 식별자                            |
| zos.job.class                                     | z/OS 작업 클래스                                |
| zos.job.step.cpu.time_ms                          | z/OS 작업 단계 CPU 시간                        |
| zos.job.step.cpu.units                            | z/OS 단계 CPU 유닛                           |
| zos.job.step.ended                                | z/OS 작업 단계 종료                           |
| zos.job.step.name                                 | z/OS 작업 단계 이름                            |
| zos.job.step.number                               | z/OS 작업 단계 수                          |
| zos.job.step.program_name                         | z/OS 작업 단계 프로그램 이름                    |
| zos.job.step.return_code                          | z/OS 작업 단계 반환 코드                     |
| zos.job.step.ziip.time_ms                         | z/OS 작업 단계 ZIIP 시간                       |
| zos.lu.name                                       | z/OS LU 이름                                  |
| zos.mq.accounting_token                           | MQ 계정 토큰                           |
| zos.mq.buffer_pool                                | MQ 버퍼 풀                                |
| zos.mq.calls                                      | MQ 호출                                      |
| zos.mq.cf_structure                               | MQ CF 구조                               |
| zos.mq.channel.connection_name                    | MQ 채널 연결 이름                    |
| zos.mq.channel.name                               | MQ 채널 이름                               |
| zos.mq.connection.auth_id                         | MQ 연결 인증 ID                         |
| zos.mq.connection.name                            | MQ 연결 이름                            |
| zos.mq.connection.type                            | MQ 연결 유형                            |
| zos.mq.connection.user_id                         | MQ 연결 사용자 ID                         |
| zos.mq.context_token                              | MQ 컨텍스트 토큰                              |
| zos.mq.correlation_id                             | MQ 상관 관계 ID                             |
| zos.mq.luw_id                                     | MQ LUW ID                                     |
| zos.mq.messages                                   | MQ 메시지                                   |
| zos.mq.mqcb.calls                                 | MQ MQCb 호출                                 |
| zos.mq.mqcb.cpu.time_ms                           | MQ MQCb CPU 시간                              |
| zos.mq.mqcb.elapsed.time_ms                       | MQ MQCb 경과된 시간                          |
| zos.mq.mqclose.calls                              | MQ MQClose 호출                              |
| zos.mq.mqclose.cpu.time_ms                        | MQ MQClose CPU 시간                           |
| zos.mq.mqclose.elapsed.time_ms                    | MQ MQClose 경과된 시간                       |
| zos.mq.mqclose.suspended.calls                    | MQ MQClose 일시 중단된 호출                    |
| zos.mq.mqclose.wait.time_ms                       | MQ MQClose 대기 시간                          |
| zos.mq.mqget.browse.specific.calls                | MQ MQGet 특정 호출 찾아보기                |
| zos.mq.mqget.browse.unspecific.calls              | MQ MQGet 일반 호출 찾아보기              |
| zos.mq.mqget.calls                                | MQ MQGet 호출                                |
| zos.mq.mqget.cpu.time_ms                          | MQ MQGet CPU 시간                             |
| zos.mq.mqget.destructive.specific.calls           | MQ MQGet 특정 호출 제거           |
| zos.mq.mqget.destructive.unspecific.calls         | MQ MQGet 일반 호출 제거         |
| zos.mq.mqget.elapsed.time_ms                      | MQ MQGet 경과된 시간                         |
| zos.mq.mqget.errors                               | MQ MQGet 오류                               |
| zos.mq.mqget.expired.messages                     | MQ MQGet 만료 메시지                     |
| zos.mq.mqget.log.forced.wait.time_ms              | MQ MQGet 로그 강제 대기 시간                 |
| zos.mq.mqget.log.forced.writes                    | MQ MQGet 로그 강제 쓰기                    |
| zos.mq.mqget.log.wait.time_ms                     | MQ MQGet 로그 대기 시간                        |
| zos.mq.mqget.log.writes                           | MQ MQGet 로그 쓰기                           |
| zos.mq.mqget.message.max.size_bytes               | MQ MQGet 메시지 최대 크기                     |
| zos.mq.mqget.messages.min.size_bytes              | MQ MQGet 메시지 최소 크기                     |
| zos.mq.mqget.pageset.reads                        | MQ MQGet 페이지 세트 읽기                        |
| zos.mq.mqget.pageset.wait.time_ms                 | MQ MQGet 페이지 세트 대기 시간                    |
| zos.mq.mqget.persistent.messages                  | MQ MQGet 영구 메시지                  |
| zos.mq.mqget.skipped.messages                     | MQ MQGet 건너뛴 메시지                     |
| zos.mq.mqget.skipped.pages                        | MQ MQGet 건너뛴 페이지                        |
| zos.mq.mqget.successful_calls                     | MQ MQGet 성공한 호출                     |
| zos.mq.mqget.suspended.calls                      | MQ MQGet 일시 중단된 호출                      |
| zos.mq.mqget.wait.time_ms                         | MQ MQGet 대기 시간                            |
| zos.mq.mqinq.calls                                | MQ MQInq 호출                                |
| zos.mq.mqinq.cpu.time_ms                          | MQ MQInq CPU 시간                             |
| zos.mq.mqinq.elapsed.time_ms                      | MQ MQInq 경과된 시간                         |
| zos.mq.mqopen.calls                               | MQ MQOpen 호출                               |
| zos.mq.mqopen.cpu.time_ms                         | MQ MQOpen CPU 시간                            |
| zos.mq.mqopen.elapsed.time_ms                     | MQ MQOpen 경과된 시간                        |
| zos.mq.mqopen.suspended.calls                     | MQ MQOpen 일시 중단된 호출                     |
| zos.mq.mqopen.wait.time_ms                        | MQ MQOpen 대기 시간                           |
| zos.mq.mqput.calls                                | MQ MQPut 호출                                |
| zos.mq.mqput.cpu.time_ms                          | MQ MQPut CPU 시간                             |
| zos.mq.mqput.elapsed.time_ms                      | MQ MQPut 경과된 시간                         |
| zos.mq.mqput.log.forced.wait.time_ms              | MQ MQPut 로그 강제 대기 시간                 |
| zos.mq.mqput.log.forced.writes                    | MQ MQPut 로그 강제 쓰기                    |
| zos.mq.mqput.log.wait.time_ms                     | MQ MQPut 로그 대기 시간                        |
| zos.mq.mqput.log.writes                           | MQ MQPut 로그 쓰기                           |
| zos.mq.mqput.message.max.size_bytes               | MQ MQPut 메시지 최대 크기                     |
| zos.mq.mqput.message.min.size_bytes               | MQ MQPut 메시지 최소 크기                     |
| zos.mq.mqput.pageset.elapsed.time_ms              | MQ MQPut 페이지 세트 경과된 시간                 |
| zos.mq.mqput.pageset.writes                       | MQ MQPut 페이지 세트 쓰기                       |
| zos.mq.mqput.suspended.calls                      | MQ MQPut 일시 중단된 호출                      |
| zos.mq.mqput.wait.time_ms                         | MQ MQPut 대기 시간                            |
| zos.mq.mqput1.calls                               | MQ MQPut1 호출                               |
| zos.mq.mqput1.cpu.time_ms                         | MQ MQPut1 CPU 시간                            |
| zos.mq.mqput1.elapsed.time_ms                     | MQ MQPut1 경과된 시간                        |
| zos.mq.mqput1.log.forced.wait.time_ms             | MQ MQPut1 로그 강제 대기 시간                |
| zos.mq.mqput1.log.forced.writes                   | MQ MQPut1 로그 강제 쓰기                   |
| zos.mq.mqput1.log.wait.time_ms                    | MQ MQPut1 로그 대기 시간                       |
| zos.mq.mqput1.log.writes                          | MQ MQPut1 로그 쓰기                          |
| zos.mq.mqput1.pageset.wait.time_ms                | MQ MQPut1 페이지 세트 대기 시간                   |
| zos.mq.mqput1.pageset.writes                      | MQ MQPut1 페이지 세트 쓰기                      |
| zos.mq.mqput1.suspended.calls                     | MQ MQPut1 일시 중단된 호출                     |
| zos.mq.mqput1.wait.time_ms                        | MQ MQPut1 대기 시간                           |
| zos.mq.mqset.calls                                | MQ MQSet 호출                                |
| zos.mq.mqset.cpu.time_ms                          | MQ MQSet CPU 시간                             |
| zos.mq.mqset.elapsed.time_ms                      | MQ MQSet 경과된 시간                         |
| zos.mq.mqset.log.forced.wait.time_ms              | MQ MQSet 로그 강제 대기 시간                 |
| zos.mq.mqset.log.forced.writes                    | MQ MQSet 로그 강제 쓰기                    |
| zos.mq.mqset.log.wait.time_ms                     | MQ MQSet 로그 대기 시간                        |
| zos.mq.mqset.log.writes                           | MQ MQSet 로그 쓰기                           |
| zos.mq.mqsub.selection.calls                      | MQ MQSub 선택 호출                      |
| zos.mq.pageset                                    | MQ 페이지 세트                                    |
| zos.mq.put.delayed_messages                       | MQ Put 지연 메시지                       |
| zos.mq.put.errors                                 | MQ Put 오류                                 |
| zos.mq.put.successful_calls                       | MQ Put 성공한 호출                       |
| zos.mq.qsg_type                                   | MQ QSG 유형                                   |
| zos.mq.queue.index_type                           | MQ 대기열 인덱스 유형                           |
| zos.mq.queue.max_depth                            | MQ 대기열 최대 깊이                            |
| zos.mq.topic.mqclose.srb.cpu.time_ms              | MQ Topic MQClose SRB CPU 시간                 |
| zos.mq.topic.mqopen.srb.cpu.time_ms               | MQ Topic MQOpen SRB CPU 시간                  |
| zos.mq.topic.mqput.srb.cpu.time_ms                | MQ Topic MQPut SRB CPU 시간                   |
| zos.mq.topic.mqput1.srb.cpu.time_ms               | MQ Topic MQPut1 SRB CPU 시간                  |
| zos.mq.topic.published_messages                   | MQ Topic 게재 메시지                   |
| zos.network.id                                    | z/OS 네트워크 ID                               |
| zos.racf.group.id                                 | z/OS RACF 그룹 ID                            |
| zos.subsystem.name                                | z/OS 하위 시스템 이름                           |
| zos.tape.mounts                                   | z/OS 테이프 연결                              |
| zos.uow                                           | z/OS UOW                                      |
| zos.user.id                                       | z/OS 사용자 ID                                  |
| zos.user.name                                     | z/OS 사용자 이름                                |
| zos.vtam.application.id                           | VTAM 애플리케이션 ID                           |
| zos.wlm.report.class.name                         | WLM 보고 클래스 이름                         |
| zos.wlm.service.class.name                        | WLM 서비스 클래스 이름                        |
| zos.ziip.time_ms                                  | z/OS ZIIP 시간                                |


### 메인프레임 메트릭

* [인프라스트럭처 메트릭][11] 
    * z/OS 시스템의 리소스 활용을 모니터링합니다. 인프라스트럭처 메트릭은 CPU(예: 일반 프로세서와 zIIP 엔진) 활용 및 경합을 지원합니다.

* [z/OS Connect 메트릭][12]
    * 수신 요청, 반환 코드, 요청 메서드, 서버 대기 시간, 서비스 공급자(예: SOR) 대기 시간과 같은 z/OS Connect 서버 활동과 성능을 모니터링합니다.

* [MQ 메트릭][13]
    * z/OS의 MQ Queue Managers와 리소스(예: 스토리지, 버퍼 풀, 로그, 채널) 상태를 모니터링합니다.

원하는 메트릭을 찾을 수 없나요? 조직에 필요한 중요 기능이 빠져있나요? [ziris@mainstorconcept.com][2]로 기능을 요청하세요.

### 프라이빗 엔터프라이즈 제공 사항

* E-mail: [mainstorconcept GmbH][2]
* 전화: +49 721 7907610

### 라이센스

체험 기간이 만료된 후 24시간 내에  z/IRIS 평가 라이센스를 이메일로 보내드립니다. 

### 검증

관련 구성 요소를 사용할 수 있고 [최소 요구 사항][14]을 만족하는지 확인하세요.

## 지원팀

지원이 필요하거나 기능을 요청하고 싶을 경우 다음 채널을 통해 z/IRIS로 문의하세요.

- Email: [support@mainstorconcept.com][20]로 이메일을 보내주세요. Datadog 통합 기능과 관련한 시연이나 문의 사항은 [ziris@mainstorconcept.com](mailto:ziris@mainstorconcept.com)으로 문의주세요.
- 지원: [Mainstorconcept Portal][21]

### 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog Marketplace에서 mainstorconcept 제품을 구입해 메인프레임 성능을 모니터링하기][22]

[1]: https://www.mainstorconcept.com/z-iris-mainframe-observability/z-iris-datadog/?lang=en
[2]: mailto:ziris@mainstorconcept.com
[3]: https://public.mainstorconcept.com/home/observability-with-datadog
[4]: https://public.mainstorconcept.com/home/distributed-db2-for-z-os-observability
[5]: https://public.mainstorconcept.com/home/z-os-connect-observability
[6]: https://public.mainstorconcept.com/home/z-os-work-observability
[7]: https://public.mainstorconcept.com/home/ibm-mq-for-z-os-observability
[8]: https://public.mainstorconcept.com/home/cics-transaction-observability
[9]: https://docs.datadoghq.com/ko/tracing/trace_explorer/
[10]: https://docs.datadoghq.com/ko/watchdog/
[11]: https://public.mainstorconcept.com/home/rmf-metrics-streaming
[12]: https://public.mainstorconcept.com/home/z-os-connect-metrics-streaming
[13]: https://public.mainstorconcept.com/home/mq-metrics-streaming
[14]: https://public.mainstorconcept.com/home/troubleshooting-opentelemetry-integration
[15]: https://public.mainstorconcept.com/home/irontap-image
[16]: https://public.mainstorconcept.com/home/configure-irontap-container 
[17]: https://public.mainstorconcept.com/home/install-z-iris-clients
[18]: https://public.mainstorconcept.com/home/configure-z-iris-clients
[19]: https://public.mainstorconcept.com/home/z-iris-client-started-task
[20]: mailto:support@mainstorconcept.com
[21]: https://service.mainstorconcept.com/mscportal/login
[22]: https://www.datadoghq.com/blog/mainframe-monitoring-mainstorconcept-datadog-marketplace/
[23]: https://docs.datadoghq.com/ko/watchdog/
[24]: https://docs.datadoghq.com/ko/tracing/services/services_map/

---
이 애플리케이션은 Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 이 애플리케이션을 구매하려면 <a href="https://app.datadoghq.com/marketplace/app/mainstorconcept-ziris" target="_blank">여기를 클릭</a>하세요.