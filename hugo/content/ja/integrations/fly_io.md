---
app_id: fly-io
app_uuid: 43885e54-474b-43a8-bb02-ecfc2037b674
assets:
  dashboards:
    'Fly.io Overview ': assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - fly_io.instance.up
      - fly_io.machine.cpus.count
      metadata_path: metadata.csv
      prefix: fly_io.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 18060085
    source_type_name: Fly.io
  monitors:
    Fly.io App Suspended: assets/monitors/app_suspended.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
- cloud
- log collection
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/fly_io/README.md
display_on_public_website: true
draft: false
git_integration_title: fly_io
integration_id: fly-io
integration_title: Fly.io
integration_version: 2.1.0
is_public: true
manifest_version: 2.0.0
name: fly_io
public_title: Fly.io
short_description: Fly.io のアプリとマシンを監視します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::OS & System
  - Category::Cloud
  - Category::Log Collection
  - Submitted Data Type::Metrics
  - Submitted Data Type::Traces
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Fly.io のアプリとマシンを監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Fly.io
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


<div class="alert alert-warning">
このインテグレーションは公開ベータ版です。本番ワークロードで有効化する場合は注意してください。
</div>

## 概要

このチェックは Datadog Agent を通じて [Fly.io][1] のメトリクスを監視します。

## セットアップ

Fly アプリケーション上で実行中の Agent に対して、このチェックをインストールし構成するには、以下の手順に従ってください。

### インストール

