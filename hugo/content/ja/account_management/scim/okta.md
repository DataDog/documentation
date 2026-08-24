---
algolia:
  tags:
  - scim
  - identity provider
  - IdP
  - Okta
description: SCIM を使用して Okta から Datadog にユーザーと Teams を同期することで、ユーザープロビジョニング、Teams 管理、アクセス制御を自動化できます。
further_reading:
- link: /account_management/scim/
  tag: ドキュメント
  text: SCIM を使用したユーザープロビジョニング
- link: account_management/saml/mapping/#map-saml-attributes-to-datadog-roles
  tag: ドキュメント
  text: グループ属性マッピング
title: Okta での SCIM の設定
---
<div class="alert alert-info">
SCIM は、Infrastructure Pro、Infrastructure Enterprise、および Startup プランで利用可能です。
</div>

SCIM を使用して Datadog ユーザーを Okta と同期させるには、次の手順を参照してください。

この機能の能力と制限事項については、[SCIM][1] を参照してください。

## 前提条件{#prerequisites}

Datadog の SCIM は、Infrastructure Pro、Infrastructure Enterprise、および Startup プランで利用可能な高度な機能です。

このドキュメントでは、組織が ID プロバイダーを使用してユーザー ID を管理していることを前提としています。

アクセスの混乱を避けるため、Datadog では SCIM の設定時にサービスアカウントのアプリケーションキーを使用することを強く推奨しています。詳細については、[SCIM でのサービスアカウントの使用][2] を参照してください。

SAML と SCIM を併用する場合、アクセスの矛盾を避けるため、Datadog では SAML の Just-in-Time (JIT) プロビジョニングを無効にすることを強く推奨しています。ユーザープロビジョニングは SCIM のみを使用して管理してください。

## Okta アプリケーションギャラリーで Datadog アプリケーションを選択する {#select-the-datadog-application-in-the-okta-application-gallery}

1. Okta ポータルで {{< ui >}}Applications{{< /ui >}} に移動する
2. {{< ui >}}Browse App Catalog{{< /ui >}} をクリックする
3. 検索ボックスに「Datadog」と入力する
4. Datadog アプリケーションを選択する
5. {{< ui >}}Add Integration{{< /ui >}} をクリックする

**注:** すでに Okta で Datadog を設定済みの場合は、既存の Datadog アプリケーションを選択してください。

## 自動ユーザープロビジョニングを設定する {#configure-automatic-user-provisioning}

1. アプリケーション管理画面の左側のパネルで {{< ui >}}Provisioning{{< /ui >}} を選択する
2. {{< ui >}}Configure API integration{{< /ui >}} をクリックします。
3. {{< ui >}}Enable API integration{{< /ui >}} を選択します。
4. {{< ui >}}Credentials{{< /ui >}} セクションに次のように入力します。
    - {{< ui >}}Base URL{{< /ui >}}: `https://{{< region-param key="dd_full_site" >}}/api/v2/scim` **注:** サイトに適したサブドメインを使用してください。URL を確認するには、[Datadog サイト][3] を参照してください。
    - {{< ui >}}API Token{{< /ui >}}: 有効な Datadog アプリケーションキーを使用します。アプリケーションキーは [組織の設定ページ][4] で作成できます。データへの継続的なアクセスを維持するには、[サービスアカウント][5] のアプリケーションキーを使用してください。

{{< img src="/account_management/scim/okta-admin-credentials.png" alt="Okta 管理者認証情報の設定画面">}}

5. {{< ui >}}Test API Credentials{{< /ui >}} をクリックし、認証情報が検証されたことを確認するメッセージが表示されるまで待ちます。
6. {{< ui >}}Save{{< /ui >}} をクリックします。設定セクションが表示されます。
7. {{< ui >}}Provisioning to App{{< /ui >}}の横にある {{< ui >}}Edit{{< /ui >}} を選択し、機能を有効にします。
    - {{< ui >}}Create Users{{< /ui >}}
    - {{< ui >}}Update User Attributes{{< /ui >}}
    - {{< ui >}}Deactivate Users{{< /ui >}}
8. {{< ui >}}Datadog Attribute Mappings{{< /ui >}} で、Okta 属性から Datadog 属性への事前設定済みのマッピングを確認します。必要に応じて再マッピングできますが、Okta の値は同じ一連の Datadog 値にマッピングしてください。

