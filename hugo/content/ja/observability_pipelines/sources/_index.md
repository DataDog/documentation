---
aliases:
- /ja/observability_pipelines/sources/prometheus
description: Observability Pipelines Worker で利用可能なソースについて学びます。
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: ドキュメント
  text: パイプラインをセットアップする
- link: /observability_pipelines/processors/
  tag: ドキュメント
  text: パイプライン用のプロセッサー
- link: /observability_pipelines/destinations/
  tag: ドキュメント
  text: Observability Pipelines の宛先
title: ソース
---
## 概要 {#overview}

Observability Pipelines のソースを使用して、さまざまなデータソースからログやメトリクスを受信します。ソースによって前提条件や設定が異なります。一部のソースでは、Observability Pipelines Worker にデータを送信するように設定する必要もあります。

左側のナビゲーションメニューからソースを選択して詳細情報を確認します。

## ソース {#sources}

これらが利用可能なソースです。

{{< tabs >}}
{{% tab "ログ" %}}

- [Akamai DataStream][1]
- [Amazon Data Firehose][2]
- [Amazon S3][3]
- [Azure Event Hubs][4]
- [Cloudflare Logpush][5]
- [Datadog Agent][6]
- [Filebeat][7]
- [Fluentd and Fluent Bit][8]
- [Google Pub/Sub][9]
- [HTTP Client][10]
- [HTTP Server][11]
- [Kafka][12]
- [Lambda Extension][13]
- [Lambda Forwarder][14]
- [Logstash][15]
- [MySQL][16]
- [Okta][17]
- [OpenTelemetry][18]
- [Socket][19]
- [Splunk HTTP Event Collector (HEC)][20]
- [Splunk Heavy または Universal Forwarders (TCP)][21]
- [Sumo Logic Hosted Collector][22]
- [Syslog][23]
- [WebSocket][24]

[1]: /ja/observability_pipelines/sources/akamai_datastream/
[2]: /ja/observability_pipelines/sources/amazon_data_firehose/
[3]: /ja/observability_pipelines/sources/amazon_s3/
[4]: /ja/observability_pipelines/sources/azure_event_hubs/
[5]: /ja/observability_pipelines/sources/cloudflare_logpush/
[6]: /ja/observability_pipelines/sources/datadog_agent/
[7]: /ja/observability_pipelines/sources/filebeat/
[8]: /ja/observability_pipelines/sources/fluent/
[9]: /ja/observability_pipelines/sources/google_pubsub/
[10]: /ja/observability_pipelines/sources/http_client/
[11]: /ja/observability_pipelines/sources/http_server/
[12]: /ja/observability_pipelines/sources/kafka/
[13]: /ja/observability_pipelines/sources/lambda_extension/
[14]: /ja/observability_pipelines/sources/lambda_forwarder/
[15]: /ja/observability_pipelines/sources/logstash/
[16]: /ja/observability_pipelines/sources/mysql/
[17]: /ja/observability_pipelines/sources/okta/
[18]: /ja/observability_pipelines/sources/opentelemetry/
[19]: /ja/observability_pipelines/sources/socket/
[20]: /ja/observability_pipelines/sources/splunk_hec/
[21]: /ja/observability_pipelines/sources/splunk_tcp/
[22]: /ja/observability_pipelines/sources/sumo_logic/
[23]: /ja/observability_pipelines/sources/syslog/
[24]: /ja/observability_pipelines/sources/websocket/

{{% /tab %}}
{{% tab "メトリクス" %}}

- [Datadog Agent][1]
- [OpenTelemetry][2]

[1]: /ja/observability_pipelines/sources/datadog_agent/
[2]: /ja/observability_pipelines/sources/opentelemetry/

{{% /tab %}}
{{< /tabs >}}

## 標準メタデータフィールド {#standard-metadata-fields}

すべてのソースは、取り込みイベントに以下の標準メタデータフィールドを追加します。

| フィールド名     | 値の型     | 例                      |
| -------------- | -------------- | ---------------------------- |
| `hostname`     | String         | `"ip-34-2-553.us.test"`      |
| `timestamp`    | String         | `"2024-06-17T22:25:55.439Z"` |
| `source_type`  | String         | `"splunk_tcp"`               |

たとえば、これが生のイベントの場合、

```
{
  "foo": "bar"
}
```

標準メタデータフィールドが追加された拡充イベントは次のようになります。

```
{
  "foo": "bar",
  "hostname": "ip-34-2-553.us.test",
  "timestamp": "2024-06-17T22:25:55.439Z",
  "source_type": "splunk_tcp"
}
```

これらの標準メタデータフィールドは、[`tap` コマンド][2] を使用してソースから送信されたイベントを表示すると確認できます。

イベントがソースに取り込まれた後、それらはさまざまなプロセッサーや送信先に送信され、そこでこれらのフィールドが更新される場合があります。たとえば、イベントが Datadog Logs 送信先に送信されると、タイムスタンプフィールドは UNIX 形式に変換されます。

**注**: UI の `bytes in per second` メトリクスは取り込まれた生のイベント用であり、拡充イベント用ではありません。

## TLS 証明書 {#tls-certificates}

Observability Pipelines で TLS を有効にして、転送中のデータが暗号化されるようにします。これにより、攻撃者によるデータの改ざんを防ぐことができます。

Observability Pipelines は、安全な信頼性検証を提供せず、中間者攻撃によって環境が危険にさらされる可能性があるため、デフォルトでは自己署名証明書を受け入れません。

証明書が自己署名かどうかを確認するには、次のコマンドを実行します。

```
openssl verify -CAfile certificate.pem certificate.pem
```

証明書が自己署名で、それ自体に対して検証される場合、出力は次のようになります。

```
certificate.pem: OK
```

それ以外の場合は、エラー `unable to get local issuer certificate` が表示されます。

自己署名証明書を使用する代わりに、Datadog は以下を推奨します。

1. 認証局 (CA) によって署名された証明書を使用してください。
2. CA 署名付き証明書を使用できない場合は、[Let's Encrypt][3] の証明書を使用してください。

上記の方法を使用できず、自己署名証明書を使用する必要がある場合は、Observability Pipelines Worker ホストで自己署名証明書を信頼するように環境を構成できます。

<div class="alert alert-warning">Datadog は自己署名証明書を推奨していません。これらは安全性が低く、本番環境やインターネットに公開される用途には適していません。自己署名証明書を使用する必要がある場合は、内部テストのみに限定してください。</a></div>

Worker ホストで自己署名証明書を信頼するには、以下を行います。

- Linux ホストでは、OS の信頼ストアに証明書をインストールします。
- Kubernetes では、以下のいずれかを行うことができます。
    - 証明書を含むカスタムコンテナイメージをビルドします。
    - 証明書をマウントし、コンテナの信頼ストアを手動で更新します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/monitoring_and_troubleshooting/troubleshooting/#use-tap-to-see-your-data
[3]: https://letsencrypt.org/