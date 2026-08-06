---
aliases:
- /ko/integrations/awsredshift/
categories:
- aws
- cloud
- data stores
- log collection
dependencies: []
description: 핵심 Amazon Redshift 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_redshift/
draft: false
git_integration_title: amazon_redshift
has_logo: true
integration_id: ''
integration_title: Amazon Redshift
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_redshift
public_title: Datadog-Amazon Redshift 통합
short_description: 핵심 Amazon Redshift 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon Redshift는 빠른 완전관리형 페타바이트 규모의 데이터 웨어하우스 서비스로, 모든 데이터를 효과적으로 분석할 수 있는 단순하고 비용 효율적인 방법을 제공합니다.

이 통합을 활성화해 Datadog에서 모든 Redshift 메트릭을 확인하세요.

## 설정

### 설치

아직 설치하지 않았다면, [Amazon Web Services 통합을 먼저][1] 설치하세요.

### 메트릭 수집

1. [AWS 통합 페이지에서][2] `Metric Collection` 탭에 `Redshift`가 활성화되어 있는지 확인하세요.
2. 이러한 권한을 [Datadog IAM 정책][3]에 추가하여 Amazon Redshift 메트릭을 수집하세요.

    - `redshift:DescribeClusters`: 계정에서 모든 Amazon Redshift 클러스터 목록을 나열하세요.
    - `redshift:DescribeLoggingStatus`: Redshift 로그가 보관된 S3 버킷을 받으세요.
    - `tag:GetResources`: Redshift 클러스터에서 커스텀 태그를 받으세요.

    자세한 정보는 AWS 웹사이트에서 [Redshift 정책][4]을 참조하세요.

3. [Datadog - Amazon Redshift 통합][5]을 설치하세요.

### 로그 수집

#### 로깅 활성화

먼저 Redshift 클러스터에서 로그인을 활성화하고 로그를 수집하세요. Redshift 로그는 Amazon S3에 작성될 수 있으며 [기능/함수람다 함수에 사용될 수 있습니다.][6] 자세한 정보는 [콘솔을 사용하여 감사 설정하기][7]를 참조하세요.

#### Datadog에 로그 전송

1. 이미 하지 않은 경우 AWS 계정에서 [Datadog 포워더(Forwarder) 람다 함수][8]를 설정하세요.
2. 람다 함수가 설치되면 Redshift 로그를 수집하는 데는 두 가지 방법이 있습니다.

    - 자동: Datadog가 일련의 권한을 가지고 액세스할 수 있도록 하면 Redshift 로그가 자동으로 관리됩니다. Datadog 포워더 람다 함수에서 자동 로그 수집을 설정하는 방법에 대한 자세한 정보는 [자동으로 트리거 설정][9]을 참조하세요.
    - 수동: AWS 콘솔에서 Redshift 로그가 포함된 S3 버킷에 트리거를 추가합니다. [수동 설치 단계](#manual-installation-steps)를 참조하세요.

#### 수동 설치 단계

1. 이미 하지 않은 경우 AWS 계정에서 [Datadog 포워더(Forwarder) 람다 함수][8]를 설정하세요.
2. 설정한 후에는 Datadog Forwarder Lambda 함수로 이동하세요. Function Overview 섹션에서 **Add Trigger**를 클릭합니다.
3. 트리거 설정에 대해 **S3** 트리거를 선택합니다.
4. Redshift 로그를 포함하는 S3 버킷을 선택합니다.
5. 이벤트 유형을 `All object create events`로 남겨둡니다.
6. **Add**를 클릭해 Lambda에 트리거를 추가합니다.

[로그 탐색기][10]로 이동해 로그 탐색을 시작합니다.

AWS 서비스 로그 수집에 대한 자세한 정보는 [Datadog 람다 함수를 사용해 AWS 서비스 로그 전송]을 참조하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_redshift" >}}


AWS에서 검색된 각 메트릭에는 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않고 AWS 콘솔에 표시되는 동일한 태그가 할당됩니다.

### 이벤트

 Amazon Redshift 통합은 이벤트를 포함하지 않습니다.

### 서비스 검사

Amazon Redshift 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원팀][13]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/redshift/latest/mgmt/redshift-iam-authentication-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-redshift
[6]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tabs=awsconsole#collecting-logs-from-s3-buckets
[7]: https://docs.aws.amazon.com/redshift/latest/mgmt/db-auditing-console.html
[8]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[9]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tabs=awsconsole#automatically-set-up-triggers
[10]: https://app.datadoghq.com/logs
[11]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_redshift/amazon_redshift_metadata.csv
[13]: https://docs.datadoghq.com/ko/help/