### Datadog ロール属性をマッピングする {#map-the-datadog-role-attribute}

SCIM によってユーザーの Datadog ロール (組み込みまたはカスタムロール) をプロビジョニングするには、`roles` 属性の明示的なマッピングを追加します。Okta では、この属性はデフォルトではマッピングされません。

Datadog の SCIM ロールサポートは、[RFC 7643][8] で定義されている SCIM の複数値属性の規則に従い、ロール UUID を `value` として、ロール名を `display` として使用します。

```json
{
  "roles": [
    { "value": "<DATADOG_ROLE_UUID>", "display": "<DATADOG_ROLE_NAME>" }
  ]
}
```

1. {{< ui >}}Directory{{< /ui >}} > {{< ui >}}Profile Editor{{< /ui >}} で、Datadog SCIM 用に構成されたアプリケーションのユーザープロファイルを選択してから、{{< ui >}}Add Attribute{{< /ui >}} をクリックして `roles` 属性を作成します。
    - {{< ui >}}Data type{{< /ui >}}: **文字列**
    - {{< ui >}}Display name{{< /ui >}}: **ロール**
    - {{< ui >}}Variable name{{< /ui >}}: **ロール**
    - {{< ui >}}External name{{< /ui >}}: `roles.^[primary==true].value`
    - {{< ui >}}External namespace{{< /ui >}}: `urn:ietf:params:scim:schemas:core:2.0:User`
    - {{< ui >}}Enum{{< /ui >}} には、{{< ui >}}Define enumerated list of values{{< /ui >}} を選択し、Datadog ロールごとに 1 つのエントリを追加します。その際、ロール名を表示名として、ロール UUID を値として使用します。ロール UUID は、[組織の設定][9] ページのロールの URL で確認できます。カスタムロールも同様の方法で追加します。
2. Datadog アプリケーションの {{< ui >}}Provisioning{{< /ui >}} > {{< ui >}}To App{{< /ui >}} 設定で、Okta の `roles` 属性を Datadog の `roles` 属性にマッピングします。
3. アプリの {{< ui >}}Assignments{{< /ui >}} タブで、各ユーザーに適切なロールをドロップダウンから選択して割り当てます。

SCIM リクエストで複数のロールが送信された場合、Datadog は組織内のロールと一致するもののみをプロビジョニングします。一致するものがない場合、ユーザーは組織のデフォルトロール (Standard) にフォールバックされ、一致しなかったロールは Audit Trail に記録されます。詳細については、[SCIM][1] を参照してください。

## Teams の自動プロビジョニングを設定する {#configure-automatic-team-provisioning}

[Managed Teams][6] を使用すると、Datadog Teams の主要なプロビジョニング (名前、ハンドル、メンバーシップ) を ID プロバイダーを通じて制御できます。セットアッププロセスは、Datadog 内に Teams がすでに存在するかどうかによって異なります。

**注:** ユーザーを Teams に追加するには、そのユーザーが Datadog にすでに存在している必要があります。したがって、SCIM によって Datadog 内にユーザーが確実に作成されるようにするには、Okta の Datadog アプリにユーザーを割り当てる必要があります。チームメンバー全員が Datadog で自動的に作成されるよう、Okta グループに Datadog アプリケーションを割り当てます。

### Datadog で新しい Teams を作成する {#create-a-new-team-in-datadog}

1. Okta の Datadog アプリケーションで、{{< ui >}}Push Groups{{< /ui >}} タブに移動します。
{{< img src="/account_management/scim/okta/pushed-groups.png" alt="Okta のプッシュグループ設定インターフェース">}}
1. {{< ui >}}Push Groups{{< /ui >}} ボタンをクリックします。プッシュグループインターフェースが開きます。
1. Datadog にプッシュする Okta グループを選択します。
1. {{< ui >}}Match result & push action{{< /ui >}} 列で、{{< ui >}}Create group{{< /ui >}} が選択されていることを確認します。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

操作が正常に完了したことを確認するには、Datadog の [Teams リスト][7] に移動します。設定した Okta グループと一致する Datadog Teams を検索します。Datadog 内に Teams が存在し、外部で管理されていることを確認します。Teams が Datadog に表示されるまでに 1 〜 2 分かかる場合があります。

