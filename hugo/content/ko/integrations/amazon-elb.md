---
aliases:
- /ko/integrations/amazon_elb
app_id: amazon-elb
categories:
- aws
- 메트릭
- 클라우드
custom_kind: 통합
description: Amazon ELB는 다수의 EC2 인스턴스 전반에서 트래픽을 자동으로 분산합니다.
media: []
title: Amazon Elastic Load Balancing
---
## 개요

Amazon Elastic Load Balancing은 클라우드에 있는 다수의 Amazon EC2 인스턴스 전반에서 수신되는 애플리케이션 트래픽을 자동으로 배포합니다.

Datadog는 AWS에서 제공하는 세 가지 Elastic Load Balancers  요소, 애플리케이션(ALB), 클래식(ELB) 및 네트워크 로드 밸런서(NLB) 모두에서 메트릭과 메타데이터를 수집합니다.

이 통합을 활성화하여 Datadog에서 Elastic Load Balancing 전체 메트릭을 확인하세요.

참고: 이 통합이 완전히 활성화되려면 'ec2:describe\*\*' 및 'elasticloadbalancing:describe\*' 권한이 필요합니다.

## 설정

### 설치

아직 하지 않았다면 먼저 [Amazon Web Services 통합](https://docs.datadoghq.com/integrations/amazon_web_services/)을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지](https://app.datadoghq.com/integrations/amazon-web-services)에서 `Metric Collection` 탭의 `ApplicationELB`, `ELB`, `NetworkELB`가 활성화되어 있는지 확인합니다.
1. [Datadog - Amazon ELB 통합](https://app.datadoghq.com/integrations/amazon-elb)을 설치합니다.

### 로그 수집

#### Amazon ELB 또는 ALB 로깅 활성화

ELB 또는 ALB에서 로깅을 먼저 활성화하고 로그를 수집합니다. ALB와 ELB 로그를 Amazon S3 버킷에서 작성할 수 있으며 [Lambda 함수에 사용할 수 있습니다](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function). 자세한 정보는 [Classic Load Balancer에서 액세스 로그 활성화](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html)를 참고하세요.

![Amazon ELB 로그 활성화](images/aws_elb_log_enable.png)

간격을 5분으로 설정하고 S3 버킷과 접두사를 정의하세요. [모호하게 정의된 S3 이벤트 알림 구성](https://aws.amazon.com/premiumsupport/knowledge-center/lambda-s3-event-configuration-error/)을 방지하려면 다른 로드 밸런서의 로그 위치와 겹치지 않는 **고유 위치**를 사용해야 합니다. 여러 로드 밸런서가 동일한 버킷에 로깅하는 경우, 로그가 별도의 위치에 저장되도록 `my-bucket-for-elb-logs/my-elb-name`과 같은 **고유 접두사**를 사용해야 합니다.

![Amazon ELB 로그 구성](images/aws_elb_configure_log.png)

#### Datadog로 로그 전송

1. 아직 설정하지 않았다면 먼저 AWS 계정에서 [Datadog Forwarder Lambda 함수](https://docs.datadoghq.com/logs/guide/forwarder/)를 설정하세요.
1. 설정이 완료되면 Datadog Forwarder Lambda 함수로 이동합니다. ELB 로그가 포함된 S3 버킷에서 [자동](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers) 또는 [수동](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)으로 트리거를 설정합니다. 수동 설정의 경우 이벤트 유형 `All object create events`를 사용합니다.
1. [로그 탐색기](https://app.datadoghq.com/logs)를 사용하여 로그를 탐색하세요.

AWS 서비스 로그 수집에 관한 자세한 내용은 [Datadog Lambda 함수를 사용하여 AWS 서비스 로그 전송하기](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/)를 참조하세요.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **aws.applicationelb.active_connection_count** <br>(count) | 클라이언트에서 로드 밸런서로, 로드 밸런서에서 대상으로 활성 상태인 동시 TCP 연결의 총 수.<br>_connection으로 표시_ |
| **aws.applicationelb.client_tlsnegotiation_error_count** <br>(count) | TLS 협상 오류 수<br>_error로 표시_ |
| **aws.applicationelb.consumed_lcus** <br>(gauge) | 로드 밸런서에서 사용하는 로드 밸런서 용량 단위(LCU)의 수.<br>_unit으로 표시_ |
| **aws.applicationelb.grpc_request_count** <br>(count) | IPv4 및 IPv6를 통해 처리된 gRPC 요청 수.<br>_request로 표시_ |
| **aws.applicationelb.healthy_host_count** <br>(gauge) | 각 가용 영역(Availability Zone)의 평균 정상 인스턴스 수.<br>_host로 표시_ |
| **aws.applicationelb.healthy_host_count.maximum** <br>(gauge) | 각 가용 영역(Availability Zone)의 최대 정상 인스턴스 수.<br>_host로 표시_ |
| **aws.applicationelb.healthy_host_count.minimum** <br>(gauge) | 각 가용 영역(Availability Zone)의 최소 정상 인스턴스 수.<br>_host로 표시_ |
| **aws.applicationelb.healthy_host_count_deduped** <br>(count) | Cross-Zone Load Balancing 옵션 사용 여부와 관계없는 가용 영역(Availability Zone)당 정상 인스턴스 수.<br>_host로 표시_ |
| **aws.applicationelb.ipv_6processed_bytes** <br>(count) | IPv6를 통해 로드밸런서가 처리한 총 바이트 수.<br>_byte로 표시_ |
| **aws.applicationelb.ipv_6request_count** <br>(count) | 로드밸런서가 수신한 IPv6 요청 수.<br>_request로 표시_ |
| **aws.applicationelb.new_connection_count** <br>(count) | 클라이언트에서 로드 밸런서로, 로드 밸런서에서 대상으로 새로 설정된 TCP 연결의 총 수.<br>_connection으로 표시_ |
| **aws.applicationelb.processed_bytes** <br>(count) | IPv4 및 IPv6를 통해 로드밸런서가 처리한 총 바이트 수.<br>_byte로 표시_ |
| **aws.applicationelb.rejected_connection_count** <br>(count) | 로드 밸런서가 최대 연결 수에 도달하여 거부된 연결 수.<br>_connection으로 표시_ |
| **aws.applicationelb.request_count** <br>(count) | 수신되어 등록 인스턴스로 라우팅된, 완료된 요청의 총 수. HTTP 460, HTTP 400, 일부 HTTP 503 및 500은 포함되지 않습니다.<br>_request로 표시_ |
| **aws.applicationelb.request_count_per_target** <br>(count) | 대상 그룹의 각 대상이 받은 평균 요청 수.<br>_request로 표시_ |
| **aws.applicationelb.reserved_lcus** <br>(count) | LCU Reservation을 사용하여 로드 밸런서에 예약된 로드 밸런서 용량 단위(LCU)의 수.<br>_unit으로 표시_ |
| **aws.applicationelb.rule_evaluations** <br>(count) | 시간당 평균 요청률을 기준으로 로드 밸런서가 처리한 규칙의 수.|
| **aws.applicationelb.target_connection_error_count** <br>(count) | 로드 밸런서와 등록된 인스턴스 간에 성공적으로 설정되지 않은 연결 수.<br>_error로 표시_ |
| **aws.applicationelb.target_response_time.average** <br>(gauge) | 로드 밸런서가 요청을 전달한 후 응답을 수신할 때까지 경과한 평균 시간.<br>_second로 표시_ |
| **aws.applicationelb.target_response_time.maximum** <br>(gauge) | 로드 밸런서가 요청을 전달한 후 응답을 수신할 때까지 경과한 최대 시간.<br>_second로 표시_ |
| **aws.applicationelb.target_response_time.p50** <br>(gauge) | 로드 밸런서가 요청을 전달한 후 응답을 수신할 때까지 경과한 시간의 50번째 백분위수.<br>_second로 표시_ |
| **aws.applicationelb.target_response_time.p90** <br>(gauge) | 로드 밸런서가 요청을 전달한 후 응답을 수신할 때까지 경과한 시간의 90번째 백분위수.<br>_second로 표시_ |
| **aws.applicationelb.target_response_time.p95** <br>(gauge) | 로드 밸런서가 요청을 전달한 후 응답을 수신할 때까지 경과한 시간의 95번째 백분위수.<br>_second로 표시_ |
| **aws.applicationelb.target_response_time.p99** <br>(gauge) | 로드 밸런서가 요청을 전달한 후 응답을 수신할 때까지 경과한 시간의 99번째 백분위수.<br>_second로 표시_ |
| **aws.applicationelb.un_healthy_host_count** <br>(gauge) | 각 가용 영역(Availability Zone)의 평균 비정상 인스턴스 수.<br>_host로 표시_ |
| **aws.applicationelb.un_healthy_host_count.maximum** <br>(gauge) | 각 가용 영역(Availability Zone)의 최대 비정상 인스턴스 수.<br>_host로 표시_ |
| **aws.applicationelb.un_healthy_host_count.minimum** <br>(gauge) | 각 가용 영역(Availability Zone)의 최소 비정상 인스턴스 수.<br>_host로 표시_ |
| **aws.applicationelb.un_healthy_host_count_deduped** <br>(count) | Cross-Zone Load Balancing 옵션 사용 여부와 관계없는 가용 영역(Availability Zone)당 비정상 인스턴스 수.<br>_host로 표시_ |
| **aws.elb.backend_connection_errors** <br>(rate) | 로드 밸런서와 등록된 인스턴스 간의 성공적으로 설정되지 않은 연결 수.<br>_error로 표시_ |
| **aws.elb.estimated_albactive_connection_count** <br>(count) | 클라이언트에서 로드 밸런서로, 로드 밸런서에서 대상으로 활성 상태인 동시 TCP 연결의 총 추정 수.<br>_connection으로 표시_ |
| **aws.elb.estimated_albconsumed_lcus** <br>(gauge) | Application Load Balancer에서 사용하는 로드 밸런서 용량 단위(LCU)의 총 추정 수.<br>_unit으로 표시_ |
| **aws.elb.estimated_albnew_connection_count** <br>(count) | 클라이언트에서 로드 밸런서로, 로드 밸런서에서 대상으로 새로 설정된 TCP 연결의 총 추정 수.<br>_connection으로 표시_ |
| **aws.elb.estimated_processed_bytes** <br>(count) | Application Load Balancer가 처리한 총 추정 바이트 수.<br>_byte로 표시_ |
| **aws.elb.healthy_host_count** <br>(gauge) | 각 Availability Zone의 평균 정상 인스턴스 수.<br>_host로 표시_ |
| **aws.elb.healthy_host_count.maximum** <br>(gauge) | 각 가용 영역(Availability Zone)의 최대 정상 인스턴스 수.<br>_host로 표시_ |
| **aws.elb.healthy_host_count.minimum** <br>(gauge) | 각 가용 영역(Availability Zone)의 최소 정상 인스턴스 수.<br>_host로 표시_ |
| **aws.elb.healthy_host_count_deduped** <br>(gauge) | Cross-Zone Load Balancing 옵션 사용 여부와 관계없는 가용 영역(Availability Zone)당 정상 인스턴스 수.<br>_host로 표시_ |
| **aws.elb.httpcode_backend_2xx** <br>(rate) | 등록된 인스턴스에서 생성된 HTTP 2XX 응답 코드의 수.<br>_response로 표시_ |
| **aws.elb.httpcode_backend_3xx** <br>(rate) | 등록된 인스턴스에서 생성된 HTTP 3XX 응답 코드의 수.<br>_response로 표시_ |
| **aws.elb.httpcode_backend_4xx** <br>(rate) | 등록된 인스턴스에서 생성된 HTTP 4XX 응답 코드의 수.<br>_response로 표시_ |
| **aws.elb.httpcode_backend_5xx** <br>(rate) | 등록된 인스턴스에서 생성된 HTTP 5XX 응답 코드의 수.<br>_response로 표시_ |
| **aws.elb.httpcode_elb_4xx** <br>(rate) | 로드 밸런서에서 생성된 HTTP 4XX 클라이언트 오류 코드의 수.<br>_response로 표시_ |
| **aws.elb.httpcode_elb_5_0_0** <br>(count) | 로드 밸런서에서 발생한 HTTP 500 오류 코드의 수.<br>_response로 표시_ |
| **aws.elb.httpcode_elb_5_0_2** <br>(count) | 로드 밸런서에서 발생한 HTTP 502 오류 코드의 수.<br>_response로 표시_ |
| **aws.elb.httpcode_elb_5_0_3** <br>(count) | 로드 밸런서에서 발생한 HTTP 503 오류 코드의 수.<br>_response로 표시_ |
| **aws.elb.httpcode_elb_5_0_4** <br>(count) | 로드 밸런서에서 발생한 HTTP 504 오류 코드의 수.<br>_response로 표시_ |
| **aws.elb.httpcode_elb_5xx** <br>(rate) | 로드 밸런서에서 생성된 HTTP 5XX 클라이언트 오류 코드의 수.<br>_response로 표시_ |
| **aws.elb.latency** <br>(gauge) | 로드 밸런서가 요청을 전달한 후 응답을 수신할 때까지 경과한 평균 시간. (ELB v1)<br>_second로 표시_ |
| **aws.elb.latency.maximum** <br>(gauge) | 로드 밸런서가 요청을 전달한 후 응답을 수신할 때까지 경과한 최대 시간. (ELB v1)<br>_second로 표시_ |
| **aws.elb.latency.minimum** <br>(gauge) | 로드 밸런서가 요청을 전달한 후 응답을 수신할 때까지 경과한 최소 시간. (ELB v1)<br>_second로 표시_ |
| **aws.elb.latency.p95** <br>(gauge) | 로드 밸런서가 요청을 전달한 후 응답을 수신할 때까지 경과한 시간의 95번째 백분위수. (ELB v1)<br>_second로 표시_ |
| **aws.elb.latency.p99** <br>(gauge) | 로드 밸런서가 요청을 전달한 후 응답을 수신할 때까지 경과한 시간의 99번째 백분위수. (ELB v1)<br>_second로 표시_ |
| **aws.elb.request_count** <br>(rate) | 수신되어 등록 인스턴스로 라우팅된, 완료된 요청의 총 수.<br>_request로 표시_ |
| **aws.elb.spillover_count** <br>(rate) | 대기열이 가득 차서 거부된 총 요청 수.<br>_request로 표시_ |
| **aws.elb.spillover_count.maximum** <br>(rate) | 로드 밸런서 노드당 큐가 가득 차서 거부된 최대 요청 수.<br>_request로 표시_ |
| **aws.elb.surge_queue_length** <br>(gauge) | 등록된 인스턴스에 제출 대기 중인 요청의 최대 수.<br>_request로 표시_ |
| **aws.elb.un_healthy_host_count** <br>(gauge) | 각 가용 영역(Availability Zone)의 평균 비정상 인스턴스 수.<br>_host로 표시_ |
| **aws.elb.un_healthy_host_count.maximum** <br>(gauge) | 각 가용 영역(Availability Zone)의 최대 비정상 인스턴스 수.<br>_host로 표시_ |
| **aws.elb.un_healthy_host_count.minimum** <br>(gauge) | 각 가용 영역(Availability Zone)의 최소 비정상 인스턴스 수.<br>_host로 표시_ |
| **aws.elb.un_healthy_host_count_deduped** <br>(gauge) | Cross-Zone Load Balancing 옵션 사용 여부와 관계없는 가용 영역(Availability Zone)당 비정상 인스턴스 수.<br>_host로 표시_ |
| **aws.networkelb.active_flow_count** <br>(gauge) | 클라이언트에서 대상으로 설정된 활성 상태 연결의 평균 수.<br>_connection으로 표시_ |
| **aws.networkelb.active_flow_count.maximum** <br>(gauge) | 클라이언트에서 대상으로 설정된 활성 상태 연결의 최대 수.<br>_connection으로 표시_ |
| **aws.networkelb.active_flow_count.minimum** <br>(gauge) | 클라이언트에서 대상으로 설정된 활성 상태 연결의 최소 수.<br>_connection으로 표시_ |
| **aws.networkelb.active_flow_count_tcp** <br>(count) | 클라이언트에서 대상으로 향하는 동시 TCP 플로 (또는 연결)의 평균 수.<br>_connection으로 표시_ |
| **aws.networkelb.active_flow_count_tls** <br>(count) | 클라이언트에서 대상으로 향하는 동시 TLS 플로 (또는 연결)의 평균 수.<br>_connection으로 표시_ |
| **aws.networkelb.active_flow_count_udp** <br>(count) | 클라이언트에서 대상으로 향하는 동시 UDP 플로 (또는 연결)의 평균 수.<br>_connection으로 표시_ |
| **aws.networkelb.client_tlsnegotiation_error_count** <br>(count) | 클라이언트와 TLS 리스너 간의 협상 중 실패한 총 TLS 핸드셰이크 수.<br>_error로 표시_ |
| **aws.networkelb.consumed_lcus** <br>(count) | 로드밸런서가 사용한 LCU 수.<br>_unit으로 표시_ |
| **aws.networkelb.consumed_lcus_tcp** <br>(count) | 로드밸런서가 TCP에 사용한 LCU 수.<br>_unit으로 표시_ |
| **aws.networkelb.consumed_lcus_tls** <br>(count) | 로드밸런서가 TLS에 사용한 LCU 수.<br>_unit으로 표시_ |
| **aws.networkelb.consumed_lcus_udp** <br>(count) | 로드밸런서가 UDP에 사용한 LCU 수.<br>_unit으로 표시_ |
| **aws.networkelb.healthy_host_count** <br>(gauge) | 정상 상태인 대상의 평균 수<br>_host로 표시_ |
| **aws.networkelb.healthy_host_count.maximum** <br>(gauge) | 정상 상태인 대상의 최대 수<br>_host로 표시_ |
| **aws.networkelb.healthy_host_count.minimum** <br>(gauge) | 정상 상태인 대상의 최소 수<br>_host로 표시_ |
| **aws.networkelb.new_flow_count** <br>(count) | 클라이언트에서 대상으로 새로 설정된 TCP 연결 수.<br>_connection으로 표시_ |
| **aws.networkelb.new_flow_count_tcp** <br>(count) | 해당 기간 내 클라이언트에서 대상으로 새로 설정된 TCP 플로 (또는 연결)의 총 수.<br>_connection으로 표시_ |
| **aws.networkelb.new_flow_count_tls** <br>(count) | 해당 기간 내 클라이언트에서 대상으로 새로 설정된 TLS 플로 (또는 연결)의 총 수.<br>_connection으로 표시_ |
| **aws.networkelb.new_flow_count_udp** <br>(count) | 해당 기간 내 클라이언트에서 대상으로 새로 설정된 UDP 플로 (또는 연결)의 총 수.<br>_connection으로 표시_ |
| **aws.networkelb.peak_packets_per_second** <br>(gauge) | 해당 기간 내 10초 단위의 6개 측정 구간(window) 중 가장 높은 평균 패킷 속도.<br>_packet으로 표시_ |
| **aws.networkelb.port_allocation_error_count** <br>(count) | 클라이언트 IP 변환 작업 중 발생한 임시 포트 할당 오류의 총 수.<br>_error로 표시_ |
| **aws.networkelb.processed_bytes** <br>(count) | TCP/IP 헤더를 포함해 로드 밸런서가 처리한 총 바이트 수.<br>_byte로 표시_ |
| **aws.networkelb.processed_bytes_tcp** <br>(count) | TCP 리스너가 처리한 총 바이트 수.<br>_byte로 표시됨_ |
| **aws.networkelb.processed_bytes_tls** <br>(count) | TLS 리스너가 처리한 총 바이트 수.<br>_byte로 표시됨_ |
| **aws.networkelb.processed_bytes_udp** <br>(count) | UDP 리스너가 처리한 총 바이트 수.<br>_byte로 표시됨_ |
| **aws.networkelb.processed_packets** <br>(count) | 로드 밸런서가 처리한 총 패킷 수.<br>_packet으로 표시_ |
| **aws.networkelb.reserved_lcus** <br>(count) | LCU Reservation을 사용하여 로드 밸런서에 예약된 로드 밸런서 용량 단위(LCU)의 수.<br>_unit으로 표시_ |
| **aws.networkelb.target_tlsnegotiation_error_count** <br>(count) | TLS 리스너와 대상 간의 협상 중 실패한 총 TLS 핸드셰이크 수.<br>_error로 표시_ |
| **aws.networkelb.tcpclient_reset_count** <br>(count) | 클라이언트가 생성하여 대상으로 전송한 리셋(RST) 패킷의 수.<br>_packet으로 표시_ |
| **aws.networkelb.tcpelbreset_count** <br>(count) | 로드 밸런서가 생성한 리셋(RST) 패킷의 수.<br>_packet으로 표시_ |
| **aws.networkelb.tcptarget_reset_count** <br>(count) | 대상이 생성하여 클라이언트로 전송한 리셋(RST) 패킷의 수.<br>_packet으로 표시_ |
| **aws.networkelb.un_healthy_host_count** <br>(gauge) | 비정상 상태인 대상의 평균 수<br>_host로 표시_ |
| **aws.networkelb.un_healthy_host_count.maximum** <br>(gauge) | 비정상 상태인 대상의 최대 수<br>_host로 표시_ |
| **aws.networkelb.un_healthy_host_count.minimum** <br>(gauge) | 비정상 상태인 대상의 최소 수<br>_host로 표시_ |
| **aws.applicationelb.desync_mitigation_mode_non_compliant_request** <br>(count) | RFC 7230을 준수하지 않는 요청 수.<br>_request로 표시_ |
| **aws.applicationelb.elb_auth_error** <br>(count) | 인증 작업이 잘못 구성되었거나, 로드 밸런서가 IdP와 연결을 설정하지 못했거나, 로드 밸런서가 내부 오류로 인해 인증 플로를 완료하지 못하여 사용자 인증이 완료되지 못한 횟수.<br>_error로 표시_ |
| **aws.applicationelb.elb_auth_failure** <br>(count) | IdP가 사용자의 액세스를 거부했거나 인증 코드가 두 번 이상 사용되어 완료하지 못한 사용자 인증 횟수.<br>_error로 표시_ |
| **aws.applicationelb.elb_auth_latency** <br>(gauge) | ID 토큰 및 사용자 정보 조회를 위해 IdP에 쿼리하는 데 경과한 시간(밀리초). 해당 작업 중 하나 이상이 실패할 경우 실패까지 소요된 시간을 뜻합니다.<br>_millisecond로 표시_ |
| **aws.applicationelb.elb_auth_refresh_token_success** <br>(count) | 로드 밸런서가 IdP가 제공한 새로 고침 토큰을 사용하여 사용자 클레임을 새로 고침하는 데 성공한 횟수.<br>_success로 표시_ |
| **aws.applicationelb.elb_auth_success** <br>(count) | 성공한 인증 작업의 수.<br>_success로 표시_ |
| **aws.applicationelb.elb_authuser_claims_size_exceeded** <br>(count) | 구성된 IdP가 11K 바이트를 초과하는 사용자 클레임을 반환한 횟수.|
| **aws.applicationelb.httpcode_elb_3xx** <br>(count) | 로드 밸런서에서 발생한 HTTP 3XX 리디렉션 코드의 수.<br>_response로 표시_ |
| **aws.applicationelb.httpcode_elb_4xx** <br>(count) | 로드 밸런서에서 생성된 HTTP 4XX 클라이언트 오류 코드의 수.<br>_response로 표시_ |
| **aws.applicationelb.httpcode_elb_5_0_0** <br>(count) | 로드 밸런서에서 발생한 HTTP 500 오류 코드의 수.<br>_response로 표시_ |
| **aws.applicationelb.httpcode_elb_5_0_2** <br>(count) | 로드 밸런서에서 발생한 HTTP 502 오류 코드의 수.<br>_response로 표시_ |
| **aws.applicationelb.httpcode_elb_5_0_3** <br>(count) | 로드 밸런서에서 발생한 HTTP 503 오류 코드의 수.<br>_response로 표시_ |
| **aws.applicationelb.httpcode_elb_5_0_4** <br>(count) | 로드 밸런서에서 발생한 HTTP 504 오류 코드의 수.<br>_response로 표시_ |
| **aws.applicationelb.httpcode_elb_5xx** <br>(count) | 로드 밸런서에서 생성된 HTTP 5XX 클라이언트 오류 코드의 수.<br>_response로 표시_ |
| **aws.applicationelb.httpcode_redirect** <br>(count) | 성공한 리디렉션 작업의 수.<br>_response로 표시_ |
| **aws.applicationelb.httpcode_target_2xx** <br>(count) | 등록된 인스턴스에서 생성된 HTTP 2XX 응답 코드의 수.<br>_response로 표시_ |
| **aws.applicationelb.httpcode_target_3xx** <br>(count) | 등록된 인스턴스에서 생성된 HTTP 3XX 응답 코드의 수.<br>_response로 표시_ |
| **aws.applicationelb.httpcode_target_4xx** <br>(count) | 등록된 인스턴스에서 생성된 HTTP 4XX 응답 코드의 수.<br>_response로 표시_ |
| **aws.applicationelb.httpcode_target_5xx** <br>(count) | 등록된 인스턴스에서 생성된 HTTP 5XX 응답 코드의 수.<br>_response로 표시_ |
| **aws.applicationelb.httpfixed_response** <br>(count) | 성공한 고정 응답 작업의 수.<br>_response로 표시_ |
| **aws.applicationelb.httpredirect** <br>(count) | 성공한 리디렉션 작업의 수.|
| **aws.applicationelb.httpredirect_url_limit_exceeded** <br>(count) | 응답 위치 헤더의 URL이 8K를 초과하여 완료하지 못한 리디렉션 작업의 수.|
| **aws.applicationelb.lambda_internal_error** <br>(count) | 로드 밸런서 또는 AWS Lambda 내부 문제로 인해 실패한 Lambda 함수에 대한 요청 수.<br>_request로 표시_ |
| **aws.applicationelb.lambda_target_processed_bytes** <br>(gauge) | Lambda 함수에 대한 요청 및 응답에 로드 밸런서가 처리한 총 바이트 수.<br>_byte로 표시_ |
| **aws.applicationelb.lambda_user_error** <br>(count) | Lambda 함수 문제로 인해 실패한 Lambda 함수에 대한 요청 수.<br>_request로 표시_ |
| **aws.applicationelb.non_sticky_request_count** <br>(count) | 로드 밸런서가 기존 스티키 세션을 사용할 수 없어 새 대상을 선택한 요청 수.<br>_request로 표시_ |
| **aws.applicationelb.target_tlsnegotiation_error_count** <br>(count) | 로드 밸런서에서 시작된 TLS 연결 중 대상과 세션을 설정하지 못한 연결 수.<br>_connection으로 표시_ |
| **aws.elb.active_connection_count** <br>(count) | 클라이언트에서 로드 밸런서로, 로드 밸런서에서 대상까지 활성화된 총 동시 TCP 연결 수.<br>_connection으로 표시_ |
| **aws.elb.client_tlsnegotiation_error_count** <br>(count) | TLS 협상 오류 수.<br>_error로 표시_ |
| **aws.elb.consumed_lbcapacity_units** <br>(gauge) | 소비된 ELB 용량 단위 수.<br>_unit으로 표시_ |
| **aws.elb.consumed_lcus** <br>(gauge) | 로드 밸런서에서 사용하는 로드 밸런서 용량 단위(LCU)의 수.<br>_unit으로 표시_ |
| **aws.elb.httpcode_redirect** <br>(count) | 성공한 리디렉션 작업의 수.<br>_response로 표시_ |
| **aws.elb.httpcode_target_2xx** <br>(count) | 대상이 생성한 HTTP 2XX 응답 코드의 수.<br>_response로 표시_ |
| **aws.elb.httpcode_target_3xx** <br>(count) | 대상이 생성한 HTTP 3XX 응답 코드의 수.<br>_response로 표시_ |
| **aws.elb.httpcode_target_4xx** <br>(count) | 대상이 생성한 HTTP 4XX 응답 코드의 수.<br>_response로 표시_ |
| **aws.elb.httpcode_target_5xx** <br>(count) | 대상이 생성한 HTTP 5XX 응답 코드의 수.<br>_response로 표시_ |
| **aws.elb.ipv_6processed_bytes** <br>(count) | IPv6에서 로드밸런서가 처리한 총 바이트 수.<br>_byte로 표시_ |
| **aws.elb.ipv_6request_count** <br>(count) | 로드밸런서가 수신한 IPv6 요청 수.<br>_request로 표시_ |
| **aws.elb.new_connection_count** <br>(count) | 클라이언트에서 로드 밸런서로, 로드 밸런서에서 대상으로 새로 설정된 TCP 연결의 총 수.<br>_connection으로 표시_ |
| **aws.elb.processed_bytes** <br>(count) | IPv4 및 IPv6를 통해 로드밸런서가 처리한 총 바이트 수.<br>_byte로 표시_ |
| **aws.elb.request_count_per_target** <br>(count) | 대상 그룹의 각 대상이 받은 평균 요청 수.<br>_request로 표시_ |
| **aws.elb.rule_evaluations** <br>(count) | 시간당 평균 요청률에 따른 로드 밸런서가 처리한 규칙의 수.|
| **aws.elb.target_connection_error_count** <br>(count) | 로드 밸런서와 등록된 인스턴스 간의 성공적으로 설정되지 않은 연결 수.<br>_error로 표시_ |
| **aws.elb.target_response_time.average** <br>(gauge) | 로드 밸런서가 요청을 전달한 후 응답을 수신할 때까지 경과한 평균 시간. `aws.applicationelb.target_response_time.average`와 동일함.<br>_second로 표시_ |
| **aws.elb.target_response_time.maximum** <br>(gauge) | 로드 밸런서가 요청을 전달한 후 응답을 수신할 때까지 경과한 최대 시간. `aws.applicationelb.target_response_time.maximum`와 동일함.<br>_second로 표시_ |
| **aws.elb.target_response_time.p95** <br>(gauge) | 로드 밸런서가 요청을 전달한 후 응답을 수신할 때까지 경과한 시간의 95번째 백분위수. `aws.applicationelb.target_response_time.p95`와 동일함.<br>_second로 표시_ |
| **aws.elb.target_response_time.p99** <br>(gauge) | 로드 밸런서가 요청을 전달한 후 응답을 수신할 때까지 경과한 시간의 99번째 백분위수. `aws.applicationelb.target_response_time.p99`와 동일함.<br>_second로 표시_ |

### 이벤트

Amazon Elastic Load Balancing 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon Elastic Load Balancing 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.