---
title: オーガニゼーションの更新
type: apicontent
order: 28.3
external_redirect: '/api/#update-organization'
---
## オーガニゼーションの更新

##### 引数
* **`name`** [オプション]:
    オーガニゼーション名。
* **`settings`** [オプション]:
    設定の JSON 配列。設定は次のとおりです。
    * **`saml`** - ブール値プロパティ `enabled` を設定して、SAML を使用したシングルサインオンを有効または無効にします。すべての SAML 設定の詳細については、[SAML に関するドキュメント][1]を参照してください。
    * **`saml_idp_initiated_login`** `enabled` というブール値プロパティがあります。
    * **`saml_strict_mode`** `enabled` というブール値プロパティがあります。
    * **`saml_autocreate_users_domains`** `enabled` (ブール値) と `domains` (@ 記号なしのドメインのリスト) という 2 つのプロパティがあります。

[1]: /ja/account_management/saml