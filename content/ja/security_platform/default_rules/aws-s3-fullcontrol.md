---
aliases:
  - /ja/8o9-i6i-hu6
  - /ja/security_monitoring/default_rules/8o9-i6i-hu6
  - /ja/security_monitoring/default_rules/aws-s3-fullcontrol
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: s3
security: コンプライアンス
source: s3
title: S3 バケットはユーザーにフルコントロールアクセスを許可しません
type: security_rules
---
## 説明

ACL 許可を更新し、認証済みの AWS アカウントおよび AWS IAM ユーザーの `FULL_CONTROL` アクセスを削除します。

## 根拠

`FULL_CONTROL` アクセスは、すべての IAM ユーザーまたは AWS 認証済みアカウントに S3 オブジェクトの表示、アップロード、変更、削除を制限なしで許可します。

## 修復

### コンソール

[ACL の構成: S3 コンソールを使用してバケットに ACL 許可を設定][1]ドキュメントに従い、`FULL_CONTROL` アクセスを削除し ACL 許可を更新します。

### CLI

1. [バケット名と ACL][2] を `private` にして、`put-bucket-acl` を実行します。

  {{< code-block lang="bash" filename="put-bucket-acl.sh" >}}
  aws s3api put-bucket-acl
    --bucket your-s3-bucket-name
    --acl private
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/managing-acls.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-acl.html#synopsis