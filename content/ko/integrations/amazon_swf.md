---
aliases:
- /ko/integrations/awsswf/
categories:
- cloud
- configuration & deployment
- aws
- log collection
dependencies: []
description: 핵심 Amazon 심플 워크플로우 서비스 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_swf/
draft: false
git_integration_title: amazon_swf
has_logo: true
integration_id: ''
integration_title: Amazon 심플 워크플로우 서비스
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_swf
public_title: Datadog-Amazon 심플 워크플로우 서비스 통합
short_description: 핵심 Amazon 심플 워크플로우 서비스 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon SWF는 개발자가 병렬 또는 순차 스텝이 존재하는 백그라운드 작업을 빌드, 실행, 확장할 수 있도록 도와드립니다.

본 통합을 활성화하면 Datadog에서 모든 SWF 메트릭을 확인할 수 있습니다.

## 설정

### 설치

아직 설정하지 않은 경우, 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭의 `SWF`이 활성화되어 있는지 확인합니다.
2. [Datadog - Amazon SWF 통합][3]을 설치합니다.

### 로그 수집

#### 로깅 활성화

Amazon SWF를 설정해 S3 버킷이나 클라우드와치(CloudWatch)로 로그를 전송합니다.

**참고**: S3 버킷으로 로그를 전송하려면 _Target prefix_(대상 접두사)를 `amazon_swf`로 설정합니다.

#### Datadog에 로그 전송

1. 아직 설정하지 않은 경우 [Datadog Forwarder Lambda 함수][4]를 설정하세요.
2. Lambda 함수를 설치한 후 AWS 콘솔에서 Amazon SWF 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 트리거를 수동으로 추가합니다.

    - [S3 버킷에서 직접 트리거 추가][5]
    - [클라우드와치(CloudWatch) 로그 그룹에 수동 트리거 추가][6]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_swf" >}}


AWS에서 검색된 각 메트릭에는 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않고 AWS 콘솔에 표시되는 동일한 태그가 할당됩니다.

### 이벤트

Amazon SWF 통합은 이벤트를 포함하지 않습니다.

### 서비스 검사

Amazon SWF 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-swf
[4]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_swf/amazon_swf_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/