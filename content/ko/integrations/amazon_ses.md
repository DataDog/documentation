---
aliases:
- /ko/integrations/awsses/
categories:
- aws
- cloud
- log collection
dependencies: []
description: 이메일 반송, 전송 시도, 거부된 메시지 등을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_ses/
draft: false
git_integration_title: amazon_ses
has_logo: true
integration_id: ''
integration_title: 'Amazon SES(Simple Email Service) '
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_ses
public_title: Datadog-Amazon SES(Simple Email Service) 통합
short_description: 이메일 반송, 전송 시도, 거부된 메시지 등을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon SES(Simple Email Service)는 비용 효율적인 아웃바운드 전용 이메일 전송 서비스입니다.

이 통합을 활성화해 Datadog에서 모든 SES 메트릭을 확인하세요.

## 설정

### 설치

아직 설치하지 않았다면, [Amazon Web Services 통합을 먼저][1] 설치하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `SES`가 `Metric Collection` 탭 아래 활성화되어 있는지 확인하세요. 
2. Amazon SES 메트릭을 수집하려면 [Datadog IAM 정책][3]에 해당 권한을 추가합니다. 

    - `ses:GetSendQuota`: 전송 쿼터에 대한 메트릭을 추가합니다.
    - `ses:GetSendStatistics`: 전송 통계에 대한 메트릭을 추가합니다.

    자세한 정보는 AWS 웹사이트에서 [SES 정책][4]을 참조하세요.

3. [Datadog - Amazon SES(Simple Email Service) 통합][5]을 설치하세요.

### 로그 수집

#### 로깅 활성화

Amazon SES를 설정하여 S3 버킷이나 클라우드와치(CloudWatch) 중 하나로 로그를 전송하세요.

**참고**: S3 버킷에 로그인하려면 `amazon_ses`이 _대상 접두어_로 설정되어 있는지 확인하세요.

#### Datadog에 로그 전송

1. 이미 하지 않은 경우 [Datadog 포워더 람다 함수][6]를 설정하세요.
2. 람다 함수가 설치되면 AWS 콘솔에서 Amazon SES 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 대한 트리거를 수동으로 추가할 수 있습니다.

    - [S3 버킷에 수동 트리거 추가][7]
    - [클라우드와치 로그 그룹에 수동 트리거 추가][8]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_ses" >}}


AWS에서 검색된 각 메트릭에는 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않고 AWS 콘솔에 표시되는 동일한 태그가 할당됩니다.

### 이벤트

Amazon SES(Simple Email Service) 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Amazon SES(Simple Email Service) 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/ses/latest/dg/control-user-access.html
[5]: https://app.datadoghq.com/integrations/amazon-ses
[6]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ses/amazon_ses_metadata.csv
[10]: https://docs.datadoghq.com/ko/help/