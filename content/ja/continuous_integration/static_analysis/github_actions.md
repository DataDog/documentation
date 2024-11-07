---
dependencies:
- https://github.com/DataDog/datadog-static-analyzer-github-action/blob/main/README.md
description: Datadog と GitHub を使用して、CI パイプラインで Static Analysis ジョブを実行します。
title: Static Analysis と GitHub Actions
---
## 概要

GitHub Action ワークフローで Datadog Static Analysis ジョブを実行します。

Static Analysis は非公開ベータ版です。アクセスをリクエストするには、[サポートにご連絡ください][4]。

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
        uses: actions/checkout@v3
      - name: Check code meets quality standards
        id: datadog-static-analysis
        uses: DataDog/datadog-static-analyzer-github-action@v1
        with:
          dd_app_key: ${{ secrets.DD_APP_KEY }}
          dd_api_key: ${{ secrets.DD_API_KEY }}
          dd_service: "my-service"
          dd_env: "ci"
```

Datadog API キーとアプリケーションキーを GitHub リポジトリにシークレットとして設定する必要があります。詳しくは、[API とアプリケーションキー][1]を参照してください。

## 入力

Static Analysis に以下のパラメーターを設定することができます。

| 名前         | 説明                                                                                                                | 必須 | デフォルト         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `dd_api_key` | Datadog API キー。このキーは [Datadog 組織][1]によって作成され、[シークレット][2]として保存する必要があります。         | はい     |                 |
| `dd_app_key` | Datadog アプリケーションキー。このキーは [Datadog 組織][1]によって作成され、[シークレット][2]として保存する必要があります。 | はい     |                 |
| `dd_service` | 結果のタグ付けを希望するサービス。                                                                             | はい     |                 |
| `dd_env`     | 結果をタグ付けしたい環境。Datadog は、この入力値として `ci` を使用することを推奨します。              | ✕      | `none`          |
| `dd_site`    | 情報を送信する [Datadog サイト][3]。                                                                              | ✕      | `datadoghq.com` |

[1]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[2]: https://docs.github.com/en/actions/security-guides/encrypted-secrets
[3]: https://docs.datadoghq.com/ja/getting_started/site/
[4]: https://docs.datadoghq.com/ja/help/