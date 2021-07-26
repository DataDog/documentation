---
aliases:
  - /ja/7fc-0mg-8e0
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: elb
security: コンプライアンス
source: elb
title: TLSv1.2 を使用する ELB リスナー
type: security_rules
---
## 説明

Elastic Load Balancer (ELB) リスナーを TLSv1.2+ に更新します。

## 根拠

安全でないまたは古い TLS を使用すると、[SSL ストリッピングやその他のさまざまな攻撃][1]などのエクスプロイトに対して脆弱になります。TLSv1.2+ を使用すると、クライアントとサーバー間で接続が確立されたときに、データがプライベートで安全なままになります。

## 修復

### コンソール

AWS コンソールで HTTPS リスナーを変更する方法については、[セキュリティポリシーの更新][2]のドキュメントに従ってください。

### CLI

1. ポリシーを定義するには、`ssl-policy` フラグを指定して `modify-listener` を実行します。例については、[AWSCLI ドキュメント][3]を参照してください。

[1]: https://tools.ietf.org/html/rfc7457#page-3
[2]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-update-certificates.html#update-security-policy
[3]: https://docs.aws.amazon.com/cli/latest/reference/elbv2/modify-listener.html#examples