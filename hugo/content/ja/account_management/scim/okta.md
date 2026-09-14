---
algolia:
  tags:
  - scim
  - identity provider
  - IdP
  - Okta
description: SCIM を使用して Okta から Datadog にユーザーとチームを同期し、自動化されたユーザープロビジョニング、チーム管理、アクセス制御を行います。
further_reading:
- link: /account_management/scim/
  tag: ドキュメント
  text: SCIM によるユーザープロビジョニング
- link: account_management/saml/mapping/#map-saml-attributes-to-datadog-roles
  tag: ドキュメント
  text: グループ属性マッピング
title: Okta で SCIM を構成する
---
<div class="alert alert-info">
SCIM は、Infrastructure Pro、Infrastructure Enterprise、および Startup プランで利用可能です。
</div>

SCIM を使用して Datadog ユーザーを Okta と同期する手順については、以下を参照してください。

この機能の特徴と制限については、[SCIM][1] を参照してください。

## 前提条件 {#prerequisites}

Datadog の SCIM は、Infrastructure Pro、Infrastructure Enterprise、および Startup プランで利用可能な高度な機能です。

このドキュメントは、組織がアイデンティティプロバイダーを使用してユーザーアイデンティティを管理していることを前提としています。

Datadog では、SCIM の構成時にサービスアカウントのアプリケーションキーを使用してアクセスの中断を回避することを強く推奨します。詳細については、[SCIM でサービスアカウントを使用する][2] を参照してください。

SAML と SCIM を併用する場合、Datadog ではアクセスの不一致を避けるために SAML のジャストインタイム (JIT) プロビジョニングを無効にすることを強く推奨します。SCIM のみでユーザープロビジョニングを管理します。

## Okta アプリケーションギャラリーで Datadog アプリケーションを選択する {#select-the-datadog-application-in-the-okta-application-gallery}

1. Okta ポータルで、{{< ui >}}Applications{{< /ui >}} に移動します
2. {{< ui >}}Browse App Catalog{{< /ui >}} をクリックします
3. 検索ボックスに「Datadog」と入力します
4. Datadog アプリケーションを選択します
5. {{< ui >}}Add Integration{{< /ui >}} をクリックします

**注:** すでに Datadog を Okta で構成している場合は、既存の Datadog アプリケーションを選択してください。

## 自動ユーザープロビジョニングを構成する {#configure-automatic-user-provisioning}

1. アプリケーション管理画面で、左のパネルから {{< ui >}}Provisioning{{< /ui >}} を選択します
2. {{< ui >}}Configure API integration{{< /ui >}} をクリックします。
3. {{< ui >}}Enable API integration{{< /ui >}} を選択します。
4. {{< ui >}}Credentials{{< /ui >}} セクションを次のように完了します。
    - {{< ui >}}Base URL{{< /ui >}}: `{{< region-param key="dd_api" >}}/api/v2/scim` **注:** アプリホストではなく、サイトの API ホストを使用してください。各サイトの SCIM エンドポイントについては、[SCIM API リファレンス][3] を参照してください。
    - {{< ui >}}API Token{{< /ui >}}: 有効な Datadog アプリケーションキーを使用します。アプリケーションキーは [組織の設定ページ][4] で作成できます。データへの継続的なアクセスを維持するには、[サービスアカウント][5] のアプリケーションキーを使用します。

{{< img src="/account_management/scim/okta-admin-credentials.png" alt="Okta 管理者資格情報の構成画面">}}

5. {{< ui >}}Test API Credentials{{< /ui >}} をクリックし、資格情報が検証されたことを確認するメッセージが表示されるまで待ちます。
6. {{< ui >}}Save{{< /ui >}} をクリックします。設定セクションが表示されます。
7. {{< ui >}}Provisioning to App{{< /ui >}} の隣にある {{< ui >}}Edit{{< /ui >}} を選択して機能を有効にします。
    - {{< ui >}}Create Users{{< /ui >}}
    - {{< ui >}}Update User Attributes{{< /ui >}}
    - {{< ui >}}Deactivate Users{{< /ui >}}
8. {{< ui >}}Datadog Attribute Mappings{{< /ui >}} の下で、Okta 属性から Datadog 属性へのマッピングが事前設定されていることを確認します。必要に応じて再マッピングできますが、Okta の値を同じ Datadog の値のセットにマッピングしてください。

