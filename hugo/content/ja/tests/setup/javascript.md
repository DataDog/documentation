---
aliases:
- /ja/continuous_integration/setup_tests/javascript
- /ja/continuous_integration/tests/javascript
- /ja/continuous_integration/tests/setup/javascript
code_lang: javascript
code_lang_weight: 20
further_reading:
- link: /continuous_integration/tests/containers/
  tag: ドキュメント
  text: コンテナ内でテスト用に環境変数を転送する
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを調べる
- link: /tests/test_impact_analysis/javascript
  tag: ドキュメント
  text: Test Impact Analysis を使用してテストジョブを高速化する
- link: /tests/troubleshooting/
  tag: ドキュメント
  text: Test Optimization のトラブルシューティング
title: JavaScript と TypeScript のテスト
type: multi-code-lang
---
## 互換性 {#compatibility}

{{< tabs >}}
{{% tab "dd-trace v6" %}}

| テストフレームワーク | バージョン | メモ |
|---|---|---|
| Jest | >= 28.0.0 | `jsdom` (`jest-environment-jsdom` パッケージ内) および `node` (`jest-environment-node` パッケージ内) のみテスト環境としてサポートされています。`jest-electron-runner` の `@jest-runner/electron/environment` にあるようなカスタム環境はサポートされていません。<br><br>[`jest-circus`](https://github.com/facebook/jest/tree/main/packages/jest-circus) のみ [`testRunner`](https://jestjs.io/docs/configuration#testrunner-string) としてサポートされています。<br><br>[`test.concurrent`](https://jestjs.io/docs/api#testconcurrentname-fn-timeout)は `dd-trace>=6.1.0` からサポートされています。|
| Mocha | >= 8.0.0 |
| Cucumber | >= 7.0.0 |
| Cypress | >= 12.0.0 |
| Playwright | >= 1.38.0 |
| Vitest | >= 1.6.0 | [`test.concurrent`](https://vitest.dev/api/#test-concurrent) は `dd-trace>=6.1.0` からサポートされています。[ブラウザモード](https://vitest.dev/guide/browser/)は `dd-trace>=6.8.0` からサポートされています。|
| WebdriverIO | >= 9.0.0 | Mocha および Jasmine フレームワークアダプターで `dd-trace>=6.10.0` からサポートされています。|

`dd-trace` v6 には Node.js 22 以降が必要です。

{{% /tab %}}
{{% tab "dd-trace v5" %}}

| テストフレームワーク | バージョン | メモ |
|---|---|---|
| Jest | >= 24.8.0 | `jsdom` (`jest-environment-jsdom` パッケージ内) おおよび `node` (`jest-environment-node` パッケージ内) のみテスト環境としてサポートされています。`jest-electron-runner` の `@jest-runner/electron/environment` にあるようなカスタム環境はサポートされていません。<br><br>[`jest-circus`](https://github.com/facebook/jest/tree/main/packages/jest-circus) のみ [`testRunner`](https://jestjs.io/docs/configuration#testrunner-string) としてサポートされています。<br><br>[`test.concurrent`](https://jestjs.io/docs/api#testconcurrentname-fn-timeout)は `dd-trace>=5.112.0` からサポートされています。|
| Mocha | >= 5.2.0 |
| Cucumber | >= 7.0.0 |
| Cypress | >= 6.7.0 |
| Playwright | >= 1.18.0 |
| Vitest | >= 1.6.0 | `dd-trace>=5.18.0` からサポートされています。[`test.concurrent`](https://vitest.dev/api/#test-concurrent) は `dd-trace>=5.112.0` からサポートされています。[ブラウザモード](https://vitest.dev/guide/browser/)は `dd-trace>=5.119.0` からサポートされています。|
| WebdriverIO | >= 9.0.0 | Mocha および Jasmine フレームワークアダプターで `dd-trace>=5.121.0` からサポートされています。|

{{% /tab %}}
{{< /tabs >}}

インスツルメンテーションは実行時に動作するため、TypeScript、Webpack、Babel などのトランスパイラーにすぐに対応できます。

## 報告方法の構成 {#configuring-reporting-method}

Datadog にテスト結果を報告するには、Datadog JavaScript ライブラリを構成する必要があります。

{{< tabs >}}
{{% tab "自動インスツルメンテーションサポートによる CI プロバイダー" %}}
{{% ci-autoinstrumentation %}}

<div class="alert alert-danger">
  <strong>注</strong>: 自動インスツルメンテーションは、Cypress テストではサポートされていません。Cypress テストをインスツルメンテーションするには、以下に記載されている手動インスツルメンテーションの手順に従ってください。
</div>

{{% /tab %}}

{{% tab "その他のクラウドの CI プロバイダー" %}}
{{% ci-agentless %}}

{{% /tab %}}
{{% tab "オンプレミスの CI プロバイダー" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

## JavaScript トレーサーのインストール {#installing-the-javascript-tracer}

[JavaScript Tracer][3] をインストールするには、次を実行します。

```bash
yarn add --dev dd-trace
```

詳しくは、[JavaScript Tracer のインストールに関するドキュメント][4] を参照してください。

## テストのインスツルメンテーション {#instrument-your-tests}

{{< tabs >}}
{{% tab "Jest/Mocha" %}}
環境変数 `NODE_OPTIONS` を `-r dd-trace/ci/init` に設定します。通常通りテストを実行します。オプションで `DD_TEST_SESSION_NAME` を使用してテストセッションの名前を指定することもできます。

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=unit-tests yarn test
```

**注**: `NODE_OPTIONS` に値を設定する場合は、`-r dd-trace/ci/init` を上書きしないように注意してください。これは `${NODE_OPTIONS:-}` 節を使用して行うことができます。

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### テストにカスタムタグを追加する {#adding-custom-tags-to-tests}

現在アクティブなスパンを使用して、テストにカスタムタグを追加することができます。

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('team_owner', 'my_team')
    // test continues normally
    // ...
  })
```

これらのタグに対してフィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加の詳細については、Node.js カスタムインスツルメンテーションドキュメントの [タグの追加][1] セクションを参照してください。


### テストへのカスタム測定値の追加 {#adding-custom-measures-to-tests}

タグと同様に、現在アクティブなスパンを使用して、テストにカスタム測定値を追加できます。

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('memory_allocations', 16)
    // test continues normally
    // ...
  })
```

カスタム測定値の詳細については、[カスタム測定値の追加ガイド][2] を参照してください。

### Mocha ECMAScript モジュール (ESM) {#mocha-ecmascript-modules-esm}
[Mocha >=9.0.0][3] は、テストファイルの読み込みに ESM-first アプローチを採用しています。テストの完全な可視性を得るには、`NODE_OPTIONS` を `-r dd-trace/ci/init --import dd-trace/register.js` に設定します。詳細については、[`dd-trace-js` ESM サポート][4] を参照してください。


[1]: /ja/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /ja/tests/guides/add_custom_measures/?tab=javascripttypescript
[3]: https://github.com/mochajs/mocha/releases/tag/v9.0.0
[4]: https://github.com/datadog/dd-trace-js?tab=readme-ov-file#ecmascript-modules-esm-support
{{% /tab %}}

{{% tab "Playwright" %}}
環境変数 `NODE_OPTIONS` を `-r dd-trace/ci/init` に設定します。通常通りテストを実行します。オプションで `DD_TEST_SESSION_NAME` を使用してテストセッションの名前を指定することもできます。

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=e2e-tests yarn test:e2e
```

**注**: `NODE_OPTIONS` に値を設定する場合は、`-r dd-trace/ci/init` を上書きしないように注意してください。これは `${NODE_OPTIONS:-}` 節を使用して行うことができます。

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### テストにカスタムタグを追加する {#adding-custom-tags-to-tests-1}

現在アクティブなスパンを使用して、テストにカスタムタグを追加することができます。

```javascript
test('user profile', async ({ page }) => {
  const testSpan = require('dd-trace').scope().active()
  testSpan.setTag('team_owner', 'my_team')
  // ...
})

test('landing page', async ({ page }) => {
  const testSpan = require('dd-trace').scope().active()
  testSpan.setTag('test.cpu.usage', 'high')
  // ...
})
```

これらのタグに対してフィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加の詳細については、Node.js カスタムインスツルメンテーションドキュメントの [タグの追加][1] セクションを参照してください。

### テストへのカスタム測定値の追加 {#adding-custom-measures-to-tests-1}

現在アクティブなスパンを使用して、テストにカスタム測定値を追加することもできます。

```javascript
test('user profile', async ({ page }) => {
  const testSpan = require('dd-trace').scope().active()
  testSpan.setTag('memory_allocations', 16)
  // ...
})
```

カスタム測定値の詳細については、[カスタム測定値の追加ガイド][2] を参照してください。

### Playwright - RUM インテグレーション {#playwright-rum-integration}

テスト対象のブラウザアプリケーションが [Browser Monitoring][3] を使用してインスツルメントされている場合、Playwright テストの結果と生成された RUM ブラウザセッションおよびセッションリプレイは自動的にリンクされます。詳細については、[RUM によるブラウザテストのインスツルメントガイド][4] を参照してください。

### テストの失敗スクリーンショットをアップロードする {#upload-test-failure-screenshots}

有効にすると、Test Optimization はテストが失敗したときに Playwright がキャプチャしたスクリーンショットをアップロードします。スクリーンショットは、Test Optimization テスト詳細サイドパネルの {{< ui >}}Media{{< /ui >}} タブで表示します。これらを使用して、失敗時のブラウザの状態を調査します。

{{< img src="continuous_integration/tests/setup/playwright-failure-screenshot-media-tab.png" alt="Test Optimization テスト詳細サイドパネルのメディアタブに表示された Playwright の失敗スクリーンショット。" style="width:100%;" >}}

v5 リリースラインでは [`dd-trace` v5.116.0 以降][5] を、v6 リリースラインでは [`dd-trace` v6.5.0 以降][6] を使用してください。

スクリーンショットのアップロードを有効にするには、`DD_TEST_FAILURE_SCREENSHOTS_ENABLED` 環境変数を `1` に設定します。Playwright 構成の `use` で [`screenshot`][7] を以下のいずれかの値に設定します。

- `'on'`: 各テストの後にスクリーンショットをキャプチャします。
- `'only-on-failure'`: 各テスト失敗の後にスクリーンショットをキャプチャします。
- `'on-first-failure'`: 各テストの最初の失敗の後にスクリーンショットをキャプチャします。

**注**: `'on'` を使用する場合、Test Optimization は失敗したテストのスクリーンショットのみをアップロードします。

[1]: /ja/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /ja/tests/guides/add_custom_measures/?tab=javascripttypescript
[3]: /ja/real_user_monitoring/application_monitoring/browser/setup/
[4]: /ja/continuous_integration/guides/rum_integration/
[5]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.116.0
[6]: https://github.com/DataDog/dd-trace-js/releases/tag/v6.5.0
[7]: https://playwright.dev/docs/api/class-testoptions#test-options-screenshot
{{% /tab %}}

{{% tab "Cucumber" %}}
環境変数 `NODE_OPTIONS` を `-r dd-trace/ci/init` に設定します。通常通りテストを実行します。オプションで `DD_TEST_SESSION_NAME` を使用してテストセッションの名前を指定することもできます。

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=integration-tests yarn test:integration
```

**注**: `NODE_OPTIONS` に値を設定する場合は、`-r dd-trace/ci/init` を上書きしないように注意してください。これは `${NODE_OPTIONS:-}` 節を使用して行うことができます。

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### テストにカスタムタグを追加する {#adding-custom-tags-to-tests-2}

現在アクティブなスパンをつかんで、テストにカスタムタグを追加することができます。

```javascript
  When('the function is called', function () {
    const stepSpan = require('dd-trace').scope().active()
    testSpan.setTag('team_owner', 'my_team')
    // test continues normally
    // ...
  })
```

これらのタグに対してフィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加の詳細については、Node.js カスタムインスツルメンテーションドキュメントの [タグの追加][1] セクションを参照してください。


### テストへのカスタム測定値の追加 {#adding-custom-measures-to-tests-2}

現在アクティブなスパンをつかんで、テストにカスタム測定値を追加することもできます。

```javascript
  When('the function is called', function () {
    const stepSpan = require('dd-trace').scope().active()
    testSpan.setTag('memory_allocations', 16)
    // test continues normally
    // ...
  })
```

カスタム測定値の詳細については、[カスタム測定値の追加ガイド][2] を参照してください。

[1]: /ja/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /ja/tests/guides/add_custom_measures/?tab=javascripttypescript
{{% /tab %}}

{{% tab "Cypress" %}}

### Cypress バージョン 10 以降 {#cypress-version-10-or-later}

Cypress API ドキュメントを使用して、`cypress>=10` のための [プラグインの使用方法を学ぶ][1] ことができます。

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
// Your code can be before this line
// require('./commands')
require('dd-trace/ci/cypress/support')
// Also supported:
// import 'dd-trace/ci/cypress/support'
// Your code can also be after this line
// Cypress.Commands.add('login', (email, pw) => {})
{{< /code-block >}}

他の Cypress プラグインを使用している場合、`cypress.config.js` ファイルに以下の内容が含まれている必要があります。

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // your previous code is before this line
      return require('dd-trace/ci/cypress/plugin')(on, config)
    }
  }
})
{{< /code-block >}}

#### Cypress `after:run` イベント {#cypress-afterrun-event}
Datadog が機能するには [`after:run`][2] Cypress イベントが必要ですが、Cypress はそのイベントに対して複数のハンドラーを許可していません。`after:run` のハンドラーをすでに定義している場合は、`'dd-trace/ci/cypress/after-run'` をインポートして Datadog ハンドラーを手動で追加します。

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('dd-trace/ci/cypress/plugin')(on, config)
      // other plugins
      on('after:run', (details) => {
        // other 'after:run' handlers
        // important that this function call is returned
        return require('dd-trace/ci/cypress/after-run')(details)
      })
    }
  }
})
{{< /code-block >}}

#### Cypress `after:spec` イベント {#cypress-afterspec-event}
Datadog が機能するには [`after:spec`][3] Cypress イベントが必要ですが、Cypress はそのイベントに対して複数のハンドラーを許可していません。`after:spec` のハンドラーをすでに定義している場合は、`'dd-trace/ci/cypress/after-spec'` をインポートして Datadog ハンドラーを手動で追加します。

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('dd-trace/ci/cypress/plugin')(on, config)
      // other plugins
      on('after:spec', (...args) => {
        // other 'after:spec' handlers
        // Important that this function call is returned
        // Important that all the arguments are passed
        return require('dd-trace/ci/cypress/after-spec')(...args)
      })
    }
  }
})
{{< /code-block >}}

通常通りテストを実行します。オプションで `DD_TEST_SESSION_NAME` を使用してテストセッションの名前を指定することもできます。

{{< code-block lang="shell" >}}
DD_TEST_SESSION_NAME=ui-tests yarn test:ui
{{< /code-block >}}


### テストにカスタムタグを追加する {#adding-custom-tags-to-tests-3}

チーム所有者などの追加情報をテストに追加するには、テストまたはフック内で `cy.task('dd:addTags', { yourTags: 'here' })` を使用します。

たとえば、以下のとおりです。

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

これらのタグに対してフィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加の詳細については、Node.js カスタムインスツルメンテーションドキュメントの [タグの追加][4] セクションを参照してください。

### テストへのカスタム測定値の追加 {#adding-custom-measures-to-tests-3}

メモリ割り当てなどのカスタム測定値をテストに追加するには、テストまたはフック内で `cy.task('dd:addTags', { yourNumericalTags: 1 })` を使用します。

たとえば、以下のとおりです。

```javascript
it('renders a hello world', () => {
  cy.task('dd:addTags', {
    'memory_allocations': 16
  })
  cy.get('.hello-world')
    .should('have.text', 'Hello World')
})
```

カスタム測定値の詳細については、[カスタム測定値の追加ガイド][5] を参照してください。

### Cypress - RUM インテグレーション {#cypress-rum-integration}

テスト対象のブラウザアプリケーションが [Browser Monitoring][6] を使用してインスツルメントされている場合、Cypress テストの結果と生成された RUM ブラウザセッションおよびセッションリプレイは自動的にリンクされます。詳細については、[RUM によるブラウザテストのインスツルメントガイド][7] を参照してください。

### テストの失敗スクリーンショットをアップロードする {#upload-test-failure-screenshots-1}

有効にすると、Test Optimization はテストが失敗したときに Cypress がキャプチャしたスクリーンショットをアップロードします。これらは Test Optimization テスト詳細サイドパネルの {{< ui >}}Media{{< /ui >}} タブに表示されます。これらを使用して、失敗時のブラウザの状態を調査します。

{{< img src="continuous_integration/tests/setup/cypress-failure-screenshot-media-tab.png" alt="Test Optimization テスト詳細サイドパネルのメディアタブに表示された Cypress の失敗スクリーンショット。" style="width:100%;" >}}

v5 リリースラインでは [`dd-trace` v5.112.0 以降][8] を、v6 リリースラインでは [`dd-trace` v6.1.0 以降][9] を使用してください。

スクリーンショットのアップロードを有効にするには、`DD_TEST_FAILURE_SCREENSHOTS_ENABLED` 環境変数を `1` に設定します。Cypress 構成で、[`screenshotOnRunFailure`][10] が `true` (デフォルト) に設定されていることを確認してください。

[1]: https://docs.cypress.io/guides/tooling/plugins-guide#Using-a-plugin
[2]: https://docs.cypress.io/api/plugins/after-run-api
[3]: https://docs.cypress.io/api/plugins/after-spec-api
[4]: /ja/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[5]: /ja/tests/guides/add_custom_measures/?tab=javascripttypescript
[6]: /ja/real_user_monitoring/application_monitoring/browser/setup/
[7]: /ja/continuous_integration/guides/rum_integration/
[8]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.112.0
[9]: https://github.com/DataDog/dd-trace-js/releases/tag/v6.1.0
[10]: https://docs.cypress.io/app/references/configuration#Screenshots
{{% /tab %}}

{{% tab "Vitest" %}}
<div class="alert alert-danger">
  <strong>注</strong>: <a href="https://github.com/vitest-dev/vitest?tab=readme-ov-file#features">Vitest は ESM ファーストであるため</a>、その構成は他のテストフレームワークとは異なります。
</div>

Vitest インスツルメンテーションには、`dd-trace` メジャーバージョンでサポートされている Node.js バージョンを使用してください。

- `dd-trace` v5 には Node.js 18.19 以降または Node.js 20.6 以降が必要です。
- `dd-trace`v6 には Node.js 22 以降が必要です。

環境変数 `NODE_OPTIONS` を `--import dd-trace/register.js -r dd-trace/ci/init` に設定します。通常通りテストを実行します。オプションで `DD_TEST_SESSION_NAME` を使用してテストセッションの名前を指定することもできます。

```bash
NODE_OPTIONS="--import dd-trace/register.js -r dd-trace/ci/init" DD_TEST_SESSION_NAME=smoke-tests yarn test:smoke
```

**注**: `NODE_OPTIONS` に値を設定する場合は、`--import dd-trace/register.js -r dd-trace/ci/init` を上書きしないように注意してください。これは `${NODE_OPTIONS:-}` 節を使用して行うことができます。

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" vitest run"
  }
}
{{< /code-block >}}

### テストへのカスタムタグまたは測定値の追加 {#adding-custom-tags-or-measures-to-tests}

現在アクティブなスパンを使用して、テストにカスタムタグを追加することができます。

```javascript
import tracer from 'dd-trace'
import { expect, test } from 'vitest'

test('sum function can sum', () => {
  const testSpan = tracer.scope().active()
  testSpan.setTag('team_owner', 'my_team')

  expect(1 + 2).toBe(3)
})
```

これらのタグに対してフィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加の詳細については、Node.js カスタムインスツルメンテーションドキュメントの [タグの追加][1] セクションを参照してください。

現在アクティブなスパンを使用して、テストにカスタム測定値を追加することもできます。

```javascript
import tracer from 'dd-trace'
import { expect, test } from 'vitest'

test('sum function can sum', () => {
  const testSpan = tracer.scope().active()
  testSpan.setTag('memory_allocations', 16)

  expect(1 + 2).toBe(3)
})
```

カスタム測定値の詳細については、[カスタム測定値の追加ガイド][2] を参照してください。

[1]: /ja/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /ja/tests/guides/add_custom_measures/?tab=javascripttypescript
{{% /tab %}}

{{% tab "WebdriverIO" %}}
WebdriverIO インスツルメンテーションには、`dd-trace` メジャーバージョンでサポートされている Node.js バージョンを使用してください。

- `dd-trace` v5 には Node.js 18.19 以降または Node.js 20.6 以降が必要です。
- `dd-trace`v6 には Node.js 22 以降が必要です。

環境変数 `NODE_OPTIONS` を `--import dd-trace/register.js -r dd-trace/ci/init` に設定します。通常通りテストを実行します。オプションで `DD_TEST_SESSION_NAME` を使用してテストセッションの名前を指定することもできます。

```bash
NODE_OPTIONS="--import dd-trace/register.js -r dd-trace/ci/init" DD_TEST_SESSION_NAME=e2e-tests yarn test:e2e
```

**注**: `NODE_OPTIONS` に値を設定する場合は、`--import dd-trace/register.js -r dd-trace/ci/init` を上書きしないように注意してください。これは `${NODE_OPTIONS:-}` 節を使用して行うことができます。

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test:e2e": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" wdio run ./wdio.conf.js"
  }
}
{{< /code-block >}}

### テストへのカスタムタグまたは測定値の追加 {#adding-custom-tags-or-measures-to-tests-1}

現在アクティブなスパンを使用して、テストにカスタムタグを追加することができます。

```javascript
import tracer from 'dd-trace'

describe('home page', () => {
  it('displays the heading', async () => {
    const testSpan = tracer.scope().active()
    testSpan.setTag('team_owner', 'my_team')

    await browser.url('/')
    await expect($('h1')).toBeDisplayed()
  })
})
```

これらのタグに対してフィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加の詳細については、Node.js カスタムインスツルメンテーションドキュメントの [タグの追加][1] セクションを参照してください。

現在アクティブなスパンを使用して、テストにカスタム測定値を追加することもできます。

```javascript
import tracer from 'dd-trace'

describe('home page', () => {
  it('displays the heading', async () => {
    const testSpan = tracer.scope().active()
    testSpan.setTag('memory_allocations', 16)

    await browser.url('/')
    await expect($('h1')).toBeDisplayed()
  })
})
```

カスタム測定値の詳細については、[カスタム測定値の追加ガイド][2] を参照してください。

[1]: /ja/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /ja/tests/guides/add_custom_measures/?tab=javascripttypescript
{{% /tab %}}

{{< /tabs >}}

### 「Cannot find module 'dd-trace/ci/init'」エラーの修正方法 {#how-to-fix-cannot-find-module-dd-traceciinit-errors}

`dd-trace` を使用している場合、次のエラーメッセージが表示されることがあります。

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

これは `NODE_OPTIONS` の誤った使用が原因である可能性があります。

たとえば、GitHub Action が次のようになっている場合です。

```yml
jobs:
  my-job:
    name: Run tests
    runs-on: ubuntu-latest
    # Invalid NODE_OPTIONS
    env:
      NODE_OPTIONS: -r dd-trace/ci/init
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Install node
        uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```

**注:** `NODE_OPTIONS` は `npm install` を含むすべてのノードプロセスによって解釈されるため、これは機能しません。インストールされる前に `dd-trace/ci/init` をインポートしようとすると、このステップは失敗します。

GitHub Action は代わりに次のようになっている必要があります。

```yml
jobs:
  my-job:
    name: Run tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Install node
        uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
        env:
          NODE_OPTIONS: -r dd-trace/ci/init
```

以下のベストプラクティスに従ってください。

* テストを実行するプロセスにのみ `NODE_OPTIONS` 環境変数が設定されていることを確認してください。
* 特に、パイプラインまたはジョブ定義のグローバル環境変数設定で `NODE_OPTIONS` を定義することはしないでください。


#### Yarn 2 以降の使用 {#using-yarn-2-or-later}

`yarn>=2` と `.pnp.cjs` ファイルを使用している場合、同じエラーが発生する可能性があります。

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

`NODE_OPTIONS` を以下のように設定することで修正できます:

```bash
NODE_OPTIONS="-r $(pwd)/.pnp.cjs -r dd-trace/ci/init" yarn test
```

## コードカバレッジを報告する {#reporting-code-coverage}

テストに [Istanbul][5] がインスツルメンテーションされると、Datadog トレーサー (v3.20.0 以降) はテストセッションの `test.code_coverage.lines_pct` タグでそれを報告します。

テストセッションの **Coverage** タブで、テストカバレッジの推移を見ることができます。

詳しくは、[Code Coverage][6] を参照してください。

## コンフィギュレーション設定 {#configuration-settings}

以下は、SDK で使用できる最も重要なコンフィギュレーション設定のリストです。

`test_session.name`
: `integration-tests`、`unit-tests`、または `smoke-tests` などのテストグループを識別するために使用します。<br/>
**環境変数**: `DD_TEST_SESSION_NAME`<br/>
**デフォルト**: `dd-trace` v6 の場合、`jest`、`mocha`、`playwright test`、または `cucumber-js` などのフレームワーク呼び出し。`dd-trace` v5 の場合、CI ジョブ名とテストコマンドの組み合わせ。<br/>
**例**: `unit-tests`、`integration-tests`、`smoke-tests`

`service`
: テスト対象のサービスまたはライブラリの名前。<br/>
**環境変数**: `DD_SERVICE`<br/>
**デフォルト**: (テストフレームワーク名)<br/>
**例**: `my-ui`

`env`
: テストが実行されている環境の名前。<br/>
**環境変数**: `DD_ENV`<br/>
**デフォルト**: `none`<br/>
**例**: `local`、`ci`

`url`
: `http://hostname:port` 形式のトレース収集用の Datadog Agent URL。<br/>
**環境変数**: `DD_TRACE_AGENT_URL`<br/>
**デフォルト**: `http://localhost:8126`

`service` および `env` の予約タグの詳細については、[Unified Service Tagging][7] を参照してください。他のすべての [Datadog トレーサーコンフィギュレーション][8] オプションも使用できます。

## Git のメタデータを収集する {#collecting-git-metadata}

{{% ci-git-metadata %}}

## 手動テスト API {#manual-testing-api}

<div class="alert alert-danger">
  <strong>注</strong>: 手動テスト API は、 <code>dd-trace</code> バージョン <code>5.23.0</code> および <code>4.47.0</code>から利用可能です。
</div>

Jest、Mocha、Cypress、Playwright、Cucumber、Vitest、または WebdriverIO を使用している場合は、**手動テスト API を使用しないでください**。Test Optimization は、これらのフレームワークに対して自動的にインスツルメンテーションを行い、テスト結果を Datadog に送信します。手動テスト API は、サポートされているテストフレームワークと**互換性がありません**。

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

### テスト開始チャンネル {#test-start-channel}

このチャンネルを ID `dd-trace:ci:manual:test:start` で取得して、テストが開始されることを公開します。これを行うのに適した場所は、`beforeEach` フックなどです。

```typescript
const { channel } = require('node:diagnostics_channel')
const testStartCh = channel('dd-trace:ci:manual:test:start')

// ... code for your testing framework goes here
  beforeEach(() => {
    const testDefinition = {
      testName: 'a-string-that-identifies-this-test',
      testSuite: 'what-suite-this-test-is-from.js'
    }
    testStartCh.publish(testDefinition)
  })
// code for your testing framework continues here ...
```

公開されるペイロードには `testName` と `testSuite` という属性があり、どちらも文字列です。これは開始しようとしているテストを識別します。

### テスト終了チャンネル {#test-finish-channel}

このチャンネルを ID `dd-trace:ci:manual:test:finish` で取得して、テストが終了されることを公開します。これを行うのに適した場所は、`afterEach` フックなどです。

```typescript
const { channel } = require('node:diagnostics_channel')
const testFinishCh = channel('dd-trace:ci:manual:test:finish')

// ... code for your testing framework goes here
  afterEach(() => {
    const testStatusPayload = {
      status: 'fail',
      error: new Error('assertion error')
    }
    testStartCh.publish(testStatusPayload)
  })
// code for your testing framework continues here ...
```

公開されるペイロードには `status` と `error` という属性があります。

* `status` は、以下の 3 つの値のうちの 1 つを取る文字列です。
  テストがパスしたら * `'pass'`。
  テストが失敗したら * `'fail'`。
  テストがスキップされたら * `'skip'`。

* `error`は、テストが失敗した理由を含む `Error` オブジェクトです。

### タグ追加チャンネル {#add-tags-channel}

このチャンネルを ID `dd-trace:ci:manual:test:addTags` で取得して、テストにカスタムタグが必要であることを公開します。これはテスト関数内で行うことができます。

```typescript
const { channel } = require('node:diagnostics_channel')
const testAddTagsCh = channel('dd-trace:ci:manual:test:addTags')

// ... code for your testing framework goes here
  test('can sum', () => {
    testAddTagsCh.publish({ 'test.owner': 'my-team', 'number.assertions': 3 })
    const result = sum(2, 1)
    assert.equal(result, 3)
  })
// code for your testing framework continues here ...
```

公開されるペイロードは、テストに追加されるタグまたは測定値の辞書 `<string, string|number>` です。


### テストを実行する {#run-the-tests}

テスト開始チャンネルと終了チャンネルをコードに入れたら、以下の環境変数を含めて、いつものようにテストフレームワークを実行します。

```shell
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=custom-tests yarn run-my-test-framework
```



## 既知の制限 {#known-limitations}

### ブラウザテスト {#browser-tests}
`mocha`、`jest`、`cucumber`、`cypress`、`playwright`、および `vitest` で実行されるブラウザテストは `dd-trace-js` によりインスツルメントされますが、ブラウザセッション自体の可視性はデフォルトでは提供されません (ネットワーク呼び出し、ユーザーのアクション、ページロードなど)。

ブラウザ処理の可視性を希望する場合は、[RUM & Session Replay][9] の使用を検討してください。Cypress または Playwright を使用していると、テスト結果とそれによって生成された RUM ブラウザセッションおよびセッションリプレイは自動的にリンクされます。詳細については、[RUM によるブラウザテストのインスツルメントガイド][10] を参照してください。

### Cypress インタラクティブモード {#cypress-interactive-mode}

Cypress インタラクティブモード (`cypress open` を実行して開始可能) は、[`before:run`][11] などの一部の Cypress イベントが発生しないため、Test Optimization ではサポートされていません。それでも試したい場合は、[Cypress 構成ファイル][12] に `experimentalInteractiveRunEvents: true` を渡してください。

### 再試行には Cypress テスト分離が必要 {#retries-require-cypress-test-isolation}

Cypress の [テスト分離][13] は、
再試行ベースの Test Optimization 機能が動作するために有効 (デフォルト) になっている必要があります。`testIsolation` が
`false` に設定されている場合、を Cypress 設定に指定すると、`dd-trace` はすべてのテストの
再試行 [Early Flake Detection][22]、[Auto Test Retries][23]、および
[attempt to fix][24] を無効にします。これらの機能は各テストをその場で再実行するため、分離が必要となるからです。

分離が無効になっている場合、トレーサーは警告 `Test isolation is
disabled, retries will not be enabled` を記録し、テスト実行に
`@test.test_management.is_attempt_to_fix` タグは付けられません。トレーサーはグローバル
`testIsolation` 値を読み取るため、スイートごとの `describe` オーバーライドでは再試行は再有効化されません。

### Jest の `--forceExit` {#jests-forceexit}
Jest の [--forceExit][15] オプションはデータ損失を引き起こす可能性があります。Datadog はテスト終了直後にデータを送信しようとしますが、プロセスを突然シャットダウンすると一部のリクエストが失敗する可能性があります。`--forceExit` は注意して使用してください。

### Mocha の `--exit` {#mochas-exit}
Mocha の [--exit][16] オプションはデータ損失を引き起こす可能性があります。Datadog はテスト終了直後にデータを送信しようとしますが、プロセスを突然シャットダウンすると一部のリクエストが失敗する可能性があります。`--exit` は注意して使用してください。

### Vitest のテスト実行時間のオーバーヘッド {#vitests-test-duration-overhead}

デフォルトでは、Vitest の [`isolate`][21] オプションは `true` であるため、各テストファイルは独自のフォークまたはスレッドで実行されます。Vitest は ESM-first であり、インスツルメンテーションに [import-in-the-middle][20] を使用しているため、スイートが開始されるたびにセットアップコストが発生します。分離により、そのセットアップコストがファイルごとに繰り返されます。セットアップタイムがウォールクロックタイムの大部分を占める可能性があるため、この影響は小さくて高速なスイートが多数ある場合に最大となります。

オーバーヘッドを減らすには、Vitest 構成ファイルで `isolate: false` を設定するか、テストコマンドに `--no-isolate` を渡してください。

Vitest の分離を有効にしたままワーカー起動のオーバーヘッドを低減するには、`DD_EXPERIMENTAL_TEST_OPT_VITEST_NO_WORKER_INIT=true` を設定してください。このオプションは `dd-trace` v5 (`5.111.0` 以降) および v6 (`6.0.0` 以降) で使用可能です。これは Vitest `3.2.6` 以降の分離された Vitest ワーカープールの実行に適用され、サポートされていない構成では通常のワーカーインスツルメンテーションにフォールバックします。

このモードでは Vitest ワーカー内で `dd-trace` を初期化しないため、以下の機能はサポートされていません。

- カスタムテストタグ
- カスタムスパン
- テストコードからのログの相関付け
- 失敗したテストのリプレイ

## ベストプラクティス {#best-practices}

テストフレームワークと Test Optimization を最大限に活用するために、以下のプラクティスに従ってください。

### パラメーター化されたテスト {#parameterized-tests}

可能な限り、テストフレームワークが提供するパラメーター化されたテスト用のツールを活用してください。たとえば、`jest` を利用できます。

以下は避けてください。
{{< code-block lang="javascript" >}}
[[1,2,3], [3,4,7]].forEach((a,b,expected) => {
  test('sums correctly', () => {
    expect(a+b).toEqual(expected)
  })
})
{{< /code-block >}}

代わりに [`test.each`][18] を使用してください。

{{< code-block lang="javascript" >}}
test.each([[1,2,3], [3,4,7]])('sums correctly %i and %i', (a,b,expected) => {
  expect(a+b).toEqual(expected)
})
{{< /code-block >}}

`mocha` の場合は、[`mocha-each`][19] を使用してください。

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

この方法を使用すると、テストフレームワークと Test Optimization の両方でテストを区別することができます。

### テストセッション名 `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

`DD_TEST_SESSION_NAME` を使用してテストセッションの名前と関連するテストグループを定義します。このタグの値の例は次のとおりです。

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

`DD_TEST_SESSION_NAME` が指定されていない場合、デフォルト値は次のようになります。

- `dd-trace` v6 の場合、`jest`、`mocha`、`playwright test`、または `cucumber-js` などのフレームワーク呼び出し
- `dd-trace` v5 の場合、CI ジョブ名とテストの実行に使用されるコマンドの組み合わせ (例: `my-ci-job yarn test`)

テストセッション名は、異なるテストグループを区別しやすくするためにリポジトリ内で一意でなければなりません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[3]: /ja/tracing/trace_collection/dd_libraries/nodejs
[4]: https://github.com/DataDog/dd-trace-js#version-release-lines-and-maintenance
[5]: https://istanbul.js.org/
[6]: /ja/tests/code_coverage/?tab=javascripttypescript
[7]: /ja/getting_started/tagging/unified_service_tagging
[8]: /ja/tracing/trace_collection/library_config/nodejs/?tab=containers#configuration
[9]: /ja/real_user_monitoring/application_monitoring/browser/
[10]: /ja/continuous_integration/guides/rum_integration/
[11]: https://docs.cypress.io/api/plugins/before-run-api
[12]: https://docs.cypress.io/guides/references/configuration#Configuration-File
[13]: https://docs.cypress.io/app/core-concepts/test-isolation
[15]: https://jestjs.io/docs/cli#--forceexit
[16]: https://mochajs.org/running/cli/#--exit
[18]: https://jestjs.io/docs/api#testeachtablename-fn-timeout
[19]: https://www.npmjs.com/package/mocha-each
[20]: https://github.com/nodejs/import-in-the-middle
[21]: https://vitest.dev/config/isolate
[22]: /ja/tests/flaky_tests/early_flake_detection/
[23]: /ja/tests/flaky_tests/auto_test_retries/
[24]: /ja/tests/flaky_management/#confirm-fixes-for-flaky-tests