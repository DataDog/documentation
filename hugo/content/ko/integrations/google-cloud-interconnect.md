---
aliases:
- /ko/integrations/google_cloud_interconnect
app_id: google-cloud-interconnect
categories:
- cloud
- google cloud
- log collection
- network
custom_kind: integration
description: 고가용성 및 저지연 연결을 통해 온프레미스 네트워크를 Google 네트워크로 확장합니다.
media: []
title: Google Cloud Interconnect
---
## 개요

Google Cloud Interconnect는 가용성이 높고 레이턴시가 낮은 연결을 통해 온프레미스 네트워크를 Google 네트워크로 확장합니다.

Datadog Google Cloud Platform 통합을 사용하여 Google Cloud Interconnect에서 메트릭을 수집합니다.

## 설정

### 설치

아직 하지 않았다면, 먼저 [Google 클라우드 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

### 로그 수집

Google Cloud Interconnect 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정하세요](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud Interconnect 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Cloud Interconnect 로그를 필터링하세요.
1. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.interconnect.network.attachment.capacity** <br>(gauge) | 어태치먼트 네트워크 용량.|
| **gcp.interconnect.network.attachment.egress_dropped_packets_count** <br>(count) | 마지막 샘플링 이후 드롭된 아웃바운드 패킷 수<br>_packet으로 표시_ |
| **gcp.interconnect.network.attachment.ingress_dropped_packets_count** <br>(count) | 마지막 샘플링 이후 드롭된 인바운드 패킷 수<br>_packet으로 표시_ |
| **gcp.interconnect.network.attachment.received_bytes_count** <br>(count) | 수신된 인바운드 바이트 수<br>_byte로 표시_ |
| **gcp.interconnect.network.attachment.received_bytes_count_by_l3_protocol** <br>(count) | L3 Protocol에서 수신된 인바운드 바이트 수<br>_byte로 표시_ |
| **gcp.interconnect.network.attachment.received_packets_count** <br>(count) | 수신된 인바운드 패킷 수<br>_packet으로 표시_ |
| **gcp.interconnect.network.attachment.received_packets_count_by_l3_protocol** <br>(count) | L3 Protocol에서 수신된 인바운드 패킷 수<br>_packet으로 표시_ |
| **gcp.interconnect.network.attachment.sent_bytes_count** <br>(count) | 전송된 아웃바운드 바이트 수<br>_byte로 표시_ |
| **gcp.interconnect.network.attachment.sent_bytes_count_by_l3_protocol** <br>(count) | L3 Protocol에서 전송된 아웃바운드 바이트 수<br>_byte로 표시_ |
| **gcp.interconnect.network.attachment.sent_packets_count** <br>(count) | 전송된 아웃바운드 패킷 수<br>_packet으로 표시_ |
| **gcp.interconnect.network.attachment.sent_packets_count_by_l3_protocol** <br>(count) | L3 Protocol에서 전송된 아웃바운드 패킷 수<br>_packet으로 표시_ |
| **gcp.interconnect.network.interconnect.capacity** <br>(gauge) | Interconnect 활성 용량<br>_byte로 표시_ |
| **gcp.interconnect.network.interconnect.dropped_packets_count** <br>(count) | 링크 혼잡으로 인해 드롭된 아웃바운드 패킷 수<br>_packet으로 표시_ |
| **gcp.interconnect.network.interconnect.link.aai.bytes_count** <br>(count) | 애플리케이션 인식 기능이 활성화된 Interconnect 바이트 수<br>_byte로 표시_ |
| **gcp.interconnect.network.interconnect.link.aai.packets_count** <br>(count) | 애플리케이션 인식이 활성화된 Interconnect 패킷 수.<br>_packet으로 표시됨_ |
| **gcp.interconnect.network.interconnect.link.macsec.operational** <br>(gauge) | 물리적 링크에서 MACsec(활성화된 경우) 작동 상태.|
| **gcp.interconnect.network.interconnect.link.macsec.receive_dropped_packets_count** <br>(count) | 물리적 링크에서 드롭된 MACsec 수신 패킷 수<br>_packet으로 표시_ |
| **gcp.interconnect.network.interconnect.link.macsec.receive_errors_count** <br>(count) | 물리적 링크에서 발생하는 MACSEC 수신 오류 수<br>_error로 표시_ |
| **gcp.interconnect.network.interconnect.link.macsec.received_control_packets_count** <br>(count) | 물리적 링크에서 MACsec 수신 컨트롤 패킷 수<br>_packet으로 표시_ |
| **gcp.interconnect.network.interconnect.link.macsec.received_data_packets_count** <br>(count) | 물리적 링크에서 MACsec 수신 데이터 패킷 수<br>_packet으로 표시_ |
| **gcp.interconnect.network.interconnect.link.macsec.send_dropped_packets_count** <br>(count) | 물리적 링크에서 드롭된 MACsec 송신 패킷 수<br>_packet으로 표시_ |
| **gcp.interconnect.network.interconnect.link.macsec.send_errors_count** <br>(count) | 물리적 링크에서 발생하는 MACsec 송신 오류 수<br>_error로 표시_ |
| **gcp.interconnect.network.interconnect.link.macsec.sent_control_packets_count** <br>(count) | 물리적 링크에서 MACsec 송신 컨트롤 패킷 수<br>_packet으로 표시_ |
| **gcp.interconnect.network.interconnect.link.macsec.sent_data_packets_count** <br>(count) | 물리적 링크에서 MACsec 송신 데이터 패킷 수<br>_packet으로 표시_ |
| **gcp.interconnect.network.interconnect.link.operational** <br>(gauge) | 회로의 운영 상태가 활성(Up)인지 여부.|
| **gcp.interconnect.network.interconnect.link.rx_power** <br>(gauge) | 물리 회로에서 수신된 광(Light) 레벨.|
| **gcp.interconnect.network.interconnect.link.tx_power** <br>(gauge) | 물리 회로를 통해 송신된 광(Light) 레벨.|
| **gcp.interconnect.network.interconnect.operational** <br>(gauge) | 인터커넥트 운영 상태가 활성(Up)인지 여부.|
| **gcp.interconnect.network.interconnect.receive_errors_count** <br>(count) | 패킷 수신 중 발생한 오류 수<br>_error로 표시_ |
| **gcp.interconnect.network.interconnect.received_bytes_count** <br>(count) | 수신된 인바운드 바이트 수<br>_byte로 표시_ |
| **gcp.interconnect.network.interconnect.received_unicast_packets_count** <br>(count) | 수신된 인바운드 유니캐스트 패킷 수<br>_packet으로 표시_ |
| **gcp.interconnect.network.interconnect.send_errors_count** <br>(count) | 패킷 전송 중 발생한 오류 수<br>_error로 표시_ |
| **gcp.interconnect.network.interconnect.sent_bytes_count** <br>(count) | 전송된 아웃바운드 바이트 수<br>_byte로 표시_ |
| **gcp.interconnect.network.interconnect.sent_unicast_packets_count** <br>(count) | 전송된 아웃바운드 유니캐스트 패킷 수<br>_packet으로 표시_ |

### 이벤트

Google Cloud Interconnect 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Interconnect 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.