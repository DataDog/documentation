---
aliases:
- /ko/integrations/faq/error-datadog-not-authorized-sts-assume-role
further_reading:
- link: /integrations/amazon_web_services/#installation
  tag: 설명서
  text: AWS Datadog 설치
title: '오류: Datadog가 sts:AssumeRole을 수핼할 권한이 없음'
---

이 오류는 보통 Datadog 통합 역할과 연결된 신뢰 정책에 문제가 있음을 나타냅니다. 대부분의 경우 이 문제는 [역할 위임 프로세스][1]에서 발생합니다.

오류에서 언급된 AWS 계정에서 다음 요소를 점검합니다.

{{< site-region region="us,us3,us5,eu,gov" >}}
1. IAM 역할을 생성한 경우 [Datadog AWS 통합 페이지][2]에서 올바른 IAM 역할 이름을 사용하고 있는지 확인하세요. AWS 또는 Datadog에 추가 공백 또는 문자를 사용하면 역할 위임이 실패합니다. CloudFormation을 사용하여 역할을 배포한 경우 기분 IAM 역할 이름은 [DatadogIntegrationRole][3]로 설정되어 있습니다.

2. AWS의 Datadog 통합 역할 페이지에서 **신뢰 관계** 탭에서 **기본 사항**이 아래와 같이 설정되어 있는지 확인합니다.

{{< code-block lang="json" filename="" disable_copy="true" collapsible="false" >}}

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::464622532012:root"
            },
            "Action": "sts:AssumeRole",
            "Condition": {
                "StringEquals": {
                    "sts:ExternalId": "<YOUR_AWS_EXTERNAL_ID>"
                }
            }
        }
    ]
}

{{< /code-block >}}

[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://github.com/DataDog/cloudformation-template/blob/master/aws/datadog_integration_role.yaml
{{< /site-region >}}
{{< site-region region="ap1" >}}
1. IAM 역할을 생성한 경우 [Datadog AWS 통합 페이지][2]에서 올바른 IAM 역할 이름을 사용하고 있는지 확인하세요. AWS 또는 Datadog에 추가 공백 또는 문자를 사용하면 역할 위임이 실패합니다. CloudFormation을 사용하여 역할을 배포한 경우 기분 IAM 역할 이름은 [DatadogIntegrationRole][3]로 설정되어 있습니다.

2. AWS의 Datadog 통합 역할 페이지에서 **신뢰 관계** 탭에서 **기본 사항**이 아래와 같이 설정되어 있는지 확인합니다.

{{< code-block lang="json" filename="" disable_copy="true" collapsible="false" >}}

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::417141415827:root"
            },
            "Action": "sts:AssumeRole",
            "Condition": {
                "StringEquals": {
                    "sts:ExternalId": "<YOUR_AWS_EXTERNAL_ID>"
                }
            }
        }
    ]
}

{{< /code-block >}}

[2]: https://ap1.datadoghq.com/integrations/amazon-web-services
[3]: https://github.com/DataDog/cloudformation-template/blob/master/aws/datadog_integration_role.yaml
{{< /site-region >}}

3. 역할 페이지의 AWS 외부 ID는 [AWS 통합 페이지][2]의 **계정 상세 정보** 탭에 있는 AWS 외부 ID 값과 일치해야 합니다. Datadog 통합 페이지에서 AWS 외부 ID 값을 사용해 AWS의 IAM 역할을 업데이트하거나 Datadog에서 새로운 AWS 외부 ID를 생성한 다음 **저장**을 클릭합니다.
  {{< img src="integrations/guide/aws_error_sts_assume_role/new-aws-external-id.png" alt="AWS 역할 이름 및 AWS 외부 ID 필드를 사용한 Datadog AWS 통합 페이지 및 새로운 ID 버튼 생성" >}}

4. 새로운 AWS 외부 ID를 생성한 경우 AWS 신뢰 정책에 추가합니다.
  {{< img src="integrations/guide/aws_error_sts_assume_role/aws-trust-policy-document.png" alt="강조 표시된 sts:ExternalId 파라미터를 포함하는 AWS 신뢰 정책 문서" >}}

**참고**: 오류는 변경 사항이 전파되는 동안 UI에서 몇 시간 정도 **지속될 수도 있습니다.**

하나 또는 몇몇 지역으로 제한된 STS AssumeRole 오류를 확인한 경우,
```
Datadog is not authorized to perform action sts:AssumeRole Account affected:<account_id> Regions affected: us-east-1, eu-west-1
```
문제의 원인은 [AWS 서비스 제어 정책][4]일 수 있습니다.
```
서비스 제어 정책(SCP)은 조직에서 권한을 관리하는 데 사용할 수 있는 조직 정책의 유형입니다. SCP는 조직에서 모든 계정에 대해 사용할 수 있는 최대 권한을 중앙에서 관리할 수 있도록 해줍니다. SCP는 조직 내 액세스 제어 가이드라인에 따라 계정을 보호할 수 있도록 지원합니다.
```

통합 페이지에서 오류를 제거하려면 **일반** 탭에서 AWS 통합 지역을 제외할 수 있습니다. 또는 [AWS 통합 업데이트][5] API를 사용할 수 있습니다.

도움이 필요하세요? [Datadog 지원팀][6]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/amazon_web_services/?tab=roledelegation#setup
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
[5]: https://docs.datadoghq.com/ko/api/latest/aws-integration/#update-an-aws-integration
[6]: /ko/help/