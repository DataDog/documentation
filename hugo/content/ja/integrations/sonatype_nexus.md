---
app_id: sonatype-nexus
app_uuid: 6cec5ac3-a686-4408-936d-26f19fa6763a
assets:
  dashboards:
    Sonatype Nexus Instance Health: assets/dashboards/sonatype_nexus_instance_health.json
    Sonatype Nexus Metrics: assets/dashboards/sonatype_nexus_metrics.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check:
      - sonatype_nexus.analytics.available_cpus
      - sonatype_nexus.status.available_cpus_health
      metadata_path: metadata.csv
      prefix: sonatype_nexus.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 34928997
    source_type_name: sonatype_nexus
  monitors:
    High Number of Failed Unique User Authentication Detected: assets/monitors/high_number_of_failed_unique_user_authentication_detected.json
    High Percentage of JVM Heap Memory Usage Detected: assets/monitors/high_percentage_of_jvm_heap_memory_usage_detected.json
    Unhealthy Available CPUs Detected: assets/monitors/unhealthy_available_cpus_detected.json
    Unhealthy Blob Stores Detected: assets/monitors/unhealthy_blob_stores_detected.json
    Unhealthy Thread Deadlock Detected: assets/monitors/unhealthy_thread_deadlock_detected.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- モニター
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/sonatype_nexus/README.md
display_on_public_website: true
draft: false
git_integration_title: sonatype_nexus
integration_id: sonatype-nexus
integration_title: Sonatype Nexus
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: sonatype_nexus
public_title: Sonatype Nexus
short_description: Sonatype Nexus の分析指標とインスタンス ヘルス データを可視化します。
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Sonatype Nexus の分析指標とインスタンス ヘルス データを可視化します。
  media:
  - caption: Sonatype Nexus Instance Health
    image_url: images/sonatype_nexus_instance_health.png
    media_type: image
  - caption: Sonatype Nexus Metrics
    image_url: images/sonatype_nexus_metrics_1.png
    media_type: image
  - caption: Sonatype Nexus Metrics
    image_url: images/sonatype_nexus_metrics_2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Sonatype Nexus
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

Sonatype Nexus は、ソフトウェア開発ライフサイクル全体を通して、ソフトウェア コンポーネントと依存関係を管理するための代表的なリポジトリ管理ソリューションです。幅広い開発言語やフォーマットに対応しており、DevOps や継続的インテグレーションと継続的デリバリー (CI/CD) パイプラインの中核として活用できます。

Sonatype Nexus インテグレーションは、Sonatype Nexus から分析指標とインスタンス ヘルス ステータスのメトリクスを収集し、包括的に分析できるよう Datadog に送信します。

## セットアップ

### インストール

Sonatype Nexus チェックは [Datadog Agent パッケージ][1] に含まれています。追加のインストールは不要です。

### Sonatype Nexus から API 認証情報を取得する

1. **Administrator** アカウント、または **nx-metrics-all** 権限を持つユーザーの `Username` と `Password`

2. リポジトリ インスタンスの `Server URL` (例: https://123.123.123.123:8081)

### Sonatype Nexus アカウントを Datadog Agent に接続する

1. Copy the `conf.yaml.example` file.

   ```sh
   cp /etc/datadog-agent/conf.d/sonatype_nexus.d/conf.yaml.example /etc/datadog-agent/conf.d/sonatype_nexus.d/conf.yaml
   ```

2. `/etc/datadog-agent/conf.d/sonatype_nexus.d/conf.yaml` ファイルを編集し、以下の設定を追加します。

    ```yaml
    instances:

        ## @param username - string - required
        ## Username of Sonatype Nexus instance
        #
      - username: <SONATYPE_NEXUS_USERNAME>

        ## @param password - string - required
        ## Password of Sonatype Nexus instance
        #
        password: <SONATYPE_NEXUS_PASSWORD>

        ## @param server_url - string - required
        ## Sonatype Nexus server url
        #
        server_url: <SONATYPE_NEXUS_SERVER_URL>

        ## @param min_collection_interval - number - required
        ## This changes the collection interval of the check. For more information, see:
        ## https://docs.datadoghq.com/developers/write_agent_check/#collection-interval
        #
        min_collection_interval: 600
    ```
* Sonatype Nexus を複数インスタンスで設定している場合の `conf.yaml` の例:

    ```yaml
    instances:
      - min_collection_interval: 1800
        username: <SONATYPE_NEXUS_USERNAME>
        password: <SONATYPE_NEXUS_PASSWORD>
        server_url: <SONATYPE_NEXUS_SERVER_URL>
      - min_collection_interval: 1800
        username: <SONATYPE_NEXUS_USERNAME>
        password: <SONATYPE_NEXUS_PASSWORD>
        server_url: <SONATYPE_NEXUS_SERVER_URL>
    ```

3. [Agent を再起動します][2]。

### 検証

- [Agent の status サブコマンド][3] を実行し、Checks セクションで `sonatype_nexus` を確認します。

## 収集データ

### ログ
Sonatype Nexus インテグレーションにはログの収集は含まれません。

### メトリクス

Sonatype Nexus インテグレーションは、分析指標とインスタンス ヘルス ステータスのメトリクスを収集して Datadog に転送します。

{{< get-metrics-from-git "sonatype_nexus" >}}

### イベント

Sonatype Nexus インテグレーションは `sonatype_nexus.authentication_validation` イベントを Datadog に転送します。

### サービスチェック

このインテグレーションが提供するサービス チェックの一覧は、 [service_checks.json][4] を参照してください。

## サポート

追加のサポートが必要な場合は、 [Datadog サポート][5] へお問い合わせください。


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://github.com/DataDog/integrations-core/blob/master/sonatype_nexus/assets/service_checks.json
[5]: https://docs.datadoghq.com/ja/help/