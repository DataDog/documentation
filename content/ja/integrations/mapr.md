---
app_id: mapr
app_uuid: 96cb179f-2a53-424b-95ce-302610f155eb
assets:
  dashboards:
    MapR - Overview: assets/dashboards/mapr_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: mapr.metrics.submitted
      metadata_path: metadata.csv
      prefix: mapr.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10073
    source_type_name: MapR
  logs:
    source: mapr
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- data stores
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/mapr/README.md
display_on_public_website: true
draft: false
git_integration_title: mapr
integration_id: mapr
integration_title: MapR
integration_version: 1.11.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: mapr
public_title: MapR
short_description: MapR で利用可能な作成済みのモニタリングメトリクスを収集します。
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::Log Collection
  - Supported OS::Linux
  configuration: README.md#Setup
  description: MapR で利用可能な作成済みのモニタリングメトリクスを収集します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: MapR
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通して [MapR][1] 6.1 以降を監視します。

## 計画と使用

以下の手順に従って、このチェックをインストールし、ホストで実行中の Agent に対して構成します。

### インフラストラクチャーリスト

MapR チェックは [Datadog Agent][2] パッケージに含まれていますが、追加のセットアップが必要です。

#### 前提条件

- [MapR モニタリング][3]が問題なく実行されている。
- `/var/mapr/mapr.monitoring/metricstreams` ストリームで 'consume' を許可された利用可能な [MapR ユーザー][4] (ユーザー名、パスワード、UID、GID あり) がある。既存のユーザーの場合と、新規作成ユーザーの場合があります。
- **非セキュアクラスター**: [クラスターセキュリティを使用しないなりすましの構成][5]に従い、`dd-agent` ユーザーがこの MapR ユーザーを偽装できるようにします。
- **セキュアなクラスター**: `dd-agent` ユーザーが読み出せるこのユーザー専用の[長期的なサービスチケット][6]を生成します。

ノード別インストールステップ

1. [Agent をインストールします][2]。
2. _mapr-streams-library_ が必要とする _librdkafka_ ライブラリを、[以下の手順][7]に従ってインストールします。
3. 次のコマンドを使用して、ライブラリ _mapr-streams-library_ をインストールします。

    `sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install --global-option=build_ext --global-option="--library-dirs=/opt/mapr/lib" --global-option="--include-dirs=/opt/mapr/include/" mapr-streams-python`.

    Python 3 で Agent v7 を使用されている場合は、`pip` を `pip3` に置き換えます。

4. `/etc/ld.so.conf` (または `/etc/ld.so.conf.d/` 内のファイル) に `/opt/mapr/lib/` を追加します。これは、Agent が使用する _mapr-streams-library_ で MapR 共有ライブラリを探すために必要です。
5. `sudo ldconfig` を実行してライブラリを再読み込みします。
6. チケットのロケーションを指定して、インテグレーションを構成します。

#### 補足

- クラスターで「セキュリティ」が有効化されていない場合は、チケットがなくても続行できます。
- 本番環境で gcc (mapr-streams-library の構築に必要) などのコンパイルツールを利用できない場合は、環境インスタンスでライブラリのコンパイル済み Wheel を生成して、本番ホストに配布できます。開発ホストと本番ホストは、双方でコンパイル済み Wheel を使用できるよう、同様である必要があります。`sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip wheel --global-option=build_ext --global-option="--library-dirs=/opt/mapr/lib" --global-option="--include-dirs=/opt/mapr/include/" mapr-streams-python` を実行して、開発マシンで Wheel  ファイルを作成できます。次に、本番マシンで `sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install <WHEEL_ファイル>` を実行します。
- Python 3 で Agent v7 を使用されている場合は、_mapr-streams-library_ をインストールする際に、必ず `pip` を `pip3` に置き換えてください。

### ブラウザトラブルシューティング

#### メトリクスの収集

1. Agent コンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーで `mapr.d/conf.yaml` ファイルを編集し、MapR パフォーマンスデータを収集します。利用可能なコンフィギュレーションオプションについては、[mapr.d/conf.yaml のサンプル][8]を参照してください。
2. 作成済みの長期チケットのパスに対するコンフィグに `ticket_location` パラメーターを設定します。
3. [Agent を再起動します][9]。

#### 収集データ

