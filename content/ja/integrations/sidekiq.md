---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Sidekiq Overview: assets/dashboards/overview.json
  logs:
    source: sidekiq
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/sidekiq/README.md'
display_name: Sidekiq
draft: false
git_integration_title: sidekiq
guid: b4bc604c-73a5-4bd8-8dfe-3f80fc19976b
integration_id: sidekiq
integration_title: Sidekiq
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: sidekiq.
metric_to_check: sidekiq.jobs.count
name: sidekiq
public_title: Datadog-Sidekiq インテグレーション
short_description: Sidekiq ジョブ、キュー、バッチに関するメトリクスを追跡します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このインテグレーションは、[Sidekiq][1]〜[DogStatsD][2] を監視します。[Datadog の DogStatsD Ruby クライアント][3]を介してメトリクスを収集します。

**注** Sidekiq Pro (>= 3.6) または Enterprise (>= 1.1.0) のユーザーのみがメトリクスを収集できます。

## セットアップ

### インストール

Sidekiq インテグレーションは [Datadog Agent][4] にパッケージ化されています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

1. `dogstatsd-ruby` [gem][3] をインストールします。

   ```
    gem install dogstatsd-ruby --version '~> 4'
   ```

2. これをイニシャライザに含めることにより、Sidekiq Pro メトリクス収集を有効にします。

   ```ruby
        require 'datadog/statsd' # gem 'dogstatsd-ruby'

        Sidekiq::Pro.dogstatsd = ->{ Datadog::Statsd.new('metrics.example.com', 8125, namespace:'sidekiq') }

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

4. [Agent を再起動します][4]。

## 収集データ

### メトリクス
{{< get-metrics-from-git "sidekiq" >}}


Sidekiq インテグレーションでは、カスタムメトリクスも使用できます。カスタムメトリクスのアイデアについては、[Sidekiq のドキュメント][9]を参照してください。

### ログの収集


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

     `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。ログが見つからない場合は、[Sidekiq のドキュメントでログの詳細を確認][10]してください。

3. [Agent を再起動します][4]。

### サービスのチェック

Sidekiq には、サービスのチェック機能は含まれません。

### イベント

Sidekiq には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://sidekiq.org/
[2]: https://docs.datadoghq.com/ja/developers/dogstatsd/
[3]: https://github.com/DataDog/dogstatsd-ruby
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/mperham/sidekiq/wiki/Pro-Metrics
[6]: https://github.com/mperham/sidekiq/wiki/Ent-Historical-Metrics
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/
[8]: https://github.com/DataDog/integrations-core/blob/master/sidekiq/metadata.csv
[9]: https://github.com/mperham/sidekiq/wiki/Ent-Historical-Metrics#custom
[10]: https://github.com/mperham/sidekiq/wiki/Logging#log-file
[11]: https://docs.datadoghq.com/ja/help/