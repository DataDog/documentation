---
app_id: ibm-db2
app_uuid: e588293a-833f-4888-a7b4-2208e087059a
assets:
  dashboards:
    IBM Db2 Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: ibm_db2.connection.active
      metadata_path: metadata.csv
      prefix: ibm_db2.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10054
    source_type_name: IBM Db2
  logs:
    source: ibm_db2
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- data stores
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_db2/README.md
display_on_public_website: true
draft: false
git_integration_title: ibm_db2
integration_id: ibm-db2
integration_title: IBM Db2
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: ibm_db2
public_title: IBM Db2
short_description: IBM Db2 データベースからのテーブルスペース、バッファプールなどのメトリクスを監視
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  - Category::Log Collection
  configuration: README.md#Setup
  description: IBM Db2 データベースからのテーブルスペース、バッファプールなどのメトリクスを監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: IBM Db2
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![デフォルトのダッシュボード][1]

## 概要

このチェックは、Datadog Agent を通じて [IBM Db2][2] を監視します。

## 計画と使用

### インフラストラクチャーリスト

IBM Db2 チェックは [Datadog Agent][3] パッケージに含まれています。

#### 依存関係

[ibm_db][4] クライアントライブラリが必要です。これをインストールするには、コンパイラーが用意されていることを確認し、次を実行します。

##### Unix

```text
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install ibm_db==3.1.0
```

注: Python 2 が動作する Agent をお使いの場合は、`ibm_db=3.1.0` の代わりに `ibm_db==3.0.1` を使用してください。

##### ログの収集

Agent バージョン < 6.11 の場合

```text
"C:\Program Files\Datadog\Datadog Agent\embedded\python.exe" -m pip install ibm_db==3.0.1
```

Agent バージョン >= 6.12 および < 7.0 の場合

```text
"C:\Program Files\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" -m pip install ibm_db==3.0.1
```

Agent バージョン >= 7.0 の場合

```text
"C:\Program Files\Datadog\Datadog Agent\embedded3\python.exe" -m pip install ibm_db==3.1.0
```

Linux では、XML 機能が必要になる場合があります。ビルドプロセス中にエラーが発生した場合は、
`libxslt-dev` (RPM では `libxslt-devel`) をインストールしてください。

#### モニタリングを有効にする

IBM Db2 インテグレーションは、以下のテーブル関数を使用してデータを取り出します。
* `MON_GET_TABLESPACE`
* `MON_GET_TRANSACTION_LOG`
* `MON_GET_BUFFERPOOL`
* `MON_GET_DATABASE`
* `MON_GET_INSTANCE`

これらのテーブル関数の詳細については、[IBM 公式ドキュメント][5]を参照してください。

Db2 インスタンスを監視するには、上記の 5 つのテーブル関数に `EXECUTE` 権限を持つ Db2 ユーザーを作成するか、Db2 ユーザーに以下のロールのいずれかを付与します。
* `DATAACCESS` 権限
* `DBADM` 権限
* `SQLADM` 権限

インスタンス、関連するデータベース、およびデータベースオブジェクトの健全性を監視するには、監視したいオブジェクトごとにデータベースシステムモニタスイッチを有効にします。
* ステートメント
* Lock
* テーブル
* バッファプール

インスタンスマスターユーザーに切り替えて、`db2` プロンプトで以下のコマンドを実行します。

```text
update dbm cfg using HEALTH_MON on
update dbm cfg using DFT_MON_STMT on
update dbm cfg using DFT_MON_LOCK on
update dbm cfg using DFT_MON_TABLE on
update dbm cfg using DFT_MON_BUFPOOL on
```

次に、`get dbm cfg` を実行すると、以下のように表示されるはずです。

