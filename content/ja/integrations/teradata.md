---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Teradata Overview: assets/dashboards/teradata_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors:
    High disk space: assets/recommended_monitors/high_disk_space.json
    Low ready threads: assets/recommended_monitors/low_ready_threads.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- data store
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/teradata/README.md
display_name: Teradata
draft: false
git_integration_title: teradata
guid: 8205988e-888a-4d31-abf0-753720d772a7
integration_id: teradata
integration_title: Teradata
integration_version: 1.0.1
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: teradata.
metric_to_check: teradata.disk_space.curr_perm.total
name: teradata
public_title: Teradata
short_description: Teradata Vantage Database の健全性とパフォーマンスをモニタリングします。
support: コア
supported_os:
- linux
- windows
---



## 概要

このチェックは、Datadog Agent を通じて [Teradata][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Teradata チェックは [Datadog Agent][3] パッケージに含まれています。

#### Teradata の準備

1. [Teradata SQL Driver for Python][4] をダウンロードし、お使いの [OS][5] の埋め込み Agent pip コマンドを使用してインストールします。

**Linux**

```
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install teradatasql
```

**Windows**

```
%PROGRAMFILES%\Datadog\"Datadog Agent"\embedded<PYTHON_MAJOR_VERSION>\python -m pip install teradatasql
```

2. Teradata Database にアクセスできる、読み取り専用の `datadog` ユーザーを作成します。Teradata Database 上で `BTEQ` セッションを開始します。

```shell
CREATE USER "datadog" AS PASSWORD="<PASSWORD>";
```

任意ですが、強くお勧めします。読み取り専用で監視するために指定された `datadog` ユーザーに新規または既存のロールを付与します。

```shell
GRANT "<READ_ONLY_ROLE>" TO "datadog"; 
```

Teradata システムは、デフォルトでほとんどの [Data Dictionary ビュー][12]で PUBLIC に `SELECT` 権限を付与しています。すべての Teradata Database ユーザーは `PUBLIC` 権限を持ちます。

3. リソースの使用量メトリクスを収集するには、[SPMA Resource Usage Table][6] を有効にします。これは、[`ctl` Teradata Utility][7] を使用して行います。

```shell
# ctl セッションの開始
ctl

# RSS 画面の表示
screen rss

# SPMA リソース使用量テーブルの有効化
SPMA=yes

# 構成設定の保存
write
```

注: SPMA Resource Table はデフォルトで 10 分毎に統計情報をログ収集します。ログの記録間隔は `rss` 画面で `ctl` を使用して構成することができます。リソース使用量のロギングはデータベースのパフォーマンスに影響を与える可能性があります。Resource Usage のロギング頻度を減らすには、`Node Logging Rate` 設定のロギング間隔を長くしてください。Resource Usage Logging の詳細については、Teradata [ドキュメント][8]を参照してください。

4. Teradata インテグレーションは、デフォルトで DBC.DiskSpaceV システムビューからディスクスペースメトリクスを収集します。データベーステーブルのディスクスペースメトリクスを追加で収集するには、`collect_table_disk_metrics` オプションを有効にします。

```
collect_table_disk_metrics: true
```

監視するテーブルをフィルターするには、`tables` オプションを構成します。

監視するテーブルをリストで指定します。

```
tables:
    - <TABLE_1>
    - <TABLE_2>
```

`include` と `exclude` オプションでマップを指定し、監視するテーブルをカスタマイズすることができます。

```
tables:
    include:
        - <TABLE_1>
        - <TABLE_2>
    exclude:
        - <TABLE_3>
```

### コンフィギュレーション

1. teradata のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `teradata.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル teradata.d/conf.yaml][9] を参照してください。

2. [Agent を再起動します][10]。

### 検証

[Agent の status サブコマンドを実行][11]し、Checks セクションで `teradata` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "teradata" >}}


### イベント

Teradata インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "teradata" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][14]までお問合せください。


[12]:https://docs.teradata.com/r/Teradata-VantageTM-Data-Dictionary/July-2021/Data-Dictionary-Views/Access-to-Data-Dictionary-Views/Default-PUBLIC-Privileges-for-Views
[1]: https://www.teradata.com/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/Teradata/python-driver#Installation
[5]: https://docs.datadoghq.com/ja/developers/guide/custom-python-package/?tab=linux#pagetitle
[6]: https://docs.teradata.com/r/Teradata-VantageTM-Resource-Usage-Macros-and-Tables/July-2021/ResUsageSpma-Table
[7]: https://docs.teradata.com/r/Teradata-VantageTM-Database-Utilities/July-2021/Control-GDO-Editor-ctl/Ctl-Commands/SCREEN
[8]: https://docs.teradata.com/r/Teradata-VantageTM-Resource-Usage-Macros-and-Tables/July-2021/Planning-Your-Resource-Usage-Data/Resource-Usage-Logging
[9]: https://github.com/DataDog/integrations-core/blob/master/check/datadog_checks/teradata/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/check/metadata.csv
[13]: https://github.com/DataDog/integrations-core/blob/master/check/assets/service_checks.json
[14]: https://docs.datadoghq.com/ja/help/