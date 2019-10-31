---
aliases:
  - /ja/logs/log_collection/fluentd
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/fluentd/README.md'
display_name: fluentd
git_integration_title: fluentd
guid: 68100352-b993-43e6-9dc8-5ecd498e160b
integration_id: fluentd
integration_title: FluentD
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: fluentd.
metric_to_check: fluentd.buffer_queue_length
name: fluentd
process_signatures:
  - td-agent
  - fluentd
  - ruby td-agent
public_title: Datadog-FluentD インテグレーション
short_description: Fluentd プラグインごとのバッファキューと再試行回数を監視 you've enabled.
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Fluentd ダッシュボード][1]

## 概要

Fluentd からメトリクスを取得して、以下のことができます。

* Fluentd のパフォーマンスを視覚化できます。
* Fluentd のパフォーマンスを他のアプリケーションと関連付けることができます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Fluentd チェックは [Datadog Agent][3] パッケージに含まれています。Fluentd サーバーに追加でインストールする必要はありません。

### コンフィグレーション

FluentD の[メトリクス](#metric-collection)と[ログ](#log-collection)の収集を開始するには、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `fluentd.d/conf.yaml` ファイルを編集します。
使用可能なすべての構成オプションの詳細については、[サンプル fluentd.d/conf.yaml][5] を参照してください。

#### Fluentd の準備

fluentd 構成ファイルで、次のように `monitor_agent` ソースを追加します。

```
<source>
  @type monitor_agent
  bind 0.0.0.0
  port 24220
</source>
```

#### メトリクスの収集

1. [Fluentd のメトリクス](#metrics)の収集を開始するには、`fluentd.d/conf.yaml` ファイルに次の構成ブロックを追加します。

    ```yaml
      init_config:

      instances:
        - monitor_agent_url: http://localhost:24220/api/plugins.json
          #tag_by: "type" # defaults to 'plugin_id'
          #plugin_ids:    # collect metrics only on your chosen plugin_ids (optional)
          #  - plg1
          #  - plg2
    ```

    使用可能なすべての構成オプションの詳細については、[サンプル fluentd.d/conf.yaml][5] を参照してください。

2. [Agent を再起動][6]すると、Datadog への Fluentd メトリクスの送信が開始されます。

#### ログの収集

FluentD のログを TCP/UDP 経由で特定のポートに転送できるのであれば、その方法で FluentD のログを Datadog Agent に転送できます。ただし、別の方法として、[Datadog の FluentD プラグイン][7]を使用して FluentD から Datadog アカウントへログを直接転送することもできます。

##### ログへのメタデータの追加

適切なメタデータ (ホスト名、ソースなど) は、Datadog でログの可能性をフルに引き出すためのカギです。デフォルトでは、ホスト名およびタイムスタンプフィールドが、[予約済み属性の再マップ][8]によって適切に再マップされます。

##### ソースとカスタムタグ

Datadog で[インテグレーションの自動セットアップ][10]をトリガーするには、ログに `ddsource` 属性を追加して、[ログのインテグレーションの名前][9]を設定します。
[インフラストラクチャーリスト][12]に一致するホスト名があれば、[ホストタグ][11]がログに自動的に設定されます。ログにカスタムタグを追加する場合は、`ddtags` 属性を使用します。

セットアップ例:

```
  # 「datadog.**」のタグが付いたイベントを
  # Datadog に送信します。

<match datadog.**>

  @type datadog
  @id awesome_agent
  api_key <your_api_key>

  # オプション
  include_tag_key true
  tag_key 'tag'

  # オプションのタグ
  dd_source '<INTEGRATION_NAME>'
  dd_tags '<KEY1:VALUE1>,<KEY2:VALUE2>'
  dd_sourcecategory '<SOURCE_CATEGORY>'

</match>
```

以下の追加パラメーターを使用すると、プロキシを通過するために、使用するエンドポイントを変更できます。

* `host`: ログが Datadog に直接転送されない場合のプロキシエンドポイント (デフォルト値は `intake.logs.datadoghq.com`)
* `port`: ログが Datadog に直接転送されない場合のプロキシポート (デフォルト値は `10514`)
* `ssl_port`: ログがセキュリティ保護された TCP/SSL 接続で Datadog に転送される場合に使用されるポート (デフォルトは `10516`)
* `use_ssl`: `true` の場合、Agent は、Datadog へのセキュリティ保護された TCP/SSL 接続を初期化します。(デフォルト値は `true`)

以下のように設定することで、ログを **Datadog EU** に送信するためにも使用できます。

```
<match datadog.**>

  ...
  host 'tcp-intake.logs.datadoghq.eu'
  ssl_port '443'

</match>
```

##### Kubernetes と Docker タグ

製品のある部分から別の部分に移動できるようにするには、Datadog タグがたいへん重要です。コンテナビューやコンテナメトリクスから最も関連するログに移動するには、ログに正しいメタデータを関連付けることが大切です。

以下の属性がログに含まれている場合は、これらの属性が Datadog タグとしてログに自動的に追加されます。

* `kubernetes.container_image`
* `kubernetes.container_name`
* `kubernetes.namespace_name`
* `kubernetes.pod_name`
* `docker.container_id`

Datadog Agent は Docker と Kubernetes のメタデータを自動的に収集しますが、FluentD では、そのためのプラグインが必要です。このメタデータの収集には、[fluent-plugin-kubernetes_metadata_filter][13] を使用することをお勧めします。

構成例:

```
# "kubernetes.**" のタグが付いたログのメタデータを収集します。
 <filter kubernetes.*>
   type kubernetes_metadata
 </filter>
```


### 検証

[Agent の `status` サブコマンドを実行][14]し、Checks セクションで `fluentd` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "fluentd" >}}


### イベント
FluentD チェックには、イベントは含まれません。

### サービスのチェック

`fluentd.is_ok`:

Agent が Fluentd に接続してメトリクスを収集できない場合は、'Critical' を返します。これは、他のほとんどのインテグレーションで `can_connect` と呼ばれているチェックと同じです。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][16]までお問合せください。

## その他の参考資料

* [Datadog を使用した Fluentd の監視方法][17]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/fluentd/images/snapshot-fluentd.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/fluentd/datadog_checks/fluentd/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: http://www.rubydoc.info/gems/fluent-plugin-datadog
[8]: https://docs.datadoghq.com/ja/logs/processing/#edit-reserved-attributes
[9]: https://docs.datadoghq.com/ja/integrations/#cat-log-collection
[10]: https://docs.datadoghq.com/ja/logs/processing/#integration-pipelines
[11]: https://docs.datadoghq.com/ja/getting_started/tagging/assigning_tags
[12]: https://app.datadoghq.com/infrastructure
[13]: https://github.com/fabric8io/fluent-plugin-kubernetes_metadata_filter
[14]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[15]: https://github.com/DataDog/integrations-core/blob/master/fluentd/metadata.csv
[16]: https://docs.datadoghq.com/ja/help
[17]: https://www.datadoghq.com/blog/monitor-fluentd-datadog


{{< get-dependencies >}}