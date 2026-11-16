---
aliases:
- /ja/integrations/faq/aws-integration-with-terraform/
description: Terraform を使用して、IAM ロールおよびインテグレーションリソースを含む Datadog-AWS インテグレーションを設定します。
disable_toc: true
further_reading:
- link: https://www.datadoghq.com/architecture/a-guide-to-integrating-100-aws-accounts-with-datadog/
  tag: Architecture Center
  text: Datadog で 100 以上の AWS アカウントを統合するためのガイド
- link: https://www.datadoghq.com/blog/managing-datadog-with-terraform/
  tag: ブログ
  text: Datadog を Terraform で管理する
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: ラーニングセンター
  text: Datadog で Serverless Monitoring 用 AWS Lambda を構成する
title: Terraform による AWS インテグレーション
---
[Terraform][1] を使うと、Datadog IAM ロール、ポリシードキュメント、Datadog-AWS インテグレーションを 1 つの `terraform apply` コマンドで作成できます。

1. [Datadog Terraform プロバイダー][2] を構成して、Terraform の構成で Datadog API と対話するように設定します。
    * まだ設定していない場合は、`api_url` を Datadog サイトの API URL に設定してください。
    * **注**: `datadog_integration_aws_account` リソースは、Datadog Terraform プロバイダーのバージョン `datadog_integration_aws` で `3.50.0` リソースに置き換えられました。`datadog_integration_aws` リソースからアップグレードする方法については、[datadog_integration_aws resources からのアップグレード][3] を参照してください。

{{< site-region region="us,us3,us5,eu" >}}
2. 以下の例を基本テンプレートとして、Terraform の構成ファイルを設定します。変更を適用する前に、下記のパラメーターを確実に更新してください。
   * `AWS_ACCOUNT_ID`: AWS アカウント ID。

さらなる使用例やオプションパラメーターの全リスト、Datadog の追加リソースについては、[Terraform Registry][2] を参照してください。

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

data "datadog_integration_aws_iam_permissions" "datadog_permissions" {}

locals {
  all_permissions = data.datadog_integration_aws_iam_permissions.datadog_permissions.iam_permissions

  max_policy_size = 6144
  target_chunk_size = 5900

  permission_sizes = [
    for perm in local.all_permissions :
    length(perm) + 3
  ]
  cumulative_sizes = [
    for i in range(length(local.permission_sizes)) :
    sum(slice(local.permission_sizes, 0, i + 1))
  ]

  chunk_assignments = [
    for cumulative_size in local.cumulative_sizes :
    floor(cumulative_size / local.target_chunk_size)
  ]
  chunk_numbers = distinct(local.chunk_assignments)
  permission_chunks = [
    for chunk_num in local.chunk_numbers : [
      for i, perm in local.all_permissions :
      perm if local.chunk_assignments[i] == chunk_num
    ]
  ]
}

