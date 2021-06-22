---
aliases:
  - /ja/rys-j0l-jyg
  - /ja/security_monitoring/default_rules/rys-j0l-jyg
  - /ja/security_monitoring/default_rules/aws-s3-publicaccess
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: s3
security: コンプライアンス
source: s3
title: S3 バケットは匿名ユーザーに公開されていません
type: security_rules
---
## 説明

Amazon S3 バケットを非公開に設定します。

## 根拠

公開の Amazon S3 バケットは、匿名を含むすべてのユーザーに `FULL_CONTROL` アクセスを付与します。`FULL_CONTROL` により、ユーザーは S3 オブジェクトをアップロード、変更、削除、表示することができます。

## 修復

### コンソール

[ACL の構成: S3 コンソールを使用してバケットに ACL 許可を設定][1]ドキュメントに従い、`FULL_CONTROL` アクセスを削除し ACL 許可を更新します。

### CLI

1. [バケット名と ACL][2] を `private` にして、`put-bucket-acl` を実行します。

  {{< code-block lang="bash" filename="put-bucket-acl.sh" >}}
  aws s3api put-bucket-acl
    --bucket your-bucket-name
    --acl private
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/managing-acls.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-acl.html#synopsis