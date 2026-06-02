---
description: CloudPrem 向けに AWS を設定する方法を説明します
further_reading:
- link: /cloudprem/install/aws_eks/
  tag: ドキュメント
  text: AWS EKS に CloudPrem をインストールする
- link: /cloudprem/ingest_logs/
  tag: ドキュメント
  text: ログ取り込みを設定する
title: AWS 設定
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

このガイドでは、CloudPrem をデプロイする前提として AWS アカウント側で必要になる設定を説明します。この設定は、AWS EKS に CloudPrem をインストールする前に済ませておく必要があります。

EKS へのインストール全体の流れについては、[AWS EKS インストール ガイド][1] を参照してください。

## AWS の前提条件

AWS に CloudPrem をデプロイするには、次の項目を構成する必要があります:
- AWS 認証情報と認証
- AWS リージョンの選択
- S3 オブジェクト ストレージ用の IAM 権限
- RDS PostgreSQL データベース (推奨)
- AWS Load Balancer Controller を備えた EKS クラスター

## AWS 認証情報

ノードの起動時、CloudPrem は [rusoto_core::ChainProvider][2] が実装する認証情報プロバイダー チェーンを使って AWS 認証情報を探し、次の順番で参照します:

1. 環境変数 `AWS_ACCESS_KEY_ID`、`AWS_SECRET_ACCESS_KEY`、または `AWS_SESSION_TOKEN` (任意)
2. 認証情報プロファイル ファイル。通常は `~/.aws/credentials` に配置されます。`AWS_SHARED_CREDENTIALS_FILE` と `AWS_PROFILE` 環境変数が設定されていて空でない場合は、それらで指定されたものが使われます。
3. Amazon ECS コンテナの認証情報。環境変数 `AWS_CONTAINER_CREDENTIALS_RELATIVE_URI` が設定されている場合、Amazon ECS コンテナから読み込まれます。
4. インスタンス プロファイル認証情報。Amazon EC2 インスタンスで使用され、Amazon EC2 メタ データ サービス経由で提供されます。

このチェーン内で認証情報が見つからない場合は、エラーが返されます。

## AWS リージョン

CloudPrem は複数のソースから AWS リージョンを取得しようとし、次の優先順位で判定します:

1. **環境変数**: `AWS_REGION` を確認し、その後 `AWS_DEFAULT_REGION` を確認します。
2. **AWS config ファイル**: 通常は `~/.aws/config` にあります。`AWS_CONFIG_FILE` 環境変数が設定されていて空でない場合は、そのパスが使われます。
3. **EC2 インスタンスのメタ データ**: 現在実行中の Amazon EC2 インスタンスのリージョンを使用します。
4. **既定値**: ほかのソースからリージョンが取得できない場合は、`us-east-1` が使われます。

## S3 用の IAM 権限

許可が必要なアクションは次のとおりです:

* `ListBucket` (バケット自体に対して)
* `GetObject`
* `PutObject`
* `DeleteObject`
* `ListMultipartUploadParts`
* `AbortMultipartUpload`

以下はバケット ポリシーの例です:

```json
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Effect": "Allow",
     "Action": [
       "s3:ListBucket"
     ],
     "Resource": [
       "arn:aws:s3:::my-bucket"
     ]
   },
   {
     "Effect": "Allow",
     "Action": [
       "s3:GetObject",
       "s3:PutObject",
       "s3:DeleteObject",
       "s3:ListMultipartUploadParts",
       "s3:AbortMultipartUpload"
     ],
     "Resource": [
       "arn:aws:s3:::my-bucket/*"
     ]
   }
 ]
}
```

## 次のステップ

AWS の設定が完了したら:

1. **CloudPrem を EKS にインストールする** - [AWS EKS インストール ガイド][1] に沿って CloudPrem をデプロイします 
2. **Ingress を設定する** - 外部アクセスのために [Ingress 設定][3] を行います 
3. **ログ取り込みを設定する** - [ログ取り込み][4] を構成して、CloudPrem へのログ送信を開始します 

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/cloudprem/install/aws_eks
[2]: https://docs.rs/rusoto_credential/latest/rusoto_credential/struct.ChainProvider.html
[3]: /ja/cloudprem/configure/ingress/
[4]: /ja/cloudprem/ingest_logs/