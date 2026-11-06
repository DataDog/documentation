---
description: Observability Pipelines Worker を使用して、CrowdStrike Next-Gen SIEM にログを送信する方法を学習します。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: CrowdStrike Next-Gen SIEM 送信先
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の CrowdStrike Next-Gen SIEM 送信先を使用して、CrowdStrike Next-Gen SIEM にログを送信します。

## 前提条件 {#prerequisites}

CrowdStrike NG-SIEM 送信先を使用するには、HEC/HTTP イベントコネクタを使用して CrowdStrike データコネクタをセットアップする必要があります。手順については、[ステップ 1: HEC/HTTP イベントデータコネクタのセットアップ][3]を参照してください。データコネクタをセットアップすると、HEC API キーと URL が提供されます。これらは Observability Pipelines Worker を構成する際に使用します。

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: CrowdStrike NG-SIEM エンドポイント URL、トークン、および該当する場合は TLS パスキーの識別子のみを入力してください。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][4]する際に、CrowdStrike NG-SIEM 送信先を構成します。パイプラインは、[UI][1]、[API][5]、または [Terraform][6] を使用してセットアップできます。このセクションの手順は UI で構成されます。

パイプライン UI で CrowdStrike NG-SIEM 送信先を選択した後:

1. CrowdStrike NG-SIEM エンドポイント URL の識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. CrowdStrike NG-SIEM トークンの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. ドロップダウンメニューで {{< ui >}}JSON{{< /ui >}} または {{< ui >}}Raw{{< /ui >}} エンコーディングを選択します。

{{% observability_pipelines/secrets_env_var_note %}}

#### オプション設定 {#optional-settings}

##### 圧縮を有効にする {#enable-compressions}

1. スイッチを切り替えて、{{< ui >}}Enable compressions{{< /ui >}} に設定します。
1. ドロップダウンメニューでアルゴリズム ({{< ui >}}gzip{{< /ui >}} または {{< ui >}}zlib{{< /ui >}}) を選択します。

##### TLS の有効化{#enable-tls}

{{% observability_pipelines/tls_settings %}}

##### バッファリング{#buffering}

{{% observability_pipelines/destination_buffer %}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- CrowdStrike NG-SIEM エンドポイント URL の識別子:
	- シークレットマネージャーでは、URL にサフィックス **を含めない**でください。`/services/collector`URL は次の形式に従う必要があります: `https://<your_instance_id>.ingest.us-1.crowdstrike.com`。
	- デフォルトの識別子は `DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_ENDPOINT_URL` です。
- CrowdStrike NG-SIEM トークンの識別子:
	- デフォルトの識別子は `DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_TOKEN` です。
- CrowdStrike NG-SIEM TLS パスフレーズ識別子 (TLS が有効な場合):
	- デフォルトの識別子は `DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

{{% /tab %}}
{{< /tabs >}}

## 送信先の動作{#how-the-destination-works}

### イベントのバッチ処理{#event-batching}

イベントのバッチは、次のパラメーターのいずれかが満たされたときにフラッシュされます。詳細については、[送信先のイベントのバッチ処理][2] を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)   |
|----------------|-------------------|---------------------|
| なし           | 1                 | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching
[3]: https://falcon.us-2.crowdstrike.com/documentation/page/bdded008/hec-http-event-connector-guide
[4]: /ja/observability_pipelines/configuration/set_up_pipelines/
[5]: /ja/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline