---
aliases:
- /ko/integrations/awsiot/
categories:
- aws
- cloud
- iot
- log collection
dependencies: []
description: 핵심 AWS IoT Core 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_iot/
draft: false
git_integration_title: amazon_iot
has_logo: true
integration_id: ''
integration_title: AWS IoT Core
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_iot
public_title: Datadog-AWS IoT Core 통합
short_description: 핵심 AWS IoT Core 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS IoT Core는 관리형 클라우드 플랫폼으로 장치를 원활하게 연결하고 클라우드 애플리케이션 및 기타 장치와 안전하게 통신할 수 있도록 해줍니다.

이 통합을 활성화해 Datadog에서 모든 IOT 메트릭을 확인하세요.

## 설정

### 설치

아직 설치하지 않았다면, [Amazon Web Services 통합을 먼저][1] 설치하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭 아래 `IoT`가 활성화되어 있는지 확인합니다.
2. [Datadog - AWS IoT Core 통합][3]을 설치하세요.

### 로그 수집

#### 로깅 활성화

AWS IoT Core를 설정해 S3 버킷 또는 클라우드와치(CloudWatch) 중 하나로 로그를 전송하세요.

**참고**: S3 버킷에 로깅하면 `amazon_iot`가 _대상 접두어_를 확인하세요.

#### Datadog에 로그 전송

1. 이미 하지 않은 경우 [Datadog 포워더 람다 함수][4]를 설정하세요.
2. 람다 함수가 설치되면 AWS 콘솔에 AWS IoT Core 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 수동으로 트리거를 추가합니다.

    - [S3 버킷에서 직접 트리거 추가][5]
    - [클라우드와치(CloudWatch) 로그 그룹에 수동 트리거 추가][6]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_iot" >}}


AWS에서 검색된 각 메트릭에는 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않고 AWS 콘솔에 표시되는 동일한 태그가 할당됩니다.

### 이벤트

AWS IoT Core 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

AWS IoT Core 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-iot
[4]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_iot/amazon_iot_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/