---
app_id: traefik
app_uuid: 3e412d36-f638-4cb0-9068-294aac7a84e2
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: traefik.total_status_code_count
      metadata_path: metadata.csv
      prefix: traefik.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10047
    source_type_name: Traefik
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- クラウド
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/traefik/README.md
display_on_public_website: true
draft: false
git_integration_title: traefik
integration_id: traefik
integration_title: Traefik
integration_version: 1.1.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: traefik
public_title: Traefik
short_description: traefik のメトリクスを収集
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: traefik のメトリクスを収集
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Traefik
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Traefik][1] のメトリクス、ログ、トレースを Datadog に送信し、Traefik サービスを監視します。

## 計画と使用

Traefik チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Traefik チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-traefik==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "v2" %}}

#### v2 について
v1 から v2 への変更点については、[Traefik 移行ガイド][1]を参照してください。最新バージョンについては、[Traefik のドキュメント][2]を参照してください。

#### メトリクスの収集

[Traefik のドキュメント][3]に従って、[Traefik メトリクス][4]を Datadog に送信してください。

#### 収集データ

**Agent 6.0 以上で使用可能**

[Traefik のログ][5]は、デフォルトで stdout に送信されます。Datadog Agent は、コンテナ `stdout`/`stderr` から直接ログを収集できるため、コンテナバージョンではこれを変更しないでください。

1. [Traefik がログをファイルに記録する][5]ように構成する場合は、Traefik 構成ファイルに以下を追加します。

   ```conf
   [traefikLog]
     filePath = "/path/to/traefik.log"
     format   = "json"
    ```

   [一般的な Apache Access 形式][6]がデフォルトで使用され、このインテグレーションでサポートされています。

2. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

3. Traefik ログの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][7]のルートにある `traefik.d/conf.yaml` ファイルに次のコンフィギュレーションブロックを追加します。

    ```yaml
    logs:
      - type: file
        path: /path/to/traefik.log
        source: traefik
        service: traefik
    ```

      `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。

4. [Agent を再起動します][8]。

#### トレースの収集

1. 必要に応じて、Datadog の [APM の有効化][9]を行います。
2. [Traefik のドキュメント][10]に従って、[トレース][11]を Datadog に送信してください。

[1]: https://doc.traefik.io/traefik/v2.0/migration/v1-to-v2/
[2]: https://doc.traefik.io/traefik/
[3]: https://doc.traefik.io/traefik/observability/metrics/datadog/
[4]: https://doc.traefik.io/traefik/observability/metrics/overview/
[5]: https://doc.traefik.io/traefik/observability/logs/#filepath
[6]: https://doc.traefik.io/traefik/observability/logs/#format
[7]: https://docs.datadoghq.com/ja/agent/faq/agent-configuration-files/#agent-configuration-directory
[8]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#start-stop-restart-the-agent
[9]: https://docs.datadoghq.com/ja/getting_started/tracing/#enable-apm
[10]: https://doc.traefik.io/traefik/observability/tracing/datadog/
[11]: https://doc.traefik.io/traefik/observability/tracing/overview/
{{% /tab %}}
{{% tab "v1" %}}

#### v1 について

v1 については [Traefik のドキュメント][1]を、v1 から v2 への変更点については [Traefik 移行ガイド][2]をご覧ください。

#### メトリクスの収集

1. Traefik の[メトリクス][2]を収集するには、[Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダ内の `traefik.d/conf.yaml` ファイルを開きます。

2. [メトリクス][2]の収集を開始するには、`traefik.d/conf.yaml` ファイルに次のコンフィギュレーションセットアップを追加します。

    ```yaml
    init_config:

    instances:
      - host: 10.1.2.3
        port: "8080"
        path: "/health"
        scheme: "http"
    ```

   構成オプション

    - host: クエリする Traefik エンドポイント。**必須**
    - port: Traefik エンドポイントの API リスナー。デフォルト値は `8080`。オプション
    - path: Traefik の健全性チェックエンドポイントのパス。デフォルトは `/health`。オプション
    - scheme: Traefik の健全性チェックエンドポイントのスキーム。デフォルトは `http`。_オプション_

3. [Agent を再起動][4]すると、Datadog への Traefik メトリクスの送信が開始されます。

使用可能なすべての構成オプションの詳細については、[サンプル traefik.d/conf.yaml][5] を参照してください。

#### 収集データ

**Agent 6.0 以上で使用可能**

[Traefik のログ][6]は、デフォルトで stdout に送信されます。Datadog Agent は、コンテナ `stdout`/`stderr` から直接ログを収集できるため、コンテナバージョンではこれを変更しないでください。

1. [Traefik がログをファイルに記録する][6]ように構成する場合は、Traefik 構成ファイルに以下を追加します。

    ```conf
    [traefikLog]
      filePath = "/path/to/traefik.log"
      format   = "json"
    ```

   [一般的な Apache Access 形式][7]がデフォルトで使用され、このインテグレーションでサポートされています。

2. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

3. Traefik ログの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][3]のルートにある `traefik.d/conf.yaml` ファイルに次のコンフィギュレーションブロックを追加します。

    ```yaml
    logs:
      - type: file
        path: /path/to/traefik.log
        source: traefik
        service: traefik
    ```

      `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。

4. [Agent を再起動します][4]。

#### トレースの収集

**Traefik v1.7+ で使用可能**

1. 必要に応じて、Datadog の [APM の有効化][8]を行います。
2. [Traefik のドキュメント][9]に従って、トレースを Datadog に送信してください。

[1]: https://doc.traefik.io/traefik/v1.7/
[2]: https://github.com/DataDog/integrations-extras/blob/master/traefik/metadata.csv
[3]: https://docs.datadoghq.com/ja/agent/faq/agent-configuration-files/#agent-configuration-directory
[4]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#start-stop-restart-the-agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/traefik/datadog_checks/traefik/data/conf.yaml.example
[6]: https://doc.traefik.io/traefik/v1.7/configuration/logs/#traefik-logs
[7]: https://doc.traefik.io/traefik/v1.7/configuration/logs/#clf-common-log-format
[8]: https://docs.datadoghq.com/ja/getting_started/tracing/#enable-apm
[9]: https://doc.traefik.io/traefik/v1.7/configuration/tracing/#datadog
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで `traefik` を探します。

## 互換性

このチェックは、すべての主要プラットフォームと互換性があります。

**メトリクス**

v2 については、Datadog に送られる [Traefik メトリクス][6]のリストをご覧ください。

v1 については、インテグレーションによって提供される[メトリクス][7]のリストを参照してください。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "traefik" >}}


### ヘルプ

Traefik チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "traefik" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://traefik.io
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[6]: https://doc.traefik.io/traefik/observability/metrics/overview/
[7]: https://docs.datadoghq.com/ja/integrations/traefik/#metrics
[8]: https://docs.datadoghq.com/ja/help