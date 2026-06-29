---
aliases:
- /ko/integrations/amazon_verified_access
categories:
- 클라우드
- aws
- 로그 수집
custom_kind: 통합
dependencies: []
description: AWS Verified Access 로그를 수집하세요.
doc_link: https://docs.datadoghq.com/integrations/aws_verified_access/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/verified-access-datadog/
  tag: 블로그
  text: AWS Verified Access 및 Datadog으로 기업 애플리케이션 보안 강화
git_integration_title: aws_verified_access
has_logo: true
integration_id: amazon-verified-access
integration_title: AWS Verified Access
integration_version: ''
is_public: true
manifest_version: '1.0'
name: aws_verified_access
public_title: Datadog-AWS Verified Access 통합
short_description: AWS Verified Access 로그를 수집하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS Verified Access를 사용하면 VPN(가상 사설망)을 사용하지 않고도 기업 애플리케이션에 대한 보안 액세스를 제공할 수 있습니다. Verified Access는 각 애플리케이션 요청을 평가하고 사용자가 지정된 보안 요구 사항을 충족하는 경우에만 각 애플리케이션에 액세스할 수 있도록 도와줍니다.


## 설정

### 설치

아직 설정하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 로그 수집

#### Verified Access 로그 활성화

1. Amazon VPC 콘솔을 엽니다.
2. 탐색 창에서 **Verified Access instances**를 선택합니다.
3. Verified Acccess instance를 선택합니다.
4. Verified Access instance 로깅 구성 탭에서 **Modify Verified Access instance logging configuration**을 선택합니다.
5. **Deliver to Amazon Cloudwatch Logs**를 활성화한 후 대상 로그 그룹을 선택합니다.

**참고**: 자동 로그 파싱을 활성화하려면 로그 그룹 이름에 `verified-access` 문자열을 포함하세요.

자세한 내용은 [Enable Verified Access 로그][2]를 참조하세요.

#### Datadog로 로그 전송

**참고**: Datadog의 [Amazon Security Lake 통합][3]을 사용하는 경우 아래 단계를 따르는 대신 해당 통합을 통해 Verified Access 로그를 보낼 수 있습니다.

1. 아직 설정하지 않았다면 AWS 계정에서 [Datadog Forwarder Lambda 함수][4]를 설정합니다.
2. 설정한 후에는 Datadog Forwarder Lambda 함수로 이동합니다. Function Overview 섹션에서 **Add Trigger**를 클릭합니다.
3. Trigger Configuration에서 **CloudWatch Logs** 트리거를 선택하세요. 
4. Verified Access 로그가 포함된 로그 그룹을 선택합니다.
5. 필터 이름을 추가합니다.
6. **Add**를 클릭해 Lambda에 트리거를 추가합니다.

 [Log Explorer][5]로 이동해 로그를 탐색합니다.

AWS 서비스 로그 수집에 대한 자세한 내용은 [Datadog Lambda 함수를 사용하여 AWS 서비스 로그 전송][6]을 참조하세요.

## 수집한 데이터

### 메트릭

 AWS Verified Access 통합은 메트릭 수집을 포함하지 않습니다.

### 이벤트

 AWS Verified Access 통합은 이벤트를 포함하지 않습니다.

### 로그

AWS Verified Access 통합은 [Verified Access 로그][7]를 포함합니다.

### 서비스 점검

 AWS Verified Access 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/verified-access/latest/ug/access-logs-enable.html
[3]: https://docs.datadoghq.com/ko/integrations/amazon_security_lake/
[4]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[5]: https://app.datadoghq.com/logs
[6]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[7]: https://docs.aws.amazon.com/verified-access/latest/ug/access-logs.html
[8]: https://docs.datadoghq.com/ko/help/