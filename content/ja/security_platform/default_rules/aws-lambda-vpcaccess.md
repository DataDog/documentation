---
aliases:
  - /ja/9ga-poq-w7v
  - /ja/security_monitoring/default_rules/9ga-poq-w7v
  - /ja/security_monitoring/default_rules/aws-lambda-vpcaccess
cloud: AWS
disable_edit: true
integration_id: amazon-lambda
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: lambda
security: コンプライアンス
source: lambda
title: Lambda 関数から VPC リソースにアクセスします
type: security_rules
---
## 説明

Amazon Lambda 関数を構成して VPC のみのリソースへのアクセスを付与します。

## 根拠

デフォルトでは、Amazon Lambda 関数はすべての AWS サービスとインターネットにアクセス可能なセキュアな VPC 内で実行されます。どのリソースにアクセスを許可するかを選択することで、プライベート VPC 内の接続を安全に保つことができます。

## 修復

### コンソール

[VPC アクセスの構成 (コンソール)][1] ドキュメントに従って、既存の関数に対する VPC のアクセスを構成します。

### CLI

1. [Amazon Lambda 関数名と VPC コンフィギュレーション][2]で `update-function-configuration` を実行します。ネットワーク接続を、構成対象の VPC 内の AWS リソースに設定します。

   {{< code-block lang="bash" filename="update-function-configuration.sh" >}}
   aws lambda update-function-configuration
       --function-name your-lambda-function-name
       --vpc-config SubnetIds="subnet-ab12cd34","subnet-12345678",SecurityGroupIds="id-0abcd1234abcd5678"
   {{< /code-block >}}

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html#vpc-configuring
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/update-function-configuration.html#synopsis