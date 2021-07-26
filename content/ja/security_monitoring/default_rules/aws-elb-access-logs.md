---
aliases:
  - /ja/eag-4ke-cj4
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: elb
security: コンプライアンス
source: elb
title: ELB 生成のアクセスログ
type: security_rules
---
## 説明

AWS Elastic Load Balancers (ELBs) にロギングを設定し、セキュリティの問題を特定します。

## 根拠

アクセスログで TCP および HTTP リクエストを分析できるため、セキュリティの監査やトラブルシューティングに便利です。

## 修復

### コンソール

[クラシックロードバランサーのアクセスログ有効化][1]ドキュメントで、ELBs のロギングを有効化する方法を確認します。

### CLI

1. `create-bucket` を実行して ELB ログファイルを保存する [S3 バケットを作成][2]します。

**注**: このバケットは、ELB と同じリージョンで作成される必要があります。

    {{< code-block lang="bash" filename="create-bucket.sh" >}}
    aws s3api create-bucket
    --region us-west-1
    --bucket your-elb-logging-bucket
    {{< /code-block >}}

2. [AWS Policy Generator][3] を使用して新しいポリシーを作成します。

3. `put-bucket-policy` を実行して S3 バケットに[ポリシードキュメントをアタッチ][4]します。

    {{< code-block lang="bash" filename="put-bucket-policy.sh" >}}
    aws s3api put-bucket-policy
        --bucket your-elb-logging-bucket
        --policy file://elb-logging-policy.json
    {{< /code-block >}}

4. `modify-load-balancer-attributes` を実行して、選択した ELB の[ロギングを有効][5]にします。

    {{< code-block lang="bash" filename="modify-load-balancer-attributes.sh" >}}
    aws elb modify-load-balancer-attributes
        --region us-west-1
        --load-balancer-name YourLoadBalancerName
        --load-balancer-attributes
        "{\"AccessLog\":{\"Enabled\":true,\"EmitInterval\":60,\"S3BucketName\":\"your-logging-bucket\"}}"
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/create-bucket.html
[3]: http://awspolicygen.s3.amazonaws.com/policygen.html
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-policy.html
[5]: https://docs.aws.amazon.com/cli/latest/reference/elb/modify-load-balancer-attributes.html