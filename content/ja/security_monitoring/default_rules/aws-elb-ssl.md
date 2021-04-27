---
aliases:
  - /ja/1th-739-cyc
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: elb
security: コンプライアンス
source: elb
title: ELB には安全な SSL プロトコルがあります
type: security_rules
---
## 説明

Elastic Load Balancer (ELB) の Secure Socket Layer (SSL) を更新して、SSLv2、SSLv3、TLSv1 の安全でない SSL プロトコルまたは非推奨の SSL プロトコルを置き換えます。

## 根拠

安全でないプロトコルまたは非推奨のプロトコルを使用する ELB セキュリティポリシーは、[POODLE][1] や [DROWN][2] 攻撃などのエクスプロイトに対して脆弱です。

## 修復

### コンソール

[アプリケーションロードバランサーの HTTPS リスナーを更新する][3]のドキュメントに従って、変更された HTTPS リスナーを使用してセキュリティポリシーを更新する方法を確認してください。

### CLI

1. `ssl-policy` フラグを指定して `modify-listener` を実行し、新しい SSL ポリシーを定義します。`--protocol` フラグを使用してプロトコルを変更することもできます。例については、[AWSCLI ドキュメント][4]を参照してください。

[1]: https://en.wikipedia.org/wiki/POODLE
[2]: https://en.wikipedia.org/wiki/DROWN_attack
[3]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-update-certificates.html
[4]: https://docs.aws.amazon.com/cli/latest/reference/elbv2/modify-listener.html#examples