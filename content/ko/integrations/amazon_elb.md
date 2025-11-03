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
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.
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
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_elb
integration_id: amazon-elb
integration_title: Amazon Elastic Load Balancing
integration_version: ''
is_public: true
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
  - Offering::Integration
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

아직 설정하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭 아래에서  `ApplicationELB`, `ELB`, `NetworkELB`가 활성화되어 있는지 확인합니다.
2. [Datadog - Amazon ELB 통합][3]을 설치합니다.

### 로그 수집

#### Amazon ELB 또는 ALB 로깅 활성화

ELB 또는 ALB에서 로깅을 먼저 활성화하고 로그를 수집합니다. ALB와 ELB 로그는 Amazon S3 버킷에서 작성될 수 있으며 [Lambda 함수에 사용될 수 있습니다][4]. 자세한 정보는 [Classic Load Balancer에서 로그 액세스 활성화][5]를 참고하세요.

![Amazon ELB 로그 활성화][6]

간격을 5분으로 설정하고 S3 버킷과 접두사를 정의하세요. [모호하게 정의된 S3 이벤트 알림 구성][7]을 방지하려면 다른 로드 밸런서의 로그 위치와 겹치지 않는 **고유 위치**를 사용해야 합니다. 여러 로드 밸런서가 동일한 버킷에 로깅하는 경우, 로그가 별도의 위치에 저장되도록 `my-bucket-for-elb-logs/my-elb-name`과 같은 **고유 접두사**를 사용해야 합니다.

![Amazon ELB 로그 구성][8]

#### Datadog로 로그 전송

1. 이미 하지 않은 경우 AWS 계정에서 [Datadog 포워더 람다 함수][9]를 설정합니다.
2. 설정을 완료하면, Datadog Forwarder Lambda 함수로 이동합니다. 내 ELB 로그를 포함하고 있는 S3 버킷에 [자동][10] 또는 [수동][11]으로 트리거를 설정합니다. 수동 설정을 하려면 이벤트 유형 `All object create events`를 사용합니다.
3. [로그 탐색기][12]를 사용해 로그를 탐색합니다.

AWS 서비스 로그 수집에 대한 자세한 정보는 [Datadog Lambda 함수를 사용해 AWS 서비스 로그 전송][13]을 참고하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon-elb" >}}


### 이벤트

Amazon Elastic Load Balancing 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon Elastic Load Balancing 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하시면 [Datadog 지원팀][15]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-elb
[4]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[5]: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html
[6]: images/aws_elb_log_enable.png
[7]: https://aws.amazon.com/premiumsupport/knowledge-center/lambda-s3-event-configuration-error/
[8]: images/aws_elb_configure_log.png
[9]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[10]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers
[11]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[12]: https://app.datadoghq.com/logs
[13]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[14]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_elb/assets/metrics/metric-spec.yaml
[15]: https://docs.datadoghq.com/ko/help/