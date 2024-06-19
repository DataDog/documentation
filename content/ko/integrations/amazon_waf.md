---
aliases:
- /ko/integrations/awswaf/
categories:
- cloud
- security
- aws
- log collection
dependencies: []
description: 허용된 요청 대 차단된 요청을 추적합니다.
doc_link: https://docs.datadoghq.com/integrations/amazon_waf/
draft: false
git_integration_title: amazon_waf
has_logo: true
integration_id: ''
integration_title: AWS WAF
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_waf
public_title: Datadog-AWS WAF 통합
short_description: 허용된 요청 대 차단된 요청을 추적합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS WAF는 일반적인 웹 취약점 공격으로부터 웹 애플리케이션을 보호하도록 도와드리는 웹 애플리케이션 방화벽입니다.

본 통합을 활성화하여 Datadog에서 WAF 메트릭을 확인하세요.

## 설정

### 설치

아직 설정하지 않은 경우, 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭의 `WAF` 또는 `WAFV2`이 활성화되어 있는지 확인합니다. 이는 사용하는 엔드포인트에 따라 달라집니다.

2. [Datadog - AWS WAF 통합][3]을 설치합니다.

### 로그 수집

#### 감사 로그

웹 애플리케이션 방화벽 감사 로그를 활성화하여 웹 ACL 분석 트래픽에 대한 자세한 정보를 얻어보세요.

1. `aws-waf-logs-`로 시작하는 이름으로 `Amazon Kinesis Data Firehose`을 생성합니다.
2. `Amazon Kinesis Data Firehose` 대상에서 `Amazon S3`을 선택한 다음 접두사로 `waf`을 추가합니다.
3. 원하는 웹 ACL을 선택하고 로그를 새로 생성한 Firehose로 전송합니다([상세 단계][4]).

WAF 로그를 수집하여 S3 버킷으로 전송합니다.

#### Datadog에 로그 전송

1. 아직 설정하지 않은 경우 [Datadog Forwarder Lambda 함수][5]를 설정하세요.
2. Lambda 함수를 설치한 다음 AWS 콘솔에서 WAF 로그를 포함하는 S3 버킷에 트리거를 수동으로 추가합니다. Lambda 함수에서 다음 트리거 목록의 S3를 클릭합니다.
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="S3 트리거 설정" popup="true" style="width:70%;">}}
   WAF 로그가 포함된 S3 버킷을 선택하여 트리거를 설정하고 이벤트 유형을 `Object Created (All)`로 변경한 다음 추가 버튼을 클릭합니다.
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="S3 Lambda 트리거 설정" popup="true" style="width:70%;">}}

**참고**: Datadog Lambda 포워더(Forwarder)는 쉽게 사용할 수 있도록 WAF 로그의 중첩된 오브젝트 어레이를 `key:value` 형식으로 자동 변환합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_waf" >}}


**참고**: WAF용 클라우드와치(CloudWatch) 메트릭 API의 과거 데이터 형식 때문에 `aws.waf.*` 및 `waf.*` 메트릭 모두 보고됩니다.

AWS에서 검색된 각 메트릭에는 AWS 콘솔에 나타나는 것과 동일한 태그가 할당됩니다, 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않습니다.

### 이벤트

AWS WAF 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

AWS WAF 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-waf
[4]: https://docs.aws.amazon.com/waf/latest/developerguide/logging.html
[5]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_waf/amazon_waf_metadata.csv
[7]: https://docs.datadoghq.com/ko/help/