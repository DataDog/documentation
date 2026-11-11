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
  text: テスト結果とパフォーマンスを調べる
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
title: JavaScript および TypeScript 向け Test Impact Analysis
type: multi-code-lang
---
## 概要{#overview}

avaScript 向け Test Impact Analysis は、個々のテストではなく _テストスイート_ (テストファイル) 全体をスキップします。


## 互換性{#compatibility}

Test Impact Analysis は、以下のバージョンとテストフレームワークでのみサポートされています。

* `jest>=24.8.0`
  * `dd-trace>=4.17.0` または `dd-trace>=3.38.0` 以降。
  * `jest-circus/runner` のみが `testRunner` としてサポートされています。
  * `jsdom` および `node` のみがテスト環境としてサポートされています。
* `mocha>=5.2.0`
  * `dd-trace>=4.17.0` または `dd-trace>=3.38.0` 以降。
  * コードカバレッジを有効にするには、[`nyc`][1] を使用して mocha を実行します。
* `cucumber-js>=7.0.0`
  * `dd-trace>=4.17.0` または `dd-trace>=3.38.0` 以降。
  * コードカバレッジを有効にするには、[`nyc`][1] を使用して cucumber-js を実行します。
* `cypress>=6.7.0`
  * `dd-trace>=4.17.0` または `dd-trace>=3.38.0` 以降。
  * [コードカバレッジ][2]を使用して Web アプリケーションをインスツルメントします。
* `vitest>=1.6.0`
  * `dd-trace>=6.21.0` または `dd-trace>=5.132.0` 以降。

## セットアップ {#setup}

### Test Optimization {#test-optimization}

Test Impact Analysis をセットアップする前に、[JavaScript および TypeScript 向け Test Optimization][3] をセットアップします。Agent 経由でデータをレポートする場合は、v6.40 以降または v7.40 以降を使用します。

{{% ci-itr-activation-instructions %}}

## Test Impact Analysis を有効にしてテストを実行する {#run-tests-with-test-impact-analysis-enabled}

{{< tabs >}}

{{% tab "オンプレミス CI プロバイダー (Datadog Agent)" %}}

設定が完了したら、通常通りテストを実行します。

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
{{< /code-block >}}

Vitest の場合は、ESM ローダーを含め、`vitest run` を使用します。

{{< code-block lang="shell" >}}
NODE_OPTIONS="--import dd-trace/register.js -r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn vitest run
{{< /code-block >}}

{{% /tab %}}

{{% tab "クラウド CI プロバイダー (Agentless)" %}}

設定が完了したら、通常通りテストを実行します。

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$DD_API_KEY yarn test
{{< /code-block >}}

Vitest の場合は、ESM ローダーを含め、`vitest run` を使用します。

