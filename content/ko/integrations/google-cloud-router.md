---
aliases:
- /ko/integrations/google_cloud_router
app_id: google-cloud-router
categories:
- cloud
- google cloud
- log collection
- network
custom_kind: integration
description: Border Gateway Protocol (BGP)를 사용하여 VPC와 온프레미스 네트워크 간 경로를 동적으로 교환하세요.
media: []
title: Google Cloud Router
---
## 개요

Google Cloud Router로 보더 게이트웨이 프로토콜(BGP)을 사용하여 가상 프라이빗 클라우드(VPC)와 온프레미스 네트워크 간 경로를 동적 교환할 수 있습니다.

Datadog Google Cloud Platform 통합을 사용하여 Google Cloud Router에서 메트릭을 수집합니다.

## 설정

### 설치

아직 하지 않았다면, 먼저 [Google 클라우드 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

### 로그 수집

Google Cloud Router 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection)하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud Router 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Cloud Router 로그를 필터링하세요.
1. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.router.best_received_routes_count** <br>(gauge) | 라우터가 수신한 현재 최적 경로의 수.<br>_route로 표시_ |
| **gcp.router.bfd.control.receive_intervals** <br>(gauge) | BFD 제어 패킷 수신 간격.<br>_millisecond로 표시_ |
| **gcp.router.bfd.control.received_packets_count** <br>(count) | 이 BFD 세션에서 수신한 제어 패킷 수.|
| **gcp.router.bfd.control.rejected_packets_count** <br>(count) | 이 BFD 세션에서 거부한 제어 패킷 수.|
| **gcp.router.bfd.control.transmit_intervals** <br>(gauge) | BFD 제어 패킷 송신 간격.<br>_millisecond로 표시_ |
| **gcp.router.bfd.control.transmitted_packets_count** <br>(count) | 이 BFD 세션에서 송신한 제어 패킷 수.|
| **gcp.router.bfd.session_flap_events_count** <br>(count) | 이 BFD 세션의 각 BFD 플랩 이벤트 수. 세션 플랩 이벤트는 Up 상태에서 다른 상태로의 전환을 나타냅니다.|
| **gcp.router.bfd.session_up** <br>(gauge) | BFD 세션이 성공적으로 설정되었는지를 나타내는 지표. 1은 세션이 Up 상태임을, 0은 세션이 Down 상태임을 나타냅니다.|
| **gcp.router.bgp.received_routes_count** <br>(gauge) | BGP 세션에서 현재 수신된 경로의 수.<br>_route로 표시_ |
| **gcp.router.bgp.sent_routes_count** <br>(gauge) | BGP 세션에서 현재 전송된 경로의 수.<br>_route로 표시_ |
| **gcp.router.bgp.session_up** <br>(gauge) | BGP 세션이 성공적으로 설정되었는지를 나타내는 지표.|
| **gcp.router.bgp_sessions_down_count** <br>(gauge) | Down 상태인 라우터의 BGP 세션 수.<br>_session으로 표시_ |
| **gcp.router.bgp_sessions_up_count** <br>(gauge) | Up 상태인 라우터의 BGP 세션 수.<br>_session으로 표시_ |
| **gcp.router.dynamic_routes.learned_routes.any_dropped_unique_destinations** <br>(gauge) | 쿼터 초과로 인해 네트워크 리전에서 고유 대상이 드롭되었는지를 나타내는 부울 메트릭.|
| **gcp.router.dynamic_routes.learned_routes.dropped_unique_destinations** <br>(gauge) | 쿼터 초과로 인해 네트워크 리전에서 드롭된 고유 대상의 수.|
| **gcp.router.dynamic_routes.learned_routes.unique_destinations_limit** <br>(gauge) | 이 네트워크 리전에서 라우트 쿼터가 허용하는 고유 대상의 최대 수.|
| **gcp.router.dynamic_routes.learned_routes.used_unique_destinations** <br>(gauge) | 이 네트워크 리전에서 학습된 라우트가 허용하는 고유 대상의 최대 수.|
| **gcp.router.nat.allocated_ports** <br>(gauge) | NAT 게이트웨이가 모든 VM에 할당하는 포트의 수.|
| **gcp.router.nat.closed_connections_count** <br>(count) | 닫힌 NAT 게이트웨이의 연결 수.<br>_connection으로 표시_ |
| **gcp.router.nat.dropped_received_packets_count** <br>(count) | NAT 게이트웨이가 드롭한 수신 패킷 수.<br>_packet으로 표시_ |
| **gcp.router.nat.dropped_sent_packets_count** <br>(count) | NAT 게이트웨이가 드롭한 전송 패킷의 수.<br>_packet으로 표시_ |
| **gcp.router.nat.nat_allocation_failed** <br>(gauge) | NAT 게이트웨이의 VM에 NAT IP를 할당하는 데 실패했는지 여부를 나타내는 지표.|
| **gcp.router.nat.new_connections_count** <br>(count) | NAT 게이트웨이의 신규 연결 수.<br>_connection으로 표시_ |
| **gcp.router.nat.open_connections** <br>(gauge) | NAT 게이트웨이에 열려 있는 연결 수.<br>_connection으로 표시_ |
| **gcp.router.nat.port_usage** <br>(gauge) | NAT 게이트웨이에 연결된 모든 VM 중 가장 높은 포트 사용량.|
| **gcp.router.nat.received_bytes_count** <br>(count) | NAT 게이트웨이가 수신한 바이트 수.<br>_byte로 표시_ |
| **gcp.router.nat.received_packets_count** <br>(count) | NAT 게이트웨이가 수신한 패킷 수.<br>_packet으로 표시_ |
| **gcp.router.nat.sent_bytes_count** <br>(count) | NAT 게이트웨이가 전송한 바이트 수.<br>_byte로 표시_ |
| **gcp.router.nat.sent_packets_count** <br>(count) | NAT 게이트웨이가 전송한 패킷 수.<br>_packet으로 표시_ |
| **gcp.router.router_up** <br>(gauge) | 라우터 상태(Up 또는 Down).|
| **gcp.router.sent_routes_count** <br>(gauge) | 라우터가 전송한 현재 라우터 수.|

### 이벤트

Google Cloud Router 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Router 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.