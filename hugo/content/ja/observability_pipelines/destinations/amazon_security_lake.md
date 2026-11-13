---
description: Observability Pipelines Worker を使用して Amazon Security Lake にログを送信する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Amazon Security Lake 送信先
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Amazon Security Lake 送信先を使用して、Amazon Security Lake にログを送信します。

## 前提条件 {#prerequisites}

Amazon Security Lake 送信先をセットアップする前に、以下の操作を行う必要があります。

{{% observability_pipelines/prerequisites/amazon_security_lake %}}

## セットアップ {#setup}

[パイプラインをセットアップ][6]する際に、Amazon Security Lake 送信先を設定します。パイプラインは、[UI][1]、[API][7]、または [Terraform][8] を使用してセットアップできます。このセクションの手順は、UI で設定します。

**注記**:
- Amazon Security Lake 送信先を追加すると、OCSF プロセッサが自動的に追加され、ログを Amazon Security Lake に送信する前に Parquet 形式に変換できるようになります。セットアップ手順については、[OCSF ドキュメントへの再マッピング][3]を参照してください。
- OCSF プロセッサによってフォーマットされたログのみが Parquet 形式に変換されます。

パイプライン UI で Amazon Security Lake 送信先を選択した後:

1. S3 バケット名を入力します。
1. AWS リージョンを入力します。
1. カスタムソース名を入力します。

#### オプション設定 {#optional-settings}

##### AWS 認証{#aws-authentication}

1. [AWS 認証][5]オプションを選択します。
1. 引き受ける IAM ロールの ARN を入力します。
1. 必要に応じて、引き受けるロールのセッション名と外部 ID を入力します。

##### TLS の有効化{#enable-tls}

<div class="alert alert-danger">シークレット管理の場合: TLS キーパスの識別子のみを入力します。実際の値は<b>入力しない</b>でください。</div>

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/secrets_env_var_note %}}

##### バッファリング{#buffering}

{{% observability_pipelines/destination_buffer %}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Amazon Security Lake TLS パスフレーズ識別子 (TLS が有効な場合):
	- デフォルトの識別子は `DESTINATION_AWS_SECURITY_LAKE_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_security_lake %}}

{{% /tab %}}
{{< /tabs >}}

## 送信先の仕組み{#how-the-destination-works}

### AWS 認証{#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

#### 権限{#permissions}

{{% observability_pipelines/aws_authentication/amazon_security_lake/permissions %}}

### イベントのバッチ処理{#event-batching}

イベントのバッチは、次のパラメータのいずれかが満たされたときにフラッシュされます。詳細については、[送信先のイベントのバッチ処理][2]を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)|
|----------------|-------------------|---------------------|
| なし           | 256               | 300                 |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching
[3]: /ja/observability_pipelines/processors/remap_ocsf
[5]: /ja/observability_pipelines/destinations/amazon_security_lake/#aws-authentication
[6]: /ja/observability_pipelines/configuration/set_up_pipelines/
[7]: /ja/api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline