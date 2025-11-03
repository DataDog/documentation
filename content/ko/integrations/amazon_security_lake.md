---
categories:
- aws
- 클라우드
- 데이터 저장소
- 로그 수집
- 네트워크
- security
custom_kind: 통합
dependencies: []
description: Amazon Security Lake 로그를 수집하세요.
doc_link: ''
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/aws-reinvent-2022-recap/
  tag: 블로그
  text: AWS re:Invent 2022의 주요 내용
git_integration_title: amazon_security_lake
has_logo: true
integration_id: amazon-security-lake
integration_title: Amazon Security Lake
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_security_lake
public_title: Datadog-Amazon Security Lake 통합
short_description: Amazon Security Lake 로그를 수집하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon Security Lake는 보안 로그 및 이벤트 데이터를 집계하고 관리하기 위한 보안 데이터 레이크입니다.

이 통합은 추가 조사 및 실시간 위협 탐지를 위해 Amazon Security Lake에 저장된 보안 로그를 Datadog으로 수집합니다. Amazon Security Lake에 대해 자세히 알아보려면 AWS의 [Amazon Security Lake 사용자 가이드][1]를 참조하세요.

## 설정

### 사전 필수 조건

1. Amazon Security Lake는 AWS 계정 또는 AWS 조직에 대해 구성되어야 합니다. 자세한 내용은 [Amazon Security Lake 사용 설명서][1]를 참조하세요.
2. [Datadog Log Management][2]와 [Datadog Cloud SIEM][3]을 모두 사용하는 Datadog 계정이 있어야 합니다.
3. 아직 설정하지 않았다면 Amazon Security Lake가 데이터를 저장하는 AWS 계정에 대해 [Amazon Web Services 통합][4]을 설정하세요.

**참고:** Amazon Security Lake 통합을 사용하기 위해 이 AWS 계정만 통합하려는 경우 [AWS 통합 페이지][5]에서 메트릭 수집을 비활성화할 수 있습니다. Datadog이 AWS 인프라스터럭처를 모니터링하지 않고 [인프라스트럭처 모니터링][6]에 대한 요금이 청구되지 않습니다.

### 로그 수집
1. Datadog이 보안 레이크에 추가된 새 로그 파일을 수집할 수 있도록 기존`DatadogIntegrationRole` IAM 역할에 다음 IAM 정책을 추가합니다.
{{< code-block lang="yaml" collapsible="true" >}}
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "DatadogSecurityLakeAccess",
          "Effect": "Allow",
          "Action": [
              "s3:GetObject"
          ],
          "Resource": "arn:aws:s3:::aws-security-data-lake-*"
      }
  ]
}
{{< /code-block >}}

2. Amazon Security Lake용 AWS 콘솔에서 Datadog에 대한 구독자를 생성하고 양식을 작성합니다. Amazon Security Lake 구독자에 대한 자세한 내용은 [Amazon Security Lake 사용자 가이드][1]를 참조하세요.
   - Subscriber name에 `Datadog`을 입력합니다.
   - Datadog에 전송하하기 위해 `All log and event sources` 또는 `Specific log and event sources`를 선택합니다.
   - 데이터 액세스 방법으로 `S3`를 선택합니다.

{{< site-region region="us,us3,us5,eu,gov" >}}
3. 동일한 양식에 구독자 크리덴셜을 입력합니다.
   - **Account ID**에 `464622532012`를 입력합니다.
   - **External ID**의 경우 새 탭을 열고 AWS 계정의 Datadog에서 [AWS Integration 페이지][7]로 이동합니다. **AWS External ID**는 **Account Details** 탭에 있습니다. 이를 복사하여 AWS의 양식에 붙여넣습니다.
   - **Subscriber role**에 `DatadogSecurityLakeRole`을 입력합니다. **참고:** 이 역할은 `DatadogIntegrationRole`이 1단계에서 필요한 권한을 갖기 때문에 Datadog에서는 실제로 사용되지 않습니다.
   - **API destination role**에 `DatadogSecurityLakeAPIDestinationRole`을 입력합니다.
   - **Subscription endpoint**의 경우 이 값은 사용 중인 [Datadog 사이트][8]에 따라 다릅니다.  <code>https://api.{{< region-param key="dd_site" >}}/api/intake/aws/securitylake</code>

     **참고:** 위 엔드포인트가 해당 지역을 반영하지 않는 경우 이 설명서 페이지 오른쪽에 있는 **Datadog site** 드롭다운 메뉴를 토글하여 지역을 전환하세요.
   - **HTTPS key name**에 `DD-API-KEY`를 입력합니다.
   - **HTTPS key value**의 경우 새 탭을 열고 Datadog의 [API Keys 페이지][9]로 이동하여 Datadog API 키를 찾거나 생성합니다. 이를 복사하여 AWS의 양식에 붙여넣습니다.

