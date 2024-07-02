---
title: Synthetic Testing and Monitoring Settings
kind: ドキュメント
aliases:
- /synthetics/settings
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: ブログ
  text: Datadog Synthetic モニタリングの紹介
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable"
  tag: 外部サイト
  text: Terraform による Synthetic グローバル変数の作成と管理
- link: /synthetics/api_tests/
  tag: ドキュメント
  text: APIテストの設定
- link: /synthetics/multistep/
  tag: ドキュメント
  text: マルチステップ API テストの構成
- link: /synthetics/browser_tests/
  tag: ドキュメント
  text: ブラウザテストの設定
- link: /mobile_app_testing/mobile_app_tests
  tag: ドキュメント
  text: モバイルテストの構成
- link: /synthetics/private_locations/
  tag: ドキュメント
  text: プライベートロケーションを作成
- link: /synthetics/guide/explore-rum-through-synthetics/
  tag: ドキュメント
  text: Synthetics で RUM とセッションリプレイを確認する
- link: /synthetics/guide/browser-tests-totp
  tag: ドキュメント
  text: ブラウザテストにおける多要素認証 (MFA) 用 TOTP
---

## 概要

[Synthetic Monitoring & Continuous Testing の設定ページ][1]で、次のトピックにアクセスして制御することができます。

