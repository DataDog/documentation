---
description: Datadog AWS 통합을 수동 설정하는 단계
further_reading:
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: 설명서
  text: AWS 통합
- link: https://docs.datadoghq.com/serverless/libraries_integrations/forwarder/
  tag: 설명서
  text: Datadog 포워더(Forwarder) Lambda 기능
- link: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
  tag: 길라잡이
  text: Datadog Amazon Data Firehose 대상으로 AWS 서비스 로그 보내기
- link: https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/
  tag: 길라잡이
  text: AWS 통합 문제 해결
- link: https://docs.datadoghq.com/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
  tag: 길라잡이
  text: Amazon Data Firehose를 사용한 AWS CloudWatch 메트릭 스트림
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: 블로그
  text: AWS 모니터링의 주요 메트릭
- link: https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog/
  tag: 블로그
  text: Datadog으로 EC2 인스턴스를 모니터링하는 방법
- link: https://www.datadoghq.com/blog/monitoring-aws-lambda-with-datadog/
  tag: 블로그
  text: Datadog으로 AWS Lambda 모니터링
- link: https://www.datadoghq.com/blog/cloud-security-posture-management/
  tag: 블로그
  text: Datadog 클라우드 보안 상태 관리 소개
- link: https://www.datadoghq.com/blog/datadog-workload-security/
  tag: 블로그
  text: Datadog 클라우드 워크로드 보안을 통해 실시간으로 인프라스트럭처 보호
- link: https://www.datadoghq.com/blog/announcing-cloud-siem/
  tag: 블로그
  text: Datadog 보안 모니터링 공지
- link: https://www.datadoghq.com/blog/tagging-best-practices/#aws
  tag: 블로그
  text: 인프라스트럭처와 애플리케이션 태깅의 모범 사례
kind: 지침
title: AWS 매뉴얼 설정 가이드
---

## 개요

이 가이드를 사용하여 Datadog [AWS 통합][1]을 수동으로 설정합니다.

{{< tabs >}}
{{% tab "Role delegation" %}}

AWS 통합을 수동으로 설정하려면 AWS 계정에서 IAM 정책 및 IAM 역할을 생성하고 Datadog 계정에 생성된 AWS 외부 ID로 역할을 설정합니다. 이를 통해 Datadog의 AWS 계정이 사용자 대신 AWS API를 쿼리하고 데이터를 Datadog 계정으로 가져올 수 있습니다. 아래 섹션에서는 이러한 각 구성 요소를 생성한 후 Datadog 계정에서 설정을 완료하는 단계까지 자세히 설명합니다.

## 설정

### 외부 ID 생성

1. [AWS 통합 설정 페이지][1]에서 **Add AWS Account**를 클릭한 다음 **Manually**을 선택합니다.
2. 액세스 유형으로 `Role Delegation`을 선택하고 `AWS External ID`을 복사합니다. 외부 ID에 대한 자세한 내용은 [IAM 사용자 지침][2]을 참조하세요.
  **참고:** 해당 기간 동안 사용자가 명시적으로 변경하거나 다른 AWS 계정을 Datadog에 추가하지 않는 한, 외부 ID는 48시간 동안 사용 가능하며 재생성되지 않습니다. 이 기간 내에 **새 AWS 계정 추가** 페이지에서 외부 ID 변경 없이 계정 추가 프로세스를 완료할 수 있습니다.

