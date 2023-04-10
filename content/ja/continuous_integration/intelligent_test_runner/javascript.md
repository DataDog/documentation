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
  * `dd-trace>=3.11.0` または `dd-trace>=2.24.0` 以降
  * `testRunner` としてサポートされているのは `jest-circus/runner` のみです。
  * テスト環境としてサポートされているのは `jsdom` と `node` のみです。
* `mocha>=5.2.0`
  * `dd-trace>=3.11.0` または `dd-trace>=2.24.0` 以降

## セットアップ

Intelligent Test Runner を設定する前に、[Test Visibility for Javascript and Typescript][1] を設定してください。Agent を通してデータを報告する場合は、v6.40+/v7.40+ を使用してください。

Intelligent Test Runner を有効にするには、以下の環境変数を設定します。

`DD_APPLICATION_KEY` (必須)
: スキップするテストをクエリするために使用する [Datadog アプリケーションキー][2]。<br/>
**デフォルト**: `(empty)`

`DD_CIVISIBILITY_ITR_ENABLED=true` (必須)
: テストスキップを有効にするためのフラグ。 <br/>
**デフォルト**: `false`<br/>
**注**: ベータ版のみ必要

これらの環境変数を設定した後、通常通りテストを実行します。

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$API_KEY DD_APPLICATION_KEY=$APP_KEY DD_CIVISIBILITY_ITR_ENABLED=true yarn test
{{< /code-block >}}


#### UI アクティベーション
環境変数の設定に加えて、お客様またはお客様の組織で "Intelligent Test Runner Activation" 権限を持つユーザーが、[テストサービス設定][3]ページで Intelligent Test Runner を有効にする必要があります。

{{< img src="continuous_integration/itr_overview.png" alt="Datadog の CI セクションのテストサービス設定で Intelligent test runner を有効にする">}}

#### スイートスキップ
Intelligent test runner for Javascript は、個々のテストではなく、_テストスイート_ (テストファイル) 全体をスキップします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/tests/javascript
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: https://app.datadoghq.com/ci/settings/test-service