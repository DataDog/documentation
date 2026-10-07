---
description: Observability Pipelines Worker を使用して Splunk HTTP Event Collector (HEC)
  からログを収集する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Splunk HTTP Event Collector (HEC) ソース
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Splunk HTTP Event Collector (HEC) ソースを使用して、Splunk HEC からログを受信します。HEC トークンをイベントメタデータとして保存して、以下の操作を行うこともできます。

- イベントと共に送信された元のトークンを使用して、Observability Pipelines から Splunk HEC にログを送信する。
- Enrichment Table プロセッサを使用して、メタデータ内のトークンに基づいてルックアップファイルからログフィールドを追加し、そのフィールドの値に基づいてログを処理およびルーティングする。

**注**:
- Worker は、受信した保存済み HEC トークンを次のコンポーネントに転送します。
- 保存された Splunk HEC トークンは、[Live Capture][9] には表示されません。
- Splunk HEC ソースは、[Splunk Distribution of the OpenTelemetry Collector から Observability Pipelines にログを送信する](#send-logs-from-the-splunk-distribution-of-the-opentelemetry-collector-to-observability-pipelines)場合に使用します。

## 前提条件 {#prerequisites}

{{% observability_pipelines/prerequisites/splunk_hec %}}

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: Splunk HEC アドレスと TLS キーパスおよび認証トークンキー (該当する場合) の識別子のみを入力してください。実際の値は<b>入力しない</b>でください。</div>

このソースは、[パイプラインを設定][1]する際に設定します。パイプラインは、[UI][6]、[API][7]、または [Terraform][8] を使用して設定できます。このセクションの手順は、このソースを UI で設定するためのものです。

パイプライン UI で Splunk HEC ソースを選択した後:

1. Splunk HEC アドレスの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. 以下のいずれかを行う場合にのみ、[{{< ui >}}Store HEC token{{< /ui >}}] (HEC トークンを保存する) を有効にします。
    - [{{< ui >}}From Source{{< /ui >}}] (ソースから) トークン戦略で Splunk HEC の送信先を使用する。
    - Enrichment Table プロセッサを使用して、ローカルファイルから Splunk HEC トークンをマッピングする。

{{% observability_pipelines/secrets_env_var_note %}}

### オプションの設定{#optional-settings}

#### TLS を有効にする{#enable-tls}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

#### 認証トークンを設定する{#configure-authentication-tokens}

Splunk HEC トークンを HTTP リクエストの認可ヘッダーに格納している場合、Observability Pipelines を設定して、受信した HTTP リクエストに有効なトークンが含まれているかをチェックできます。有効なトークンを持たないリクエストイベントは破棄されます。

認証トークンを設定するには、[{{< ui >}}Configure authentication tokens{{< /ui >}}] (認証トークンを設定する) トグルを有効にします。

1. [{{< ui >}}Manage Tokens{{< /ui >}}] (トークンを管理) をクリックし、次に [{{< ui >}}Add Token{{< /ui >}}] (トークンを追加) をクリックします。
1. トークンキーの識別子を入力します。<br>**注**: 環境変数を使用する場合、このトークンの環境変数は、入力した識別子の先頭に `DD_OP_` を付加したものになります。
1. (オプション) この特定のトークンで正常に認証されたログに追加情報を付加したい場合は、フィールドと値を入力します。

## シークレットのデフォルト値 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Splunk HEC アドレスの識別子:
	- 本来 Splunk インデクサー宛てであったログを受信するために Observability Pipelines Worker がリッスンするバインドアドレス (`0.0.0.0:8088` など) を参照します。
	- デフォルトの識別子は `SOURCE_SPLUNK_HEC_ADDRESS` です。
- Splunk HEC TLS パスフレーズの識別子 (TLS が有効な場合):
	- デフォルトの識別子は `SOURCE_SPLUNK_HEC_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_hec %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/splunk_hec %}}

## Splunk Distribution of the OpenTelemetry Collector から Observability Pipelines にログを送信する {#send-logs-from-the-splunk-distribution-of-the-opentelemetry-collector-to-observability-pipelines}

Splunk Distribution of the OpenTelemetry Collector からログを送信するには:

1. 環境に基づいて Splunk OpenTelemetry Collector をインストールします。
    - [Kubernetes][2]
    - [Linux][3]
1. [Splunk HEC ソース](#set-up-the-source-in-the-pipeline-ui)を使用して[パイプラインを設定][4]します。
1. Splunk OpenTelemetry Collector を設定します。
    ```bash
    cp /etc/otel/collector/splunk-otel-collector.conf.example etc/otel/collector/splunk-otel-collector.conf
    ```
    ```bash
    # Splunk HEC endpoint URL, if forwarding to Splunk Observability Cloud
    # SPLUNK_HEC_URL=https://ingest.us0.signalfx.com/v1/log
    # If you're forwarding to a Splunk Enterprise instance running on example.com, with HEC at port 8088:
    SPLUNK_HEC_URL=http://<OPW_HOST>:8088/services/collector
    ```
   -  `<OPW_HOST>` は、Observability Pipelines Worker に関連付けられたホスト (またはロードバランサー) の IP または URL です。
        - CloudFormation インストールの場合は、`LoadBalancerDNS` CloudFormation 出力に、使用する正しい URL が記載されています。
        - Kubernetes インストールの場合は、Observability Pipelines Worker サービスの内部 DNS レコードを使用できます (例: `opw-observability-pipelines-worker.default.svc.cluster.local`)。

**注**: ファイアウォールを使用している場合は、Splunk OpenTelemetry Collector から Worker へのトラフィックがファイアウォールで許可されていることを確認してください。

[1]: /ja/observability_pipelines/configuration/set_up_pipelines/
[2]: https://help.splunk.com/en/splunk-observability-cloud/manage-data/splunk-distribution-of-the-opentelemetry-collector/get-started-with-the-splunk-distribution-of-the-opentelemetry-collector/collector-for-kubernetes
[3]: https://help.splunk.com/en/splunk-observability-cloud/manage-data/splunk-distribution-of-the-opentelemetry-collector/get-started-with-the-splunk-distribution-of-the-opentelemetry-collector/collector-for-linux
[4]: /ja/observability_pipelines/configuration/set_up_pipelines
[6]: https://app.datadoghq.com/observability-pipelines
[7]: /ja/api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[9]: /ja/observability_pipelines/configuration/live_capture/