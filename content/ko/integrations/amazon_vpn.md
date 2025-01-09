---
categories:
- aws
- cloud
- 로그 수집
- 네트워크
dependencies: []
description: AWS VPN 핵심 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_vpn/
draft: false
git_integration_title: amazon_vpn
has_logo: true
integration_id: ''
integration_title: AWS VPN
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_vpn
public_title: Datadog-AWS VPN 통합
short_description: AWS VPN 핵심 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS VPN으로 네트워크 또는 장치와 AWS 글로벌 네트워크를 연결하는 안전한 비공개 터널을 설정할 수 있습니다.

본 통합 기능을 활성화하면 Datadog에서 모든 VPN 메트릭을 확인할 수 있습니다.

## 설정

### 설치

아직 설정하지 않은 경우, 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭의 `VPN`이 활성화되어 있는지 확인합니다.
2. [Datadog - AWS VPN 통합][3]을 설치합니다.

### 로그 수집

#### 로깅 활성화

AWS VPN을 설정하여 S3 버킷 또는 클라우드와치(CloudWatch)에 로그를 전송합니다.

**참고**: S3 버킷으로 로그를 전송하려면 _Target prefix_(대상 접두사)를 `amazon_vpn`로 설정합니다.

#### Datadog에 로그 전송

1. 아직 설정하지 않은 경우 [Datadog Forwarder Lambda 함수][4]를 설정하세요.
2. Lambda 함수를 설치한 후 AWS 콘솔에서 AWS VPN 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 트리거를 수동으로 추가합니다.

    - [S3 버킷에서 직접 트리거 추가][5]
    - [클라우드와치(CloudWatch) 로그 그룹에 수동 트리거 추가][6]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_vpn" >}}


### 이벤트

AWS VPN 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

AWS VPN 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-vpn
[4]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_vpn/amazon_vpn_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/