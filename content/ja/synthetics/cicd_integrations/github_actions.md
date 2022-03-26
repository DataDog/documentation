---
dependencies:
  - https://github.com/DataDog/synthetics-ci-github-action/blob/main/README.md
kind: documentation
title: Synthetics と CI GitHub アクション
---
## 概要

[Datadog CI Synthetics コマンド][1]を使って、GitHub のワークフローから Synthetic テストをトリガーすることができます。

## セットアップ

始めるには

1. Datadog API キーとアプリケーションキーを GitHub リポジトリにシークレットとして追加します。詳しくは、[API とアプリケーションキー][2]を参照してください。
2. GitHub のワークフローで、`DataDog/synthetics-ci-github-action` を使用します。

ワークフローは、[シンプル](#simple-workflows)または[複雑](#complex-workflows)にすることができます。

## シンプルなワークフロー

### 公開 ID を使用したワークフロー例

```yaml
name: Run Synthetics tests using the test public IDs
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Run Datadog Synthetics tests
        uses: DataDog/synthetics-ci-github-action@v0.2.2
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          public_ids: 'abc-d3f-ghi, jkl-mn0-pqr'
```

### 既存の `synthetics.json` ファイルを使用したワークフロー例

```yaml
name: Run Synthetics tests using an existing synthetics.json file
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Run Datadog Synthetics tests
        uses: DataDog/synthetics-ci-github-action@v0.2.2
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
```

**注**: デフォルトでは、このワークフローは `{,!(node_modules)/**/}*.synthetics.json` ファイルにリストされたすべてのテストを実行します (`node_modules` フォルダ内のものを除き、`.synthetics.json` で終わるすべてのファイルです)。また、`public_id` を指定するか、検索クエリを使って Synthetics テストのリストをトリガーすることができます。

## 複雑なワークフロー

### `test_search_query` を使用したワークフロー例

```yaml
name: Run Synthetics tests by test tag
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Run Datadog Synthetics tests
        uses: DataDog/synthetics-ci-github-action@v0.2.2
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          test_search_query: 'tag:e2e-tests'
```

### `config_path` によるグローバル構成オーバーライドを使用したワークフロー例

```yaml
name: Run Synthetics tests with custom config
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Run Datadog Synthetics tests
        uses: DataDog/synthetics-ci-github-action@v0.2.2
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          config_path: './synthetics-config.json'
```

## 入力

| 名前                | タイプ   | 要件 | 説明                                                                                                                                                                                              |
| ------------------- | ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_key`           | 文字列 | _必須_  | Datadog API キー。このキーは [Datadog 組織][2]によって作成され、[シークレット][3]として保存する必要があります。**デフォルト:** なし。                                                                    |
| `app_key`           | 文字列 | _必須_  | Datadog アプリケーションキー。このキーは [Datadog 組織][2]によって作成され、[シークレット][3]として保存する必要があります。**デフォルト:** なし。                                                            |
| `public_ids`        | 文字列 | _オプション_  | トリガーしたい Synthetic テストの公開IDをカンマで区切った文字列。値を指定しない場合は、`synthetics.json` という名前のファイルを検索します。**デフォルト:** なし。                   |
| `test_search_query` | 文字列 | _オプション_  | [検索][5]クエリに対応するトリガーテスト。**デフォルト:** なし。                                                                                                                                   |
| `subdomain`         | 文字列 | _オプション_  | Datadog アプリケーションにアクセスするために設定されたカスタムサブドメインの名前。Datadog にアクセスするための URL が `myorg.datadoghq.com` である場合、サブドメインの値は `myorg` に設定する必要があります。**デフォルト:** `app`。 |
| `files`             | 文字列 | _オプション_  | Synthetic テストの構成ファイルを検出するための Glob パターン。**デフォルト:** `{,!(node_modules)/**/}*.synthetics.json`。                                                                                             |
| `datadog_site`      | 文字列 | _オプション_  | Datadog のサイト。EU のユーザーは `datadoghq.eu` に設定します。例: `datadoghq.com` または `datadoghq.eu`。**デフォルト:** `datadoghq.com`。                                                              |
| `config_path`       | 文字列 | _オプション_  | グローバル JSON 構成は、テストを起動するときに使用されます。詳細は[構成例][4]を参照してください。**デフォルト:** `datadog-ci.json`。                                                         |

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [CI/CD インテグレーションコンフィギュレーション][6]

[1]: https://github.com/DataDog/datadog-ci
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[3]: https://docs.github.com/en/actions/reference/encrypted-secrets
[4]: https://docs.datadoghq.com/ja/synthetics/cicd_integrations/configuration/?tab=npm#setup-a-client
[5]: https://docs.datadoghq.com/ja/synthetics/search/#search
[6]: https://docs.datadoghq.com/ja/synthetics/cicd_integrations/configuration

## 開発

```bash

yarn jest

# プロジェクト構築
yarn build

# プロジェクトとその依存関係をリリース用にコンパイルする
yarn package
```

### プロセスのリリース

新しいバージョンの `synthetics-ci-github-action` のリリースは、以下のように行われます。

1. バージョンアップのための新しいブランチを作成します。
2. パッケージのバージョンを更新するには、導入された変更の性質に応じて `yarn version [--patch|--minor|--major]` を使用します。
   どちらをインクリメントするかは、[Semantic Versioning](https://semver.org/#summary) を参照するとよいでしょう。
   リリース前にプロジェクトを再構築してパッケージ化し、`README.md` のサンプルバージョンを更新します。
3. ブランチをリリースタグ (`git push --tags`) と一緒に上流 (Github) にプッシュします。
   説明で詳しく紹介した変更内容で Pull Request を作成し、少なくとも 1 つの承認を得てください。
4. Pull Request をマージします。
5. [タグページ](https://github.com/DataDog/synthetics-ci-github-action/tags)から Github Release を作成し、導入した変更点を記述します。

   ⚠️ リリースバージョンが期待される形式 `vX.X.X` に従っていることを確認します。

リリースが作成されると、新しいバージョンの Github Action がワークフローとして利用できるようになります。