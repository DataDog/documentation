---
aliases:
  - /ja/31q-rfg-uiu
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: elb
security: コンプライアンス
source: elb
title: ELB リスナーが設定されています
type: security_rules
---
## 説明

安全なプロトコルを使用し、クライアントと Elastic Load Balancer (ELB) 間の通信を暗号化します。.

## 根拠

安全ではない通信チャネルは、中間者攻撃や機密性の高いデータの漏洩など、攻撃のリスクを高めます。

## 修復

### コンソール

[HTTP リスナーを追加][1] のドキュメントに従い、AWS コンソールで HTTP リスナーを作成する方法をご確認ください。

### CLI

1. `aws iam list-server-certificates` を実行し、AWS IAM で [SSL 証明書 ARN][2] を返します。

2. `create-load-balancer-listeners` を実行し、ステップ 1 で返された SSL 証明書を使用して選択したロードバランサーのために[新しい HTTPS リスナーを作成します][3]。

    {{< code-block lang="bash" filename="create-load-balancer-listeners.sh" >}}
    aws elb create-load-balancer-listeners
        --load-balancer-name YourLoadBalancerName
        --listeners Protocol=HTTPS, LoadBalancerPort=443, InstanceProtocol=HTTP, InstancePort=80, SSLCertificateId=arn:aws:iam::123456789123:server-certificate/YourSSLCertificate
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-listener.html#add-listener
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/list-server-certificates.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elb/create-load-balancer-listeners.html