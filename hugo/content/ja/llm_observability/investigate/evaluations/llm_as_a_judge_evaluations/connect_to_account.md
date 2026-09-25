---
aliases:
- /ja/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/connect_to_account/
- /ja/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/connect_to_account/
description: LLM プロバイダーアカウントを接続して、Judge LLM ベースの評価をサポートする方法
further_reading:
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
  tag: ドキュメント
  text: カスタム LLM-as-a-judge 評価について
title: LLM プロバイダーアカウントを接続する
---
## LLM プロバイダーアカウントを接続する {#connect-your-llm-provider-account}

Bring-Your-Own-Key (BYOK) 評価に使用する LLM プロバイダーを構成します。このステップは 1 回完了すれば問題ありません。

{{< tabs >}}
{{% tab "OpenAI" %}}

<div class="alert alert-danger">HIPAA の対象となる場合は、ビジネスアソシエイト契約 (BAA) の対象であり、HIPAA コンプライアンスのすべての要件を満たす OpenAI アカウントにのみ接続するようにする責任があります。</div>

OpenAI の API キーを使用して、OpenAI アカウントを Agent Observability に接続します。

1. Datadog で [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1] の順に移動します。
1. OpenAI のタイルで {{< ui >}}Connect{{< /ui >}} を選択します。
1. タイル上の手順に従って進めます。
   - OpenAI API キーを入力します。このキーに {{< ui >}}model capabilities{{< /ui >}} の {{< ui >}}write{{< /ui >}} 権限があることを確認してください。
1. {{< ui >}}Use this API key to evaluate your LLM applications{{< /ui >}} を有効にします。
1. Agent Observability では、選択されたモデルで `complete/chat` API エンドポイントが利用可能でなければなりません。どのモデルがこのエンドポイントをサポートしているかについては、[OpenAI のモデル概要ページ][3] を参照してください。

{{< img src="llm_observability/configuration/openai-tile.png" alt="Agent Observability の OpenAI 構成タイル。OpenAI の構成および OpenAI API キーの入力手順が表示されます。" style="width:100%;" >}}

Agent Observability は、OpenAI の [データレジデンシー][2] をサポートしていません。

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://platform.openai.com/docs/guides/your-data#which-models-and-features-are-eligible-for-data-residency
[3]: https://developers.openai.com/api/docs/models
{{% /tab %}}
{{% tab "Azure OpenAI" %}}

<div class="alert alert-danger">HIPAA の対象となる場合は、ビジネスアソシエイト契約 (BAA) の対象であり、HIPAA コンプライアンスのすべての要件を満たす Azure OpenAI アカウントにのみ接続するようにする責任があります。</div>

OpenAI の API キーを使用して、Azure OpenAI アカウントを Agent Observability に接続します。Datadog では、評価に `GPT-4o mini` モデルを使用することを強く推奨しています。選択されたモデルバージョンは [構造化出力][8] をサポートしている必要があり、Chat Completions API が利用可能でなければなりません。[互換性のあるモデルの全リスト][9] を参照してください。

1. Datadog で [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1] の順に移動します。
1. Azure OpenAI タイルで {{< ui >}}Connect{{< /ui >}} を選択します。
1. タイル上の手順に従って進めます。
   - Azure OpenAI API キーを入力します。このキーに {{< ui >}}write{{< /ui >}} の {{< ui >}}model capabilities{{< /ui >}} 権限があることを確認してください。
   - リソース名、デプロイ ID、API バージョンを入力して、インテグレーションを完了します。

