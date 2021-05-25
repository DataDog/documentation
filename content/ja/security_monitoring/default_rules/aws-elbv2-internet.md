---
aliases:
  - /ja/b0y-o61-ai4
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: elbv2
security: コンプライアンス
source: elbv2
title: ELBv2 ロードバランサーはインターネット向けです
type: security_rules
---
## 説明

アプリケーションロードバランサー (ALB) やネットワークロードバランサー (NLB) を内部の ELBv2 ロードバランサーで保護できます。

## 根拠

インターネット向けロードバランサーはパブリック DNS 名を受け取ります。ELBv2 ロードバランサーを使用して、接続を保護します。

## 修復

### コンソール

[アプリケーションロードバランサーの作成][1]のドキュメントに従い、プライベート IP アドレスを使いリクエストをターゲットにルーティングする内部のロードバランサー を作成する方法を確認します。

### CLI

[ロードバランサー名、スキーム、サブネット][2]を指定して、`create-load-balancer` を実行します。

    {{< code-block lang="bash" filename="create-load-balancer.sh" >}}
    aws elbv2 create-load-balancer
    --name my-internal-load-balancer
    --scheme internal
    --subnets subnet-b7d581c0 subnet-8360a9e7
    {{< /code-block >}}

ネットワークやゲートウェイのロードバランサーを作成するには、[create-load-balancer][2] AWS CLI ドキュメントを参照してください。

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-application-load-balancer.html#configure-load-balancer
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elbv2/create-load-balancer.html#synopsis