---
description: Observability Pipelines Worker を使用して New Relic にログを送信する方法をご紹介します。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: New Relic Destination
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の New Relic Destination を使用して、ログを New Relic に送信します。

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: アカウント ID とライセンスの識別子のみを入力します。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][3] する際に、New Relic 送信先を構成します。パイプラインのセットアップは、[UI][1] で、[API][4] を使用して、または [Terraform][5] で行えます。このセクションの手順は UI で構成されます。

パイプライン UI で New Relic 送信先を選択したら、次のようにします。

1.  アカウント ID の識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1.  ライセンスの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. New Relic アカウントのデータセンター リージョン ({{< ui >}}US{{< /ui >}} または {{< ui >}}EU{{< /ui >}}) を選択します。

{{% observability_pipelines/secrets_env_var_note %}}

### オプションのバッファリング {#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- New Relic アカウント ID の識別子:
	- デフォルトの識別子は `DESTINATION_NEW_RELIC_ACCOUNT_ID` です。
- New Relic ライセンスの識別子:
	- デフォルトの識別子は `DESTINATION_NEW_RELIC_LICENSE_KEY` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/new_relic %}}

{{% /tab %}}
{{< /tabs >}}

## 送信先の動作 {#how-the-destination-works}

### イベントのバッチ処理 {#event-batching}

イベントのバッチは、次のパラメーターのいずれかが満たされたときにフラッシュされます。詳細については、[送信先のイベントのバッチ処理][2] を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)|
|----------------|-------------------|---------------------|
| 100            | 1                 | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching
[3]: /ja/observability_pipelines/configuration/set_up_pipelines/
[4]: /ja/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline