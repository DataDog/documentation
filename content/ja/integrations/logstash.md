---
aliases:
  - /ja/logs/log_collection/logstash
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - log collection
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/logstash/README.md'
display_name: Logstash
draft: false
git_integration_title: logstash
guid: 9d110885-cbdf-44e5-83b8-7a6514724e98
integration_id: logstash
integration_title: Logstash
is_public: true
kind: インテグレーション
maintainer: ervansetiawan@gmail.com
manifest_version: 1.0.0
metric_prefix: logstash.
metric_to_check: logstash.process.cpu.percent
name: logstash
public_title: Datadog-Logstash インテグレーション
short_description: Logstash インスタンスからランタイムメトリクスを収集して監視
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Logstash サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- Logstash の状態を視覚化および監視できます。
- Logstash のイベントに関する通知を受けることができます。

## セットアップ

Logstash チェックは [Datadog Agent][1] パッケージに**含まれていません**。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Logstash チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][1]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-logstash==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][5]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Logstash の[メトリクス](#metric-collection)と[ログ](#logs-collection)の収集を開始するには、[Agent のコンフィギュレーションディレクトリ][6]のルートにある `conf.d/` フォルダーの `logstash.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル logstash.d/conf.yaml][7] を参照してください。

2. [Agent を再起動します][8]。

#### メトリクスの収集

[Logstash メトリクス](#metrics)の収集を開始するには、`conf.yaml` ファイルに次の構成設定を追加します。

```yaml
init_config:

instances:
  # Logstash がモニタリング API を提供する URL。
  # これは Logstash に関するさまざまなランタイムメトリクスを取得するために使用されます。
  #
  - url: http://localhost:9600
```

サーバーとポートを指定するように構成します。

使用可能なすべてのコンフィギュレーションオプションについては、[サンプル conf.yaml][7] を参照してください。

最後に、[Agent を再起動][9]すると、Datadog への Logstash メトリクスの送信が開始されます。

#### ログの収集

Datadog には、Datadog プラットフォームへのログの送信を処理する、Logstash 用の[出力プラグイン][10]があります。

このプラグインをインストールするには、次のコマンドを実行します。

- `logstash-plugin install logstash-output-datadog_logs`

次に、[Datadog API キー][11]を使用して `datadog_logs` プラグインを構成します。

```conf
output {
    datadog_logs {
        api_key => "<DATADOG_API_キー>"
    }
}
```

デフォルトでは、ログを gzip 圧縮して HTTPS (ポート 443) から送信するためにプラグインを構成します。
次のパラメーターを使用して、この動作を変更できます。

- `use_http`: TCP 転送を使用する場合はこれを `false` に設定し、`host` と `port` を状況に応じて更新します (デフォルトは `true`)。
- `use_compression`: 圧縮は HTTP にのみ利用できます。これを `false` に設定すると無効化されます (デフォルトは `true`)。
- `compression_level`: HTTP の圧縮レベルを 1 ～ 9 の範囲で設定します。最大値は 9 となります (デフォルトは `6`)。

以下の追加パラメーターを使用すると、[プロキシ][12]を通過するために、使用するエンドポイントを変更できます。

- `host`: ログを Datadog に直接転送しない場合のプロキシのエンドポイント (デフォルト値は `http-intake.logs.datadoghq.com`)。
- `port`: ログを Datadog に直接転送しない場合のプロキシのポート (デフォルト値は `80`)
- `ssl_port`: ログをセキュリティ保護された TCP/SSL 接続で Datadog に転送する場合に使用するポート (デフォルトは `443`)
- `use_ssl`: Datadog へのセキュリティ保護された TCP/SSL 接続を初期化するよう Agent に指示します (デフォルト値は `true`)。
- `no_ssl_validation`: SSL ホスト名の検証を無効化します (デフォルト値は `false`)。

以下のように設定することで、ログを **Datadog EU** に送信するためにも使用できます。

```conf
output {
   datadog_logs {
       api_key => "<DATADOG_API_キー>"
       host => "http-intake.logs.datadoghq.eu"
   }
}
```

##### ログへのメタデータの追加

Datadog でログを最大限活用するには、ログにホスト名やソースなどの適切なメタデータを関連付けることが重要です。デフォルトでは、Datadog のデフォルトの[予約済み属性の再マップ][13]により、ホスト名とタイムスタンプが適切に再マップされます。確実にサービスを正しく再マップするには、その属性値をサービス再マップリストに追加します。

##### ソース

Logstash フィルターをセットアップして、ログにソース (Datadog インテグレーション名) を設定します。

```conf
filter {
  mutate {
    add_field => {
 "ddsource" => "<ソースの値>"
       }
    }
 }
```

これにより、Datadog で[インテグレーション自動セットアップ][14]がトリガーされます。

##### カスタムタグ

[インフラストラクチャーリスト][16]に一致するホスト名があれば、[ホストタグ][15]がログに自動的に設定されます。ログにカスタムタグを追加する場合は、`ddtags` 属性を使用します。

```conf
filter {
  mutate {
    add_field => {
        "ddtags" => "env:test,<KEY:VALUE>"
       }
    }
 }
```

### 検証

[Agent の `status` サブコマンドを実行][17]し、Checks セクションで `logstash` を探します。

## 互換性

Logstash チェックは、Logstash バージョン 5.x、6.x および 7.x と互換性があります。また、Logstash 6.0 で導入された新しいマルチパイプラインメトリクスにも対応します。Logstash バージョン 5.6.15、6.3.0 および 7.0.0 でテスト済みです。

## 収集データ

### メトリクス
{{< get-metrics-from-git "logstash" >}}


### イベント

Logstash チェックには、イベントは含まれません。

### サービスチェック

`logstash.can_connect`:

Agent が Logstash に接続してメトリクスを収集できない場合は、`Critical` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

### Agent が接続できない

```text
    logstash
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 1 service check
```

`conf.yaml` 内の `url` が正しいかどうかを確認してください。

それでも解決できない場合は、[Datadog のサポートチーム][19]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/logstash/datadog_checks/logstash/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#start-stop-restart-the-agent
[10]: https://github.com/DataDog/logstash-output-datadog_logs
[11]: https://app.datadoghq.com/account/settings#api
[12]: https://docs.datadoghq.com/ja/agent/proxy/#proxy-for-logs
[13]: /ja/logs/#edit-reserved-attributes
[14]: /ja/logs/processing/#integration-pipelines
[15]: /ja/getting_started/tagging/assigning_tags
[16]: https://app.datadoghq.com/infrastructure
[17]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[18]: https://github.com/DataDog/integrations-extras/blob/master/logstash/metadata.csv
[19]: http://docs.datadoghq.com/help