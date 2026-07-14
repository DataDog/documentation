---
app_id: alibaba_cloud
categories:
- 클라우드
custom_kind: 통합
description: Alibaba Cloud 서비스를 Datadog와 통합
further_reading:
- link: https://www.datadoghq.com/blog/monitor-alibaba-cloud-datadog/
  tag: 블로그
  text: Datadog로 Alibaba Cloud 모니터링하기
title: Alibaba Cloud
---
{{< site-region region="gov" >}}

<div class="alert alert-warning">Datadog Alibaba Cloud 통합은 Datadog for Government 사이트를 지원하지 않습니다.</div>
{{< /site-region >}}

## 개요

Alibaba Cloud를 연결해 다음에서 메트릭을 얻을 수 있습니다.

- Alibaba Cloud Servers Load Balancer(SLB)
- Alibaba Elastic Compute Service 인스턴스
- RDS 인스턴스용 Alibaba Cloud ApsaraDB
- Redis 인스턴스용 Alibaba Cloud ApsaraDB 
- Alibaba Cloud Content Delivery Network(CDN) 인스턴스
- Alibaba Cloud Container Service 클러스터
- Alibaba Cloud Express Connect 인스턴스

## 설정

### 설치

[Datadog-Alibaba Cloud 통합 구성 타일](https://app.datadoghq.com/integrations/alibaba_cloud)로 이동하여 _add account_를 누릅니다.

### 설정

다음 파라미터를 입력해 Datadog와 Alibaba Cloud API를 통합합니다.

- **`Account Id`**

Alibaba Cloud 콘솔 우측 상단에 있는 아바타에 마우스 커서를 올리고 _Security Settings_를 선택해 찾을 수 있습니다. 계정 ID가 상단 페이지에 표시됩니다.

{{< img src="integrations/alibaba_cloud/account_id_ac.png" alt="계정 ID AC" style="width:30%;">}}

- **`Access Key Id`** & **`Access Key Secret`**

Alibaba Cloud Account에서 다음을 실행하세요.

1. 다음 파라미터를 사용해 _RAM_ 탭에서 새 사용자를 생성하세요.

   - `Logon Name`: Datadog
   - `display name`: Datadog
   - `description`: Datadog-Alibaba Cloud 통합의 Datadog 사용자

1. _Programmatic Access_를 선택합니다.

   {{< img src="integrations/alibaba_cloud/ac_programmatic_access.png" alt="프로그래밍 방식 액세스" style="width:40%;">}}

1. _OK_를 누른 후, [Datadog-Alibaba Cloud 통합 타일](https://app.datadoghq.com/integrations/alibaba_cloud)에 `AccessKeyID` 및 `AccessKeySecret`을 복사하여 붙여넣고 _install integration_을 클릭합니다.

   {{< img src="integrations/alibaba_cloud/ac_access_keys.png" alt="AC 액세스 키" style="width:40%;">}}

1. Alibaba Cloud Account에서 방금 생성한 사용자에 `Add Permissions`를 선택하고 다음 권한을 모두 추가합니다.

   ```text
   AliyunCloudMonitorReadOnlyAccess
   AliyunECSReadOnlyAccess
   AliyunKvstoreReadOnlyAccess
   AliyunRDSReadOnlyAccess
   AliyunSLBReadOnlyAccess
   AliyunCDNReadOnlyAccess
   AliyunCSReadOnlyAccess
   AliyunExpressConnectReadOnlyAccess
   ```

1. _Update_를 누르면 약 15분 후 Datadog-Alibaba 클라우드 통합 타일의 _Metrics_ 탭에 표시되는 메트릭이 리소스에 추가한 사용자 지정 태그 및 여기에 있는 태그가 함께 [Metric Explorer 페이지](https://app.datadoghq.com/metric/explorer)에 나타나기 시작합니다.

   - [kvstore/redis DescribeInstances](https://www.alibabacloud.com/help/doc-detail/60933.htm)
   - [ECS DescribeInstances](https://www.alibabacloud.com/help/doc-detail/25506.htm)
   - [DescribeDBInstances](https://www.alibabacloud.com/help/doc-detail/26232.htm)
   - [DescribeLoadBalancers](https://www.alibabacloud.com/help/doc-detail/27582.htm)

1. 선택사항 - [Datadog-Alibaba Cloud 통합 타일](https://app.datadoghq.com/integrations/alibaba_cloud)에서 `Optionally Limit Metrics Collection`을 설정합니다. 쉼표로 구분된 Alibaba Cloud 태그 목록(형식: `<KEY:VALUE>`)은 Alibaba Cloud에서 메트릭을 수집할 때 사용할 필터를 정의합니다. 와일드카드(예: `?`(단일 문자) 및 `*`(다중 문자))를 사용할 수 있습니다. 정의된 레이블 중 하나와 일치하는 호스트만 Datadog으로 가져오고 나머지는 무시됩니다. 특정 레이블 앞에`!`을 추가하여 해당 레이블과 일치하는 호스트를 제외할 수도 있습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **alibabacloud.slb.healthy_server_count.average** <br>(gauge) | 정상 백엔드 ECS 인스턴스 수<br>_instance로 표시_ |
| **alibabacloud.slb.healthy_server_count.minimum** <br>(gauge) | 정상 백엔드 ECS 인스턴스 수<br>_instance로 표시_ |
| **alibabacloud.slb.healthy_server_count.maximum** <br>(gauge) | 정상 백엔드 ECS 인스턴스 수<br>_instance로 표시_ |
| **alibabacloud.slb.unhealthy_server_count.average** <br>(gauge) | 불량 백엔드 ECS 인스턴스 수<br>_ instance로 표시_ |
| **alibabacloud.slb.unhealthy_server_count.minimum** <br>(gauge) | 불량 백엔드 ECS 인스턴스 수<br>_ instance로 표시_ |
| **alibabacloud.slb.unhealthy_server_count.maximum** <br>(gauge) | 불량 백엔드 ECS 인스턴스 수<br>_ instance로 표시_ |
| **alibabacloud.slb.packet_tx.average** <br>(rate) | 포트에서 초당 전송되는 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.packet_tx.minimum** <br>(rate) | 포트에서 초당 전송되는 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.packet_tx.maximum** <br>(rate) | 포트에서 초당 전송되는 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.packet_rx.average** <br>(rate) | 포트에서 초당 수신되는 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.packet_rx.minimum** <br>(rate) | 포트에서 초당 수신되는 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.packet_rx.maximum** <br>(rate) | 포트에서 초당 수신되는 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.traffic_rx_new.average** <br>(rate) | 포트에서 초당 수신 데이터량<br>_bit로 표시_ |
| **alibabacloud.slb.traffic_rx_new.minimum** <br>(rate) | 포트에서 초당 수신 데이터량<br>_bit로 표시_ |
| **alibabacloud.slb.traffic_rx_new.maximum** <br>(rate) | 포트에서 초당 수신 데이터량<br>_bit로 표시_ |
| **alibabacloud.slb.traffic_tx_new.average** <br>(rate) | 포트에서 초당 발신 데이터량<br>_bit로 표시_ |
| **alibabacloud.slb.traffic_tx_new.minimum** <br>(rate) | 포트에서 초당 발신 데이터량<br>_bit로 표시_ |
| **alibabacloud.slb.traffic_tx_new.maximum** <br>(rate) | 포트에서 초당 발신 데이터량<br>_bit로 표시_ |
| **alibabacloud.slb.active_connection.average** <br>(gauge) | 포트의 활성 연결 수, 즉 클라이언트가 Server Load Balancer에 액세스하기 위해 설정한 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.active_connection.minimum** <br>(gauge) | 포트의 활성 연결 수, 즉 클라이언트가 Server Load Balancer에 액세스하기 위해 설정한 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.active_connection.maximum** <br>(gauge) | 포트의 활성 연결 수, 즉 클라이언트가 Server Load Balancer에 액세스하기 위해 설정한 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.inactive_connection.average** <br>(gauge) | 포트의 비활성 연결 수, 즉 Server Load Balance에 접근한 후 유휴 상태로 있는 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.inactive_connection.minimum** <br>(gauge) | 포트의 비활성 연결 수, 즉 Server Load Balance에 접근한 후 유휴 상태로 있는 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.inactive_connection.maximum** <br>(gauge) | 포트의 비활성 연결 수, 즉 Server Load Balance에 접근한 후 유휴 상태로 있는 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.new_connection.average** <br>(gauge) | 현재 포트의 새 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.new_connection.minimum** <br>(gauge) | 현재 포트의 새 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.new_connection.maximum** <br>(gauge) | 현재 포트의 새 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.max_connection.average** <br>(gauge) | 포트의 동시 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.max_connection.minimum** <br>(gauge) | 포트의 동시 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.max_connection.maximum** <br>(gauge) | 포트의 동시 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.drop_connection.average** <br>(rate) | 모니터링 중 초당 드롭된 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.drop_connection.minimum** <br>(rate) | 모니터링 중 초당 드롭된 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.drop_connection.maximum** <br>(rate) | 모니터링 중 초당 드롭된 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.drop_packet_rx.average** <br>(rate) | 모니터링 중 초당 드롭된 수신 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.drop_packet_rx.minimum** <br>(rate) | 모니터링 중 초당 드롭된 수신 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.drop_packet_rx.maximum** <br>(rate) | 모니터링 중 초당 드롭된 수신 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.drop_packet_tx.average** <br>(rate) | 모니터링 중 초당 드롭된 발신 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.drop_packet_tx.minimum** <br>(rate) | 모니터링 중 초당 드롭된 발신 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.drop_packet_tx.maximum** <br>(rate) | 모니터링 중 초당 드롭된 발신 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.drop_traffic_rx.average** <br>(rate) | 모니터링 중 초당 드롭된 수신 비트 수<br>_bit로 표시_ |
| **alibabacloud.slb.drop_traffic_rx.minimum** <br>(rate) | 모니터링 중 초당 드롭된 수신 비트 수<br>_bit로 표시_ |
| **alibabacloud.slb.drop_traffic_rx.maximum** <br>(rate) | 모니터링 중 초당 드롭된 수신 비트 수<br>_bit로 표시_ |
| **alibabacloud.slb.instance_active_connection.average** <br>(rate) | 인스턴스에서 초당 활성 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.instance_active_connection.minimum** <br>(rate) | 인스턴스에서 초당 활성 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.instance_active_connection.maximum** <br>(rate) | 인스턴스에서 초당 활성 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.instance_drop_connection.average** <br>(rate) | 인스턴스에서 초당 드롭된 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.instance_drop_connection.minimum** <br>(rate) | 인스턴스에서 초당 드롭된 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.instance_drop_connection.maximum** <br>(rate) | 인스턴스에서 초당 드롭된 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.instance_drop_packet_rx.average** <br>(rate) | 인스턴스에서 초당 드롭된 수신 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.instance_drop_packet_rx.minimum** <br>(rate) | 인스턴스에서 초당 드롭된 수신 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.instance_drop_packet_rx.maximum** <br>(rate) | 인스턴스에서 초당 드롭된 수신 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.instance_drop_packet_tx.average** <br>(rate) | 인스턴스에서 초당 드롭된 발신 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.instance_drop_packet_tx.minimum** <br>(rate) | 인스턴스에서 초당 드롭된 발신 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.instance_drop_packet_tx.maximum** <br>(rate) | 인스턴스에서 초당 드롭된 발신 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.instance_drop_traffic_rx.average** <br>(rate) | 인스턴스에서 초당 드롭된 수신 비트 수<br>_bit로 표시_ |
| **alibabacloud.slb.instance_drop_traffic_rx.minimum** <br>(rate) | 인스턴스에서 초당 드롭된 수신 비트 수<br>_bit로 표시_ |
| **alibabacloud.slb.instance_drop_traffic_rx.maximum** <br>(rate) | 인스턴스에서 초당 드롭된 수신 비트 수<br>_bit로 표시_ |
| **alibabacloud.slb.instance_drop_traffic_tx.average** <br>(rate) | 인스턴스에서 초당 드롭된 발신 비트 수<br>_bit로 표시_ |
| **alibabacloud.slb.instance_drop_traffic_tx.minimum** <br>(rate) | 인스턴스에서 초당 드롭된 발신 비트 수<br>_bit로 표시_ |
| **alibabacloud.slb.instance_drop_traffic_tx.maximum** <br>(rate) | 인스턴스에서 초당 드롭된 발신 비트 수<br>_bit로 표시_ |
| **alibabacloud.slb.instance_inactive_connection.average** <br>(rate) | 인스턴스에서 초당 비활성 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.instance_inactive_connection.minimum** <br>(rate) | 인스턴스에서 초당 비활성 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.instance_inactive_connection.maximum** <br>(rate) | 인스턴스에서 초당 비활성 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.instance_max_connection.average** <br>(rate) | 인스턴스에서 초당 최대 동시 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.instance_max_connection.minimum** <br>(rate) | 인스턴스에서 초당 최대 동시 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.instance_max_connection.maximum** <br>(rate) | 인스턴스에서 초당 최대 동시 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.instance_new_connection.average** <br>(rate) | 인스턴스에서 초당 새 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.instance_new_connection.minimum** <br>(rate) | 인스턴스에서 초당 새 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.instance_new_connection.maximum** <br>(rate) | 인스턴스에서 초당 새 연결 수<br>_connection으로 표시_ |
| **alibabacloud.slb.instance_packet_rx.average** <br>(rate) | 인스턴스의 초당 수신 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.instance_packet_rx.minimum** <br>(rate) | 인스턴스의 초당 수신 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.instance_packet_rx.maximum** <br>(rate) | 인스턴스의 초당 수신 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.instance_packet_tx.average** <br>(rate) | 인스턴스의 초당 발신 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.instance_packet_tx.minimum** <br>(rate) | 인스턴스의 초당 발신 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.instance_packet_tx.maximum** <br>(rate) | 인스턴스의 초당 발신 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.slb.instance_traffic_rx.average** <br>(rate) | 인스턴스의 초당 수신 비트 수<br>_bit로 표시_ |
| **alibabacloud.slb.instance_traffic_rx.minimum** <br>(rate) | 인스턴스의 초당 수신 비트 수<br>_bit로 표시_ |
| **alibabacloud.slb.instance_traffic_rx.maximum** <br>(rate) | 인스턴스의 초당 수신 비트 수<br>_bit로 표시_ |
| **alibabacloud.slb.instance_traffic_tx.average** <br>(rate) | 인스턴스의 초당 발신 비트 수<br>_bit로 표시_ |
| **alibabacloud.slb.instance_traffic_tx.minimum** <br>(rate) | 인스턴스의 초당 발신 비트 수<br>_bit로 표시_ |
| **alibabacloud.slb.instance_traffic_tx.maximum** <br>(rate) | 인스턴스의 초당 발신 비트 수<br>_bit로 표시_ |
| **alibabacloud.slb.qps.average** <br>(rate) | Layer-7 프로토콜 포트 QPS<br>_query로 표시_ |
| **alibabacloud.slb.rt.average** <br>(gauge) | Layer-7 프로토콜 포트 RT<br>_millisecond로 표시_ |
| **alibabacloud.slb.status_code2xx.average** <br>(rate) | Layer-7 프로토콜 포트 상태 코드 2XX|
| **alibabacloud.slb.status_code3xx.average** <br>(rate) | Layer-7 프로토콜 포트 상태 코드 3XX|
| **alibabacloud.slb.status_code4xx.average** <br>(rate) | Layer-7 프로토콜 포트 상태 코드 4XX|
| **alibabacloud.slb.status_code5xx.average** <br>(rate) | Layer-7 프로토콜 포트 상태 코드 5XX|
| **alibabacloud.slb.upstream_code4xx.average** <br>(rate) | Layer-7 프로토콜 포트 Upstream 상태 코드 4XX|
| **alibabacloud.slb.upstream_code5xx.average** <br>(rate) | Layer-7 프로토콜 포트 Upstream 상태 코드 5XX|
| **alibabacloud.slb.upstream_rt.average** <br>(gauge) | Layer-7 프로토콜 포트 UpstreamRT<br>_millisecond로 표시_ |
| **alibabacloud.slb.instance_qps.average** <br>(rate) | Layer-7 프로토콜 인스턴스 QPS<br>_query로 표시_ |
| **alibabacloud.slb.instance_rt.average** <br>(gauge) | Layer-7 프로토콜 인스턴스 RT<br>_millisecond로 표시_ |
| **alibabacloud.slb.instance_status_code2xx.average** <br>(rate) | Layer-7 프로토콜 인스턴스 상태 코드 2XX|
| **alibabacloud.slb.instance_status_code3xx.average** <br>(rate) | Layer-7 프로토콜 인스턴스 상태 코드 3XX|
| **alibabacloud.slb.instance_status_code4xx.average** <br>(rate) | Layer-7 프로토콜 인스턴스 상태 코드 4XX|
| **alibabacloud.slb.instance_status_code5xx.average** <br>(rate) | Layer-7 프로토콜 인스턴스 상태 코드 5XX|
| **alibabacloud.slb.instance_status_code_other.average** <br>(rate) | Layer-7 프로토콜 인스턴스 상태 코드 Other|
| **alibabacloud.slb.instance_upstream_code4xx.average** <br>(rate) | Layer-7 프로토콜 인스턴스 Upstream 상태 코드 4XX|
| **alibabacloud.slb.instance_upstream_code5xx.average** <br>(rate) | Layer-7 프로토콜 인스턴스 Upstream 상태 코드 5XX|
| **alibabacloud.slb.instance_upstream_rt.average** <br>(gauge) | Layer-7 프로토콜 인스턴스 UpstreamRT<br>_millisecond로 표시_ |
| **alibabacloud.ecs.cpu_utilization.average** <br>(gauge) | CPU 사용률<br>_percent로 표시_ |
| **alibabacloud.ecs.cpu_utilization.minimum** <br>(gauge) | CPU 사용률<br>_percent로 표시_ |
| **alibabacloud.ecs.cpu_utilization.maximum** <br>(gauge) | CPU 사용률<br>_percent로 표시_ |
| **alibabacloud.ecs.internet_in_rate.average** <br>(rate) | 공용 네트워크 수신 대역폭<br>_bit로 표시_ |
| **alibabacloud.ecs.internet_in_rate.minimum** <br>(rate) | 공용 네트워크 수신 대역폭<br>_bit로 표시_ |
| **alibabacloud.ecs.internet_in_rate.maximum** <br>(rate) | 공용 네트워크 수신 대역폭<br>_bit로 표시_ |
| **alibabacloud.ecs.intranet_in_rate.average** <br>(rate) | 프라이빗 네트워크 수신 대역폭<br>_ bit로 표시_ |
| **alibabacloud.ecs.intranet_in_rate.minimum** <br>(rate) | 프라이빗 네트워크 수신 대역폭<br>_ bit로 표시_ |
| **alibabacloud.ecs.intranet_in_rate.maximum** <br>(rate) | 프라이빗 네트워크 수신 대역폭<br>_ bit로 표시_ |
| **alibabacloud.ecs.internet_out_rate.average** <br>(rate) | 공용 네트워크 발신 대역폭<br>_bit로 표시_ |
| **alibabacloud.ecs.internet_out_rate.minimum** <br>(rate) | 공용 네트워크 발신 대역폭<br>_bit로 표시_ |
| **alibabacloud.ecs.internet_out_rate.maximum** <br>(rate) | 공용 네트워크 발신 대역폭<br>_bit로 표시_ |
| **alibabacloud.ecs.intranet_out_rate.average** <br>(rate) | 프라이빗 네트워크 발신 대역폭<br>_ bit로 표시_ |
| **alibabacloud.ecs.intranet_out_rate.maximum** <br>(rate) | 프라이빗 네트워크 발신 대역폭<br>_ bit로 표시_ |
| **alibabacloud.ecs.intranet_out_rate.minimum** <br>(rate) | 프라이빗 네트워크 발신 대역폭<br>_ bit로 표시_ |
| **alibabacloud.ecs.internet_out_rate_percent.average** <br>(gauge) | 공용 네트워크 발신 대역폭 사용률<br>_percent로 표시_ |
| **alibabacloud.ecs.disk_read_bps.average** <br>(rate) | 시스템 총 디스크 읽기 BPS<br>_bit로 표시_ |
| **alibabacloud.ecs.disk_read_bps.minimum** <br>(rate) | 시스템 총 디스크 읽기 BPS<br>_bit로 표시_ |
| **alibabacloud.ecs.disk_read_bps.maximum** <br>(rate) | 시스템 총 디스크 읽기 BPS<br>_bit로 표시_ |
| **alibabacloud.ecs.disk_write_bps.average** <br>(rate) | 시스템 총 디스크 쓰기 BPS<br>_bit로 표시_ |
| **alibabacloud.ecs.disk_write_bps.minimum** <br>(rate) | 시스템 총 디스크 쓰기 BPS<br>_bit로 표시_ |
| **alibabacloud.ecs.disk_write_bps.maximum** <br>(rate) | 시스템 총 디스크 쓰기 BPS<br>_bit로 표시_ |
| **alibabacloud.ecs.disk_read_iops.average** <br>(rate) | 시스템 디스크 읽기 IOPS<br>_operation으로 표시_ |
| **alibabacloud.ecs.disk_read_iops.minimum** <br>(rate) | 시스템 디스크 읽기 IOPS<br>_operation으로 표시_ |
| **alibabacloud.ecs.disk_read_iops.maximum** <br>(rate) | 시스템 디스크 읽기 IOPS<br>_operation으로 표시_ |
| **alibabacloud.ecs.disk_write_iops.average** <br>(rate) | 시스템 디스크 쓰기 IOPS<br>_operation으로 표시_ |
| **alibabacloud.ecs.disk_write_iops.minimum** <br>(rate) | 시스템 디스크 쓰기 IOPS<br>_operation으로 표시_ |
| **alibabacloud.ecs.disk_write_iops.maximum** <br>(rate) | 시스템 디스크 쓰기 IOPS<br>_operation으로 표시_ |
| **alibabacloud.ecs.vpc_public_ip_internet_in_rate.average** <br>(rate) | VPC -  공용 네트워크 수신 대역폭<br>_bit로 표시_ |
| **alibabacloud.ecs.vpc_public_ip_internet_in_rate.minimum** <br>(rate) | VPC -  공용 네트워크 수신 대역폭<br>_bit로 표시_ |
| **alibabacloud.ecs.vpc_public_ip_internet_in_rate.maximum** <br>(rate) | VPC -  공용 네트워크 수신 대역폭<br>_bit로 표시_ |
| **alibabacloud.ecs.vpc_public_ip_internet_out_rate.average** <br>(rate) | VPC - 공용 네트워크 발신 대역폭<br>_bit로 표시_ |
| **alibabacloud.ecs.vpc_public_ip_internet_out_rate.minimum** <br>(rate) | VPC - 공용 네트워크 발신 대역폭<br>_bit로 표시_ |
| **alibabacloud.ecs.vpc_public_ip_internet_out_rate.maximum** <br>(rate) | VPC - 공용 네트워크 발신 대역폭<br>_bit로 표시_ |
| **alibabacloud.ecs.vpc_public_ip_internet_out_rate_percent.average** <br>(gauge) | VPC - 공용 네트워크 발신 대역폭 사용률<br>_percent로 표시_ |
| **alibabacloud.ecs.disk_readbytes.average** <br>(rate) | 시스템 에이전트 디바이스별 디스크 읽기 바이트 수<br>_byte로 표시_ |
| **alibabacloud.ecs.disk_readbytes.minimum** <br>(rate) | 시스템 에이전트 디바이스별 디스크 읽기 바이트 수<br>_byte로 표시_ |
| **alibabacloud.ecs.disk_readbytes.maximum** <br>(rate) | 시스템 에이전트 디바이스별 디스크 읽기 바이트 수<br>_byte로 표시_ |
| **alibabacloud.ecs.disk_readiops.average** <br>(rate) | 시스템 에이전트 디스크 읽기 IOPS<br>_operation으로 표시_ |
| **alibabacloud.ecs.disk_readiops.minimum** <br>(rate) | 시스템 에이전트 디스크 읽기 IOPS<br>_operation으로 표시_ |
| **alibabacloud.ecs.disk_readiops.maximum** <br>(rate) | 시스템 에이전트 디스크 읽기 IOPS<br>_operation으로 표시_ |
| **alibabacloud.ecs.disk_writebytes.average** <br>(rate) | 시스템 에이전트 디바이스별 디스크 쓰기 바이트 수<br>_byte로 표시_ |
| **alibabacloud.ecs.disk_writebytes.minimum** <br>(rate) | 시스템 에이전트 디바이스별 디스크 쓰기 바이트 수<br>_byte로 표시_ |
| **alibabacloud.ecs.disk_writebytes.maximum** <br>(rate) | 시스템 에이전트 디바이스별 디스크 쓰기 바이트 수<br>_byte로 표시_ |
| **alibabacloud.ecs.disk_writeiops.average** <br>(rate) | 시스템 에이전트 디스크 쓰기 IOPS<br>_operation으로 표시_ |
| **alibabacloud.ecs.disk_writeiops.minimum** <br>(rate) | 시스템 에이전트 디스크 쓰기 IOPS<br>_operation으로 표시_ |
| **alibabacloud.ecs.disk_writeiops.maximum** <br>(rate) | 시스템 에이전트 디스크 쓰기 IOPS<br>_operation으로 표시_ |
| **alibabacloud.ecs.diskusage_avail.average** <br>(gauge) | 시스템 에이전트 디스크 사용 가능 용량<br>_byte로 표시_ |
| **alibabacloud.ecs.diskusage_avail.minimum** <br>(gauge) | 시스템 에이전트 디스크 사용 가능 용량<br>_byte로 표시_ |
| **alibabacloud.ecs.diskusage_avail.maximum** <br>(gauge) | 시스템 에이전트 디스크 사용 가능 용량<br>_byte로 표시_ |
| **alibabacloud.ecs.diskusage_free.average** <br>(gauge) | 호스트 디스크 사용 가능 용량<br>_byte로 표시_ |
| **alibabacloud.ecs.diskusage_free.minimum** <br>(gauge) | 호스트 디스크 사용 가능 용량<br>_byte로 표시_ |
| **alibabacloud.ecs.diskusage_free.maximum** <br>(gauge) | 호스트 디스크 사용 가능 용량<br>_byte로 표시_ |
| **alibabacloud.ecs.diskusage_total.average** <br>(gauge) | 호스트 디스크 총 사용량<br>_byte로 표시_ |
| **alibabacloud.ecs.diskusage_total.minimum** <br>(gauge) | 호스트 디스크 총 사용량<br>_byte로 표시_ |
| **alibabacloud.ecs.diskusage_total.maximum** <br>(gauge) | 호스트 디스크 총 사용량<br>_byte로 표시_ |
| **alibabacloud.ecs.diskusage_used.average** <br>(gauge) | 호스트 디스크 사용량<br>_byte로 표시_ |
| **alibabacloud.ecs.diskusage_used.minimum** <br>(gauge) | 호스트 디스크 사용량<br>_byte로 표시_ |
| **alibabacloud.ecs.diskusage_used.maximum** <br>(gauge) | 호스트 디스크 사용량<br>_byte로 표시_ |
| **alibabacloud.ecs.diskusage_utilization.average** <br>(gauge) | 호스트 디스크 사용 현황<br>_byte로 표시_ |
| **alibabacloud.ecs.diskusage_utilization.minimum** <br>(gauge) | 호스트 디스크 사용 현황<br>_byte로 표시_ |
| **alibabacloud.ecs.diskusage_utilization.maximum** <br>(gauge) | 호스트 디스크 사용 현황<br>_byte로 표시_ |
| **alibabacloud.ecs.gpu_decoder_utilization.average** <br>(gauge) | GPU 디코더 사용률<br>_percent로 표시_ |
| **alibabacloud.ecs.gpu_decoder_utilization.minimum** <br>(gauge) | GPU 디코더 사용률<br>_percent로 표시_ |
| **alibabacloud.ecs.gpu_decoder_utilization.maximum** <br>(gauge) | GPU 디코더 사용률<br>_percent로 표시_ |
| **alibabacloud.ecs.gpu_encoder_utilization.average** <br>(gauge) | GPU 인코더 사용률<br>_percent로 표시_ |
| **alibabacloud.ecs.gpu_encoder_utilization.minimum** <br>(gauge) | GPU 인코더 사용률<br>_percent로 표시_ |
| **alibabacloud.ecs.gpu_encoder_utilization.maximum** <br>(gauge) | GPU 인코더 사용률<br>_percent로 표시_ |
| **alibabacloud.ecs.gpu_gpu_temperature.average** <br>(gauge) | GPU 온도<br>_degree celsius로 표시_ |
| **alibabacloud.ecs.gpu_gpu_temperature.minimum** <br>(gauge) | GPU 온도<br>_degree celsius로 표시_ |
| **alibabacloud.ecs.gpu_gpu_temperature.maximum** <br>(gauge) | GPU 온도<br>_degree celsius로 표시_ |
| **alibabacloud.ecs.gpu_gpu_usedutilization.average** <br>(gauge) | GPU 사용률<br>_percent로 표시_ |
| **alibabacloud.ecs.gpu_gpu_usedutilization.minimum** <br>(gauge) | GPU 사용률<br>_percent로 표시_ |
| **alibabacloud.ecs.gpu_gpu_usedutilization.maximum** <br>(gauge) | GPU 사용률<br>_percent로 표시_ |
| **alibabacloud.ecs.gpu_memory_freespace.average** <br>(gauge) | GPU 메모리 여유 공간<br>_byte로 표시_ |
| **alibabacloud.ecs.gpu_memory_freespace.minimum** <br>(gauge) | GPU 메모리 여유 공간<br>_byte로 표시_ |
| **alibabacloud.ecs.gpu_memory_freespace.maximum** <br>(gauge) | GPU 메모리 여유 공간<br>_byte로 표시_ |
| **alibabacloud.ecs.gpu_memory_freeutilization.average** <br>(gauge) | GPU 메모리 사용 가능률<br>_percent로 표시_ |
| **alibabacloud.ecs.gpu_memory_freeutilization.minimum** <br>(gauge) | GPU 메모리 사용 가능률<br>_percent로 표시_ |
| **alibabacloud.ecs.gpu_memory_freeutilization.maximum** <br>(gauge) | GPU 메모리 사용 가능률<br>_percent로 표시_ |
| **alibabacloud.ecs.gpu_memory_usedspace.average** <br>(gauge) | GPU 메모리 사용 공간<br>_byte로 표시_ |
| **alibabacloud.ecs.gpu_memory_usedspace.minimum** <br>(gauge) | GPU 메모리 사용 공간<br>_byte로 표시_ |
| **alibabacloud.ecs.gpu_memory_usedspace.maximum** <br>(gauge) | GPU 메모리 사용 공간<br>_byte로 표시_ |
| **alibabacloud.ecs.gpu_memory_usedutilization.average** <br>(gauge) | GPU 메모리 사용률<br>_percent로 표시_ |
| **alibabacloud.ecs.gpu_memory_usedutilization.minimum** <br>(gauge) | GPU 메모리 사용률<br>_percent로 표시_ |
| **alibabacloud.ecs.gpu_memory_usedutilization.maximum** <br>(gauge) | GPU 메모리 사용률<br>_percent로 표시_ |
| **alibabacloud.ecs.gpu_power_readings_power_draw.average** <br>(gauge) | GPU 전력 측정값 및 전력 소모량<br>_watt로 표시_ |
| **alibabacloud.ecs.gpu_power_readings_power_draw.minimum** <br>(gauge) | GPU 전력 측정값 및 전력 소모량<br>_watt로 표시_ |
| **alibabacloud.ecs.gpu_power_readings_power_draw.maximum** <br>(gauge) | GPU 전력 측정값 및 전력 소모량<br>_watt로 표시_ |
| **alibabacloud.rds.cpu_usage.average** <br>(gauge) | CPU 사용률<br>_percent로 표시_ |
| **alibabacloud.rds.cpu_usage.minimum** <br>(gauge) | CPU 사용률<br>_percent로 표시_ |
| **alibabacloud.rds.cpu_usage.maximum** <br>(gauge) | CPU 사용률<br>_percent로 표시_ |
| **alibabacloud.rds.disk_usage.average** <br>(gauge) | 디스크 사용률<br>_percent로 표시_ |
| **alibabacloud.rds.disk_usage.minimum** <br>(gauge) | 디스크 사용률<br>_percent로 표시_ |
| **alibabacloud.rds.disk_usage.maximum** <br>(gauge) | 디스크 사용률<br>_percent로 표시_ |
| **alibabacloud.rds.iops_usage.average** <br>(gauge) | IOPS 사용률<br>_percent로 표시_ |
| **alibabacloud.rds.iops_usage.minimum** <br>(gauge) | IOPS 사용률<br>_percent로 표시_ |
| **alibabacloud.rds.iops_usage.maximum** <br>(gauge) | IOPS 사용률<br>_percent로 표시_ |
| **alibabacloud.rds.connection_usage.average** <br>(gauge) | 연결 사용률<br>_percent로 표시_ |
| **alibabacloud.rds.connection_usage.minimum** <br>(gauge) | 연결 사용률<br>_percent로 표시_ |
| **alibabacloud.rds.connection_usage.maximum** <br>(gauge) | 연결 사용률<br>_percent로 표시_ |
| **alibabacloud.rds.data_delay.average** <br>(gauge) | 읽기 전용 인스턴스 지연 시간<br>_second로 표시_ |
| **alibabacloud.rds.data_delay.minimum** <br>(gauge) | 읽기 전용 인스턴스 지연 시간<br>_second로 표시_ |
| **alibabacloud.rds.data_delay.maximum** <br>(gauge) | 읽기 전용 인스턴스 지연 시간<br>_second로 표시_ |
| **alibabacloud.rds.memory_usage.average** <br>(gauge) | 메모리 사용률<br>_percent로 표시_ |
| **alibabacloud.rds.memory_usage.minimum** <br>(gauge) | 메모리 사용률<br>_percent로 표시_ |
| **alibabacloud.rds.memory_usage.maximum** <br>(gauge) | 메모리 사용률<br>_percent로 표시_ |
| **alibabacloud.rds.my_sql_network_in_new.average** <br>(rate) | 초당 MysqlInbound 네트워크 트래픽<br>_bit로 표시_ |
| **alibabacloud.rds.my_sql_network_in_new.minimum** <br>(rate) | 초당 MysqlInbound 네트워크 트래픽<br>_bit로 표시_ |
| **alibabacloud.rds.my_sql_network_in_new.maximum** <br>(rate) | 초당 MysqlInbound 네트워크 트래픽<br>_bit로 표시_ |
| **alibabacloud.rds.my_sql_network_out_new.average** <br>(rate) | 초당 MysqlOutbound 네트워크 트래픽<br>_bit로 표시_ |
| **alibabacloud.rds.my_sql_network_out_new.minimum** <br>(rate) | 초당 MysqlOutbound 네트워크 트래픽<br>_bit로 표시_ |
| **alibabacloud.rds.my_sql_network_out_new.maximum** <br>(rate) | 초당 MysqlOutbound 네트워크 트래픽<br>_bit로 표시_ |
| **alibabacloud.rds.sql_server_network_in_new.average** <br>(rate) | SQLServer - 초당 수신 네트워크 트래픽<br>_bit로 표시_ |
| **alibabacloud.rds.sql_server_network_out_new.average** <br>(rate) | SQLServer - 초당 발신 네트워크 트래픽<br>_bit로 표시_ |
| **alibabacloud.redis.memory_usage.average** <br>(gauge) | 사용 중인 메모리 비율<br>_percent로 표시_ |
| **alibabacloud.redis.memory_usage.minimum** <br>(gauge) | 사용 중인 메모리 비율<br>_percent로 표시_ |
| **alibabacloud.redis.memory_usage.maximum** <br>(gauge) | 사용 중인 메모리 비율<br>_percent로 표시_ |
| **alibabacloud.redis.connection_usage.average** <br>(gauge) | 사용 중인 연결 비율<br>_percent로 표시_ |
| **alibabacloud.redis.connection_usage.minimum** <br>(gauge) | 사용 중인 연결 비율<br>_percent로 표시_ |
| **alibabacloud.redis.connection_usage.maximum** <br>(gauge) | 사용 중인 연결 비율<br>_percent로 표시_ |
| **alibabacloud.redis.intranet_in_ratio.average** <br>(gauge) | 쓰기 작업 중 소모된 대역폭 비율<br>_percent로 표시_ |
| **alibabacloud.redis.intranet_in_ratio.minimum** <br>(gauge) | 쓰기 작업 중 소모된 대역폭 비율<br>_percent로 표시_ |
| **alibabacloud.redis.intranet_in_ratio.maximum** <br>(gauge) | 쓰기 작업 중 소모된 대역폭 비율<br>_percent로 표시_ |
| **alibabacloud.redis.intranet_in.average** <br>(rate) | 쓰기 속도<br>_bit로 표시_ |
| **alibabacloud.redis.intranet_in.minimum** <br>(rate) | 쓰기 속도<br>_bit로 표시_ |
| **alibabacloud.redis.intranet_in.maximum** <br>(rate) | 쓰기 속도<br>_bit로 표시_ |
| **alibabacloud.redis.failed_count.average** <br>(rate) | KVSTORE에서 실패 작업 수<br>_operation으로 표시_ |
| **alibabacloud.redis.failed_count.minimum** <br>(rate) | KVSTORE에서 실패 작업 수<br>_operation으로 표시_ |
| **alibabacloud.redis.failed_count.maximum** <br>(rate) | KVSTORE에서 실패 작업 수<br>_operation으로 표시_ |
| **alibabacloud.redis.cpu_usage.average** <br>(gauge) | CPU 사용률<br>_percent로 표시_ |
| **alibabacloud.redis.cpu_usage.minimum** <br>(gauge) | CPU 사용률<br>_percent로 표시_ |
| **alibabacloud.redis.cpu_usage.maximum** <br>(gauge) | CPU 사용률<br>_percent로 표시_ |
| **alibabacloud.redis.used_memory.average** <br>(gauge) | 사융 중인 메모리<br>_byte로 표시됨_ |
| **alibabacloud.redis.used_memory.minimum** <br>(gauge) | 사융 중인 메모리<br>_byte로 표시됨_ |
| **alibabacloud.redis.used_memory.maximum** <br>(gauge) | 사융 중인 메모리<br>_byte로 표시됨_ |
| **alibabacloud.redis.used_connection.average** <br>(gauge) | 사용된 연결 수<br>_connection으로 표시_ |
| **alibabacloud.redis.used_connection.minimum** <br>(gauge) | 사용된 연결 수<br>_connection으로 표시_ |
| **alibabacloud.redis.used_connection.maximum** <br>(gauge) | 사용된 연결 수<br>_connection으로 표시_ |
| **alibabacloud.cdn.qps.average** <br>(gauge) | 총 액세스 요청 수<br>_request로 표시_ |
| **alibabacloud.cdn.qps.minimum** <br>(gauge) | 총 액세스 요청 수<br>_request로 표시_ |
| **alibabacloud.cdn.qps.maximum** <br>(gauge) | 총 액세스 요청 수<br>_request로 표시_ |
| **alibabacloud.cdn.bps.average** <br>(rate) | 최대 대역폭<br>_bit로 표시_ |
| **alibabacloud.cdn.bps.minimum** <br>(rate) | 최대 대역폭<br>_bit로 표시_ |
| **alibabacloud.cdn.bps.maximum** <br>(rate) | 최대 대역폭<br>_bit로 표시_ |
| **alibabacloud.cdn.hit_rate.average** <br>(gauge) | Byte 히트율<br>_percent로 표시_ |
| **alibabacloud.cdn.code4xx.average** <br>(gauge) | 4xx 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.cdn.code5xx.average** <br>(gauge) | 54xx 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.cdn.internet_out.sum** <br>(gauge) | 다운스트림 트래픽<br>_byte로 표시_ |
| **alibabacloud.cdn.count** <br>(gauge) | 인스턴스 수<br>_ instance로 표시_ |
| **alibabacloud.container_service.cluster.cpu.limit** <br>(gauge) | 클러스터 CPU 한도<br>_core로 표시_ |
| **alibabacloud.container_service.cluster.cpu.request** <br>(gauge) | 클러스터 CPU 요청<br>_core로 표시_ |
| **alibabacloud.container_service.cluster.cpu.usage_rate** <br>(gauge) | 클러스터 CPU 사용률<br>_core로 표시_ |
| **alibabacloud.container_service.cluster.cpu.utilization** <br>(gauge) | 클러스터 CPU 사용률<br>_percent로 표시_ |
| **alibabacloud.container_service.cluster.memory.limit** <br>(gauge) | 클러스터 메모리 한도<br>_byte로 표시_ |
| **alibabacloud.container_service.cluster.memory.request** <br>(gauge) | 클러스터 메모리 요청<br>_byte로 표시_ |
| **alibabacloud.container_service.cluster.memory.utilization** <br>(gauge) | 클러스터 메모리 사용률<br>_percent로 표시_ |
| **alibabacloud.container_service.node.cpu.allocatable** <br>(gauge) | 노드 CPU 할당 가능량<br>_core로 표시_ |
| **alibabacloud.container_service.node.cpu.capacity** <br>(gauge) | 노드 CPU 용량<br>_core로 표시_ |
| **alibabacloud.container_service.node.cpu.limit** <br>(gauge) | 노드 CPU 한도<br>_core로 표시_ |
| **alibabacloud.container_service.node.cpu.oversale_rate** <br>(rate) | 노드 CPU 오버세일 비율<br>_core로 표시_ |
| **alibabacloud.container_service.node.cpu.request** <br>(gauge) | 노드 CPU  요청<br>_core로 표시_ |
| **alibabacloud.container_service.node.cpu.usage_rate** <br>(rate) | 노드 CPU 사용률<br>_core로 표시_ |
| **alibabacloud.container_service.node.cpu.utilization** <br>(gauge) | 노드 CPU 사용률<br>_percent로 표시_ |
| **alibabacloud.container_service.node.filesystem.available** <br>(gauge) | 노드 파일시스템 여유 공간<br>_node로 표시_ |
| **alibabacloud.container_service.node.filesystem.inodes** <br>(gauge) | 노드 파일시스템 아이노드 수<br>_inode로 표시_ |
| **alibabacloud.container_service.node.filesystem.limit** <br>(gauge) | 노드 파일시스템 한도<br>_node로 표시_ |
| **alibabacloud.container_service.node.filesystem.usage** <br>(gauge) | 노드 파일시스템 사용량<br>_node로 표시_ |
| **alibabacloud.container_service.node.memory.allocatable** <br>(gauge) | 노드 메모리 할당 가능량<br>_byte로 표시_ |
| **alibabacloud.container_service.node.memory.cache** <br>(gauge) | 노드 메모리 캐시<br>_byte로 표시_ |
| **alibabacloud.container_service.node.memory.limit** <br>(gauge) | 노드 메모리 한도<br>_byte로 표시_ |
| **alibabacloud.container_service.node.memory.oversale_rate** <br>(gauge) | 노드 메모리 오버세일 비율<br>_percent로 표시_ |
| **alibabacloud.container_service.node.memory.request** <br>(gauge) | 노드 메모리 요청<br>_byte로 표시_ |
| **alibabacloud.container_service.node.memory.usage** <br>(gauge) | 노드 메모리 사용량<br>_byte로 표시됨_ |
| **alibabacloud.container_service.node.memory.utilization** <br>(gauge) | 노드 메모리 사용률<br>_percent로 표시_ |
| **alibabacloud.container_service.node.memory.working_set** <br>(gauge) | 노드 메모리 워킹 셋<br>_byte로 표시_ |
| **alibabacloud.container_service.node.network.rx_errors** <br>(gauge) | 노드 네트워크 rx 오류<br>_error로 표시_ |
| **alibabacloud.container_service.node.network.rx_errors_rate** <br>(rate) | 노드 네트워크 rx 오류 속도<br>_byte로 표시_ |
| **alibabacloud.container_service.node.network.rx_rate** <br>(rate) | 노드 네트워크 rx 속도<br>_byte로 표시_ |
| **alibabacloud.container_service.node.network.tx_errors_rate** <br>(rate) | 노드 네트워크 tx 오류 속도<br>_byte로 표시_ |
| **alibabacloud.container_service.node.network.tx_rate** <br>(rate) | 노드 네트워크 tx 속도<br>_byte로 표시_ |
| **alibabacloud.container_service.ns.cpu.limit** <br>(gauge) | ns CPU 한도<br>_core로 표시_ |
| **alibabacloud.container_service.pod.cpu.limit** <br>(gauge) | 포드 CPU 한도<br>_core로 표시_ |
| **alibabacloud.container_service.pod.cpu.oversale_rate** <br>(gauge) | 포드 CPU 오버세일 비율<br>_core로 표시_ |
| **alibabacloud.container_service.pod.cpu.request** <br>(gauge) | 포드 CPU  요청<br>_core로 표시_ |
| **alibabacloud.container_service.pod.cpu.usage_rate** <br>(rate) | 포드 CPU 사용률<br>_core로 표시_ |
| **alibabacloud.container_service.pod.cpu.utilization** <br>(gauge) | 포드 CPU 사용률<br>_percent로 표시_ |
| **alibabacloud.container_service.pod.memory.cache** <br>(gauge) | 포드 메모리 캐시<br>_byte로 표시_ |
| **alibabacloud.container_service.pod.memory.limit** <br>(gauge) | 포드 메모리 한도<br>_byte로 표시_ |
| **alibabacloud.container_service.pod.memory.oversale_rate** <br>(gauge) | 포드 메모리 오버세일 비율<br>_percent로 표시_ |
| **alibabacloud.container_service.pod.memory.request** <br>(gauge) | 포드 메모리 요청<br>_byte로 표시_ |
| **alibabacloud.container_service.pod.memory.rss** <br>(gauge) | 포드 메모리 rss<br>_byte로 표시_ |
| **alibabacloud.container_service.pod.memory.utilization** <br>(gauge) | 포드 메모리 사용률<br>_percent로 표시_ |
| **alibabacloud.container_service.pod.memory.working_set** <br>(gauge) | 포드 메모리 워킹 셋<br>_byte로 표시_ |
| **alibabacloud.container_service.pod.network.rx_errors_rate** <br>(rate) | 포드 네트워크 rx 오류 속도<br>_byte로 표시_ |
| **alibabacloud.container_service.pod.network.rx_rate** <br>(rate) | 포드 네트워크 rx 속도<br>_byte로 표시_ |
| **alibabacloud.container_service.pod.network.tx_errors_rate** <br>(rate) | 포드 네트워크 tx 오류 속도<br>_byte로 표시_ |
| **alibabacloud.container_service.pod.network.tx_rate** <br>(rate) | 포드 네트워크 tx 속도<br>_byte로 표시_ |
| **alibabacloud.container_service.deployment.filesystem.available** <br>(gauge) | 배포 파일시스템 여유 공간<br>_byte로 표시_ |
| **alibabacloud.container_service.deployment.filesystem.limit** <br>(gauge) | 배포 파일시스템 한도<br>_byte로 표시_ |
| **alibabacloud.container_service.pod.filesystem.available** <br>(gauge) | 포드 파일시스템 여유 공간<br>_node로 표시_ |
| **alibabacloud.container_service.pod.filesystem.limit** <br>(gauge) | 포드 파일시스템 한도<br>_byte로 표시_ |
| **alibabacloud.container_service.cluster.filesystem.available** <br>(gauge) | 클러스터 파일시스템 여유 공간<br>_byte로 표시_ |
| **alibabacloud.container_service.cluster.filesystem.limit** <br>(gauge) | 클러스터 파일시스템 한도<br>_byte로 표시_ |
| **alibabacloud.container_service.count** <br>(gauge) | 클러스터 수<br>_ instance로 표시_ |
| **alibabacloud.container_service.number_of_nodes** <br>(gauge) | 노드 수<br>_node로 표시_ |
| **alibabacloud.express_connect.intranet_rx** <br>(gauge) | 수신 네트워크 트래픽<br>_byte로 표시_ |
| **alibabacloud.express_connect.intranet_tx** <br>(gauge) | 발신 네트워크 트래픽<br>_byte로 표시_ |
| **alibabacloud.express_connect.receive_bandwidth** <br>(rate) | 수신 네트워크 대역폭<br>_bit로 표시_ |
| **alibabacloud.express_connect.transported_bandwidth** <br>(rate) | 발신 네트워크 대역폭<br>_bit로 표시_ |
| **alibabacloud.express_connect.router_interface_response_time.maximum** <br>(gauge) | 지연 시간<br>_millisecond로 표시_ |
| **alibabacloud.express_connect.router_interface_loss_rate.maximum** <br>(gauge) | 패킷 손실률<br>_percent로 표시_ |
| **alibabacloud.express_connect.count** <br>(gauge) | 인스턴스 수<br>_ instance로 표시_ |
| **alibabacloud.express_connect.bytes_out_from_vpc_to_idc** <br>(gauge) | VPC에서 IDC로 나가는 아웃바운드 바이트 수<br>_byte로 표시_ |
| **alibabacloud.express_connect.pkgs_drop_in_from_idc_to_vpc** <br>(rate) | IDC에서 VPC로 들어오는 초당 드롭된 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.express_connect.pkgs_drop_out_from_vpc_to_idc** <br>(rate) | VPC에서 IDC로 나가는 초당 드롭된 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.express_connect.pkgs_in_from_idc_to_vpc** <br>(rate) | IDC에서 VPC로 들어오는 초당 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.express_connect.pkgs_out_from_vpc_to_idc** <br>(rate) | VPC에서 IDC로 나가는 초당 패킷 수<br>_packet으로 표시_ |
| **alibabacloud.express_connect.rate_in_from_idc_to_vpc** <br>(rate) | IDC에서 VPC로 들어오는 초당 비트 수<br>_bit로 표시_ |
| **alibabacloud.express_connect.rate_out_from_vpc_to_idc** <br>(rate) | VPC에서 IDC로 나가는 초당 비트 수<br>_bit로 표시_ |
| **alibabacloud.express_connect.vbr_healthy_check_latency** <br>(gauge) | VBR 지연 시간<br>_millisecond로 표시_ |
| **alibabacloud.express_connect.vbr_healthy_check_loss_rate** <br>(gauge) | VBR 손실률<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_count_1.maximum** <br>(gauge) | 인스턴스 에지 노드 1XX 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_count_2.maximum** <br>(gauge) | 인스턴스 에지 노드 2XX 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_count_3.maximum** <br>(gauge) | 인스턴스 에지 노드 3XX 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_count_4.maximum** <br>(gauge) | 인스턴스 에지 노드 4XX 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_count_400.maximum** <br>(gauge) | 인스턴스 에지 노드 400 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_count_403.maximum** <br>(gauge) | 인스턴스 에지 노드 403 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_count_404.maximum** <br>(gauge) | 인스턴스 에지 노드 404 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_count_416.maximum** <br>(gauge) | 인스턴스 에지 노드 416 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_count_499.maximum** <br>(gauge) | 인스턴스 에지 노드 499 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_count_5.maximum** <br>(gauge) | 인스턴스 에지 노드 5XX 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_count_500.maximum** <br>(gauge) | 인스턴스 에지 노드 500 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_count_502.maximum** <br>(gauge) | 인스턴스 에지 노드 502 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_count_503.maximum** <br>(gauge) | 인스턴스 에지 노드 503 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_count_504.maximum** <br>(gauge) | 인스턴스 에지 노드 504 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_ratio_400.maximum** <br>(gauge) | 전체 인스턴스 에지 노드 대비 400 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_403.maximum** <br>(gauge) | 전체 인스턴스 에지 노드 대비 403 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_404.maximum** <br>(gauge) | 전체 인스턴스 에지 노드 대비 404 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_416.maximum** <br>(gauge) | 전체 인스턴스 에지 노드 대비 416 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_499.maximum** <br>(gauge) | 전체 인스턴스 에지 노드 대비 499 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_500.maximum** <br>(gauge) | 전체 인스턴스 에지 노드 대비 500 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_502.maximum** <br>(gauge) | 전체 인스턴스 에지 노드 대비 502 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_503.maximum** <br>(gauge) | 전체 인스턴스 에지 노드 대비 503 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_504.maximum** <br>(gauge) | 전체 인스턴스 에지 노드 대비 504 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.ori_acc.maximum** <br>(gauge) | 오리진 서버로 전달된 요청 수<br>_ instance로 표시_ |
| **alibabacloud.dcdn.ori_bandwidth.maximum** <br>(rate) | 오리진 스테이션으로의 대역폭<br>_bit로 표시_ |
| **alibabacloud.dcdn.ori_code_count_1.maximum** <br>(gauge) | 오리진 서버로 되돌아간 1XX 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.ori_code_count_2.maximum** <br>(gauge) | 오리진 서버로 되돌아간 2XX 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.ori_code_count_3.maximum** <br>(gauge) | 오리진 서버로 되돌아간 3XX 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.ori_code_count_4.maximum** <br>(gauge) | 오리진 서버로 되돌아간 4XX 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.ori_code_count_400.maximum** <br>(gauge) | 소스 서버로 되돌아간 400 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.ori_code_count_403.maximum** <br>(gauge) | 소스 서버로 되돌아간 403 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.ori_code_count_404.maximum** <br>(gauge) | 소스 서버로 되돌아간 404 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.ori_code_count_416.maximum** <br>(gauge) | 소스 서버로 되돌아간 416 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.ori_code_count_499.maximum** <br>(gauge) | 소스 서버로 되돌아간 499 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.ori_code_count_500.maximum** <br>(gauge) | 소스 서버로 되돌아간 500 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.ori_code_count_502.maximum** <br>(gauge) | 소스 서버로 되돌아간 503 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.ori_code_count_503.maximum** <br>(gauge) | 소스 서버로 되돌아간 503 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.ori_code_count_504.maximum** <br>(gauge) | 소스 서버로 되돌아간 504 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.ori_code_ratio_1.maximum** <br>(gauge) | 소스 서버로 되돌아간 1XX 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.ori_code_ratio_2.maximum** <br>(gauge) | 소스 서버로 되돌아간 2XX 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.ori_code_ratio_3.maximum** <br>(gauge) | 소스 서버로 되돌아간 3XX 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.ori_code_ratio_4.maximum** <br>(gauge) | 소스 서버로 되돌아간 4XX 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.ori_code_ratio_400.maximum** <br>(gauge) | 소스 서버로 되돌아간 400 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.ori_code_ratio_403.maximum** <br>(gauge) | 소스 서버로 되돌아간 403 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.ori_code_ratio_404.maximum** <br>(gauge) | 소스 서버로 되돌아간 404 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.ori_code_ratio_416.maximum** <br>(gauge) | 소스 서버로 되돌아간 416 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.ori_code_ratio_499.maximum** <br>(gauge) | 소스 서버로 되돌아간 499 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.ori_code_ratio_500.maximum** <br>(gauge) | 소스 서버로 되돌아간 500 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.ori_code_ratio_502.maximum** <br>(gauge) | 소스 서버로 되돌아간 502 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.ori_code_ratio_503.maximum** <br>(gauge) | 소스 서버로 되돌아간 503 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.ori_code_ratio_504.maximum** <br>(gauge) | 소스 서버로 되돌아간 504 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.bps_in.maximum** <br>(rate) | 수신 대역폭<br>_bit로 표시_ |
| **alibabacloud.dcdn.bps_in_http.maximum** <br>(rate) | Http 수신 대역폭<br>_bit로 표시_ |
| **alibabacloud.dcdn.bps_in_ws.maximum** <br>(rate) | Websocket 수신 대역폭<br>_bit로 표시_ |
| **alibabacloud.dcdn.bps_out.maximum** <br>(rate) | 발신 대역폭<br>_bit로 표시_ |
| **alibabacloud.dcdn.bps_out_http.maximum** <br>(rate) | Http 발신 대역폭<br>_bit로 표시_ |
| **alibabacloud.dcdn.bps_out_ws.maximum** <br>(rate) | Websocket 발신 대역폭<br>_bit로 표시_ |
| **alibabacloud.dcdn.code_count_499_http.average** <br>(gauge) | Http499 상태 코드 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_count_499_http.minimum** <br>(gauge) | Http499 상태 코드 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_count_499_http.maximum** <br>(gauge) | Http499 상태 코드 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_count_499_ws.average** <br>(gauge) | Websocket499 상태 코드 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_count_499_ws.minimum** <br>(gauge) | Websocket499 상태 코드 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_count_499_ws.maximum** <br>(gauge) | Websocket499 상태 코드 수<br>_instance로 표시_ |
| **alibabacloud.dcdn.code_ratio_1.maximum** <br>(gauge) | 1XX 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_1_http.maximum** <br>(gauge) | Http1XX 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_1_ws.maximum** <br>(gauge) | Websocket1XX 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_2.maximum** <br>(gauge) | 2XX 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_2_http.maximum** <br>(gauge) | Http2XX 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_2_ws.maximum** <br>(gauge) | Websocket2XX 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_3.maximum** <br>(gauge) | 3XX 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_3_http.maximum** <br>(gauge) | Http3XX 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_3_ws.maximum** <br>(gauge) | Websocket3XX 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_4.maximum** <br>(gauge) | 4XX 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_499_http.maximum** <br>(gauge) | Http499 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_499_ws.maximum** <br>(gauge) | Websocket499 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_4_http.maximum** <br>(gauge) | Http4XX 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_4_ws.maximum** <br>(gauge) | Websocket4XX 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_5.maximum** <br>(gauge) | 5XX 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_5_http.maximum** <br>(gauge) | Http5XX 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.code_ratio_5_ws.maximum** <br>(gauge) | Websocket5XX 상태 코드 비율<br>_percent로 표시_ |
| **alibabacloud.dcdn.dcdn_qps.maximum** <br>(rate) | 초당 요청 수<br>_request로 표시_ |
| **alibabacloud.dcdn.dcdn_qps_http.maximum** <br>(rate) | 초당 Http 요청 수<br>_request로 표시_ |
| **alibabacloud.dcdn.dcdn_qps_ws.maximum** <br>(rate) | 초당 Websocket 요청 수<br>_request로 표시_ |
| **alibabacloud.dcdn.hit_rate.maximum** <br>(gauge) | Byte 히트율<br>_percent로 표시_ |
| **alibabacloud.dcdn.hit_rate_http.maximum** <br>(gauge) | Http 히트율<br>_percent로 표시_ |
| **alibabacloud.dcdn.hit_rate_ws.maximum** <br>(gauge) | Websocket 히트율<br>_percent로 표시_ |
| **alibabacloud.dcdn.rt.maximum** <br>(gauge) | 요청 시간<br>_millisecond로 표시_ |
| **alibabacloud.dcdn.rt_http.maximum** <br>(gauge) | Http 요청 시간<br>_millisecond로 표시_ |
| **alibabacloud.dcdn.rt_ws.maximum** <br>(gauge) | Websocket 요청 시간<br>_millisecond로 표시_ |
| **alibaabcloud.dcdn.waf_acl_block_qps.value** <br>(rate) | DCDN WAF 사용자 정의 규칙 초당 차단 비율<br>_instance로 표시_ |
| **alibaabcloud.dcdn.waf_web_block_qps.value** <br>(rate) | DCDN WAF 기본 보호 초당 차단 비율<br>_instance로 표시_ |

### 이벤트

Alibaba Cloud 이벤트는 Alibaba Cloud 서비스 별로 수집됩니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}