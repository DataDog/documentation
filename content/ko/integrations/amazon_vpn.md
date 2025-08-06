---
app_id: amazon_vpn
categories:
- aws
- 클라우드
- 로그 수집
- 네트워크
custom_kind: 통합
description: AWS VPN 핵심 메트릭을 추적하세요.
title: AWS VPN
---
## 개요

AWS VPN으로 네트워크 또는 장치와 AWS 글로벌 네트워크를 연결하는 안전한 비공개 터널을 설정할 수 있습니다.

본 통합 기능을 활성화하면 Datadog에서 모든 VPN 메트릭을 확인할 수 있습니다.

## 설정

### 설치

If you haven't already, set up the [Amazon Web Services integration](https://docs.datadoghq.com/integrations/amazon_web_services/) first.

### 메트릭 수집

1. In the [AWS integration page](https://app.datadoghq.com/integrations/amazon-web-services), ensure that `VPN` is enabled under the `Metric Collection` tab.
1. Install the [Datadog - AWS VPN integration](https://app.datadoghq.com/integrations/amazon-vpn).

### 로그 수집

#### 로깅 활성화

AWS VPN을 설정하여 S3 버킷 또는 클라우드와치(CloudWatch)에 로그를 전송합니다.

**참고**: S3 버킷으로 로그를 전송하려면 _Target prefix_(대상 접두사)를 `amazon_vpn`로 설정합니다.

#### Datadog로 로그 전송

1. If you haven’t already, set up the [Datadog Forwarder Lambda function](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Lambda 함수를 설치한 후 AWS 콘솔에서 AWS VPN 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 트리거를 수동으로 추가합니다.

   - [Add a manual trigger on the S3 bucket](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Add a manual trigger on the CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **aws.vpn.tunnel_data_in** <br>(count) | The average number of bytes that have come in through the VPN tunnel<br>_Shown as byte_ |
| **aws.vpn.tunnel_data_in.sum** <br>(count) | The total number of bytes that have come in through the VPN tunnel<br>_Shown as byte_ |
| **aws.vpn.tunnel_data_out** <br>(count) | The average number of bytes that have gone out through the VPN tunnel<br>_Shown as byte_ |
| **aws.vpn.tunnel_data_out.sum** <br>(count) | The total number of bytes that have gone out through the VPN tunnel<br>_Shown as byte_ |
| **aws.vpn.tunnel_state** <br>(gauge) | This metric is 1 when all tunnels for the VPN are up, and 0 when all tunnels are down. Values between 0 and 1 indicate some tunnels for the VPN are up.|
| **aws.vpn.tunnel_state.maximum** <br>(gauge) | This metric is 1 when any tunnel for the VPN is up, and 0 when all tunnels are down.|
| **aws.vpn.tunnel_state.minimum** <br>(gauge) | This metric is 1 when all tunnels for the VPN are up, and 0 when any tunnel is down.|

### 이벤트

AWS VPN 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

AWS VPN 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.