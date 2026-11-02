---
description: Datadog と GitHub を使用して、CI パイプライン内のコードで公開されているシークレットを検出します。
is_beta: true
title: Secret Scanning と GitHub Actions
---
GitHub Action ワークフローで [Datadog Secret Scanning][1] ジョブを実行します。このアクションは [Datadog Static Analyzer][8] (シークレットをスキャンします) をラップし、コードベースに対して実行して、その結果を Datadog にアップロードします。

## ワークフロー {#workflow}

`.github/workflows` にファイルを作成して、Datadog Secret Scanning ジョブを実行します。

以下はワークフローファイルのサンプルです。

```yaml
on: [push]

jobs:
  check-quality:
    runs-on: ubuntu-latest
    name: Datadog Static Analyzer
    steps:
      - name: Checkout
        uses: actions/checkout@v6
      - name: Check code meets quality standards
        id: datadog-static-analysis
        uses: DataDog/datadog-static-analyzer-github-action@v3
        with:
          dd_app_key: ${{ secrets.DD_APP_KEY }}
          dd_api_key: ${{ secrets.DD_API_KEY }}
          dd_site: "datadoghq.com"
          cpu_count: 2
          enable_performance_statistics: false
          static_analysis_enabled: false
          secrets_enabled: true
```

Datadog API キーとアプリケーションキーを、組織レベルまたはリポジトリレベルのいずれかで [GitHub リポジトリのシークレット][4]として設定する**必要があります**。必ず、Datadog アプリケーションキーに `code_analysis_read` スコープを追加します。詳細については、「[API キーとアプリケーションキー][2]」を参照してください。

`dd_site` は、必ずご使用の Datadog サイトに置き換えます。

## 入力 {#inputs}

以下のパラメーターを設定できます。

| 名前         | 説明                                                                                                                                             | 必須 | デフォルト         |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `dd_api_key` | Datadog API キー。このキーは [Datadog 組織][2]によって作成され、[シークレット][2]として保存する必要があります。                                     | はい     |                 |
| `dd_app_key` | Datadog アプリケーションキー。このキーは [Datadog 組織][2]によって作成され、[シークレット][4]として保存する必要があります。                             | はい     |                 |
| `dd_site`    | 情報の送信先の [Datadog サイト][3]。                                                                                                          | いいえ      | `datadoghq.com` |
| `cpu_count`  | アナライザーが使用する CPU の数を設定します。                                                                                                        | いいえ      | `2`             |
| `enable_performance_statistics` | 分析されたファイルの実行時間統計を取得します。                                                                                                  | いいえ      | `false`         |
| `debug`      | アナライザーにより、デバッグに役立つ追加ログを出力します。有効にするには、`yes` に設定します。                                                                 | いいえ      | `no`            |



<!-- ## Further Reading

Additional helpful documentation, links, and articles:

- [Learn about Code Security][1] -->

[1]: /ja/security/code_security/
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[3]: https://docs.datadoghq.com/ja/getting_started/site/
[4]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[6]: /ja/security/code_security/static_analysis/static_analysis_rules/
[7]: https://github.com/DataDog/datadog-sca-github-action
[8]: https://github.com/DataDog/datadog-static-analyzer