---
assets:
  dashboards:
    oracle: assets/dashboards/oracle_overview.json
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/oracle/README.md'
display_name: Oracle Database
git_integration_title: oracle
guid: 6c4ddc46-2763-4c56-8b71-c838b7f82d7b
integration_id: oracle
integration_title: Oracle
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: oracle.
metric_to_check: oracle.session_count
name: Oracle
public_title: Datadog-Oracle インテグレーション
short_description: エンタープライズグリッド向け Oracle リレーショナルデータベースシステム computing
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Oracle ダッシュボード][1]

## 概要

Oracle Database サーバーからメトリクスをリアルタイムに取得して、可用性とパフォーマンスを視覚化および監視できます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][11]のガイドを参照してこの手順を行ってください。

### インストール

#### 前提条件
Oracle インテグレーションを使用するには、Oracle Instant Client ライブラリをインストールするか、Oracle JDBC Driver をダウンロードする必要があります。ライセンスの制約により、これらのライブラリは Datadog Agent に含まれていませんが、Oracle から直接ダウンロードできます。

##### JDBC Driver

- [JDBC Driver jar ファイルをダウンロード][2]します。
- ダウンロードしたファイルのパスを `$CLASSPATH` に追加するか、チェック構成ファイルの `jdbc_driver_path` の下に追加します ([サンプル oracle.yaml][3] を参照)。

##### Oracle Instant Client

Oracle チェックは、`cx_Oracle` Python モジュールまたは Oracle JDBC Driver にアクセスする必要があります。

1. [ダウンロードページ][4]にアクセスして、Instant Client Basic パッケージと SDK パッケージをインストールします。

    Linux を使用している場合は、Instant Client ライブラリのインストール後に、ランタイムリンカがライブラリを見つけることができることを確認します。たとえば、`ldconfig` を使用します。

    ```
    # Put the library location in an ld configuration file.

    sudo sh -c "echo /usr/lib/oracle/12.2/client64/lib > \
        /etc/ld.so.conf.d/oracle-instantclient.conf"

    # Update the bindings.

    sudo ldconfig
    ```

2. 特定のマシンですべてのユーザーが使用できるディレクトリ (`/opt/oracle` など) に、これらのライブラリを解凍します。

    ```
    mkdir -p /opt/oracle/ && cd /opt/oracle/
    unzip /opt/oracle/instantclient-basic-linux.x64-12.1.0.2.0.zip
    unzip /opt/oracle/instantclient-sdk-linux.x64-12.1.0.2.0.zip
    ```

3. `LD_LIBRARY_PATH` を更新して、Agent を起動/再起動したときに、Instant Client ライブラリの場所が含まれるようにします。

  ```
  export LD_LIBRARY_PATH=/opt/oracle/instantclient/lib:$LD_LIBRARY_PATH
  ```

**注:** Agent 6 は、Upstart または systemd を使用して `datadog-agent` サービスをオーケストレーションします。場合によっては、サービス構成ファイルに環境変数を追加する必要があります。サービス構成ファイルのデフォルトの場所は、`/etc/init/datadog-agent.conf` (Upstart) または `/lib/systemd/system/datadog-agent.service` (systemd) です。この設定を構成する方法については、[Upstart][5] または [systemd][6] に関するドキュメントを参照してください。

以下の例では、Upstart を使用して、システム上の Datadog Agent サービス構成ファイル (`/int/init/datadog-agent.conf`) に `LD_LIBRARY_PATH` を追加しています。

```
description "Datadog Agent"

start on started networking
stop on runlevel [!2345]

respawn
respawn limit 10 5
normal exit 0

# Agent からコンソールへのログの記録を無効にします。これは、Agent が既に、構成に応じて
# ファイルまたは syslog を使用してログを記録しているためです。重大なエラー/クラッシュのログを /var/log/upstart/datadog-agent.log に
# 記録するために、プロセスが何を出力したかを Upstart が記録するようにします。
console log
env DD_LOG_TO_CONSOLE=false
env LD_LIBRARY_PATH=/usr/lib/oracle/11.2/client64/lib/

setuid dd-agent

script
  exec /opt/datadog-agent/bin/agent/agent start -p /opt/datadog-agent/run/agent.pid
end script

post-stop script
  rm -f /opt/datadog-agent/run/agent.pid
end script
```