{{< img src="/account_management/scim/okta/managed-externally.png" alt="外部で管理されている Identity team という名前のチームを示している Datadog チームリスト。">}}

### Okta グループとの既存の Datadog Team の同期 {#synchronize-an-existing-datadog-team-with-an-okta-group}

既存の Datadog Teams を Okta グループにマッピングできます。Okta グループから Datadog チームへのリンクを確立すると、それ以降はその Datadog チームは Okta によって管理されるようになります。

**注:** 既存の Datadog チームを Okta グループと同期するには、Okta グループ名から派生したハンドルが、既存の Datadog チームのハンドルと完全に一致している必要があります。

1. Okta の Datadog アプリケーションで、{{< ui >}}Push Groups{{< /ui >}} タブに移動します。
1. {{< ui >}}Push Groups{{< /ui >}} ボタンをクリックします。プッシュグループインターフェースが開きます。
1. Datadog チームを同期する Okta グループを選択します。
1. {{< ui >}}Match result & push action{{< /ui >}} 列で、{{< ui >}}Create group{{< /ui >}} が選択されていることを確認します。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

**注:** {{< ui >}}Create group{{< /ui >}} を選択すると、Okta に{{< ui >}}No match found{{< /ui >}} メッセージが表示されます。このメッセージは無視してグループの作成を続行し、同期を確立できます。

### Okta グループと Datadog チーム間の関連付けを削除する {#delete-the-connection-between-an-okta-group-and-a-datadog-team}

Okta グループと Datadog チームの関連付けを解除するには、2 つのオプションがあります。オプションによって、Datadog チームのメンバーシップへの影響は異なります。

#### Datadog でチームメンバーを保持する {#keep-team-members-in-datadog}

この手順により、Okta ではなく Datadog でチームメンバーシップを管理できるようになります。チームメンバーは変更されません。

1. Okta の Datadog アプリケーションで、{{< ui >}}Push Groups{{< /ui >}} タブに移動します。
1. {{< ui >}}Push Groups{{< /ui >}} ボタンをクリックします。プッシュグループインターフェースが開きます。
1. Datadog チームとのリンクを解除する Okta グループを選択します。
1. {{< ui >}}Match result & push action{{< /ui >}} 列で {{< ui >}}Unlink Pushed Group{{< /ui >}} を選択します。ダイアログボックスが表示されます。
1. {{< ui >}}Leave the group in the target app{{< /ui >}} を選択します。
1. {{< ui >}}Unlink{{< /ui >}} をクリックします。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

#### Datadog からチームメンバーを削除する {#remove-team-members-from-datadog}

この手順により、Okta ではなく Datadog でチームメンバーシップを管理できるようになり、Datadog チームからチームメンバーが削除されます。

1. Okta の Datadog アプリケーションで、{{< ui >}}Push Groups{{< /ui >}} タブに移動します。
1. {{< ui >}}Push Groups{{< /ui >}} ボタンをクリックします。プッシュグループインターフェースが開きます。
1. Datadog チームとのリンクを解除する Okta グループを選択します。
1. {{< ui >}}Match result & push action{{< /ui >}} 列で {{< ui >}}Unlink Pushed Group{{< /ui >}} を選択します。ダイアログボックスが表示されます。
1. {{< ui >}}Delete the group in the target app (recommended){{< /ui >}} を選択します。
1. {{< ui >}}Unlink{{< /ui >}} をクリックします。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

**注:** オプションの名前に反して、{{< ui >}}Delete the group in the target app{{< /ui >}} を選択しても Datadog からはチームが_削除されません_。代わりに、チームからすべてのメンバーが削除され、Okta のグループと Datadog チーム間のリンクが解除されます。

## 参考文献 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/scim/
[2]: /ja/account_management/scim/#using-a-service-account-with-scim
[3]: /ja/getting_started/site
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /ja/account_management/org_settings/service_accounts
[6]: /ja/account_management/teams/manage/#manage-teams-through-an-identity-provider
[7]: https://app.datadoghq.com/teams
[8]: https://www.rfc-editor.org/rfc/rfc7643.html#section-4.1.2
[9]: https://app.datadoghq.com/organization-settings/roles