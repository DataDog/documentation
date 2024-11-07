---
aliases:
- /ko/integrations/awsml/
categories:
- cloud
- aws
- log collection
- ai/ml
dependencies: []
description: AWS 기계 학습에서 예상 개수와 실패를 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_machine_learning/
draft: false
git_integration_title: amazon_machine_learning
has_logo: true
integration_id: ''
integration_title: Amazon 기계 학습
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_machine_learning
public_title: Datadog-Amazon 기계 학습 통합
short_description: AWS 기계 학습에서 예상 개수와 실패를 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS 기계 학습은 모든 수준의 개발자가 기계 학습 기술을 쉽게 사용하도록 지원하는 서비스입니다.

이 통합을 활성화하여 Datadog에 있는 모든 기계 학습 메트릭을 확인하세요.

## 설정

### 설치

아직 설치하지 않았다면, [Amazon Web Services 통합을 먼저][1] 설치하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭 아래 `ML`이 활성화되어 있는지 확인하세요.
2. [Datadog - AWS 기계 학습 통합][3]을 설치하세요.

### 로그 수집

#### 로깅 활성화

AWS 기계 학습을 설정해 S3 버킷 또는 클라우드와치(CloudWatch) 중 하나로 로그를 전송합니다.

**참고**: S3 버킷에 로깅하면 `amazon_machine_learning`이 _대상 접두어_로 설정되어 있는지 확인하세요.

#### Datadog에 로그 전송

1. 이미 하지 않은 경우 [Datadog 포워더 람다 함수][4]를 설정하세요.
2. 람다 함수가 설치되면 AWS 콘솔에 AWS 기계 학습 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에서 트리거를 수동으로 추가합니다.

    - [S3 버킷에서 직접 트리거 추가][5]
    - [클라우드와치(CloudWatch) 로그 그룹에 수동 트리거 추가][6]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_machine_learning" >}}


AWS에서 검색된 각 메트릭에는 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않고 AWS 콘솔에 표시되는 동일한 태그가 할당됩니다.

### 이벤트

AWS 기계 학습 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

AWS 기계 학습 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-machine-learning
[4]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_machine_learning/amazon_machine_learning_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/