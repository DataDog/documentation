---
title: Synthetic モニタリングの設定
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
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
---
[Synthetic モニタリングの設定ページ][1]では、次の設定を調整できます。

* [グローバル変数](#global-variables)
* [プライベートロケーション][2]
* [デフォルトの設定](#default-settings)
  * [デフォルトのロケーション](#default-locations)
  * [ブラウザテスト用の APM インテグレーション](#apm-integration-for-browser-tests)

[管理者ユーザーと標準ユーザー][3]のみが Synthetic モニタリングの `Settings` ページにアクセスできます。

## グローバル変数

グローバル変数とは、複数の [API テスト][4]や[ブラウザテスト][5]に使用できる変数です。新しいグローバル変数を作成するには、**Settings** ページで [Global Variables][6] タブに移動し、ページ右上の **New Global Variable** をクリックします。
作成する変数のタイプを選択します。

{{< tabs >}}
{{% tab "Specify Value" %}}

1. **Variable Name** を入力します。変数名に使用できるのは大文字、数字、アンダースコアのみです。
2. **Value** を入力します。
3. 変数を保護するかどうか決定します。保護すると、テスト結果の全ユーザーの変数の値が難読化されます。
4. 任意: **Tags** を選択して変数と関連付けます。
5. 任意: 変数の **Description** を入力します。

{{< img src="synthetics/settings/variable_specifyvalue.png" alt="グローバル変数 : 値の指定"  style="width:80%;">}}

{{% /tab %}}

{{% tab "Create From HTTP Test" %}}

レスポンスヘッダーや本文をパースして、既存の HTTP テストから変数を作成できます。変数は、元のテストと同じ頻度で更新されます。

1. **Variable Name** を入力します。変数名に使用できるのは大文字、数字、アンダースコアのみです。
2. 変数の抽出元となるテストを選びます。
3. 変数を保護するかどうか決定します。保護すると、全ユーザーに対してテスト結果の変数の値が難読化されます。
4. 任意: **Tags** を選択して変数と関連付けます。
5. 任意: 変数の **Description** を入力します。
6. 変数をレスポンスのヘッダーから抽出するか、本文から抽出するか決定します。
    * **レスポンスのヘッダー**から値を抽出: レスポンスのヘッダー全体を変数に使用するか、レスポンスのヘッダーを[正規表現][1]によりパースします。
    * **レスポンスの本文**から値を抽出: リクエストのレスポンス本文全体を使用するか、レスポンス本文を[正規表現][1]によりパースします。

{{< img src="synthetics/settings/variable_from_http.png" alt="http の変数"  style="width:80%;">}}

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
{{% /tab %}}

{{< /tabs >}}

## デフォルトの設定

### デフォルトのロケーション

ブラウザと API テストの詳細のデフォルトとなるロケーションを選択します。 Datadog 管理下のすべてのロケーションと、ご使用のアカウントでセットアップしたプライベートロケーションから選択できます。

### ブラウザテスト用の APM インテグレーション

APM インテグレーションのヘッダーを URL に追加することを許可します。Datadog APM インテグレーションのヘッダーでは、APM を使用して Datadog をブラウザテストにリンクさせることができます。このセクションで URL を追加して、APM ヘッダーの送信先となるエンドポイントを定義します。

`*` を使用すると幅広いドメイン名を許容することができます。たとえば、`https://*.datadoghq.com/*` を追加すると、`https://datadoghq.com/` のすべてが許可されます。

エンドポイントがトレースおよび許可されていれば、ブラウザテストの結果は対応するトレースに自動的に結び付けられます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings
[2]: /ja/synthetics/private_locations/
[3]: /ja/account_management/users/default_roles/
[4]: /ja/synthetics/api_tests/#use-global-variables
[5]: /ja/synthetics/browser_tests/#use-global-variables
[6]: https://app.datadoghq.com/synthetics/settings/variables