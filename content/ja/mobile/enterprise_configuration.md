---
aliases:
- /ja/service_management/enterprise-configuration
further_reading:
- link: /monitors/
  tag: ドキュメント
  text: アラート設定
- link: /dashboards/
  tag: ドキュメント
  text: ダッシュボード
- link: https://www.datadoghq.com/blog/datadog-mobile-widgets/
  tag: ブログ
  text: Datadog モバイルダッシュボードウィジェットで、オンコールエクスペリエンスを改善
title: 企業構成
---
Datadog モバイルアプリは [AppConfig][1] および AppConfig に対応しているモバイルデバイス管理 (MDM) プロバイダーに完全対応しています。

## サポートされる機能

モバイルアプリは [iOS][2] および [Android][3] 向けのすべてのデフォルト MDM 機能に加え、以下の専用機能をサポートしています。

| キー | 説明 |タイプ|デフォルト値| 
|---------|---------|-----|-----|
|`datadogDefaultLoginOrganizationUUID`|ログイン時にパラメーターとして渡される組織の UUID `dd_oid` を定義します。|文字列|null|
|`datadogDefaultLoginOrganizationPublicID`|ログイン時にパラメーターとして渡される組織の`public_id`を定義します ([管理対象の組織一覧を取得する API エンドポイント][4]を通じて利用可能)。もし `datadogDefaultLoginOrganizationUUID` が設定されている場合は、`public_id` よりも優先されます。|文字列|null|
|`disableSharing`|アプリからのコンテンツ共有を無効にします。|Boolean|false|
|`disableHomeScreenWidgets`|ホーム画面ウィジェットへのアクセスを無効にします (代わりに「disabled by your organization」と表示)。|Boolean|false|

デフォルト機能の詳細については、各モバイルデバイス管理プロバイダーのドキュメントをご確認ください。

## ユースケース

### 組織固有のログインオプション
モバイルアプリでは組織情報を設定することで、組織専用のサブドメインがある場合に専用のモバイルアプリ用ログインページを表示したり、ユーザー認証用の特定オプションを提供したりできます。たとえば、モバイルアプリで Google SSO やメール/パスワード認証を無効にしたり、専用の SAML ログインボタンを追加することが可能です。

ログイン時にパラメーターとして渡すデフォルトの組織を特定するには、`datadogDefaultLoginOrganizationPublicID` または `datadogDefaultLoginOrganizationUUID` を設定できます。両方が設定されている場合は、`datadogDefaultLoginOrganizationUUID` が優先されます。

`datadogDefaultLoginOrganizationPublicID` は API 経由で確認可能です。

`datadogDefaultLoginOrganizationUUID` は **Personal Settings > My Organizations** から **Log in to Mobile App** をクリックすることで確認できます。

### ユーザーによるデータ漏洩の防止
ユーザーによるデータ漏洩リスクが懸念される場合は、標準設定 ([iOS][2] および [Android][3] 向け)を使用してコピー & ペーストやスクリーンショットを無効にできます。さらにリスクを低減するため、Datadog モバイルアプリでは次の機能を任意で有効化できます。

- **アプリからの共有を無効化**: これにより Datadog モバイルアプリの各製品ページからすべての共有ボタンが削除されます。
    *注*: モバイルアプリの共有ボタンは、閲覧するには認証が必要な対象の製品ページへのリンクを作成します。このデフォルトの制御で十分かどうかをご検討ください。共有を無効にすると、モバイルアプリを使ったチームのコラボレーションが阻害される可能性があります。
- **ホーム画面ウィジェットを無効化**: これにより、モニター、インシデント、SLO、またはダッシュボードの実際のデータの代わりにホーム画面ウィジェット上に「Disabled by your organization」と表示されます。

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.appconfig.org/
[2]: https://www.appconfig.org/ios.html
[3]: https://www.appconfig.org/android.html
[4]: https://docs.datadoghq.com/ja/api/latest/organizations/#list-your-managed-organizations