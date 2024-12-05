---
categories:
- aws
- cloud
- 비용 관리
- 로그 수집
- 프로비저닝
dependencies: []
description: AWS Trusted Advisor의 핵심 메트릭을 추적합니다.
doc_link: https://docs.datadoghq.com/integrations/amazon_trusted_advisor/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-aws-trusted-advisor/
  tag: 블로그
  text: Datadog으로 AWS Trusted Advisor 서비스 제한 점검을 모니터링하세요.
git_integration_title: amazon_trusted_advisor
has_logo: true
integration_id: ''
integration_title: AWS Trusted Advisor
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_trusted_advisor
public_title: Datadog-AWS Trusted Advisor 통합
short_description: AWS Trusted Advisor의 핵심 메트릭을 추적합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS Trusted Advisor는 AWS 모범 사례에 따라 리소스를 프로비저닝할 수 있도록 도와드리는 실시간 온라인 툴입니다.

이 통합을 활성화하면 Datadog에서 모든 Trusted Advisor 메트릭을 확인할 수 있습니다.

**참고**: 본 통합 기능은 비즈니스 또는 엔터프라이즈 지원 플랜을 이용하는 AWS 고객님만 사용하실 수 있습니다.

## 설정

### 설치

아직 설정하지 않은 경우, 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. IAM 콘솔에서 정책 문서 필드에 `support:describe*` 및 `support:refresh*`을 작업으로 추가합니다. AWS 지원 API 에 대한 자세한 내용을 확인하려면 [AWS 지원용 작업, 리소스, 조건 키][2]를 참조하세요.
2. [AWS 통합 페이지][3]에서 `Trusted Advisor`가 `Metric Collection`탭에서 활성화되어 있는지 확인하세요.
3. [Datadog - AWS Trusted Advisor 통합][4]을 설치합니다.

### 로그 수집

#### 로깅 활성화

AWS Trusted Advisor를 설정하여 S3 버킷 또는 클라우드와치(CloudWatch)로 로그를 전송합니다.

**참고**: S3 버킷으로 로그를 전송하려면 _Target prefix_(대상 접두사)를 `amazon_trusted_advisor`로 설정합니다.

#### Datadog에 로그 전송

1. 아직 설정하지 않은 경우 [Datadog Forwarder Lambda 함수][5]를 설정하세요.
2. Lambda 함수를 설치한 후 AWS 콘솔에서 Amazon Trusted Advisor 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 트리거를 수동으로 추가합니다.

    - [S3 버킷에 수동 트리거 추가][6]
    - [클라우드와치 로그 그룹에 수동 트리거 추가][7]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_trusted_advisor" >}}


### 이벤트

AWS Trusted Advisor 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

AWS Trusted Advisor 통합은 서비스 점검을 포함하지 않습니다.

## 대시보드

AWS Trusted Advisor 통합 대시보드에 데이터를 추가하려면:

1. 지원 권한을 설정합니다.
    - IAM 콘솔에서 정책 문서 텍스트 상자에 `support:describe*`와 `support: refresh*`을 작업으로 추가합니다.
1.  업그레이드된 AWS 지원 플랜을 사용해 보세요.

Datadog Trusted Advisor 대시보드가 [AWS Trusted Advisor 점검][9]의 모든 세트에 접근할 수 있어야 합니다. AWS에서는 업그레이드된 AWS 지원 요금제에서만 모든 세트에 접근할 수 있도록 하고 있습니다. AWS 플랜에 전체 접근 권한이 포함되어 있는지 확인하세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/service-authorization/latest/reference/list_awssupport.html
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-trusted-advisor
[5]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_trusted_advisor/amazon_trusted_advisor_metadata.csv
[9]: https://aws.amazon.com/premiumsupport/trustedadvisor
[10]: https://docs.datadoghq.com/ko/help/