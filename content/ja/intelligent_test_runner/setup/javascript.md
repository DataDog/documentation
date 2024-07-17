---
aliases:
- /ja/continuous_integration/intelligent_test_runner/javascript/
- /ja/continuous_integration/intelligent_test_runner/setup/javascript/
code_lang: javascript
code_lang_weight: 20
further_reading:
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
kind: ドキュメント
title: JavaScript と TypeScript のための Intelligent Test Runner
type: multi-code-lang
---

## 概要

Intelligent Test Runner for JavaScript は、個々のテストではなく、_テストスイート_ (テストファイル) 全体をスキップします。


## 互換性

Intelligent Test Runner は、以下のバージョンとテストフレームワークでのみサポートされています。

* `jest>=24.8.0`
  * `dd-trace>=4.17.0` または `dd-trace>=3.38.0` 以降
  * `testRunner` としてサポートされているのは `jest-circus/runner` のみです。
  * テスト環境としてサポートされているのは `jsdom` と `node` のみです。
* `mocha>=5.2.0`
  * `dd-trace>=4.17.0` または `dd-trace>=3.38.0` 以降
  * コードカバレッジを有効にするために [`nyc`][1] で mocha を実行します。
* `cucumber-js>=7.0.0`
  * `dd-trace>=4.17.0` または `dd-trace>=3.38.0` 以降
  * コードカバレッジを有効にするために [`nyc`][1] で cucumber-js を実行します。
* `cypress>=6.7.0`
  * `dd-trace>=4.17.0` または `dd-trace>=3.38.0` 以降
  * Web アプリケーションに[コードカバレッジ][2]を実装します。

## Setup

### Test Visibility

Intelligent Test Runner をセットアップする前に、[Test Visibility for JavaScript and TypeScript][3] をセットアップしてください。Agent を通してデータを報告する場合は、v6.40 以降または v7.40 以降を使用してください。

{{% ci-itr-activation-instructions %}}

## Intelligent Test Runner を有効にしたテストの実行

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

Intelligent Test Runner for Cypress を動作させるには、Web アプリケーションにコードカバレッジを実装する必要があります。コードカバレッジの有効化の詳細については、[Cypress ドキュメント][2]を参照してください。

コードカバレッジが正常に有効になっていることを確認するには、Cypress を使って Web アプリにアクセスし、`window.__coverage__` グローバル変数を確認します。これは `dd-trace` が Intelligent Test Runner のコードカバレッジを収集するために使用するものです。

## 一貫性のないテスト期間

`jest` のようないくつかのフレームワークでは、他のテストが実行された後にテストを高速化するキャッシュ機構があります ([jest キャッシュ][4]のドキュメントを参照)。Intelligent Test Runner がいくつかのテストファイル以外をスキップしている場合、これらのスイートの実行速度は通常よりも遅くなるかもしれません。これは、よりコールドなキャッシュで実行されるためです。これに関係なく、テストコマンドの総実行時間は短縮されるはずです。

## 特定のテストに対するスキップの無効化

Intelligent Test Runner の動作をオーバーライドして、特定のテストがスキップされないようにすることができます。これらのテストは、スキップできないテストと呼ばれます。

### テストをスキップできないようにする理由は？

Intelligent Test Runner は、テストをスキップすべきかどうかを判断するために、コードカバレッジデータを使用します。場合によっては、このデータだけでは判断できないこともあります。

例:

* テキストファイルからデータを読み込むテスト
* テスト対象のコード以外の API とやりとりするテスト (リモートの REST API など)

テストをスキップ不可に指定すると、カバレッジデータに関係なく Intelligent Test Runner がテストを実行します。

### テストをスキップ不可にマークする

{{< tabs >}}
{{% tab "Jest/Mocha/Cypress" %}}
テストファイルの先頭で次の docblock を使用すると、スイートをスキップ不可としてマークすることができます。これにより、テストファイルで定義したテストが Intelligent Test Runner によってスキップされるのを防ぎます。これは jest の [`testEnvironmentOptions`][1] に似ています。

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
フィーチャーファイルで `@datadog:unskippable` [タグ][1]を使用すると、スキップ不可とマークすることができます。これにより、フィーチャーファイルで定義されたシナリオが Intelligent Test Runner によってスキップされなくなります。

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

### スキップ不可とすべきテストの例

このセクションでは、スキップ不可とマークすべきテストの例をいくつか示します。

#### フィクスチャに依存するテスト
```javascript
/**
 * `./fixtures/payload` に `payload.json` というフィクスチャファイルがあり、
 * `processPayload` によって処理されてスナップショットに格納されます。
 * `payload.json` の変更はテストコードのカバレッジには影響しませんが、
 * テストを失敗させる可能性があります。
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
 * テストのコンテキスト外で実行している外部サービスに
 * クエリします。
 * この外部サービスの変更は、テストのコードカバレッジには影響しませんが、
 * テストを失敗させる可能性があります。
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
# 上記と同じ方法で外部サービスをリクエストしています

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