---
further_reading:
- link: /continuous_integration/setup_tests/containers/
  tag: ドキュメント
  text: コンテナ内でテスト用に環境変数を転送する
- link: /continuous_integration/explore_tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング CI
kind: documentation
title: JavaScript テスト
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

## 報告方法の構成

Datadog にテスト結果を報告するには、Datadog の JavaScript ライブラリを構成する必要があります。

{{< tabs >}}

{{% tab "オンプレミス CI プロバイダー (Datadog Agent)" %}}

Jenkins や自己管理型の GitLab CI などのオンプレミス CI プロバイダーでテストを実行する場合、[Agent インストール手順][1]に従って各ワーカノードに Datadog Agent をインストールします。これは、テスト結果が自動的に基礎となるホストメトリクスにリンクされるため、推奨されるオプションです。

CI プロバイダーがコンテナベースのエグゼキューターを使用している場合、ビルド内の `localhost` がコンテナ自体を参照しており、Datadog Agent が動作している基礎となるワーカーノードではないため、すべてのビルドで `DD_AGENT_HOST` 環境変数 (デフォルトは `http://localhost:8126`) を、ビルドコンテナの中からアクセスできるエンドポイントに設定します。

Kubernetes のエグゼキューターを使用している場合、Datadog は [Datadog Admission Controller][2] の使用を推奨しており、これは自動的にビルドポッドの環境変数 `DD_AGENT_HOST` を設定してローカルの Datadog Agent と通信させます。


[1]: /ja/agent/
[2]: https://docs.datadoghq.com/ja/agent/cluster_agent/admission_controller/
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
{{% /tab %}}

{{< /tabs >}}

## JavaScript トレーサーのインストール

[JavaScript tracer][4] をインストールするには、次を実行します:

{{< code-block lang="bash" >}}
yarn add --dev dd-trace
{{< /code-block >}}

詳しくは、[JavaScript トレーサーのインストールに関するドキュメント][5]を参照してください。

## テストのインスツルメント

{{< tabs >}}
{{% tab "Jest" %}}

1. `jest.config.js` 内でカスタム [`testEnvironment`][1] を構成するか、普段 `jest` を構成している方法で進めます:

```javascript
module.exports = {
  // ...
  // 別のルートかもしれません。以下のファイルを参照しています。
  testEnvironment: '<rootDir>/testEnvironment.js',
  // ...
}
```

2. `testEnvironment.js` で以下を実行します:

```javascript

// CI ではテストインスツルメンテーションのみ有効にします
if (process.env.DD_ENV === 'ci') {
  require('dd-trace/ci/jest/env')
}
// jest-environment-jsdom もオプションです
module.exports = require('jest-environment-node')
```

### Jest@28

`jest@28` と `jest-environment-node` を使用している場合は、[`jest` のドキュメント][1]に従って環境を更新してください。

```javascript

if (process.env.DD_ENV === 'ci') {
  require('dd-trace/ci/jest/env')
}

module.exports = require('jest-environment-node').default
```

`jest-environment-jsdom` は `jest@28` に含まれていないため、別途インストールする必要があります。また、`jest>=28`は `dd-trace>=2.7.0` からしかサポートされていません。

<div class="alert alert-warning"><strong>注</strong>: <code>jest-environment-node</code>、<code>jest-environment-jsdom</code>、<code>est-jasmine2</code>、<code>jest-circus</code> (Jest 27時点) は <code>jest</code> と一緒にインストールされるため、通常は <code>package.json</code> に表示されません。<code>package.json</code> でこれらのライブラリのいずれかを抽出した場合は、インストールされているバージョンが <code>jest</code> のものと同じであることを確認してください。</div>


`DD_ENV` 環境変数でテストを実行する環境 (たとえば、開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`) を指定して、通常どおりにテストを実行します。例:

```bash
DD_ENV=ci DD_SERVICE=my-javascript-app npm test
```


[1]: https://jestjs.io/docs/en/configuration#testenvironment-string
{{% /tab %}}

{{% tab "Mocha" %}}

たとえば、`package.json` で、`mocha` テストの実行コマンドに `--require dd-trace/ci/init` を追加します。

```json
"scripts": {
  "test": "mocha --require dd-trace/ci/init"
},
```

`DD_ENV` 環境変数でテストを実行する環境 (たとえば、開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`) を指定して、通常どおりにテストを実行します。例:

```bash
DD_ENV=ci DD_SERVICE=my-javascript-app npm test
```

{{% /tab %}}
{{% tab "Cucumber" %}}

`cucumber-js` テストを通常実行している方法に従って `--require-module dd-trace/ci/init` を追加します。たとえば、`package.json` に追加することができます:

{{< code-block lang="json" filename="package.json" >}}
"scripts": {
  "test": "cucumber-js --require-module=dd-trace/ci/init"
},
{{< /code-block >}}

`DD_ENV` 環境変数でテストを実行する環境 (たとえば、開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`) を指定して、通常どおりにテストを実行します。例:

{{< code-block lang="bash" >}}
DD_ENV=ci DD_SERVICE=my-javascript-app npm test
{{< /code-block >}}

{{% /tab %}}

{{% tab "Cypress" %}}

### Cypress<10

以下は、`cypress@10` より古いバージョンを使用している場合の手順です。

1. [`pluginsFile`][1] を、たとえば [`cypress.json`][2] を介して `"dd-trace/ci/cypress/plugin"` に設定します:
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

2. [`supportFile`][3] に次の行を追加します。
{{< code-block lang="javascript" filename="cypress/support/index.js" >}}
// 以前のコードはこの行の前になります
require('dd-trace/ci/cypress/support')
{{< /code-block >}}


`DD_ENV` 環境変数でテストを実行する環境 (たとえば、開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`) を指定して、通常どおりにテストを実行します。例:

