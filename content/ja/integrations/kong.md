---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/kong/README.md'
display_name: Kong
git_integration_title: kong
guid: f1098d6f-b393-4374-81c0-47c0a142aeef
integration_id: kong
integration_title: Kong
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kong.
metric_to_check: kong.total_requests
name: kong
process_signatures:
  - kong start
public_title: Datadog-Kong インテグレーション
short_description: 合計リクエスト数、応答コード数、クライアント接続数などを追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Agent の Kong チェックは、合計リクエスト数、応答コード数、クライアント接続数などを追跡します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照してこの手順を行ってください。

### インストール

Kong チェックは [Datadog Agent][2] パッケージに含まれています。Kong サーバーに追加でインストールする必要はありません。

### コンフィグレーション

[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `kong.d/conf.yaml` ファイルを編集します。

#### メトリクスの収集

1. [Kong のメトリクス](#metrics)の収集を開始するには、`kong.d/conf.yaml` ファイルに次の構成ブロックを追加します。

    ```yaml
      init_config:

      instances:
        # Each instance needs a `kong_status_url`. Tags are optional.
        - kong_status_url: http://example.com:8001/status/
          tags:
            - instance:foo
        - kong_status_url: http://example2.com:8001/status/
          tags:
            - instance:bar
    ```

    使用可能なすべての構成オプションの詳細については、[サンプル kong.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

#### ログの収集

**Agent 6.0 以上で使用可能**

Kong アクセスログは NGINX によって生成されます。したがって、デフォルトの場所は NGINX ファイルと同じです。

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

2. Kong のログの収集を開始するには、次の構成ブロックを `kong.d/conf.yaml` ファイルに追加します。

    ```
      logs:
        - type: file
          path: /var/log/nginx/access.log
          service: <SERVICE>
          source: kong

        - type: file
          path: /var/log/nginx/error.log
          service: <SERVICE>
          source: kong
    ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。
    使用可能なすべての構成オプションの詳細については、[サンプル kong.d/conf.yaml][3] を参照してください。

3. [Agent を再起動します][4]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `kong` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "kong" >}}


### イベント
Kong チェックには、イベントは含まれません。

### サービスのチェック

**kong.can_connect**:<br>
Agent が Kong に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

* [新しい Datadog インテグレーションを使用した Kong の監視][9]


[1]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/kong/datadog_checks/kong/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/kong/metadata.csv
[8]: https://docs.datadoghq.com/ja/help
[9]: https://www.datadoghq.com/blog/monitor-kong-datadog


{{< get-dependencies >}}