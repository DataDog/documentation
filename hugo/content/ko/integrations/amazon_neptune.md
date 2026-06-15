---
categories:
- aws
- 클라우드
- 데이터 저장소
- 로그 수집
custom_kind: 통합
dependencies: []
description: Amazon Neptune의 핵심 메트릭을 추적합니다.
doc_link: https://docs.datadoghq.com/integrations/amazon_neptune/
draft: false
git_integration_title: amazon_neptune
has_logo: true
integration_id: ''
integration_title: Amazon Neptune
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_neptune
public_title: Datadog-Amazon Neptune 통합
short_description: Amazon Neptune의 핵심 메트릭을 추적합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon Neptune은 빠르고 신뢰할 수 있는 전체 관리형 그래프 데이터베이스 서비스로, 연결성이 높은 데이터베이스에 쉽게 애플리케이션을 빌드하고 실행하도록 도와줍니다.

이 통합을 활성화하면 Datadog에서 모든 Neptune 메트릭을 확인할 수 있습니다.

## 설정

### 설치

아직 설정하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Neptune`이 `Metric Collection` 탭에서 활성화되었는지 확인합니다.
2. [Datadog - Amazon Neptune 통합][3]을 설치합니다.

### 로그 수집

#### 로깅 활성화

S3 버킷이나 CloudWatch로 로그를 전송하도록 Amazon Neptune을 구성하세요.

**참고**: S3 버킷으로 로그를 전송하려면 _Target prefix_(대상 접두사)를 `amazon_neptune`으로 설정합니다.

#### Datadog로 로그 전송

1. 아직 설정하지 않은 경우 [Datadog Forwarder Lambda 함수][4]를 설정하세요.
2. Lambda 함수를 설치한 후 AWS 콘솔에서 Amazon Neptune 로그를 포함하는 S3 버킷이나 CloudWatch 로그 그룹에 수동으로 트리거를 추가하세요.

    - [S3 버킷에서 수동 트리거 추가][5]
    - [CloudWatch 로그 그룹에 수동으로 트리거 추가][6]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_neptune" >}}


### 이벤트

Amazon Neptune 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Amazon Neptune 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-neptune
[4]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_neptune/amazon_neptune_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/