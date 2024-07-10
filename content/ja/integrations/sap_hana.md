---
app_id: sap-hana
app_uuid: 53d66afa-de92-4f09-9514-778324f38f5c
assets:
  dashboards:
    SAP HANA Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: sap_hana.uptime
      metadata_path: metadata.csv
      prefix: sap_hana.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10076
    source_type_name: SAP HANA
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- data stores
- sap
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/sap_hana/README.md
display_on_public_website: true
draft: false
git_integration_title: sap_hana
integration_id: sap-hana
integration_title: SAP HANA
integration_version: 3.2.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: sap_hana
public_title: SAP HANA
short_description: SAP HANA システムのメモリ、ネットワーク、ボリューム、およびその他のメトリクスを監視します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::SAP
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: SAP HANA システムのメモリ、ネットワーク、ボリューム、およびその他のメトリクスを監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SAP HANA
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [SAP HANA][1] 2.0, SPS 2 を監視します。

## 計画と使用

### インフラストラクチャーリスト

SAP HANA チェックは、[Datadog Agent][2] のパッケージに含まれています。このインテグレーションを使用するには、[hdbcli][3] ライブラリを手動でインストールする必要があります。


Unix: の場合:

```text
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install hdbcli==2.10.15
```

Windows の場合:

```text
"C:\Program Files\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" -m pip install hdbcli==2.10.15
```

#### HANA の準備

特定のビューを照会するには、選択した HANA 監視ユーザーに特定の特権を付与する必要があります。詳細については、[権限の付与](#granting-privileges)を参照してください。

HANA テナント、シングルテナント、システムデータベースのポート番号を設定する方法については、[SAP への接続のドキュメント][4]を参照してください。

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

### ブラウザトラブルシューティング

1. sap_hana のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `sap_hana.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル sap_hana.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションの `sap_hana` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "sap_hana" >}}


### ヘルプ

SAP HANA には、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "sap_hana" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://www.sap.com/products/hana.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://pypi.org/project/hdbcli/
[4]: https://help.sap.com/viewer/0eec0d68141541d1b07893a39944924e/2.0.02/en-US/d12c86af7cb442d1b9f8520e2aba7758.html
[5]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/datadog_checks/sap_hana/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/