data "aws_iam_policy_document" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  statement {
    actions   = local.permission_chunks[count.index]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  name   = "DatadogAWSIntegrationPolicy-${count.index + 1}"
  policy = data.aws_iam_policy_document.datadog_aws_integration[count.index].json
}
resource "aws_iam_role" "datadog_aws_integration" {
  name               = "DatadogIntegrationRole"
  description        = "Role for Datadog AWS Integration"
  assume_role_policy = data.aws_iam_policy_document.datadog_aws_integration_assume_role.json
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  role       = aws_iam_role.datadog_aws_integration.name
  policy_arn = aws_iam_policy.datadog_aws_integration[count.index].arn
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
    cloud_security_posture_management_collection = false
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

<div class="alert alert-info">デフォルトでは、上記の構成に Cloud Security は含まれていません。Cloud Security を有効にするには、 <code>resources_config</code>で <code>cloud_security_posture_management_collection = true</code>を設定します。</div>

[1]: /ja/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_account
{{< /site-region >}}

{{< site-region region="uk1" >}}
2. 以下の例を基本テンプレートとして、Terraform の構成ファイルを設定します。変更を適用する前に、下記のパラメーターを確実に更新してください。
   * `AWS_ACCOUNT_ID`: AWS アカウント ID。

さらなる使用例やオプションパラメーターの全リスト、Datadog の追加リソースについては、[Terraform Registry][2] を参照してください。

```hcl
data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::117348461845:root"]
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

data "datadog_integration_aws_iam_permissions" "datadog_permissions" {}

locals {
  all_permissions = data.datadog_integration_aws_iam_permissions.datadog_permissions.iam_permissions

  max_policy_size = 6144
  target_chunk_size = 5900

  permission_sizes = [
    for perm in local.all_permissions :
    length(perm) + 3
  ]
  cumulative_sizes = [
    for i in range(length(local.permission_sizes)) :
    sum(slice(local.permission_sizes, 0, i + 1))
  ]

  chunk_assignments = [
    for cumulative_size in local.cumulative_sizes :
    floor(cumulative_size / local.target_chunk_size)
  ]
  chunk_numbers = distinct(local.chunk_assignments)
  permission_chunks = [
    for chunk_num in local.chunk_numbers : [
      for i, perm in local.all_permissions :
      perm if local.chunk_assignments[i] == chunk_num
    ]
  ]
}

data "aws_iam_policy_document" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  statement {
    actions   = local.permission_chunks[count.index]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  name   = "DatadogAWSIntegrationPolicy-${count.index + 1}"
  policy = data.aws_iam_policy_document.datadog_aws_integration[count.index].json
}
resource "aws_iam_role" "datadog_aws_integration" {
  name               = "DatadogIntegrationRole"
  description        = "Role for Datadog AWS Integration"
  assume_role_policy = data.aws_iam_policy_document.datadog_aws_integration_assume_role.json
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  role       = aws_iam_role.datadog_aws_integration.name
  policy_arn = aws_iam_policy.datadog_aws_integration[count.index].arn
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
    cloud_security_posture_management_collection = false
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

<div class="alert alert-info">デフォルトでは、上記の構成に Cloud Security は含まれていません。Cloud Security を有効にするには、 <code>resources_config</code>で <code>cloud_security_posture_management_collection = true</code>を設定します。</div>

[1]: /ja/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_account
{{< /site-region >}}

{{< site-region region="ap1" >}}
2. 以下の例を基本テンプレートとして、Terraform の構成ファイルを設定します。変更を適用する前に、下記のパラメーターを確実に更新してください。
   * `AWS_ACCOUNT_ID`: AWS アカウント ID。

さらなる使用例やオプションパラメーターの全リスト、Datadog の追加リソースについては、[Terraform Registry][2] を参照してください。

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

data "datadog_integration_aws_iam_permissions" "datadog_permissions" {}

locals {
  all_permissions = data.datadog_integration_aws_iam_permissions.datadog_permissions.iam_permissions

  max_policy_size = 6144
  target_chunk_size = 5900

  permission_sizes = [
    for perm in local.all_permissions :
    length(perm) + 3
  ]
  cumulative_sizes = [
    for i in range(length(local.permission_sizes)) :
    sum(slice(local.permission_sizes, 0, i + 1))
  ]

  chunk_assignments = [
    for cumulative_size in local.cumulative_sizes :
    floor(cumulative_size / local.target_chunk_size)
  ]
  chunk_numbers = distinct(local.chunk_assignments)
  permission_chunks = [
    for chunk_num in local.chunk_numbers : [
      for i, perm in local.all_permissions :
      perm if local.chunk_assignments[i] == chunk_num
    ]
  ]
}

data "aws_iam_policy_document" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  statement {
    actions   = local.permission_chunks[count.index]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  name   = "DatadogAWSIntegrationPolicy-${count.index + 1}"
  policy = data.aws_iam_policy_document.datadog_aws_integration[count.index].json
}
resource "aws_iam_role" "datadog_aws_integration" {
  name               = "DatadogIntegrationRole"
  description        = "Role for Datadog AWS Integration"
  assume_role_policy = data.aws_iam_policy_document.datadog_aws_integration_assume_role.json
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  role       = aws_iam_role.datadog_aws_integration.name
  policy_arn = aws_iam_policy.datadog_aws_integration[count.index].arn
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
    cloud_security_posture_management_collection = false
    extended_collection                          = true
  }

  # Optionally, specify services to include for X-Ray tracing
  traces_config {
    xray_services {
    }
  }

  # Optionally, specify the ARN of the Datadog Forwarder Lambda function and sources to enable for automatic log collection
  logs_config {
    lambda_forwarder {
    }
  }

  # Optionally, specify namespaces to exclude from metric collection
  metrics_config {
    namespace_filters {
    }
  }
}
```

<div class="alert alert-info">デフォルトでは、上記の構成に Cloud Security は含まれていません。Cloud Security を有効にするには、 <code>resources_config</code>で <code>cloud_security_posture_management_collection = true</code>を設定します。</div>

[1]: /ja/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

{{< site-region region="ap2" >}}
2. 以下の例を基本テンプレートとして、Terraform の構成ファイルを設定します。変更を適用する前に、下記のパラメーターを確実に更新してください。
   * `AWS_ACCOUNT_ID`: AWS アカウント ID。

さらなる使用例やオプションパラメーターの全リスト、Datadog の追加リソースについては、[Terraform Registry][2] を参照してください。

```hcl
data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::412381753143:root"]
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

data "datadog_integration_aws_iam_permissions" "datadog_permissions" {}

locals {
  all_permissions = data.datadog_integration_aws_iam_permissions.datadog_permissions.iam_permissions

  max_policy_size = 6144
  target_chunk_size = 5900

  permission_sizes = [
    for perm in local.all_permissions :
    length(perm) + 3
  ]
  cumulative_sizes = [
    for i in range(length(local.permission_sizes)) :
    sum(slice(local.permission_sizes, 0, i + 1))
  ]

  chunk_assignments = [
    for cumulative_size in local.cumulative_sizes :
    floor(cumulative_size / local.target_chunk_size)
  ]
  chunk_numbers = distinct(local.chunk_assignments)
  permission_chunks = [
    for chunk_num in local.chunk_numbers : [
      for i, perm in local.all_permissions :
      perm if local.chunk_assignments[i] == chunk_num
    ]
  ]
}

data "aws_iam_policy_document" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  statement {
    actions   = local.permission_chunks[count.index]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  name   = "DatadogAWSIntegrationPolicy-${count.index + 1}"
  policy = data.aws_iam_policy_document.datadog_aws_integration[count.index].json
}
resource "aws_iam_role" "datadog_aws_integration" {
  name               = "DatadogIntegrationRole"
  description        = "Role for Datadog AWS Integration"
  assume_role_policy = data.aws_iam_policy_document.datadog_aws_integration_assume_role.json
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  role       = aws_iam_role.datadog_aws_integration.name
  policy_arn = aws_iam_policy.datadog_aws_integration[count.index].arn
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
    cloud_security_posture_management_collection = false
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

<div class="alert alert-info">デフォルトでは、上記の構成に Cloud Security は含まれていません。Cloud Security を有効にするには、 <code>resources_config</code>で <code>cloud_security_posture_management_collection = true</code>を設定します。</div>

[1]: /ja/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

{{< site-region region="uk1" >}}
2. 以下の例を基本テンプレートとして、Terraform の構成ファイルを設定します。変更を適用する前に、下記のパラメーターを確実に更新してください。
   * `AWS_ACCOUNT_ID`: AWS アカウント ID。

さらなる使用例やオプションパラメーターの全リスト、Datadog の追加リソースについては、[Terraform Registry][2] を参照してください。

```hcl
data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::117348461845:root"]
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

data "datadog_integration_aws_iam_permissions" "datadog_permissions" {}

locals {
  all_permissions = data.datadog_integration_aws_iam_permissions.datadog_permissions.iam_permissions

  max_policy_size = 6144
  target_chunk_size = 5900

  permission_sizes = [
    for perm in local.all_permissions :
    length(perm) + 3
  ]
  cumulative_sizes = [
    for i in range(length(local.permission_sizes)) :
    sum(slice(local.permission_sizes, 0, i + 1))
  ]

  chunk_assignments = [
    for cumulative_size in local.cumulative_sizes :
    floor(cumulative_size / local.target_chunk_size)
  ]
  chunk_numbers = distinct(local.chunk_assignments)
  permission_chunks = [
    for chunk_num in local.chunk_numbers : [
      for i, perm in local.all_permissions :
      perm if local.chunk_assignments[i] == chunk_num
    ]
  ]
}

data "aws_iam_policy_document" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  statement {
    actions   = local.permission_chunks[count.index]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  name   = "DatadogAWSIntegrationPolicy-${count.index + 1}"
  policy = data.aws_iam_policy_document.datadog_aws_integration[count.index].json
}
resource "aws_iam_role" "datadog_aws_integration" {
  name               = "DatadogIntegrationRole"
  description        = "Role for Datadog AWS Integration"
  assume_role_policy = data.aws_iam_policy_document.datadog_aws_integration_assume_role.json
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  role       = aws_iam_role.datadog_aws_integration.name
  policy_arn = aws_iam_policy.datadog_aws_integration[count.index].arn
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
    cloud_security_posture_management_collection = false
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

<div class="alert alert-info">デフォルトでは、上記の構成に Cloud Security は含まれていません。Cloud Security を有効にするには、 <code>resources_config</code>で <code>cloud_security_posture_management_collection = true</code>を設定します。</div>

[1]: /ja/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

{{< site-region region="gov" >}}
2. AWS アカウントタイプのタブを選択し、以下の例をテンプレートとして使用して、Terraform 構成ファイルを設定します。変更を適用する前に、下記のパラメーターを確実に更新してください。
   * `AWS_ACCOUNT_ID`: AWS アカウント ID。

{{< tabs >}}

{{% tab "AWS Commercial Cloud" %}}

```hcl
data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::392588925713:root"]
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

data "datadog_integration_aws_iam_permissions" "datadog_permissions" {}

locals {
  all_permissions = data.datadog_integration_aws_iam_permissions.datadog_permissions.iam_permissions

  max_policy_size = 6144
  target_chunk_size = 5900

  permission_sizes = [
    for perm in local.all_permissions :
    length(perm) + 3
  ]
  cumulative_sizes = [
    for i in range(length(local.permission_sizes)) :
    sum(slice(local.permission_sizes, 0, i + 1))
  ]

  chunk_assignments = [
    for cumulative_size in local.cumulative_sizes :
    floor(cumulative_size / local.target_chunk_size)
  ]
  chunk_numbers = distinct(local.chunk_assignments)
  permission_chunks = [
    for chunk_num in local.chunk_numbers : [
      for i, perm in local.all_permissions :
      perm if local.chunk_assignments[i] == chunk_num
    ]
  ]
}

data "aws_iam_policy_document" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  statement {
    actions   = local.permission_chunks[count.index]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  name   = "DatadogAWSIntegrationPolicy-${count.index + 1}"
  policy = data.aws_iam_policy_document.datadog_aws_integration[count.index].json
}
resource "aws_iam_role" "datadog_aws_integration" {
  name               = "DatadogIntegrationRole"
  description        = "Role for Datadog AWS Integration"
  assume_role_policy = data.aws_iam_policy_document.datadog_aws_integration_assume_role.json
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  role       = aws_iam_role.datadog_aws_integration.name
  policy_arn = aws_iam_policy.datadog_aws_integration[count.index].arn
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
    cloud_security_posture_management_collection = false
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

{{% /tab %}}

{{% tab "AWS GovCloud" %}}

```hcl
data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "AWS"
      identifiers = ["arn:aws-us-gov:iam::065115117704:root"]
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

data "datadog_integration_aws_iam_permissions" "datadog_permissions" {}

locals {
  all_permissions = data.datadog_integration_aws_iam_permissions.datadog_permissions.iam_permissions

  max_policy_size = 6144
  target_chunk_size = 5900

  permission_sizes = [
    for perm in local.all_permissions :
    length(perm) + 3
  ]
  cumulative_sizes = [
    for i in range(length(local.permission_sizes)) :
    sum(slice(local.permission_sizes, 0, i + 1))
  ]

  chunk_assignments = [
    for cumulative_size in local.cumulative_sizes :
    floor(cumulative_size / local.target_chunk_size)
  ]
  chunk_numbers = distinct(local.chunk_assignments)
  permission_chunks = [
    for chunk_num in local.chunk_numbers : [
      for i, perm in local.all_permissions :
      perm if local.chunk_assignments[i] == chunk_num
    ]
  ]
}

data "aws_iam_policy_document" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  statement {
    actions   = local.permission_chunks[count.index]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  name   = "DatadogAWSIntegrationPolicy-${count.index + 1}"
  policy = data.aws_iam_policy_document.datadog_aws_integration[count.index].json
}
resource "aws_iam_role" "datadog_aws_integration" {
  name               = "DatadogIntegrationRole"
  description        = "Role for Datadog AWS Integration"
  assume_role_policy = data.aws_iam_policy_document.datadog_aws_integration_assume_role.json
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  role       = aws_iam_role.datadog_aws_integration.name
  policy_arn = aws_iam_policy.datadog_aws_integration[count.index].arn
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration_security_audit" {
  role       = aws_iam_role.datadog_aws_integration.name
  policy_arn = "arn:aws-us-gov:iam::aws:policy/SecurityAudit"
}

resource "datadog_integration_aws_account" "datadog_integration" {
  account_tags   = []
  aws_account_id = "<ACCOUNT_ID>"
  aws_partition  = "aws-us-gov"
  aws_regions {
    include_all = true
  }
  auth_config {
    aws_auth_config_role {
      role_name = "DatadogIntegrationRole"
    }
  }
  resources_config {
    cloud_security_posture_management_collection = false
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

{{% /tab %}}

{{< /tabs >}}

さらなる使用例やオプションパラメーターの全リスト、Datadog の追加リソースについては、[Terraform Registry][2] を参照してください。

<div class="alert alert-info">デフォルトでは、上記の構成に Cloud Security は含まれていません。Cloud Security を有効にするには、 <code>resources_config</code>で <code>cloud_security_posture_management_collection = true</code>を設定します。</div>

[1]: /ja/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

{{< site-region region="gov2" >}}
2. AWS アカウントタイプのタブを選択し、以下の例をテンプレートとして使用して、Terraform 構成ファイルを設定します。変更を適用する前に、下記のパラメーターを確実に更新してください。
   * `AWS_ACCOUNT_ID`: AWS アカウント ID。

{{< tabs >}}

{{% tab "AWS Commercial Cloud" %}}

```hcl
data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::382742775718:root"]
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

data "datadog_integration_aws_iam_permissions" "datadog_permissions" {}

locals {
  all_permissions = data.datadog_integration_aws_iam_permissions.datadog_permissions.iam_permissions

  max_policy_size = 6144
  target_chunk_size = 5900

  permission_sizes = [
    for perm in local.all_permissions :
    length(perm) + 3
  ]
  cumulative_sizes = [
    for i in range(length(local.permission_sizes)) :
    sum(slice(local.permission_sizes, 0, i + 1))
  ]

  chunk_assignments = [
    for cumulative_size in local.cumulative_sizes :
    floor(cumulative_size / local.target_chunk_size)
  ]
  chunk_numbers = distinct(local.chunk_assignments)
  permission_chunks = [
    for chunk_num in local.chunk_numbers : [
      for i, perm in local.all_permissions :
      perm if local.chunk_assignments[i] == chunk_num
    ]
  ]
}

data "aws_iam_policy_document" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  statement {
    actions   = local.permission_chunks[count.index]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  name   = "DatadogAWSIntegrationPolicy-${count.index + 1}"
  policy = data.aws_iam_policy_document.datadog_aws_integration[count.index].json
}
resource "aws_iam_role" "datadog_aws_integration" {
  name               = "DatadogIntegrationRole"
  description        = "Role for Datadog AWS Integration"
  assume_role_policy = data.aws_iam_policy_document.datadog_aws_integration_assume_role.json
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  role       = aws_iam_role.datadog_aws_integration.name
  policy_arn = aws_iam_policy.datadog_aws_integration[count.index].arn
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
    cloud_security_posture_management_collection = false
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

{{% /tab %}}

{{% tab "AWS GovCloud" %}}

```hcl
data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "AWS"
      identifiers = ["arn:aws-us-gov:iam::486737091498:root"]
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

data "datadog_integration_aws_iam_permissions" "datadog_permissions" {}

locals {
  all_permissions = data.datadog_integration_aws_iam_permissions.datadog_permissions.iam_permissions

  max_policy_size = 6144
  target_chunk_size = 5900

  permission_sizes = [
    for perm in local.all_permissions :
    length(perm) + 3
  ]
  cumulative_sizes = [
    for i in range(length(local.permission_sizes)) :
    sum(slice(local.permission_sizes, 0, i + 1))
  ]

  chunk_assignments = [
    for cumulative_size in local.cumulative_sizes :
    floor(cumulative_size / local.target_chunk_size)
  ]
  chunk_numbers = distinct(local.chunk_assignments)
  permission_chunks = [
    for chunk_num in local.chunk_numbers : [
      for i, perm in local.all_permissions :
      perm if local.chunk_assignments[i] == chunk_num
    ]
  ]
}

data "aws_iam_policy_document" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  statement {
    actions   = local.permission_chunks[count.index]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  name   = "DatadogAWSIntegrationPolicy-${count.index + 1}"
  policy = data.aws_iam_policy_document.datadog_aws_integration[count.index].json
}
resource "aws_iam_role" "datadog_aws_integration" {
  name               = "DatadogIntegrationRole"
  description        = "Role for Datadog AWS Integration"
  assume_role_policy = data.aws_iam_policy_document.datadog_aws_integration_assume_role.json
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
  count = length(local.permission_chunks)

  role       = aws_iam_role.datadog_aws_integration.name
  policy_arn = aws_iam_policy.datadog_aws_integration[count.index].arn
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration_security_audit" {
  role       = aws_iam_role.datadog_aws_integration.name
  policy_arn = "arn:aws-us-gov:iam::aws:policy/SecurityAudit"
}

resource "datadog_integration_aws_account" "datadog_integration" {
  account_tags   = []
  aws_account_id = "<ACCOUNT_ID>"
  aws_partition  = "aws-us-gov"
  aws_regions {
    include_all = true
  }
  auth_config {
    aws_auth_config_role {
      role_name = "DatadogIntegrationRole"
    }
  }
  resources_config {
    cloud_security_posture_management_collection = false
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

{{% /tab %}}

{{< /tabs >}}

さらなる使用例やオプションパラメーターの全リスト、Datadog の追加リソースについては、[Terraform Registry][2] を参照してください。

<div class="alert alert-info">デフォルトでは、上記の構成に Cloud Security は含まれていません。Cloud Security を有効にするには、 <code>resources_config</code>で <code>cloud_security_posture_management_collection = true</code>を設定します。</div>

[1]: /ja/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

3. `terraform apply` を実行します。データ収集が開始されるまで最大 10 分待ち、すぐに使える [AWS 概要ダッシュボード][4] を表示して、AWS サービスやインフラストラクチャーから送信されるメトリクスを確認します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.terraform.io
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_account#upgrading-from-datadog_integration_aws-resources
[4]: https://app.datadoghq.com/screen/integration/7/aws-overview