### Datadog ロール属性をマッピングする {#map-the-datadog-role-attribute}

SCIM を通じてユーザーの Datadog ロール (組み込みまたはカスタム) をプロビジョニングするには、`roles` 属性の明示的なマッピングを追加します。Okta はデフォルトではこの属性をマッピングしません。

Datadog の SCIM ロールサポートは、[RFC 7643][8] で定義されている SCIM マルチ値属性の規則に従い、ロール UUID を `value` として、ロール名を `display` として使用します。

```json
{
  "roles": [
    { "value": "<DATADOG_ROLE_UUID>", "display": "<DATADOG_ROLE_NAME>" }
  ]
}
```

1. {{< ui >}}Directory{{< /ui >}} > {{< ui >}}Profile Editor{{< /ui >}} で、Datadog SCIM 用に構成されたアプリケーションのユーザープロファイルを選択し、{{< ui >}}Add Attribute{{< /ui >}} をクリックして `roles` 属性を作成します。
    - {{< ui >}}Data type{{< /ui >}}: **文字列**
    - {{< ui >}}Display name{{< /ui >}}: **ロール**
    - {{< ui >}}Variable name{{< /ui >}}: **ロール**
    - {{< ui >}}External name{{< /ui >}}: `roles.^[primary==true].value`
    - {{< ui >}}External namespace{{< /ui >}}: `urn:ietf:params:scim:schemas:core:2.0:User`
    - {{< ui >}}Enum{{< /ui >}} の場合は、{{< ui >}}Define enumerated list of values{{< /ui >}} を選択し、Datadog ロールごとに 1 つのエントリを追加します。その際、ロール名を表示名として、ロール UUID を値として使用します。ロール UUID は、[組織の設定][9] ページのロールの URL で確認できます。カスタムロールも同様の方法で追加します。
2. Datadog アプリケーションの {{< ui >}}Provisioning{{< /ui >}} > {{< ui >}}To App{{< /ui >}} 設定で、Okta `roles` 属性を Datadog `roles` 属性にマッピングします。
3. アプリの {{< ui >}}Assignments{{< /ui >}} タブで、ドロップダウンから各ユーザーに適切なロールを割り当てます。

SCIM リクエストが複数のロールを送信する場合、Datadog は組織内のロールと一致するロールのみをプロビジョニングします。一致するものがない場合、ユーザーは組織のデフォルトロール (標準) にフォールバックされ、一致しないロールは Audit Trail に記録されます。詳細については、[SCIM][1] を参照してください。

## 自動チームプロビジョニングを構成する {#configure-automatic-team-provisioning}

[管理チーム][6] を使用すると、ID プロバイダーを通じて Datadog チームのコアプロビジョニング (名前、ハンドル、メンバーシップ) を制御できます。セットアッププロセスは、チームが Datadog にすでに存在するかどうかによって異なります。

**注:** ユーザーをチームに追加するには、その前にユーザーが Datadog に存在している必要があります。そのため、SCIM を通じて Datadog でユーザーが確実に作成されるように、Okta で Datadog アプリにユーザーを割り当てる必要があります。Datadog アプリケーションを Okta グループに割り当て、すべてのチームメンバーが Datadog で自動的に作成されるようにします。

### Datadog で新しいチームを作成する {#create-a-new-team-in-datadog}

1. Okta の Datadog アプリケーションで、{{< ui >}}Push Groups{{< /ui >}} タブに移動します。
{{< img src="/account_management/scim/okta/pushed-groups.png" alt="Okta プッシュグループ構成インターフェース">}}
1. {{< ui >}}Push Groups{{< /ui >}} ボタンをクリックします。プッシュグループインターフェースが開きます。
1. Datadog にプッシュする Okta グループを選択します。
1. {{< ui >}}Match result & push action{{< /ui >}} 列で、{{< ui >}}Create group{{< /ui >}} が選択されていることを確認します。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

操作が正常に完了したことを確認するには、Datadog の [チームリスト][7] に移動します。構成した Okta グループと一致する Datadog チームを検索します。チームが Datadog に存在し、外部管理されていることを確認します。チームが Datadog に表示されるまで 1 ～ 2 分かかる場合があります。

