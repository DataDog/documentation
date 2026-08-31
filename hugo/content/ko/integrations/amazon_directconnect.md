---
aliases:
- /ko/integrations/awsdirectconnect/
categories:
- cloud
- aws
- log collection
dependencies: []
description: 핵심 Amazon Direct Connect 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_directconnect/
draft: false
git_integration_title: amazon_directconnect
has_logo: true
integration_id: ''
integration_title: AWS Direct Connect
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_directconnect
public_title: Datadog-AWS Direct Connect 통합
short_description: 핵심 AWS Direct Connect 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

이 통합은 AWS Direct Connect에서 연결 상태, 전송 및 송신 비트 속도, 전송 및 송신 패킷 속도 등의 메트릭을 수집합니다.

## 설정

### 설치

아직 설치하지 않았다면, [Amazon Web Services 통합을 먼저][1] 설치하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `DirectConnect`가 `Metric Collection` 탭에서 활성화되어 있는지 확인하세요.
2. AWS Direct Connect 메트릭을 수집하려면 [Datadog IAM 정책][3]에 해당 권한을 추가합니다.

    - `directconnect:DescribeConnections`: 사용 가능한 Direct Connect 연결을 목록화하는 데 사용됩니다.
    - `directconnect:DescribeTags`: Direct Connect 연결에 적용한 커스텀 태그를 수집하는 데 사용됩니다.

    자세한 정보는 AWS 웹사이트에서 [Direct Connect 정책][4]을 참조하세요.

3. [Datadog - AWS Direct Connect 통합][5]을 설치합니다.

### 로그 수집

#### 로깅 활성화

AWS Direct Connect를 설정해 S3 버킷이나 클라우드와치(CloudWatch)로 로그를 전송합니다.

**참고**: S3 버킷에 기록하면 `amazon_directconnect`를 _대상 접두어_로 설정합니다.

#### Datadog에 로그 전송

1. 이미 하지 않은 경우 [Datadog 포워더 람다 함수][6]를 설정하세요.
2. 람다 함수가 설치되면 AWS  콘솔에서 AWS Direct Connect 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 수동 트리거를 추가합니다.

    - [S3 버킷에 수동 트리거 추가][7]
    - [클라우드와치 로그 그룹에 수동 트리거 추가][8]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_directconnect" >}}


AWS에서 검색된 각 메트릭에는 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않고 AWS 콘솔에 표시되는 동일한 태그가 할당됩니다.

### 이벤트

AWS Direct Connect 통합은 이벤트를 포함하지 않습니다.

### 서비스 검사

AWS Direct Connect 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/directconnect/latest/UserGuide/security-iam.html
[5]: https://app.datadoghq.com/integrations/amazon-directconnect
[6]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_directconnect/amazon_directconnect_metadata.csv
[10]: https://docs.datadoghq.com/ko/help/