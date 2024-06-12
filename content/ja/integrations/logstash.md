---
app_id: logstash
app_uuid: efcb18d9-2789-4481-bd4b-ff5a4c058dc3
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: logstash.process.cpu.percent
      metadata_path: metadata.csv
      prefix: logstash.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10016
    source_type_name: Logstash
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: ervansetiawan@gmail.com
  support_email: ervansetiawan@gmail.com
categories:
- log collection
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/logstash/README.md
display_on_public_website: true
draft: false
git_integration_title: logstash
integration_id: logstash
integration_title: Logstash
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: logstash
public_title: Logstash
short_description: Logstash インスタンスからランタイムメトリクスを収集して監視
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
  - Category::ログの収集
  configuration: README.md#Setup
  description: Logstash インスタンスからランタイムメトリクスを収集して監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Logstash
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Logstash からメトリクスをリアルタイムに取得して、以下のことができます。

- Logstash の状態を視覚化および監視できます。
- Logstash のイベントに関する通知を受けることができます。

## 計画と使用

### インフラストラクチャーリスト

Logstash チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Logstash チェックをホストにインストールします。それ以前のバージョンの Agent については、[コミュニティインテグレーションの使用][1]を参照してください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-logstash==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][2]と同様にインテグレーションを構成します。

[1]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[2]: https://docs.datadoghq.com/ja/getting_started/integrations/
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

以下の Dockerfile を使用して、Logstash インテグレーションを含むカスタム Datadog Agent イメージを構築します。

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN datadog-agent integration install -r -t datadog-logstash==<INTEGRATION_VERSION>
```

Kubernetes を使用している場合は、Datadog Operator または Helm チャートの構成を更新して、このカスタム Datadog Agent イメージをプルします。

詳しくは[コミュニティインテグレーションの使用][1]を参照してください。

[1]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
{{% /tab %}}
{{< /tabs >}}

### ブラウザトラブルシューティング

#### メトリクスの収集

{{< tabs >}}
{{% tab "ホスト" %}}

##### メトリクスベース SLO

1. [Agent の構成ディレクトリ][1]のルートにある `conf.d/` フォルダーの `logstash.d/conf.yaml` ファイルを編集します。

   ```yaml
   init_config:

   instances:
     # The URL where Logstash provides its monitoring API.
     # This will be used to fetch various runtime metrics about Logstash.
     #
     - url: http://localhost:9600
   ```

   使用可能なすべての構成オプションの詳細については、[サンプル logstash.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-extras/blob/master/logstash/datadog_checks/logstash/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

##### コンテナ化

コンテナ環境では、以下のパラメーターを指定したオートディスカバリーテンプレートを使用します。

| パラメーター            | 値                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `logstash`                           |
| `<INIT_CONFIG>`      | 空白または `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"server": "http://%%host%%:9600"}` |

このテンプレートの適用方法については、[Docker インテグレーション][1]または [Kubernetes インテグレーション][2]を参照してください。

使用可能なすべての構成オプションの詳細については、[サンプル logstash.d/conf.yaml][3] を参照してください。

[1]: https://docs.datadoghq.com/ja/containers/docker/integrations
[2]: https://docs.datadoghq.com/ja/containers/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-extras/blob/master/logstash/datadog_checks/logstash/data/conf.yaml.example
{{% /tab %}}
{{< /tabs >}}

#### 収集データ

Datadog には、Datadog プラットフォームへのログの送信を処理する、Logstash 用の[出力プラグイン][2]があります。

このプラグインをインストールするには、次のコマンドを実行します。

- `logstash-plugin install logstash-output-datadog_logs`

次に、[Datadog API キー][3]を使用して `datadog_logs` プラグインを構成します。

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

以下の追加パラメーターを使用すると、[プロキシ][4]を通過するために、使用するエンドポイントを変更できます。

- `host`: ログを Datadog に直接転送しない場合のプロキシのエンドポイント (デフォルト値は `http-intake.logs.datadoghq.com`)。
- `port`: ログを Datadog に直接転送しない場合のプロキシのポート (デフォルト値は `80`)
- `ssl_port`: ログをセキュリティ保護された TCP/SSL 接続で Datadog に転送する場合に使用するポート (デフォルトは `443`)
- `use_ssl`: Datadog へのセキュリティ保護された TCP/SSL 接続を初期化するよう Agent に指示します (デフォルト値は `true`)。
- `no_ssl_validation`: SSL ホスト名の検証を無効化します (デフォルト値は `false`)。

**注**: `host` および `port` をリージョン {{< region-param key="http_endpoint" code="true" >}} {{< region-param key="http_port" code="true" >}} に設定します。

```conf
output {
   datadog_logs {
       api_key => "<DATADOG_API_キー>"
       host => "http-intake.logs.datadoghq.eu"
   }
}
```

##### ログへのメタデータの追加

Datadog でログを最大限活用するには、ログにホスト名やソースなどの適切なメタデータを関連付けることが重要です。デフォルトでは、Datadog のデフォルトの[予約済み属性の再マップ][5]により、ホスト名とタイムスタンプが適切に再マップされます。確実にサービスを正しく再マップするには、その属性値をサービス再マップリストに追加します。

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

これにより、Datadog で[インテグレーション自動セットアップ][6]がトリガーされます。

##### カスタムタグ

[インフラストラクチャーリスト][8]に一致するホスト名があれば、[ホストタグ][7]がログに自動的に設定されます。ログにカスタムタグを追加する場合は、`ddtags` 属性を使用します。

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

[Agent の `status` サブコマンドを実行][9]し、Checks セクションで `logstash` を探します。

## 互換性

Logstash チェックは、Logstash バージョン 5.x、6.x および 7.x と互換性があります。また、Logstash 6.0 で導入された新しいマルチパイプラインメトリクスにも対応します。Logstash バージョン 5.6.15、6.3.0 および 7.0.0 でテスト済みです。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "logstash" >}}


### イベント

Logstash チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "logstash" >}}


## トラブルシューティング

### Agent が接続できない

```text
    logstash
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 1 service check
```

`conf.yaml` 内の `url` が正しいかどうかを確認してください。

それでも解決できない場合は、[Datadog のサポートチーム][10]までお問い合わせください。


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/logstash-output-datadog_logs
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.datadoghq.com/ja/agent/proxy/#proxy-for-logs
[5]: /ja/logs/#edit-reserved-attributes
[6]: /ja/logs/processing/#integration-pipelines
[7]: /ja/getting_started/tagging/assigning_tags
[8]: https://app.datadoghq.com/infrastructure
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[10]: http://docs.datadoghq.com/help