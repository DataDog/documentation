---
app_id: amazon-elb
app_uuid: 1ef7e818-51bc-4935-89b3-c418908c5e69
assets:
  dashboards:
    aws_alb: assets/dashboards/aws_alb_overview.json
    aws_elb: assets/dashboards/aws_elb_overview.json
    aws_nlb: assets/dashboards/aws_nlb_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.elb.request_count
      metadata_path: metadata.csv
      prefix: aws.elb
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 119
    source_type_name: Amazon ELB
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- metrics
- cloud
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_elb
integration_id: amazon-elb
integration_title: Amazon Elastic Load Balancing
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: amazon_elb
public_title: Amazon Elastic Load Balancing
short_description: Amazon ELB는 자동으로 다수의 EC2 인스턴스 전반에서 트래픽을 배포합니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  configuration: README.md#Setup
  description: Amazon ELB는 자동으로 다수의 EC2 인스턴스 전반에서 트래픽을 배포합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon Elastic Load Balancing
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Amazon Elastic Load Balancing은 클라우드에 있는 다수의 Amazon EC2 인스턴스 전반에서 수신되는 애플리케이션 트래픽을 자동으로 배포합니다.

Datadog는 AWS에서 제공하는 세 가지 Elastic Load Balancers  요소, 애플리케이션(ALB), 클래식(ELB) 및 네트워크 로드 밸런서(NLB) 모두에서 메트릭과 메타데이터를 수집합니다.

이 통합을 활성화하여 Datadog에서 Elastic Load Balancing 전체 메트릭을 확인하세요.

참고: 이 통합이 완전히 활성화되려면 'ec2:describe*\*' 및 'elasticloadbalancing:describe\*' 권한이 필요합니다.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭 아래에서  `ApplicationELB`, `ELB`, `NetworkELB`가 활성화되어 있는지 확인합니다.
2. [Datadog - Amazon ELB 통합][3]을 설치합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_elb" >}}


### 이벤트

Amazon Elastic Load Balancing 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon Elastic Load Balancing 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-elb
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_elb/metadata.csv
[5]: https://docs.datadoghq.com/ko/help/