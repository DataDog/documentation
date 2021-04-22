---
aliases:
  - /ja/79d-8f7-432
  - /ja/security_monitoring/default_rules/79d-8f7-432
  - /ja/security_monitoring/default_rules/aws-cloudtrail-enabled
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: cloudtrail
security: コンプライアンス
source: cloudtrail
title: CloudTrail マルチリージョンが有効になっています
type: security_rules
---
## 説明

AWS CloudTrail が有効であることを確認してください。

## 根拠

AWS CloudTrail を使用すると、1 か所からリージョンを構成しインフラストラクチャーのセキュリティを維持できます。

## 修復

### コンソール

CloudTrail のご利用を開始するには、[AWS CloudTrail チュートリアル][3]ドキュメントを参照してください。

### CLI

1. `aws cloudtrail describe-trails` を実行
2. 上記で返された証跡の名前に `update-trail` を実行し、[multi-region-trail を有効][1]にします。

    {{< code-block lang="bash" filename="update-trail.sh" >}}
    aws cloudtrail update-trail
        --name GlobalTrailName
        --is-multi-region-trail
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail-by-using-the-aws-cli-update-trail.html
[2]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-tutorial.html#tutorial-step2