{{< img src="llm_observability/configuration/azure-openai-tile.png" alt="Agent Observability の Azure OpenAI 構成タイル。Azure OpenAI の構成と、API キー、リソース名、デプロイ ID、API バージョンの入力に関する手順が表示されます。" style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[8]: https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/structured-outputs
[9]: https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure?tabs=global-standard-aoai%2Cglobal-standard&pivots=azure-openai
{{% /tab %}}
{{% tab "Anthropic" %}}

<div class="alert alert-danger">HIPAA の対象となる場合は、ビジネスアソシエイト契約 (BAA) の対象であり、HIPAA コンプライアンスのすべての要件を満たす Anthropic アカウントにのみ接続するようにする責任があります。</div>

Anthropic の API キーを使用して、Anthropic アカウントを Agent Observability に接続します。

1. Datadog で [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1] の順に移動します。
1. Anthropic タイルで {{< ui >}}Connect{{< /ui >}} を選択します。
1. タイル上の手順に従って進めます。
   - Anthropic API キーを入力します。このキーに {{< ui >}}write{{< /ui >}} の {{< ui >}}model capabilities{{< /ui >}} 権限があることを確認してください。

{{< img src="llm_observability/configuration/anthropic-tile.png" alt="Agent Observability の Anthropic 構成タイル。Anthropic の構成および Anthropic API キーの入力手順が表示されます。" style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}
{{% tab "Amazon Bedrock" %}}

<div class="alert alert-danger">HIPAA の対象となる場合は、ビジネスアソシエイト契約 (BAA) の対象であり、HIPAA コンプライアンスのすべての要件を満たす Amazon Bedrock アカウントにのみ接続するようにする責任があります。</div>

AWS アカウントを使用して、Amazon Bedrock アカウントを Agent Observability に接続します。

1. Datadog で [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1] の順に移動します。
1. Amazon Bedrock タイルで {{< ui >}}Connect{{< /ui >}} を選択します。
1. タイル上の手順に従って進めます。

   {{< img src="llm_observability/configuration/amazon-bedrock-tile.png" alt="Agent Observability の Amazon Bedrock 構成タイル。Amazon Bedrock の構成手順が表示されます。" style="width:100%;" >}}

4. 評価を実行するには、{{< ui >}}Invoke models from Amazon Bedrock{{< /ui >}} ロールを必ず設定してください。InvokeModel アクションの詳細については、[Amazon Bedrock API リファレンスドキュメント][2] を参照してください。


   {{< img src="llm_observability/configuration/amazon-bedrock-tile-step-2.png" alt="Amazon Bedrock 設定の 2 番目のステップでは、ユーザーが統合アカウントに権限を追加する必要があります。" style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
{{% /tab %}}

{{% tab "GCP Vertex AI" %}}

<div class="alert alert-danger">HIPAA の対象となる場合は、ビジネスアソシエイト契約 (BAA) の対象であり、HIPAA コンプライアンスのすべての要件を満たす Google Cloud Platform アカウントにのみ接続するようにする責任があります。</div>

Google Cloud Platform アカウントを使用して、Vertex AI を Agent Observability に接続します。

1. Datadog で [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1] の順に移動します。
1. Google Cloud Vertex AI タイルで、{{< ui >}}Connect{{< /ui >}} をクリックして新しい GCP アカウントを追加するか、既存のアカウントがリストされている場所の横にある {{< ui >}}Configure{{< /ui >}} をクリックしてオンボーディングプロセスを開始します。
   - このページには、Datadog に接続されているすべての GCP アカウントが表示されます。ただし、Agent Observability でアカウントを使用するには、オンボーディングプロセスを完了する必要があります。
1. オンボーディングの手順に従ってアカウントを構成します。
   - [{{< ui >}}Vertex AI User{{< /ui >}}][2] ロールをアカウントに追加し、[{{< ui >}}Vertex AI API{{< /ui >}}][3] を有効にします。

{{< img src="llm_observability/configuration/vertex-ai-pint.png" alt="Vertex AI のオンボーディングワークフロー。Agent Observability で使用するために、適切な Vertex AI 権限を持つ GCP サービスアカウントを構成する手順に従います。" style="width:100%;" >}}

**注**: 評価を実行する場合、ロケーションセレクターには単一リージョン、マルチリージョン、およびグローバルオプションが用意されています。各オプションの詳細については、[Google Vertex AI のロケーションに関するドキュメント][4] を参照してください。

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://docs.cloud.google.com/vertex-ai/docs/general/access-control#aiplatform.user
[3]: https://console.cloud.google.com/apis/library/aiplatform.googleapis.com
[4]: https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations
{{% /tab %}}

{{% tab "AI Gateway" %}}
<div class="alert alert-danger">HIPAA の対象となる場合は、ビジネスアソシエイト契約 (BAA) の対象であり、HIPAA コンプライアンスのすべての要件を満たす AI Gateway にのみ接続するようにする責任があります。</div>

AI Gateway は、[OpenAI API 仕様][2] と互換性がなければなりません。

ベース URL、API キー、およびヘッダーを使用して、AI Gateway を Agent Observability に接続します。

1. Datadog で [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1] の順に移動します。
1. {{< ui >}}Configure{{< /ui >}} タブをクリックし、{{< ui >}}New{{< /ui >}} をクリックして新しいゲートウェイを作成します。
1. タイル上の手順に従って進めます。
   - ゲートウェイの名前を入力します。
   - プロバイダーを選択します。
   - ベース URL を入力します。
   - API キーと、必要に応じてヘッダーを入力します。

{{< img src="llm_observability/configuration/ai-gateway-tile-3.png" alt="Agent Observability の AI Gateway 構成タイル。AI Gateway の構成手順が表示されます" style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://platform.openai.com/docs/api-reference/introduction
{{% /tab %}}
{{< /tabs >}}

LLM プロバイダーが IP アドレスを制限している場合は、[Datadog の IP 範囲に関するドキュメント][2] にアクセスし、`Datadog Site` を選択して、`GET` の URL をブラウザに貼り付け、`webhooks` セクションをコピーすることで、必要な IP 範囲を取得できます。

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: /ja/api/latest/ip-ranges/