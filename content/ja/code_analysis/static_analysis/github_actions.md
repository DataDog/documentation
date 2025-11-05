---
aliases:
- /ja/continuous_integration/static_analysis/github_actions
- /ja/static_analysis/github_actions
dependencies:
- https://github.com/DataDog/datadog-static-analyzer-github-action/blob/main/README.md
description: Datadog と GitHub を使用して、CI パイプラインで Static Analysis ジョブを実行します。
title: Static Analysis と GitHub Actions
---
## 概要

GitHub Action ワークフローで [Datadog Static Analysis][1] ジョブを実行します。このアクションは [Datadog Static Analyzer][8] をラップし、コード ベースに対して実行した後、その結果を Datadog にアップロードします。

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
          dd_site: "datadoghq.com"
          cpu_count: 2
          enable_performance_statistics: false
```

組織レベルでもリポジトリ レベルでも、Datadog API キーとアプリケーション キーを [GitHub リポジトリの secrets][4] として設定 **する必要があります**。Datadog アプリケーション キーには `code_analysis_read` スコープを追加してください。詳細は [API と アプリケーション キー][2] を参照してください。

`dd_site` を、使用している Datadog サイトに置き換えてください[3]。

## 入力

Static Analysis に以下のパラメーターを設定することができます。

| 名前         | 説明                                                                                                                                             | 必須 | デフォルト         |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `dd_api_key` | Datadog API キーです。このキーは [Datadog 組織][2] によって作成され、[シークレット][2] として保存する必要があります。                                      | はい     |                 |
| `dd_app_key` | Datadog アプリケーション キーです。このキーは [Datadog 組織][2] によって作成され、[シークレット][4] として保存する必要があります。                              | はい     |                 |
| `dd_site`    | 情報を送信する [Datadog サイト][3]。                                                                                                           | いいえ      | `datadoghq.com` |
| `cpu_count`  | アナライザーが使用する CPU の数を設定します。                                                                                                         | いいえ      | `2`             |
| `enable_performance_statistics` | 分析されたファイルの実行時間統計を取得します。                                                                                                   | いいえ      | `false`         |
| `debug`      | デバッグに役立つ追加ログをアナライザーに出力させます。有効にするには `yes` を設定します。                                                                  | いいえ      | `no`            |
| `subdirectory` | 解析対象を制限するサブディレクトリ パターンまたはグロブ (複数の場合はスペース区切り) を指定します。例: "src" または "src packages"。 | `false` |                 |
| `architecture` | アナライザーで使用する CPU アーキテクチャを指定します。サポートされている値は `x86_64` と `aarch64` です。                                                              | いいえ      | `x86_64`        |
| `diff_aware` | [差分認識スキャン モード][5] を有効にします。                                                                                                                   | いいえ      | `true`          |
| `secrets_enabled` | シークレット スキャンを有効にします (非公開ベータ)。                                                                                                              | いいえ      | `false`         |

### 注

1. 差分認識スキャンでは、フィーチャ ブランチを解析する際にコミットで変更されたファイルのみをスキャンします。差分認識はデフォルトで有効です。無効にするには、GitHub アクションの `diff_aware` パラメーターを `false` に設定してください。
2. シークレット スキャンは非公開ベータです。シークレット スキャンを有効にするには、Datadog カスタマー サクセス マネージャーにお問い合わせください。

### 廃止済み入力
以下のアクション入力は廃止されており、もはや効果はありません。これらを指定すると警告が表示されます。
* `dd_service`
* `dd_env`

## ルールのカスタマイズ

デフォルトでは、[Datadog Static Analyzer][8] がコード ベースの言語を自動検出し、デフォルトのルール セットを使用してコード ベースを解析します。

ルール セットを指定・カスタマイズするには、リポジトリのルート ディレクトリに `static-analysis.datadog.yml` ファイルを追加し、使用するルール セットを定義してください。

```yaml
rulesets:
  - <ruleset-name>
  - <ruleset-name>
```

ルール セットの完全な一覧については、[Datadog ドキュメント][6] を参照してください。

### Python の例

Python ベースのリポジトリ向けの例を次に示します:

```yaml
rulesets:
  - python-code-style
  - python-best-practices
  - python-inclusive
```


## その他の便利な GitHub Actions

Datadog Software Composition Analysis (SCA) では、依存関係をスキャンし、脆弱性とライセンスを検出することもできます。このプロダクトは [`datadog-sca-github-action`][7] と組み合わせて利用できます。


## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Code Analysis について

[1]: https://docs.datadoghq.com/ja/code_analysis/static_analysis
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[3]: https://docs.datadoghq.com/ja/getting_started/site/
[4]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[5]: https://github.com/DataDog/datadog-static-analyzer/blob/main/README.md#diff-aware-scanning
[6]: https://docs.datadoghq.com/ja/code_analysis/static_analysis_rules/
[7]: https://github.com/DataDog/datadog-sca-github-action
[8]: https://github.com/DataDog/datadog-static-analyzer