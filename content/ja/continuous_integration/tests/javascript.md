---
aliases:
- /ja/continuous_integration/setup_tests/javascript
further_reading:
- link: /continuous_integration/tests/containers/
  tag: ドキュメント
  text: コンテナ内でテスト用に環境変数を転送する
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/intelligent_test_runner/javascript
  tag: ドキュメント
  text: Intelligent Test Runner でテストジョブを高速化する
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: トラブルシューティング CI
kind: documentation
title: JavaScript と TypeScript のテスト
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では、現時点では CI Visibility は使用できません。</div>
{{< /site-region >}}

## 互換性

対応するテストフレームワーク:
* Jest >= 24.8.0
  * テスト環境としてサポートされているのは、`jsdom` (パッケージ `jest-environment-jsdom`) と `node` (パッケージ `jest-environment-node`) のみです。`jest-electron-runner` に含まれる `@jest-runner/electron/environment` のようなカスタム環境はサポートされていません。
  * [`testRunner`][2] としては、[`jest-circus`][1] のみをサポートしています。
  * Jest >= 28 は `dd-trace>=2.7.0` からしかサポートされません。
  * [`test.concurrent`](#jests-testconcurrent) はサポートされていません。
* Mocha >= 5.2.0
  * Mocha >= 9.0.0 は[部分的なサポート](#known-limitations)があります。
  * Mocha の[パラレルモード](#mocha-parallel-tests)はサポートされていません。
* Cucumber-js >= 7.0.0
  * Cucumber-js [パラレルモード](#cucumber-parallel-tests)はサポートされていません。
* Cypress >= 6.7.0
  * `dd-trace>=1.4.0` 以降。
* Playwright >= 1.18.0
* 2.x リリースラインの `dd-trace>=3.13.0` と `dd-trace>=2.26.0` 以降

インスツルメンテーションは実行時に動作するため、TypeScript、Webpack、Babel などのトランスパイラーにすぐに対応できます。

### テストスイートレベルの視覚化互換性
[テストスイートレベルの視覚化][3]は `dd-trace>=3.14.0` および `dd-trace>=2.27.0` から完全にサポートされています。Jest、Mocha、Playwright、Cypress、Cucumber がサポートされました。

* Jest >= 24.8.0
* `dd-trace>=3.10.0` 以降
* [`testRunner`][2] としては、[`jest-circus`][1] のみサポートされます
* Mocha >= 5.2.0
* 2.x リリースラインの `dd-trace>=3.10.0` と `dd-trace>=2.12.0` 以降
* Playwright >= 1.18.0
* From `dd-trace>=3.13.0` and `dd-trace>=2.26.0` for 2.x release line.
* Cypress >= 6.7.0
* 2.x リリースラインの `dd-trace>=3.14.0` と `dd-trace>=2.27.0` 以降
* Cucumber >= 7.0.0
* 2.x リリースラインの `dd-trace>=3.14.0` と `dd-trace>=2.27.0` 以降

## 報告方法の構成

Datadog にテスト結果を報告するには、Datadog の JavaScript ライブラリを構成する必要があります。

{{< tabs >}}

{{% tab "オンプレミス CI プロバイダー (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}

{{% tab "クラウド CI プロバイダー (Agentless)" %}}

<div class="alert alert-info">Agentless モードは、Datadog JavaScript ライブラリのバージョン >= 2.5.0 で使用できます</div>

{{% ci-agentless %}}

{{% /tab %}}
{{< /tabs >}}

## JavaScript トレーサーのインストール

[JavaScript Tracer][4] をインストールするには、次を実行します:

```bash
yarn add --dev dd-trace
```

詳しくは、[JavaScript Tracer のインストールに関するドキュメント][5]を参照してください。

## テストのインスツルメント

{{< tabs >}}
{{% tab "Jest/Mocha" %}}
`NODE_OPTIONS` 環境変数を `-r dd-trace/ci/init` に設定します。環境変数 `DD_ENV` にテストを実行する環境を指定し、通常通りテストを実行してください。例えば、開発者のワークステーションでテストを実行する場合は `DD_ENV` を `local` に設定し、CI プロバイダーでテストを実行する場合は `ci` に設定します。

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
```

**注**: `NODE_OPTIONS` に値を設定する場合、`-r dd-trace/ci/init` を上書きしないように注意してください。これは `${NODE_OPTIONS:-}` 節を使用して行うことができます。

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### テストにカスタムタグを追加する

現在アクティブなスパンを使用して、テストにカスタムタグを追加することができます。

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('team_owner', 'my_team')
    // テストは正常に続きます
    // ...
  })
```

これらのタグに対して、フィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加についての詳細は、Node.js カスタムインスツルメンテーションドキュメントの[タグの追加][1]セクションを参照してください。


### テストにカスタムメトリクスを追加する

タグと同様に、現在アクティブなスパンを使用して、テストにカスタムメトリクスを追加することができます。

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('memory_allocations', 16)
    // test continues normally
    // ...
  })
```
カスタムメトリクスについては、[カスタムメトリクスの追加ガイド][2]を参照してください。

[1]: /ja/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /ja/continuous_integration/guides/add_custom_metrics/?tab=javascripttypescript
{{% /tab %}}

{{% tab "Playwright" %}}
`NODE_OPTIONS` 環境変数を `-r dd-trace/ci/init` に設定します。環境変数 `DD_ENV` にテストを実行する環境を指定し、通常通りテストを実行してください。例えば、開発者のワークステーションでテストを実行する場合は `DD_ENV` を `local` に設定し、CI プロバイダーでテストを実行する場合は `ci` に設定します。

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
```

**注**: `NODE_OPTIONS` に値を設定する場合、`-r dd-trace/ci/init` を上書きしないように注意してください。これは `${NODE_OPTIONS:-}` 節を使用して行うことができます。

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### テストにカスタムタグを追加する

Playwright では、カスタムタグはサポートされていません。

### テストにカスタムメトリクスを追加する

Playwright では、カスタムメトリクスはサポートされていません。
{{% /tab %}}

{{% tab "Cucumber" %}}
`NODE_OPTIONS` 環境変数を `-r dd-trace/ci/init` に設定します。環境変数 `DD_ENV` にテストを実行する環境を指定し、通常通りテストを実行してください。例えば、開発者のワークステーションでテストを実行する場合は `DD_ENV` を `local` に設定し、CI プロバイダーでテストを実行する場合は `ci` に設定します。

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
```

**注**: `NODE_OPTIONS` に値を設定する場合、`-r dd-trace/ci/init` を上書きしないように注意してください。これは `${NODE_OPTIONS:-}` 節を使用して行うことができます。

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### テストにカスタムタグを追加する

現在アクティブなスパンをつかんで、テストにカスタムタグを追加することができます。

```javascript
  When('the function is called', function () {
    const stepSpan = require('dd-trace').scope().active()
    testSpan.setTag('team_owner', 'my_team')
    // テストは正常に続きます
    // ...
  })
```

これらのタグに対して、フィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加についての詳細は、Node.js カスタムインスツルメンテーションドキュメントの[タグの追加][1]セクションを参照してください。


### テストにカスタムメトリクスを追加する

現在アクティブなスパンをつかんで、テストにカスタムメトリクスを追加することもできます。

```javascript
  When('the function is called', function () {
    const stepSpan = require('dd-trace').scope().active()
    testSpan.setTag('memory_allocations', 16)
    // テストは正常に続きます
    // ...
  })
```
カスタムメトリクスについては、[カスタムメトリクスの追加ガイド][2]を参照してください

[1]: /ja/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /ja/continuous_integration/guides/add_custom_metrics/?tab=javascripttypescript
{{% /tab %}}

{{% tab "Cypress" %}}

### Cypress バージョン 10 以降

Cypress API ドキュメントを使用して、`cypress>=10` のための[プラグインの書き方を学ぶ][1]ことができます。

`cypress.config.js` ファイルで、以下を設定します。

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents: require('dd-trace/ci/cypress/plugin'),
    supportFile: 'cypress/support/e2e.js'
  }
})
{{< /code-block >}}

次の行を `supportFile` の**トップレベル**に追加します。

{{< code-block lang="javascript" filename="cypress/support/e2e.js" >}}
// この行の前にコードを記述することができます
// require('./commands')
require('dd-trace/ci/cypress/support')
// こちらもサポート:
// import 'dd-trace/ci/cypress/support'
// この行の後にコードを記述することもできます
// Cypress.Commands.add('login', (email, pw) => {})
{{< /code-block >}}

他の Cypress プラグインを使用している場合、`cypress.config.js` ファイルに以下の内容が含まれている必要があります。

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // 前のコードはこの行の前にあります
      require('dd-trace/ci/cypress/plugin')(on, config)
    }
  }
})
{{< /code-block >}}
<div class="alert alert-warning">Datadog が動作するには、Cypress の <a href="#cypress-afterrun-event">after:run</a> イベントが必要で、Cypress は複数の <a href="">'after:run'</a> ハンドラーを許可していません。このイベントを使用している場合、dd-trace は正しく動作しません。</div>

### バージョン 10 以前の Cypress

以下は、`cypress@10` より古いバージョンを使用している場合の手順です。

1. [`pluginsFile`][2] を、たとえば [`cypress.json`][3] を介して `"dd-trace/ci/cypress/plugin"` に設定します:
   {{< code-block lang="json" filename="cypress.json" >}}
   {
     "pluginsFile": "dd-trace/ci/cypress/plugin"
   }
   {{< /code-block >}}

   すでに `pluginsFile` を定義している場合は、次のようにしてインスツルメンテーションを初期化することができます。
   {{< code-block lang="javascript" filename="cypress/plugins/index.js" >}}
   module.exports = (on, config) => {
     // 以前のコードはこの行の前になります
     require('dd-trace/ci/cypress/plugin')(on, config)
   }
   {{< /code-block >}}
   <div class="alert alert-warning">Datadog が動作するには、Cypress の <a href="#cypress-afterrun-event">'after:run'</a> イベントが必要で、Cypress は複数の <a href="">'after:run'</a> ハンドラーを許可していません。このイベントを使用している場合、dd-trace は正しく動作しません。</div>

2. 次の行を [`supportFile`][4] の**トップレベル**に追加します。
   {{< code-block lang="javascript" filename="cypress/support/index.js" >}}
   // この行の前にコードを記述することができます
   // require('./commands')
   require('dd-trace/ci/cypress/support')
   // この行の後にコードを記述することもできます
   // Cypress.Commands.add('login', (email, pw) => {})
   {{< /code-block >}}


`DD_ENV` 環境変数でテストを実行する環境 (たとえば、開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`) を指定して、通常どおりにテストを実行します。例:

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-ui-app npm test
{{< /code-block >}}


### テストにカスタムタグを追加する

テストに、チームオーナーなどの情報を追加するには、テストまたはフックで `cy.task('dd:addTags', { yourTags: 'here' })` を使用します。

例:

```javascript
beforeEach(() => {
  cy.task('dd:addTags', {
    'before.each': 'certain.information'
  })
})
it('renders a hello world', () => {
  cy.task('dd:addTags', {
    'team.owner': 'ui'
  })
  cy.get('.hello-world')
    .should('have.text', 'Hello World')
})
```

これらのタグに対して、フィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加についての詳細は、Node.js カスタムインスツルメンテーションドキュメントの[タグの追加][5]セクションを参照してください。

### テストにカスタムメトリクスを追加する

メモリ割り当てなどのカスタムメトリクスをテストに追加するには、テストまたはフックで `cy.task('dd:addTags', { yourNumericalTags: 1 })` を使用します。

例:

```javascript
it('renders a hello world', () => {
  cy.task('dd:addTags', {
    'memory_allocations': 16
  })
  cy.get('.hello-world')
    .should('have.text', 'Hello World')
})
```

カスタムメトリクスについては、[カスタムメトリクスの追加ガイド][6]を参照してください。

### Cypress - RUM インテグレーション

テスト対象のブラウザアプリケーションが[ブラウザモニタリング][7]を使用してインスツルメントされている場合、Cypress テストの結果と生成された RUM ブラウザセッションおよびセッションリプレイは自動的にリンクされます。詳細については、[RUM によるブラウザテストのインスツルメントのガイド][8]を参照してください。


[1]: https://docs.cypress.io/api/plugins/writing-a-plugin#Plugins-API
[2]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Plugins-file
[3]: https://docs.cypress.io/guides/references/configuration#cypress-json
[4]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file
[5]: /ja/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[6]: /ja/continuous_integration/guides/add_custom_metrics/?tab=javascripttypescript
[7]: /ja/real_user_monitoring/browser/#setup
[8]: /ja/continuous_integration/guides/rum_integration/
{{% /tab %}}

{{< /tabs >}}

### Yarn 2 以降の使用

`yarn>=2` と `.pnp.cjs` ファイルを使用していて、`NODE_OPTIONS` を使用したときに次のようなエラーメッセージが表示された場合

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

`NODE_OPTIONS` を以下のように設定することで修正できます。

```bash
NODE_OPTIONS="-r $(pwd)/.pnp.cjs -r dd-trace/ci/init" yarn test
```

## コードカバレッジを報告する

テストに [Istanbul][6] がインスツルメンテーションされると、Datadog トレーサー (v3.20.0 以降) はテストセッションの `test.code_coverage.lines_pct` タグでそれを報告します。

テストセッションの **Coverage** タブで、テストカバレッジの推移を見ることができます。

## 構成設定

以下は、トレーサーで使用できる最も重要なコンフィギュレーション設定のリストです。

`service`
: テスト中のサービスまたはライブラリの名前。<br/>
**環境変数**: `DD_SERVICE`<br/>
**デフォルト**: (テストフレームワーク名)<br/>
**例**: `my-ui`

`env`
: テストが実行されている環境の名前。<br/>
**環境変数**: `DD_ENV`<br/>
**デフォルト**: `none`<br/>
**例**: `local`、`ci`

`url`
: `http://hostname:port` の形式のトレース収集用の Datadog Agent URL。<br/>
**環境変数**: `DD_TRACE_AGENT_URL`<br/>
**デフォルト**: `http://localhost:8126`

他のすべての [Datadog トレーサー構成][7]オプションも使用できます。

{{% ci-git-metadata %}}

## Git メタデータのアップロード

`dd-trace>=3.15.0` および `dd-trace>=2.28.0` から、CI Visibility は git メタデータ情報 (コミット履歴) を自動的にアップロードします。このメタデータにはファイル名は含まれていますが、ファイルの内容は含まれていません。この動作をオプトアウトしたい場合は、`DD_CIVISIBILITY_GIT_UPLOAD_ENABLED` を `false` に設定することで可能です。しかし、Intelligent Test Runner などの機能はこの設定なしでは動作しないため、この設定は推奨されません。


## 手動テスト API

<div class="alert alert-warning">
  <strong>注</strong>: 手動テスト API を使用するには、環境変数として <code>DD_CIVISIBILITY_MANUAL_API_ENABLED=1</code> を渡す必要があります。
</div>

<div class="alert alert-warning">
  <strong>注</strong>: 手動テスト API は<strong>ベータ版</strong>ですので、API が変更される可能性があります。<code>dd-trace</code> バージョン <code>4.4.0</code>、<code>3.25.0</code>、<code>2.38.0</code> から利用可能です。
</div>

Jest、Mocha、Cypress、Playwright、または Cucumber を使用している場合は、**手動テスト API を使用しないでください**。CI Visibility は自動的にインスツルメンテーションを行い、テスト結果を Datadog に送信するためです。手動テスト API は、すでにサポートされているテストフレームワークと**互換性がありません**。

サポートされていないテストフレームワークを使用している場合や、別のテストメカニズムを持っている場合のみ、手動テスト API を使用してください。

手動テスト API は、Node.js の `node:diagnostics_channel` モジュールを活用し、以下に公開可能なチャンネルに基づいています。

```javascript
const { channel } = require('node:diagnostics_channel')

const { describe, test, beforeEach, afterEach, assert } = require('my-custom-test-framework')

const testStartCh = channel('dd-trace:ci:manual:test:start')
const testFinishCh = channel('dd-trace:ci:manual:test:finish')
const testSuite = __filename

describe('can run tests', () => {
  beforeEach((testName) => {
    testStartCh.publish({ testName, testSuite })
  })
  afterEach((status, error) => {
    testFinishCh.publish({ status, error })
  })
  test('first test will pass', () => {
    assert.equal(1, 1)
  })
})
```

### テスト開始チャンネル

このチャンネルを `dd-trace:ci:manual:test:start` という ID で取得し、テストが開始することを公開します。これを行うには `beforeEach` フックなどが良いでしょう。

```typescript
const { channel } = require('node:diagnostics_channel')
const testStartCh = channel('dd-trace:ci:manual:test:start')

// ... テストフレームワークのコードはここに来ます
  beforeEach(() => {
    const testDefinition = {
      testName: 'a-string-that-identifies-this-test',
      testSuite: 'what-suite-this-test-is-from.js'
    }
    testStartCh.publish(testDefinition)
  })
// テストフレームワークのコードはここに続きます ...
```

公開されるペイロードには `testName` と `testSuite` という属性があり、どちらも文字列です。これは開始しようとしているテストを識別します。

### テスト終了チャンネル

このチャンネルを `dd-trace:ci:manual:test:finish` という ID で取得し、テストが終了することを公開します。これを行うには `afterEach` フックなどが良いでしょう。

```typescript
const { channel } = require('node:diagnostics_channel')
const testFinishCh = channel('dd-trace:ci:manual:test:finish')

// ... テストフレームワークのコードはここに来ます
  afterEach(() => {
    const testStatusPayload = {
      status: 'fail',
      error: new Error('assertion error')
    }
    testStartCh.publish(testStatusPayload)
  })
// テストフレームワークのコードはここに続きます ...
```

公開されるペイロードには `status` と `error` という属性があります。

* `status` は以下の 3 つの値のうちの 1 つを取る文字列です。
  * テストがパスしたら `'pass'`。

  * テストが失敗したら `'fail'`。
  * テストがスキップされたら `'skip'`。

* `error` はテストが失敗した理由を含む `Error` オブジェクトです。

### タグ追加チャンネル

このチャンネルを `dd-trace:ci:manual:test:addTags` という ID で取得し、テストにカスタムタグが必要であることを公開します。これは test 関数の中で行うことができます。

```typescript
const { channel } = require('node:diagnostics_channel')
const testAddTagsCh = channel('dd-trace:ci:manual:test:addTags')

// ... テストフレームワークのコードはここに来ます
  test('can sum', () => {
    testAddTagsCh.publish({ 'test.owner': 'my-team', 'number.assertions': 3 })
    const result = sum(2, 1)
    assert.equal(result, 3)
  })
// テストフレームワークのコードはここに続きます ...
```

公開されるペイロードは、テストに追加されるタグやメトリクスの辞書 `<string, string|number>` です。


### テストを実行する

テスト開始チャンネルと終了チャンネルをコードに入れたら、以下の環境変数を含めて、いつものようにテストフレームワークを実行します。

```shell
NODE_OPTIONS="-r dd-trace/ci/init" DD_CIVISIBILITY_MANUAL_API_ENABLED=1 DD_ENV=ci DD_SERVICE=my-custom-framework-tests yarn run-my-test-framework
```



## 既知の制限

### ES モジュール
[Mocha >=9.0.0][8] はテストファイルの読み込みに ESM-first アプローチを採用しています。つまり、[ES モジュール][9]が使用されている場合 (たとえば、テストファイルの拡張子を `.mjs` にして定義している場合) は_インスツルメンテーションが制限されます_。テストは検出されますが、自分のテストを可視化することはできません。ES モジュールについて詳しくは、[Node.js に関するドキュメント][9]を参照してください。

### ブラウザテスト
`mocha`、`jest`、`cucumber`、`cypress`、`playwright` で実行されるブラウザテストは `dd-trace-js` によりインスツルメントされますが、ブラウザセッション自体の可視性はデフォルトでは提供されません (ネットワーク呼び出し、ユーザーのアクション、ページロードなど)。

ブラウザ処理の可視性を希望する場合は、[RUM とセッションリプレイ][10]の使用をご検討ください。Cypress を使用していると、テスト結果と生成された RUM ブラウザセッションおよびセッションリプレイは自動的にリンクされます。詳細については、[RUM によるブラウザテストのインスツルメントのガイド][11]を参照してください。

### Cypress インタラクティブモード

Cypress インタラクティブモード (`cypress open` を実行することで入ることができる) は、[`before:run`][12] など一部の cypress イベントが発生しないため、CI Visibility ではサポートされていません。もし試してみたい場合は、[cypress コンフィギュレーションファイル][13]に `experimentalInteractiveRunEvents: true` を渡してください。

### Cypress `after:run` イベント

Datadog は Cypress の [`after:run` イベント][14]を使用する必要があります。Cypress はこのイベントのリスナーを 1 つしか許可しないため、カスタム Cypress プラグインが `after:run` を必要とする場合、`dd-trace` とは互換性がありません。

### Mocha のパラレルテスト
Mocha の[パラレルモード][15]はサポートされていません。パラレルモードで実行されたテストは、CI Visibility のインスツルメンテーションを受けません。

### Cucumber のパラレルテスト
Cucumber の[パラレルモード][16]はサポートされていません。パラレルモードで実行されたテストは、CI Visibility のインスツルメンテーションを受けません。

### Jest の `test.concurrent`
Jest の [test.concurrent][17] はサポートされていません。

## ベストプラクティス

テストフレームワークと CI 表示を最大限に活用するために、以下のプラクティスに従ってください。

### パラメーターテスト

可能な限り、テストフレームワークが提供するパラメーター化されたテスト用のツールを活用しましょう。たとえば、`jest` などを利用できます:

回避したいパターン:
{{< code-block lang="javascript" >}}
[[1,2,3], [3,4,7]].forEach((a,b,expected) => {
  test('sums correctly', () => {
    expect(a+b).toEqual(expected)
  })
})
{{< /code-block >}}

そして、代わりに [`test.each`][18] を使ってください。

{{< code-block lang="javascript" >}}
test.each([[1,2,3], [3,4,7]])('sums correctly %i and %i', (a,b,expected) => {
  expect(a+b).toEqual(expected)
})
{{< /code-block >}}

`mocha` の場合は、[`mocha-each`][19] を使ってください。

{{< code-block lang="javascript" >}}
const forEach = require('mocha-each');
forEach([
  [1,2,3],
  [3,4,7]
])
.it('adds %i and %i then returns %i', (a,b,expected) => {
  expect(a+b).to.equal(expected)
});
{{< /code-block >}}

この方法を使用すると、テストフレームワークと CI 表示の両方でテストを区別することができます。

{{% ci-information-collected %}}

さらに、[Intelligent Test Runner][20] を有効にすると、プロジェクトから以下のデータが収集されます。

* 各テストでカバーされるファイル名と行数を含むコードカバレッジ情報。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/facebook/jest/tree/main/packages/jest-circus
[2]: https://jestjs.io/docs/configuration#testrunner-string
[3]: /ja/continuous_integration/tests/#test-suite-level-visibility
[4]: /ja/tracing/trace_collection/dd_libraries/nodejs
[5]: https://github.com/DataDog/dd-trace-js#version-release-lines-and-maintenance
[6]: https://istanbul.js.org/
[7]: /ja/tracing/trace_collection/library_config/nodejs/?tab=containers#configuration
[8]: https://github.com/mochajs/mocha/releases/tag/v9.0.0
[9]: https://nodejs.org/api/packages.html#packages_determining_module_system
[10]: /ja/real_user_monitoring/browser/
[11]: /ja/continuous_integration/guides/rum_integration/
[12]: https://docs.cypress.io/api/plugins/before-run-api
[13]: https://docs.cypress.io/guides/references/configuration#Configuration-File
[14]: https://docs.cypress.io/api/plugins/after-run-api
[15]: https://mochajs.org/#parallel-tests
[16]: https://github.com/cucumber/cucumber-js/blob/63f30338e6b8dbe0b03ddd2776079a8ef44d47e2/docs/parallel.md
[17]: https://jestjs.io/docs/api#testconcurrentname-fn-timeout
[18]: https://jestjs.io/docs/api#testeachtablename-fn-timeout
[19]: https://www.npmjs.com/package/mocha-each
[20]: /ja/continuous_integration/intelligent_test_runner/