{{< img src="/account_management/scim/okta/managed-externally.png" alt="外部管理されている Identity チームというチームが表示されている Datadog チームリスト。">}}

### 既存の Datadog Team を Okta グループと同期する {#synchronize-an-existing-datadog-team-with-an-okta-group}

既存の Datadog Team を Okta グループにマッピングできます。Okta グループから Datadog Team へのリンクを確立すると、今後その Datadog Team は Okta によって管理されるようになります。

**注:** 既存の Datadog Team を Okta グループと同期するには、Okta グループ名から派生したハンドルが既存の Datadog Team のハンドルと完全に一致している必要があります。

1. Okta の Datadog アプリケーションで、{{< ui >}}Push Groups{{< /ui >}} タブに移動します。
1. {{< ui >}}Push Groups{{< /ui >}} ボタンをクリックします。プッシュグループインターフェースが開きます。
1. Datadog Team と同期する Okta グループを選択します。
1. {{< ui >}}Match result & push action{{< /ui >}} 列で、{{< ui >}}Create group{{< /ui >}} が選択されていることを確認します。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

**注:** {{< ui >}}Create group{{< /ui >}} を選択すると、Okta に {{< ui >}}No match found{{< /ui >}} メッセージが表示されます。このメッセージを無視し、同期を確立するためにグループの作成を続行できます。

### Okta グループと Datadog チーム間のコネクションを解除する {#delete-the-connection-between-an-okta-group-and-a-datadog-team}

Okta グループと Datadog チームのコネクションを解除するには 2 つのオプションがあり、Datadog チームのメンバーシップへの影響が異なります。

#### Datadog のチームメンバーを保持する {#keep-team-members-in-datadog}

この手順により、Okta ではなく Datadog でチームメンバーシップを管理できるようになります。チームメンバーは変更されません。

1. Okta の Datadog アプリケーションで、{{< ui >}}Push Groups{{< /ui >}} タブに移動します。
1. {{< ui >}}Push Groups{{< /ui >}} ボタンをクリックします。プッシュグループインターフェースが開きます。
1. Datadog チームからリンクを解除する Okta グループを選択します。
1. {{< ui >}}Match result & push action{{< /ui >}} 列で、{{< ui >}}Unlink Pushed Group{{< /ui >}} を選択します。ダイアログボックスが表示されます。
1. {{< ui >}}Leave the group in the target app{{< /ui >}} を選択します。
1. {{< ui >}}Unlink{{< /ui >}} をクリックします。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

#### Datadog からチームメンバーを削除する {#remove-team-members-from-datadog}

この手順により、Okta ではなく Datadog でチームメンバーシップを管理できるようになり、Datadog チームからチームメンバーが削除されます。

1. Okta の Datadog アプリケーションで、{{< ui >}}Push Groups{{< /ui >}} タブに移動します。
1. {{< ui >}}Push Groups{{< /ui >}} ボタンをクリックします。プッシュグループインターフェースが開きます。
1. Datadog チームからリンクを解除する Okta グループを選択します。
1. {{< ui >}}Match result & push action{{< /ui >}} 列で、{{< ui >}}Unlink Pushed Group{{< /ui >}} を選択します。ダイアログボックスが表示されます。
1. {{< ui >}}Delete the group in the target app (recommended){{< /ui >}} を選択します。
1. {{< ui >}}Unlink{{< /ui >}} をクリックします。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

**注:** オプション名とは異なり、{{< ui >}}Delete the group in the target app{{< /ui >}} を選択しても Datadog のチームは削除_されません_。代わりにチームからすべてのメンバーが削除され、Okta のグループとその Datadog チーム間のリンクが解除されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/scim/
[2]: /ja/account_management/scim/#using-a-service-account-with-scim
[3]: /ja/api/latest/scim/
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /ja/account_management/org_settings/service_accounts
[6]: /ja/account_management/teams/manage/#manage-teams-through-an-identity-provider
[7]: https://app.datadoghq.com/teams
[8]: https://www.rfc-editor.org/rfc/rfc7643.html#section-4.1.2
[9]: https://app.datadoghq.com/organization-settings/roles