MapR はログに fluentD を使用します。[fluentD Datadog プラグイン][10]を使用して、MapR ログを収集します。下記のコマンドを使用して、プラグインをダウンロードし、適切なディレクトリにインストールします。

`curl https://raw.githubusercontent.com/DataDog/fluent-plugin-datadog/master/lib/fluent/plugin/out_datadog.rb -o /opt/mapr/fluentd/fluentd-<VERSION>/lib/fluentd-<VERSION>-linux-x86_64/lib/app/lib/fluent/plugin/out_datadog.rb`

次に、下記のセクションを使用して `/opt/mapr/fluentd/fluentd-<VERSION>/etc/fluentd/fluentd.conf` をアップデートします。

```text
<match *>
  @type copy
  <store> # デフォルトではこのセクションの位置はここです。このセクションから Kibana の ElasticCach にログを送信します。
    @include /opt/mapr/fluentd/fluentd-<VERSION>/etc/fluentd/es_config.conf
    include_tag_key true
    tag_key service_name
  </store>
  <store> # また、このセクションはすべてログを Datadog に転送します:
    @type datadog
    @id dd_agent
    include_tag_key true
    dd_source mapr  # Sets "source: mapr" on every log to allow automatic parsing on Datadog.
    dd_tags "<KEY>:<VALUE>"
    service <サービス名>
    api_key <API_キー>
  </store>
```

使用可能なオプションの詳細については、[fluent_datadog_plugin][10] を参照してください。

### 検証

[Agent の status サブコマンド][11]を実行し、Checks セクションで `mapr` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "mapr" >}}


### イベント

MapR チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "mapr" >}}


## トラブルシューティング

- **MapR インテグレーションを構成してから、Agent のクラッシュループ状態が続いている**。

  アクセス許可に問題があり、_mapr-streams-python_ 内の C ライブラリがセグメンテーション障害を起こすケースがいくつか発生しています。`dd-agent` ユーザーがチケットファイルでアクセス許可を読み込み、`MAPR_TICKETFILE_LOCATION` 環境変数がチケットを指定しているときに `dd-agent` ユーザーが `maprcli` コマンドを実行できることを確認してください。

- **インテグレーションは正しく動作しているように思えるが、メトリクスがまったく送信されない**。

  インテグレーションがトピックからデータをプルし、MapR がデータをトピックにプッシュする必要があるため、必ず Agent を最低でも数分間実行してください。
  それでも問題が解決されず、`sudo` を使用してAgent を手動で実行するとデータが表示される場合は、アクセス許可に問題があります。すべてを再度ご確認ください。`dd-agent` Linux ユーザーは、ユーザー X  (`dd-agent` 自身である場合とそうでない場合があります) として MapR に対してクエリを実行できるでけでなく、ローカルに保存されたチケットを使用できるはずです。さらに、ユーザー X には `consume` permission on the `/var/mapr/mapr.monitoring/metricstreams` ストリームが必要です。

- **`confluent_kafka was not imported correctly ...` というメッセージが表示される**。

  このメッセージは、Agent 埋め込み環境で、コマンド `import confluent_kafka` を実行できなかったときに表示され、_mapr-streams-library_ が埋め込み環境内にインストールされていないか、mapr-core ライブラリが見つからないことを意味します。エラーメッセージに詳細が記述されています。

ご不明な点は、[Datadog サポート][14]までお問い合わせください。


[1]: https://mapr.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://mapr.com/docs/61/AdministratorGuide/Monitoring.html
[4]: https://mapr.com/docs/61/AdministratorGuide/c-managing-users-and-groups.html
[5]: https://docs.datafabric.hpe.com/52/SecurityGuide/t_config_impersonation_notsecure.html?hl=secure%2Ccluster
[6]: https://mapr.com/docs/61/SecurityGuide/GeneratingServiceTicket.html
[7]: https://github.com/confluentinc/librdkafka#installing-prebuilt-packages
[8]: https://github.com/DataDog/integrations-core/blob/master/mapr/datadog_checks/mapr/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://www.rubydoc.info/gems/fluent-plugin-datadog
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/mapr/metadata.csv
[13]: https://github.com/DataDog/integrations-core/blob/master/mapr/assets/service_checks.json
[14]: https://docs.datadoghq.com/ja/help/