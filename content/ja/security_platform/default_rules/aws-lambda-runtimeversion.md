---
aliases:
  - /ja/zbs-gp9-gp2
  - /ja/security_monitoring/default_rules/zbs-gp9-gp2
  - /ja/security_monitoring/default_rules/aws-lambda-runtimeversion
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: lambda
security: コンプライアンス
source: lambda
title: Lambda 関数は最新のランタイム環境のバージョンを使用します
type: security_rules
---
## 説明

Amazon Lambda 関数を最新のランタイム環境のバージョンに更新します。

## 根拠

ベストプラクティスとして、Amazon は継続的にランタイム環境を最新のバージョンに更新し、セキュリティパッチ、バグ修正、および最新の機能を適用することを推奨しています。

## 修復

### コンソール

[コンソールでの関数の構成][1]ドキュメントに従って、関数を実行する Lambda ランタイムを更新する方法を確認してください。

### CLI

1. AWS でサポートされる[関数名と最新のランタイムのバージョン][2]で `update-function-configuration` を実行します。

  {{< code-block lang="bash" filename="update-function-configuration.sh" >}}
  aws lambda update-function-configuration
    --function-name YourLambdaFunction
    --runtime "python3.8"
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-console.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/update-function-configuration.html#synopsis