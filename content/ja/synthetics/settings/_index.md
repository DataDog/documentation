---
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
- link: /synthetics/private_locations/
  tag: ドキュメント
  text: プライベートロケーションを作成
- link: /synthetics/identify_synthetics_bots/
  tag: ドキュメント
  text: Synthetic ボットの特定
- link: /synthetics/guide/explore-rum-through-synthetics/
  tag: ドキュメント
  text: Synthetics で RUM とセッションリプレイを確認する
- link: /synthetics/guide/browser-tests-totp
  tag: ドキュメント
  text: ブラウザテストにおける多要素認証 (MFA) 用 TOTP
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
  tag: Terraform
  text: Terraform による Synthetic グローバル変数の作成と管理
kind: documentation
title: Synthetic モニタリングの設定
---

## 概要

[Synthetic モニタリングの設定ページ][1]で、次のトピックにアクセスして制御することができます。

* [プライベートロケーション](#private-locations)
* [グローバル変数](#global-variables)
* [デフォルトの設定](#default-settings)
* [インテグレーション設定](#integration-settings)

## プライベートロケーション

詳しくは、[プライベートロケーションから Synthetic テストを実行する][2]をご覧ください。

## グローバル変数

グローバル変数は、すべての Synthetic テストからアクセス可能で、あらゆる[シングル][3]および[マルチステップ API テスト][4]、そしてテストスイートの[ブラウザテスト][5]で使用できます。グローバル変数を作成するには、**Settings** ページの [Global Variables][6] タブで、右上にある **New Global Variable** をクリックします。

作成する変数のタイプを選択します。

{{< tabs >}}
{{% tab "Specify Value" %}}

1. **Variable Name** を入力します。変数名に使用できるのは大文字、数字、アンダースコアのみです。この名前は、グローバル変数全体で一意である必要があります。
2. 変数の **Description** を入力します（任意）。
3. **Tags** を選択して変数と関連付けます（任意）。
4. 変数に割り当てる **Value** を入力します。
5. 変数の難読化を有効にすると、テスト結果に値が表示されません（オプション）。

{{< img src="synthetics/settings/variable_value_2.png" alt="グローバル変数による値の指定" style="width:100%;">}}

{{% /tab %}}

{{% tab "Create From HTTP Test" %}}

関連するレスポンスヘッダーや本文をパースして、既存の [HTTP テスト][1] から変数を作成できます。

1. **Variable Name** を入力します。変数名に使用できるのは大文字、数字、アンダースコアのみです。
2. 変数の **Description** を入力します（任意）。
3. **Tags** を選択して変数と関連付けます（任意）。
4. 変数の抽出元となる **[HTTP test][1]** を選びます。
5. 変数の難読化を有効にすると、テスト結果に値が表示されません（オプション）。
6. 変数をレスポンスのヘッダーから抽出するか、本文から抽出するか決定します。
    * **Response Header** から値を抽出: レスポンスのヘッダー全体を変数に使用するか、レスポンスのヘッダーを [`regex`][2] でパースします。
    * **Response Body** から値を抽出: リクエストのレスポンス本文全体を使用するか、レスポンス本文を [`regex`][2]、[`jsonpath`][3]、[`xpath`][4] でパースします。

{{< img src="synthetics/settings/variable_fromhttp_3.png" alt="HTTP テストの変数" style="width:80%;">}}

正規表現による値の抽出のほか、[正規表現][2]を使って次のようにパースすることもできます。

  - パターンの最初のインスタンスだけでなく，与えられたパターンのすべてのインスタンスにもマッチする
  - マッチングパターンの大文字小文字を無視する
  - 複数行に渡る文字列のマッチング
  - 渡された正規表現パターンをユニコードとして扱う
  - ピリオド記号で改行を識別できるようにする
  - 正規表現パターン内の指定されたインデックスからマッチする
  - マッチしたパターンを与えられた値で代用する

{{< img src="synthetics/settings/parsing_regex_field.png" alt="HTTP テストのレスポンス本文を正規表現でパースする" style="width:80%;">}}

変数の値は抽出元のテストが実行される度に更新されます。

[1]: /ja/synthetics/api_tests/http_tests/
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

グローバル変数を作成したら、すべての Synthetic テストで使用可能です。グローバル変数をテストにインポートするには、*+ Variables* をクリックし、対象のフィールドに `{{` を入力してグローバル変数を選択します。詳しくは、[HTTP テスト][7]、[マルチステップ API テスト][8]、[ブラウザテストのコンフィギュレーション][9]、[手順に関するドキュメント][10]をご参照ください。

### アクセス許可

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][11]を持つユーザーのみが Synthetic Monitoring **Global Variables** ページにアクセスできます。ユーザーをこの 2 つの[デフォルトのロール][11]のいずれかにアップグレードすると、**Global Variables** ページにアクセスできます。

[カスタムロール機能][12]を使用している場合は、`synthetics_global_variable_read` および `synthetics_global_variable_write` 権限を含むカスタムロールにユーザーを追加します。

#### アクセス制限

アカウントに[カスタムロール][13]を使用しているお客様は、アクセス制限が利用可能です。

組織内のロールに基づきグローバル変数へのアクセスを制限できます。グローバル変数を作成する際に、**アクセス許可設定**で、グローバル変数の読み取りおよび書き込みが可能なロール（ユーザーに加えて）を選択します。

{{< img src="synthetics/settings/restrict_access.png" alt="グローバル変数へのアクセス制限" style="width:100%;" >}}

## デフォルトの設定

{{< img src="synthetics/settings/default_settings.png" alt="デフォルト設定ページ" style="width:100%;">}}

### 強制タグ

<div class="alert alert-warning">
タグの実行は、Enterprise プランに含まれる高度な機能です。他のプランをご利用中で、この機能をご希望の場合は、アカウント担当者または <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> までお問い合わせください。
</div>

**Enforce tags for usage attributions on all tests** (すべてのテストにおいて、使用量属性のためのタグを強制する) をクリックすると、Synthetics テストで選択したタグを強制的に使用することができます。

サービス、アプリケーション、チームごとにコストと使用量属性を分解することができます。使用量属性タグの伝搬には最大で 15 分かかることがあります。詳しくは、[使用量属性][14]を参照してください。

タグの強制が完了したら、**Save Enforced Tags** をクリックします。

### デフォルトの場所

[API テスト][3]、[マルチステップ API テスト][4]、または[ブラウザテスト][5]の詳細にデフォルトの場所を選択します。

Datadog で管理されるすべての場所と、ご使用のアカウントでセットアップしたプライベートロケーションから選択できます。

ロケーションの選択が完了したら、**Save Default Locations** をクリックします。

### デフォルトのブラウザとデバイス

[ブラウザテスト][5]の詳細で、デフォルトのブラウザとデバイスの種類を選択します。

ブラウザは、Google Chrome、Firefox、Microsoft Edge から選択できます。デバイスは、大型のノートパソコン、タブレット、小型のモバイルデバイスから選択できます。

ブラウザとデバイスの選択が完了したら、**Save Default Browsers &amp; Devices** をクリックします。

### アクセス許可

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][11]を持つユーザーのみが Synthetic Monitoring **Default Settings** ページにアクセスできます。**Default Settings** ページにアクセスするには、ユーザーをこの 2 つの[デフォルトの役割][11]のいずれかにアップグレードします。

[カスタムロール機能][12]を使用している場合は、`synthetics_default_settings_read` および `synthetics_default_settings_write` 権限を含むカスタムロールにユーザーを追加します。

## インテグレーション設定

{{< img src="synthetics/settings/integration_settings.png" alt="インテグレーション設定ページ" style="width:100%;">}}

### ブラウザテスト用の APM インテグレーション

APM インテグレーションのヘッダーをその URL に追加することを許可します。Datadog APM インテグレーションのヘッダーでは、APM を使用して Datadog をブラウザテストにリンクさせることができます。

APM ヘッダーを送信するエンドポイントを定義するには、**Value** フィールドに URL を入力します。エンドポイントがトレースされ、許可されている場合、ブラウザテストの結果は自動的にその対応するトレースに結びつけられます。

`*` を使用すると幅広いドメイン名を許容することができます。たとえば、`https://*.datadoghq.com/*` を追加すると、`https://datadoghq.com/` のすべてが許可されます。

URL の追加が完了したら、**Save APM Integration Settings** をクリックします。

### Synthetic データ収集と RUM アプリケーション

Datadog がテスト実行から RUM データを収集することを許可するには、**Enable Synthetic RUM data collection** をクリックします。無効にすると、ブラウザテストレコーダーで RUM 設定を編集することができなくなります。データ収集の有効化が完了したら、**Save RUM Data Collection** をクリックします。

ブラウザテストデータを収集する RUM アプリケーションを **Default Application** ドロップダウンメニューから選択します。デフォルトアプリケーションの指定が完了したら、**Save RUM Data Applications** をクリックします。

詳しくは、[RUM とセッションリプレイの確認][15]をご覧ください。

### アクセス許可

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][11]を持つユーザーのみが Synthetic Monitoring **Integration Settings** ページにアクセスできます。**Integration Settings** ページにアクセスするには、ユーザーをこの 2 つの[デフォルトの役割][11]のいずれかにアップグレードします。

[カスタムロール機能][12]を使用している場合は、`synthetics_default_settings_read` および `synthetics_default_settings_write` 権限を含むカスタムロールにユーザーを追加します。
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings
[2]: /ja/synthetics/private_locations/
[3]: /ja/synthetics/api_tests/
[4]: /ja/synthetics/multistep/
[5]: /ja/synthetics/browser_tests/
[6]: https://app.datadoghq.com/synthetics/settings/variables
[7]: /ja/synthetics/api_tests/http_tests?tab=requestoptions#use-variables
[8]: /ja/synthetics/multistep?tab=requestoptions#use-variables
[9]: /ja/synthetics/browser_tests/?tab=requestoptions#use-global-variables
[10]: /ja/synthetics/browser_tests/actions#use-variables
[11]: /ja/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[12]: /ja/account_management/rbac/?tab=datadogapplication#custom-role
[13]: /ja/account_management/rbac/#create-a-custom-role
[14]: /ja/account_management/billing/usage_attribution
[15]: /ja/synthetics/guide/explore-rum-through-synthetics/