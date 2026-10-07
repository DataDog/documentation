---
app_id: amazon-msk
app_uuid: 1d3bab8a-f99a-45ad-b1c6-69e919125029
assets:
  dashboards:
    amazon_msk: assets/dashboards/amazon_msk.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: aws.kafka.zoo_keeper_request_latency_ms_mean
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.kafka.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 235
    source_type_name: Amazon MSK
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 클라우드
- aws
- 로그 수집
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_msk_cloud
integration_id: amazon-msk
integration_title: Amazon MSK
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_msk_cloud
public_title: Amazon MSK
short_description: '스트리밍 데이터를 처리하는 애플리케이션 구축 및 실행을 간소화하세요. '
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::AWS
  - Category::Log Collection
  - Offering::Integration
  - Product::Data Streams Monitoring
  configuration: README.md#Setup
  description: 스트리밍 데이터를 처리하는 애플리케이션 구축 및 실행을 간소화하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-amazon-msk/
  support: README.md#Support
  title: Amazon MSK
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Amazon Managed Streaming for Apache Kafka(MSK)는 전체 관리형 서비스로, Apache Kafka를 이용해 스트리밍 데이터를 처리하는 애플리케이션을 빌드하고 실행하기 쉽게 도와줍니다.

이 통합에서는 CloudWatch에서 수집한 메트릭을 수집하는 크롤러를 사용합니다. Datadog 에이전트로 MSK를 모니터링하는 방법에 관한 자세한 내용을 보려면 [Amazon MSK(에이전트)][1] 페이지를 참고하세요.

## 설정

Datadog에서 CloudWatch에서 수집한 메트릭을 보려면 Amazon MSK 크롤러를 활성화하세요.

### 설치

아직 설정하지 않은 경우 먼저 [Amazon Web Services 통합][2]을 설정하세요. 

### 메트릭 수집

1. [AWS 통합 페이지][3]의 `Metric Collection` 탭에서 `Kafka`가 활성화되어 있는지 확인합니다.

2. [Amazon MSK 통합][4]을 설치하세요.

### 로그 수집

#### 로깅 활성화

S3 버킷이나 CloudWatch로 로그를 전송하도록 Amazon MSK를 구성하세요.

**참고**:
- S3 버킷에 로깅하는 경우 `amazon_msk`가 _Target prefix_로 지정되어야 합니다.
- CloudWatch 로그 그룹에 로깅하는 경우 하위 스트링에 `msk`를 포함해야 합니다.

#### Datadog로 로그 전송

1. 아직 설정하지 않은 경우 [Datadog Forwarder Lambda 함수][5]를 설정하세요.
2. Lambda 함수를 설치한 후 AWS 콘솔에서 Amazon MSK 로그를 포함하는 S3 버킷이나 CloudWatch 로그 그룹에 수동으로 트리거를 추가하세요.

    - [S3 버킷에서 수동 트리거 추가][6]
    - [클라우드와치 로그 그룹에 수동 트리거 추가][7]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_msk_cloud" >}}


### 이벤트

Amazon MSK 크롤러에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Amazon MSK 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/amazon_msk/
[2]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-msk
[5]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_msk_cloud/assets/metrics/metric-spec.yaml
[9]: https://docs.datadoghq.com/ko/help/