#### Datadog ユーザーの作成

Oracle Database サーバーへの適切なアクセス権を持つ、読み取り専用の `datadog` ユーザーを作成します。管理者ユーザー (SYSDBA` または `SYSOPER`) で Oracle Database に接続し、以下を実行します。

```
-- Oracle Script を有効にします。
ALTER SESSION SET "_ORACLE_SCRIPT"=true;

-- Datadog ユーザーを作成します。パスワードのプレースホルダーは、安全なパスワードに置き換えてください。
CREATE USER datadog IDENTIFIED BY <PASSWORD>;

-- Datadog ユーザーにアクセス権を付与します。
GRANT CONNECT TO datadog;
GRANT SELECT ON GV_$PROCESS TO datadog;
GRANT SELECT ON gv_$sysmetric TO datadog;
GRANT SELECT ON sys.dba_data_files TO datadog;
GRANT SELECT ON sys.dba_tablespaces TO datadog;
GRANT SELECT ON sys.dba_tablespace_usage_metrics TO datadog;
```

**注**: Oracle 11g を使用している場合、次の行を実行する必要はありません。

```
ALTER SESSION SET "_ORACLE_SCRIPT"=true;
```

### コンフィグレーション

サーバーとポートを指定し、監視するマスターを設定するには、[Agent の構成ディレクトリ][7]のルートにある `conf.d/` フォルダーの `oracle.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル oracle.d/conf.yaml][3] を参照してください。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `oracle` を探します。

## カスタムクエリ

カスタムクエリの指定もサポートされています。各クエリには、次の 3 つのパラメーターを含める必要があります。

| パラメーター | 説明 |
| ----      | ---         |
| `metric_prefix`  | 各メトリクスのプレフィックス。 |
| `query`  | 実行する SQL です。簡単なステートメントにすることも、複数行のスクリプトにすることもできます。結果のすべての行が評価されます。 |
| `columns` | 列を表すリストです。左から右の順に並べられます。次の 2 つの必須データがあります。<br> a. `type` - 送信方法 (`gauge`、`count` など)。<br> b. name - メトリクス名のサフィックス。これが `metric_prefix` に付加されて完全な名前になります。`type` が `tag` の場合、この列は、このクエリによって収集されるすべてのメトリクスに適用されるタグと見なされます。 |

オプションで、`tags` パラメーターを使用して、収集される各メトリクスにタグのリストを適用できます。

以下のメトリクスは

```
self.gauge('oracle.custom_query.metric1', value, tags=['tester:oracle', 'tag1:value'])
self.count('oracle.custom_query.metric2', value, tags=['tester:oracle', 'tag1:value'])
```

以下の構成例から作成されます。

```
- metric_prefix: oracle.custom_query
  query: |  # 複数行のスクリプトが必要な場合は、パイプを使用します。
   SELECT columns
   FROM tester.test_table
   WHERE conditions
  columns:
  # スキップする列にはこれを入れます。
  - {}
  - name: metric1
    type: gauge
  - name: tag1
    type: tag
  - name: metric2
    type: count
  tags:
  - tester:oracle
```

使用可能なすべての構成オプションの詳細については、[サンプル oracle.d/conf.yaml][3] を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "oracle" >}}


### イベント
Oracle Database チェックには、イベントは含まれません。

### サービスのチェック
**oracle.can_connect**
データベースが使用可能で接続を受け入れているかを検証します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/oracle/images/oracle_dashboard.png
[2]: https://www.oracle.com/technetwork/database/application-development/jdbc/downloads/index.html
[3]: https://github.com/DataDog/integrations-core/blob/master/oracle/datadog_checks/oracle/data/conf.yaml.example
[4]: https://www.oracle.com/technetwork/database/features/instant-client/index.htm
[5]: http://upstart.ubuntu.com/cookbook/#environment-variables
[6]: https://www.freedesktop.org/software/systemd/man/systemd.service.html#Command%20lines
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/oracle/metadata.csv
[10]: https://docs.datadoghq.com/ja/help
[11]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations


{{< get-dependencies >}}