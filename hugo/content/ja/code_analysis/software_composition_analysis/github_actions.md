---
dependencies:
- https://github.com/DataDog/datadog-sca-github-action/blob/main/README.md
description: Datadog と GitHub を使用して、CI パイプラインで Software Composition Analysis ジョブを実行します。
title: Software Composition Analysis と GitHub Actions
---
GitHub Actions ワークフローで Datadog の [Software Composition Analysis][1] ジョブを実行します。このアクションはコードベースに対して [Datadog osv‑scanner][3] を実行し、その結果を Datadog にアップロードします。

## ライブラリインベントリの生成

GitHub Actions は、リポジトリで宣言されているライブラリに基づいて、ライブラリのインベントリを自動生成します。

GitHub Actions は以下の言語とファイルで動作します。

 - JavaScript/TypeScript: `package-lock.json` および `yarn.lock`
 - Python: `requirements.txt` (バージョンが定義されているもの) および `poetry.lock`
 - Java: `pom.xml`
 - C#
 - Ruby
 - ... 上記以外の言語 ([ドキュメント](https://docs.datadoghq.com/code_analysis/software_composition_analysis/)に一覧を記載)

## セットアップ

### キーのセットアップ

[GitHub Actions の設定][2]で、`DD_APP_KEY` と `DD_API_KEY` をシークレットとして追加します。Datadog のアプリケーションキーに`code_analysis_read` のスコープが付与されていることを確認してください。詳細については、[API キーとアプリケーションキー][7]を参照してください。

### ワークフロー

`.github/workflows/datadog-sca.yml` に以下のコードスニペットを追加します。必ず、`dd_site` 属性をご利用の [Datadog サイト][4]に置き換えてください。

```yaml
on: [push]

name: Datadog Software Composition Analysis

jobs:
  software-composition-analysis:
    runs-on: ubuntu-latest
    name: Datadog SBOM Generation and Upload
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    - name: Check imported libraries are secure and compliant
      id: datadog-software-composition-analysis
      uses: DataDog/datadog-sca-github-action@main
      with:
        dd_api_key: ${{ secrets.DD_API_KEY }}
        dd_app_key: ${{ secrets.DD_APP_KEY }}
        dd_site: "datadoghq.com"
```

## Datadog の関連ツール

[Datadog Static Analysis][5] はコードを解析し、IDE、GitHub PR、または Datadog 環境内でフィードバックを提供します。Datadog Static Analysis は、GitHub のアクション [`datadog-static-analyzer-github-action`][6] を使ってセットアップできます。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Software Composition Analysis について][1]

[1]: https://docs.datadoghq.com/ja/code_analysis/software_composition_analysis
[2]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[3]: https://github.com/DataDog/osv-scanner
[4]: https://docs.datadoghq.com/ja/getting_started/site/
[5]: https://docs.datadoghq.com/ja/code_analysis/static_analysis
[6]: https://github.com/DataDog/datadog-static-analyzer-github-action
[7]: https://docs.datadoghq.com/ja/account_management/api-app-keys/