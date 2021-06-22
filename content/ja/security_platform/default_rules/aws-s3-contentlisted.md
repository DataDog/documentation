---
aliases:
  - /ja/eel-ic1-rey
  - /ja/security_monitoring/default_rules/eel-ic1-rey
  - /ja/security_monitoring/default_rules/aws-s3-contentlisted
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: s3
security: コンプライアンス
source: s3
title: S3 バケットのコンテンツをユーザーがリストすることはできません
type: security_rules
---
## 説明

ACL 許可を更新し、認証済みの AWS アカウントまたは IAM ユーザーの `READ` アクセスを削除します。

## 根拠

`READ` アクセスは、認証済み IAM ユーザーまたは AWS 認証済みアカウントにバケット内のすべてのオブジェクトのリスト化および ACL 許可の設定ミスのあるオブジェクトのエクスプロイトを許可します。

## 修復

### コンソール

[ACL の構成: S3 コンソールを使用してバケットに ACL 許可を設定][1]ドキュメントに従い、`Bucket ACL - Read` の許可の選択を外し ACL 許可を更新します。

### CLI

1. [バケット名と ACL][2] を `private` にして、`put-bucket-acl` を実行します。

  {{< code-block lang="bash" filename="put-bucket-acl.sh" >}}
  aws s3api put-bucket-acl
    --bucket your-s3-bucket-name
    --acl private
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/managing-acls.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-acl.html#synopsis