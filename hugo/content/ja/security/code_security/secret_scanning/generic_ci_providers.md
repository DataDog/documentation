---
algolia:
  tags:
  - static analysis
  - ci pipeline
  - SAST
  - secret scanning
description: Datadog Static Secret Scanning を使用して、プリプロダクション環境のコードの品質問題やセキュリティの脆弱性をスキャンします。
is_beta: true
title: 汎用 CI プロバイダーを使用した Secret Scanning
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
    Secret Scanning は {{< region-param key="dd_site_name" >}} サイトでは利用できません。
</div>
{{% /site-region %}}


[GitHub Actions][5] を使用して Secret Scanning をセットアップしない場合は、CI パイプラインプラットフォームで [Datadog CI][4] CLI を直接実行し、Static Analysis Results Interchange Format (SARIF) レポートを Datadog にアップロードできます。

<div class="alert alert-info"><a href="/security/code_security/secret_scanning/#detect-secrets-in-git-history">Git 履歴スキャン</a>は、ホスト型スキャンでのみ利用可能です。CI ベースのスキャンは、チェックアウトされたコミットを解析します。</div>

前提条件:

- unzip
- Node.js 14 以降

次の環境変数を構成します。

| 名前         | 説明                                                                                                                | 必須 | デフォルト         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Datadog API キー。このキーは [Datadog 組織][1]によって作成され、シークレットとして保存する必要があります。           | はい      |                 |
| `DD_APP_KEY` | Datadog アプリケーションキー。このキーは [Datadog 組織][2]によって作成され、`code_analysis_read` スコープを含め、シークレットとして保存する必要があります。 | はい      |                 |
| `DD_SITE`    | 情報の送信先の [Datadog サイト][3]。使用している Datadog サイトは {{< region-param key="dd_site" code="true" >}}です。       | いいえ       | `datadoghq.com` |


アーキテクチャと OS に適したアナライザーを以下のオプションから選択します。

| アーキテクチャ | OS        | 名前                                                    | リンク                                                                                                                                          |
|--------------|-----------|---------------------------------------------------------| ----------------------------------------------------------------------------------------------------------------------------------------------|
| `aarch64`    | `Darwin`  | `datadog-static-analyzer-aarch64-apple-darwin.zip`      | [ダウンロード](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-apple-darwin.zip)      |
| `aarch64`    | `Linux`   | `datadog-static-analyzer-aarch64-unknown-linux-gnu.zip` | [ダウンロード](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-unknown-linux-gnu.zip) |
| `x86_64`     | `Darwin`  | `datadog-static-analyzer-x86_64-apple-darwin.zip`       | [ダウンロード](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-apple-darwin.zip)       |
| `x86_64`     | `Linux`   | `datadog-static-analyzer-x86_64-unknown-linux-gnu.zip`  | [ダウンロード](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip)  |
| `x86_64`     | `Windows` | `datadog-static-analyzer-x86_64-pc-windows-msvc.zip`    | [ダウンロード](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-pc-windows-msvc.zip)    |

CI パイプラインに下記を追加します。

```bash
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"
export DD_API_KEY=<YOUR-API-KEY>
export DD_APP_KEY=<YOUR-APP-KEY>

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog static analyzer:
# https://github.com/DataDog/datadog-static-analyzer/releases
DATADOG_STATIC_ANALYZER_URL=https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip
curl -L $DATADOG_STATIC_ANALYZER_URL > /tmp/ddog-static-analyzer.zip
unzip /tmp/ddog-static-analyzer.zip -d /tmp
mv /tmp/datadog-static-analyzer /usr/local/datadog-static-analyzer

# Run Static Code Analysis
/usr/local/datadog-static-analyzer -i . -o /tmp/report.sarif -f sarif --enable-secrets true --enable-static-analysis false

# Upload results
datadog-ci sarif upload /tmp/report.sarif
```

<div class="alert alert-info">
  この例では、Datadog の Secret Scanning 用静的アナライザーの x86_64 Linux バージョンを使用しています。別の OS やアーキテクチャを使用している場合は、上のテーブルから選択して <code>DATADOG_STATIC_ANALYZER_URL</code> 値を更新してください。すべてのリリースは、<a href="https://github.com/DataDog/datadog-static-analyzer/releases"> GitHub Releases</a> ページで確認できます。
</div>


[1]: /ja/account_management/api-app-keys/#api-keys
[2]: /ja/account_management/api-app-keys/#application-keys
[3]: /ja/getting_started/site/
[4]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#sarif
[5]: /ja/security/code_security/secret_scanning/github_actions/