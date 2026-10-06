---
description: Observability Pipelines Worker を使用して、Sumo Logic Hosted Collector に送信されたログを収集する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Sumo Logic Hosted Collector
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Sumo Logic Hosted Collector ソースを使用して、Sumo Logic Hosted Collector に送信されたログを受信します。

## 前提条件{#prerequisites}

{{% observability_pipelines/prerequisites/sumo_logic %}}

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理を使用する場合は、Sumo Logic アドレスの識別子のみを入力してください。実際の値を<b>入力しないでください</b>。</div>

[パイプラインを設定する][1]際に、このソースを設定します。[UI][2]、[API][3]、または [Terraform][4] を使用してパイプラインを設定できます。このセクションでは、UI でソースを設定するための手順を説明します。

パイプライン UI で Sumo Logic ソースを選択した後、Sumo Logic アドレスの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。

{{% observability_pipelines/secrets_env_var_note %}}

### オプション設定{#optional-settings}

{{< ui >}}Decoding{{< /ui >}}ドロップダウンメニューで、入力形式が未加工の {{< ui >}}Bytes{{< /ui >}}、{{< ui >}}JSON{{< /ui >}}、Graylog Extended Log Format ({{< ui >}}Gelf{{< /ui >}})、または {{< ui >}}Syslog{{< /ui >}} のいずれであるかを選択します。デコード方式を選択しない場合、デフォルトで JSON が使用されます。

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Sumo Logic アドレスの識別子:
	- Sumo Logic HTTP Source に送信される予定だったログを受信するために、Observability Pipelines Worker がリッスンするバインドアドレス (`0.0.0.0:80.` など) を参照します。
	- デフォルトの識別子は `SOURCE_SUMO_LOGIC_ADDRESS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/sumo_logic %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/sumo_logic %}}

[1]: /ja/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /ja/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline