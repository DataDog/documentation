---
aliases:
- /ko/integrations/awskinesis/
categories:
- aws
- cloud
- log collection
dependencies: []
description: 핵심 Amazon Kinesis 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_kinesis/
draft: false
git_integration_title: amazon_kinesis
has_logo: true
integration_id: ''
integration_title: Amazon Kinesis
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_kinesis
public_title: Datadog-Amazon Kinesis 통합
short_description: 핵심 Amazon Kinesis 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon Kinesis는 완전 관리형 클라우드 기반 서비스로 대규모 분산 데이터 스트림을 실시간으로 프로세싱합니다.

이 통합을 활성화해 Datadog에서 모든 Kinesis 메트릭을 확인하고 커스텀 Kinesis 태그를 수집하세요.

## 설정

### 설치

이미 하지 않은 경우 [먼저 Amazon Web Services][1]를 설정합니다. 다른 설치 단계는 수행할 필요가 없습니다.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Kinesis`가 `Metric Collection` 탭 아래 활성화되어 있는지 확인하세요.
2. Amazon Kinesis 메트릭을 수집하려면 해당 권한을 [Datadog IAM 정책][3]에 추가하세요.

    - `kinesis:ListStreams`: 사용 가능한 스트림을 목록화합니다.
    - `kinesis:DescribeStream`: Kinesis 스트림을 위한 태그와 새로운 메트릭을 추가합니다.
    - `kinesis:ListTagsForStream`: 커스텀 태그를 추가합니다.

    자세한 정보는 AWS 웹사이트에서 [Kinesis 정책][4]을 참조하세요.

3. [Datadog - Amazon Kinesis 통합][5]을 설치하세요.

### 로그 수집

#### 로깅 활성화

Datadog는 Amazon Data Firehose 전송 스트림을 위한 기본 목적지 중 하나입니다. AWS는 Amazon Data Firehose를 완전히 관리하므로 로그 스트리밍을 위해 추가 인프라스트럭처나 포워딩 설정을 유지관리할 필요가 없습니다.

AWS Firehose 콘솔에서 Amazon Data Firehose 전송 스트림을 설정하거나 CloudFormation 템플릿을 사용해 자동으로 목적지를 설정할 수 있습니다.

- [AWS Firehose 콘솔][6]
- [CloudFormation 템플릿][7]

하지만 S3 버킷에 로깅한 다음 AWS 람다 함수를 사용할 수 있습니다. `amazon_kinesis`가 _대상 접두어_로 설정되어 있는지 확인하세요.

1. 이미 하지 않은 경우 [Datadog 포워더(Forwarder) 람다 함수][8]을 설정하세요.
2. 람다 함수가 설치되면 AWS 콘솔에서 Amazon Kinesis 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 대한 트리거를 수동으로 추가할 수 있습니다.

    - [S3 버킷에서 수동 트리거 추가][9]
    - [클라우드와치(CloudWatch) 로그 그룹에서 수동 트리거 추가][10]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_kinesis" >}}


AWS에서 검색된 각 메트릭에는 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않고 AWS 콘솔에 표시되는 동일한 태그가 할당됩니다.

### 이벤트

Amazon Kinesis 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Amazon Kinesis 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][12]에 문의해주세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/streams/latest/dev/controlling-access.html
[5]: https://app.datadoghq.com/integrations/amazon-kinesis
[6]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=amazondatafirehosedeliverystream
[7]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=cloudformationtemplate
[8]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[9]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[10]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_kinesis/amazon_kinesis_metadata.csv
[12]: https://docs.datadoghq.com/ko/help/