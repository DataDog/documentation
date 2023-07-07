---
further_reading:
- link: /continuous_integration/tests
  tag: Documentation
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: トラブルシューティング CI
kind: documentation
title: JavaScript と TypeScript のための Intelligent Test Runner
---

## 互換性

Intelligent Test Runner は、以下のバージョンとテストフレームワークでのみサポートされています。

* `jest>=24.8.0`
  * `dd-trace>=3.16.0` または `dd-trace>=2.29.0` 以降
  * `testRunner` としてサポートされているのは `jest-circus/runner` のみです。
  * テスト環境としてサポートされているのは `jsdom` と `node` のみです。
* `mocha>=5.2.0`
  * `dd-trace>=3.16.0` または `dd-trace>=2.29.0` 以降
  * コードカバレッジを有効にするために [`nyc`][1] で mocha を実行します。
* `cucumber-js>=7.0.0`
  * `dd-trace>=3.16.0` または `dd-trace>=2.29.0` 以降
  * コードカバレッジを有効にするために [`nyc`][1] で cucumber-js を実行します。
* `cypress>=6.7.0`
  * `dd-trace>=4.2.0`、`dd-trace>=3.23.0` または `dd-trace>=2.36.0` 以降。
  * コードカバレッジで Web アプリケーションをインスツルメンテーションします。詳しくは [Cypress の設定](#cypress-setup)でご確認ください。

## セットアップ

Intelligent Test Runner を設定する前に、[Test Visibility for Javascript and Typescript][2] を設定してください。Agent を通してデータを報告する場合は、v6.40+/v7.40+ を使用してください。

Intelligent Test Runner を有効にするには、以下の環境変数を設定します。

`DD_APPLICATION_KEY` (必須)
: スキップするテストをクエリするために使用する [Datadog アプリケーションキー][3]。<br/>
**デフォルト**: `(empty)`

これらの環境変数を設定した後、通常通りテストを実行します。

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$API_KEY DD_APPLICATION_KEY=$APP_KEY yarn test
{{< /code-block >}}

### Cypress の設定

Intelligent Test Runner for Cypress を動作させるためには、Web アプリケーションにコードカバレッジをインスツルメンテーションする必要があります。コードカバレッジの有効化については、[Cypress ドキュメント][4]で詳しく説明されています。コードカバレッジを有効にしたことを確認するには、Cypress で Web アプリに移動して、グローバル変数 `window.__coverage__` を確認します。これは、`dd-trace` が Intelligent Test Runner のコードカバレッジを収集するために使用するものです。


#### UI アクティベーション
環境変数の設定に加えて、お客様またはお客様の組織で "Intelligent Test Runner Activation" 権限を持つユーザーが、[テストサービス設定][5]ページで Intelligent Test Runner を有効にする必要があります。

{{< img src="continuous_integration/itr_overview.png" alt="Datadog の CI セクションのテストサービス設定で Intelligent test runner を有効にする">}}

#### スイートスキップ
Intelligent test runner for Javascript は、個々のテストではなく、_テストスイート_ (テストファイル) 全体をスキップします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/nyc
[2]: /ja/continuous_integration/tests/javascript
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://docs.cypress.io/guides/tooling/code-coverage#Instrumenting-code
[5]: https://app.datadoghq.com/ci/settings/test-service