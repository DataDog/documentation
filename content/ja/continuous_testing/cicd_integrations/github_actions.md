---
aliases:
- /ja/synthetics/cicd_integrations/github_actions
dependencies:
- https://github.com/DataDog/synthetics-ci-github-action/blob/main/README.md
title: Continuous Testing and CI GitHub Actions
---
## 概要

![GitHub Release](https://img.shields.io/github/v/release/DataDog/synthetics-ci-github-action)

[Datadog CI Synthetics コマンド][1]を使って、GitHub のワークフローから Synthetic テストをトリガーすることができます。

## セットアップ

始めるには

1. Datadog API キーとアプリケーションキーを GitHub リポジトリにシークレットとして追加します。詳しくは、[API とアプリケーションキー][2]を参照してください。
2. GitHub のワークフローで、`DataDog/synthetics-ci-github-action` を使用します。

ワークフローは、[シンプル](#simple-workflows)または[複雑](#complex-workflows)にすることができます。

## シンプルなワークフロー

### 公開 ID を使用したワークフロー例

```yaml
name: Run Synthetic tests using the test public IDs
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v1.6.1
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          public_ids: 'abc-d3f-ghi, jkl-mn0-pqr'
```

### 既存の `synthetics.json` ファイルを使用したワークフロー例

```yaml
name: Run Synthetic tests using an existing synthetics.json file
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v1.6.1
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
```

テストファイルの例としては、この [`test.synthetics.json` ファイル][12]を参照してください。

**注**: デフォルトでは、このワークフローは `{,!(node_modules)/**/}*.synthetics.json` ファイルにリストされたすべてのテストを実行します (`node_modules` フォルダ内のものを除き、`.synthetics.json` で終わるすべてのファイルです)。また、`public_id` を指定するか、検索クエリを使って Synthetic テストのリストをトリガーすることができます。

## 複雑なワークフロー

### `test_search_query` を使用したワークフロー例

```yaml
name: Run Synthetic tests by test tag
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v1.6.1
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          test_search_query: 'tag:e2e-tests'
```

### テスト検索クエリと変数のオーバーライドを使用したワークフロー例

```yaml
name: Run Synthetic tests using search query
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v1.6.1
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          test_search_query: 'tag:staging'
          variables: 'START_URL=https://staging.website.com,PASSWORD=stagingpassword'
```

### Example workflow using a global configuration file with `config_path`

By default, the path to the global configuration file is `datadog-ci.json`. You can override this path with the `config_path` input.

```yaml
name: Run Synthetic tests with custom config
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v1.6.1
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          config_path: './global.config.json'
```

For an example of a global configuration file, see this [`global.config.json` file][13].

## 入力

| 名前                      | タイプ    | 要件 | 説明                                                                                                                                                                                                                                  |
| ------------------------- | ------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_key`                 | 文字列  | _必須_  | Datadog API キー。このキーは [Datadog 組織][2]によって作成され、[シークレット][3]として保存する必要があります。**デフォルト:** なし。                                                                                                        |
| `app_key`                 | 文字列  | _必須_  | Datadog アプリケーションキー。このキーは [Datadog 組織][2]によって作成され、[シークレット][3]として保存する必要があります。**デフォルト:** なし。                                                                                                |
| `public_ids`              | 文字列  | _オプション_  | トリガーしたい Synthetic テストの公開 ID をカンマで区切ったリスト。値を指定しない場合は、`synthetics.json` という名前のファイルを検索します。**デフォルト:** なし。                                                             |
| `test_search_query`       | 文字列  | _オプション_  | [検索クエリ][5]に対応するトリガーテスト。**デフォルト:** なし。                                                                                                                                                                       |
| `subdomain`               | 文字列  | _オプション_  | Datadog アプリケーションにアクセスするために設定されたカスタムサブドメインの名前。Datadog にアクセスするための URL が `myorg.datadoghq.com` である場合、サブドメインの値は `myorg` に設定する必要があります。**デフォルト:** `app`。                                     |
| `files`                   | 文字列  | _オプション_  | Synthetic テストのコンフィギュレーションファイルを検出するための Glob パターン。**デフォルト:** `{,!(node_modules)/**/}*.synthetics.json`。                                                                                                                           |
| `datadog_site`            | 文字列  | _オプション_  | データ送信先の [Datadog サイト][11]。**デフォルト:** `datadoghq.com`。                                                                                                                                                                        |
| `config_path`             | 文字列  | _オプション_  | テストを起動するときに使用される[グローバル JSON 構成][4]。詳細は[コンフィギュレーションファイル例][13]を参照してください。**デフォルト:** `datadog-ci.json`。                                                                               |
| `variables`               | 文字列  | _オプション_  | Synthetic テストに使用するグローバル変数をカンマで区切ったリスト。例: `START_URL=https://example.org,MY_VARIABLE=My title`。**デフォルト:** `[]`。                                                                                   |
| `junit_report`            | 文字列  | _オプション_  | JUnit レポートを生成したい場合のファイル名。**デフォルト:** なし。                                                                                                                                                              |
| `tunnel`                  | ブール値 | _オプション_  | [Continuous Testing Tunnel][9] を使用して、テストバッチを実行します。**デフォルト:** `false`。                                                                                                                                                     |
| `polling_timeout`         | 数値  | _オプション_  | アクションがテスト結果のポーリングを停止するまでの時間 (ミリ秒単位)。CI レベルでは、この時間以降に完了したテスト結果は失敗とみなされます。**デフォルト:** 30 分。                                            |
| `fail_on_critical_errors` | ブール値 | _オプション_  | テストがトリガーされなかったり、Datadog から結果を取得できなかったりした場合に、CI ジョブを失敗させます。**デフォルト:** `false`                                                                                                                              |
| `fail_on_missing_tests`   | ブール値 | _オプション_  | パブリック ID (`public_ids` を使用するか、[テストファイル][12]にリストされている) を持つ指定されたテストが少なくとも 1 つ実行中に見つからない場合 (例えば、プログラム上または Datadog サイトで削除された場合)、CI ジョブを失敗させます。**デフォルト:** `false` |
| `fail_on_timeout`         | ブール値 | _オプション_  | 少なくとも 1 つのテストがデフォルトのテストタイムアウトを超えた場合、CI ジョブを失敗させます。**デフォルト:** `true`                                                                                                                                                  |

## 寄稿

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## 参考資料

お役に立つドキュメント、リンクや記事:

- [Continuous Testing と CI/CD の構成][6]
- [Datadog を使った継続的テストのベストプラクティス][10]

[1]: https://github.com/DataDog/datadog-ci
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[3]: https://docs.github.com/en/actions/reference/encrypted-secrets
[4]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration/?tab=npm#setup-the-client
[5]: https://docs.datadoghq.com/ja/synthetics/search/#search
[6]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration
[7]: https://semver.org/#summary
[8]: https://github.com/DataDog/synthetics-ci-github-action/tags
[9]: https://docs.datadoghq.com/ja/continuous_testing/testing_tunnel/
[10]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[11]: https://docs.datadoghq.com/ja/getting_started/site
[12]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[13]: https://github.com/DataDog/datadog-ci/blob/master/.github/workflows/e2e/global.config.json