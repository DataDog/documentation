---
aliases:
  - /ja/01b-a6f-d0c
  - /ja/security_monitoring/default_rules/01b-a6f-d0c
  - /ja/security_monitoring/default_rules/aws-nacl-unrestricted-inbound-traffic
cloud: AWS
disable_edit: true
integration_id: amazon-vpc
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: vpc
security: コンプライアンス
source: vpc
title: ネットワーク ACL インバウンドトラフィックは制限されています
type: security_rules
---
## 説明

AWS ネットワークアクセスコントロールリスト (NACL) を調査して、複数のオープンポートを有効にし、ポート範囲に基づいて上りトラフィックアクセスを制限するルールを探します。

## 根拠

アプリケーションで必要なポートのみを開くことにより、サービス拒否 (DoS) 攻撃や分散サービス拒否 (DDoS) 攻撃などの不正アクセスの悪意のあるアクティビティの脅威を排除します。

## 修復

### コンソール

[ルールの追加と削除][2]のドキュメントに従って、ポート範囲に基づいて入力トラフィックアクセスを制限します。

### CLI

1. `replace-network-acl-entry` を実行して、特定のポート範囲からの上りトラフィックのみを許可するルールを作成します。

    {{< code-block lang="bash" filename="replace-network-acl-entry.sh" >}}
    aws ec2 replace-network-acl-entry
        --network-acl-id id-01234567
        --ingress
        --rule-number 01
        --protocol tcp
        --port-range From=000,To=000
        --rule-action allow
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#default-network-acl
[2]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#Rules