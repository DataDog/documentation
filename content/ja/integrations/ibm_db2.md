---
assets:
  dashboards:
    IBM Db2 Overview: assets/dashboards/overview.json
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - データストア
  - ログの収集
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/ibm_db2/README.md'
display_name: IBM Db2
git_integration_title: ibm_db2
guid: 67378f79-e72b-4f49-8ec2-57053706523d
integration_id: ibm-db2
integration_title: IBM Db2
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ibm_db2.
metric_to_check: ibm_db2.connection.active
name: ibm_db2
public_title: Datadog-IBM Db2 インテグレーション
short_description: IBM Db2 データベースからのテーブルスペース、バッファプールなどのメトリクスを監視
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![デフォルトのダッシュボード][1]

## 概要

このチェックは、Datadog Agent を通じて [IBM Db2][2] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][11]のガイドを参照してこの手順を行ってください。

### インストール

IBM Db2 チェックは [Datadog Agent][3] パッケージに含まれています。

#### 依存関係

[ibm_db][4] クライアントライブラリが必要です。これをインストールするには、コンパイラーが用意されていることを確認し、次を実行します。

##### Unix:

```
/opt/datadog-agent/embedded/bin/pip install ibm_db==3.0.1
```

##### Windows:

Agent バージョン < 6.11 の場合
```
"C:\Program Files\Datadog\Datadog Agent\embedded\Scripts\python.exe" -m pip install ibm_db==3.0.1
```

Agent バージョン >= 6.12 の場合
```
"C:\Program Files\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\Scripts\python.exe" -m pip install ibm_db==3.0.1
```

Linux では、XML 機能が必要になる場合があります。ビルドプロセス中にエラーが発生した場合は、
`libxslt-dev` (RPM では `libxslt-devel`) をインストールしてください。

#### 権限

一部のテーブルからのメトリクスを問い合わせるには、選択した Db2 ユーザーに特別な権限を付与する必要があります。
インスタンスマスターユーザーに切り替えて、`db2` プロンプトで次のコマンドを実行します。

```
update dbm cfg using HEALTH_MON on
update dbm cfg using DFT_MON_STMT on
update dbm cfg using DFT_MON_LOCK on
update dbm cfg using DFT_MON_TABLE on
update dbm cfg using DFT_MON_BUFPOOL on
```

これで、`get dbm cfg` を実行すると、次のように表示されます。

```
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

### コンフィグレーション

1. `ibm_db2` のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `ibm_db2.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル ibm_db2.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

#### ログの収集

**Agent 6.0 以上で使用可能**

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

3. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `ibm_db2` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ibm_db2" >}}


### サービスのチェック

**ibm_db2.can_connect**:<br>
監視対象の IBM Db2 データベースに Agent が接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**ibm_db2.status**:<br>
監視対象の IBM Db2 データベースが静止状態の場合は `CRITICAL`、静止ペンディングまたはロールフォワードの場合は `WARNING`、それ以外の場合は `OK` を返します。

### イベント

- テーブルスペースの状態が変化するたびに、`ibm_db2.tablespace_state_change` がトリガーされます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した IBM DB2 の監視][10]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/ibm_db2/assets/images/dashboard_overview.png
[2]: https://www.ibm.com/analytics/us/en/db2
[3]: https://docs.datadoghq.com/ja/agent
[4]: https://github.com/ibmdb/python-ibmdb/tree/master/IBM_DB/ibm_db
[5]: https://github.com/DataDog/integrations-core/blob/master/ibm_db2/datadog_checks/ibm_db2/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/ibm_db2/metadata.csv
[9]: https://docs.datadoghq.com/ja/help
[10]: https://www.datadoghq.com/blog/monitor-db2-with-datadog
[11]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations


{{< get-dependencies >}}