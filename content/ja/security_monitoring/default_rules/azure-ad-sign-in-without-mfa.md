---
aliases:
  - /ja/07c-ed1-a61
disable_edit: true
kind: documentation
rule_category:
  - ログの検出
security: コンプライアンス
source: azure
title: MFA なしの Azure AD ログイン
type: security_rules
---
### 目標
多要素認証なしでユーザーが Azure AD にログインしたことを検出します。

### 戦略
このルールは、Azure アクティビティログで Active Directory ログを監視し、`@evt.category` の値が `SignInLogs` であり、`@properties.authenticationRequirement` の値が `singleFactorAuthentication` であることを検出します。

### トリアージと対応
1. ログインが正当であったかどうかを判断するために、ユーザーに連絡してください。
2. ログインが正当なものであった場合は、ユーザーに 2FA を有効にするように要求します。
3. ログインが正当でない場合は、資格情報をローテーションします。
4. すべてのユーザーアカウントを確認して、MFA が有効になっていることを確認します。