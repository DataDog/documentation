---
algolia:
  tags:
  - static analysis
  - CI パイプライン
  - SAST
description: Datadog Static Analysis について学ぶことで、コードが本番環境に到達する前に、コードの品質問題やセキュリティ脆弱性をスキャンすることができます。
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: ブログ
  text: Datadog によるすべての CI パイプラインの監視
is_beta: false
title: 汎用 CI プロバイダー
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
Code Analysis is in Preview.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Code Analysis は {{< region-param key="dd_site_name" >}} サイトでは利用できません。
</div>
{{% /site-region %}}

## 概要

CircleCI Orbs または GitHub Actions を使用しない場合は、CI パイプライン プラットフォームで Datadog CLI を直接実行できます。

前提条件:

- unzip
- Node.js 14 以降

次の環境変数を設定します:

| 名前 | 説明 | 必須 | デフォルト |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|------|--------------------|
| `DD_API_KEY` | Datadog API キーです。このキーはあなたの [Datadog 組織][1] によって作成され、シークレットとして保存する必要があります。 | はい | |
| `DD_APP_KEY` | Datadog アプリケーション キーです。このキーはあなたの [Datadog 組織][2] によって作成され、`code_analysis_read` スコープを含め、シークレットとして保存してください。 | はい | |
| `DD_SITE` | 情報の送信先となる [Datadog サイト][3] です。あなたの Datadog サイトは {{< region-param key="dd_site" code="true" >}} です。 | いいえ | `datadoghq.com` |

次の入力を指定します:

| 名前 | 説明 | 必須 | デフォルト |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------|------|-----------|
| `service` | 結果にタグ付けするサービス名。 | はい | |
| `env` | 結果にタグ付けする環境。`ci` はこの入力に有用な値です。 | いいえ | `none` |
| `cpu_count` | アナライザーが使用する CPU 数を設定します。デフォルトでは、利用可能な CPU の数が使用されます。 | いいえ | |
| `subdirectory` | 解析を限定するサブディレクトリ パス。パスはリポジトリのルート ディレクトリからの相対パスです。 | いいえ | |

解析対象ファイルの実行時間統計を取得するには、静的解析コマンドに `--performance-statistics` フラグを追加します。

次のオプションから、アーキテクチャと OS に対応したアナライザーを選択します:

| アーキテクチャ | OS | 名前 | リンク |
|---------------|-----------|---------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `aarch64` | `Darwin` | `datadog-static-analyzer-aarch64-apple-darwin.zip` | [ダウンロード](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-apple-darwin.zip) |
| `aarch64` | `Linux` | `datadog-static-analyzer-aarch64-unknown-linux-gnu.zip` | [ダウンロード](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-unknown-linux-gnu.zip) |
| `x86_64` | `Darwin` | `datadog-static-analyzer-x86_64-apple-darwin.zip` | [ダウンロード](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-apple-darwin.zip) |
| `x86_64` | `Linux` | `datadog-static-analyzer-x86_64-unknown-linux-gnu.zip` | [ダウンロード](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip) |
| `x86_64` | `Windows` | `datadog-static-analyzer-x86_64-pc-windows-msvc.zip` | [ダウンロード](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-pc-windows-msvc.zip) |

次を CI パイプラインに追加します:

```bash
# 送信先の Datadog サイトを設定
export DD_SITE="datadoghq.com"

# 依存関係をインストール
npm install -g @datadog/datadog-ci

# 最新の Datadog 静的アナライザーをダウンロード:
# https://github.com/DataDog/datadog-static-analyzer/releases
DATADOG_STATIC_ANALYZER_URL=https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip
curl -L $DATADOG_STATIC_ANALYZER_URL > /tmp/ddog-static-analyzer.zip
unzip /tmp/ddog-static-analyzer.zip -d /tmp
mv /tmp/datadog-static-analyzer /usr/local/datadog-static-analyzer

# 静的解析を実行
/usr/local/datadog-static-analyzer -i . -o /tmp/report.sarif -f sarif

# 結果をアップロード
datadog-ci sarif upload /tmp/report.sarif
```

<div class="alert alert-info">
  この例では、Datadog の静的アナライザーの x86_64 Linux 版を使用しています。別の OS またはアーキテクチャを使用している場合は、上の表から選択し、以下の <code>DATADOG_STATIC_ANALYZER_URL</code> の値を更新してください。すべてのリリースは <a href="https://github.com/DataDog/datadog-static-analyzer/releases">GitHub Releases</a> ページで確認できます。
</div>


## Diff-aware scanning

差分認識スキャンは、 Datadog Static Analysis がフィーチャー ブランチのコミットで変更されたファイルのみをスキャンできるようにする機能です。各スキャンでリポジトリ内のすべてのファイルに対して解析を実行しないため、スキャン時間を大幅に短縮できます。初回のスキャンおよびデフォルト ブランチのスキャンでは、常にリポジトリ全体を解析します (差分認識ではありません)。

GitHub Actions を使用している場合、差分認識スキャンはデフォルトで有効です。

その他の CI プロバイダーでは、差分認識スキャンを有効にするために次の手順に従ってください:

1. Make sure your `DD_APP_KEY`, `DD_SITE` and `DD_API_KEY` variables are set in your CI pipeline.
2. Add a call to `datadog-ci git-metadata upload` before invoking the static analyzer. This command ensures that Git metadata is available to the Datadog backend. Git metadata is required to calculate the number of files to analyze.
3. Ensure that the datadog-static-analyzer is invoked with the flag `--diff-aware`.

Example of commands sequence (these commands must be invoked in your Git repository):
```bash
datadog-ci git-metadata upload

datadog-static-analyzer -i /path/to/directory -g -o sarif.json -f sarif –-diff-aware <...other-options...>
```

**Note:** When a diff-aware scan cannot be completed, the entire directory is scanned.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/api-app-keys/#api-keys
[2]: /ja/account_management/api-app-keys/#application-keys
[3]: /ja/getting_started/site/