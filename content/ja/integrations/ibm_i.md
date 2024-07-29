---
app_id: ibm-i
app_uuid: 30045928-4be2-4efd-9a08-160e904494a1
assets:
  dashboards:
    IBM i Overview: assets/dashboards/ibm_i_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ibm_i.system.cpu_usage
      metadata_path: metadata.csv
      prefix: ibm_i.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10219
    source_type_name: IBM i
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- OS & システム
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_i/README.md
display_on_public_website: true
draft: false
git_integration_title: ibm_i
integration_id: ibm-i
integration_title: IBM i
integration_version: 2.2.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: ibm_i
public_title: IBM i
short_description: ジョブ、ジョブキュー、ASP などを含む IBM i システムをリモートで監視します。
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::OS & System
  configuration: README.md#Setup
  description: ジョブ、ジョブキュー、ASP などを含む IBM i システムをリモートで監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: IBM i
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通して [IBM i][1] をリモートで監視します。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

**注**: Unix 系 OS に特有の `fcntl()` システムコールを使用するため、このチェックは Windows では利用できません。

### インフラストラクチャーリスト

IBM i チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

#### ODBC ドライバー

IBM i チェックでは、IBM i ODBC ドライバーを使用して、IBM i ホストにリモートで接続します。

[IBM i Access - Client Solutions][4] のページから、ドライバーをダウンロードします。`Downloads for IBM i Access Client Solutions` をクリックし、ログインしてダウンロードページにアクセスしてください。

Linux ホスト用の `ACS Linux App Pkg` など、お使いのプラットフォーム用の `ACS App Pkg` パッケージを選択します。パッケージをダウンロードし、インストール手順に従って、ドライバーをインストールします。

### ブラウザトラブルシューティング

IBM i チェックは、Datadog Agent を実行しているホストから IBM i システムにリモートでクエリを実行します。IBM i システムと通信するには、Datadog Agent を実行しているホストで IBM i ODBC ドライバーをセットアップする必要があります。

#### ODBC ドライバー

ODBC ドライバーがインストールされたら、ODBC のコンフィギュレーションファイルである `odbc.ini` と `odbcinst.ini` を探します。場所は、お使いのシステムによって異なるかもしれません。Linux では、`/etc` ディレクトリか、`/etc/unixODBC` ディレクトリにあります。

これらのコンフィギュレーションファイルを、Linux ホスト上の `/opt/datadog-agent/embedded/etc/` などの組み込み Agent 環境にコピーします。

`odbcinst.ini` ファイルは、Agent が利用できる ODBC ドライバーを定義します。各セクションは 1 つのドライバーを定義します。例えば、次のセクションは `IBM i Access ODBC Driver 64-bit` という名前のドライバーを定義しています。
```
[IBM i Access ODBC Driver 64-bit]
Description=IBM i Access for Linux 64-bit ODBC Driver
Driver=/opt/ibm/iaccess/lib64/libcwbodbc.so
Setup=/opt/ibm/iaccess/lib64/libcwbodbcs.so
Threading=0
DontDLClose=1
UsageCount=1
```

IBM i ODBC ドライバーの名前は、IBM i のチェックを構成するために必要です。

#### IBM i チェック

1. IBM i のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `ibm_i.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル ibm_i.d/conf.yaml][5] を参照してください。
   `obdcinst.ini` ファイルにあるドライバー名を使用します。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションの `ibm_i` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "ibm_i" >}}


### ヘルプ

IBM i チェックには、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://www.ibm.com/it-infrastructure/power/os/ibm-i
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://www.ibm.com/support/pages/ibm-i-access-client-solutions
[5]: https://github.com/DataDog/integrations-core/blob/master/ibm_i/datadog_checks/ibm_i/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/ibm_i/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/ibm_i/datadog_checks/ibm_i/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/