---
aliases:
- /ja/continuous_integration/intelligent_test_runner/javascript/
- /ja/continuous_integration/intelligent_test_runner/setup/javascript/
- /ja/intelligent_test_runner/setup/javascript
code_lang: javascript
code_lang_weight: 20
further_reading:
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
title: JavaScript および TypeScript 向け Test Impact Analysis
type: multi-code-lang
---

## 概要

JavaScript 向け Test Impact Analysis は、個々のテストではなく、_テストスイート_ (テスト ファイル) 全体をスキップします。


## 互換性

Test Impact Analysis は、以下のバージョンとテストフレームワークでのみサポートされています。

* `jest>=24.8.0`
  * `dd-trace>=4.17.0` または `dd-trace>=3.38.0` 以降。　
  * `testRunner` としてサポートされているのは `jest-circus/runner` のみです。
  * テスト環境としてサポートされているのは `jsdom` と `node` のみです。
* `mocha>=5.2.0`
  * `dd-trace>=4.17.0` または `dd-trace>=3.38.0` 以降。　
  * コードカバレッジを有効にするために [`nyc`][1] で mocha を実行します。
* `cucumber-js>=7.0.0`
  * `dd-trace>=4.17.0` または `dd-trace>=3.38.0` 以降。　
  * コードカバレッジを有効にするために [`nyc`][1] で cucumber-js を実行します。
* `cypress>=6.7.0`
  * `dd-trace>=4.17.0` または `dd-trace>=3.38.0` 以降。　
  * [コードカバレッジ][2]を使用して Web アプリケーションをインスツルメントします。

## セットアップ

### テストの最適化

Test Impact Analysis を設定する前に、[JavaScript および TypeScript 向け Test Optimization][3] をセットアップしてください。Agent 経由でデータを報告する場合は、v6.40 以降または v7.40 以降を使用してください。

{{% ci-itr-activation-instructions %}}

## Run tests with Test Impact Analysis enabled

{{< tabs >}}

{{% tab "オンプレミス CI プロバイダー (Datadog Agent)" %}}

設定が完了したら、通常通りテストを実行します。

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
{{< /code-block >}}

{{% /tab %}}

{{% tab "クラウド CI プロバイダー (エージェントレス)" %}}

設定が完了したら、通常通りテストを実行します。

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$DD_API_KEY yarn test
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Cypress

Cypress 向け Test Impact Analysis を動作させるには、Web アプリケーションをコード カバレッジでインスツルメントする必要があります。コード カバレッジを有効化する方法の詳細は、[Cypress ドキュメント][2] を参照してください。

コードカバレッジを有効にしたことを確認するには、Cypress で Web アプリに移動して、グローバル変数 `window.__coverage__` を確認します。これは、`dd-trace` が Test Impact Analysis のコードカバレッジを収集するために使用するものです。

## 一貫性のないテスト期間

`jest` のようないくつかのフレームワークでは、他のテストが実行された後にテストを高速化するキャッシュ機構があります ([jest キャッシュ][4]のドキュメントを参照)。Test Impact Analysis がいくつかのテストファイル以外をすべてスキップしている場合、これらのスイートの実行速度は通常よりも遅くなるかもしれません。これは、よりコールドなキャッシュで実行されるためです。これに関係なく、テストコマンドの総実行時間は短縮されるはずです。

## 特定のテストに対するスキップの無効化

You can override the Test Impact Analysis behavior and prevent specific tests from being skipped. These tests are referred to as unskippable tests.

### テストをスキップできないようにする理由は？

Test Impact Analysis uses code coverage data to determine whether or not tests should be skipped. In some cases, this data may not be sufficient to make this determination.

例:

* テキストファイルからデータを読み込むテスト
* テスト対象のコード以外の API とやりとりするテスト (リモートの REST API など)

Designating tests as unskippable ensures that Test Impact Analysis runs them regardless of coverage data.

### Marking tests as unskippable

{{< tabs >}}
{{% tab "Jest/Mocha/Cypress" %}}
テスト ファイルの先頭で次の Doc ブロックを使用すると、スイートをスキップ不可に指定できます。これにより、テストファイルで定義されたテストを Test Impact Analysis が一切スキップできないようにできます。これは jest の [`testEnvironmentOptions`][1] に似ています。

```javascript
/**
 * @datadog {"unskippable": true}
 */

describe('context', () => {
  it('can sum', () => {
    expect(1 + 2).to.equal(3)
  })
})
```

[1]: https://jestjs.io/docs/configuration#testenvironmentoptions-object
{{% /tab %}}
{{% tab "Cucumber" %}}
機能ファイルで `@datadog:unskippable` [タグ][1]を使用して、ファイルをスキップ不可に指定できます。これにより、機能ファイルで定義されたシナリオを Test Impact Analysis が一切スキップできないようにできます。

```
@datadog:unskippable
Feature: Greetings
  Scenario: Say greetings
    When the greeter says greetings
    Then I should have heard "greetings"
```
[1]: https://cucumber.io/docs/cucumber/api/?lang=javascript#tags
{{% /tab %}}
{{< /tabs >}}

### スキップ不可にすべきテストの例

このセクションでは、スキップ不可に指定すべきテストの例をいくつか示します。

#### フィクスチャに依存するテスト
```javascript
/**
 * `./fixtures/payload` に `payload.json` フィクスチャファイルがあり、
 * これは `processPayload` によって処理され、スナップショットに組み込まれます。
 * `payload.json` に変更を加えてもテストコードカバレッジには影響しませんが、
 * テストが失敗する可能性があります。.
 */

/**
 * @datadog {"unskippable": true}
 */
import processPayload from './process-payload';
import payload from './fixtures/payload';

it('can process payload', () => {
    expect(processPayload(payload)).toMatchSnapshot();
});
```

#### 外部サービスと通信するテスト
```javascript
/**
 * テストのコンテキスト外で実行されている外部サービスに対して
 * クエリを実行します。
 * この外部サービスに変更を加えてもテストコードカバレッジには影響しませんが、
 * テストが失敗する可能性があります。
 */

/**
 * @datadog {"unskippable": true}
 */
it('can query data', (done) => {
    fetch('https://www.external-service.com/path')
        .then((res) => res.json())
        .then((json) => {
            expect(json.data[0]).toEqual('value');
            done();
        });
});
```

```
# 上と同じ方法で外部サービスにリクエストを行っています

@datadog:unskippable
Feature: Process the payload
  Scenario: Server responds correctly
    When the server responds correctly
    Then I should have received "value"
```


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/nyc
[2]: https://docs.cypress.io/guides/tooling/code-coverage#Instrumenting-code
[3]: /ja/continuous_integration/tests/javascript
[4]: https://jestjs.io/docs/cli#--cache