{{< code-block lang="shell" >}}
NODE_OPTIONS="--import dd-trace/register.js -r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$DD_API_KEY yarn vitest run
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Cypress {#cypress}

Cypress 向け Test Impact Analysis を機能させるには、コードカバレッジを使用して Web アプリケーションをインスツルメントする必要があります。コードカバレッジを有効にする方法の詳細については、[Cypress ドキュメント][2]を参照してください。

コードカバレッジが正常に有効になったことを確認するには、Cypress で Web アプリケーションに移動し、`window.__coverage__` グローバル変数を確認します。これは、Test Impact Analysis のコードカバレッジを収集するために `dd-trace` が使用するものです。

### Vitest {#vitest}

`dd-trace` は、Test Impact Analysis に必要なスイートごとのコードカバレッジを自動的に収集します。追加のカバレッジパッケージや `--coverage` フラグは必要ありません。

Test Impact Analysis は、Vitest のブラウザモード、ウォッチモード、または型チェックのみの実行ではサポートされていません。また、`DD_EXPERIMENTAL_TEST_OPT_VITEST_NO_WORKER_INIT=true` によって有効になる実験的モードでもサポートされていません。

## 一貫性のないテスト期間{#inconsistent-test-durations}

`jest` のような一部のフレームワークには、他のテストが実行された後にテストを高速化するキャッシュメカニズムがあります ([jest cache][4] ドキュメントを参照)。Test Impact Analysis がごく一部のテストファイルを除いてすべてスキップしている場合、これらのスイートは通常よりも実行速度が遅くなる可能性があります。これは、キャッシュが冷えた状態で実行されるためです。それにもかかわらず、テストコマンドの合計実行時間は短縮されます。

## 特定のテストに対するスキップの無効化 {#disabling-skipping-for-specific-tests}

Test Impact Analysis の動作を上書きして、特定のテストがスキップされないようにすることができます。これらのテストは、スキップ不可のテストと呼ばれます。

### テストをスキップ不可にする理由{#why-make-tests-unskippable}

Test Impact Analysis は、コードカバレッジデータを使用して、テストをスキップするかどうかを判断します。場合によっては、このデータだけでは判断を下すのに十分ではないことがあります。

例:

* テキストファイルからデータを読み込むテスト
* テスト対象のコード以外の API とやり取りするテスト (リモートの REST API など)。

テストをスキップ不可に指定することで、Test Impact Analysis はカバレッジデータに関係なくそれらのテストを実行できるようになります。

### テストをスキップ不可としてマークする {#marking-tests-as-unskippable}

{{< tabs >}}
{{% tab "Jest/Mocha/Cypress/Vitest" %}}
以下の docblock を使用して、テストファイル全体をスキップ不可としてマークできます。個々のテストをスキップ不可としてマークすることはできません。docblock をファイルの先頭、コードの前に配置します。その前に記述できるのは他のコメントのみです。これにより、テストファイル内で定義されたテストが Test Impact Analysis によってスキップされるのを防ぎます。これは Jest の [`testEnvironmentOptions`][1] に似ています。

```javascript
// Other comments can appear above the docblock.

/**
 * @datadog {"unskippable": true}
 */

describe('context', () => {
  it('can sum', () => {
    expect(1 + 2).to.equal(3)
  })
})
```

次の例は、docblock がコードの後に記述されており、1 つのテストのみをスキップ不可としてマークしようとしているため無効です。

```javascript
it('can sum', () => {
  expect(1 + 2).to.equal(3)
})

// THIS IS INVALID: The docblock cannot mark an individual test as unskippable.
/**
 * @datadog {"unskippable": true}
 */
it('can subtract', () => {
  expect(3 - 2).to.equal(1)
})
```

[1]: https://jestjs.io/docs/configuration#testenvironmentoptions-object
{{% /tab %}}
{{% tab "Cucumber" %}}
フィーチャーファイルで `@datadog:unskippable` [タグ][1]を使用して、そのファイルをスキップ不可としてマークします。これにより、フィーチャーファイル内で定義されたシナリオが Test Impact Analysis によってスキップされるのを防ぎます。

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

### スキップ不可にすべきテストの例 {#examples-of-tests-that-should-be-unskippable}

このセクションでは、スキップ不可に指定すべきテストの例をいくつか示します。

#### フィクスチャに依存するテスト {#tests-that-depend-on-fixtures}

```javascript
/**
 * We have a `payload.json` fixture file in `./fixtures/payload`
 * that is processed by `processPayload` and put into a snapshot.
 * Changes in `payload.json` do not affect the test code coverage but can
 * make the test fail.
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

#### 外部サービスと通信するテスト {#tests-that-communicate-with-external-services}

```javascript
/**
 * We query an external service running outside the context of
 * the test.
 * Changes in this external service do not affect the test code coverage
 * but can make the test fail.
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
# Same way as above we're requesting an external service

@datadog:unskippable
Feature: Process the payload
  Scenario: Server responds correctly
    When the server responds correctly
    Then I should have received "value"
```


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/nyc
[2]: https://docs.cypress.io/guides/tooling/code-coverage#Instrumenting-code
[3]: /ja/continuous_integration/tests/javascript
[4]: https://jestjs.io/docs/cli#--cache