### Datadog의 AWS IAM 정책
Datadog에서 제공하는 모든 AWS 통합을 활용하려면 [필수 권한](#aws-integration-iam-policy)을 사용하여 AWS 계정에 Datadog 역할에 대한 IAM 정책을 생성합니다. 다른 구성 요소가 통합에 추가되면 이러한 권한이 변경될 수 있습니다.

3. AWS [IAM 콘솔][3]에서 새 정책을 생성합니다.
4. **JSON** 탭을 선택하고 [권한 정책](#aws-integration-iam-policy)을 텍스트 상자에 붙여 넣습니다.
  **참고**: 옵션으로 IAM 정책에 [조건][7] 요소를 추가할 수 있습니다. 예를 들어, 조건을 사용하여 [모니터링을 특정 지역으로 제한][8]할 수 있습니다.
5. **Next: Tags**와 **Next: Review**를 클릭합니다.
6. 정책 이름을 `DatadogIntegrationPolicy` 또는 원하는 이름으로 지정하고 적절한 설명을 제공합니다. 
7. **Create policy**을 클릭합니다.

### Datadog에 대한 AWS IAM 역할
Datadog이 IAM 정책에 정의된 권한을 사용할 수 있도록 IAM 역할을 만듭니다.

8. AWS [IAM 콘솔][4]에서 새 역할을 생성합니다.
9. 신뢰할 수 있는 엔티티 유형에 대해 **AWS account**을 선택하고 **Another AWS account**을 선택합니다.
{{< site-region region="us,us3,us5,eu" >}}
10. `Account ID`로 `464622532012`를 입력합니다. Datadog의 계정 ID이며, Datadog에게 AWS 데이터에 대한 액세스 권한을 부여합니다.
{{< /site-region >}}
{{< site-region region="ap1" >}}
10. `Account ID`로 `417141415827`를 입력합니다. Datadog의 계정 ID이며, Datadog에게 AWS 데이터에 대한 액세스 권한을 부여합니다.
{{< /site-region >}}
{{< site-region region="gov" >}}
10. 통합하려는 AWS 계정이 GovCloud 계정인 경우 `065115117704`를 `Account ID`로 입력하고, 그렇지 않으면 `392588925713`을 입력합니다. 이는 Datadog의 계정 ID이며 Datadog에게 AWS 데이터에 대한 액세스 권한을 부여합니다.
{{< /site-region >}}
11. **Require external ID**를 선택하고 [외부 ID 생성](#generate-an-external-id) 섹션에 복사된 외부 ID를 입력합니다.
`Require MFA`를 사용하지 않도록 설정하세요. 자세한 내용은 [제3자에게 AWS 리소스 액세스 권한 부여 시 외부 ID를 사용하는 방법][2] AWS 설명서를 참조하세요.
12. **Next**를 클릭합니다.
13. 정책을 이미 만든 경우 이 페이지에서 정책을 검색하고 선택합니다. 그렇지 않으면 새 창에서 열리는 **Create Policy**를 클릭하고 이전 섹션의 지침을 따릅니다.
14. (선택 사항)<a href="https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit" target="_blank">AWS 보안감사 정책</a>을 역할에 연결하여 [Cloud Security Management Misconfiguration][5]을 사용할 수 있습니다.
15. **Next**를 클릭합니다.
16. 적절한 설명과 함께 `DatadogIntegrationRole`와 같은 이름을 지정합니다.
17. **Create Role**을 클릭합니다.

### Datadog에서 설정 완료

18. 다른 탭에서 열었던 계정을 Datadog에 수동으로 추가하려면 AWS 통합 설정 페이지로 돌아갑니다. Datadog IAM 역할이 AWS 계정에 추가되었는지 확인하려면 체크박스를 클릭합니다.
19. `123456789012`와 같이 계정 ID를 **대시 없이**입력합니다. 계정 ID는 Datadog에 대해 생성된 역할의 ARN에서 확인할 수 있습니다.
20. 이전 섹션에서 만든 역할의 이름을 입력하고 **저장**을 클릭합니다.
  **참고**: 통합 타일에 입력하는 역할 이름은 대소문자를 구분하며, AWS의 역할 이름과 정확히 일치해야 합니다.
21. 만약 [Datadog이 sts:AssumeRole 작업을 수행할 권한이 없음][6] 오류가 발생한다면, UI에서 권장하는 문제 해결 단계를 따르거나 [문제 해결 가이드][6]를 참조하세요.
22. 데이터 수집이 시작될 때까지 최대 10분 정도 기다린 후 사용 가능한 <a href="https://app.datadoghq.com/screen/integration/7/aws-overview" target="_blank">AWS 개요 대시보드</a>를 통해 AWS 서비스 및 인프라스트럭처에서 전송된 메트릭을 확인합니다.


[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[3]: https://console.aws.amazon.com/iam/home#/policies
[4]: https://console.aws.amazon.com/iam/home#/roles
[5]: /ko/security/cloud_security_management/misconfigurations/
[6]: /ko/integrations/guide/error-datadog-not-authorized-sts-assume-role/
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_condition.html
[8]: https://aws.amazon.com/blogs/security/easier-way-to-control-access-to-aws-regions-using-iam-policies/
{{% /tab %}}
{{% tab "Access keys (GovCloud or China Only)" %}}

## 설정

### AWS

1. AWS 콘솔에서 [필수 권한](#aws-integration-iam-policy)을 사용하여 Datadog 통합에 사용할 IAM 사용자를 생성합니다.
2. Datadog 통합 IAM 사용자용 액세스 키와 시크릿 키를 생성하세요.

### Datadog

3. [AWS 통합 타일][1]에서 **Add AWS Account**를 클릭한 다음 **Manually**을 선택합니다.
4. **Access Keys (GovCloud or China\* Only)** 탭을 선택합니다.
5. **Datadog 통합의 IAM 사용자가 AWS 계정에 추가되었음을 확인합니다** 체크박스를 클릭합니다.
6. `Account ID`, `AWS Access Key`, `AWS Secret Key`를 입력합니다. GovCloud 및 China에 대한 액세스 및 보안 키만 허용됩니다.
7. **저장**을 클릭합니다.
8. 데이터 수집이 시작될 때까지 최대 10분 정도 기다린 후 사용 가능한 <a href="https://app.datadoghq.com/screen/integration/7/aws-overview" target="_blank">AWS 개요 대시보드</a>를 통해 AWS 서비스 및 인프라스트럭처에서 전송된 메트릭을 확인합니다.

\* _중국 본토에서(또는 내부 환경과 관련된) Datadog 서비스의 모든 사용에는 당사 웹사이트의 [Restricted Service Locations][2] 섹션에 게시된 면책 조항이 적용됩니다._

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://www.datadoghq.com/legal/restricted-service-locations/
{{% /tab %}}
{{< /tabs >}}

{{% aws-permissions %}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/amazon_web_services/