Fly.io チェックは [Datadog Agent][2] パッケージに含まれています。Datadog Agent の実行専用として 1 つの Fly.io アプリケーションをデプロイすることを推奨します。この Agent は Fly.io チェックを実行し、[Prometheus メトリクス][3] に加えて [Machines API][4] からの追加データも収集します。さらに、組織内のすべての Fly.io アプリケーションから [トレース](#Application-Traces) とカスタム メトリクスを Agent で受信するよう構成できます。

#### Datadog Agent を Fly.io アプリケーションとしてデプロイする

1. Fly.io で新しいアプリケーションを作成し、起動時のイメージに [Datadog Agent][5] を指定するか、`fly.toml` ファイルでイメージを指定します:

    ```
    [build]
        image = 'gcr.io/datadoghq/agent:7'
    ```

2. Datadog API キー用に `DD_API_KEY` という [シークレット][6] を設定し、任意で [サイト][7] を `DD_SITE` として設定します。

3. アプリのディレクトリで Fly.io インテグレーション用の `conf.yaml` を作成し、インテグレーションを [構成](#Configuration) したうえで、Agent の `conf.d/fly_io.d/` ディレクトリに `conf.yaml` としてマウントします:

    ```
    instances:
    - empty_default_hostname: true
      headers:
          Authorization: Bearer <YOUR_FLY_TOKEN>
      machines_api_endpoint: http://_api.internal:4280
      org_slug: <YOUR_ORG_SLUG>
    ```

4. アプリを [デプロイ][8] します。

**注**: アプリケーションからトレースとカスタム メトリクスを収集する場合は、[アプリケーション トレース](#Application-traces) を参照してください。

### 構成

1. Agent の構成ディレクトリのルートにある `conf.d/` フォルダ内の `fly_io.d/conf.yaml` を編集して、Fly.io のパフォーマンス データの収集を開始します。利用可能なすべての構成オプションは [サンプル fly_io.d/conf.yaml][9] を参照してください。

2. [Agent を再起動します][10]。

### 検証

[Agent の status サブコマンドを実行][11] し、Checks セクションに `fly_io` が表示されることを確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "fly_io" >}}


### イベント

Fly.io インテグレーションには、イベントは含まれません。

### サービス チェック

Fly.io インテグレーションには、サービス チェックは含まれません。

### アプリケーション トレース

Fly.io 環境のアプリケーションでトレースを収集するには、次の手順に従います。

1. アプリケーションを [インスツルメント][13] します。
2. Datadog Agent を Fly.io アプリケーションとして [デプロイ](#deploying-the-agent-as-a-flyio-application) します。
3. アプリケーションの `fly.toml` または `Dockerfile` に必要な環境変数を設定し、アプリをデプロイします。

    Datadog Agent アプリケーションにメトリクスを送信するため、次を環境変数として設定します:
    ```
    [env]
        DD_AGENT_HOST="<YOUR_AGENT_APP_NAME>.internal"

    ```

    ログとメトリクスで同じホストを報告するために、次の環境変数を設定します:
    ```
    DD_TRACE_REPORT_HOSTNAME="true"
    ```

    [統合サービス タグ付け][14] を利用するには、以下の環境変数を設定します:
    ```
    DD_SERVICE="APP_NAME"
    DD_ENV="ENV_NAME"
    DD_VERSION="VERSION"
    ```

    ログとトレースを相関させるには、これらの [手順][15] に従い、次の環境変数を設定します:
    ```
    DD_LOGS_INJECTION="true"
    ```

4. [Datadog Agent アプリケーション](#Deploying-the-agent-as-a-Fly.io-application) の `fly.toml` に次の環境変数を設定し、アプリをデプロイします:

    ```
    [env]
        DD_APM_ENABLED = "true"
        DD_APM_NON_LOCAL_TRAFFIC = "true"
        DD_DOGSTATSD_NON_LOCAL_TRAFFIC = "true"
        DD_BIND_HOST = "fly-global-services"
    ```

**注**: APM と DogStatsD を有効化する場合は、それらのポートが外部に公開されないように Fly.io インスタンスの設定を確認してください。

### ログ収集

Fly.io アプリケーションからログを収集するには、[fly_logs_shipper][16] を使用します。

1. ログ シッパーの [プロジェクト][16] をクローンします。

2. `vector-configs/vector.toml` を変更し、ログのソースを `fly_io` に設定します:

    ```
    [transforms.log_json]
    type = "remap"
    inputs = ["nats"]
    source  = '''
    . = parse_json!(.message)
    .ddsource = 'fly-io'
    .host = .fly.app.instance
    .env = <YOUR_ENV_NAME>
    '''
    ```

この構成は Fly.io 固有の基本的なログ属性を解析します。すべてのログ属性を完全に解析するには、[Vector transforms][18] を使用してアプリごとに `ddsource` を [既知の ログ インテグレーション][17] に設定してください。

3. [NATS][19] 用の [シークレット][6] を設定します:
`ORG` と `ACCESS_TOKEN`

4. [Datadog][20] 用の [シークレット][6] を設定します: `DATADOG_API_KEY` と `DATADOG_SITE`

5. ログ シッパー アプリを [デプロイ][11] します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][21]までお問い合わせください。


[1]: https://fly.io/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://fly.io/docs/metrics-and-logs/metrics/#prometheus-on-fly-io
[4]: https://fly.io/docs/machines/api/
[5]: https://console.cloud.google.com/artifacts/docker/datadoghq/us/gcr.io/agent
[6]: https://fly.io/docs/flyctl/secrets/
[7]: https://docs.datadoghq.com/ja/agent/troubleshooting/site/
[8]: https://fly.io/docs/flyctl/deploy/
[9]: https://github.com/DataDog/integrations-core/blob/master/fly_io/datadog_checks/fly_io/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/fly_io/metadata.csv
[13]: https://docs.datadoghq.com/ja/tracing/trace_collection/#instrumentation-types
[14]: https://docs.datadoghq.com/ja/getting_started/tagging/unified_service_tagging/?tab=docker#configuration-1
[15]: https://docs.datadoghq.com/ja/tracing/other_telemetry/connect_logs_and_traces/
[16]: https://github.com/superfly/fly-log-shipper
[17]: https://docs.datadoghq.com/ja/logs/log_configuration/pipelines/?tab=source#integration-pipeline-library
[18]: https://vector.dev/docs/reference/configuration/transforms/lua/
[19]: https://github.com/superfly/fly-log-shipper?tab=readme-ov-file#nats-source-configuration
[20]: https://github.com/superfly/fly-log-shipper?tab=readme-ov-file#datadog
[21]: https://docs.datadoghq.com/ja/help/