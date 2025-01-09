---
categories:
- cloud
- aws
- 로그 수집
dependencies: []
description: 핵심 AWS Elemental MediaConnect 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_mediaconnect/
draft: false
git_integration_title: amazon_mediaconnect
has_logo: true
integration_id: ''
integration_title: AWS Elemental MediaConnect
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_mediaconnect
public_title: Datadog-AWS Elemental MediaConnect 통합
short_description: 핵심 AWS Elemental MediaConnect 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS Elemental MediaConnect는 라이브 비디오를 위한 전송 서비스입니다.

이 통합을 활성화해 Datadog에서 모든 Elemental MediaConnect 메트릭을 참조하세요.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭 아래 `MediaConnect`가 활성화되어 있는지 확인하세요.
2. [Datadog - AWS Elemental MediaConnect 통합][3]을 설치하세요.

### 로그 수집

#### 로깅 활성화

AWS Elemental MediaConnect를 설정해 S3 버킷이나 클라우드와치(CloudWatch)로 로그를 전송하세요.

**참고**: S3 버킷에 로깅하는 경우 `amazon_mediaconnect`이 _대상 접두어_로 설정되어 있는지 확인하세요.

#### Datadog에 로그 전송

1. 이미 하지 않은 경우 [Datadog 포워더 람다 함수][4]를 설정하세요.
2. 람다 함수가 설치되면, AWS 콘솔에서 Amazon Elemental MediaConvert 로그를 포함하는 S3 버킷이나 클라우드와치(CloudWatch) 로그 그룹에 수동으로 트리거를 추가하세요.

    - [S3 버킷에서 직접 트리거 추가][5]
    - [클라우드와치(CloudWatch) 로그 그룹에 수동 트리거 추가][6]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_mediaconnect" >}}


### 이벤트

AWS Elemental MediaConnect 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

AWS Elemental MediaConnect 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mediaconnect
[4]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediaconnect/amazon_mediaconnect_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/