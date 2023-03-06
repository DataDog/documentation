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
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
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
  * [`testRunner`][3] としては、[`jest-circus`][1] と [`jest-jasmine2`][2] のみをサポートしています。
  * Jest >= 28 は `dd-trace>=2.7.0` からしかサポートされません
* Mocha >= 5.2.0
  * Mocha >= 9.0.0 は[部分的なサポート](#known-limitations)があります。
* Cucumber-js >= 7.0.0
* Cypress >= 6.7.0
  * `dd-trace>=1.4.0` 以降
* Playwright >= 1.18.0
* 2.x リリースラインの `dd-trace>=3.13.0` と `dd-trace>=2.26.0` 以降

インスツルメンテーションは実行時に動作するため、TypeScript、Webpack、Babel などのトランスパイラーにすぐに対応できます。

### テストスイートレベルの視覚化互換性
[テストスイートレベルの視覚化][4]は `dd-trace>=3.14.0` および `dd-trace>=2.27.0` から完全にサポートされています。Jest、Mocha、Playwright、Cypress、Cucumber がサポートされました。

* Jest >= 24.8.0
* `dd-trace>=3.10.0` 以降
* [`testRunner`][3] としては、[`jest-circus`][1] のみサポートされます
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

Jenkins や自己管理型の GitLab CI などのオンプレミス CI プロバイダーでテストを実行する場合、[Agent インストール手順][1]に従って各ワーカノードに Datadog Agent をインストールします。これは、テスト結果が自動的に基礎となるホストメトリクスにリンクされるため、推奨されるオプションです。

CI プロバイダーがコンテナベースのエグゼキューターを使用している場合、ビルド内の `localhost` がコンテナ自体を参照しており、Datadog Agent が動作している基礎となるワーカーノードではないため、すべてのビルドで `DD_AGENT_HOST` 環境変数 (デフォルトは `http://localhost:8126`) を、ビルドコンテナの中からアクセスできるエンドポイントに設定します。

Kubernetes のエグゼキューターを使用している場合、Datadog は [Datadog Admission Controller][2] の使用を推奨しており、これは自動的にビルドポッドの環境変数 `DD_AGENT_HOST` を設定してローカルの Datadog Agent と通信させます。


[1]: /ja/agent
[2]: /ja/agent/cluster_agent/admission_controller/
{{% /tab %}}

{{% tab "クラウド CI プロバイダー (Agentless)" %}}

<div class="alert alert-info">Agentless モードは、Datadog JavaScript ライブラリのバージョン >= 2.5.0 で使用できます</div>

GitHub Actions や CircleCI など、基盤となるワーカーノードにアクセスできないクラウド CI プロバイダーを使用している場合は、Agentless モードを使用するようにライブラリを構成します。そのためには、以下の環境変数を設定します。

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (必須)
: Agentless モードを有効または無効にします。<br/>
**デフォルト**: `false`

`DD_API_KEY` (必須)
: テスト結果のアップロードに使用される [Datadog API キー][1]。<br/>
**デフォルト**: `(empty)`

さらに、どの [Datadog サイト][2]にデータを送信するかを構成します。

`DD_SITE` (必須)
: 結果をアップロードする [Datadog サイト][2]。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site/
{{< /tabs >}}

{{< /tabs >}}

## JavaScript トレーサーのインストール

[JavaScript tracer][5] をインストールするには、次を実行します:

```bash
yarn add --dev dd-trace
```

詳しくは、[JavaScript トレーサーのインストールに関するドキュメント][6]を参照してください。


## テストのインスツルメント

{{< tabs >}}
{{% tab "Jest/Mocha" %}}
`NODE_OPTIONS` 環境変数を `-r dd-trace/ci/init` に設定します。環境変数 `DD_ENV` にテストを実行する環境を指定し、通常通りテストを実行してください。例えば、開発者のワークステーションでテストを実行する場合は `DD_ENV` を `local` に設定し、CI プロバイダでテストを実行する場合は `ci` に設定します。

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
```

**重要**: `NODE_OPTIONS` に値を設定する場合、`-r dd-trace/ci/init` を上書きしないように注意してください。これは `${NODE_OPTIONS:-}` 節を使用して行うことができます。

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

[1]: /ja/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
{{% /tab %}}

{{% tab "Playwright" %}}
`NODE_OPTIONS` 環境変数を `-r dd-trace/ci/init` に設定します。環境変数 `DD_ENV` にテストを実行する環境を指定し、通常通りテストを実行してください。例えば、開発者のワークステーションでテストを実行する場合は `DD_ENV` を `local` に設定し、CI プロバイダでテストを実行する場合は `ci` に設定します。

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
```

**重要**: `NODE_OPTIONS` に値を設定する場合、`-r dd-trace/ci/init` を上書きしないように注意してください。これは `${NODE_OPTIONS:-}` 節を使用して行うことができます。

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### テストにカスタムタグを追加する

Playwright では、カスタムタグはサポートされていません。

{{% /tab %}}

{{% tab "Cucumber" %}}
`NODE_OPTIONS` 環境変数を `-r dd-trace/ci/init` に設定します。環境変数 `DD_ENV` にテストを実行する環境を指定し、通常通りテストを実行してください。例えば、開発者のワークステーションでテストを実行する場合は `DD_ENV` を `local` に設定し、CI プロバイダでテストを実行する場合は `ci` に設定します。

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

[1]: /ja/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
{{% /tab %}}

{{% tab "Cypress" %}}

### Cypress >=10

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

次の行を `supportFile` の **トップレベル** に追加します。

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

### Cypress<10

以下は、`cypress@10` より古いバージョンを使用している場合の手順です。

1. [`pluginsFile`][2] を、たとえば [`cypress.json`][3] を介して `"dd-trace/ci/cypress/plugin"` に設定します:
{{< code-block lang="json" filename="cypress.json" >}}
{
  "pluginsFile": "dd-trace/ci/cypress/plugin"
}
{{< /code-block >}}

すでに `pluginsFile` を定義している場合も、以下を使用してインスツルメンテーションを初期化できます:
{{< code-block lang="javascript" filename="cypress/plugins/index.js" >}}
module.exports = (on, config) => {
  // 以前のコードは、この行の前になります
  require('dd-trace/ci/cypress/plugin')(on, config)
}
{{< /code-block >}}

2. 次の行を [`supportFile`][4] の **トップレベル** に追加します。
{{< code-block lang="javascript" filename="cypress/support/index.js" >}}
// この行の前にコードを記述することができます
// require('./commands')
require('dd-trace/ci/cypress/support')
// この行の後にコードを記述することもできます
// Cypress.Commands.add('login', (email, pw) => {})
{{< /code-block >}}


`DD_ENV` 環境変数でテストを実行する環境 (たとえば、開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`) を指定して、通常どおりにテストを実行します。例:

{{< code-block lang="bash" >}}
DD_ENV=ci DD_SERVICE=my-ui-app npm test
{{< /code-block >}}


### テストにカスタムタグを追加する

テストに、チームオーナーなどの情報を追加するには、テストまたはフックで `cy.task('dd:addTags', { yourTags: 'here' })` を使用します。

例:

```javascript
beforeEach(() => {
  cy.task('dd:addTags', {
    'before.each':
    'certain.information'
  })
})
it('renders a hello world', () => {
  cy.task('dd:addTags', {
    'team.owner': 'ui',
    'test.importance': 3
  })
  cy.get('.hello-world')
    .should('have.text', 'Hello World')
})
```

これらのタグに対して、フィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加についての詳細は、Node.js カスタムインスツルメンテーションドキュメントの[タグの追加][5]セクションを参照してください。

### Cypress - RUM インテグレーション

テスト対象のブラウザアプリケーションが [RUM][6] を使用してインスツルメントされている場合、Cypress テストの結果と生成された RUM ブラウザセッションおよびセッションリプレイは自動的にリンクされます。詳しくは、[RUM インテグレーション][7]ガイドをご参照ください。

[1]: https://docs.cypress.io/api/plugins/writing-a-plugin#Plugins-API
[2]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Plugins-file
[3]: https://docs.cypress.io/guides/references/configuration#cypress-json
[4]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file
[5]: /ja/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[6]: /ja/real_user_monitoring/browser/#setup
[7]: /ja/continuous_integration/guides/rum_integration/
{{% /tab %}}

{{< /tabs >}}

### Yarn >=2 を使用する場合

`yarn>=2` と `.pnp.cjs` ファイルを使用していて、`NODE_OPTIONS` を使用したときに次のようなエラーメッセージが表示された場合

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

`NODE_OPTIONS` を以下のように設定することで修正できます。

```bash
NODE_OPTIONS="-r $(pwd)/.pnp.cjs -r dd-trace/ci/init" yarn test
```


## コンフィギュレーション設定

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

他のすべての [Datadog トレーサーコンフィギュレーション][7]オプションも使用できます。

### Git のメタデータを収集する

Datadog は、テスト結果を可視化し、リポジトリ、ブランチ、コミットごとにグループ化するために Git の情報を使用します。Git のメタデータは、CI プロバイダーの環境変数や、プロジェクトパス内のローカルな `.git` フォルダがあれば、そこからテストインスツルメンテーションによって自動的に収集されます。

サポートされていない CI プロバイダーでテストを実行する場合や、`.git` フォルダがない場合は、環境変数を使って Git の情報を手動で設定することができます。これらの環境変数は、自動検出された情報よりも優先されます。Git の情報を提供するために、以下の環境変数を設定します。

`DD_GIT_REPOSITORY_URL`
: コードが格納されているリポジトリの URL。HTTP と SSH の両方の URL に対応しています。<br/>
**例**: `git@github.com:MyCompany/MyApp.git`、`https://github.com/MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: テスト中の Git ブランチ。タグ情報を指定する場合は、空のままにしておきます。<br/>
**例**: `develop`

`DD_GIT_TAG`
: テストされる Git タグ (該当する場合)。ブランチ情報を指定する場合は、空のままにしておきます。<br/>
**例**: `1.0.1`

`DD_GIT_COMMIT_SHA`
: フルコミットハッシュ。<br/>
**例**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: コミットのメッセージ。<br/>
**例**: `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: コミット作成者名。<br/>
**例**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: コミット作成者メールアドレス。<br/>
**例**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: ISO 8601 形式のコミット作成者の日付。<br/>
**例**: `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: コミットのコミッター名。<br/>
**例**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: コミットのコミッターのメールアドレス。<br/>
**例**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: ISO 8601 形式のコミットのコミッターの日付。<br/>
**例**: `2021-03-12T16:00:28Z`

## 既知の制限

### ES モジュール
[Mocha >=9.0.0][8] はテストファイルの読み込みに ESM-first アプローチを採用しています。つまり、ES モジュールが使用されている場合 (たとえば、テストファイルの拡張子を `.mjs` にして定義している場合) は_インスツルメンテーションが制限されます_。テストは検出されますが、自分のテストを可視化することはできません。ES モジュールについて詳しくは、[Node.js に関するドキュメント][9]を参照してください。

### ブラウザテスト
`mocha`、`jest`、`cucumber`、`cypress`、`playwright` で実行されるブラウザテストは `dd-trace-js` によりインスツルメントされますが、ブラウザセッション自体の可視性はデフォルトでは提供されません（ネットワーク呼び出し、ユーザーのアクション、ページロードなど）。

ブラウザ処理の可視性を希望する場合は、[RUM とセッションリプレイ][10]の使用をご検討ください。Cypress を使用していると、テスト結果と生成された RUM ブラウザセッションおよびセッションリプレイは自動的にリンクされます。詳しくは、[RUM インテグレーション][11]ガイドをご参照ください。



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

代わりに [`test.each`][12] を使用:
{{< code-block lang="javascript" >}}
test.each([[1,2,3], [3,4,7]])('sums correctly %i and %i', (a,b,expected) => {
  expect(a+b).toEqual(expected)
})
{{< /code-block >}}

`mocha` の場合は、[`mocha-each`][13] を使用:
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

## 収集した情報

CI Visibility を有効にすると、プロジェクトから以下のデータが収集されます。

* テストの名前と時間。
* CI プロバイダーが設定する事前定義された環境変数。
* Git のコミット履歴。ハッシュ、メッセージ、作成者情報、変更されたファイル (ファイルの内容は含まず) が含まれます。
* CODEOWNERS ファイルからの情報。

さらに、[Intelligent Test Runner][14] を有効にすると、プロジェクトから以下のデータが収集されます。

* 各テストでカバーされるファイル名と行数を含むコードカバレッジ情報。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/facebook/jest/tree/main/packages/jest-circus
[2]: https://github.com/facebook/jest/tree/main/packages/jest-jasmine2
[3]: https://jestjs.io/docs/configuration#testrunner-string
[4]: /ja/continuous_integration/tests/#test-suite-level-visibility
[5]: https://github.com/DataDog/dd-trace-js
[6]: /ja/tracing/trace_collection/dd_libraries/nodejs
[7]: /ja/tracing/trace_collection/library_config/nodejs/?tab=containers#configuration
[8]: https://github.com/mochajs/mocha/releases/tag/v9.0.0
[9]: https://nodejs.org/api/packages.html#packages_determining_module_system
[10]: /ja/real_user_monitoring/browser/
[11]: /ja/continuous_integration/guides/rum_integration/
[12]: https://jestjs.io/docs/api#testeachtablename-fn-timeout
[13]: https://www.npmjs.com/package/mocha-each
[14]: /ja/continuous_integration/intelligent_test_runner/