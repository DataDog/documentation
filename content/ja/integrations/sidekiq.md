---
app_id: sidekiq
app_uuid: c42a2d39-16db-4256-a6fb-287602ec4661
assets:
  dashboards:
    Sidekiq Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: sidekiq.jobs.count
      metadata_path: metadata.csv
      prefix: sidekiq.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10093
    source_type_name: Sidekiq
  logs:
    source: sidekiq
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/sidekiq/README.md
display_on_public_website: true
draft: false
git_integration_title: sidekiq
integration_id: sidekiq
integration_title: Sidekiq
integration_version: 1.4.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: sidekiq
public_title: Sidekiq
short_description: Sidekiq ジョブ、キュー、バッチに関するメトリクスを追跡します。
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
  - Category::Log Collection
  configuration: README.md#Setup
  description: Sidekiq ジョブ、キュー、バッチに関するメトリクスを追跡します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Sidekiq
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このインテグレーションは、[Sidekiq][1]〜[DogStatsD][2] を監視します。[Datadog の DogStatsD Ruby クライアント][3]を介してメトリクスを収集します。

**注** Sidekiq Pro (>= 3.6) または Enterprise (>= 1.1.0) のユーザーのみがメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

Sidekiq インテグレーションは [Datadog Agent][4] にパッケージ化されています。
サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

1. `dogstatsd-ruby` [gem][3] をインストールします。

   ```
    gem install dogstatsd-ruby
   ```

2. Sidekiq Pro メトリクス収集を初期化子に含めることで有効にします。コンテナ化されたデプロイの場合は、`localhost` を Agent のコンテナのアドレスに更新します。

   ```ruby
        require 'datadog/statsd' # gem 'dogstatsd-ruby'

        Sidekiq::Pro.dogstatsd = ->{ Datadog::Statsd.new('localhost', 8125, namespace:'sidekiq') }

        Sidekiq.configure_server do |config|
          config.server_middleware do |chain|
            require 'sidekiq/middleware/server/statsd'
            chain.add Sidekiq::Middleware::Server::Statsd
          end
        end
   ```

   Sidekiq Enterprise を使用していて、履歴メトリクスを収集する場合は、次の行も含めます。

   ```ruby
          Sidekiq.configure_server do |config|
            # history is captured every 30 seconds by default
            config.retain_history(30)
          end
   ```

    詳細については、Sidekiq [Pro][5] および [Enterprise][6] のドキュメントを参照してください。詳細なコンフィギュレーションオプションについては、[DogStatsD Ruby][3] のドキュメントを参照してください。

3. 下記のコンフィギュレーションを追加して、[Datadog Agent のメインコンフィギュレーションファイル][7]である `datadog.yaml` を更新します。

   ```yaml
   # dogstatsd_mapper_cache_size: 1000  # default to 1000
   dogstatsd_mapper_profiles:
     - name: sidekiq
       prefix: "sidekiq."
       mappings:
         - match: 'sidekiq\.sidekiq\.(.*)'
           match_type: "regex"
           name: "sidekiq.$1"
         - match: 'sidekiq\.jobs\.(.*)\.perform'
           name: "sidekiq.jobs.perform"
           match_type: "regex"
           tags:
             worker: "$1"
         - match: 'sidekiq\.jobs\.(.*)\.(count|success|failure)'
           name: "sidekiq.jobs.worker.$2"
           match_type: "regex"
           tags:
             worker: "$1"
    ```

   これらのパラメーターは、Datadog Agent に `DD_DOGSTATSD_MAPPER_PROFILES` 環境変数を追加することで設定することも可能です。

4. [Agent を再起動します][8]。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "sidekiq" >}}


Sidekiq インテグレーションでは、カスタムメトリクスも使用できます。カスタムメトリクスのアイデアについては、[Sidekiq Enterprise Historical Metrics][10] を参照してください。

### 収集データ

1. Datadog Agent でのログ収集は、デフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

2. Sidekiq のログの収集を開始するには、次のコンフィギュレーションブロックを `sidekiq.d/conf.yaml` ファイルに追加します。

    ```yaml
      logs:
        - type: file
          path:  /var/log/sidekiq.log
          source: sidekiq
          service: <SERVICE>
    ```

     `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。ログが見つからない場合は、[Sidekiq Logging][11] を参照してください。

3. [Agent を再起動します][8]。

### ヘルプ

Sidekiq には、サービスのチェック機能は含まれません。

### ヘルプ

Sidekiq には、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://sidekiq.org/
[2]: https://docs.datadoghq.com/ja/developers/dogstatsd/
[3]: https://github.com/DataDog/dogstatsd-ruby
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/mperham/sidekiq/wiki/Pro-Metrics
[6]: https://github.com/mperham/sidekiq/wiki/Ent-Historical-Metrics
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://github.com/DataDog/integrations-core/blob/master/sidekiq/metadata.csv
[10]: https://github.com/mperham/sidekiq/wiki/Ent-Historical-Metrics#custom
[11]: https://github.com/mperham/sidekiq/wiki/Logging#log-file
[12]: https://docs.datadoghq.com/ja/help/