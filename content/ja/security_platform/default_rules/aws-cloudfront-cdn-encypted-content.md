---
aliases:
  - /ja/7bd-206-905
  - /ja/security_monitoring/default_rules/7bd-206-905
  - /ja/security_monitoring/default_rules/aws-cloudfront-cdn-encypted-content
cloud: AWS
disable_edit: true
integration_id: amazon-cloudfront
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: cloudfront
security: コンプライアンス
source: cloudfront
title: Cloudfront ビューワーが暗号化されています
type: security_rules
---
## 説明

ディストリビューションの AWS CloudFront Content Delivery Network (CDN) が HTTPS を使用してコンテンツを送受信していることを確認します。

## 根拠

HTTPS は、AWS CloudFront ディストリビューションの暗号化された通信を保証し、パケット傍受などの悪意のある攻撃の可能性を軽減します。

## 修復

### コンソール

[ビューワーと CloudFront 間で HTTPS が必須となるよう CloudFront を構成][3]ドキュメントに従って、ビューワーのプロトコルポリシーを HTTPS のみに変更してください。

### CLI

1. AWS CloudFront ディストリビューション ID を使用して `get-distribution-config` を実行し、[ディストリビューションのコンフィギュレーション情報][1]を取得します。

    {{< code-block lang="bash" filename="get-distribution-config.sh" >}}
    aws cloudfront get-distribution-config
        --id ID000000000000
    {{< /code-block >}}

2. 新しい JSON ファイルで、返されたコンフィギュレーションを変更します。`ViewerProtocolPolicy` を `https-only` に設定し、コンフィギュレーションファイルを保存します。

    {{< code-block lang="json" filename="https-only.sh" >}}
    {
      "ETag": "ETAG0000000000",
      "DistributionConfig": {
        "Origins": {
          "ViewerProtocolPolicy": "https-only",
          ...
        }
      }
    }
    {{< /code-block >}}

3. `update-distribution` を実行して、ディストリビューション `id`、コンフィギュレーションファイルのパス (手順 2 で作成)、`etag` で[ディストリビューションを更新][2]します。

    {{< code-block lang="bash" filename="update-distribution.sh" >}}
    aws cloudfront update-distribution
        --id ID000000000000
        --distribution-config https-only.json
        --if-match ETAG0000000000
    {{< /code-block >}}

[1]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudfront/get-distribution-config.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudfront/update-distribution.html
[3]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-viewers-to-cloudfront.html