---
app_id: amazon-cognito
app_uuid: a59d323b-9971-4420-99f5-05fdbba90d54
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: aws.cognito.compromised_credential_risk
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.cognito.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 240
    source_type_name: Amazon Cognito
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- 클라우드
- 로그 수집
- 모바일
custom_kind: 통합
dependencies: []
description: 핵심 Amazon Cognito 메트릭을 추적하세요.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_cognito/
draft: false
git_integration_title: amazon_cognito
has_logo: true
integration_id: amazon-cognito
integration_title: Amazon Cognito
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_cognito
public_title: Amazon Cognito
short_description: Create unique user identities, authenticate with providers, and
  store data in the Cloud.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Cloud
  - Category::Log Collection
  - Category::Mobile
  - Offering::Integration
  configuration: README.md#Setup
  description: Create unique user identities, authenticate with providers, and store
    data in the Cloud.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon Cognito
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Amazon Cognito는 사용자에 대한 고유한 ID를 생성하고, ID 공급자와 이를 확인하고 AWS 클라우드에서 모바일 사용자 데이터를 저장하는 데 사용할 수 있는 서비스입니다.

이러한 통합을 활성화하여 Datadog에서 Cognito Advanced Security 메트릭을 참조하세요.

## 설정

### 설치

아직 설정하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Cognito`가 `Metric Collection` 탭에서 활성화되어 있는지 확인하세요.
2. [Datadog - Amazon Cognito 통합][3]을 설치합니다.

**참고**: 고급 보안이 AWS에서 활성화되어 있어야 합니다. AWS 설명서를 참조하여 [사용자 풀에 고급 보안][4]을 추가하세요.

### 로그 수집

#### 로깅 활성화

Amazon Cognito를 설정해 S3 버킷이나 클라우드와치(CloudWatch)로 로그를 전송합니다.

**참고**: 사용자 풀 로그만 전송됩니다. Amazon은 기타 Cognito 로그 전송을 지원하지 않습니다.

**참고**: S3 버킷에 기록하면 `amazon_cognito`를 _대상 접두어_로 설정합니다.

#### Datadog로 로그 전송

1. 아직 설정하지 않은 경우 [Datadog Forwarder Lambda 함수][5]를 설정하세요.
2. 람다 함수가 설치되면 AWS  콘솔에서 Amazon Cognito 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 수동 트리거를 추가합니다.

    - [S3 버킷에서 수동 트리거 추가][6]
    - [클라우드와치 로그 그룹에 수동 트리거 추가][7]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_cognito" >}}


### 이벤트

Amazon Cognito 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon Cognito 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-cognito
[4]: https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-settings-advanced-security.html
[5]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_cognito/assets/metrics/metric-spec.yaml
[9]: https://docs.datadoghq.com/ko/help/