---
description: Configuration ページで LLM アプリケーションのトピックと評価を構成する方法をご紹介します。
further_reading:
- link: /llm_observability/terms/
  tag: ドキュメント
  text: 評価について
- link: /llm_observability/submit_evaluations/
  tag: ドキュメント
  text: 評価の提出方法について
- link: /llm_observability/setup
  tag: ドキュメント
  text: Learn how to set up LLM Observability
title: 構成
---

## 概要

Settings ページで LLM アプリケーションを設定することで、アプリケーションのパフォーマンスとセキュリティを最適化できます。

Evaluations:
Datadog が LLM アプリケーションを品質、セキュリティ、そして安全性などの観点で評価できるようにします。Evaluations を有効化することで、アプリケーションの応答効果を分析し、パフォーマンスおよびユーザーの安全面の両方で高い水準を維持できます。Evaluations の詳細については、[Terms and Concepts][1] を参照してください。

Topics:
`topic relevancy` の既定の評価機能において、無関係な入力を識別するのに役立ちます。これにより、LLM アプリケーションが本来の目的にしっかりと集中した状態を保てます。

## アカウントを接続する

{{< tabs >}}
{{% tab "OpenAI" %}}

OpenAI の API キーを使用して、OpenAI アカウントを LLM Observability に接続します。

1. Datadog で、[**LLM Observability > Settings > Integrations**][1] に移動します。
1. OpenAI のタイルで **Connect** を選択します。
1. タイル上の手順に従って進めます。
   - OpenAI API キーを入力します。必ずこのキーに **model capabilities** の書き込み権限があることを確認してください。
1. **Use this API key to evaluate your LLM applications** を有効にします。

{{< img src="llm_observability/configuration/openai-tile.png" alt="LLM Observability の OpenAI 設定タイル。OpenAI を設定し、OpenAI API キーを入力するための指示が記載されている。" style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}

{{% tab "Azure OpenAI" %}}
OpenAI API キーを使用して Azure OpenAI アカウントを LLM Observability に接続します。評価には **GPT-4o mini** モデルの使用を強く推奨します。

1. Datadog で、[**LLM Observability > Settings > Integrations**][1] に移動します。
1. Azure OpenAI のタイルで **Connect** を選択します。
1. タイル上の手順に従って進めます。
   - Azure OpenAI API キーを入力します。必ずこのキーに **model capabilities** の書き込み権限があることを確認してください。
   - リソース名 (Resource Name)、デプロイ ID (Deployment ID)、API バージョンを入力して、インテグレーションを完了します。 

{{< img src="llm_observability/configuration/azure-openai-tile.png" alt="LLM Observability の Azure OpenAI 設定タイル。Azure OpenAI の設定と API Key、Resource Name、Deployment ID、API Version の入力手順が記載されている。" style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}
{{< /tabs >}}
## 評価を選択して有効化する

1. [**LLM Observability > Settings > Evaluations**][2] に移動します。
1. 有効にしたい評価をクリックします。
1. **OpenAI** または **Azure OpenAI** を LLM プロバイダーとして選択します。
1. 評価を実行するアカウントを選択します。 
1. 評価を実行したい LLM アプリケーションを指定します。

**Save** をクリックすると、LLM Observability は提供された API キーを使用して `GPT-4o mini` モデルを呼び出します。

Evaluations の詳細については、[Terms and Concepts][1] を参照してください。

### 推定トークン使用量 (Estimated Token Usage)

LLM Observability では、Evaluations を動かすために消費されるトークン量を監視・管理できるメトリクスを提供しています。以下のメトリクスを使用して、Evaluations に必要な LLM リソースの利用状況を把握することができます。


- `ml_obs.estimated_usage.llm.input.tokens`
- `ml_obs.estimated_usage.llm.output.tokens`
- `ml_obs.estimated_usage.llm.total.tokens`

これらのメトリクスには、`ml_app`、`model_server`、`model_provider`、`model_name`、`evaluation_name` といったタグが付与されるため、どのアプリケーション、モデル、評価が使用量に寄与しているかを正確に特定できます。

## topic relevancy に使用するトピックを設定する

[topic relevancy][3] 評価を使用するには、あらかじめ Topics を設定します。

1. [**LLM Observability > Applications**][4] に移動します。
1. トピックを追加したいアプリケーションを選択します。
1. 左のサイドバー下部にある **Configuration** を選択します。
1. ポップアップでトピックを追加します。

トピックには複数の単語を含めることができ、できるだけ具体的かつ説明的な内容が望ましいです。例: インシデント管理を目的とした LLM アプリケーションであれば、「observability」「software engineering」「incident resolution」など。E コマースストアの顧客問い合わせを扱うアプリケーションの場合、「Customer questions about purchasing furniture on an e-commerce store」のように詳しい記述が有効です。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/terms/
[2]: https://app.datadoghq.com/llm/settings/evaluations
[3]: /ja/llm_observability/terms/#topic-relevancy
[4]: https://app.datadoghq.com/llm/applications