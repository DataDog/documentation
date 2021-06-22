---
aliases:
  - /ja/6lt-aha-t2f
  - /ja/security_monitoring/default_rules/6lt-aha-t2f
  - /ja/security_monitoring/default_rules/aws-s3-write_acp
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: s3
security: コンプライアンス
source: s3
title: S3 バケットは認証済みユーザーにアクセスコントロールの変更を許可しません
type: security_rules
---
## 説明

アクセスコントロールの許可を変更し、認証済みユーザーの `WRITE_ACP` アクセスを削除します。

## 根拠

`WRITE_ACP` アクセスはすべての認証済み AWS アカウントまたは IAM ユーザーに `READ` および `WRITE` のアクセスコントロールリスト (ACL) 許可を付与します。これらの許可を持つ認証済みユーザーは S3 オブジェクトの変更、削除、更新を行うことができるため、データの損失や予期しない AWS への課金などにつながる可能性があります。

## 修復

### コンソール

 [ユーザーポリシーを利用したバケットへのアクセスコントロール][1]ドキュメントに従って既存のポリシーを編集し、ポリシーのアクセス許可をプライベートに設定してください。

### CLI

1. [S3 バケット名と ACL][2] を `private` に設定し、`put-bucket-acl` を実行します。

  {{< code-block lang="bash" filename="put-bucket-acl.sh" >}}
  aws s3api get-bucket-acl
    --bucket your-bucket-name
    --acl private
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/walkthrough1.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-versioning.html#synopsis