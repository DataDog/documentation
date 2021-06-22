---
aliases:
  - /ja/ix9-ih4-ucg
  - /ja/security_monitoring/default_rules/ix9-ih4-ucg
  - /ja/security_monitoring/default_rules/aws-elbv2-listener
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: elbv2
security: コンプライアンス
source: elbv2
title: ELBv2 ALB はセキュアなリスナーを使用しています
type: security_rules
---
## 説明

HTTPS を使用して、アプリケーションクライアントと  Elastic Load Balancer (ELB) リスナーとのコミュニケーションの安全性を確保します。

## 根拠

HTTPS リスナーを使用しない場合、フロントエンド接続は中間者攻撃 (MITM) などのエクスプロイトに対して脆弱です。アプリケーションクライアントと ELB リスナー間のすべてのコミュニケーションをセキュアに行うことで、機密データを保護することができます。

## 修復

### コンソール

接続リクエストのチェックを行うリスナーの作成方法について、詳しくは [アプリケーションロードバランサーの HTTPS リスナーの作成][1]ドキュメントを参照してください。

### CLI

1. `list-certificates` を実行して、SSL 証明書の ARN を取得します。SSL 証明書をお持ちでない場合は、[SSL/TLS 証明書の作成またはインポート][2]ドキュメントを参照してください。
2. [ロードバランサーおよび SSL 証明書の ARN][3] を使用して、`create-listener` を実行します。

    {{< code-block lang="bash" filename="create-listener.sh" >}}
    aws elbv2 create-listener
        --load-balancer-arn arn:aws:elasticloadbalancing:region:123456789012:loadbalancer/app/my-load-balancer/12ab3c456d7e8912
        --protocol HTTPS
        --port 443
        --certificates CertificateArn=arn:aws:acm:region:123456789012:certificate/1abc0c41-bd73-5445-9ab9-123456a23456
        --ssl-policy ELBSecurityPolicy-2016-08 --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:region:123456789012:targetgroup/my-targets/12ab3c456d7e8912
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html
[2]: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/ssl-server-cert.html#create-certificate-acm
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elbv2/create-listener.html