---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    IBM i Overview: assets/dashboards/ibm_i_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- OS & システム
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_i/README.md
display_name: IBM i
draft: false
git_integration_title: ibm_i
guid: da389374-7541-47e5-bcd1-87cf3b88a469
integration_id: ibm-i
integration_title: IBM i
integration_version: 1.4.0
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ibm_i.
metric_to_check: ibm_i.system.cpu_usage
name: ibm_i
public_title: IBM i
short_description: ジョブ、ジョブキュー、ASP などを含む IBM i システムをリモートで監視します。
support: コア
supported_os:
- linux
- mac_os
- windows
---



## 概要

このチェックは、Datadog Agent を通して [IBM i][1] をリモートで監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

IBM i チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

#### ODBC ドライバー

IBM i チェックでは、IBM i ODBC ドライバーを使用して、IBM i ホストにリモートで接続します。

[IBM i Access - Client Solutions][4] のページから、ドライバーをダウンロードします。`Downloads for IBM i Access Client Solutions` をクリックし、ログインしてダウンロードページにアクセスしてください。

Linux ホスト用の `ACS Linux App Pkg` など、お使いのプラットフォーム用の `ACS App Pkg` パッケージを選択します。パッケージをダウンロードし、インストール手順に従って、ドライバーをインストールします。

### コンフィギュレーション

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

## 収集データ

### メトリクス
{{< get-metrics-from-git "ibm_i" >}}


### イベント

IBM i チェックには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://www.ibm.com/it-infrastructure/power/os/ibm-i
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://www.ibm.com/support/pages/ibm-i-access-client-solutions
[5]: https://github.com/DataDog/integrations-core/blob/master/ibm_i/datadog_checks/ibm_i/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/ibm_i/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/ibm_i/datadog_checks/ibm_i/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/