---
app_id: vertica
app_uuid: c5946789-de76-4ec6-9485-db83dd66fd28
assets:
  dashboards:
    Vertica Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: vertica.connection.active
      metadata_path: metadata.csv
      prefix: vertica.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10072
    source_type_name: Vertica
  logs:
    source: vertica
  monitors:
    '[Vertica] Nodes down above K-safety level': assets/monitors/vertica_replication_safety.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- data stores
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/vertica/README.md
display_on_public_website: true
draft: false
git_integration_title: vertica
integration_id: vertica
integration_title: Vertica
integration_version: 4.5.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: vertica
public_title: Vertica
short_description: Vertica のプロジェクションストレージやライセンスの使用状況などを監視します。
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
  description: Vertica のプロジェクションストレージやライセンスの使用状況などを監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Vertica
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Vertica][1] を監視します。

## 計画と使用

### インフラストラクチャーリスト

Vertica チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

vertica のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `vertica.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、サンプル [vertica.d/conf.yaml][3] を参照してください。

#### SSL の有効化

Vertica インテグレーションは、SSL を使用した Vertica への接続をサポートします。これを有効にするには、`conf.yaml` の `use_tls` を `true` にします。

注: Vertica インテグレーションのバージョン 1.9.0 以前では、`tls_verify` を `true` にします。レガシーのサポートとして、`tls_verify` が明示的に `true` に設定されている場合、`use_tls` は `true` に設定されます。

#### Vertica の準備

Datadog Agent のデータベースユーザーを作成します。[vsql][4] から、スーパーユーザーとしてデータベースに接続します。次に、`CREATE USER` ステートメントを実行します。

```text
CREATE USER datadog IDENTIFIED BY '<パスワード>';
```

モニタリングシステムテーブルにアクセスするには、データベースへの接続に使用するユーザーに [SYSMONITOR][5] ロールを付与する必要があります。

```text
GRANT SYSMONITOR TO datadog WITH ADMIN OPTION;
```

現在のライセンス使用のメトリクスは最新の[監査][6]の値を使用するため、Datadog は監査をできるだけ頻繁にスケジュールすることをお勧めします。詳細については、[Vertica 監査ライセンスガイド][7]を参照してください。

[Agent を再起動][8]すると、Datadog への Vertica メトリクスの送信が開始されます。

#### 収集データ

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. Vertica のログの収集を開始するには、次の構成ブロックを `vertica.d/conf.yaml` ファイルに追加します。

    ```yaml
    logs:
      - source: vertica
        type: file
        path: "/<CATALOG_PATH>/<DATABASE_NAME>/<NODE_NAME>_catalog/vertica.log"
        service: vertica
    ```

3. [Agent を再起動します][8]。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `vertica` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "vertica" >}}


### ヘルプ

Vertica には、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "vertica" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。


[1]: https://www.vertica.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/vertica/datadog_checks/vertica/data/conf.yaml.example
[4]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/Glossary/vsql.htm
[5]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/AdministratorsGuide/DBUsersAndPrivileges/Roles/SYSMONITORROLE.htm
[6]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/SQLReferenceManual/Functions/VerticaFunctions/LicenseManagement/AUDIT_LICENSE_SIZE.htm
[7]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/AdministratorsGuide/Licensing/MonitoringDatabaseSizeForLicenseCompliance.htm
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/vertica/metadata.csv
[11]: https://github.com/DataDog/integrations-core/blob/master/vertica/assets/service_checks.json
[12]: https://docs.datadoghq.com/ja/help/