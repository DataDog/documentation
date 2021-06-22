---
aliases:
  - /ja/k20-cl4-oat
  - /ja/security_monitoring/default_rules/k20-cl4-oat
  - /ja/security_monitoring/default_rules/aws-s3-mfadelete
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: s3
security: コンプライアンス
source: s3
title: S3 バケットの MFA Delete 機能が有効
type: security_rules
---
## 説明

Multi-Factor Authentication (MFA) delete 機能をセットアップして、Amazon S3 オブジェクトの削除を防ぎます。

## 根拠

## 修復

MFA で保護された Amazon S3 バケットで、バケットにアクセスした AWS ユーザーによる S3 オブジェクトの誤削除または意図的な削除から保護できます。

### コンソール

`MFA DELETE` は、[AWS コンソールからは有効にできません][1]。コンフィギュレーション手順については、以下の CLI 修復rをご参照ください。

### CLI

1. [バケット名、バージョニングコンフィギュレーション、MFA コンフィギュレーション][2]を使用して、`put-bucket-versioning` を実行します。

  {{< code-block lang="bash" filename="put-bucket-acl.sh" >}}
  aws s3api put-bucket-versioning
    --bucket your-s3-bucket-name
    --versioning-configuration '{"MFADelete":"Enabled","Status":"Enabled"}'
    --mfa 'arn:aws:iam::aws_account_id:mfa/root-account-mfa-device'
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-versioning.html#synopsis