{{< code-block lang="bash" >}}
DD_ENV=ci DD_SERVICE=my-ui-app npm test
{{< /code-block >}}

### Cypress >=10

Cypress API ドキュメントを使用して、`cypress>=10` のための[プラグインの書き方を学ぶ][4]ことができます。

`cypress.config.js` ファイルで、以下を設定します。

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents: require('dd-trace/ci/cypress/plugin'),
    supportFile: 'cypress/support/index.js'
  }
})
{{< /code-block >}}

`supportFile` は、`cypress<10` のときと同じように表示されるはずです。

{{< code-block lang="javascript" filename="cypress/support/index.js" >}}
// 前のコードはこの行の前にあります
require('dd-trace/ci/cypress/support')
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


### さらにタグを追加

テストに、チームオーナーなどの情報を追加するには、テストまたはフックで `cy.task('dd:addTags', { yourTags: 'here' })` を使用します。

例:

{{< code-block lang="javascript">}}
beforeEach(() => {
  cy.task('dd:addTags', { 'before.each': 'certain.information' })
})
it('renders a hello world', () => {
  cy.task('dd:addTags', { 'team.owner': 'ui' })
  cy.get('.hello-world')
    .should('have.text', 'Hello World')
})
{{< /code-block >}}


### RUM インテグレーション

テスト対象のブラウザアプリケーションが [RUM][5] を使用してインスツルメントされている場合、Cypress テストの結果と生成された RUM ブラウザセッションおよびセッションリプレイは自動的にリンクされます。詳しくは、[RUM インテグレーション][6]ガイドをご参照ください。


[1]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Plugins-file
[2]: https://docs.cypress.io/guides/references/configuration#cypress-json
[3]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file
[4]: https://docs.cypress.io/api/plugins/writing-a-plugin#Plugins-API
[5]: /ja/real_user_monitoring/browser/#setup
[6]: /ja/continuous_integration/guides/rum_integration/
{{% /tab %}}
{{< /tabs >}}

## コンフィギュレーション設定

以下は、トレーサーで使用できる最も重要なコンフィギュレーション設定のリストです。これらは、その `init()` 関数で渡すか、環境変数として渡すことができます。

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

他のすべての [Datadog トレーサーコンフィギュレーション][6]オプションも使用できます。

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

## Agentless (ベータ版)

Agent を使用せずにテストスイートをインスツルメントするには、以下の環境変数を構成します。

`DD_CIVISIBILITY_AGENTLESS_ENABLED` (必須)
: Agentless モードを有効または無効にします。<br/>
**デフォルト**: `false`

`DD_API_KEY` (必須)
: テスト結果のアップロードに使用される [Datadog API キー][7]。<br/>
**デフォルト**: `(empty)`

さらに、どの [Datadog サイト][6]にデータを送信するかを構成します。あなたの Datadog サイトは {{< region-param key="dd_site" >}} です。

`DD_SITE` (必須)
: 結果をアップロードする [Datadog サイト][8]。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}

## 既知の制限

### ES モジュール
[Mocha >=9.0.0][9] はテストファイルの読み込みに ESM-first アプローチを採用しています。つまり、ES モジュールが使用されている場合 (たとえば、テストファイルの拡張子を `.mjs` にして定義している場合) は_インスツルメンテーションが制限されます_。テストは検出されますが、自分のテストを可視化することはできません。ES モジュールについて詳しくは、[NodeJS に関するドキュメント][10]を参照してください。

### ブラウザテスト
`mocha`、`jest`、`cucumber`、`cypress` で実行されるブラウザテストは `dd-trace-js` によりインスツルメントされますが、ブラウザセッション自体の可視性はデフォルトでは提供されません（ネットワーク呼び出し、ユーザーのアクション、ページロードなど）。

ブラウザ処理の可視性を希望する場合は、[RUM とセッションリプレイ][11]の使用をご検討ください。Cypress を使用していると、テスト結果と生成された RUM ブラウザセッションおよびセッションリプレイは自動的にリンクされます。詳しくは、[RUM インテグレーション][12]ガイドをご参照ください。

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

代わりに [`test.each`][13] を使用:
{{< code-block lang="javascript" >}}
test.each([[1,2,3], [3,4,7]])('sums correctly %i and %i', (a,b,expected) => {
  expect(a+b).toEqual(expected)
})
{{< /code-block >}}

`mocha` の場合は、[`mocha-each`][14] を使用:
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


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/facebook/jest/tree/master/packages/jest-circus
[2]: https://github.com/facebook/jest/tree/master/packages/jest-jasmine2
[3]: https://jestjs.io/docs/configuration#testrunner-string
[4]: https://github.com/DataDog/dd-trace-js
[5]: /ja/tracing/setup_overview/setup/nodejs
[6]: /ja/tracing/setup_overview/setup/nodejs/?tab=containers#configuration
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: /ja/getting_started/site/
[9]: https://github.com/mochajs/mocha/releases/tag/v9.0.0
[10]: https://nodejs.org/api/packages.html#packages_determining_module_system
[11]: /ja/real_user_monitoring/browser/
[12]: /ja/continuous_integration/guides/rum_integration/
[13]: https://jestjs.io/docs/api#testeachtablename-fn-timeout
[14]: https://github.com/ryym/mocha-each