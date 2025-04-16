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

**참고**: `datadog_integration_aws_account` 리소스가 Datadog Terraform 공급자 `3.50.0` 버전에서 `datadog_integration_aws` 리소스를 대체했습니다. `datadog_integration_aws` 리소스에서 업그레이드하려면 [datadog_integration_aws 리소스에서 업그레이드][3]를 참조하세요.

{{< site-region region="us,us3,us5,eu" >}}
2. 하단의 예시를 기본 템플릿으로 사용하여 Terraform 구성 파일을 설정합니다. 변경 사항을 적용하기 전에 다음과 같은 파라미터를 업데이트해야 합니다:
   * `AWS_PERMISSIONS_LIST`: Datadog AWS 통합에 필요한 IAM 정책입니다. 기존 목록은 [Datadog AWS 통합][1] 문서에서 확인할 수 있습니다.
   * `AWS_ACCOUNT_ID`: 귀하의 AWS 계정 ID입니다.

추가 예제 사용법과 선택적 파라미터의 전체 목록 및 추가 Datadog 리소스를 확인하려면 [Terraform 레지스트리][2]를 참조하세요.

```hcl
data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::464622532012:root"]
    }
    condition {
      test     = "StringEquals"
      variable = "sts:ExternalId"
      values = [
        "${datadog_integration_aws_account.datadog_integration.auth_config.aws_auth_config_role.external_id}"
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
  name   = "DatadogAWSIntegrationPolicy"
  policy = data.aws_iam_policy_document.datadog_aws_integration.json
}
resource "aws_iam_role" "datadog_aws_integration" {
  name               = "DatadogIntegrationRole"
  description        = "Role for Datadog AWS Integration"
  assume_role_policy = data.aws_iam_policy_document.datadog_aws_integration_assume_role.json
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
  role       = aws_iam_role.datadog_aws_integration.name
  policy_arn = aws_iam_policy.datadog_aws_integration.arn
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration_security_audit" {
  role       = aws_iam_role.datadog_aws_integration.name
  policy_arn = "arn:aws:iam::aws:policy/SecurityAudit"
}

resource "datadog_integration_aws_account" "datadog_integration" {
  account_tags   = []
  aws_account_id = "<ACCOUNT_ID>"
  aws_partition  = "aws"
  aws_regions {
    include_all = true
  }
  auth_config {
    aws_auth_config_role {
      role_name = "DatadogIntegrationRole"
    }
  }
    resources_config {
    cloud_security_posture_management_collection = true
    extended_collection                          = true
  }
  traces_config {
    xray_services {
    }
  }
    logs_config {
    lambda_forwarder {
    }
  }
  metrics_config {
    namespace_filters {
    }
  }
}
```

[1]: /ko/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_account
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
      type        = "AWS"
      identifiers = ["arn:aws:iam::417141415827:root"]
    }
    condition {
      test     = "StringEquals"
      variable = "sts:ExternalId"
      values = [
        "${datadog_integration_aws_account.datadog_integration.auth_config.aws_auth_config_role.external_id}"
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
  name   = "DatadogAWSIntegrationPolicy"
  policy = data.aws_iam_policy_document.datadog_aws_integration.json
}
resource "aws_iam_role" "datadog_aws_integration" {
  name               = "DatadogIntegrationRole"
  description        = "Role for Datadog AWS Integration"
  assume_role_policy = data.aws_iam_policy_document.datadog_aws_integration_assume_role.json
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
  role       = aws_iam_role.datadog_aws_integration.name
  policy_arn = aws_iam_policy.datadog_aws_integration.arn
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration_security_audit" {
  role       = aws_iam_role.datadog_aws_integration.name
  policy_arn = "arn:aws:iam::aws:policy/SecurityAudit"
}

resource "datadog_integration_aws_account" "datadog_integration" {
  account_tags   = []
  aws_account_id = "<ACCOUNT_ID>"
  aws_partition  = "aws"
  aws_regions {
    include_all = true
  }
  auth_config {
    aws_auth_config_role {
      role_name = "DatadogIntegrationRole"
    }
  }
    resources_config {
    cloud_security_posture_management_collection = true
    extended_collection                          = true
  }
  traces_config {
    xray_services {
    }
  }
    logs_config {
    lambda_forwarder {
    }
  }
  metrics_config {
    namespace_filters {
    }
  }
}
```

[1]: /ko/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

{{< site-region region="gov" >}}
2. 하단의 예시를 기본 템플릿으로 사용하여 Terraform 구성 파일을 설정합니다. 변경 사항을 적용하기 전에 다음과 같은 파라미터를 업데이트해야 합니다:
   * `AWS_PERMISSIONS_LIST`: Datadog AWS 통합에 필요한 IAM 정책입니다. 기존 목록은 [Datadog AWS 통합][1] 문서에서 확인할 수 있습니다.
   * `AWS_ACCOUNT_ID`: 귀하의 AWS 계정 ID입니다.

추가 예제 사용법과 선택적 파라미터의 전체 목록 및 추가 Datadog 리소스를 확인하려면 [Terraform 레지스트리][2]를 참조하세요.

```hcl
data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::065115117704:root"]
    }
    condition {
      test     = "StringEquals"
      variable = "sts:ExternalId"
      values = [
        "${datadog_integration_aws_account.datadog_integration.auth_config.aws_auth_config_role.external_id}"
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
  name   = "DatadogAWSIntegrationPolicy"
  policy = data.aws_iam_policy_document.datadog_aws_integration.json
}
resource "aws_iam_role" "datadog_aws_integration" {
  name               = "DatadogIntegrationRole"
  description        = "Role for Datadog AWS Integration"
  assume_role_policy = data.aws_iam_policy_document.datadog_aws_integration_assume_role.json
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
  role       = aws_iam_role.datadog_aws_integration.name
  policy_arn = aws_iam_policy.datadog_aws_integration.arn
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration_security_audit" {
  role       = aws_iam_role.datadog_aws_integration.name
  policy_arn = "arn:aws:iam::aws:policy/SecurityAudit"
}

resource "datadog_integration_aws_account" "datadog_integration" {
  account_tags   = []
  aws_account_id = "<ACCOUNT_ID>"
  aws_partition  = "aws"
  aws_regions {
    include_all = true
  }
  auth_config {
    aws_auth_config_role {
      role_name = "DatadogIntegrationRole"
    }
  }
    resources_config {
    cloud_security_posture_management_collection = true
    extended_collection                          = true
  }
  traces_config {
    xray_services {
    }
  }
    logs_config {
    lambda_forwarder {
    }
  }
  metrics_config {
    namespace_filters {
    }
  }
}
```

[1]: /ko/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

3. `terraform apply`를 실행하세요. 데이터 수집이 시작될 때까지 최대 10분 동안 기다린 다음 기본 [AWS 개요 대시보드][4]를 통해 AWS 서비스 및 인프라스트럭처에서 보낸 메트릭을 확인하세요.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.terraform.io
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_account#upgrading-from-datadog_integration_aws-resources
[4]: https://app.datadoghq.com/screen/integration/7/aws-overview