* [デフォルトの設定](#default-settings)
* [プライベートロケーション](#private-locations)
* [グローバル変数](#global-variables)
* [インテグレーション設定](#integration-settings)
* [Continuous Testing 設定][2]
* [モバイルアプリケーションの設定][18]

## デフォルトの設定

### 強制タグの設定

Usage Attribution ページでは、コストと使用量の属性を分析するために最大 3 つのタグを構成できます。Synthetic テストを作成または編集する際に、ユーザーがすべての構成済み使用量属性タグを入力することを要求するには、**Enforce tags for usage attribution on all tests** (すべてのテストで使用量属性に関するタグを強制する) を選択します。この設定を有効にした場合、ユーザーはすべての必須タグを入力しないとテストを保存できません。

### デフォルトの場所

[API テスト][4]、[マルチステップ API テスト][5]、または[ブラウザテスト][6]の詳細にデフォルトの場所を選択します。

Datadog で管理されるすべての場所と、ご使用のアカウントでセットアップしたプライベートロケーションから選択できます。

ロケーションの選択が完了したら、**Save Default Locations** をクリックします。

### デフォルトのブラウザとデバイス

[ブラウザテスト][6]の詳細で、デフォルトのブラウザとデバイスの種類を選択します。

ブラウザは、Google Chrome、Mozilla Firefox、Microsoft Edge から選択できます。デバイスは、大型のノートパソコン、タブレット、小型のモバイルデバイスから選択できます。

ブラウザとデバイスの選択が完了したら、**Save Default Browsers &amp; Devices** をクリックします。

### デフォルトのタグ

[API テスト][4]、[マルチステップ API テスト][5]、または[ブラウザテスト][6]の詳細にデフォルトのタグを選択または追加します。

関連タグの選択が完了したら、**Save Default Tags** をクリックします。

### 権限

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][11]を持つユーザーのみが Synthetic Monitoring **Default Settings** ページにアクセスできます。**Default Settings** ページにアクセスするには、ユーザーをこの 2 つの[デフォルトのロール][11]のいずれかにアップグレードします。

[カスタムロール機能][12]を使用している場合は、`synthetics_default_settings_read` および `synthetics_default_settings_write` 権限を含むカスタムロールにユーザーを追加します。

## インテグレーション設定

{{< img src="synthetics/settings/integration_settings.png" alt="インテグレーション設定ページ" style="width:100%;">}}

### ブラウザテスト用の APM インテグレーション

Datadog の APM インテグレーションヘッダーにより、Datadog はブラウザテストと APM を関連付けることができます。 

APM ヘッダーを送信するエンドポイントを定義するには、**Value** リストに URL を追加します。エンドポイントがトレースされ、許可されている場合、ブラウザテストの結果は自動的にその対応するトレースに結びつけられます。

`*` を使用すると幅広いドメイン名を許容することができます。たとえば、`https://*.datadoghq.com/*` を追加すると、`https://datadoghq.com/` のすべてが許可されます。URL の追加が完了したら、**Save APM Integration Settings** をクリックします。

詳しくは、[Synthetics と APM トレースの接続][15]をご覧ください。

### Synthetic データ収集と RUM アプリケーション

テスト実行からの RUM データの収集を Datadog に許可するには、**Enable Synthetic RUM data collection** (Synthetic RUM データ収集を有効にする) をクリックします。無効にすると、ブラウザテストレコーダーで RUM 設定を編集することができなくなります。変更を適用するには、**Save RUM Data Collection** をクリックします。

新しいブラウザテストがデータを送信するデフォルトのアプリケーションを選択します。**Default Application** ドロップダウンメニューを使用し、ブラウザテストのデータを収集する RUM アプリケーションを選択します。変更を適用するには、**Save RUM Data Applications** をクリックします。

詳しくは、[RUM とセッションリプレイの確認][14]をご覧ください。

## プライベートロケーション

詳しくは、[プライベートロケーションから Synthetic テストを実行する][3]をご覧ください。

## グローバル変数

グローバル変数は、Synthetic テストのすべてからアクセス可能な変数です。テストスイートの[シングル][4]、[マルチステップ API テスト][5]、[ブラウザテスト][6]、[モバイルアプリテスト][17]のすべてで使用することができます。

グローバル変数を作成するには、[**Synthetic Monitoring & Continuous Testing** > **Settings** ページ][7]の **Global Variables** タブに移動し、**+ New Global Variable** をクリックします。

作成する変数のタイプを選択します。

{{< tabs >}}
{{% tab "Specify Value" %}}

1. **Variable Name** を入力します。変数名に使用できるのは大文字、数字、アンダースコアのみです。この名前は、グローバル変数全体で一意である必要があります。
2. オプションで、**Description** を入力し、**Tags** を選択して変数と関連付けます。
3. 変数に割り当てる **Value** を入力します。
4. 変数の難読化を有効にすると、テスト結果に値が表示されません (オプション)。

{{< img src="synthetics/settings/variable_value_2.png" alt="グローバル変数による値の指定" style="width:100%;">}}

{{% /tab %}}

{{% tab "テストから作成" %}}

既存の [HTTP テスト][1]からは、関連するレスポンスヘッダーや本文をパースして変数を作成し、既存の[マルチステップ API テスト][2]からは、抽出した変数を使用して作成することができます。

{{< img src="synthetics/settings/global_variable.png" alt="マルチステップ API テストから抽出できる利用可能な変数" style="width:100%;" >}}

1. **Variable Name** を入力します。変数名に使用できるのは大文字、数字、アンダースコアのみです。
2. オプションで、**Description** を入力し、**Tags** を選択して変数と関連付けます。
3. 変数の難読化を有効にすると、テスト結果に値が表示されません (オプション)。
4. 変数を抽出したい **test** を選択します。
5. マルチステップ API テストを使用している場合、テストからローカル変数を抽出します。HTTP テストを使用している場合は、レスポンスヘッダーあるいはレスポンス本文から変数を抽出するように選択します。

    * **Response Header** から値を抽出: レスポンスのヘッダー全体を変数に使用するか、レスポンスのヘッダーを [`regex`][3] でパースします。
    * **Response Body** から値を抽出: リクエストのレスポンス本文全体を使用するか、レスポンス本文を [`regex`][3]、[`jsonpath`][4]、[`xpath`][5] でパースします。
    * **Response Status Code** から値を抽出する。

正規表現による値の抽出のほか、[正規表現][3]を使って次のようにパースすることもできます。

  - パターンの最初のインスタンスだけでなく、与えられたパターンのすべてのインスタンスにもマッチする
  - マッチングパターンの大文字小文字を無視する
  - 複数行に渡る文字列のマッチング
  - 渡された正規表現パターンをユニコードとして扱う
  - ピリオド記号で改行を識別できるようにする
  - 正規表現パターン内の指定されたインデックスからマッチする
  - マッチしたパターンを与えられた値で代用する

{{< img src="synthetics/settings/parsing_regex_field.png" alt="HTTP テストのレスポンス本文を正規表現でパースする" style="width:80%;">}}

変数の値は抽出元のテストが実行される度に更新されます。

[1]: /synthetics/api_tests/http_tests/
[2]: /synthetics/multistep/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
{{% /tab %}}

{{% tab "MFA Token" %}}  

TOTP を生成しテストで使用するには、シークレットキーを入植する場所にグローバル変数を作成するか、認証プロバイダーからの QR コードをアップロードします。

1. **Choose variable type** で **MFA Token** を選択します。
2. **Define Variable** で、**Variable Name** を入力します。変数名に使用できるのは大文字、数字、アンダースコアのみです。
3. オプションで、**Description** を入力し、**Tags** を選択して変数と関連付けます。
4. 変数に**シークレットキー**を入力するか、QR コードイメージをアップロードします。
5. **+ Generate** をクリックして OTP を作成します。**コピー**アイコンを使用すると、生成した OTP をコピーできます。

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="MFA トークンの作成" style="width:100%;" >}}

ブラウザテストにおける TOTP ベースの MFA については、[ブラウザテストにおける多要素認証 (MFA) のための TOTP][1] を参照してください。

[1]: /synthetics/guide/browser-tests-totp
{{% /tab %}}
{{% tab "Virtual Authenticator" %}}

Synthetic テストでパスキーを使ってユーザージャーニーを完了するには、Virtual Authenticator グローバル変数を作成します。このグローバル変数は、Synthetic のすべてのブラウザテストでパスキーを生成し、保存するために使用されます。詳しくは、[ブラウザテストでパスキーを使う][1]を参照してください。

1. [**Synthetic Monitoring & Continuous Testing** > **Settings**][1] の **Global Variables** タブに移動し、**+ New Global Variable** をクリックします。

1. **Choose variable type** セクションで、**Virtual Authenticator** を選択します。
2. **Specify variable details** セクションで、**Variable Name** を入力します。変数名に使用できるのは大文字、数字、アンダースコアのみです。
3. オプションで、**Description** を入力し、変数に関連付ける **Tags** を選択します。Datadog は、パスキーの生成と保存に使用される Virtual Authenticator を作成します。
4. **Permissions settings** セクションで、組織内のロールに基づいて変数へのアクセスを制限します。ロールの詳細については、[RBAC ドキュメント][2]を参照してください。

{{< img src="synthetics/guide/browser-tests-passkeys/new-variable-virtual-authenticator.png" alt="Virtual Authenticator の作成" style="width:80%;" >}}

[1]: /synthetics/guide/browser-tests-passkeys
[2]: /account_management/rbac/?tab=datadogapplication#custom-roles
{{% /tab %}}
{{< /tabs >}}

一度作成したグローバル変数は、すべての Synthetic テストで使用することができます。グローバル変数をテストにインポートするには、**+ Variables** をクリックし、変数を追加するフィールドに `{{` と入力し、グローバル変数を選択します。


変数については、[HTTP テスト][8]、[マルチステップ API テスト][9]、[ブラウザテスト][10]、[モバイルアプリテスト][19]、[ブラウザテストステップのドキュメント][16]をご参照ください。

### 権限

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][11]を持つユーザーのみが Synthetic Monitoring **Global Variables** ページにアクセスできます。ユーザーをこの 2 つの[デフォルトのロール][11]のいずれかにアップグレードすると、**Global Variables** ページにアクセスできます。

