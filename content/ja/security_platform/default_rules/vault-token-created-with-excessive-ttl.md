---
aliases:
  - /ja/vih-ylo-wbc
  - /ja/security_monitoring/default_rules/vih-ylo-wbc
  - /ja/security_monitoring/default_rules/vault-token-created-with-excessive-ttl
disable_edit: true
integration_id: vault
kind: documentation
rule_category:
  - ログの検出
scope: vault
security: attack
source: vault
tactic: TA0003-persistence
title: 過剰な TTL で作成された Vault トークン
type: security_rules
---
### 目標
Vault トークンが過度の存続時間 (TTL) で作成された場合に検出します。これは、攻撃者が永続性を維持していることを示している可能性があります。

### 戦略
90000 秒 (25 時間) を超える存続時間でトークンが作成される Vault 監査ログの監視。TTL を変更する必要がある場合は、このルールのクローンを作成し、クエリの `@auth.token_ttl:>90000` を更新します。

### トリアージと対応
1. 適切な Vaultコンフィギュレーションのトークンの最大 TTL を確認します。
2. 最大 TTL が必要以上に高い場合は、最大 TTL を変更します。
3. トークンの作成者に確認して、高 TTL トークンが正当であることを確認してください。
4. 正当なユースケースがない場合は、トークンを取り消します。