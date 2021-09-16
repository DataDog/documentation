---
title: Synthetic モニタリングの設定
kind: documentation
further_reading:
  - link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
    tag: 英語ブログ
    text: Datadog Synthetic モニタリングの紹介
  - link: /synthetics/api_tests/
    tag: ドキュメント
    text: APIテストの設定
  - link: /synthetics/browser_tests/
    tag: ドキュメント
    text: ブラウザーテストの設定
  - link: /synthetics/identify_synthetics_bots/
    tag: ドキュメント
    text: Synthetic ボットの特定
  - link: /synthetics/guide/browser-tests-totp
    tag: ドキュメント
    text: ブラウザテストにおける多要素認証 (MFA) 用 TOTP
---
[Synthetic モニタリングの設定ページ][1]で、次の設定を調整できます。

* [グローバル変数](#global-variables)
* [プライベートロケーション][2]
* [デフォルトの設定](#default-settings)
  * [デフォルトの場所](#default-locations)
  * [ブラウザテスト用の APM インテグレーション](#apm-integration-for-browser-tests)

## グローバル変数

グローバル変数は、[シングル][3]および[マルチステップ API テスト][4]、そしてテストスイートの[ブラウザテスト][5]で使用できます。グローバル変数を作成するには、**Settings** ページの [Global Variables][6] タブで、右上にある **New Global Variable** をクリックします。

作成する変数のタイプを選択します。

{{< tabs >}}
{{% tab "Specify Value" %}}

1. **Variable Name** を入力します。変数名に使用できるのは大文字、数字、アンダースコアのみです。
2. 変数の **Description** を入力します（任意）。
3. **Tags** を選択して変数と関連付けます（任意）。
4. 変数に割り当てる **Value** を入力します。
5. 変数の難読化を有効にすると、テスト結果に値が表示されません（オプション）。

{{< img src="synthetics/settings/variable_value.png" alt="グローバル変数による値の指定"  style="width:100%;">}}

{{% /tab %}}

{{% tab "Create From HTTP Test" %}}

関連するレスポンスヘッダーや本文をパースして、既存の [HTTP テスト][1] から変数を作成できます。

1. **Variable Name** を入力します。変数名に使用できるのは大文字、数字、アンダースコアのみです。
2. 変数の **Description** を入力します（任意）。
3. **Tags** を選択して変数と関連付けます（任意）。
4. 変数の抽出元となる **[HTTP test][1]** を選びます。
5. 変数の難読化を有効にすると、テスト結果に値が表示されません（オプション）。
6. 変数をレスポンスのヘッダーから抽出するか、本文から抽出するか決定します。
    * **Response Header** から値を抽出：レスポンスのヘッダー全体を変数に使用するか、レスポンスのヘッダーを[正規表現][2]によりパースします。
    * **Response Body** から値を抽出：リクエストのレスポンス本文全体を使用するか、レスポンス本文を [regex][2]、[`jsonpath`][3]、[`xpath`][4] によりパースします。

{{< img src="synthetics/settings/variable_fromhttp.png" alt="http の変数"  style="width:100%;">}}

**注:** 変数の値は抽出元のテストが実行される度に更新されます。

[4]:/ja/account_management/rbac/permissions/

[1]: /ja/synthetics/api_tests/?tab=httptest
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[3]: https://restfulapi.net/json-jsonpath/
[4]: https://www.w3schools.com/xml/xpath_syntax.asp
{{% /tab %}}

{{% tab "MFA Token" %}}  

TOTP を生成しテストで使用するには、シークレットキーを入植する場所にグローバル変数を作成するか、認証プロバイダーからの QR コードをアップロードします。

1. **Choose variable type** で **MFA Token** を選択します。
2. **Define Variable** で、**Variable Name** を入力します。変数名に使用できるのは大文字、数字、アンダースコアのみです。
3. 変数の **Description** を入力します（任意）。
4. **Tags** を選択して変数と関連付けます（任意）。
5. 変数に**シークレットキー**を入力または QR コードイメージをアップロードします。
6. **+ Generate** をクリックして OTP を作成します。**コピー**アイコンを使用すると、生成した OTP をコピーできます。

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="MFA トークンの作成" style="width:100%;" >}}

**注**: ブラウザテストの TOTP を使用した MFA について、詳細は [TOTP ガイド][1]をご参照ください。


[1]: /ja/synthetics/guide/browser-tests-totp
{{% /tab %}}

{{< /tabs >}}

### アクセス許可

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][7]を持つユーザーのみが Synthetic Monitoring **Global Variables** ページにアクセスできます。ユーザーをこの 2 つの[デフォルトのロール][8]のいずれかにアップグレードすると、**Global Variables** ページにアクセスできます。

[カスタムロール機能][9]にアクセスできる場合は、グローバル変数に `synthetics_global_variable_read` および `synthetics_global_variable_write` 権限を含むカスタムロールにユーザーを追加します。

#### アクセス制限

<div class="alert alert-warning">
RBAC のグローバル変数へのアクセス制限は、ベータ版です。アクセスをリクエストするには、<a href="https://docs.datadoghq.com/help/">Datadog サポート</a>までお問い合わせください。</div>

組織内のロールに基づきグローバル変数へのアクセスを制限できます。グローバル変数を作成する際に、**アクセス許可設定**で、グローバル変数の読み取りおよび書き込みが可能なロール（ユーザーに加えて）を選択します。

## デフォルトの設定

### デフォルトの場所

[API テスト][10]、[マルチステップ API テスト][11]、または[ブラウザテスト][4]の詳細のデフォルトとなるロケーションを選択します。Datadog 管理下のすべてのロケーションと、ご使用のアカウントでセットアップしたプライベートロケーションから選択できます。

### ブラウザテスト用の APM インテグレーション

APM インテグレーションのヘッダーを URL に追加することを許可します。Datadog APM インテグレーションのヘッダーでは、APM を使用して Datadog をブラウザテストにリンクさせることができます。

このセクションで URL を追加して、APM ヘッダーの送信先となるエンドポイントを定義します。

`*` を使用すると幅広いドメイン名を許容することができます。たとえば、`https://*.datadoghq.com/*` を追加すると、`https://datadoghq.com/` のすべてが許可されます。

エンドポイントがトレースおよび許可されていれば、ブラウザテストの結果は対応するトレースに自動的に結び付けられます。

### アクセス許可

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][7]を持つユーザーのみが Synthetic Monitoring **Default Settings** ページにアクセスできます。**Default Settings** ページにアクセスするには、ユーザーをこの 2 つの[デフォルトのロール][8]のいずれかにアップグレードします。

[カスタムロール機能][9]にアクセスできる場合は、デフォルト設定に `synthetics_default_settings_read` および `synthetics_default_settings_write` 権限を含むカスタムロールにユーザーを追加します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings
[2]: /ja/synthetics/private_locations/
[3]: /ja/synthetics/api_tests/#use-global-variables
[4]: /ja/synthetics/multistep#variables
[5]: /ja/synthetics/browser_tests/#use-global-variables
[6]: https://app.datadoghq.com/synthetics/settings/variables
[7]: /ja/account_management/users/default_roles/
[8]: /ja/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[9]: /ja/account_management/rbac/?tab=datadogapplication#custom-roles
[10]: /ja/synthetics/multistep/
[11]: /ja/synthetics/browser_tests