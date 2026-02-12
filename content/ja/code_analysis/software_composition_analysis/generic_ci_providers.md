---
algolia:
  tags:
  - software composition analysis
  - CI パイプライン
  - SCA
description: Datadog CLI を CI パイプラインで直接実行し、環境変数を設定し、依存関係をインストールし、本番環境に到達する前にコードの品質とセキュリティの問題をスキャンする方法を学びます。
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
    Code Analysis は、{{< region-param key="dd_site_name" >}} サイトでは使用できません。
</div>
{{% /site-region %}}

## 概要

GitHub Actions を使用していない場合は、CI パイプラインのプラットフォーム上で Datadog CLI を直接実行できます。

前提条件:

- unzip
- Node.js 14 以降

以下の環境変数を構成します。

| 名前         | 説明                                                                                                                | 必須 | デフォルト         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Datadog API キー。これはあなたの [Datadog 組織][1] によって作成され、シークレットとして保存する必要があります。            | はい      |                 |
| `DD_APP_KEY` | Datadog アプリケーション キー。これはあなたの [Datadog 組織][2] によって作成されたキーで、`code_analysis_read` スコープを含め、シークレットとして保存する必要があります。    | はい      |                 |
| `DD_SITE`    | 情報の送信先となる [Datadog サイト][3]。あなたの Datadog サイトは {{< region-param key="dd_site" code="true" >}} です。       | いいえ       | `datadoghq.com` |

以下の入力を行います。

| 名前           | 説明                                                                                                                | 必須 | デフォルト         |
|----------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service`      | 結果をタグ付けするサービス名。                                                                           | はい      |                 |
| `env`          | 結果をタグ付けする環境。この入力には `ci` が便利です。                                           | いいえ       | `none`          |
| `subdirectory` | 分析の対象を限定するサブディレクトリ パス。パスはリポジトリのルート ディレクトリからの相対パスです。                  | いいえ       |                 |

```bash
# 送信先の Datadog サイトを設定する
export DD_SITE="{{< region-param key="dd_site" code="true" >}}"

# 依存関係をインストールする
npm install -g @datadog/datadog-ci

# 最新の Datadog OSV Scanner をダウンロードする:
# https://github.com/DataDog/osv-scanner/releases
DATADOG_OSV_SCANNER_URL=https://github.com/DataDog/osv-scanner/releases/latest/download/osv-scanner_linux_amd64.zip

# OSV Scanner をインストールする
mkdir /osv-scanner
curl -L -o /osv-scanner/osv-scanner.zip $DATADOG_OSV_SCANNER_URL
unzip /osv-scanner/osv-scanner.zip -d /osv-scanner
chmod 755 /osv-scanner/osv-scanner

# OSV Scanner を実行して依存関係をスキャンする
/osv-scanner/osv-scanner --skip-git -r --experimental-only-packages --format=cyclonedx-1-5 --paths-relative-to-scan-dir  --output=/tmp/sbom.json /path/to/repository

# 結果を Datadog にアップロードする
datadog-ci sbom upload /tmp/sbom.json
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/api-app-keys/#api-keys
[2]: /ja/account_management/api-app-keys/#application-keys
[3]: /ja/getting_started/site/