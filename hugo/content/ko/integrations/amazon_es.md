---
app_id: amazon-es
app_uuid: c00f4e38-7cc5-42ae-9ea1-519776f5f350
assets:
  dashboards:
    aws_es: assets/dashboards/amazon_es_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.es.cpuutilization
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.es.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 148
    source_type_name: Amazon ES
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- metrics
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_es
integration_id: amazon-es
integration_title: Amazon OpenSearch Service
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_es
public_title: Amazon OpenSearch Service
short_description: Amazon OpenSearch Service는 OpenSearch를 손쉽개 배포하고 운영할 수 있도록 해줍니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon OpenSearch Service는 OpenSearch를 손쉽개 배포하고 운영할 수 있도록 해줍니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon OpenSearch Service
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Amazon OpenSearch Service는 AWS Cloud에서 OpenSearch 클러스터를 손쉽게 배포, 운영, 확장할 수 있도록 도와주는 관리형 서비스입니다. OpenSearch는 완전한 오픈소스 기반 검색과 분석 엔진으로 로그 분석, 실시간 애플리케이션 모니터링 및 클릭스트림 분석 등의 사례에서 사용됩니다.

이 통합을 활성화해 Datadog에서 모든 OpenSearch Service 커스텀 태그를 확인하세여요. 이 통합은 Amazon AWS OpenSearch Service를 위한 것으로 Amazon AWS 외부에서 호스팅된 독립실행형 Elasticsearch 인스턴스가 아닙니다(해당 경우, 대신 [Elasticsearch 통합][1]을 사용해 주세요.)

참고: 이 통합이 완전히 활성화되려면 'es:ListTags', 'es:ListDomainNames' 및 'es:DescribeElasticsearchDomains' 권한이 필요합니다.

## 설정

### 설치

아직 설정하지 않은 경우 먼저 [Amazon Web Services 통합][2]을 설정하세요. 

### 메트릭 수집

1. [AWS 통합 페이지][3]의 `Metric Collection` 탭 아래에서 `ES`가 활성화되어 있는지 확인하세요.
2. [Datadog - Amazon OpenSearch Service 통합][4]을 설치하세요.

### 로그 수집

#### 로깅 활성화

로그를 S3 버킷이나 CloudWatch로 전송하도록 Amazon OpenSearch Service를 구성합니다.

**참고**: S3 버킷에 로그할 경우 _대상 접두사_로 `amazon_elasticsearch`를 설정해야 합니다.

#### Datadog로 로그 전송

1. 아직 설정하지 않은 경우 [Datadog Forwarder Lambda 함수][5]를 설정하세요.
2. Lambda 함수가 설치되면 AWS 콘솔에서 Amazon Elasticsearch 로그가 포함된 S3 버킷 또는 CloudWatch 로그 그룹에 트리거를 수동으로 추가합니다.

    - [S3 버킷에서 수동 트리거 추가][6]
    - [클라우드와치 로그 그룹에 수동 트리거 추가][7]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon-es" >}}


### 이벤트

Amazon OpenSearch Service 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Amazon OpenSearch Service 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/elastic
[2]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-es
[5]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#manually-set-up-triggers
[8]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_es/assets/metrics/metric-spec.yaml
[9]: https://docs.datadoghq.com/ko/help/