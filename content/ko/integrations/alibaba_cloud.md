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

Navigate to the [Datadog-Alibaba Cloud integration configuration tile](https://app.datadoghq.com/integrations/alibaba_cloud) and press _add account_.

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

   {{< img src="integrations/alibaba_cloud/ac_programmatic_access.png" alt="Programmatic access" style="width:40%;">}}

1. After hitting _OK_, copy and paste the `AccessKeyID` and `AccessKeySecret` in the [Datadog-Alibaba Cloud integration tile](https://app.datadoghq.com/integrations/alibaba_cloud) and click _install integration_.

   {{< img src="integrations/alibaba_cloud/ac_access_keys.png" alt="AC access keys" style="width:40%;">}}

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

1. Press _Update_, and after around ~15 minutes, the metrics seen in the _Metrics_ tab of the Datadog-Alibaba Cloud integration tile starts appearing in your [metric explorer page](https://app.datadoghq.com/metric/explorer) tagged with any custom tags you add to your resources and tags found here:

   - [kvstore/redis DescribeInstances](https://www.alibabacloud.com/help/doc-detail/60933.htm)
   - [ECS DescribeInstances](https://www.alibabacloud.com/help/doc-detail/25506.htm)
   - [DescribeDBInstances](https://www.alibabacloud.com/help/doc-detail/26232.htm)
   - [DescribeLoadBalancers](https://www.alibabacloud.com/help/doc-detail/27582.htm)

1. Optional - Set `Optionally Limit Metrics Collection` in your [Datadog-Alibaba Cloud integration tile](https://app.datadoghq.com/integrations/alibaba_cloud). This comma separated list of Alibaba Cloud tags (in the form `<KEY:VALUE>`) defines a filter to use when collecting metrics from Alibaba Cloud. Wildcards such as `?` (for single characters) and `*` (for multiple characters) can be used. Only hosts that match one of the defined labels are imported into Datadog—the rest are ignored. Hosts matching a given label can also be excluded by adding `!` before the label.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **alibabacloud.slb.healthy_server_count.average** <br>(gauge) | Number of healthy backend ECS instances<br>_Shown as instance_ |
| **alibabacloud.slb.healthy_server_count.minimum** <br>(gauge) | Number of healthy backend ECS instances<br>_Shown as instance_ |
| **alibabacloud.slb.healthy_server_count.maximum** <br>(gauge) | Number of healthy backend ECS instances<br>_Shown as instance_ |
| **alibabacloud.slb.unhealthy_server_count.average** <br>(gauge) | Number of faulty backend ECS instances<br>_Shown as instance_ |
| **alibabacloud.slb.unhealthy_server_count.minimum** <br>(gauge) | Number of faulty backend ECS instances<br>_Shown as instance_ |
| **alibabacloud.slb.unhealthy_server_count.maximum** <br>(gauge) | Number of faulty backend ECS instances<br>_Shown as instance_ |
| **alibabacloud.slb.packet_tx.average** <br>(rate) | Number of outgoing packets per second on the port<br>_Shown as packet_ |
| **alibabacloud.slb.packet_tx.minimum** <br>(rate) | Number of outgoing packets per second on the port<br>_Shown as packet_ |
| **alibabacloud.slb.packet_tx.maximum** <br>(rate) | Number of outgoing packets per second on the port<br>_Shown as packet_ |
| **alibabacloud.slb.packet_rx.average** <br>(rate) | Number of incoming packets per second on the port<br>_Shown as packet_ |
| **alibabacloud.slb.packet_rx.minimum** <br>(rate) | Number of incoming packets per second on the port<br>_Shown as packet_ |
| **alibabacloud.slb.packet_rx.maximum** <br>(rate) | Number of incoming packets per second on the port<br>_Shown as packet_ |
| **alibabacloud.slb.traffic_rx_new.average** <br>(rate) | Inbound data volume per second on the port<br>_Shown as bit_ |
| **alibabacloud.slb.traffic_rx_new.minimum** <br>(rate) | Inbound data volume per second on the port<br>_Shown as bit_ |
| **alibabacloud.slb.traffic_rx_new.maximum** <br>(rate) | Inbound data volume per second on the port<br>_Shown as bit_ |
| **alibabacloud.slb.traffic_tx_new.average** <br>(rate) | Outbound data volume per second on the port<br>_Shown as bit_ |
| **alibabacloud.slb.traffic_tx_new.minimum** <br>(rate) | Outbound data volume per second on the port<br>_Shown as bit_ |
| **alibabacloud.slb.traffic_tx_new.maximum** <br>(rate) | Outbound data volume per second on the port<br>_Shown as bit_ |
| **alibabacloud.slb.active_connection.average** <br>(gauge) | Number of active connections on the port, that is, the number of connections that clients set up to access Server Load Balancer<br>_Shown as connection_ |
| **alibabacloud.slb.active_connection.minimum** <br>(gauge) | Number of active connections on the port, that is, the number of connections that clients set up to access Server Load Balancer<br>_Shown as connection_ |
| **alibabacloud.slb.active_connection.maximum** <br>(gauge) | Number of active connections on the port, that is, the number of connections that clients set up to access Server Load Balancer<br>_Shown as connection_ |
| **alibabacloud.slb.inactive_connection.average** <br>(gauge) | Number of inactive connections on the port, that is, the number of connections that are idle after access to Server Load Balancer<br>_Shown as connection_ |
| **alibabacloud.slb.inactive_connection.minimum** <br>(gauge) | Number of inactive connections on the port, that is, the number of connections that are idle after access to Server Load Balancer<br>_Shown as connection_ |
| **alibabacloud.slb.inactive_connection.maximum** <br>(gauge) | Number of inactive connections on the port, that is, the number of connections that are idle after access to Server Load Balancer<br>_Shown as connection_ |
| **alibabacloud.slb.new_connection.average** <br>(gauge) | Current number of new connections on the port<br>_Shown as connection_ |
| **alibabacloud.slb.new_connection.minimum** <br>(gauge) | Current number of new connections on the port<br>_Shown as connection_ |
| **alibabacloud.slb.new_connection.maximum** <br>(gauge) | Current number of new connections on the port<br>_Shown as connection_ |
| **alibabacloud.slb.max_connection.average** <br>(gauge) | Number of concurrent connections on the port<br>_Shown as connection_ |
| **alibabacloud.slb.max_connection.minimum** <br>(gauge) | Number of concurrent connections on the port<br>_Shown as connection_ |
| **alibabacloud.slb.max_connection.maximum** <br>(gauge) | Number of concurrent connections on the port<br>_Shown as connection_ |
| **alibabacloud.slb.drop_connection.average** <br>(rate) | Number of dropped connections per second during monitoring<br>_Shown as connection_ |
| **alibabacloud.slb.drop_connection.minimum** <br>(rate) | Number of dropped connections per second during monitoring<br>_Shown as connection_ |
| **alibabacloud.slb.drop_connection.maximum** <br>(rate) | Number of dropped connections per second during monitoring<br>_Shown as connection_ |
| **alibabacloud.slb.drop_packet_rx.average** <br>(rate) | Number of dropped incoming packets per second during monitoring<br>_Shown as packet_ |
| **alibabacloud.slb.drop_packet_rx.minimum** <br>(rate) | Number of dropped incoming packets per second during monitoring<br>_Shown as packet_ |
| **alibabacloud.slb.drop_packet_rx.maximum** <br>(rate) | Number of dropped incoming packets per second during monitoring<br>_Shown as packet_ |
| **alibabacloud.slb.drop_packet_tx.average** <br>(rate) | Number of dropped outgoing packets per second during monitoring<br>_Shown as packet_ |
| **alibabacloud.slb.drop_packet_tx.minimum** <br>(rate) | Number of dropped outgoing packets per second during monitoring<br>_Shown as packet_ |
| **alibabacloud.slb.drop_packet_tx.maximum** <br>(rate) | Number of dropped outgoing packets per second during monitoring<br>_Shown as packet_ |
| **alibabacloud.slb.drop_traffic_rx.average** <br>(rate) | Number of dropped incoming bits per second during monitoring<br>_Shown as bit_ |
| **alibabacloud.slb.drop_traffic_rx.minimum** <br>(rate) | Number of dropped incoming bits per second during monitoring<br>_Shown as bit_ |
| **alibabacloud.slb.drop_traffic_rx.maximum** <br>(rate) | Number of dropped incoming bits per second during monitoring<br>_Shown as bit_ |
| **alibabacloud.slb.instance_active_connection.average** <br>(rate) | Number of active connections per second on the instance<br>_Shown as connection_ |
| **alibabacloud.slb.instance_active_connection.minimum** <br>(rate) | Number of active connections per second on the instance<br>_Shown as connection_ |
| **alibabacloud.slb.instance_active_connection.maximum** <br>(rate) | Number of active connections per second on the instance<br>_Shown as connection_ |
| **alibabacloud.slb.instance_drop_connection.average** <br>(rate) | Number of dropped connections per second on the instance<br>_Shown as connection_ |
| **alibabacloud.slb.instance_drop_connection.minimum** <br>(rate) | Number of dropped connections per second on the instance<br>_Shown as connection_ |
| **alibabacloud.slb.instance_drop_connection.maximum** <br>(rate) | Number of dropped connections per second on the instance<br>_Shown as connection_ |
| **alibabacloud.slb.instance_drop_packet_rx.average** <br>(rate) | Number of dropped incoming packets per second on the instance<br>_Shown as packet_ |
| **alibabacloud.slb.instance_drop_packet_rx.minimum** <br>(rate) | Number of dropped incoming packets per second on the instance<br>_Shown as packet_ |
| **alibabacloud.slb.instance_drop_packet_rx.maximum** <br>(rate) | Number of dropped incoming packets per second on the instance<br>_Shown as packet_ |
| **alibabacloud.slb.instance_drop_packet_tx.average** <br>(rate) | Number of dropped outgoing packets per second on the instance<br>_Shown as packet_ |
| **alibabacloud.slb.instance_drop_packet_tx.minimum** <br>(rate) | Number of dropped outgoing packets per second on the instance<br>_Shown as packet_ |
| **alibabacloud.slb.instance_drop_packet_tx.maximum** <br>(rate) | Number of dropped outgoing packets per second on the instance<br>_Shown as packet_ |
| **alibabacloud.slb.instance_drop_traffic_rx.average** <br>(rate) | Number of dropped incoming bits per second on the instance<br>_Shown as bit_ |
| **alibabacloud.slb.instance_drop_traffic_rx.minimum** <br>(rate) | Number of dropped incoming bits per second on the instance<br>_Shown as bit_ |
| **alibabacloud.slb.instance_drop_traffic_rx.maximum** <br>(rate) | Number of dropped incoming bits per second on the instance<br>_Shown as bit_ |
| **alibabacloud.slb.instance_drop_traffic_tx.average** <br>(rate) | Number of dropped outgoing bits per second on the instance<br>_Shown as bit_ |
| **alibabacloud.slb.instance_drop_traffic_tx.minimum** <br>(rate) | Number of dropped outgoing bits per second on the instance<br>_Shown as bit_ |
| **alibabacloud.slb.instance_drop_traffic_tx.maximum** <br>(rate) | Number of dropped outgoing bits per second on the instance<br>_Shown as bit_ |
| **alibabacloud.slb.instance_inactive_connection.average** <br>(rate) | Number of inactive connections per second on the instance<br>_Shown as connection_ |
| **alibabacloud.slb.instance_inactive_connection.minimum** <br>(rate) | Number of inactive connections per second on the instance<br>_Shown as connection_ |
| **alibabacloud.slb.instance_inactive_connection.maximum** <br>(rate) | Number of inactive connections per second on the instance<br>_Shown as connection_ |
| **alibabacloud.slb.instance_max_connection.average** <br>(rate) | Maximum number of concurrent connections per second on the instance<br>_Shown as connection_ |
| **alibabacloud.slb.instance_max_connection.minimum** <br>(rate) | Maximum number of concurrent connections per second on the instance<br>_Shown as connection_ |
| **alibabacloud.slb.instance_max_connection.maximum** <br>(rate) | Maximum number of concurrent connections per second on the instance<br>_Shown as connection_ |
| **alibabacloud.slb.instance_new_connection.average** <br>(rate) | Number of new connections per second on the instance<br>_Shown as connection_ |
| **alibabacloud.slb.instance_new_connection.minimum** <br>(rate) | Number of new connections per second on the instance<br>_Shown as connection_ |
| **alibabacloud.slb.instance_new_connection.maximum** <br>(rate) | Number of new connections per second on the instance<br>_Shown as connection_ |
| **alibabacloud.slb.instance_packet_rx.average** <br>(rate) | Number of incoming packets per second on the instance<br>_Shown as packet_ |
| **alibabacloud.slb.instance_packet_rx.minimum** <br>(rate) | Number of incoming packets per second on the instance<br>_Shown as packet_ |
| **alibabacloud.slb.instance_packet_rx.maximum** <br>(rate) | Number of incoming packets per second on the instance<br>_Shown as packet_ |
| **alibabacloud.slb.instance_packet_tx.average** <br>(rate) | Number of outgoing packets per second on the instance<br>_Shown as packet_ |
| **alibabacloud.slb.instance_packet_tx.minimum** <br>(rate) | Number of outgoing packets per second on the instance<br>_Shown as packet_ |
| **alibabacloud.slb.instance_packet_tx.maximum** <br>(rate) | Number of outgoing packets per second on the instance<br>_Shown as packet_ |
| **alibabacloud.slb.instance_traffic_rx.average** <br>(rate) | Number of incoming bits per second on the instance<br>_Shown as bit_ |
| **alibabacloud.slb.instance_traffic_rx.minimum** <br>(rate) | Number of incoming bits per second on the instance<br>_Shown as bit_ |
| **alibabacloud.slb.instance_traffic_rx.maximum** <br>(rate) | Number of incoming bits per second on the instance<br>_Shown as bit_ |
| **alibabacloud.slb.instance_traffic_tx.average** <br>(rate) | Number of outgoing bits per second on the instance<br>_Shown as bit_ |
| **alibabacloud.slb.instance_traffic_tx.minimum** <br>(rate) | Number of outgoing bits per second on the instance<br>_Shown as bit_ |
| **alibabacloud.slb.instance_traffic_tx.maximum** <br>(rate) | Number of outgoing bits per second on the instance<br>_Shown as bit_ |
| **alibabacloud.slb.qps.average** <br>(rate) | Layer-7 protocol port QPS<br>_Shown as query_ |
| **alibabacloud.slb.rt.average** <br>(gauge) | Layer-7 protocol port RT<br>_Shown as millisecond_ |
| **alibabacloud.slb.status_code2xx.average** <br>(rate) | Layer-7 protocol port status code 2XX|
| **alibabacloud.slb.status_code3xx.average** <br>(rate) | Layer-7 protocol port status code 3XX|
| **alibabacloud.slb.status_code4xx.average** <br>(rate) | Layer-7 protocol port status code 4XX|
| **alibabacloud.slb.status_code5xx.average** <br>(rate) | Layer-7 protocol port status code 5XX|
| **alibabacloud.slb.upstream_code4xx.average** <br>(rate) | Layer-7 protocol port Upstream status code 4xx|
| **alibabacloud.slb.upstream_code5xx.average** <br>(rate) | Layer-7 protocol port Upstream status code 5xx|
| **alibabacloud.slb.upstream_rt.average** <br>(gauge) | Layer-7 protocol port UpstreamRT<br>_Shown as millisecond_ |
| **alibabacloud.slb.instance_qps.average** <br>(rate) | Layer-7 protocol instance QPS<br>_Shown as query_ |
| **alibabacloud.slb.instance_rt.average** <br>(gauge) | Layer-7 protocol instance RT<br>_Shown as millisecond_ |
| **alibabacloud.slb.instance_status_code2xx.average** <br>(rate) | Layer-7 protocol instance status code 2XX|
| **alibabacloud.slb.instance_status_code3xx.average** <br>(rate) | Layer-7 protocol instance status code 3XX|
| **alibabacloud.slb.instance_status_code4xx.average** <br>(rate) | Layer-7 protocol instance status code 4XX|
| **alibabacloud.slb.instance_status_code5xx.average** <br>(rate) | Layer-7 protocol instance status code 5XX|
| **alibabacloud.slb.instance_status_code_other.average** <br>(rate) | Layer-7 protocol instance status code Other|
| **alibabacloud.slb.instance_upstream_code4xx.average** <br>(rate) | Layer-7 protocol instance Upstream status code 4XX|
| **alibabacloud.slb.instance_upstream_code5xx.average** <br>(rate) | Layer-7 protocol instance Upstream status code 5XX|
| **alibabacloud.slb.instance_upstream_rt.average** <br>(gauge) | Layer-7 protocol instance UpstreamRT<br>_Shown as millisecond_ |
| **alibabacloud.ecs.cpu_utilization.average** <br>(gauge) | CPU usage<br>_Shown as percent_ |
| **alibabacloud.ecs.cpu_utilization.minimum** <br>(gauge) | CPU usage<br>_Shown as percent_ |
| **alibabacloud.ecs.cpu_utilization.maximum** <br>(gauge) | CPU usage<br>_Shown as percent_ |
| **alibabacloud.ecs.internet_in_rate.average** <br>(rate) | Inbound public network bandwidth<br>_Shown as bit_ |
| **alibabacloud.ecs.internet_in_rate.minimum** <br>(rate) | Inbound public network bandwidth<br>_Shown as bit_ |
| **alibabacloud.ecs.internet_in_rate.maximum** <br>(rate) | Inbound public network bandwidth<br>_Shown as bit_ |
| **alibabacloud.ecs.intranet_in_rate.average** <br>(rate) | Inbound private network bandwidth<br>_Shown as bit_ |
| **alibabacloud.ecs.intranet_in_rate.minimum** <br>(rate) | Inbound private network bandwidth<br>_Shown as bit_ |
| **alibabacloud.ecs.intranet_in_rate.maximum** <br>(rate) | Inbound private network bandwidth<br>_Shown as bit_ |
| **alibabacloud.ecs.internet_out_rate.average** <br>(rate) | Outbound public network bandwidth<br>_Shown as bit_ |
| **alibabacloud.ecs.internet_out_rate.minimum** <br>(rate) | Outbound public network bandwidth<br>_Shown as bit_ |
| **alibabacloud.ecs.internet_out_rate.maximum** <br>(rate) | Outbound public network bandwidth<br>_Shown as bit_ |
| **alibabacloud.ecs.intranet_out_rate.average** <br>(rate) | Outbound private network bandwidth<br>_Shown as bit_ |
| **alibabacloud.ecs.intranet_out_rate.maximum** <br>(rate) | Outbound private network bandwidth<br>_Shown as bit_ |
| **alibabacloud.ecs.intranet_out_rate.minimum** <br>(rate) | Outbound private network bandwidth<br>_Shown as bit_ |
| **alibabacloud.ecs.internet_out_rate_percent.average** <br>(gauge) | Outbound public network bandwidth usage<br>_Shown as percent_ |
| **alibabacloud.ecs.disk_read_bps.average** <br>(rate) | Total system disk read BPS<br>_Shown as bit_ |
| **alibabacloud.ecs.disk_read_bps.minimum** <br>(rate) | Total system disk read BPS<br>_Shown as bit_ |
| **alibabacloud.ecs.disk_read_bps.maximum** <br>(rate) | Total system disk read BPS<br>_Shown as bit_ |
| **alibabacloud.ecs.disk_write_bps.average** <br>(rate) | Total system disk write BPS<br>_Shown as bit_ |
| **alibabacloud.ecs.disk_write_bps.minimum** <br>(rate) | Total system disk write BPS<br>_Shown as bit_ |
| **alibabacloud.ecs.disk_write_bps.maximum** <br>(rate) | Total system disk write BPS<br>_Shown as bit_ |
| **alibabacloud.ecs.disk_read_iops.average** <br>(rate) | System disk read IOPS<br>_Shown as operation_ |
| **alibabacloud.ecs.disk_read_iops.minimum** <br>(rate) | System disk read IOPS<br>_Shown as operation_ |
| **alibabacloud.ecs.disk_read_iops.maximum** <br>(rate) | System disk read IOPS<br>_Shown as operation_ |
| **alibabacloud.ecs.disk_write_iops.average** <br>(rate) | System disk write IOPS<br>_Shown as operation_ |
| **alibabacloud.ecs.disk_write_iops.minimum** <br>(rate) | System disk write IOPS<br>_Shown as operation_ |
| **alibabacloud.ecs.disk_write_iops.maximum** <br>(rate) | System disk write IOPS<br>_Shown as operation_ |
| **alibabacloud.ecs.vpc_public_ip_internet_in_rate.average** <br>(rate) | VPC - Inbound public network bandwidth<br>_Shown as bit_ |
| **alibabacloud.ecs.vpc_public_ip_internet_in_rate.minimum** <br>(rate) | VPC - Inbound public network bandwidth<br>_Shown as bit_ |
| **alibabacloud.ecs.vpc_public_ip_internet_in_rate.maximum** <br>(rate) | VPC - Inbound public network bandwidth<br>_Shown as bit_ |
| **alibabacloud.ecs.vpc_public_ip_internet_out_rate.average** <br>(rate) | VPC - Outbound public network bandwidth<br>_Shown as bit_ |
| **alibabacloud.ecs.vpc_public_ip_internet_out_rate.minimum** <br>(rate) | VPC - Outbound public network bandwidth<br>_Shown as bit_ |
| **alibabacloud.ecs.vpc_public_ip_internet_out_rate.maximum** <br>(rate) | VPC - Outbound public network bandwidth<br>_Shown as bit_ |
| **alibabacloud.ecs.vpc_public_ip_internet_out_rate_percent.average** <br>(gauge) | VPC - Outbound public network bandwidth usage<br>_Shown as percent_ |
| **alibabacloud.ecs.disk_readbytes.average** <br>(rate) | System agent disk read bytes device<br>_Shown as byte_ |
| **alibabacloud.ecs.disk_readbytes.minimum** <br>(rate) | System agent disk read bytes device<br>_Shown as byte_ |
| **alibabacloud.ecs.disk_readbytes.maximum** <br>(rate) | System agent disk read bytes device<br>_Shown as byte_ |
| **alibabacloud.ecs.disk_readiops.average** <br>(rate) | System agent disk read IOPS<br>_Shown as operation_ |
| **alibabacloud.ecs.disk_readiops.minimum** <br>(rate) | System agent disk read IOPS<br>_Shown as operation_ |
| **alibabacloud.ecs.disk_readiops.maximum** <br>(rate) | System agent disk read IOPS<br>_Shown as operation_ |
| **alibabacloud.ecs.disk_writebytes.average** <br>(rate) | System agent disk write bytes device<br>_Shown as byte_ |
| **alibabacloud.ecs.disk_writebytes.minimum** <br>(rate) | System agent disk write bytes device<br>_Shown as byte_ |
| **alibabacloud.ecs.disk_writebytes.maximum** <br>(rate) | System agent disk write bytes device<br>_Shown as byte_ |
| **alibabacloud.ecs.disk_writeiops.average** <br>(rate) | System agent disk write IOPS<br>_Shown as operation_ |
| **alibabacloud.ecs.disk_writeiops.minimum** <br>(rate) | System agent disk write IOPS<br>_Shown as operation_ |
| **alibabacloud.ecs.disk_writeiops.maximum** <br>(rate) | System agent disk write IOPS<br>_Shown as operation_ |
| **alibabacloud.ecs.diskusage_avail.average** <br>(gauge) | System agent disk usage available<br>_Shown as byte_ |
| **alibabacloud.ecs.diskusage_avail.minimum** <br>(gauge) | System agent disk usage available<br>_Shown as byte_ |
| **alibabacloud.ecs.diskusage_avail.maximum** <br>(gauge) | System agent disk usage available<br>_Shown as byte_ |
| **alibabacloud.ecs.diskusage_free.average** <br>(gauge) | Host disk usage free<br>_Shown as byte_ |
| **alibabacloud.ecs.diskusage_free.minimum** <br>(gauge) | Host disk usage free<br>_Shown as byte_ |
| **alibabacloud.ecs.diskusage_free.maximum** <br>(gauge) | Host disk usage free<br>_Shown as byte_ |
| **alibabacloud.ecs.diskusage_total.average** <br>(gauge) | Host disk usage total<br>_Shown as byte_ |
| **alibabacloud.ecs.diskusage_total.minimum** <br>(gauge) | Host disk usage total<br>_Shown as byte_ |
| **alibabacloud.ecs.diskusage_total.maximum** <br>(gauge) | Host disk usage total<br>_Shown as byte_ |
| **alibabacloud.ecs.diskusage_used.average** <br>(gauge) | Host disk usage used<br>_Shown as byte_ |
| **alibabacloud.ecs.diskusage_used.minimum** <br>(gauge) | Host disk usage used<br>_Shown as byte_ |
| **alibabacloud.ecs.diskusage_used.maximum** <br>(gauge) | Host disk usage used<br>_Shown as byte_ |
| **alibabacloud.ecs.diskusage_utilization.average** <br>(gauge) | Host disk usage utilization<br>_Shown as byte_ |
| **alibabacloud.ecs.diskusage_utilization.minimum** <br>(gauge) | Host disk usage utilization<br>_Shown as byte_ |
| **alibabacloud.ecs.diskusage_utilization.maximum** <br>(gauge) | Host disk usage utilization<br>_Shown as byte_ |
| **alibabacloud.ecs.gpu_decoder_utilization.average** <br>(gauge) | GPU decoder utilization<br>_Shown as percent_ |
| **alibabacloud.ecs.gpu_decoder_utilization.minimum** <br>(gauge) | GPU decoder utilization<br>_Shown as percent_ |
| **alibabacloud.ecs.gpu_decoder_utilization.maximum** <br>(gauge) | GPU decoder utilization<br>_Shown as percent_ |
| **alibabacloud.ecs.gpu_encoder_utilization.average** <br>(gauge) | GPU encoder utilization<br>_Shown as percent_ |
| **alibabacloud.ecs.gpu_encoder_utilization.minimum** <br>(gauge) | GPU encoder utilization<br>_Shown as percent_ |
| **alibabacloud.ecs.gpu_encoder_utilization.maximum** <br>(gauge) | GPU encoder utilization<br>_Shown as percent_ |
| **alibabacloud.ecs.gpu_gpu_temperature.average** <br>(gauge) | GPU temperature<br>_Shown as degree celsius_ |
| **alibabacloud.ecs.gpu_gpu_temperature.minimum** <br>(gauge) | GPU temperature<br>_Shown as degree celsius_ |
| **alibabacloud.ecs.gpu_gpu_temperature.maximum** <br>(gauge) | GPU temperature<br>_Shown as degree celsius_ |
| **alibabacloud.ecs.gpu_gpu_usedutilization.average** <br>(gauge) | GPU used utilization<br>_Shown as percent_ |
| **alibabacloud.ecs.gpu_gpu_usedutilization.minimum** <br>(gauge) | GPU used utilization<br>_Shown as percent_ |
| **alibabacloud.ecs.gpu_gpu_usedutilization.maximum** <br>(gauge) | GPU used utilization<br>_Shown as percent_ |
| **alibabacloud.ecs.gpu_memory_freespace.average** <br>(gauge) | GPU memory free space<br>_Shown as byte_ |
| **alibabacloud.ecs.gpu_memory_freespace.minimum** <br>(gauge) | GPU memory free space<br>_Shown as byte_ |
| **alibabacloud.ecs.gpu_memory_freespace.maximum** <br>(gauge) | GPU memory free space<br>_Shown as byte_ |
| **alibabacloud.ecs.gpu_memory_freeutilization.average** <br>(gauge) | GPU memory free utilization<br>_Shown as percent_ |
| **alibabacloud.ecs.gpu_memory_freeutilization.minimum** <br>(gauge) | GPU memory free utilization<br>_Shown as percent_ |
| **alibabacloud.ecs.gpu_memory_freeutilization.maximum** <br>(gauge) | GPU memory free utilization<br>_Shown as percent_ |
| **alibabacloud.ecs.gpu_memory_usedspace.average** <br>(gauge) | GPU memory used space<br>_Shown as byte_ |
| **alibabacloud.ecs.gpu_memory_usedspace.minimum** <br>(gauge) | GPU memory used space<br>_Shown as byte_ |
| **alibabacloud.ecs.gpu_memory_usedspace.maximum** <br>(gauge) | GPU memory used space<br>_Shown as byte_ |
| **alibabacloud.ecs.gpu_memory_usedutilization.average** <br>(gauge) | GPU memory used utilization<br>_Shown as percent_ |
| **alibabacloud.ecs.gpu_memory_usedutilization.minimum** <br>(gauge) | GPU memory used utilization<br>_Shown as percent_ |
| **alibabacloud.ecs.gpu_memory_usedutilization.maximum** <br>(gauge) | GPU memory used utilization<br>_Shown as percent_ |
| **alibabacloud.ecs.gpu_power_readings_power_draw.average** <br>(gauge) | GPU power readings power draw<br>_Shown as watt_ |
| **alibabacloud.ecs.gpu_power_readings_power_draw.minimum** <br>(gauge) | GPU power readings power draw<br>_Shown as watt_ |
| **alibabacloud.ecs.gpu_power_readings_power_draw.maximum** <br>(gauge) | GPU power readings power draw<br>_Shown as watt_ |
| **alibabacloud.rds.cpu_usage.average** <br>(gauge) | CPU usage<br>_Shown as percent_ |
| **alibabacloud.rds.cpu_usage.minimum** <br>(gauge) | CPU usage<br>_Shown as percent_ |
| **alibabacloud.rds.cpu_usage.maximum** <br>(gauge) | CPU usage<br>_Shown as percent_ |
| **alibabacloud.rds.disk_usage.average** <br>(gauge) | Disk usage<br>_Shown as percent_ |
| **alibabacloud.rds.disk_usage.minimum** <br>(gauge) | Disk usage<br>_Shown as percent_ |
| **alibabacloud.rds.disk_usage.maximum** <br>(gauge) | Disk usage<br>_Shown as percent_ |
| **alibabacloud.rds.iops_usage.average** <br>(gauge) | IOPS usage<br>_Shown as percent_ |
| **alibabacloud.rds.iops_usage.minimum** <br>(gauge) | IOPS usage<br>_Shown as percent_ |
| **alibabacloud.rds.iops_usage.maximum** <br>(gauge) | IOPS usage<br>_Shown as percent_ |
| **alibabacloud.rds.connection_usage.average** <br>(gauge) | Connection usage<br>_Shown as percent_ |
| **alibabacloud.rds.connection_usage.minimum** <br>(gauge) | Connection usage<br>_Shown as percent_ |
| **alibabacloud.rds.connection_usage.maximum** <br>(gauge) | Connection usage<br>_Shown as percent_ |
| **alibabacloud.rds.data_delay.average** <br>(gauge) | Read-only instance latency<br>_Shown as second_ |
| **alibabacloud.rds.data_delay.minimum** <br>(gauge) | Read-only instance latency<br>_Shown as second_ |
| **alibabacloud.rds.data_delay.maximum** <br>(gauge) | Read-only instance latency<br>_Shown as second_ |
| **alibabacloud.rds.memory_usage.average** <br>(gauge) | Memory usage<br>_Shown as percent_ |
| **alibabacloud.rds.memory_usage.minimum** <br>(gauge) | Memory usage<br>_Shown as percent_ |
| **alibabacloud.rds.memory_usage.maximum** <br>(gauge) | Memory usage<br>_Shown as percent_ |
| **alibabacloud.rds.my_sql_network_in_new.average** <br>(rate) | MysqlInbound network traffic per second<br>_Shown as bit_ |
| **alibabacloud.rds.my_sql_network_in_new.minimum** <br>(rate) | MysqlInbound network traffic per second<br>_Shown as bit_ |
| **alibabacloud.rds.my_sql_network_in_new.maximum** <br>(rate) | MysqlInbound network traffic per second<br>_Shown as bit_ |
| **alibabacloud.rds.my_sql_network_out_new.average** <br>(rate) | MysqlOutbound network traffic per second<br>_Shown as bit_ |
| **alibabacloud.rds.my_sql_network_out_new.minimum** <br>(rate) | MysqlOutbound network traffic per second<br>_Shown as bit_ |
| **alibabacloud.rds.my_sql_network_out_new.maximum** <br>(rate) | MysqlOutbound network traffic per second<br>_Shown as bit_ |
| **alibabacloud.rds.sql_server_network_in_new.average** <br>(rate) | SQLServer - inbound network traffic per second<br>_Shown as bit_ |
| **alibabacloud.rds.sql_server_network_out_new.average** <br>(rate) | SQLServer - outbound network traffic per second<br>_Shown as bit_ |
| **alibabacloud.redis.memory_usage.average** <br>(gauge) | Percentage of memory in use<br>_Shown as percent_ |
| **alibabacloud.redis.memory_usage.minimum** <br>(gauge) | Percentage of memory in use<br>_Shown as percent_ |
| **alibabacloud.redis.memory_usage.maximum** <br>(gauge) | Percentage of memory in use<br>_Shown as percent_ |
| **alibabacloud.redis.connection_usage.average** <br>(gauge) | Percentage of connections in use<br>_Shown as percent_ |
| **alibabacloud.redis.connection_usage.minimum** <br>(gauge) | Percentage of connections in use<br>_Shown as percent_ |
| **alibabacloud.redis.connection_usage.maximum** <br>(gauge) | Percentage of connections in use<br>_Shown as percent_ |
| **alibabacloud.redis.intranet_in_ratio.average** <br>(gauge) | Percentage of bandwidth consumed during write operations<br>_Shown as percent_ |
| **alibabacloud.redis.intranet_in_ratio.minimum** <br>(gauge) | Percentage of bandwidth consumed during write operations<br>_Shown as percent_ |
| **alibabacloud.redis.intranet_in_ratio.maximum** <br>(gauge) | Percentage of bandwidth consumed during write operations<br>_Shown as percent_ |
| **alibabacloud.redis.intranet_in.average** <br>(rate) | Write speed<br>_Shown as bit_ |
| **alibabacloud.redis.intranet_in.minimum** <br>(rate) | Write speed<br>_Shown as bit_ |
| **alibabacloud.redis.intranet_in.maximum** <br>(rate) | Write speed<br>_Shown as bit_ |
| **alibabacloud.redis.failed_count.average** <br>(rate) | Number of failed operations on KVSTORE<br>_Shown as operation_ |
| **alibabacloud.redis.failed_count.minimum** <br>(rate) | Number of failed operations on KVSTORE<br>_Shown as operation_ |
| **alibabacloud.redis.failed_count.maximum** <br>(rate) | Number of failed operations on KVSTORE<br>_Shown as operation_ |
| **alibabacloud.redis.cpu_usage.average** <br>(gauge) | CPU usage<br>_Shown as percent_ |
| **alibabacloud.redis.cpu_usage.minimum** <br>(gauge) | CPU usage<br>_Shown as percent_ |
| **alibabacloud.redis.cpu_usage.maximum** <br>(gauge) | CPU usage<br>_Shown as percent_ |
| **alibabacloud.redis.used_memory.average** <br>(gauge) | Memory in use<br>_Shown as byte_ |
| **alibabacloud.redis.used_memory.minimum** <br>(gauge) | Memory in use<br>_Shown as byte_ |
| **alibabacloud.redis.used_memory.maximum** <br>(gauge) | Memory in use<br>_Shown as byte_ |
| **alibabacloud.redis.used_connection.average** <br>(gauge) | Number of used connections<br>_Shown as connection_ |
| **alibabacloud.redis.used_connection.minimum** <br>(gauge) | Number of used connections<br>_Shown as connection_ |
| **alibabacloud.redis.used_connection.maximum** <br>(gauge) | Number of used connections<br>_Shown as connection_ |
| **alibabacloud.cdn.qps.average** <br>(gauge) | Total access requests<br>_Shown as request_ |
| **alibabacloud.cdn.qps.minimum** <br>(gauge) | Total access requests<br>_Shown as request_ |
| **alibabacloud.cdn.qps.maximum** <br>(gauge) | Total access requests<br>_Shown as request_ |
| **alibabacloud.cdn.bps.average** <br>(rate) | Peak bandwidth<br>_Shown as bit_ |
| **alibabacloud.cdn.bps.minimum** <br>(rate) | Peak bandwidth<br>_Shown as bit_ |
| **alibabacloud.cdn.bps.maximum** <br>(rate) | Peak bandwidth<br>_Shown as bit_ |
| **alibabacloud.cdn.hit_rate.average** <br>(gauge) | Bytes hit rate<br>_Shown as percent_ |
| **alibabacloud.cdn.code4xx.average** <br>(gauge) | Percent of 4xx status codes<br>_Shown as percent_ |
| **alibabacloud.cdn.code5xx.average** <br>(gauge) | Percent of 5xx status codes<br>_Shown as percent_ |
| **alibabacloud.cdn.internet_out.sum** <br>(gauge) | Downstream traffic<br>_Shown as byte_ |
| **alibabacloud.cdn.count** <br>(gauge) | Number of instances<br>_Shown as instance_ |
| **alibabacloud.container_service.cluster.cpu.limit** <br>(gauge) | cluster CPU limit<br>_Shown as core_ |
| **alibabacloud.container_service.cluster.cpu.request** <br>(gauge) | cluster CPU request<br>_Shown as core_ |
| **alibabacloud.container_service.cluster.cpu.usage_rate** <br>(gauge) | cluster CPU usage rate<br>_Shown as core_ |
| **alibabacloud.container_service.cluster.cpu.utilization** <br>(gauge) | cluster CPU utilization<br>_Shown as percent_ |
| **alibabacloud.container_service.cluster.memory.limit** <br>(gauge) | cluster memory limit<br>_Shown as byte_ |
| **alibabacloud.container_service.cluster.memory.request** <br>(gauge) | cluster memory request<br>_Shown as byte_ |
| **alibabacloud.container_service.cluster.memory.utilization** <br>(gauge) | cluster memory utilization<br>_Shown as percent_ |
| **alibabacloud.container_service.node.cpu.allocatable** <br>(gauge) | node CPU allocatable<br>_Shown as core_ |
| **alibabacloud.container_service.node.cpu.capacity** <br>(gauge) | node CPU capacity<br>_Shown as core_ |
| **alibabacloud.container_service.node.cpu.limit** <br>(gauge) | node CPU limit<br>_Shown as core_ |
| **alibabacloud.container_service.node.cpu.oversale_rate** <br>(rate) | node CPU oversale rate<br>_Shown as core_ |
| **alibabacloud.container_service.node.cpu.request** <br>(gauge) | node CPU request<br>_Shown as core_ |
| **alibabacloud.container_service.node.cpu.usage_rate** <br>(rate) | node CPU usage rate<br>_Shown as core_ |
| **alibabacloud.container_service.node.cpu.utilization** <br>(gauge) | node CPU utilization<br>_Shown as percent_ |
| **alibabacloud.container_service.node.filesystem.available** <br>(gauge) | node filesystem available<br>_Shown as node_ |
| **alibabacloud.container_service.node.filesystem.inodes** <br>(gauge) | node filesystem inodes<br>_Shown as inode_ |
| **alibabacloud.container_service.node.filesystem.limit** <br>(gauge) | node filesystem limit<br>_Shown as node_ |
| **alibabacloud.container_service.node.filesystem.usage** <br>(gauge) | node filesystem usage<br>_Shown as node_ |
| **alibabacloud.container_service.node.memory.allocatable** <br>(gauge) | node memory allocatable<br>_Shown as byte_ |
| **alibabacloud.container_service.node.memory.cache** <br>(gauge) | node memory cache<br>_Shown as byte_ |
| **alibabacloud.container_service.node.memory.limit** <br>(gauge) | node memory limit<br>_Shown as byte_ |
| **alibabacloud.container_service.node.memory.oversale_rate** <br>(gauge) | node memory oversale rate<br>_Shown as percent_ |
| **alibabacloud.container_service.node.memory.request** <br>(gauge) | node memory request<br>_Shown as byte_ |
| **alibabacloud.container_service.node.memory.usage** <br>(gauge) | node memory usage<br>_Shown as byte_ |
| **alibabacloud.container_service.node.memory.utilization** <br>(gauge) | node memory utilization<br>_Shown as percent_ |
| **alibabacloud.container_service.node.memory.working_set** <br>(gauge) | node memory working set<br>_Shown as byte_ |
| **alibabacloud.container_service.node.network.rx_errors** <br>(gauge) | node network rx errors<br>_Shown as error_ |
| **alibabacloud.container_service.node.network.rx_errors_rate** <br>(rate) | node network rx errors rate<br>_Shown as byte_ |
| **alibabacloud.container_service.node.network.rx_rate** <br>(rate) | node network rx rate<br>_Shown as byte_ |
| **alibabacloud.container_service.node.network.tx_errors_rate** <br>(rate) | node network tx errors rate<br>_Shown as byte_ |
| **alibabacloud.container_service.node.network.tx_rate** <br>(rate) | node network tx rate<br>_Shown as byte_ |
| **alibabacloud.container_service.ns.cpu.limit** <br>(gauge) | ns CPU limit<br>_Shown as core_ |
| **alibabacloud.container_service.pod.cpu.limit** <br>(gauge) | pod CPU limit<br>_Shown as core_ |
| **alibabacloud.container_service.pod.cpu.oversale_rate** <br>(gauge) | pod CPU oversale rate<br>_Shown as percent_ |
| **alibabacloud.container_service.pod.cpu.request** <br>(gauge) | pod CPU request<br>_Shown as core_ |
| **alibabacloud.container_service.pod.cpu.usage_rate** <br>(rate) | pod CPU usage rate<br>_Shown as core_ |
| **alibabacloud.container_service.pod.cpu.utilization** <br>(gauge) | pod CPU utilization<br>_Shown as percent_ |
| **alibabacloud.container_service.pod.memory.cache** <br>(gauge) | pod memory cache<br>_Shown as byte_ |
| **alibabacloud.container_service.pod.memory.limit** <br>(gauge) | pod memory limit<br>_Shown as byte_ |
| **alibabacloud.container_service.pod.memory.oversale_rate** <br>(gauge) | pod memory oversale rate<br>_Shown as percent_ |
| **alibabacloud.container_service.pod.memory.request** <br>(gauge) | pod memory request<br>_Shown as byte_ |
| **alibabacloud.container_service.pod.memory.rss** <br>(gauge) | pod memory rss<br>_Shown as byte_ |
| **alibabacloud.container_service.pod.memory.utilization** <br>(gauge) | pod memory utilization<br>_Shown as percent_ |
| **alibabacloud.container_service.pod.memory.working_set** <br>(gauge) | pod memory working set<br>_Shown as byte_ |
| **alibabacloud.container_service.pod.network.rx_errors_rate** <br>(rate) | pod network rx errors rate<br>_Shown as byte_ |
| **alibabacloud.container_service.pod.network.rx_rate** <br>(rate) | pod network rx rate<br>_Shown as byte_ |
| **alibabacloud.container_service.pod.network.tx_errors_rate** <br>(rate) | pod network tx errors rate<br>_Shown as byte_ |
| **alibabacloud.container_service.pod.network.tx_rate** <br>(rate) | pod network tx rate<br>_Shown as byte_ |
| **alibabacloud.container_service.deployment.filesystem.available** <br>(gauge) | deployment filesystem available<br>_Shown as byte_ |
| **alibabacloud.container_service.deployment.filesystem.limit** <br>(gauge) | deployment filesystem limit<br>_Shown as byte_ |
| **alibabacloud.container_service.pod.filesystem.available** <br>(gauge) | pod filesystem available<br>_Shown as byte_ |
| **alibabacloud.container_service.pod.filesystem.limit** <br>(gauge) | pod filesystem limit<br>_Shown as byte_ |
| **alibabacloud.container_service.cluster.filesystem.available** <br>(gauge) | cluster filesystem available<br>_Shown as byte_ |
| **alibabacloud.container_service.cluster.filesystem.limit** <br>(gauge) | cluster filesystem limit<br>_Shown as byte_ |
| **alibabacloud.container_service.count** <br>(gauge) | Number of clusters<br>_Shown as instance_ |
| **alibabacloud.container_service.number_of_nodes** <br>(gauge) | Number of nodes<br>_Shown as node_ |
| **alibabacloud.express_connect.intranet_rx** <br>(gauge) | Inbound network traffic<br>_Shown as byte_ |
| **alibabacloud.express_connect.intranet_tx** <br>(gauge) | Outbound network traffic<br>_Shown as byte_ |
| **alibabacloud.express_connect.receive_bandwidth** <br>(rate) | Inbound network bandwidth<br>_Shown as bit_ |
| **alibabacloud.express_connect.transported_bandwidth** <br>(rate) | Outbound network bandwidth<br>_Shown as bit_ |
| **alibabacloud.express_connect.router_interface_response_time.maximum** <br>(gauge) | Latency<br>_Shown as millisecond_ |
| **alibabacloud.express_connect.router_interface_loss_rate.maximum** <br>(gauge) | The percentage of the packet loss rate<br>_Shown as percent_ |
| **alibabacloud.express_connect.count** <br>(gauge) | Number of instances<br>_Shown as instance_ |
| **alibabacloud.express_connect.bytes_out_from_vpc_to_idc** <br>(gauge) | Number of outbound bytes from VPC to IDC<br>_Shown as byte_ |
| **alibabacloud.express_connect.pkgs_drop_in_from_idc_to_vpc** <br>(rate) | Number of dropped incoming packets per second from IDC to VPC<br>_Shown as packet_ |
| **alibabacloud.express_connect.pkgs_drop_out_from_vpc_to_idc** <br>(rate) | Number of dropped outgoing packets per second from VPC to IDC<br>_Shown as packet_ |
| **alibabacloud.express_connect.pkgs_in_from_idc_to_vpc** <br>(rate) | Number of incoming packets per second from IDC to VPC<br>_Shown as packet_ |
| **alibabacloud.express_connect.pkgs_out_from_vpc_to_idc** <br>(rate) | Number of outgoing packets per second from VPC to IDC<br>_Shown as packet_ |
| **alibabacloud.express_connect.rate_in_from_idc_to_vpc** <br>(rate) | Number of incoming bits per second from IDC to VPC<br>_Shown as bit_ |
| **alibabacloud.express_connect.rate_out_from_vpc_to_idc** <br>(rate) | Number of outgoing bits per second from VPC to IDC<br>_Shown as bit_ |
| **alibabacloud.express_connect.vbr_healthy_check_latency** <br>(gauge) | VBR latency<br>_Shown as microsecond_ |
| **alibabacloud.express_connect.vbr_healthy_check_loss_rate** <br>(gauge) | VBR loss rate<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_count_1.maximum** <br>(gauge) | Number of instance edge nodes 1XX<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_count_2.maximum** <br>(gauge) | Number of instance edge nodes 2XX<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_count_3.maximum** <br>(gauge) | Number of instance edge nodes 3XX<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_count_4.maximum** <br>(gauge) | Number of instance edge nodes 4XX<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_count_400.maximum** <br>(gauge) | Number of instance edge nodes 400<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_count_403.maximum** <br>(gauge) | Number of instance edge nodes 403<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_count_404.maximum** <br>(gauge) | Number of instance edge nodes 404<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_count_416.maximum** <br>(gauge) | Number of instance edge nodes 416<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_count_499.maximum** <br>(gauge) | Number of instance edge nodes 499<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_count_5.maximum** <br>(gauge) | Number of instance edge nodes 5XX<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_count_500.maximum** <br>(gauge) | Number of instance edge nodes 500<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_count_502.maximum** <br>(gauge) | Number of instance edge nodes 502<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_count_503.maximum** <br>(gauge) | Number of instance edge nodes 503<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_count_504.maximum** <br>(gauge) | Number of instance edge nodes 504<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_ratio_400.maximum** <br>(gauge) | Ratio of instance edge nodes to 400<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_403.maximum** <br>(gauge) | Ratio of instance edge nodes to 403<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_404.maximum** <br>(gauge) | Ratio of instance edge nodes to 404<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_416.maximum** <br>(gauge) | Ratio of instance edge nodes to 416<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_499.maximum** <br>(gauge) | Ratio of instance edge nodes to 499<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_500.maximum** <br>(gauge) | Ratio of instance edge nodes to 500<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_502.maximum** <br>(gauge) | Ratio of instance edge nodes to 502<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_503.maximum** <br>(gauge) | Ratio of instance edge nodes to 503<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_504.maximum** <br>(gauge) | Ratio of instance edge nodes to 504<br>_Shown as percent_ |
| **alibabacloud.dcdn.ori_acc.maximum** <br>(gauge) | Number of requests back to the origin server<br>_Shown as instance_ |
| **alibabacloud.dcdn.ori_bandwidth.maximum** <br>(rate) | Bandwidth back to the origin station<br>_Shown as bit_ |
| **alibabacloud.dcdn.ori_code_count_1.maximum** <br>(gauge) | Number of back-to-origin 1XX<br>_Shown as instance_ |
| **alibabacloud.dcdn.ori_code_count_2.maximum** <br>(gauge) | Number of back-to-origin 2XX<br>_Shown as instance_ |
| **alibabacloud.dcdn.ori_code_count_3.maximum** <br>(gauge) | Number of back-to-origin 3XX<br>_Shown as instance_ |
| **alibabacloud.dcdn.ori_code_count_4.maximum** <br>(gauge) | Number of back-to-origin 4XX<br>_Shown as instance_ |
| **alibabacloud.dcdn.ori_code_count_400.maximum** <br>(gauge) | Number of back-to-source 400<br>_Shown as instance_ |
| **alibabacloud.dcdn.ori_code_count_403.maximum** <br>(gauge) | Number of back-to-source 403<br>_Shown as instance_ |
| **alibabacloud.dcdn.ori_code_count_404.maximum** <br>(gauge) | Number of back-to-source 404<br>_Shown as instance_ |
| **alibabacloud.dcdn.ori_code_count_416.maximum** <br>(gauge) | Number of back-to-source 416<br>_Shown as instance_ |
| **alibabacloud.dcdn.ori_code_count_499.maximum** <br>(gauge) | Number of back-to-source 499<br>_Shown as instance_ |
| **alibabacloud.dcdn.ori_code_count_500.maximum** <br>(gauge) | Number of back-to-source 500<br>_Shown as instance_ |
| **alibabacloud.dcdn.ori_code_count_502.maximum** <br>(gauge) | Number of back-to-source 503<br>_Shown as instance_ |
| **alibabacloud.dcdn.ori_code_count_503.maximum** <br>(gauge) | Number of back-to-source 503<br>_Shown as instance_ |
| **alibabacloud.dcdn.ori_code_count_504.maximum** <br>(gauge) | Number of back-to-source 504<br>_Shown as instance_ |
| **alibabacloud.dcdn.ori_code_ratio_1.maximum** <br>(gauge) | Proportion of 1XX back-to-source<br>_Shown as percent_ |
| **alibabacloud.dcdn.ori_code_ratio_2.maximum** <br>(gauge) | Proportion of 2XX back-to-source<br>_Shown as percent_ |
| **alibabacloud.dcdn.ori_code_ratio_3.maximum** <br>(gauge) | Proportion of 3XX back-to-source<br>_Shown as percent_ |
| **alibabacloud.dcdn.ori_code_ratio_4.maximum** <br>(gauge) | Proportion of 4XX back-to-source<br>_Shown as percent_ |
| **alibabacloud.dcdn.ori_code_ratio_400.maximum** <br>(gauge) | Proportion of 400 back-to-source<br>_Shown as percent_ |
| **alibabacloud.dcdn.ori_code_ratio_403.maximum** <br>(gauge) | Proportion of 403 back-to-source<br>_Shown as percent_ |
| **alibabacloud.dcdn.ori_code_ratio_404.maximum** <br>(gauge) | Proportion of 404 back-to-source<br>_Shown as percent_ |
| **alibabacloud.dcdn.ori_code_ratio_416.maximum** <br>(gauge) | Proportion of 416 back-to-source<br>_Shown as percent_ |
| **alibabacloud.dcdn.ori_code_ratio_499.maximum** <br>(gauge) | Proportion of 499 back-to-source<br>_Shown as percent_ |
| **alibabacloud.dcdn.ori_code_ratio_500.maximum** <br>(gauge) | Proportion of 500 back-to-source<br>_Shown as percent_ |
| **alibabacloud.dcdn.ori_code_ratio_502.maximum** <br>(gauge) | Proportion of 502 back-to-source<br>_Shown as percent_ |
| **alibabacloud.dcdn.ori_code_ratio_503.maximum** <br>(gauge) | Proportion of 503 back-to-source<br>_Shown as percent_ |
| **alibabacloud.dcdn.ori_code_ratio_504.maximum** <br>(gauge) | Proportion of 504 back-to-source<br>_Shown as percent_ |
| **alibabacloud.dcdn.bps_in.maximum** <br>(rate) | Inbound bandwidth<br>_Shown as bit_ |
| **alibabacloud.dcdn.bps_in_http.maximum** <br>(rate) | Http inbound bandwidth<br>_Shown as bit_ |
| **alibabacloud.dcdn.bps_in_ws.maximum** <br>(rate) | Websocket inbound bandwidth<br>_Shown as bit_ |
| **alibabacloud.dcdn.bps_out.maximum** <br>(rate) | Outbound bandwidth<br>_Shown as bit_ |
| **alibabacloud.dcdn.bps_out_http.maximum** <br>(rate) | Http outbound bandwidth<br>_Shown as bit_ |
| **alibabacloud.dcdn.bps_out_ws.maximum** <br>(rate) | Websocket outbound bandwidth<br>_Shown as bit_ |
| **alibabacloud.dcdn.code_count_499_http.average** <br>(gauge) | Number of Http499 status codes<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_count_499_http.minimum** <br>(gauge) | Number of Http499 status codes<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_count_499_http.maximum** <br>(gauge) | Number of Http499 status codes<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_count_499_ws.average** <br>(gauge) | Number of Websocket499 status codes<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_count_499_ws.minimum** <br>(gauge) | Number of Websocket499 status codes<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_count_499_ws.maximum** <br>(gauge) | Number of Websocket499 status codes<br>_Shown as instance_ |
| **alibabacloud.dcdn.code_ratio_1.maximum** <br>(gauge) | 1XX status code ratio<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_1_http.maximum** <br>(gauge) | Http1XX status code ratio<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_1_ws.maximum** <br>(gauge) | Websocket1XX status code ratio<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_2.maximum** <br>(gauge) | 2XX status code ratio<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_2_http.maximum** <br>(gauge) | Http2XX status code ratio<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_2_ws.maximum** <br>(gauge) | Websocket2XX status code ratio<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_3.maximum** <br>(gauge) | 3XX status code ratio<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_3_http.maximum** <br>(gauge) | Http3XX status code ratio<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_3_ws.maximum** <br>(gauge) | Websocket3XX status code ratio<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_4.maximum** <br>(gauge) | 4XX status code ratio<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_499_http.maximum** <br>(gauge) | Http499 status code ratio<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_499_ws.maximum** <br>(gauge) | Websocket499 status code ratio<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_4_http.maximum** <br>(gauge) | Http4XX status code ratio<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_4_ws.maximum** <br>(gauge) | Websocket4XX status code ratio<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_5.maximum** <br>(gauge) | 5XX status code ratio<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_5_http.maximum** <br>(gauge) | Http5XX status code ratio<br>_Shown as percent_ |
| **alibabacloud.dcdn.code_ratio_5_ws.maximum** <br>(gauge) | Websocket5XX status code ratio<br>_Shown as percent_ |
| **alibabacloud.dcdn.dcdn_qps.maximum** <br>(rate) | Requests per second<br>_Shown as request_ |
| **alibabacloud.dcdn.dcdn_qps_http.maximum** <br>(rate) | Http requests per second<br>_Shown as request_ |
| **alibabacloud.dcdn.dcdn_qps_ws.maximum** <br>(rate) | Websocket requests per second<br>_Shown as request_ |
| **alibabacloud.dcdn.hit_rate.maximum** <br>(gauge) | Byte hit rate<br>_Shown as percent_ |
| **alibabacloud.dcdn.hit_rate_http.maximum** <br>(gauge) | Http hit rate<br>_Shown as percent_ |
| **alibabacloud.dcdn.hit_rate_ws.maximum** <br>(gauge) | Websocket hit rate<br>_Shown as percent_ |
| **alibabacloud.dcdn.rt.maximum** <br>(gauge) | Request time<br>_Shown as millisecond_ |
| **alibabacloud.dcdn.rt_http.maximum** <br>(gauge) | Http request time<br>_Shown as millisecond_ |
| **alibabacloud.dcdn.rt_ws.maximum** <br>(gauge) | Websocket request time<br>_Shown as millisecond_ |
| **alibaabcloud.dcdn.waf_acl_block_qps.value** <br>(rate) | DCDN WAF custom rule interception rate per second<br>_Shown as instance_ |
| **alibaabcloud.dcdn.waf_web_block_qps.value** <br>(rate) | DCDN WAF basic protection interception rate per second<br>_Shown as instance_ |

### 이벤트

Alibaba Cloud 이벤트는 Alibaba Cloud 서비스 별로 수집됩니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}