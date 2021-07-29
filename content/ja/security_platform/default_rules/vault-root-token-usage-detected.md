---
aliases:
  - /ja/d6v-ktd-7pk
  - /ja/security_monitoring/default_rules/d6v-ktd-7pk
  - /ja/security_monitoring/default_rules/vault-root-token-usage-detected
disable_edit: true
integration_id: vault
kind: documentation
rule_category:
  - ログの検出
scope: vault
source: vault
title: 使用された Vault ルートトークン
type: security_rules
---
### 目標
Vault ルートトークンが使用されたことを検出します。ルートトークンは任意のアクティビティを実行でき、Vault で最高レベルの特権を持ち、緊急時にのみ使用する必要があります。

### 戦略
このルールを使用すると、Vault 監査ログ (source:vault) を監視して、これら 2 つの属性のいずれかに `root` が含まれていることを検出できます。

* auth policy (`@auth.policies`)
* auth display name (`@auth.display_name`)

このルールでは、新しいルートキーの作成に使用される API エンドポイント `/sys/generate-root` を監視することもできます。

### トリアージと対応
1. ルートトークンを作成したのは誰か、いつ作成したかを確認します。トークンアクセサーと `vault token lookup -accessor <accessor>` を使用して、トークンの作成時間を取得できます。
2. ルートトークンで行われたリクエストを調べて、その使用法が有効であることを確認します。
3. ルートトークンが不要になった後、取り消されていることを確認します (`vault token revoke -accessor <token>`)。