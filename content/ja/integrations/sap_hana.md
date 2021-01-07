---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    SAP HANA Overview: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/sap_hana/README.md'
display_name: SAP HANA
draft: false
git_integration_title: sap_hana
guid: 85dace7c-baf5-4bcc-9fbb-4d3a6b841359
integration_id: sap-hana
integration_title: SAP HANA
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: sap_hana.
metric_to_check: sap_hana.uptime
name: sap_hana
public_title: Datadog-SAP HANA インテグレーション
short_description: SAP HANA システムのメモリ、ネットワーク、ボリューム、およびその他のメトリクスを監視します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて [SAP HANA][1] 2.0, SPS 2 を監視します。

## セットアップ

### インストール

SAP HANA チェックは [Datadog Agent][2] パッケージに含まれています。

#### HANA の準備

特定のビューを照会するには、選択した HANA 監視ユーザーに特定の特権を付与する必要があります。詳細については、[権限の付与](#granting-privileges)を参照してください。

HANA テナント、シングルテナント、システムデータベースのポート番号を設定する方法については、[SAP への接続のドキュメント][3]を参照してください。

##### ユーザーの作成

1. システムデータベースに接続し、次のコマンドを実行してユーザーを作成します。

   ```shell
   CREATE RESTRICTED USER <USER> PASSWORD <PASSWORD>;
   ```

2. 次のコマンドを実行して、ユーザーがシステムに接続できるようにします。

   ```shell
   ALTER USER <USER> ENABLE CLIENT CONNECT;
   ```

3. （任意）サービスの中断を回避するために、パスワードの有効期間を長くすることができます。

   ```shell
   ALTER USER <USER> DISABLE PASSWORD LIFETIME;
   ```

##### 権限の付与

1. 次のコマンドを実行して監視ロールを作成します（これらの例では `DD_MONITOR` と呼びます）。

   ```shell
   CREATE ROLE DD_MONITOR;
   ```

2. 次のコマンドを実行して、すべてのシステムビューへの読み取り専用アクセスを許可します。

   ```shell
   GRANT CATALOG READ TO DD_MONITOR;
   ```

3. 次に、次のコマンドを実行して、各システムビューで選択権限を付与します。

   ```shell
   GRANT SELECT ON SYS.M_DATABASE TO DD_MONITOR;
   GRANT SELECT ON SYS.M_DATABASES TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_BACKUP_PROGRESS TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_CONNECTIONS TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_DISK_USAGE TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_LICENSES TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_RS_MEMORY TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_SERVICE_COMPONENT_MEMORY TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_SERVICE_MEMORY TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_SERVICE_STATISTICS TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_VOLUME_IO_TOTAL_STATISTICS TO DD_MONITOR;
   ```

4. 最後に、次のコマンドを実行して、目的のユーザーに監視ロールを割り当てます。

   ```shell
   GRANT DD_MONITOR TO <USER>;
   ```

### コンフィギュレーション

1. sap_hana のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `sap_hana.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル sap_hana.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションの `sap_hana` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "sap_hana" >}}


### サービスのチェック

**sap_hana.can_connect**:<br>
Agent が監視対象の SAP HANA システムに接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**sap_hana.status**:<br>
監視対象の SAP HANA データベースが起動している場合は、`OK` を返します。それ以外の場合は、`CRITICAL` を返します。

### イベント

SAP HANA には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://www.sap.com/products/hana.html
[2]: https://docs.datadoghq.com/ja/agent/
[3]: https://help.sap.com/viewer/0eec0d68141541d1b07893a39944924e/2.0.02/en-US/d12c86af7cb442d1b9f8520e2aba7758.html
[4]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/datadog_checks/sap_hana/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/