[7]: https://app.datadoghq.com/integrations/amazon-web-services?panel=account-details
[8]: https://docs.datadoghq.com/ko/getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

{{< site-region region="ap1" >}}
3. 동일한 양식에 구독자 크리덴셜을 입력합니다.
   - **Account ID**에 `417141415827`을 입력합니다.
   - **External ID**의 경우 새 탭을 열고 AWS 계정의 Datadog에서 [AWS Integration 페이지][7]로 이동합니다. **AWS External ID**는 **Account Details** 탭에 있습니다. 이를 복사하여 AWS의 양식에 붙여넣습니다.
   - **Subscriber role**에 `DatadogSecurityLakeRole`을 입력합니다. **참고:** 이 역할은 `DatadogIntegrationRole`이 1단계에서 필요한 권한을 갖기 때문에 Datadog에서는 실제로 사용되지 않습니다.
   - **API destination role**에 `DatadogSecurityLakeAPIDestinationRole`을 입력합니다.
   - **Subscription endpoint**의 경우 이 값은 사용 중인 [Datadog 사이트][8]에 따라 다릅니다.  <code>https://api.{{< region-param key="dd_site" >}}/api/intake/aws/securitylake</code>

     **참고:** 위 엔드포인트가 해당 지역을 반영하지 않는 경우 이 설명서 페이지 오른쪽에 있는 **Datadog site** 드롭다운 메뉴를 토글하여 지역을 전환하세요.
   - **HTTPS key name**에 `DD-API-KEY`를 입력합니다.
   - **HTTPS key value**의 경우 새 탭을 열고 Datadog의 [API Keys 페이지][9]로 이동하여 Datadog API 키를 찾거나 생성합니다. 이를 복사하여 AWS의 양식에 붙여넣습니다.

[7]: https://app.datadoghq.com/integrations/amazon-web-services?panel=account-details
[8]: https://docs.datadoghq.com/ko/getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

4. **Create**를 클릭하여 구독자 생성을 완료합니다.
5. 몇 분 정도 기다린 후 [Datadog의 로그 탐색기][7]에서 Amazon Security Lake의 로그 탐색을 시작합니다.

실시간 위협 탐지를 위해 이 통합을 사용하려면 [블로그][8]에서 자세한 방법을 확인하세요.

## 수집한 데이터

### 메트릭

Amazon Security Lake 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Amazon Security Lake 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon Security Lake 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

### 권한

[문제 해결 가이드][9]를 참고하여 AWS 계정이 Datadog에 대한 IAM 역할을 올바르게 설정했는지 확인하세요.

### 구독자 만들기

문제 해결 지침은 구독자 생성에 대한 [Amazon Security Lake 사용자 가이드][1]를 참고하세요.

도움이 필요하신가요? [Datadog 지원팀][10]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/security-lake/latest/userguide/
[2]: https://www.datadoghq.com/product/log-management/
[3]: https://www.datadoghq.com/product/cloud-security-management/cloud-siem/
[4]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[5]: https://app.datadoghq.com/integrations/amazon-web-services?panel=metric-collection
[6]: https://www.datadoghq.com/product/infrastructure-monitoring/
[7]: https://app.datadoghq.com/logs?query=source%3Aamazon-security-lake&cols=host%2Cservice%2C%40task_name%2C%40identity.user.type%2Caws.source%2C%40network.client.ip%2C%40identity.session.mfa%2C%40evt.name%2C%40connection_info.direction&index=%2A&messageDisplay=inline
[8]: https://www.datadoghq.com/blog/analyze-amazon-security-lake-logs-with-datadog
[9]: https://docs.datadoghq.com/ko/integrations/guide/error-datadog-not-authorized-sts-assume-role/#pagetitle
[10]: https://docs.datadoghq.com/ko/help/