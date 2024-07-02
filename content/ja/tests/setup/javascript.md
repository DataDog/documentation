---
title: JavaScript and TypeScript Tests
code_lang: javascript
type: multi-code-lang
code_lang_weight: 20
aliases:
  - /continuous_integration/setup_tests/javascript
  - /continuous_integration/tests/javascript
  - /continuous_integration/tests/setup/javascript
further_reading:
    - link: /continuous_integration/tests/containers/
      tag: Documentation
      text: Forwarding Environment Variables for Tests in Containers
    - link: /continuous_integration/tests
      tag: Documentation
      text: Explore Test Results and Performance
    - link: /continuous_integration/intelligent_test_runner/javascript
      tag: Documentation
      text: Speed up your test jobs with Intelligent Test Runner
    - link: /continuous_integration/troubleshooting/
      tag: Documentation
      text: Troubleshooting CI Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-info">
  If your CI provider is Jenkins, you can use <a href="/continuous_integration/pipelines/jenkins/#enable-with-the-jenkins-configuration-ui-1">UI-based configuration</a> to enable Test Visibility for your jobs and pipelines.
</div>

## 互換性

サポートされているテストフレームワーク:

| Test Framework | バージョン | 注 |
|---|---|---|
| Jest | >= 24.8.0 | Only `jsdom` (in the `jest-environment-jsdom` package) and `node` (in the `jest-environment-node` package) are supported as test environments. Custom environments like `@jest-runner/electron/environment` in `jest-electron-runner` are not supported.<br><br>Only [`jest-circus`][1] is supported as [`testRunner`][2].<br><br>[`test.concurrent`](#jests-testconcurrent) is not supported. |
| Mocha | >= 5.2.0 | Mocha 9.0.0 以降は[一部サポートされています](#known-limitations)。 |
| Cucumber | >= 7.0.0 |
| Cypress | >= 6.7.0 |
| Playwright | >= 1.18.0 |

The instrumentation works at runtime, so any transpilers such as TypeScript, Webpack, or Babel are supported out-of-the-box.

## 報告方法の構成

To report test results to Datadog, you need to configure the Datadog JavaScript library:

{{< tabs >}}
{{% tab "クラウド CI プロバイダー (エージェントレス)" %}}

<div class="alert alert-info">Agentless mode is available in Datadog JavaScript library versions >= 2.5.0</div>

{{% ci-agentless %}}

{{% /tab %}}
{{% tab "On-Premises CI Provider (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}
{{< /tabs >}}

## JavaScript トレーサーのインストール

To install the [JavaScript Tracer][3], run:

```bash
yarn add --dev dd-trace
```

For more information, see the [JavaScript Tracer installation documentation][4].

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


### Adding custom measures to tests

Just like tags, you can add custom measures to your tests by using the current active span:

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('memory_allocations', 16)
    // test continues normally
    // ...
  })
```

For more information about custom measures, see the [Add Custom Measures Guide][2].

[1]: /tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /tests/guides/add_custom_measures/?tab=javascripttypescript
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

You can add custom tags to your tests by using the [custom annotations API from Playwright][1]:

```javascript
test('user profile', async ({ page }) => {
  test.info().annotations.push({
    type: 'DD_TAGS[test.memory.usage]', // DD_TAGS is mandatory and case sensitive
    description: 'low',
  });
  test.info().annotations.push({
    type: 'DD_TAGS[test.task.id]',
    description: '41123',
  });
  // ...
});

test('landing page', async ({ page }) => {
  test.info().annotations.push({
    type: 'DD_TAGS[test.cpu.usage]',
    description: 'high',
  });
  // ...
});
```

The format of the annotations is the following, where `$TAG_NAME` and `$TAG_VALUE` are *strings* representing tag name and value respectively:

```json
{
  "type": "DD_TAGS[$TAG_NAME]",
  "description": "$TAG_VALUE"
}
```

### Adding custom measures to tests

Custom measures also use custom annotations:

```javascript
test('user profile', async ({ page }) => {
  test.info().annotations.push({
    type: 'DD_TAGS[test.memory.allocations]', // DD_TAGS is mandatory and case sensitive
    description: 16, // this is a number
  });
});
```

The format of the annotations is the following, where `$TAG_NAME` is a *string* representing the tag name and `$TAG_VALUE` is a *number* representing the tag value:

```json
{
  "type": "DD_TAGS[$TAG_NAME]",
  "description": $TAG_VALUE
}
```
**Note**: `description` values in annotations are [typed as strings][2]. Numbers also work, but you may need to disable the typing error with `// @ts-expect-error`.

<div class="alert alert-warning">
  <strong>Important</strong>: The <code>DD_TAGS</code> prefix is mandatory and case sensitive.
</div>

[1]: https://playwright.dev/docs/test-annotations#custom-annotations
[2]: https://playwright.dev/docs/api/class-testinfo#test-info-annotations
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


### Adding custom measures to tests

You may also add custom measures to your test by grabbing the current active span:

```javascript
  When('the function is called', function () {
    const stepSpan = require('dd-trace').scope().active()
    testSpan.setTag('memory_allocations', 16)
    // テストは正常に続きます
    // ...
  })
```

For more information about custom measures, see the [Add Custom Measures Guide][2].

[1]: /tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /tests/guides/add_custom_measures/?tab=javascripttypescript
{{% /tab %}}

{{% tab "Cypress" %}}

### Cypress バージョン 10 以降

Use the Cypress API documentation to [learn how to use plugins][1] for `cypress>=10`.

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

#### Cypress `after:run` イベント
Datadog requires the [`after:run`][2] Cypress event to work, and Cypress does not allow multiple handlers for that event. If you defined handlers for `after:run` already, add the Datadog handler manually by importing `'dd-trace/ci/cypress/after-run'`:

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

#### Cypress `after:spec` event
Datadog requires the [`after:spec`][3] Cypress event to work, and Cypress does not allow multiple handlers for that event. If you defined handlers for `after:spec` already, add the Datadog handler manually by importing `'dd-trace/ci/cypress/after-spec'`:

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

### バージョン 10 以前の Cypress

These are the instructions if you're using a version older than `cypress@10`. See the [Cypress documentation][4] for more information about migrating to a newer version.

1. Set [`pluginsFile`][5] to `"dd-trace/ci/cypress/plugin"`, for example, through [`cypress.json`][6]:
{{< code-block lang="json" filename="cypress.json" >}}
{
  "pluginsFile": "dd-trace/ci/cypress/plugin"
}
{{< /code-block >}}

If you already defined a `pluginsFile`, initialize the instrumentation with:
{{< code-block lang="javascript" filename="cypress/plugins/index.js" >}}
module.exports = (on, config) => {
  // your previous code is before this line
  require('dd-trace/ci/cypress/plugin')(on, config)
}
{{< /code-block >}}

2. Add the following line to the **top level** of your [`supportFile`][7]:
{{< code-block lang="javascript" filename="cypress/support/index.js" >}}
// この行の前にコードを記述することができます
// require('./commands')
require('dd-trace/ci/cypress/support')
// この行の後にコードを記述することもできます
// Cypress.Commands.add('login', (email, pw) => {})
{{< /code-block >}}

#### Cypress `after:run` イベント
Datadog requires the [`after:run`][2] Cypress event to work, and Cypress does not allow multiple handlers for that event. If you defined handlers for `after:run` already, add the Datadog handler manually by importing `'dd-trace/ci/cypress/after-run'`:

{{< code-block lang="javascript" filename="cypress/plugins/index.js" >}}
module.exports = (on, config) => {
  // your previous code is before this line
  require('dd-trace/ci/cypress/plugin')(on, config)
  on('after:run', (details) => {
    // other 'after:run' handlers
    // important that this function call is returned
    return require('dd-trace/ci/cypress/after-run')(details)
  })
}
{{< /code-block >}}

#### Cypress `after:spec` event
Datadog requires the [`after:spec`][3] Cypress event to work, and Cypress does not allow multiple handlers for that event. If you defined handlers for `after:spec` already, add the Datadog handler manually by importing `'dd-trace/ci/cypress/after-spec'`:

{{< code-block lang="javascript" filename="cypress/plugins/index.js" >}}
module.exports = (on, config) => {
  // your previous code is before this line
  require('dd-trace/ci/cypress/plugin')(on, config)
  on('after:spec', (...args) => {
    // other 'after:spec' handlers
    // Important that this function call is returned
    // Important that all the arguments are passed
    return require('dd-trace/ci/cypress/after-run')(...args)
  })
}
{{< /code-block >}}


`DD_ENV` 環境変数でテストを実行する環境 (たとえば、開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`) を指定して、通常どおりにテストを実行します。例:

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-ui-app npm test
{{< /code-block >}}


### テストにカスタムタグを追加する

To add additional information to your tests, such as the team owner, use `cy.task('dd:addTags', { yourTags: 'here' })` in your test or hooks.

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

To create filters or `group by` fields for these tags, you must first create facets. For more information about adding tags, see the [Adding Tags][8] section of the Node.js custom instrumentation documentation.

### Adding custom measures to tests

To add custom measures to your tests, such as memory allocations, use `cy.task('dd:addTags', { yourNumericalTags: 1 })` in your test or hooks.

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

For more information about custom measures, see the [Add Custom Measures Guide][9].

### Cypress - RUM インテグレーション

If the browser application being tested is instrumented using [Browser Monitoring][10], the Cypress test results and their generated RUM browser sessions and session replays are automatically linked. For more information, see the [Instrumenting your browser tests with RUM guide][11].


[1]: https://docs.cypress.io/guides/tooling/plugins-guide#Using-a-plugin
[2]: https://docs.cypress.io/api/plugins/after-run-api
[3]: https://docs.cypress.io/api/plugins/after-spec-api
[4]: https://docs.cypress.io/guides/references/migration-guide#Migrating-to-Cypress-100
[5]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Plugins-file
[6]: https://docs.cypress.io/guides/references/configuration#cypress-json
[7]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file
[8]: /tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[9]: /tests/guides/add_custom_measures/?tab=javascripttypescript
[10]: /real_user_monitoring/browser/setup
[11]: /continuous_integration/guides/rum_integration/
{{% /tab %}}

{{< /tabs >}}

### How to fix "Cannot find module 'dd-trace/ci/init'" errors

When using `dd-trace`, you might encounter the following error message:

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

This might be because of an incorrect usage of `NODE_OPTIONS`.

For example, if your GitHub Action looks like this:
```yml
jobs:
  my-job:
    name: Run tests
    runs-on: ubuntu-latest
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

**Note:** This does not work because `NODE_OPTIONS` are interpreted by every node process, including `npm install`. If you try to import `dd-trace/ci/init` before it's installed, this step fails.

Your GitHub Action should instead look like this:
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

Follow these best practices:

* Make sure the `NODE_OPTIONS` environment variable is only set to the process running tests.
* Specifically avoid defining `NODE_OPTIONS` in the global environment variables settings in your pipeline or job definition.


#### Yarn 2 以降の使用

If you're using `yarn>=2` and a `.pnp.cjs` file, you might also get the same error:

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

`NODE_OPTIONS` を以下のように設定することで修正できます。

```bash
NODE_OPTIONS="-r $(pwd)/.pnp.cjs -r dd-trace/ci/init" yarn test
```

## コードカバレッジを報告する

When tests are instrumented with [Istanbul][5], the Datadog Tracer (v3.20.0 or later) reports it under the `test.code_coverage.lines_pct` tag for your test sessions.

テストセッションの **Coverage** タブで、テストカバレッジの推移を見ることができます。

For more information, see [Code Coverage][6].

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

For more information about `service` and `env` reserved tags, see [Unified Service Tagging][7]. All other [Datadog Tracer configuration][8] options can also be used.

## Git のメタデータを収集する

{{% ci-git-metadata %}}

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

Grab this channel by its ID `dd-trace:ci:manual:test:addTags` to publish that a test needs custom tags. This can be done within the test function:

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

The payload to be published is a dictionary `<string, string|number>` of tags or measures that are added to the test.


### テストを実行する

テスト開始チャンネルと終了チャンネルをコードに入れたら、以下の環境変数を含めて、いつものようにテストフレームワークを実行します。

```shell
NODE_OPTIONS="-r dd-trace/ci/init" DD_CIVISIBILITY_MANUAL_API_ENABLED=1 DD_ENV=ci DD_SERVICE=my-custom-framework-tests yarn run-my-test-framework
```



## 既知の制限

### ES モジュール
[Mocha >=9.0.0][9] はテストファイルの読み込みに ESM-first アプローチを採用しています。つまり、[ES モジュール][10]が使用されている場合 (たとえば、テストファイルの拡張子を `.mjs` にして定義している場合) は_インスツルメンテーションが制限されます_。テストは検出されますが、自分のテストを視覚化することはできません。ES モジュールについて詳しくは、[Node.js に関するドキュメント][10]を参照してください。

### ブラウザテスト
`mocha`、`jest`、`cucumber`、`cypress`、`playwright` で実行されるブラウザテストは `dd-trace-js` によりインスツルメントされますが、ブラウザセッション自体の可視性はデフォルトでは提供されません (ネットワーク呼び出し、ユーザーのアクション、ページロードなど)。

ブラウザ処理の可視性を希望する場合は、[RUM とセッションリプレイ][11]の使用をご検討ください。Cypress を使用していると、テスト結果と生成された RUM ブラウザセッションおよびセッションリプレイは自動的にリンクされます。詳細については、[RUM によるブラウザテストのインスツルメントのガイド][12]を参照してください。

### Cypress インタラクティブモード

Cypress インタラクティブモード (`cypress open` を実行することで入ることができる) は、[`before:run`][13] など一部の cypress イベントが発生しないため、CI Visibility ではサポートされていません。もし試してみたい場合は、[cypress コンフィグレーションファイル][14]に `experimentalInteractiveRunEvents: true` を渡してください。

### Jest の `test.concurrent`
Jest's [test.concurrent][15] is not supported.

### Jest's `--forceExit`
Jest's [--forceExit][16] option may cause data loss. Datadog tries to send data immediately after your tests finish, but shutting down the process abruptly can cause some requests to fail. Use `--forceExit` with caution.

### Mocha's `--exit`
Mocha's [--exit][17] option may cause data loss. Datadog tries to send data immediately after your tests finish, but shutting down the process abruptly can cause some requests to fail. Use `--exit` with caution.

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

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/facebook/jest/tree/main/packages/jest-circus
[2]: https://jestjs.io/docs/configuration#testrunner-string
[3]: /tracing/trace_collection/dd_libraries/nodejs
[4]: https://github.com/DataDog/dd-trace-js#version-release-lines-and-maintenance
[5]: https://istanbul.js.org/
[6]: /tests/code_coverage/?tab=javascripttypescript
[7]: /getting_started/tagging/unified_service_tagging
[8]: /tracing/trace_collection/library_config/nodejs/?tab=containers#configuration
[9]: https://github.com/mochajs/mocha/releases/tag/v9.0.0
[10]: https://nodejs.org/api/packages.html#packages_determining_module_system
[11]: /real_user_monitoring/browser/
[12]: /continuous_integration/guides/rum_integration/
[13]: https://docs.cypress.io/api/plugins/before-run-api
[14]: https://docs.cypress.io/guides/references/configuration#Configuration-File
[15]: https://jestjs.io/docs/api#testconcurrentname-fn-timeout
[16]: https://jestjs.io/docs/cli#--forceexit
[17]: https://mochajs.org/#-exit
[18]: https://jestjs.io/docs/api#testeachtablename-fn-timeout
[19]: https://www.npmjs.com/package/mocha-each
