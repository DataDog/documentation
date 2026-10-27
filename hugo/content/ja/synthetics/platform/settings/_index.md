---
aliases:
- /ja/synthetics/settings
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
  tag: 外部サイト
  text: Terraform による Synthetic グローバル変数の作成と管理
- link: /synthetics/api_tests/
  tag: ドキュメント
  text: API テストを設定する
- link: /synthetics/multistep/
  tag: ドキュメント
  text: マルチステップ API テストを構成する
- link: /synthetics/browser_tests/
  tag: ドキュメント
  text: ブラウザテストを設定する
- link: /mobile_app_testing/
  tag: ドキュメント
  text: モバイルテストを構成する
- link: /synthetics/private_locations/
  tag: ドキュメント
  text: プライベートロケーションを作成する
- link: /synthetics/platform/rum/
  tag: ドキュメント
  text: RUM を Synthetic Monitoring に接続する
title: Synthetic Testing およびモニタリングの設定
---
## 概要 {#overview}

[Synthetic Monitoring & Continuous Testing の設定ページ][1] で、次のトピックにアクセスして制御することができます。

* [デフォルトの設定](#default-settings)
* [ダウンタイム][25]
* [プライベートロケーション](#private-locations)
* [グローバル変数](#global-variables)
* [インテグレーション設定](#integration-settings)
* [Continuous Testing の設定][2]
* [モバイルアプリケーションの設定][18]

## デフォルトの設定 {#default-settings}

### 強制タグの設定{#enforced-tags-settings}

#### すべてのテストにおいて**使用属性**タグを必須にする{#enforce-tags-for-usage-attribution-on-all-tests}

[Usage Attribution] ページでは、コストと使用状況の属性を分類するためのタグを最大 3 つまで構成できます。[{{< ui >}}Enforce tags for usage attribution on all tests{{< /ui >}}] (すべてのテストで使用状況属性のタグを強制する) を選択すると、Synthetic テストの作成または編集時に、構成されたすべての使用状況帰属タグの入力をユーザーに必須にできます。この設定を有効にすると、必要なタグをすべて入力しない限り、ユーザーはテストを保存できません。

#### すべてのテストに対して必須の**モニタータグポリシー**を適用する{#enforce-required-monitor-tag-policies-on-all-tests}

[Synthetic Monitoring およびテスト設定][20] ページで [{{< ui >}}Enforce required monitor tag policies on all tests{{< /ui >}}] を選択すると、ユーザー定義のモニタータグポリシーを Synthetic テストに適用することが必須になります。この設定を有効にすると、必要なタグをすべて入力しない限り、ユーザーはテストを保存できません。

  <br>

  1. [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} ページ][21] でモニタータグを構成します。

  <br>

   {{< img src="synthetics/settings/monitor_tag_policy.png" alt="構成されたモニターポリシータグを表示する Monitor Settings ページ" style="width:80%;">}}

  2. Synthetic ブラウザテストを作成し、必要なポリシータグを追加します。

  <br>

  {{< img src="synthetics/settings/monitor_tags.png" alt="ポリシータグ機能を強調表示した新しい Synthetic テストページ" style="width:80%;">}}

### デフォルトの場所 {#default-locations}

[API テスト][4]、[マルチステップ API テスト][5]、または [ブラウザテスト][6] の詳細にデフォルトの場所を選択します。

Datadog で管理されるすべての場所と、ご使用のアカウントでセットアップしたプライベートロケーションから選択できます。

場所の選択が完了したら、[{{< ui >}}Save Default Locations{{< /ui >}}] をクリックします。

### デフォルトのブラウザとデバイス {#default-browsers-and-devices}

[ブラウザテスト][6] の詳細で、デフォルトのブラウザとデバイスの種類を選択します。

ブラウザのオプションには、Google Chrome、Mozilla Firefox、Microsoft Edge があります。デバイスのオプションには、大型ノートパソコン、タブレット、小型モバイルデバイスがあります。

ブラウザとデバイスの選択が完了したら、[{{< ui >}}Save Default Browsers & Devices{{< /ui >}}] をクリックします。

### デフォルトのタグ {#default-tags}

[API テスト][4]、[マルチステップ API テスト][5]、または [ブラウザテスト][6] の詳細にデフォルトのタグを選択または追加します。

関連タグの選択が完了したら、[{{< ui >}}Save Default Tags{{< /ui >}}] をクリックします。

### デフォルトタイムアウト {#default-timeout}

[API テスト][4] の詳細に対してデフォルトのタイムアウトを追加します。

新しいタイムアウトの入力が完了したら、[{{< ui >}}Save Default Timeouts{{< /ui >}}] をクリックします。

### デフォルト頻度 {#default-frequency}

[API テスト][4]、[ブラウザテスト][6]、または [モバイルテスト][17] の詳細に対して、デフォルトの頻度を選択または追加します。

関連タグの選択が完了したら、[{{< ui >}}Save Default Frequencies{{< /ui >}}] をクリックします。

### デフォルトリトライ回数 {#default-retries}

[API テスト][4]、[ブラウザテスト][6]、または [モバイルテスト][17] の詳細に対して、失敗時に再試行するデフォルト回数を選択または追加します。

デフォルトの再試行回数を入力し終えたら、[{{< ui >}}Save Default Retries{{< /ui >}}] をクリックします。

### デフォルトのモバイルデバイス {#default-mobile-devices}

[モバイルテスト][17] の詳細に対して、使用するデフォルトのモバイルデバイスを選択または追加します。

デフォルトのモバイルデバイスを入力し終えたら、[{{< ui >}}Save Default Devices{{< /ui >}}] をクリックします。

### 権限 {#permissions}

デフォルトでは、[Datadog Admin および Datadog 標準のロール][11] を持つユーザーのみが Synthetic Monitoring {{< ui >}}Default Settings{{< /ui >}} ページにアクセスできます。{{< ui >}}Default Settings{{< /ui >}} ページにアクセスするには、ユーザーをこれら 2 つの [デフォルトロール][11] のいずれかにアップグレードしてください。

[カスタムロール機能][12] を使用している場合は、`synthetics_default_settings_read` および `synthetics_default_settings_write` の権限を含むカスタムロールにユーザーを追加します。

## ダウンタイム {#downtimes}

詳細については、「[スケジュールされたダウンタイム][25]」を参照してください。

## プライベートロケーション {#private-locations}

詳しくは、「[プライベートロケーションから Synthetic テストを実行する][3]」をご覧ください。

## グローバル変数 {#global-variables}

グローバル変数は、すべての Synthetic テストからアクセス可能な変数です。これらは、テストスイートのすべての [シングル][4]、[マルチステップ API テスト][5]、[ブラウザテスト][6]、および [モバイルアプリテスト][17] で使用できます。

グローバル変数を作成するには、[{{< ui >}}Synthetic Monitoring & Continuous Testing{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} ページ][7] の [{{< ui >}}Global Variables{{< /ui >}}] タブに移動し、[{{< ui >}}\+ New Global Variable{{< /ui >}}] をクリックします。

作成する変数のタイプを選択します。

{{< tabs >}}
{{% tab "値を指定する" %}}

1. [{{< ui >}}Variable Name{{< /ui >}}] を入力します。変数名には、大文字の英字、数字、アンダースコアのみを使用できます。この名前は、グローバル変数全体で一意である必要があります。
2. オプションとして、[{{< ui >}}Description{{< /ui >}}] を入力し、変数に関連付ける [{{< ui >}}Tags{{< /ui >}}] を選択します。
3. 変数に割り当てる {{< ui >}}Value{{< /ui >}} を入力します。
4. オプションとして、組み込み関数を使用して変数に値を割り当てることもできます。たとえば、`{{ alphabetic(n) }}` 組み込み関数をクリックすると、[{{< ui >}}Value{{< /ui >}}] フィールドにアルファベット値の例が入力されます。
5. オプションとして、テスト結果上で値を非表示にするため、変数の難読化を有効にできます。

{{< img src="synthetics/settings/variable_value_3.png" alt="グローバル変数の値の指定" style="width:100%;">}}

利用可能なビルトインは以下のとおりです。

&#x7b;&#x7b; numeric(n) &#x7d;&#x7d;
: `n` 桁の数字列を生成します。

&#x7b;&#x7b; alphabetic(n) &#x7d;&#x7d;
: `n` 文字のアルファベット文字列を生成します。

&#x7b;&#x7b; alphanumeric(n) &#x7d;&#x7d;
`n`:  文字の英数字文字列を生成します。

&#x7b;&#x7b; date(n unit, format) &#x7d;&#x7d;
: テスト開始時の UTC 日時を基準に、`n` 単位を加算または減算した値を、Datadog でサポートされている形式の日付として生成します。

&#x7b;&#x7b; timestamp(n, unit) &#x7d;&#x7d;
: テスト開始時の UTC タイムスタンプを基準に、`n` 単位を加算または減算した値を、Datadog でサポートされている単位のタイムスタンプとして生成します。

&#x7b;&#x7b; uuid &#x7d;&#x7d;
: バージョン 4 の UUID (Universally unique identifier) を生成します。

&#x7b;&#x7b; public-id &#x7d;&#x7d;
: テストのパブリック ID を挿入します。

&#x7b;&#x7b; result-id &#x7d;&#x7d;
: テスト実行の結果 ID を挿入します。

{{% /tab %}}

{{% tab "テストから作成する" %}}

既存の [HTTP テスト][1] からは、関連するレスポンスヘッダーや本文をパースして変数を作成し、既存の [マルチステップ API テスト][2] からは、抽出した変数を使用して作成することができます。

{{< img src="synthetics/settings/global_variable.png" alt="マルチステップ API テストから抽出可能な変数" style="width:100%;" >}}

1. [{{< ui >}}Variable Name{{< /ui >}}] を入力します。変数名には、大文字の英字、数字、アンダースコアのみを使用できます。
2. オプションとして、[{{< ui >}}Description{{< /ui >}}] を入力し、変数に関連付ける [{{< ui >}}Tags{{< /ui >}}] を選択します。
3. 変数の難読化を有効にすると、テスト結果に値が表示されません (オプション)。
4. 変数を抽出する**テスト**を選択します。
5. マルチステップ API テストを使用している場合は、テストからローカル変数を抽出します。HTTP テストを使用している場合は、レスポンスヘッダーまたはレスポンスボディから変数を抽出するよう選択します。

    * {{< ui >}}Response Header{{< /ui >}} から値を抽出: レスポンスのヘッダー全体を変数として使用するか、[`regex`][3] でパースします。
    * {{< ui >}}Response Body{{< /ui >}} から値を抽出: [`regex`][3]、[`jsonpath`][4]、[`xpath`][5] でレスポンスボディをパースするか、レスポンスボディ全体を使用します。
    *  {{< ui >}}Response Status Code{{< /ui >}} から値を抽出します。

正規表現による値の抽出のほか、[正規表現][3] を使って次のようにパースすることもできます。

  - パターンの最初のインスタンスだけでなく、与えられたパターンのすべてのインスタンスにもマッチする
  - マッチングパターンの大文字と小文字を区別しない
  - 複数行にわたる文字列を対象とする
  - 指定された正規表現パターンを Unicode として扱う
  - ピリオド記号で改行文字にも一致させる
  - 正規表現パターン内の指定されたインデックスからマッチ判定を開始する
  - マッチしたパターンを指定された値に置換する

{{< img src="synthetics/settings/parsing_regex_field.png" alt="HTTP テストのレスポンスボディを正規表現でパースする" style="width:80%;">}}

変数の値は抽出元のテストが実行される度に更新されます。

[1]: /ja/synthetics/api_tests/http_tests/
[2]: /ja/synthetics/multistep/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
{{% /tab %}}

{{% tab "MFA トークン" %}}

TOTP を生成してテストで使用するには、シークレットキーを入力する場所にグローバル変数を作成するか、認証プロバイダーからの QR コードをアップロードします。**注:** 現在、TOTP でサポートされているハッシュアルゴリズムは SHA1 のみです。

1.  [{{< ui >}}Choose variable type{{< /ui >}}] で、[{{< ui >}}MFA Token{{< /ui >}}] を選択します。
2. [{{< ui >}}Define Variable{{< /ui >}}] に、{{< ui >}}Variable Name{{< /ui >}} を入力します。変数名には、大文字の英字、数字、アンダースコアのみを使用できます。
3.  オプションとして、[{{< ui >}}Description{{< /ui >}}] を入力し、変数に関連付ける [{{< ui >}}Tags{{< /ui >}}] を選択します。
4.  変数の {{< ui >}}Secret Key{{< /ui >}} を入力するか、QR コード画像をアップロードします。
5. [{{< ui >}}\+ Generate{{< /ui >}}] をクリックして OTP を作成します。生成された OTP は {{< ui >}}Copy{{< /ui >}} アイコンでコピーできます。

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="MFA トークンを作成する" style="width:100%;" >}}

**注**: お使いの TOTP トークンが Google Authenticator で動作する場合、Datadog と互換性がある可能性が高いです。
一部の QR コードは特定の検証方法に限定されており、それらはプラットフォーム間で動作しない場合があります。互換性を確保するため、標準の TOTP プロトコルに従う QR コードまたはシークレットを使用してください。

ブラウザテストにおける TOTP ベースの MFA については、「[ブラウザテストにおける多要素認証 (MFA) 用 TOTP][1]」を参照してください。

[1]: /ja/synthetics/guide/browser-tests-totp
{{% /tab %}}
{{% tab "Virtual Authenticator" %}}

Synthetic テストでパスキーを使用したユーザージャーニーを完了させるには、Virtual Authenticator のグローバル変数を作成します。このグローバル変数は、すべての Synthetic ブラウザテストでパスキーを生成および保存するために使用されます。詳細については、「[ブラウザテストでのパスキーの使用][1]」を参照してください。

1.  [{{< ui >}}Synthetic Monitoring & Continuous Testing{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1] の [{{< ui >}}Global Variables{{< /ui >}}] タブに移動し、[{{< ui >}}\+ New Global Variable{{< /ui >}}] をクリックします。

1. [{{< ui >}}Choose variable type{{< /ui >}}] セクションで、[{{< ui >}}Virtual Authenticator{{< /ui >}}] を選択します。
2. [{{< ui >}}Specify variable details{{< /ui >}}] セクションで、[{{< ui >}}Variable Name{{< /ui >}}] を入力します。変数名には、大文字の英字、数字、アンダースコアのみを使用できます。
3. オプションとして、[{{< ui >}}Description{{< /ui >}}] を入力し、変数に関連付ける [{{< ui >}}Tags{{< /ui >}}] を選択します。これで、パスキーの生成と保存に使用される Virtual Authenticator が Datadog によって作成されます。
4. [{{< ui >}}Permissions settings{{< /ui >}}] セクションで、組織内のロールに基づいて変数へのアクセスを制限します。ロールの詳細については、「[RBAC のドキュメント][2]」を参照してください。

{{< img src="synthetics/guide/browser-tests-passkeys/new-variable-virtual-authenticator.png" alt="Virtual Authenticator を作成する" style="width:80%;" >}}

[1]: /ja/synthetics/guide/browser-tests-passkeys
[2]: /ja/account_management/rbac/?tab=datadogapplication#custom-roles
{{% /tab %}}
{{< /tabs >}}

作成されたグローバル変数は、すべての Synthetic テストで使用できます。グローバル変数をテストにインポートするには、[{{< ui >}}\+ Variables{{< /ui >}}] をクリックし、変数を追加するフィールドに `{{` と入力し、対象のグローバル変数を選択します。


変数については、[HTTP テスト][8]、[マルチステップ API テスト][9]、[ブラウザテスト][10]、[モバイルアプリテスト][19]、[ブラウザテストステップのドキュメント][16] をご参照ください。

### 権限{#permissions-1}

デフォルトでは、[Datadog Admin および Datadog 標準のロール][11] を持つユーザーのみが Synthetic Monitoring {{< ui >}}Global Variables{{< /ui >}} ページにアクセスできます。{{< ui >}}Global Variables{{< /ui >}} ページへのアクセス権を取得するには、ユーザーをこれら 2 つの [デフォルトロール][11] のいずれかにアップグレードする必要があります。

[カスタムロール機能][12] を使用している場合は、`synthetics_default_settings_read` および `synthetics_default_settings_write` の権限を含むカスタムロールにユーザーを追加します。

### アクセス制限 {#restrict-access}

ロール、チーム、または個々のユーザーに基づいて、テストへのアクセス権を制限するには [きめ細かなアクセス制御][22] を使用します。

1. フォームの権限セクションを開きます。
2. [{{< ui >}}Edit Access{{< /ui >}}] をクリックします。
  {{< img src="synthetics/settings/grace_2.png" alt="プライベートロケーションの構成フォームからテストの権限を設定する" style="width:100%;" >}}
3. [{{< ui >}}Restrict Access{{< /ui >}}] をクリックします。
4. チーム、ロール、またはユーザーを選択します。
5. [{{< ui >}}Add{{< /ui >}}] をクリックします。
6. それぞれに関連付けたいアクセスレベルを選択します。
7. [{{< ui >}}Done{{< /ui >}}] をクリックします。

<div class="alert alert-info">プライベートロケーションへの Viewer アクセス権がなくても、プライベートロケーションから結果を表示できます。</div>

| アクセスレベル | GV 値の表示 | GV メタデータの表示 | テストでの GV の使用 | GV 値/メタデータの編集  |
| ------------ | --------------| ---------------- | -------------- | ----------------------- |
| アクセスなし    |               |                  |                |                         |
| Viewer       | {{< X >}}     | {{< X >}}        | {{< X >}}      |                         |
| Editor       | {{< X >}}     | {{< X >}}        | {{< X >}}      | {{< X >}}               |

**注**: 変数を制限すると、他のユーザーがその変数をテストに追加して使用することができなくなります。ただし、既存のテストですでに使用されている場合、その変数名が非表示になるわけではありません。

## インテグレーション設定 {#integration-settings}

{{< img src="synthetics/settings/integration_settings.png" alt="インテグレーション設定ページ" style="width:100%;">}}

### ブラウザテスト用の APM インテグレーション {#apm-integration-for-browser-tests}

APM インテグレーションヘッダーの追加を許可する URL を指定します。Datadog の APM インテグレーションヘッダーにより、Datadog はブラウザテストと APM を関連付けることができます。

[{{< ui >}}Value{{< /ui >}}] フィールドに URL を入力して、APM ヘッダーを送信するエンドポイントを定義します。該当するエンドポイントがトレースおよび許可されていれば、ブラウザテストの結果は対応するトレースに自動的に結び付けられます。

`*` を使用して、より広範なドメイン名を許可することも可能です。たとえば、`https://*.datadoghq.com/*` を追加すると、`https://datadoghq.com/` 配下のすべてのパスが許可されます。URL の追加が完了したら、[{{< ui >}}Save APM Integration Settings{{< /ui >}}] をクリックします。

詳しくは、「[Synthetics と APM トレースの接続][15]」をご覧ください。

### Synthetic ブラウザテストのデータ収集と RUM アプリケーション {#synthetic-browser-test-data-collection-and-rum-applications}

Datadog がブラウザテストの実行から RUM データを収集できるようにするには、[{{< ui >}}Enable Synthetic RUM data collection{{< /ui >}}] をクリックします。無効にすると、ブラウザテストレコーダーで RUM 設定を編集できなくなります。データ収集の有効化が完了したら、[{{< ui >}}Save RUM Data Collection{{< /ui >}}] をクリックします。

{{< ui >}}Default Application{{< /ui >}} ドロップダウンメニューから、ブラウザテストデータを収集する RUM アプリケーションを選択します。デフォルトのアプリケーションの指定が完了したら、[{{< ui >}}Save RUM Data Applications{{< /ui >}}] をクリックします。

詳細については、「[RUM を Synthetic Monitoring に接続する][14]」を参照してください。

### Synthetic モバイルアプリケーションテストのデータ収集{#synthetic-mobile-application-test-data-collection}

Datadog は、モバイルアプリケーションのテスト実行から RUM データを収集できるようにするため、RUM [iOS SDK][23] または [Android SDK][24] を設定し、`.ipa` または `.apk` ファイルにパッケージ化します。これにより RUM データが自動的にリンクされ、テスト実行のエンドツーエンドの可観測性が得られます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings
[2]: /ja/continuous_testing/settings/
[3]: /ja/synthetics/private_locations/
[4]: /ja/synthetics/api_tests/
[5]: /ja/synthetics/multistep/
[6]: /ja/synthetics/browser_tests/
[7]: https://app.datadoghq.com/synthetics/settings/variables
[8]: /ja/synthetics/api_tests/http_tests?tab=requestoptions#use-variables
[9]: /ja/synthetics/multistep?tab=requestoptions#use-variables
[10]: /ja/synthetics/browser_tests/?tab=requestoptions#use-global-variables
[11]: /ja/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[12]: /ja/account_management/rbac/?tab=datadogapplication#custom-roles
[13]: /ja/account_management/billing/usage_attribution
[14]: /ja/synthetics/platform/rum/
[15]: /ja/synthetics/apm/#prerequisites
[16]: /ja/synthetics/browser_tests/test_steps/#use-variables
[17]: /ja/synthetics/mobile_app_testing/
[18]: /ja/synthetics/mobile_app_testing/settings/
[19]: /ja/synthetics/mobile_app_testing/#use-global-variables
[20]: https://app.datadoghq.com/synthetics/settings/default
[21]: https://app.datadoghq.com/monitors/settings/policies
[22]: /ja/account_management/rbac/granular_access
[23]: https://docs.datadoghq.com/ja/real_user_monitoring/application_monitoring/ios/setup?tab=swiftpackagemanagerspm
[24]: https://docs.datadoghq.com/ja/real_user_monitoring/application_monitoring/android/setup?tab=rum
[25]: /ja/synthetics/platform/downtime/