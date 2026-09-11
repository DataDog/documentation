---
aliases:
- /ko/integrations/awsfirehose/
categories:
- aws
- cloud
- log collection
dependencies: []
description: 핵심 Amazon Data Firehose 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_firehose/
draft: false
git_integration_title: amazon_firehose
has_logo: true
integration_id: ''
integration_title: Amazon Data Firehose
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_firehose
public_title: Datadog-Amazon Data Firehose 통합
short_description: 핵심 Amazon Data Firehose 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon Data Firehose는 AWS에 스트리밍 데이터를 로드하는 가장 쉬운 방법입니다.

이 통합을 활성화해 Datadog에서 모든 Firehose 메트릭을 확인할 수 있습니다.

**참고**: Amazon Data Firehose의 이전 명칭은 Amazon Kinesis Data Firehose입니다. 자세한 내용은 [AWS 새 소식][1] 게시물을 확인하세요.

## 설정

### 설치

이미 하지 않았다면 [먼저 Amazon Web Services 통합][1]을 설치하세요.

### 메트릭 수집

1. [AWS 통합 페이지][3]에서 `Metric Collection` 탭 아래 `Firehose`가 활성화되어 있는지 확인합니다.
2. Datadog - Amazon Data Firehose 통합][4]를 설치합니다.

### 로그 수집

#### 로깅 활성화

Amazon Data Firehose를 설정하여 S3 버킷 또는 클라우드와치(CloudWatch) 중 하나로 로그를 전송하세요.

**참고**: S3 버킷에 로깅하려면 `amazon_firehose`이 _대상 접두어_로 설정되어 있는지 확인하세요.

#### Datadog로 로그 전송

1. 아직 설정하지 않은 경우 [Datadog Forwarder Lambda 함수][5]를 설정하세요.
2. 람다 함수가 설치되면 AWS 콘솔에서 Amazon Data Firehose 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 대한 트리거를 수동으로 추가할 수 있습니다.

    - [S3 버킷에서 수동 트리거 추가][6]
    - [클라우드와치 로그 그룹에 수동 트리거 추가][7]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_firehose" >}}


AWS에서 검색된 각 메트릭에는 AWS 콘솔에 나타나는 것과 동일한 태그가 할당됩니다, 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않습니다.

### 이벤트

Amazon Data Firehose 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Amazon Data Firehose 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://aws.amazon.com/about-aws/whats-new/2024/02/amazon-data-firehose-formerly-kinesis-data-firehose/
[2]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-firehose
[5]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_firehose/amazon_firehose_metadata.csv
[9]: https://docs.datadoghq.com/ko/help/