---
app_id: fluentd
app_uuid: c725a834-feee-481d-94f0-afe95f39d0b1
assets:
  dashboards:
    fluentd: assets/dashboards/fluentd_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: fluentd.buffer_queue_length
      metadata_path: metadata.csv
      prefix: fluentd.
    process_signatures:
    - td-agent
    - fluentd
    - ruby td-agent
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 108
    source_type_name: fluentd
  saved_views:
    fluentd_processes: assets/saved_views/fluentd_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- metrics
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/fluentd/README.md
display_on_public_website: true
draft: false
git_integration_title: fluentd
integration_id: fluentd
integration_title: FluentD
integration_version: 3.2.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: fluentd
public_title: FluentD
short_description: 有効化した各 FluentD プラグインのバッファキューと再試行回数を監視。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::ログの収集
  - Category::Metrics
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 有効化した各 FluentD プラグインのバッファキューと再試行回数を監視。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: FluentD
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Fluentd ダッシュボード][1]

## 概要

Fluentd からメトリクスを取得して、以下のことができます。

- Fluentd のパフォーマンスを視覚化できます。
- Fluentd のパフォーマンスを他のアプリケーションと関連付けることができます。

## 計画と使用

### インフラストラクチャーリスト

Fluentd チェックは [Datadog Agent][2] パッケージに含まれています。Fluentd サーバーに追加でインストールする必要はありません。

#### Fluentd の準備

FluentD コンフィギュレーションファイルに `monitor_agent` ソースを追加します。

```text
<source>
  @type monitor_agent
  bind 0.0.0.0
  port 24220
</source>
```

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. [Fluentd メトリクス](#メトリクス)を収集するには、[Agent コンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `fluentd.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル fluentd.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param monitor_agent_url - string - required
     ## Monitor Agent URL to connect to.
     #
     - monitor_agent_url: http://example.com:24220/api/plugins.json
   ```

2. [Agent を再起動します][3]。

##### 収集データ

[Datadog の FluentD プラグイン][4]を使用して FluentD から Datadog アカウントへログを直接転送することができます。

###### ログへのメタデータの追加

適切なメタデータ (ホスト名、ソースなど) は、Datadog でログの可能性をフルに引き出すためのカギです。デフォルトでは、ホスト名およびタイムスタンプフィールドが、[予約済み属性の再マップ][5]によって適切に再マップされます。

###### ソースとカスタムタグ

Datadog で[インテグレーションの自動セットアップ][7]をトリガーするには、ログに `ddsource` 属性を追加して、[ログのインテグレーションの名前][6]を設定します。
[インフラストラクチャーリスト][9]に一致するホスト名があれば、[ホストタグ][8]がログに自動的に設定されます。ログにカスタムタグを追加する場合は、`ddtags` 属性を使用します。

セットアップ例:

```conf
  # "datadog.**" タグが付いたイベントを照合して
  # Datadog に送信

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

  <buffer>
          @type memory
          flush_thread_count 4
          flush_interval 3s
          chunk_limit_size 5m
          chunk_limit_records 500
  </buffer>
</match>
```

デフォルトでは、ログを gzip 圧縮して HTTPS (ポート 443) から送信するためにプラグインを構成します。
次のパラメーターを使用して、この動作を変更できます。

- `use_http`: TCP 転送を使用する場合はこれを `false` に設定し、`host` と `port` を 状況に応じて更新します (デフォルトは `true`)
- `use_compression`: 圧縮は HTTP にのみ利用できます。無効にする場合はこれを `false` に設定します (デフォルトは `true`)
- `compression_level`: HTTP の圧縮レベルを 1 ～ 9 の範囲で設定します。最大値は 9 となります (デフォルトは `6`)

以下の追加パラメーターを使用すると、プロキシを通過するために、使用するエンドポイントを変更できます。

- `host`: ログを Datadog に直接転送しない場合のプロキシのエンドポイント (デフォルト値は `http-intake.logs.datadoghq.com`)。
- `port`: ログを Datadog に直接転送しない場合のプロキシのポート (デフォルト値は `80`)
- `ssl_port`: ログをセキュリティ保護された TCP/SSL 接続で Datadog に転送する場合に使用するポート (デフォルトは `443`)
- `use_ssl`: Datadog へのセキュリティ保護された TCP/SSL 接続を初期化するよう Agent に指示します (デフォルト値は `true`)。
- `no_ssl_validation`: SSL ホスト名の検証を無効化します (デフォルト値は `false`)。

**注**: `host` および `port` をリージョン {{< region-param key="http_endpoint" code="true" >}} {{< region-param key="http_port" code="true" >}} に設定します。

```conf
<match datadog.**>

  #...
  host 'http-intake.logs.datadoghq.eu'

</match>
```

###### Kubernetes と Docker タグ

製品のある部分から別の部分に移動できるようにするには、Datadog タグがたいへん重要です。コンテナビューやコンテナメトリクスから最も関連するログに移動するには、ログに正しいメタデータを関連付けることが大切です。

以下の属性がログに含まれている場合は、これらの属性が Datadog タグとしてログに自動的に追加されます。

- `kubernetes.container_image`
- `kubernetes.container_name`
- `kubernetes.namespace_name`
- `kubernetes.pod_name`
- `docker.container_id`

Datadog Agent は Docker と Kubernetes のメタデータを自動的に収集しますが、FluentD では、そのためのプラグインが必要です。このメタデータの収集には、[fluent-plugin-kubernetes_metadata_filter][10] を使用することを Datadog はお勧めします。

構成例:

```conf
# "kubernetes.**" のタグが付いたログのメタデータを収集
 <filter kubernetes.*>
   type kubernetes_metadata
 </filter>
```

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/fluentd/datadog_checks/fluentd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/fluent-plugin-datadog
[5]: https://docs.datadoghq.com/ja/logs/processing/#edit-reserved-attributes
[6]: https://docs.datadoghq.com/ja/integrations/#cat-log-collection
[7]: https://docs.datadoghq.com/ja/logs/processing/#integration-pipelines
[8]: https://docs.datadoghq.com/ja/getting_started/tagging/assigning_tags/
[9]: https://app.datadoghq.com/infrastructure
[10]: https://github.com/fabric8io/fluent-plugin-kubernetes_metadata_filter
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                             |
| -------------------- | ----------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `fluentd`                                                         |
| `<INIT_CONFIG>`      | 空白または `{}`                                                     |
| `<INSTANCE_CONFIG>`  | `{"monitor_agent_url": "http://%%host%%:24220/api/plugins.json"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `fluentd` を検索します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "fluentd" >}}


### ヘルプ

FluentD チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "fluentd" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

- [Datadog を使用した Fluentd の監視方法][5]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/fluentd/images/snapshot-fluentd.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/monitor-fluentd-datadog