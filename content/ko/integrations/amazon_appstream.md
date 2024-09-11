---
categories:
- aws
- cloud
- 설정 및 배포
- 로그 수집
dependencies: []
description: 핵심 Amazon AppStream 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_appstream/
draft: false
git_integration_title: amazon_appstream
has_logo: true
integration_id: ''
integration_title: Amazon AppStream
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_appstream
public_title: Datadog-Amazon AppStream 통합
short_description: 핵심 Amazon AppStream 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon AppStream은 완전 관리형 보안 애플리케이션 스트리밍 서비스로, 데스크톱 애플리케이션을 AWS에서 웹 브라우저로 이동할 수 있도록 해줍니다.

이 통합을 활성화해 Datadog에서 모든 AppStream 메트릭을 참조하세요.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `AppStream`이 `Metric Collection` 탭 아래 활성화되었는지 확인하세요.
2. [Datadog - Amazon AppStream 통합][3]을 설치하세요.

### 로그 수집

#### 로깅 활성화

Amazon AppStream을 설정하여 S3 버킷 또는 클라우드와치(CloudWatch)로 로그를 전송하세요.

**참고**: S3 버킷으로 로그를 전송하려면 `amazon_appstream`이 _Target prefix_로 설정되어 있도록 하세요.

#### Datadog에 로그 전송

1. 이미 하지 않은 경우 [Datadog 포워더 람다 함수][4]를 설정하세요.
2. 람다 함수가 설치되면 AWS  콘솔에서 Amazon AppStream 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 수동 트리거를 추가합니다.

    - [S3 버킷에서 직접 트리거 추가][5]
    - [클라우드와치(CloudWatch) 로그 그룹에 수동 트리거 추가][6]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_appstream" >}}


### 이벤트

Amazon AppStream 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon AppStream 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-appstream
[4]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_appstream/amazon_appstream_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/