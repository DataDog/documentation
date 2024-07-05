---
aliases:
- /ko/integrations/faq/aws-integration-with-terraform/
disable_toc: true
further_reading:
- link: https://www.datadoghq.com/blog/managing-datadog-with-terraform/
  tag: 블로그
  text: Terraform으로 Datadog 관리
title: Terraform과 AWS 통합
---

[Terraform][1]을 사용하면 단일 `terraform apply` 명령만으로도 Datadog IAM 역할, 정책 문서 및 Datadog-AWS 통합을 생성할 수 있습니다.


1. Terraform 구성을 통해 Datadog API와 상호 작용할 수 있도록 [Datadog Terraform 공급자][2]를 설정합니다.

{{< site-region region="us,us3,us5,eu" >}}

2. 하단의 예시를 기본 템플릿으로 사용하여 Terraform 구성 파일을 설정합니다. 변경 사항을 적용하기 전에 다음과 같은 파라미터를 업데이트해야 합니다:
   * `AWS_PERMISSIONS_LIST`: Datadog AWS 통합에 필요한 IAM 정책입니다. 기존 목록은 [Datadog AWS 통합][1] 문서에서 확인할 수 있습니다.
   * `AWS_ACCOUNT_ID`: 귀하의 AWS 계정 ID입니다.

   추가 예제 사용법과 선택적 파라미터의 전체 목록 및 추가 Datadog 리소스를 확인하려면 Terraform 레지스트리의 [Datadog AWS 통합 리소스][2] 페이지를 참조하세요.

   ```hcl
   data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
      statement {
      actions = ["sts:AssumeRole"]

      principals {
         type = "AWS"
         identifiers = ["arn:aws:iam::464622532012:root"]
      }
      condition {
         test = "StringEquals"
         variable = "sts:ExternalId"

         values = [
            "${datadog_integration_aws.sandbox.external_id}"
         ]
      }
      }
   }

   data "aws_iam_policy_document" "datadog_aws_integration" {
      statement {
      actions = [<AWS_PERMISSIONS_LIST>]

      resources = ["*"]
      }
   }

   resource "aws_iam_policy" "datadog_aws_integration" {
      name = "DatadogAWSIntegrationPolicy"
      policy = "${data.aws_iam_policy_document.datadog_aws_integration.json}"
   }

   resource "aws_iam_role" "datadog_aws_integration" {
      name = "DatadogAWSIntegrationRole"
      description = "Role for Datadog AWS Integration"
      assume_role_policy = "${data.aws_iam_policy_document.datadog_aws_integration_assume_role.json}"
   }

   resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
      role = "${aws_iam_role.datadog_aws_integration.name}"
      policy_arn = "${aws_iam_policy.datadog_aws_integration.arn}"
   }

   resource "datadog_integration_aws" "sandbox" {
      account_id  = "<AWS_ACCOUNT_ID>"
      role_name   = "DatadogAWSIntegrationRole"
   }
   ```

   [1]: /integrations/amazon_web_services/?tab=manual#aws-iam-permissions
   [2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

{{< site-region region="ap1" >}}

2. 하단의 예시를 기본 템플릿으로 사용하여 Terraform 구성 파일을 설정합니다. 변경 사항을 적용하기 전에 다음과 같은 파라미터를 업데이트해야 합니다:
   * `AWS_PERMISSIONS_LIST`: Datadog AWS 통합에 필요한 IAM 정책입니다. 기존 목록은 [Datadog AWS 통합][1] 문서에서 확인할 수 있습니다.
   * `AWS_ACCOUNT_ID`: 귀하의 AWS 계정 ID입니다.

   추가 예제 사용법과 선택적 파라미터의 전체 목록 및 추가 Datadog 리소스를 확인하려면 [Terraform 레지스트리][2]를 참조하세요.

   ```hcl
   data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
      statement {
      actions = ["sts:AssumeRole"]

      principals {
         type = "AWS"
         identifiers = ["arn:aws:iam::417141415827:root"]
      }
      condition {
         test = "StringEquals"
         variable = "sts:ExternalId"

         values = [
            "${datadog_integration_aws.sandbox.external_id}"
         ]
      }
      }
   }

   data "aws_iam_policy_document" "datadog_aws_integration" {
      statement {
      actions = [<AWS_PERMISSIONS_LIST>]

      resources = ["*"]
      }
   }

   resource "aws_iam_policy" "datadog_aws_integration" {
      name = "DatadogAWSIntegrationPolicy"
      policy = "${data.aws_iam_policy_document.datadog_aws_integration.json}"
   }

   resource "aws_iam_role" "datadog_aws_integration" {
      name = "DatadogAWSIntegrationRole"
      description = "Role for Datadog AWS Integration"
      assume_role_policy = "${data.aws_iam_policy_document.datadog_aws_integration_assume_role.json}"
   }

   resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
      role = "${aws_iam_role.datadog_aws_integration.name}"
      policy_arn = "${aws_iam_policy.datadog_aws_integration.arn}"
   }

   resource "datadog_integration_aws" "sandbox" {
      account_id  = "<AWS_ACCOUNT_ID>"
      role_name   = "DatadogAWSIntegrationRole"
   }
   ```

[1]: /ko/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

{{< site-region region="gov" >}}

2. 액세스 키를 사용하여 Datadog AWS 통합을 설치하려면 [AWS 수동 설정 가이드][3]에 명시된 대로 [필수 권한][1]과 액세스 키를 보유한 IAM 사용자를 생성했는지 확인합니다. 하단 예시의 플레이스홀더에 액세스 키 ID와 보안 액세스 키를 추가합니다. Terraform을 사용하여 AWS 사용자와 관련 액세스 키를 설정하는 방법에 대한 자세한 내용은 Terraform 레지스트리의 [AWS 공급자][2] 리소스를 참조하세요.

   ```
   resource "datadog_integration_aws" "sandbox" {
      access_key_id = "<ACCESS_KEY_ID>"
      secret_access_key = "<SECRET_ACCESS_KEY>"
   }
   ```

[1]: /ko/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly#aws-integration-iam-policy
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs
[3]: /ko/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly#aws
{{< /site-region>}}

3. `terraform apply`을 실행합니다. 데이터 수집 시작까지 최대 10분간 기다린 후, 즉시 사용 가능한 [AWS 개요 대시보드][5]를 통하여 AWS 서비스 및 인프라스트럭처에서 전송한 메트릭을 확인합니다.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.terraform.io
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[5]: https://app.datadoghq.com/screen/integration/7/aws-overview