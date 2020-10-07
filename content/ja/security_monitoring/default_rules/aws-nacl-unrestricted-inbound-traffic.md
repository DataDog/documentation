---
aliases:
  - /ja/01b-a6f-d0c
cloud: AWS
disable_edit: true
kind: ドキュメント
rule_category:
  - クラウドコンフィギュレーション
scope: vpc
security: コンプライアンス
source: vpc
title: 無制限のネットワーク ACL インバウンドトラフィック
type: security_rules
---
## 概要

### 説明

AWS ネットワークアクセスコントロールリスト (NACL) を調査して、複数のオープンポートを有効にし、ポート範囲に基づいて上りトラフィックアクセスを制限するルールを探します。

### 根拠

アプリケーションで必要なポートのみを開くことにより、サービス拒否 (DoS) 攻撃や分散サービス拒否 (DDoS) 攻撃などの不正アクセスの悪意のあるアクティビティの脅威を排除します。

### 修復

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