```text
 Default database monitor switches
   Buffer pool                         (DFT_MON_BUFPOOL) = ON
   Lock                                   (DFT_MON_LOCK) = ON
   Sort                                   (DFT_MON_SORT) = OFF
   Statement                              (DFT_MON_STMT) = ON
   Table                                 (DFT_MON_TABLE) = ON
   Timestamp                         (DFT_MON_TIMESTAMP) = ON
   Unit of work                            (DFT_MON_UOW) = OFF
 Monitor health of instance and databases   (HEALTH_MON) = ON
```

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. `ibm_db2` のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `ibm_db2.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル ibm_db2.d/conf.yaml][1] を参照してください。

2. [Agent を再起動します][2]。

##### 収集データ

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. IBM Db2 のログの収集を開始するには、次の構成ブロックを `ibm_db2.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /home/db2inst1/sqllib/db2dump/db2diag.log
       source: ibm_db2
       service: db2sysc
       log_processing_rules:
         - type: multi_line
           name: new_log_start_with_date
           pattern: \d{4}\-(0?[1-9]|[12][0-9]|3[01])\-(0?[1-9]|1[012])
   ```

3. [Agent を再起動します][2]。

[1]: https://github.com/DataDog/integrations-core/blob/master/ibm_db2/datadog_checks/ibm_db2/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `ibm_db2`                                                                                                     |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                                                 |
| `<INSTANCE_CONFIG>`  | `{"db": "<DB_NAME>", "username":"<USERNAME>", "password":"<PASSWORD>", "host":"%%host%%", "port":"%%port%%"}` |

##### 収集データ

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                                                                                                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ibm_db2", "service": "<SERVICE_NAME>", "log_processing_rules": {"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-(0?[1-9]|[12][0-9]|3[01])\-(0?[1-9]|1[012])"}}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `ibm_db2` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "ibm_db2" >}}


### ヘルプ

- テーブルスペースの状態が変化するたびに、`ibm_db2.tablespace_state_change` がトリガーされます。

### ヘルプ
{{< get-service-checks-from-git "ibm_db2" >}}


## ヘルプ

### CLI Driver SQL1531N エラー

以下のようなエラーログが表示される問題が発生した場合

```
2023-08-10 23:34:47 UTC | CORE | ERROR | (pkg/collector/python/datadog_agent.go:129 in LogMessage) | ibm_db2:c051131490335a94 | (ibm_db2.py:563) | Unable to connect to database `datadog` as user `db2inst1`: [IBM][CLI Driver] SQL1531N  The connection failed because the name specified with the DSN connection string keyword could not be found in either the db2dsdriver.cfg configuration file or the db2cli.ini configuration file.  Data source name specified in the connection string: "DATADOG". SQLCODE=-1531
```

その場合、以下のシナリオのいずれかが原因である可能性が高いです。
- 構成 (conf.yaml) にホストとポートの構成がない
- `db2cli.ini` と `db2dsdriver.cfg` が存在しないため、CLI Driver がデータベースを検索できない

Agent はデータベースに正しく接続する場所を決定するために、上記の両方の情報を必要とします。この問題を解決するには、この問題が発生している `ibm_db2` チェックのすべてのインスタンスにホストとポートのパラメーターを含めるようにします。あるいは、`db2cli.ini` または `db2dsdriver.cfg` ファイルで定義された DSN を使用したい場合は、これらのファイルを Agent が使用する `clidriver` ディレクトリにコピーします。通常、このディレクトリは Linux の場合 `/opt/datadog-agent/embedded/lib/python3.9/site-packages/clidriver/cfg` にあります。

### オフラインで `ibm_db` クライアントライブラリをインストールする

エアギャップ環境、または制限されたネットワーク上で `pip install ibm_db==x.y.z` (`x.y.z` はバージョン番号) を実行できない場合、以下の方法で `ibm_db` をインストールすることが可能です。


1. ネットワークにアクセスできるマシンで、[`ibm_db` ライブラリ][7]と [ODBC と CLI][8] のソース tarball をダウンロードします。ODBC と CLI は `ibm_db` ライブラリが必要とするため、別途ダウンロードする必要がありますが、`pip` 経由ではダウンロードできません。以下のスクリプトは `ibm_db==x.y.z`  (`x.y.z` はバージョン番号) のアーカイブファイルを Linux マシンにインストールします。

   ```
   curl -Lo ibm_db.tar.gz https://github.com/ibmdb/python-ibmdb/archive/refs/tags/vx.y.z.tar.gz

   curl -Lo linuxx64_odbc_cli.tar.gz https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/linuxx64_odbc_cli.tar.gz
   ```

1. 制限されたホストに 2 つのファイルを転送し、アーカイブを展開します。

   ```
   tar -xvf ibm_db.tar.gz

   tar -xvf linuxx64_odbc_cli.tar.gz
   ```

1. 環境変数 `IBM_DB_HOME` に `/clidriver` が `linuxx64_odbc_cli.tar.gz` から展開された場所を設定します。これにより、`ibm_db` ライブラリが新しいバージョンの ODBC と CLI をインストールするのを防ぐことができます (これは失敗するため)。

   ```
   export IBM_DB_HOME=/path/to/clidriver
   ```

1. Agent に組み込まれた [`pip`][9] を使用して、`ibm_db` ライブラリをローカルにインストールします。このライブラリのファイルは `ibm_db.tar.gz` から展開された `python-ibmdb-x.y.z` にコンテナとして含まれています。

   ```
   /opt/datadog-agent/embedded/bin/pip install --no-index --no-deps --no-build-isolation  /path/to/python-ibmdb-x.y.z/IBM_DB/ibm_db/
   ```

以下のエラーが発生した場合

```
  error: subprocess-exited-with-error

  × Preparing metadata (pyproject.toml) did not run successfully.
  | exit code: 1
   -> [8 lines of output]
      Detected 64-bit Python
      Detected platform = linux, uname = x86_64
      Downloading https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/linuxx64_odbc_cli.tar.gz
       Downloading DSDriver from url =  https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/linuxx64_odbc_cli.tar.gz
      Pre-requisite check [which gcc] : Failed

      No Gcc installation detected.
      Please install gcc and continue with the installation of the ibm_db.
      [end of output]
```

`gcc` をインストールする必要があるかもしれません。

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した IBM DB2 の監視][11]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/ibm_db2/images/dashboard_overview.png
[2]: https://www.ibm.com/analytics/us/en/db2
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/ibmdb/python-ibmdb
[5]: https://www.ibm.com/docs/en/db2oc?topic=views-monitor-procedures-functions
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://pypi.org/project/ibm-db/#files
[8]: https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/
[9]: https://docs.datadoghq.com/ja/developers/guide/custom-python-package/?tab=linux
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://www.datadoghq.com/blog/monitor-db2-with-datadog