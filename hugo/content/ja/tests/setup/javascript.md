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
  text: Containers 内でのテスト用環境変数の転送
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスの調査
- link: /tests/test_impact_analysis/javascript
  tag: ドキュメント
  text: Test Impact Analysis でのテストジョブの高速化
- link: /tests/troubleshooting/
  tag: ドキュメント
  text: Test Optimization のトラブルシューティング
title: JavaScript および TypeScript のテスト
type: multi-code-lang
---
## 互換性 {#compatibility}

{{< tabs >}}
{{% tab "dd-trace v6" %}}

| テストフレームワーク | バージョン | 注記 |
|---|---|---|
| Jest | >= 28.0.0 | `jsdom` (`jest-environment-jsdom` パッケージ内) および `node` (`jest-environment-node` パッケージ内) のみがテスト環境としてサポートされています。`jest-electron-runner` での `@jest-runner/electron/environment` のようなカスタム環境はサポートされていません。<br><br>[`jest-circus`](https://github.com/facebook/jest/tree/main/packages/jest-circus) のみが [`testRunner`](https://jestjs.io/docs/configuration#testrunner-string) としてサポートされています。<br><br>[`test.concurrent`](https://jestjs.io/docs/api#testconcurrentname-fn-timeout)は `dd-trace>=6.1.0` 以降でサポートされています。|
| Mocha | >= 8.0.0 |
| Cucumber | >= 7.0.0 |
| Cypress | >= 12.0.0 |
| Playwright | >= 1.38.0 |
| Vitest | >= 1.6.0 | [`test.concurrent`](https://vitest.dev/api/#test-concurrent) は `dd-trace>=6.1.0` 以降でサポートされています。|

`dd-trace` v6 には Node.js 22 以降が必要です。

{{% /tab %}}
{{% tab "dd-trace v5" %}}

| テストフレームワーク | バージョン | 注記 |
|---|---|---|
| Jest | >= 24.8.0 | `jsdom` (`jest-environment-jsdom` パッケージ内) および `node` (`jest-environment-node` パッケージ内) のみがテスト環境としてサポートされています。`jest-electron-runner` での `@jest-runner/electron/environment` のようなカスタム環境はサポートされていません。<br><br>[`jest-circus`](https://github.com/facebook/jest/tree/main/packages/jest-circus) のみが [`testRunner`](https://jestjs.io/docs/configuration#testrunner-string) としてサポートされています。<br><br>[`test.concurrent`](https://jestjs.io/docs/api#testconcurrentname-fn-timeout)は `dd-trace>=5.112.0` 以降でサポートされています。|
| Mocha | >= 5.2.0 |
| Cucumber | >= 7.0.0 |
| Cypress | >= 6.7.0 |
| Playwright | >= 1.18.0 |
| Vitest | >= 1.6.0 | `dd-trace>=5.18.0` 以降でサポートされています。[`test.concurrent`](https://vitest.dev/api/#test-concurrent) は `dd-trace>=5.112.0` 以降でサポートされています。|

{{% /tab %}}
{{< /tabs >}}

インスツルメンテーションは実行時に機能するため、TypeScript、Webpack、Babel などのトランスパイラーは追加の設定なしでサポートされます。

## レポート方法の構成 {#configuring-reporting-method}

テスト結果を Datadog にレポートするには、Datadog JavaScript ライブラリを構成する必要があります。

{{< tabs >}}
{{% tab "自動インスツルメンテーションをサポートする CI プロバイダー" %}}
{{% ci-autoinstrumentation %}}

<div class="alert alert-danger">
  <strong>注</strong>: Cypress テストでは自動インスツルメンテーションはサポートされていません。Cypress テストをインスツルメンテーションするには、以下に記載されている手動インスツルメンテーションの手順に従ってください。
</div>

{{% /tab %}}

{{% tab "その他のクラウド CI プロバイダー" %}}
{{% ci-agentless %}}

{{% /tab %}}
{{% tab "オンプレミス CI プロバイダー" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

## JavaScript トレーサーのインストール {#installing-the-javascript-tracer}

[JavaScript トレーサー][3] をインストールするには、次を実行します。

```bash
yarn add --dev dd-trace
```

詳細については、[JavaScript トレーサーのインストールに関するドキュメント][4] を参照してください。

## テストのインスツルメンテーション {#instrument-your-tests}

{{< tabs >}}
{{% tab "Jest/Mocha" %}}
`NODE_OPTIONS` 環境変数を `-r dd-trace/ci/init` に設定します。通常と同じ方法でテストを実行します。必要に応じて、`DD_TEST_SESSION_NAME` を使用してテストセッションの名前を指定できます。

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=unit-tests yarn test
```

**注**: `NODE_OPTIONS` の値を設定する場合は、`-r dd-trace/ci/init` を上書きしないように注意してください。値を設定するには `${NODE_OPTIONS:-}` 句を使用できます。

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### テストにカスタムタグを追加する {#adding-custom-tags-to-tests}

テストにカスタムタグを追加するには、現在アクティブなスパンを使用します。

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('team_owner', 'my_team')
    // test continues normally
    // ...
  })
```

これらのタグのフィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加に関する詳細については、Node.js カスタムインスツルメンテーションに関するドキュメントの [タグの追加][1] セクションを参照してください。


### テストにカスタムメジャーを追加する {#adding-custom-measures-to-tests}

タグと同様に、テストにカスタムメジャーを追加するには、現在アクティブなスパンを使用します。

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('memory_allocations', 16)
    // test continues normally
    // ...
  })
```

カスタムメジャーの詳細については、[カスタムメジャーの追加ガイド][2] を参照してください。

### Mocha ECMAScript モジュール (ESM) {#mocha-ecmascript-modules-esm}
[Mocha >=9.0.0][3] では、テストファイルを読み込むために ESM ファーストのアプローチを使用します。`NODE_OPTIONS` を `-r dd-trace/ci/init --import dd-trace/register.js` に設定して、テストの完全な可視性を確保します。詳細については、[`dd-trace-js` ESM サポート][4] を参照してください。


[1]: /ja/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /ja/tests/guides/add_custom_measures/?tab=javascripttypescript
[3]: https://github.com/mochajs/mocha/releases/tag/v9.0.0
[4]: https://github.com/datadog/dd-trace-js?tab=readme-ov-file#ecmascript-modules-esm-support
{{% /tab %}}

{{% tab "Playwright" %}}
`NODE_OPTIONS` 環境変数を `-r dd-trace/ci/init` に設定します。通常と同じ方法でテストを実行します。必要に応じて、`DD_TEST_SESSION_NAME` を使用してテストセッションの名前を指定できます。

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=e2e-tests yarn test:e2e
```

**注**: `NODE_OPTIONS` の値を設定する場合は、`-r dd-trace/ci/init` を上書きしないように注意してください。値を設定するには `${NODE_OPTIONS:-}` 句を使用できます。

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### テストにカスタムタグを追加する {#adding-custom-tags-to-tests-1}

テストにカスタムタグを追加するには、現在アクティブなスパンを使用します。

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

これらのタグのフィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加に関する詳細については、Node.js カスタムインスツルメンテーションに関するドキュメントの [タグの追加][1] セクションを参照してください。

### テストにカスタムメジャーを追加する {#adding-custom-measures-to-tests-1}

現在アクティブなスパンを使用して、テストにカスタムメジャーを追加することもできます。

```javascript
test('user profile', async ({ page }) => {
  const testSpan = require('dd-trace').scope().active()
  testSpan.setTag('memory_allocations', 16)
  // ...
})
```

カスタムメジャーの詳細については、[カスタムメジャーの追加ガイド][2] を参照してください。

### Playwright - RUM 統合 {#playwright-rum-integration}

テスト対象のブラウザアプリケーションが [Browser Monitoring][3] を使用してインスツルメンテーションされている場合、Playwright のテスト結果と、それによって生成された RUM ブラウザセッションと Session Replay が自動的にリンクされます。詳細については、[RUM によるブラウザテストのインスツルメンテーションガイド][4] を参照してください。

### テスト失敗時のスクリーンショットをアップロードする {#upload-test-failure-screenshots}

有効にすると、Test Optimization はテストの失敗時に Playwright がキャプチャしたスクリーンショットをアップロードします。Test Optimization のテスト詳細サイドパネルの {{< ui >}}Media{{< /ui >}} タブでスクリーンショットを確認できます。これらを使用して、失敗時のブラウザの状態を調査します。

{{< img src="continuous_integration/tests/setup/playwright-failure-screenshot-media-tab.png" alt="Test Optimization のテスト詳細サイドパネルの [Media] タブに表示された Playwright 失敗時のスクリーンショット。" style="width:100%;" >}}

v5 リリースラインでは [`dd-trace` v5.116.0 以降][5] を、v6 リリースラインでは [`dd-trace` v6.5.0 以降][6] を使用してください。

スクリーンショットのアップロードを有効にするには、`DD_TEST_FAILURE_SCREENSHOTS_ENABLED` 環境変数を `1` に設定します。Playwright 構成の `use` で、[`screenshot`][7] を次のいずれかの値に設定します。

- `'on'`: 各テストの後にスクリーンショットをキャプチャします。
- `'only-on-failure'`: 各テストが失敗した後にスクリーンショットをキャプチャします。
- `'on-first-failure'`: 各テストが最初に失敗した後にスクリーンショットをキャプチャします。

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
`NODE_OPTIONS` 環境変数を `-r dd-trace/ci/init` に設定します。通常と同じ方法でテストを実行します。必要に応じて、`DD_TEST_SESSION_NAME` を使用してテストセッションの名前を指定できます。

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=integration-tests yarn test:integration
```

**注**: `NODE_OPTIONS` の値を設定する場合は、`-r dd-trace/ci/init` を上書きしないように注意してください。値を設定するには `${NODE_OPTIONS:-}` 句を使用できます。

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### テストにカスタムタグを追加する {#adding-custom-tags-to-tests-2}

テストにカスタムタグを追加するには、現在有効なスパンを取得します。

```javascript
  When('the function is called', function () {
    const stepSpan = require('dd-trace').scope().active()
    testSpan.setTag('team_owner', 'my_team')
    // test continues normally
    // ...
  })
```

これらのタグのフィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加に関する詳細については、Node.js カスタムインスツルメンテーションに関するドキュメントの [タグの追加][1] セクションを参照してください。


### テストにカスタムメジャーを追加する {#adding-custom-measures-to-tests-2}

現在有効なスパンを取得することで、テストにカスタムメジャーを追加することもできます。

```javascript
  When('the function is called', function () {
    const stepSpan = require('dd-trace').scope().active()
    testSpan.setTag('memory_allocations', 16)
    // test continues normally
    // ...
  })
```

カスタムメジャーの詳細については、[カスタムメジャーの追加ガイド][2] を参照してください。

[1]: /ja/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /ja/tests/guides/add_custom_measures/?tab=javascripttypescript
{{% /tab %}}

{{% tab "Cypress" %}}

### Cypress バージョン 10 以降 {#cypress-version-10-or-later}

Cypress API ドキュメントを使用して、`cypress>=10` の [プラグインの使用方法][1] を確認します。

`cypress.config.js` ファイルに、以下を設定します。

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents: require('dd-trace/ci/cypress/plugin'),
    supportFile: 'cypress/support/e2e.js'
  }
})
{{< /code-block >}}

`supportFile` の**最上位レベル**に、次の行を追加します:

{{< code-block lang="javascript" filename="cypress/support/e2e.js" >}}
// Your code can be before this line
// require('./commands')
require('dd-trace/ci/cypress/support')
// Also supported:
// import 'dd-trace/ci/cypress/support'
// Your code can also be after this line
// Cypress.Commands.add('login', (email, pw) => {})
{{< /code-block >}}

他の Cypress プラグインを使用している場合、`cypress.config.js` ファイルには以下を含める必要があります。

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
Datadog が機能するには [`after:run`][2] Cypress イベントが必要ですが、Cypress ではこのイベントに複数のハンドラーを使用することができません。`after:run` のハンドラーをすでに定義している場合は、`'dd-trace/ci/cypress/after-run'` をインポートして Datadog ハンドラーを手動で追加してください。

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
Datadog が機能するには [`after:spec`][3] Cypress イベントが必要ですが、Cypress ではこのイベントに複数のハンドラーを使用することができません。`after:spec` のハンドラーをすでに定義している場合は、`'dd-trace/ci/cypress/after-spec'` をインポートして Datadog ハンドラーを手動で追加してください。

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

通常と同じ方法でテストを実行します。必要に応じて、`DD_TEST_SESSION_NAME` を使用してテストセッションの名前を指定できます。

{{< code-block lang="shell" >}}
DD_TEST_SESSION_NAME=ui-tests yarn test:ui
{{< /code-block >}}


### テストにカスタムタグを追加する {#adding-custom-tags-to-tests-3}

チームオーナーなどの追加情報をテストに追加するには、テストまたはフック内で `cy.task('dd:addTags', { yourTags: 'here' })` を使用します。

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

これらのタグのフィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加に関する詳細については、Node.js カスタムインスツルメンテーションに関するドキュメントの [タグの追加][4] セクションを参照してください。

### テストにカスタムメジャーを追加する {#adding-custom-measures-to-tests-3}

メモリ割り当てなどのカスタムメジャーをテストに追加するには、テストまたはフック内で `cy.task('dd:addTags', { yourNumericalTags: 1 })` を使用します。

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

カスタムメジャーに関する詳細については、[カスタムメジャーの追加ガイド][5] を参照してください。

### Cypress - RUM 統合 {#cypress-rum-integration}

テスト対象のブラウザアプリケーションが [Browser Monitoring][6] を使用してインスツルメンテーションされている場合、Cypress のテスト結果と、それによって生成された RUM ブラウザセッションと Session Replay が自動的にリンクされます。詳細については、[RUM によるブラウザテストのインスツルメンテーションガイド][7] を参照してください。

### テスト失敗時のスクリーンショットをアップロードする {#upload-test-failure-screenshots-1}

有効にすると、Test Optimization はテストの失敗時に Cypress がキャプチャしたスクリーンショットをアップロードします。これらのスクリーンショットは、Test Optimization のテスト詳細サイドパネルの {{< ui >}}Media{{< /ui >}} タブに表示されます。これらを使用して、失敗時のブラウザの状態を調査します。

{{< img src="continuous_integration/tests/setup/cypress-failure-screenshot-media-tab.png" alt="Test Optimization のテスト詳細サイドパネルの [Media] タブに表示された Cypress 失敗時のスクリーンショット。" style="width:100%;" >}}

v5 リリースラインでは [`dd-trace` v5.112.0 以降][8] を、v6 リリースラインでは [`dd-trace` v6.1.0 以降][9] を使用してください。

スクリーンショットのアップロードを有効にするには、`DD_TEST_FAILURE_SCREENSHOTS_ENABLED` 環境変数を `1` に設定します。Cypress 構成で、[`screenshotOnRunFailure`][10] が `true` (デフォルト) に設定されていることを確認します。

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

Vitest のインスツルメンテーションについては、お使いの `dd-trace` メジャーバージョンでサポートされている Node.js バージョンを使用してください。
- `dd-trace` v5 には、Node.js 18.19 以降または Node.js 20.6 以降が必要です。
- `dd-trace`v6 には、Node.js 22 以降が必要です。

`NODE_OPTIONS` 環境変数を `--import dd-trace/register.js -r dd-trace/ci/init` に設定します。通常と同じ方法でテストを実行します。必要に応じて、`DD_TEST_SESSION_NAME` を使用してテストセッションの名前を指定できます。

```bash
NODE_OPTIONS="--import dd-trace/register.js -r dd-trace/ci/init" DD_TEST_SESSION_NAME=smoke-tests yarn test:smoke
```

**注**: `NODE_OPTIONS` の値を設定する場合は、`--import dd-trace/register.js -r dd-trace/ci/init` を上書きしないように注意してください。値を設定するには `${NODE_OPTIONS:-}` 句を使用できます。

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" vitest run"
  }
}
{{< /code-block >}}

### テストにカスタムタグまたはメジャーを追加する {#adding-custom-tags-or-measures-to-tests}

テストにカスタムタグを追加するには、現在アクティブなスパンを使用します。

```javascript
import tracer from 'dd-trace'
import { expect, test } from 'vitest'

test('sum function can sum', () => {
  const testSpan = tracer.scope().active()
  testSpan.setTag('team_owner', 'my_team')

  expect(1 + 2).toBe(3)
})
```

これらのタグのフィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加に関する詳細については、Node.js カスタムインスツルメンテーションに関するドキュメントの [タグの追加][1] セクションを参照してください。

現在アクティブなスパンを使用して、テストにカスタムメジャーを追加することもできます。

```javascript
import tracer from 'dd-trace'
import { expect, test } from 'vitest'

test('sum function can sum', () => {
  const testSpan = tracer.scope().active()
  testSpan.setTag('memory_allocations', 16)

  expect(1 + 2).toBe(3)
})
```

カスタムメジャーの詳細については、[カスタムメジャーの追加ガイド][2] を参照してください。

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

**注:** `NODE_OPTIONS` は `npm install` を含むすべてのノードプロセスによって解釈されるため、これは機能しません。これがインストールされる前に `dd-trace/ci/init` をインポートしようとすると、このステップは失敗します。

代わりに、GitHub Action を次のように記述してください。

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

* 環境変数 `NODE_OPTIONS` がテストを実行するプロセスにのみ設定されていることを確認します。
* 特に、パイプラインやジョブ定義のグローバル環境変数設定で `NODE_OPTIONS` を定義しないようにします。


#### Yarn 2 以降を使用する場合 {#using-yarn-2-or-later}

`yarn>=2` と `.pnp.cjs` ファイルを使用する場合も、同じエラーが発生することがあります。

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

これを修正するには、`NODE_OPTIONS` を次のように設定します。

```bash
NODE_OPTIONS="-r $(pwd)/.pnp.cjs -r dd-trace/ci/init" yarn test
```

## コードカバレッジのレポート {#reporting-code-coverage}

テストが [Istanbul][5] でインスツルメンテーションされている場合、Datadog Tracer (v3.20.0 以降) はテストセッションの `test.code_coverage.lines_pct` タグでその旨をレポートします。

テストセッションの **[Coverage]** タブで、テストカバレッジの進化を確認できます。

詳細については、[Code Coverage][6] を参照してください。

## 構成設定 {#configuration-settings}

以下に、SDK で使用できる最も重要な構成設定をリストします。

`test_session.name`
: これを使用して、`integration-tests`、`unit-tests`、`smoke-tests` などのテストを識別します。<br/>
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
**例**: `local`, `ci`

`url`
: トレース収集用の Datadog Agent URL (`http://hostname:port` の形式)。<br/>
**環境変数**: `DD_TRACE_AGENT_URL`<br/>
**デフォルト**: `http://localhost:8126`

`service` および `env` 予約タグの詳細については、[Unified Service Tagging][7] を参照してください。その他すべての [Datadog Tracer 構成][8] オプションも使用できます。

## Git メタデータの収集 {#collecting-git-metadata}

{{% ci-git-metadata %}}

## 手動テスト API {#manual-testing-api}

<div class="alert alert-danger">
  <strong>注</strong>: 手動テスト API は、 <code>dd-trace</code> バージョン <code>5.23.0</code> および <code>4.47.0</code>以降で利用できます。
</div>

Jest、Mocha、Cypress、Playwright、Cucumber、または Vitest を使用する場合は、Test Optimization がこれらを自動的にインスツルメンテーションし、テスト結果を Datadog に送信するため、**手動テスト API を使用しないでください**。手動テスト API には、すでにサポートされているテストフレームワークとの**互換性がありません**。

サポート対象外のテストフレームワークを使用している場合や、別のテストメカニズムがある場合にのみ、手動テスト API を使用してください。

手動テスト API は、Node.js の `node:diagnostics_channel` モジュールを活用し、次に公開可能なチャネルに基づいています。

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

### テスト開始チャネル {#test-start-channel}

このチャネルをその ID `dd-trace:ci:manual:test:start` で取得して、テストの開始を公開します。公開するのに適した場所は、`beforeEach` フックなどです。

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

公開されるペイロードには、開始しようとしているテストを識別する`testName` と `testSuite` という属性 (どちらも文字列) が含まれます。

### テスト終了チャネル {#test-finish-channel}

テストが終了することを公開するには、ID `dd-trace:ci:manual:test:finish` を使用してこのチャネルを取得してください。これを公開するのに適した場所は、`afterEach` フックなどです。

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

公開されるペイロードには、`status` 属性と `error` 属性が含まれます。

* `status` は、次の 3 つの値のいずれかをとる文字列です。
  * `'pass'`: テストが合格した場合。
  * `'fail'`: テストが失敗した場合。
  * `'skip'`: テストがスキップされた場合。

* `error`は、テストが失敗した理由を格納する `Error` オブジェクトです。

###  タグチャネルを追加する {#add-tags-channel}

テストにカスタムタグが必要であることを公開するには、このチャネルを ID `dd-trace:ci:manual:test:addTags` で取得します。これはテスト関数内で実行できます。

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

公開されるペイロードは、テストに追加されるタグまたはメジャーの辞書 `<string, string|number>` です。


### テストを実行する {#run-the-tests}

テストの開始チャネルと終了チャネルがコード内にある場合は、次の環境変数を含めて、通常と同じようにテストフレームワークを実行します。

```shell
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=custom-tests yarn run-my-test-framework
```



## 既知の制限事項 {#known-limitations}

### ブラウザテスト {#browser-tests}
`mocha`、`jest`、`cucumber`、`cypress`、`playwright`、および`vitest` で実行されるブラウザテストは `dd-trace-js`によってインスツルメンテーションされますが、ブラウザセッション自体の可視性 (ネットワーク呼び出し、ユーザーアクション、ページ読み込みなど) はデフォルトでは提供されません。

ブラウザプロセスの可視性が必要な場合は、[RUM と Session Replay][9] の使用を検討してください。Cypress または Playwright を使用する場合、テスト結果とそれによって生成された RUM ブラウザセッションと Session Replay が自動的にリンクされます。詳細については、[RUM によるブラウザテストのインスツルメンテーションガイド][10] を参照してください。

### Cypress インタラクティブモード {#cypress-interactive-mode}

Cypress インタラクティブモード (`cypress open` を実行することで開始可能) は、Test Optimization ではサポートされていません。これは、[`before:run`][11] などの一部の Cypress イベントが発生しないためです。それでも試したい場合は、`experimentalInteractiveRunEvents: true` を [Cypress 構成ファイル][12] に渡します。

### 再試行には Cypress のテスト分離が必要です {#retries-require-cypress-test-isolation}

Cypress の [テスト分離][13] を有効 (デフォルト) にしなければ、
再試行ベースの Test Optimization 機能は動作しません。`testIsolation` が
Cypress 構成で `false` に設定されていると、`dd-trace` はすべてのテスト
再試行 [Early Flake Detection][22]、[Auto Test Retries][23]、
[attempt to fix][24] を無効にします。これらの機能は各テストをその場で再実行するため、分離が必要となるからです。

分離が無効になっている場合、トレーサーは警告 `Test isolation is
disabled, retries will not be enabled` をログに記録します。この場合、テスト実行には
`@test.test_management.is_attempt_to_fix` タグが設定されません。トレーサーはグローバル
`testIsolation` 値を読み取るため、スイートごとの `describe` をオーバーライドしても再試行は再有効化されません。

### Jest の `--forceExit` {#jests-forceexit}
Jest の [--forceExit][15] オプションは、データ損失を引き起こす可能性があります。Datadog はテスト終了直後にデータを送信しようとしますが、プロセスが突然終了されると一部のリクエストが失敗する可能性があります。`--forceExit` は慎重に使用してください。

### Mocha の`--exit` {#mochas-exit}
Mocha の [--exit][16] オプションは、データ損失を引き起こす可能性があります。Datadog はテスト終了直後にデータを送信しようとしますが、プロセスが突然終了されると一部のリクエストが失敗する可能性があります。`--exit` は慎重に使用してください。

### Vitest のブラウザモード {#vitests-browser-mode}
Vitest の [ブラウザモード][17] はサポートされていません。

### Vitest のテスト実行時間のオーバーヘッド {#vitests-test-duration-overhead}

デフォルトでは、Vitest の [`isolate`][21] オプションは `true` に設定されているため、各テストファイルは独自のフォークまたはスレッドで実行されます。Vitest は ESM ファーストであり、インスツルメンテーションに [import-in-the-middle][20] を使用するため、スイートが開始されるたびにセットアップコストが発生します。分離により、そのセットアップコストがファイルごとに繰り返し発生します。この影響は、小さく高速なスイートが多数ある場合に最も大きくなります。セットアップ時間が実時間を占有する可能性があるためです。

オーバーヘッドを減らすには、Vitest 構成ファイルで `isolate: false` を設定するか、テストコマンドに `--no-isolate` を渡します。

Vitest の分離を有効にしたままワーカーの起動オーバーヘッドを減らすには、`DD_EXPERIMENTAL_TEST_OPT_VITEST_NO_WORKER_INIT=true` を設定します。このオプションは、`dd-trace` v5 (`5.111.0` 以降) および v6 (`6.0.0` 以降) で使用可能です。これは、Vitest `3.2.6` 以降を使用して分離された Vitest ワーカープール実行に適用されます。サポートされていない構成では、通常のワーカーインスツルメンテーションにフォールバックします。

このモードでは Vitest ワーカー内で `dd-trace` が初期化されないため、以下の機能はサポートされません。

- カスタムテストタグ
- カスタムスパン
- テストコードからのログ相関
- 失敗したテストのリプレイ

## ベストプラクティス {#best-practices}

テストフレームワークと Test Optimization を最大限に活用するには、次のプラクティスに従ってください。

### パラメーター化されたテスト {#parameterized-tests}

可能な限り、テストフレームワークが提供するパラメーター化されたテスト用のツールを活用してください。たとえば、`jest` の場合:

以下は避けてください。
{{< code-block lang="javascript" >}}
[[1,2,3], [3,4,7]].forEach((a,b,expected) => {
  test('sums correctly', () => {
    expect(a+b).toEqual(expected)
  })
})
{{< /code-block >}}

代わりに [`test.each`][18] を使用します。

{{< code-block lang="javascript" >}}
test.each([[1,2,3], [3,4,7]])('sums correctly %i and %i', (a,b,expected) => {
  expect(a+b).toEqual(expected)
})
{{< /code-block >}}

`mocha` には、[`mocha-each`][19] を使用します。

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

このアプローチを使用すると、テストフレームワークと Test Optimization の両方がテストを識別できるようになります。

### テストセッション名 `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

`DD_TEST_SESSION_NAME` を使用して、テストセッションの名前とそれに関連するテストグループを定義します。このタグの値の例は次のとおりです。

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

`DD_TEST_SESSION_NAME` が指定されていない場合のデフォルト値は次のとおりです。

- `dd-trace` v6 の場合、`jest`、`mocha`、`playwright test`、`cucumber-js` などのフレームワーク呼び出し。
- `dd-trace` v5 の場合、CI ジョブ名とテストの実行に使用されるコマンドの組み合わせ (例: `my-ci-job yarn test`)

テストセッション名は、異なるテストグループを識別しやすくするために、リポジトリ内で一意である必要があります。

## 参考文献{#further-reading}

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
[17]: https://vitest.dev/guide/browser/
[18]: https://jestjs.io/docs/api#testeachtablename-fn-timeout
[19]: https://www.npmjs.com/package/mocha-each
[20]: https://github.com/nodejs/import-in-the-middle
[21]: https://vitest.dev/config/isolate
[22]: /ja/tests/flaky_tests/early_flake_detection/
[23]: /ja/tests/flaky_tests/auto_test_retries/
[24]: /ja/tests/flaky_management/#confirm-fixes-for-flaky-tests