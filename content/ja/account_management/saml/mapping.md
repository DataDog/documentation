---
title: SAML Group Mapping
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Single sign on with SAML
---

## 概要

Datadog を使用すると、アイデンティティプロバイダー (IdP) のレスポンスの属性を Datadog エンティティにマッピングすることができます。

属性を以下のプリンシパルにマッピングできます。
- [Datadog ロール][1]
- [Datadog チーム][2]

 Access Management アクセス許可を持つユーザーは、ユーザーの SAML 割り当て属性に基づき、Datadog のプリンシパルを割り当てまたは削除することができます。

 SAML 属性から Datadog エンティティへのマッピングを設定すると、アイデンティティプロバイダーだけでユーザを管理できます。システムが、設定されたマッピングに従って Datadog でユーザーをプロビジョニングします。

## 前提条件

マッピングには正しい属性が必要であるため、マッピングを有効にする前に、アサーションで何が送信されるかを理解することが重要です。各 IdP には固有のマッピングがあります。例えば、Azure はオブジェクト ID で動作し、Okta は [Okta 設定][1]で属性を設定する必要があります。Datadog は、マッピングを作成する**前**に、Chrome DevTools やブラウザ拡張機能などの[組み込みブラウザツール][2]で相互参照し、[SAML アサーションを検証][3]することを推奨します。

## SAML 属性の Datadog ロールへのマッピング

1. SAML アサーションを[相互参照][4]および[検証][5]して、IdP の属性を理解します。
2. **Organization Settings** に移動し、**SAML Group Mappings** タブをクリックします。
3. 表示されている場合は、**Role Mappings** タブが選択されていることを確認します。
4. **New Mapping** をクリックします。ダイアログボックスが表示されます。
5. 既存の Datadog ロール (デフォルトまたはカスタム) に関連付ける SAML アイデンティティプロバイダー `key-value` ペアを指定します。**注**: これらのエントリは大文字と小文字を区別します。
   例えば、 `member_of` 属性の値が `Development` である全てのユーザーを `Devs` という Datadog のカスタムロールに割り当てたい場合

    {{< img src="account_management/saml/create_mapping.png" alt="SAML の Datadog ロールへのマッピング作成" >}}

   **注**: アイデンティティプロバイダーはそれぞれ異なります。属性キーまたはラベルを設定できるものもあります。また、これをデフォルトで提供するものもあります。Datadog では、ログイン時にアサーションインスペクターを使用して、特定のアサーションの詳細を表示し、アイデンティティプロバイダーがグループメンバーシップをどのように送信しているかを理解することを推奨しています。
6. まだの場合は、**Enable Mappings** をクリックしてマッピングを有効化します。

指定された アイデンティティプロバイダー属性を持つユーザーがログインすると、自動的に Datadog ロールが割り当てられます。同様に、ユーザーのアイデンティティプロバイダー属性が削除されると、ロールへのアクセスも失います (別のマッピングが追加された場合を除く)。

<div class="alert alert-warning">
  <strong>重要:</strong> いずれのマッピングにも一致<i>しない</i>ユーザーは、それまで割り当てられていたロールを失い、SAML で組織にログインすることができなくなります。ユーザーがログインできないシナリオを防ぐために、マッピングを有効にする前にマッピング定義をダブルチェックし、独自のアサーションを検査してください。
</div>

マッピングに変更を加えるには鉛筆 (**Edit**) アイコンを、マッピングを削除する場合はゴミ箱 (**Delete**) アイコンをクリックします。この操作はマッピングのみに適用され、アイデンティティプロバイダー属性または Datadog ロールへの影響はありません。

`authn_mappings` エンドポイントを使用して、SAML 属性の Datadog ロールへのマッピングを作成および変更することも可能です。詳しくは、[フェデレーション認証からロールマッピング API へ][6]をご確認ください。

## SAML 属性のチームへのマッピング

1. チームメンバーシップの[プロビジョニングソース][7]を選択する際に、**SAML** または **All sources** のいずれかを選択したことを確認します。
2. SAML アサーションを[相互参照][4]および[検証][5]して、IdP の属性を理解します。
3. **Organization Settings** に移動し、**SAML Group Mappings** タブをクリックします。
4. **Team Mappings** タブが選択されていることを確認します。
5. **New Mapping** をクリックします。ダイアログボックスが表示されます。
6. Datadog チームと関連付けたい SAML アイデンティティプロバイダーの `key-value` ペアを指定します。**注**: これらのエントリーは大文字と小文字を区別します。
   **注**: アイデンティティプロバイダーはそれぞれ異なります。属性キーまたはラベルを設定できるものもあります。また、これをデフォルトで提供するものもあります。Datadog では、ログイン時にアサーションインスペクターを使用して、特定のアサーションの詳細を表示し、アイデンティティプロバイダーがグループメンバーシップをどのように送信しているかを理解することを推奨しています。
8. ドロップダウンメニューから **Team** を選択します。
9. マッピングを追加するには、**Add Row** をクリックします。
10. マッピングの追加が完了したら、**Create** をクリックします。
11. まだの場合は、**Enable Mappings** をクリックしてマッピングを有効化します。

マッピングに変更を加えるには鉛筆 (**Edit**) アイコンを、マッピングを削除する場合はゴミ箱 (**Delete**) アイコンをクリックします。この操作はマッピングのみに適用され、アイデンティティプロバイダー属性または Datadog チームへの影響はありません。

**注:** ロールとは異なり、チームはログインエクスペリエンスに何ら影響を与えません。Datadog は、チームマッピングを純粋にプロビジョニングソースとして使用します。例えば、ユーザーがどのチームにも所属していない場合でも、Datadog にサインインすることができます。

[1]: /account_management/rbac/
[2]: /account_management/teams/
[3]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-add-custom-user-attributes.htm
[4]: https://support.okta.com/help/s/article/How-to-View-a-SAML-Response-in-Your-Browser-for-Troubleshooting?language=en_US
[5]: https://www.samltool.com/validate_response.php
[6]: /account_management/authn_mapping/
[7]: /account_management/teams/#choose-provisioning-source
