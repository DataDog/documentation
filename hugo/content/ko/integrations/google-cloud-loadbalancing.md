---
aliases:
- /ko/integrations/google_cloud_loadbalancing
app_id: google-cloud-loadbalancing
categories:
- cloud
- configuration & deployment
- google cloud
- log collection
custom_kind: 통합
description: 고가용성, 확장성, 효율적인 자동 확장을 위해 컴퓨팅 리소스를 단일 또는 여러 지역에 분산합니다.
media: []
title: Google Cloud Loadbalancing
---
## 개요

Google Cloud 로드밸런싱으로 단일 또는 여러 지역에 로드 밸런싱 컴퓨팅 리소스를 분산하여 고가용성 요구 사항을 충족할 수 있습니다. 아울러 단일 애니캐스트(Anycast) IP 뒤에 리소스를 배치하고, 지능형 자동 확장 기능(Autoscaling)으로 리소스를 늘리거나 줄일 수 있습니다.

Datadog Google Cloud Platform 통합을 사용하여 Google Cloud 로드밸런싱에서 메트릭을 수집합니다.

## 설정

### 메트릭 수집

#### 설치

아직 하지 않았다면, 먼저 [Google 클라우드 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

### 로그 수집

Google Cloud HTTP Loadbalancer 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정하세요](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud HTTP Loadbalancer 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Cloud HTTP Loadbalancer 로그를 필터링하세요.
1. **Create Sink**를 클릭하고 그에 따라 싱크 이름을 지정합니다.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.loadbalancing.https.backend_latencies.avg** <br>(gauge) | 프록시가 백엔드로 요청을 보내고 백엔드 응답의 마지막 바이트를 프록시가 받을 때까지 평균 지연 시간<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.backend_latencies.p95** <br>(gauge) | 프록시가 백엔드로 요청을 보내고 백엔드 응답의 마지막 바이트를 프록시가 받을 때까지 지연 시간의 95번째 백분위수<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.backend_latencies.p99** <br>(gauge) | 프록시가 백엔드로 요청을 보내고 백엔드 응답의 마지막 바이트를 프록시가 받을 때까지 지연 시간의 99번째 백분위수<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.backend_latencies.samplecount** <br>(count) | 프록시가 백엔드로 요청을 보내고 백엔드 응답의 마지막 바이트를 프록시가 받을 때까지 지연 시간의 샘플 수<br>_sample로 표시_ |
| **gcp.loadbalancing.https.backend_latencies.sumsqdev** <br>(gauge) | 프록시가 백엔드로 요청을 보내고 백엔드 응답의 마지막 바이트를 프록시가 받을 때까지 지연 시간의 제곱편차 합계<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.backend_request_bytes_count** <br>(count) | 외부 HTTP(S) 로드밸런서가 백엔드에 요청으로 전송한 바이트 수<br>_byte로 표시_ |
| **gcp.loadbalancing.https.backend_request_count** <br>(count) | HTTP(S) 로드밸런서의 백엔드에서 제공하는 요청 수<br>_request로 표시_ |
| **gcp.loadbalancing.https.backend_response_bytes_count** <br>(count) | 백엔드(또는 캐시)에서 HTTP(S) 로드밸런서에 응답으로 전송된 바이트 수<br>_byte로 표시_ |
| **gcp.loadbalancing.https.external.regional.backend_latencies.avg** <br>(count) | 프록시가 백엔드로 요청을 보내고 백엔드로부터 마지막 ​​응답 바이트를 받을 때까지 지연 시간 분포 평균. Service Extensions의 경우, 이 값은 로드 밸런서와 확장 백엔드 간의 각 `ProcessingRequest` 및 `ProcessingResponse` 쌍의 지연 시간 합계를 나타냅니다.<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.external.regional.backend_latencies.samplecount** <br>(count) | 프록시가 백엔드로 요청을 보내고 백엔드로부터 마지막 ​​응답 바이트를 수신한 시점까지의 지연 시간 분포 샘플 수. Service Extensions의 경우, 이 값은 로드 밸런서와 확장 백엔드 간의 각 `ProcessingRequest` 및 `ProcessingResponse` 쌍의 지연 시간 합계를 나타냅니다.<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.external.regional.backend_latencies.sumsqdev** <br>(count) | 프록시가 백엔드로 요청을 보내고 백엔드로부터 마지막 ​​응답 바이트를 수신한 시점까지 지연 시간 분포에 대한 제곱편차 합계. Service Extensions의 경우, 이 값은 로드 밸런서와 확장 백엔드 간의 각 `ProcessingRequest` 및 `ProcessingResponse` 쌍의 지연 시간 합계를 나타냅니다.<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.external.regional.backend_request_bytes_count** <br>(count) | Regional External HTTP(S) 로드 밸런서가 백엔드에 요청으로 전송한 바이트 수. Service Extensions의 경우, 이 값은 로드 밸런서에서 확장 백엔드로 전송된 총 바이트 수를 나타냅니다.<br>_byte로 표시_ |
| **gcp.loadbalancing.https.external.regional.backend_request_count** <br>(count) | Regional External HTTP(S) 로드 밸런서의 백엔드에서 처리된 요청 수. Service Extensions의 경우, 이 값은 로드 밸런서와 확장 백엔드 간의 gRPC 스트림 총 개수를 나타냅니다.|
| **gcp.loadbalancing.https.external.regional.backend_response_bytes_count** <br>(count) | 백엔드에서 Regional External HTTP(S) 로드 밸런서에 응답으로 전송된 바이트 수. Service Extensions의 경우, 이 값은 로드 밸런서가 확장 백엔드로부터 수신한 총 바이트 수를 나타냅니다.<br>_byte로 표시_ |
| **gcp.loadbalancing.https.external.regional.request_bytes_count** <br>(count) | 클라이언트가 HTTP(S) 로드 밸런서에 요청으로 전송한 바이트 수<br>_byte로 표시_ |
| **gcp.loadbalancing.https.external.regional.request_count** <br>(count) | HTTP(S) 로드 밸런서가 처리한 요청 수.|
| **gcp.loadbalancing.https.external.regional.response_bytes_count** <br>(count) | HTTP(S) 로드 밸런서에서 클라이언트에 응답으로 전송된 바이트 수<br>_byte로 표시_ |
| **gcp.loadbalancing.https.external.regional.total_latencies.avg** <br>(count) | 프록시가 요청을 수신하고 클라이언트로부터 마지막 ​​응답 바이트에 대한 ACK를 수신할 때까지 지연 시간 분포 평균.<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.external.regional.total_latencies.samplecount** <br>(count) | 프록시가 요청을 수신하고 클라이언트로부터 마지막 ​​응답 바이트의 ACK를 수신할 때까지 지연 시간 분포 샘플 수<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.external.regional.total_latencies.sumsqdev** <br>(count) | 프록시가 요청을 수신하고 클라이언트로부터 마지막 ​​응답 바이트의 ACK를 수신할 때까지 지연 시간 분포 제곱 편차의 합계<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.frontend_tcp_rtt.avg** <br>(gauge) | 클라이언트와 프록시 간 각 연결 평균 RTT<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.frontend_tcp_rtt.p95** <br>(gauge) | 클라이언트와 프록시 간 각 연결 RTT의 95번째 백분위수<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.frontend_tcp_rtt.p99** <br>(gauge) | 클라이언트와 프록시 간 각 연결 RTT의 99번째 백분위수<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.frontend_tcp_rtt.samplecount** <br>(count) | 클라이언트와 프록시 간 각 연결 RTT 샘플 수<br>_sample로 표시_ |
| **gcp.loadbalancing.https.frontend_tcp_rtt.sumsqdev** <br>(gauge) | 클라이언트와 프록시 간 각 연결 RTT 제곱편차 합계<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.internal.backend_latencies.avg** <br>(gauge) | 프록시가 백엔드로 요청을 보내고 백엔드로부터 응답의 마지막 바이트를 수신할 때까지 평균 지연 시간<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.internal.backend_latencies.p95** <br>(gauge) | 프록시가 백엔드로 요청을 보내고 백엔드로부터 응답의 마지막 바이트를 수신할 때까지 지연 시간의 95번째 백분위 수<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.internal.backend_latencies.p99** <br>(gauge) | 프록시가 백엔드로 요청을 보내고 백엔드로부터 응답의 마지막 바이트를 수신할 때까지 지연 시간의 99번째 백분위 수<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.internal.backend_latencies.samplecount** <br>(count) | 프록시가 백엔드로 요청을 보내고 백엔드로부터 마지막 ​​응답 바이트를 수신할 때까지 지연 시간 샘플 수<br>_sample로 표시_ |
| **gcp.loadbalancing.https.internal.backend_latencies.sumsqdev** <br>(gauge) | 프록시가 백엔드로 요청을 보내고 백엔드로부터 마지막 ​​응답 바이트를 수신할 때까지 지연 시간 제곱편차 합계<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.internal.backend_request_bytes_count** <br>(count) | Internal HTTP(S) 로드 밸런서에서 백엔드에 요청으로 전송된 바이트. Service Extensions의 경우, 이 값은 로드 밸런서에서 확장 백엔드로 전송된 총 바이트 수를 나타냅니다.<br>_byte로 표시_ |
| **gcp.loadbalancing.https.internal.backend_request_count** <br>(count) | Internal HTTP(S) 로드 밸런서의 백엔드에서 처리된 요청 수. Service Extensions의 경우, 이 값은 로드 밸런서와 확장 백엔드 간의 gRPC 스트림 수를 나타냅니다.|
| **gcp.loadbalancing.https.internal.backend_response_bytes_count** <br>(count) | 백엔드에서 Internal HTTP(S) 로드 밸런서에 응답으로 전송된 바이트 수. Service Extensions의 경우, 이 값은 로드 밸런서가 확장 백엔드로부터 수신한 총 바이트 수를 나타냅니다.<br>_byte로 표시_ |
| **gcp.loadbalancing.https.internal.request_bytes_count** <br>(count) | 클라이언트가 HTTP(S) 로드 밸런서에 요청으로 전송한 바이트 수<br>_byte로 표시_ |
| **gcp.loadbalancing.https.internal.request_count** <br>(count) | HTTP(S) 로드 밸런서가 처리한 요청 수<br>_request로 표시_ |
| **gcp.loadbalancing.https.internal.response_bytes_count** <br>(count) | HTTP(S) 로드 밸런서가 클라이언트에게 응답으로 전송한 바이트 수<br>_byte로 표시_ |
| **gcp.loadbalancing.https.internal.total_latencies.avg** <br>(gauge) | 프록시가 요청을 수신한 시점부터 마지막 응답 바이트의 클라이언트의 ACK를 받을 때까지 걸린 지연 시간의 평균<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.internal.total_latencies.p95** <br>(gauge) | 프록시가 요청을 수신한 시점부터 마지막 응답 바이트의 클라이언트 ACK를 받을 때까지 걸린 지연 시간의 95번째 백분위 수<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.internal.total_latencies.p99** <br>(gauge) | 프록시가 요청을 수신한 시점부터 마지막 응답 바이트의 클라이언트 ACK를 받을 때까지 걸린 지연 시간의 99번째 백분위 수<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.internal.total_latencies.samplecount** <br>(count) | 프록시가 요청을 수신한 시점부터 마지막 응답 바이트의 클라이언트 ACK를 받을 때까지 걸린 지연 시간의 샘플 수<br>_sample로 표시_ |
| **gcp.loadbalancing.https.internal.total_latencies.sumsqdev** <br>(gauge) | 프록시가 요청을 수신한 시점부터 마지막 응답 바이트의 클라이언트 ACK를 받을 때까지 걸린 지연 시간의 제곱편차 합계<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.request_bytes_count** <br>(count) | 클라이언트에서 L7 로드 밸런서에 요청으로 전송된 바이트 수<br>_byte로 표시_ |
| **gcp.loadbalancing.https.request_count** <br>(count) | L7 로드 밸런서가 처리한 요청 수<br>_request로 표시_ |
| **gcp.loadbalancing.https.response_bytes_count** <br>(count) | L7 로드 밸런서에서 클라이언트에 응답으로 전송된 바이트 수<br>_byte로 표시_ |
| **gcp.loadbalancing.https.total_latencies.avg** <br>(gauge) | 프록시가 요청을 수신한 시점부터 마지막 응답 바이트의 클라이언트 ACK를 받을 때까지 평균 지연 시간<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.total_latencies.p95** <br>(gauge) | 프록시가 요청을 수신한 시점부터 마지막 응답 바이트의 클라이언트 ACK를 받을 때까지 지연 시간의 95번째 백분위 수<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.total_latencies.p99** <br>(gauge) | 프록시가 요청을 수신한 시점부터 마지막 응답 바이트의 클라이언트 ACK를 받을 때까지 지연 시간의 99번째 백분위 수<br>_millisecond로 표시_ |
| **gcp.loadbalancing.https.total_latencies.samplecount** <br>(count) | 프록시가 요청을 수신한 시점부터 마지막 응답 바이트의 클라이언트 ACK를 받을 때까지 지연 시간 샘플 수<br>_sample로 표시_ |
| **gcp.loadbalancing.https.total_latencies.sumsqdev** <br>(gauge) | 프록시가 요청을 수신한 시점부터 마지막 응답 바이트의 클라이언트 ACK를 받을 때까지 지연 시간의 제곱편차 합계<br>_millisecond로 표시_ |
| **gcp.loadbalancing.l3.external.egress_bytes_count** <br>(count) | NetLB 백엔드에서 해당 플로우의 클라이언트로 전송된 바이트 수. TCP 플로우의 경우 애플리케이션 스트림의 바이트만 계산합니다.<br>_byte로 표시_ |
| **gcp.loadbalancing.l3.external.egress_packets_count** <br>(count) | NetLB 백엔드에서 해당 플로우의 클라이언트로 전송된 패킷 수<br>_packet으로 표시_ |
| **gcp.loadbalancing.l3.external.ingress_bytes_count** <br>(count) | 클라이언트에서 NetLB 백엔드로 전송된 바이트 수. TCP 플로우의 경우 애플리케이션 스트림의 바이트만 계산합니다..<br>_byte로 표시_ |
| **gcp.loadbalancing.l3.external.ingress_packets_count** <br>(count) | 클라이언트에서 NetLB 백엔드로 전송된 패킷 수<br>_packet으로 표시_ |
| **gcp.loadbalancing.l3.external.rtt_latencies.avg** <br>(gauge) | NetLB 플로우의 TCP 연결에서 측정된 평균 RTT<br>_millisecond로 표시됨_ |
| **gcp.loadbalancing.l3.external.rtt_latencies.p95** <br>(gauge) | NetLB 플로우의 TCP 연결에서 측정된 RTT의 95번째 백분위 수<br>_millisecond로 표시됨_ |
| **gcp.loadbalancing.l3.external.rtt_latencies.p99** <br>(gauge) | NetLB 플로우의 TCP 연결에서 측정된 RTT의 99번째 백분위 수<br>_millisecond로 표시됨_ |
| **gcp.loadbalancing.l3.external.rtt_latencies.samplecount** <br>(count) | NetLB 플로우의 TCP 연결에서 측정된 RTT 샘플 수<br>_sample로 표시됨_ |
| **gcp.loadbalancing.l3.external.rtt_latencies.sumsqdev** <br>(gauge) | NetLB 플로우의 TCP 연결에서 측정된 RTT 제곱편차 합계<br>_millisecond로 표시됨_ |
| **gcp.loadbalancing.l3.internal.egress_bytes_count** <br>(count) | ILB 백엔드에서 클라이언트로 전송된 바이트 수(TCP 플로우의 경우 애플리케이션 스트림의 바이트만 계산함).<br>_byte로 표시_ |
| **gcp.loadbalancing.l3.internal.egress_packets_count** <br>(count) | ILB 백엔드에서 해당 플로우의 클라이언트로 전송된 패킷 수<br>_packet으로 표시_ |
| **gcp.loadbalancing.l3.internal.ingress_bytes_count** <br>(count) | 클라이언트에서 ILB 백엔드로 전송된 바이트 수(TCP 플로우의 경우 애플리케이션 스트림의 바이트만 계산함).<br>_byte로 표시_ |
| **gcp.loadbalancing.l3.internal.ingress_packets_count** <br>(count) | 클라이언트에서 ILB 백엔드로 전송된 패킷 수<br>_packet으로 표시_ |
| **gcp.loadbalancing.l3.internal.rtt_latencies.avg** <br>(gauge) | ILB 플로우의 TCP 연결에서 측정된 평균 RTT<br>_millisecond로 표시됨_ |
| **gcp.loadbalancing.l3.internal.rtt_latencies.p95** <br>(gauge) | ILB 플로우의 TCP 연결에서 측정된 RTT의 95번째 백분위 수<br>_millisecond로 표시됨_ |
| **gcp.loadbalancing.l3.internal.rtt_latencies.p99** <br>(gauge) | ILB 플로우의 TCP 연결에서 측정된 RTT의 99번째 백분위 수<br>_millisecond로 표시됨_ |
| **gcp.loadbalancing.l3.internal.rtt_latencies.samplecount** <br>(count) | RTT 지연 시간 샘플 수<br>_sample로 표시_ |
| **gcp.loadbalancing.l3.internal.rtt_latencies.sumsqdev** <br>(gauge) | RTT 지연 시간 제곱편차 합계<br>_millisecond로 표시_ |
| **gcp.loadbalancing.l4_proxy.egress_bytes_count** <br>(count) | 프록시를 사용하여 VM에서 클라이언트로 전송된 바이트 수<br>_byte로 표시_ |
| **gcp.loadbalancing.l4_proxy.ingress_bytes_count** <br>(count) | 프록시를 사용하여 클라이언트에서 VM으로 전송된 바이트 수<br>_byte로 표시_ |
| **gcp.loadbalancing.l4_proxy.tcp.closed_connections_count** <br>(count) | TCP 프록시 또는 SSL 프록시 로드 밸런서를 통해 종료된 연결 수.|
| **gcp.loadbalancing.l4_proxy.tcp.new_connections_count** <br>(count) | TCP 프록시 또는 SSL 프록시 로드 밸런서를 통해 열린 연결 수.|
| **gcp.loadbalancing.subnet.proxy_only.addresses** <br>(gauge) | 상태별 현재 프록시 전용 주소 수.|
| **gcp.loadbalancing.tcp_ssl_proxy.closed_connections** <br>(count) | TCP/SSL 프록시를 통해 종료된 연결 수<br>_connection으로 표시_ |
| **gcp.loadbalancing.tcp_ssl_proxy.egress_bytes_count** <br>(count) | 프록시를 사용하여 VM에서 클라이언트로 전송된 바이트 수<br>_byte로 표시_ |
| **gcp.loadbalancing.tcp_ssl_proxy.frontend_tcp_rtt.avg** <br>(gauge) | 프록시의 TCP 스택에서 측정된 평균 보정 RTT. 매분마다 애플리케이션 계층 바이트가 프록시에서 클라이언트로 전송됩니다.<br>_millisecond로 표시_ |
| **gcp.loadbalancing.tcp_ssl_proxy.frontend_tcp_rtt.p95** <br>(gauge) | 프록시의 TCP 스택에서 측정된 보정 RTT 95번째 백분위 수. 매분마다 애플리케이션 계층 바이트가 프록시에서 클라이언트로 전송됩니다.<br>_millisecond로 표시_ |
| **gcp.loadbalancing.tcp_ssl_proxy.frontend_tcp_rtt.p99** <br>(gauge) | 프록시의 TCP 스택에서 측정된 보정 RTT 99번째 백분위 수. 매분마다 애플리케이션 계층 바이트가 프록시에서 클라이언트로 전송됩니다.<br>_millisecond로 표시_ |
| **gcp.loadbalancing.tcp_ssl_proxy.frontend_tcp_rtt.samplecount** <br>(count) | 프록시의 TCP 스택에서 측정된 보정 RTT 샘플 수. 매분마다 애플리케이션 계층 바이트가 프록시에서 클라이언트로 전송됩니다.<br>_sample로 표시_ |
| **gcp.loadbalancing.tcp_ssl_proxy.frontend_tcp_rtt.sumsqdev** <br>(gauge) | 프록시의 TCP 스택에서 측정된 보정 RTT 제곱편차 합계. 매분마다 애플리케이션 계층 바이트가 프록시에서 클라이언트로 전송됩니다.<br>_millisecond로 표시_ |
| **gcp.loadbalancing.tcp_ssl_proxy.ingress_bytes_count** <br>(count) | 프록시를 사용하여 클라이언트에서 VM으로 전송된 바이트 수<br>_byte로 표시_ |
| **gcp.loadbalancing.tcp_ssl_proxy.new_connections** <br>(count) | TCP/SSL 프록시를 통해 생성된 연결 수<br>_connection으로 표시_ |
| **gcp.loadbalancing.tcp_ssl_proxy.open_connections** <br>(count) | TCP/SSL 프록시를 통해 현재 유지 중인 연결 수<br>_connection으로 표시_ |

### 이벤트

Google Cloud 로드밸런싱 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud 로드밸런싱 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.