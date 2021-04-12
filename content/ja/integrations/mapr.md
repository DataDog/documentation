---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    MapR - Overview: assets/dashboards/mapr_overview.json
  logs:
    source: mapr
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - OS & システム
  - 処理
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/mapr/README.md'
display_name: MapR
draft: false
git_integration_title: mapr
guid: 7d1de422-85a6-47cc-9962-427a9499d109
integration_id: mapr
integration_title: MapR
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: mapr.
metric_to_check: mapr.metrics.submitted
name: mapr
public_title: Datadog-MapR インテグレーション
short_description: MapR で利用可能な作成済みのモニタリングメトリクスを収集します。
support: コア
supported_os:
  - linux
---
## 概要

このチェックは、Datadog Agent を通して [MapR][1] 6.1 以降を監視します。

## セットアップ

以下の手順に従って、このチェックをインストールし、ホストで実行中の Agent に対して構成します。

### インストール

MapR チェックは [Datadog Agent][2] パッケージに含まれていますが、追加のセットアップが必要です。

#### 前提条件

- [MapR モニタリング][3]が問題なく実行されている。
- `/var/mapr/mapr.monitoring/metricstreams` ストリームで 'consume' を許可された利用可能な [MapR ユーザー][4] (ユーザー名、パスワード、UID、GID あり) がある。既存のユーザーの場合と、新規作成ユーザーの場合があります。ユーザーを `dd-agent` にする場合は、Agent をインストールする前にユーザーを作成します。
- `dd-agent` ユーザーが読み出せるこのユーザー専用の[長期的なサービスチケット][5]を生成済みである。

ノード別インストールステップ

1. [Agent をインストールします][2]。
2. 次のコマンドを使用して、ライブラリ _mapr-streams-library_ をインストールします。

    `sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install --global-option=build_ext --global-option="--library-dirs=/opt/mapr/lib" --global-option="--include-dirs=/opt/mapr/include/" mapr-streams-python`.

    Python 3 で Agent v7 を使用されている場合は、`pip` を `pip3` に置き換えます。

3. `/etc/ld.so.conf` (または `/etc/ld.so.conf.d/` 内のファイル) に `/opt/mapr/lib/` を追加します。これは、Agent が使用する _mapr-streams-library_ で MapR 共有ライブラリを探すために必要です。
4. `sudo ldconfig` を実行してライブラリを再読み込みします。
5. チケットのロケーションを指定して、インテグレーションを構成します。

#### 補足

- クラスターで「セキュリティ」が有効化されていない場合は、チケットがなくても続行できます。
- 本番環境で gcc (mapr-streams-library の構築に必要) などのコンパイルツールを利用できない場合は、環境インスタンスでライブラリのコンパイル済み Wheel を生成して、本番ホストに配布できます。開発ホストと本番ホストは、双方でコンパイル済み Wheel を使用できるよう、同様である必要があります。`sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip wheel --global-option=build_ext --global-option="--library-dirs=/opt/mapr/lib" --global-option="--include-dirs=/opt/mapr/include/" mapr-streams-python` を実行して、開発マシンで Wheel  ファイルを作成できます。次に、本番マシンで `sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install <WHEEL_ファイル>` を実行します。
- Python 3 で Agent v7 を使用されている場合は、_mapr-streams-library_ をインストールする際に、必ず `pip` を `pip3` に置き換えてください。

### コンフィギュレーション

#### メトリクスの収集

1. Agent コンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーで `mapr.d/conf.yaml` ファイルを編集し、MapR パフォーマンスデータを収集します。利用可能なコンフィギュレーションオプションについては、[mapr.d/conf.yaml のサンプル][6]を参照してください。
2. 作成済みの長期チケットのパスに対するコンフィグに `ticket_location` パラメーターを設定します。
3. [Agent を再起動します][7]。

#### ログの収集

MapR はログに fluentD を使用します。[fluentD Datadog プラグイン][8]を使用して、MapR ログを収集します。下記のコマンドを使用して、プラグインをダウンロードし、適切なディレクトリにインストールします。

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

使用可能なオプションの詳細については、[Datadog 対応 Fluentd Output プラグイン][8]を参照してください。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `mapr` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "mapr" >}}


### サービスのチェック

**mapr.can_connect**:
Agent がストリームトピックに接続してサブスクライブできない場合は `CRITICAL` を返します。それ以外の場合は `OK` を返します。

### イベント

MapR チェックには、イベントは含まれません。

## トラブルシューティング

- **MapR インテグレーションを構成してから、Agent のクラッシュループ状態が続いている**。

  アクセス許可に問題があり、_mapr-streams-python_ 内の C ライブラリがセグメンテーション障害を起こすケースがいくつか発生しています。`dd-agent` ユーザーがチケットファイルでアクセス許可を読み込み、MAPR_TICKETFILE_LOCATION 環境変数がチケットを指定しているときに `dd-agent` ユーザーが maprcli コマンドを実行できることを確認してください。

- **インテグレーションは正しく動作しているように思えるが、メトリクスがまったく送信されない**。

  インテグレーションがトピックからデータをプルし、MapR がデータをトピックにプッシュする必要があるため、必ず Agent を最低でも数分間実行してください。
  それでも問題が解決されず、`sudo` を使用してAgent を手動で実行するとデータが表示される場合は、アクセス許可に問題があります。すべてを再度ご確認ください。`dd-agent` Linux ユーザーは、ユーザー X  (`dd-agent` 自身である場合とそうでない場合があります) として MapR に対してクエリを実行できるでけでなく、ローカルに保存されたチケットを使用できるはずです。さらに、ユーザー X には `consume` permission on the `/var/mapr/mapr.monitoring/metricstreams` ストリームが必要です。

- **`confluent_kafka was not imported correctly ...` というメッセージが表示される**。

  このメッセージは、Agent 埋め込み環境で、コマンド `import confluent_kafka` を実行できなかったときに表示され、_mapr-streams-library_ が埋め込み環境内にインストールされていないか、mapr-core ライブラリが見つからないことを意味します。エラーメッセージに詳細が記述されています。

ご不明点がありましたら、[Datadog サポートチーム][11]までお問合せください。

[1]: https://mapr.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://mapr.com/docs/61/AdministratorGuide/Monitoring.html
[4]: https://mapr.com/docs/61/AdministratorGuide/c-managing-users-and-groups.html
[5]: https://mapr.com/docs/61/SecurityGuide/GeneratingServiceTicket.html
[6]: https://github.com/DataDog/integrations-core/blob/master/mapr/datadog_checks/mapr/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://www.rubydoc.info/gems/fluent-plugin-datadog
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/mapr/metadata.csv
[11]: https://docs.datadoghq.com/ja/help/