---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/haproxy/README.md'
description: HAProxy インテグレーションは、パフォーマンスおよび可用性メトリクスの収集に役立ちます。 metrics from HAProxy instances.
display_name: HAProxy
git_integration_title: haproxy
guid: cd935030-131f-4545-8b6a-a4ca21b8565b
integration_id: haproxy
integration_title: HAProxy
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: haproxy.
metric_to_check: haproxy.frontend.bytes.in_rate
name: haproxy
process_signatures:
  - haproxy
  - haproxy-master
  - haproxy-controller
public_title: Datadog-HAProxy インテグレーション
short_description: リクエスト、応答、エラー、処理バイト数などのキーメトリクスを監視 and more.
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![HAProxy 付属のダッシュボード][1]

## 概要

Datadog で HAProxy のアクティビティをキャプチャして、以下のことができます。

* HAProxy の負荷分散パフォーマンスを視覚化できます。
* サーバーがダウンしたときに気付くことができます。
* HAProxy のパフォーマンスを他のアプリケーションと関連付けることができます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

HAProxy チェックは Agent にパッケージ化されています。HAProxy のメトリクスとログの収集を開始するには、以下を行ってください。

1. HAProxy サーバーに [Agent をインストール][3]します。
2. HAProxy の構成で統計が有効になっていることを確認します。詳細は、[HAProxy メトリクスの収集に関するブログ記事][4]を参照してください。

### コンフィグレーション

HAProxy の[メトリクス](#metric-collection)と[ログ](#log-collection)の収集を開始するには、[Agent の構成ディレクトリ][5]のルートにある `conf.d/` フォルダーの `haproxy.d/conf.yaml` ファイルを編集します。
使用可能なすべての構成オプションの詳細については、[サンプル haproxy.d/conf.yaml][6] を参照してください。

#### HAProxy の準備

Agent は、メトリクスを統計エンドポイント経由で収集します。

1. `haproxy.conf` で統計エンドポイントを構成します。

```
    listen stats # 「stats」という listen セクションを定義します
    bind :9000 # localhost:9000 でリスニングします
    mode http
    stats enable  # 統計ページを有効にします
    stats hide-version  # HAProxy のバージョンを非表示にします
    stats realm Haproxy\ Statistics  # ポップアップウィンドウのタイトルテキスト
    stats uri /haproxy_stats  # 統計 URI
    stats auth Username:Password  # 認証資格情報
```

2. [HAProxy を再起動して、統計エンドポイントを有効にします][7]。

#### メトリクスの収集

[Haproxy のメトリクス](#metrics)の収集を開始するには、`haproxy.d/conf.yaml` ファイルに次の構成ブロックを追加します。

```
  init_config:

  instances:
      - url: https://localhost:9000/haproxy_stats
        username: <your_username>
        password: <your_password>
```

使用可能なすべての構成オプションの詳細については、[サンプル haproxy.yaml][6] を参照してください。

*  [Agent を再起動します][8]。

#### ログの収集

**Agent 6.0 以上で使用可能**

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

2. Haproxy のログの収集を開始するには、次の構成ブロックを `haproxy.d/conf.yaml` ファイルに追加します。

    ```yaml
      logs:
          - type: udp
            port: 514
            service: haproxy
            source: haproxy
            sourcecategory: http_web_access
    ```

    環境に合わせて、`service` パラメーターの値を変更して構成してください。使用可能なすべての構成オプションの詳細については、[サンプル haproxy.d/conf.yaml][6] を参照してください。

3. [Agent を再起動します][8]。

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションで `haproxy` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "haproxy" >}}


### イベント
Haproxy チェックには、イベントは含まれません。

### サービスのチェック
**haproxy.backend_up**:<br>
HAProxy のステータスページをサービスチェックに変換します。
特定のサービスについて、HAProxy が `down` と報告している場合は、`CRITICAL` を返します。
`maint`、`ok` などの他の状態の場合は、`OK` を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

## その他の参考資料

* [HAProxy パフォーマンスメトリクスの監視][13]
* [HAProxy メトリクスの収集方法][14]
* [Datadog を使用した HAProxy の監視][15]
* [HAProxy のマルチプロセス構成][16]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/39f2cb0977c0e0446a0e905d15d2e9a4349b3b5d/haproxy/images/haproxy-dash.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://www.datadoghq.com/blog/how-to-collect-haproxy-metrics
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example
[7]: https://www.haproxy.org/download/1.7/doc/management.txt
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/haproxy/metadata.csv
[12]: https://docs.datadoghq.com/ja/help
[13]: https://www.datadoghq.com/blog/monitoring-haproxy-performance-metrics
[14]: https://www.datadoghq.com/blog/how-to-collect-haproxy-metrics
[15]: https://www.datadoghq.com/blog/monitor-haproxy-with-datadog
[16]: https://docs.datadoghq.com/ja/integrations/faq/haproxy-multi-process


{{< get-dependencies >}}