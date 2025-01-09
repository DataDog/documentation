---
categories:
- cloud
- aws
- 로그 수집
dependencies: []
description: 핵심 Amazon Connect 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_connect/
draft: false
git_integration_title: amazon_connect
has_logo: true
integration_id: ''
integration_title: Amazon Connect
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_connect
public_title: Datadog-Amazon Connect 통합
short_description: 핵심 Amazon Connect 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon Connect는 자체 서비스 설정을 제공하여 역동적이고 개인적이며 자연스러운 고객 참여를 활성화합니다.

이 통합을 활성화하면 Datadog에서 모든 Connect 메트릭을 볼 수 있습니다.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Connect`가 `Metric Collection` 탭에서 활성화되어 있는지 확인하세요.
2. [Datadog - Amazon Connect 통합][3]을 설치합니다.

### 로그 수집

#### 로깅 활성화

Amazon Connect를 설정해 S3 버킷이나 클라우드와치(CloudWatch)로 로그를 전송합니다.

**참고**: S3 버킷에 기록하면 `amazon_connect`를 _대상 접두어_로 설정합니다.

#### Datadog에 로그 전송

1. 이미 하지 않은 경우 [Datadog 포워더 람다 함수][4]를 설정하세요.
2. 람다 함수가 설치되면 AWS  콘솔에서 Amazon Connect 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 수동 트리거를 추가합니다.

    - [S3 버킷에서 직접 트리거 추가][5]
    - [클라우드와치(CloudWatch) 로그 그룹에 수동 트리거 추가][6]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_connect" >}}


### 이벤트

Amazon Connect 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon Connect 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-connect
[4]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_connect/amazon_connect_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/