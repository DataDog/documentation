---
aliases:
  - /ja/logs/log_collection/logstash
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - log collection
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/logstash/README.md'
display_name: Logstash
git_integration_title: logstash
guid: 9d110885-cbdf-44e5-83b8-7a6514724e98
integration_id: logstash
integration_title: Logstash
is_public: true
kind: integration
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

* Logstash の状態を視覚化および監視できます。
* Logstash のイベントに関する通知を受けることができます。

## セットアップ

Logstash チェックは [Datadog Agent][1] パッケージに**含まれていません**。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Logstash チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [開発ツールキット][5]をインストールします。
2. integrations-extras リポジトリを複製します。

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

    ```
    ddev config set extras ./integrations-extras
    ```

4. `logstash` パッケージをビルドします。

    ```
    ddev -e release build logstash
    ```

5. [Datadog Agent をダウンロードして起動][6]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```
    datadog-agent integration install -w <PATH_OF_LOGSTASH_ARTIFACT_>/<LOGSTASH_ARTIFACT_NAME>.whl
    ```

7. [他のパッケージ化されたインテグレーション][7]と同様にインテグレーションを構成します。

### コンフィグレーション

1. Logstash の[メトリクス](#metric-collection)と[ログ](#logs-collection)の収集を開始するには、[Agent の構成ディレクトリ][8]のルートにある `conf.d/` フォルダーの `logstash.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル logstash.d/conf.yaml][9] を参照してください。

2. [Agent を再起動します][10]。

#### メトリクスの収集

[Logstash メトリクス][11]の収集を開始するには、`conf.yaml` ファイルに次の構成設定を追加します。

```
init_config:

instances:
  #   Logstash が監視 API を提供する場所の URL。これは、Logstash に関するさまざまなランタイムメトリクスを取得するために使用されます。
  #
  - url: http://localhost:9600
```

サーバーとポートを指定するように構成します。

使用可能なすべての構成オプションの詳細については、[サンプル conf.yaml][12] を参照してください。

最後に、[Agent を再起動][13]すると、Datadog への Logstash メトリクスの送信が開始されます。

#### ログの収集

Datadog には、Datadog プラットフォームへのログの送信を処理する、Logstash 用の[出力プラグイン][14]があります。

このプラグインをインストールするには、次のコマンドを実行します。

* `logstash-plugin install logstash-output-datadog_logs`

次に、[Datadog API キー][15]を使用して `datadog_logs` プラグインを構成します。

```
output {
    datadog_logs {
        api_key => "<DATADOG_API_KEY>"
    }
}
```

以下の追加パラメーターを使用すると、[プロキシ][16]を通過するために、使用するエンドポイントを変更できます。

* `host`: ログが Datadog に直接転送されない場合のプロキシエンドポイント (デフォルト値は `intake.logs.datadoghq.com`)
* `port`: ログが Datadog に直接転送されない場合のプロキシポート (デフォルト値は `10516`)
* `use_ssl`: `true` の場合、Agent は、Datadog へのセキュリティ保護された TCP/SSL 接続を初期化します (デフォルト値は `true`)。

以下のように設定することで、ログを **Datadog EU** に送信するためにも使用できます。

 ```
output {
    datadog_logs {
        api_key => "<DATADOG_API_KEY>"
        host => "tcp-intake.logs.datadoghq.eu"
        port => "443"
    }
}
```

##### ログへのメタデータの追加

Datadog でログを最大限活用するには、ログにホスト名やソースなどの適切なメタデータを関連付けることが重要です。デフォルトでは、Datadog のデフォルトの[予約済み属性の再マップ][17]により、ホスト名とタイムスタンプが適切に再マップされます。確実にサービスを正しく再マップするには、その属性値をサービス再マップリストに追加します。

##### ソース

Logstash フィルターをセットアップして、ログにソース (Datadog インテグレーション名) を設定します。

```
filter {
  mutate {
    add_field => {
 "ddsource" => "<MY_SOURCE_VALUE>"
       }
    }
 }
```

これにより、Datadog で[インテグレーション自動セットアップ][18]がトリガーされます。

##### カスタムタグ

[インフラストラクチャーリスト][20]に一致するホスト名があれば、[ホストタグ][19]がログに自動的に設定されます。ログにカスタムタグを追加する場合は、`ddtags` 属性を使用します。

```
filter {
  mutate {
    add_field => {
        "ddtags" => "env:test,<KEY:VALUE>"
       }
    }
 }
```


### 検証

[Agent の `status` サブコマンドを実行][21]し、Checks セクションで `logstash` を探します。

## 互換性

Logstash チェックは、Logstash バージョン 5.x、6.x、および 7.x と互換性があります。また、Logstash 6.0 で導入された新しいマルチパイプラインメトリクスもサポートされます。
Logstash バージョン 5.6.15、6.3.0、および 7.0.0 でテスト済みです。

## 収集データ
### メトリクス
{{< get-metrics-from-git "logstash" >}}


### イベント
Logstash チェックには、イベントは含まれません。

### サービスのチェック

`logstash.can_connect`:

Agent が Logstash に接続してメトリクスを収集できない場合は、`Critical` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

### Agent が接続できない
```
    logstash
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 1 service check
```

`conf.yaml` 内の `url` が正しいかどうかを確認してください。

それでも解決できない場合は、[Datadog のサポートチーム][23]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/ja/getting_started/integrations
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-extras/blob/master/logstash/datadog_checks/logstash/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[11]: #metrics
[12]: https://github.com/DataDog/integrations-extras/blob/master/logstash/datadog_checks/logstash/data/conf.yaml.example
[13]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#start-stop-restart-the-agent
[14]: https://github.com/DataDog/logstash-output-datadog_logs
[15]: https://app.datadoghq.com/account/settings#api
[16]: https://docs.datadoghq.com/ja/agent/proxy/?tab=agentv6#proxy-for-logs
[17]: /ja/logs/#edit-reserved-attributes
[18]: /ja/logs/processing/#integration-pipelines
[19]: /ja/getting_started/tagging/assigning_tags
[20]: https://app.datadoghq.com/infrastructure
[21]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#service-status
[22]: https://github.com/DataDog/integrations-extras/blob/master/logstash/metadata.csv
[23]: http://docs.datadoghq.com/help


{{< get-dependencies >}}