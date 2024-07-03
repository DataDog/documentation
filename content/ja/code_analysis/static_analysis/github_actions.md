---
aliases:
- /ja/continuous_integration/static_analysis/github_actions
- /ja/static_analysis/github_actions
dependencies:
- https://github.com/DataDog/datadog-static-analyzer-github-action/blob/main/README.md
description: Use Datadog and GitHub to run Static Analysis jobs in a CI pipeline.
title: Static Analysis and GitHub Actions
---
## 概要

Run a [Datadog Static Analysis][1] job in your GitHub Action workflows. 

## セットアップ

Datadog Static Analysis を使用するには、リポジトリのルートディレクトリに `static-analysis.datadog.yml` ファイルを追加して、使用するルールセットを指定する必要があります。

```yaml
rulesets:
  - <ruleset-name>
  - <ruleset-name>
```

### Python の例

Python ベースのリポジトリの例を見ることができます。

```yaml
rulesets:
  - python-code-style
  - python-best-practices
  - python-inclusive
```

## ワークフロー

Datadog Static Analysis ジョブを実行するためのファイルを `.github/workflows` に作成します。

以下はワークフローファイルのサンプルです。

```yaml
on: [push]

jobs:
  check-quality:
    runs-on: ubuntu-latest
    name: Datadog Static Analyzer
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Check code meets quality standards
        id: datadog-static-analysis
        uses: DataDog/datadog-static-analyzer-github-action@v1
        with:
          dd_app_key: ${{ secrets.DD_APP_KEY }}
          dd_api_key: ${{ secrets.DD_API_KEY }}
          dd_service: "my-service"
          dd_env: "ci"
          dd_site: {{< region-param key="dd_site" code="true" >}}
          cpu_count: 2
          enable_performance_statistics: false
```

You **must** set your Datadog API and application keys as [secrets in your GitHub repository][4] whether at the organization or repository level. For more information, see [API and Application Keys][2].

## 入力

Static Analysis に以下のパラメーターを設定することができます。

**Note:** Diff-aware scanning only scans the files modified by a commit when analyzing feature branches. Diff-aware is enabled by default. To disable diff-aware scanning, set the GitHub action `diff_aware` parameter to `false`.

| 名前         | 説明                                                                                                                | 必須 | デフォルト         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `dd_api_key` | Your Datadog API key. This key is created by your [Datadog organization][2] and should be stored as a [secret][2].         | はい     |                 |
| `dd_app_key` | Your Datadog application key. This key is created by your [Datadog organization][2] and should be stored as a [secret][4]. | はい     |                 |
| `dd_service` | 結果をタグ付けしたいサービス。                                                                             | はい     |                 |
| `dd_env`     | 結果をタグ付けしたい環境。Datadog は、この入力値として `ci` を使用することを推奨します。              | いいえ      | `none`          |
| `dd_site`    | 情報を送信する [Datadog サイト][3]。                                                                              | いいえ      | `datadoghq.com` |
| `cpu_count`  | アナライザーが使用する CPU の数を設定します。                                                                            | いいえ      | `2`             |
| `enable_performance_statistics` | 分析されたファイルの実行時間統計を取得します。                                                   | いいえ      | `false`         |
| `debug`      | Lets the analyzer print additional logs useful for debugging. To enable, set to `yes`.                                     | いいえ      | `no`            |
| `subdirectory` | A subdirectory pattern or glob (or space-delimited subdirectory patterns) that the analysis should be limited to. For example: "src" or "src packages". | `false` | |
| `architecture` | The CPU architecture to use for the analyzer. Supported values are `x86_64` and `aarch64`.                               | いいえ      | `x86_64`        |
| `diff_aware` | Enable [diff-aware scanning mode][5].                                                                                      | いいえ      | `true`          |

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Learn about Code Analysis][1]

[1]: https://docs.datadoghq.com/ja/code_analysis/static_analysis
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[3]: https://docs.datadoghq.com/ja/getting_started/site/
[4]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[5]: https://github.com/DataDog/datadog-static-analyzer/blob/main/README.md#diff-aware-scanning