[カスタムロール機能][12]を使用している場合は、`synthetics_default_settings_read` および `synthetics_default_settings_write` 権限を含むカスタムロールにユーザーを追加します。

### アクセス制限

アカウントに[カスタムロール][11]を使用しているお客様は、アクセス制限が可能です。[カスタムロール機能][12]を使用している場合は、`synthetics_global_variable_read` および `synthetics_global_variable_write` 権限を含むカスタムロールにユーザーを追加します。

組織内のロールに基づきグローバル変数へのアクセスを制限できます。グローバル変数を作成する際に、**Permissions settings** で、グローバル変数の読み取りおよび書き込みが可能なロール (ユーザーに加えて) を選択します。

{{< img src="synthetics/settings/restrict_access_1.png" alt="グローバル変数へのアクセス制限" style="width:100%;" >}}

## インテグレーション設定

{{< img src="synthetics/settings/integration_settings.png" alt="インテグレーション設定ページ" style="width:100%;">}}

### ブラウザテスト用の APM インテグレーション

APM インテグレーションのヘッダーをその URL に追加することを許可します。Datadog APM インテグレーションのヘッダーでは、APM を使用して Datadog をブラウザテストにリンクさせることができます。

APM ヘッダーを送信するエンドポイントを定義するには、**Value** フィールドに URL を入力します。エンドポイントがトレースされ、許可されている場合、ブラウザテストの結果は自動的にその対応するトレースに結びつけられます。

`*` を使用すると幅広いドメイン名を許容することができます。たとえば、`https://*.datadoghq.com/*` を追加すると、`https://datadoghq.com/` のすべてが許可されます。URL の追加が完了したら、**Save APM Integration Settings** をクリックします。

詳しくは、[Synthetics と APM トレースの接続][15]をご覧ください。

### Synthetic データ収集と RUM アプリケーション

Datadog がテスト実行から RUM データを収集することを許可するには、**Enable Synthetic RUM data collection** をクリックします。無効にすると、ブラウザテストレコーダーで RUM 設定を編集することができなくなります。データ収集の有効化が完了したら、**Save RUM Data Collection** をクリックします。

ブラウザテストデータを収集する RUM アプリケーションを **Default Application** ドロップダウンメニューから選択します。デフォルトアプリケーションの指定が完了したら、**Save RUM Data Applications** をクリックします。

詳しくは、[RUM とセッションリプレイの確認][14]をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings
[2]: /continuous_testing/settings/
[3]: /synthetics/private_locations/
[4]: /synthetics/api_tests/
[5]: /synthetics/multistep/
[6]: /synthetics/browser_tests/
[7]: https://app.datadoghq.com/synthetics/settings/variables
[8]: /synthetics/api_tests/http_tests?tab=requestoptions#use-variables
[9]: /synthetics/multistep?tab=requestoptions#use-variables
[10]: /synthetics/browser_tests/?tab=requestoptions#use-global-variables
[11]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[12]: /account_management/rbac/?tab=datadogapplication#custom-roles
[13]: /account_management/billing/usage_attribution
[14]: /synthetics/guide/explore-rum-through-synthetics/
[15]: /synthetics/apm/#prerequisites
[16]: /synthetics/browser_tests/actions/#use-variables
[17]: /mobile_app_testing/mobile_app_tests/
[18]: /mobile_app_testing/settings/
[19]: /mobile_app_testing/mobile_app_tests/#use-global-variables