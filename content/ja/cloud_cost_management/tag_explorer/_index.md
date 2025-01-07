---
description: 請求書を含む、すべてのコスト関連タグを検索および管理し、その出所に関する洞察を得ることができます。
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management について
- link: /cloud_cost_management/custom
  tag: ドキュメント
  text: カスタムコストについて
- link: /cloud_cost_management/datadog_costs
  tag: ドキュメント
  text: Datadog コストについて
- link: /cloud_cost_management/saas_costs
  tag: ドキュメント
  text: SaaS Cost インテグレーションについて
- link: /cloud_cost_management/tag_pipelines
  tag: ドキュメント
  text: Tag Pipelines について
title: Tag Explorer
---

## 概要

[Cloud Cost Management][1] は、すべてのコスト関連タグの出所を検出し、[カスタムコスト][4]、[Datadog コスト][5]、[SaaS コストインテグレーション][6]などのコストを分解するためのタグを検索および管理できます。

[Tag Explorer][2] を使用して、[Tag Pipelines][3] で管理されているタグに加えて、各タグの出所を理解し、説明を表示します。[Tag Pipelines][3] を使用すると、クラウド請求書のタグの欠落や不正確なタグを修正するためのタグルールを作成および管理したり、ビジネスロジックに基づいて推論タグを作成したりできます。

{{< img src="cloud_cost/tag_explorer/dropdown_1.png" alt="Tag Explorer で Azure のコスト関連タグのリストを検索し、コストの出所を把握します" style="width:100%;" >}}

## セットアップ

Tag Explorer を使用するには、AWS、Azure、または Google Cloud 用に [Cloud Cost Management][1] を構成する必要があります。

各クラウドプロバイダーのドキュメントを参照してください。

{{< partial name="cloud_cost/getting-started.html" >}}

</br>

## タグの検索と管理

[**Infrastructure** &gt; **Cloud Costs** &gt; **Tags** &gt; **Tag Explorer**][2] に移動して、クラウドプロバイダーの請求書、カスタムコスト、Datadog コスト、SaaS コストインテグレーション、タグパイプラインに関連するタグを検索します。

{{< tabs >}}
{{% tab "AWS" %}}

AWS タグの場合は、右上のドロップダウンメニューから **AWS** を選択します。

{{< img src="cloud_cost/tag_explorer/aws_1.png" alt="Tag Explorer で AWS のコスト関連タグのリストを検索し、コストの出所を把握します" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Azure" %}}

Azure タグの場合は、右上のドロップダウンメニューから **Azure** を選択します。

{{< img src="cloud_cost/tag_explorer/azure_1.png" alt="Tag Explorer で Azure のコスト関連タグのリストを検索し、コストの出所を把握します" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Google" %}}

Google Cloud のタグの場合は、右上のドロップダウンメニューから **Google** を選択します。

{{< img src="cloud_cost/tag_explorer/google_1.png" alt="Tag Explorer で Azure のコスト関連タグのリストを検索し、コストの出所を把握します" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Datadog" %}}

<div class="alert alert-warning">Datadog の日次コストはプレビュー版です。</div>

Datadog タグの場合は、右上のドロップダウンメニューから **Datadog** を選択します。

{{< img src="cloud_cost/tag_explorer/datadog_1.png" alt="Tag Explorer で Datadog のコストタグのリストを検索し、コストの出所を把握します" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Confluent Cloud" %}}

<div class="alert alert-warning">Confluent Cloud のコストはプレビュー版です。</div>

Confluent Cloud タグの場合は、右上のドロップダウンメニューから **Confluent Cloud** を選択します。

{{< img src="cloud_cost/tag_explorer/confluent_cloud_1.png" alt="Tag Explorer で Confluent Cloud のコストタグのリストを検索し、コストの出所を把握します" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Databricks" %}}

<div class="alert alert-warning">Databricks のコストはプレビュー版です。</div>

Databricks タグの場合は、右上のドロップダウンメニューから **Databricks** を選択します。

{{< img src="cloud_cost/tag_explorer/databricks_1.png" alt="Tag Explorer で Databricks のコストタグのリストを検索し、コストの出所を把握します" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Fastly" %}}

<div class="alert alert-warning">Fastly のコストはプレビュー版です。</div>

Fastly のタグの場合は、右上のドロップダウンメニューから **Fastly** を選択します。

{{< img src="cloud_cost/tag_explorer/fastly_1.png" alt="Tag Explorer で Fastly のコストタグのリストを検索し、コストの出所を把握します" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Elastic Cloud" %}}

<div class="alert alert-warning">Elastic Cloud のコストはプレビュー版です。</div>

Elastic Cloud タグの場合は、右上のドロップダウンメニューから **Elastic Cloud** を選択します。

{{< img src="cloud_cost/tag_explorer/elastic_cloud.png" alt="Tag Explorer で Elastic Cloud のコストタグのリストを検索し、コストの出所を把握します" style="width:100%;" >}}

{{% /tab %}}
{{% tab "MongoDB" %}}

<div class="alert alert-warning">MongoDB のコストはプレビュー版です。</div>

MongoDB タグの場合は、右上のドロップダウンメニューから **MongoDB** を選択します。

{{< img src="cloud_cost/tag_explorer/mongodb_1.png" alt="Tag Explorer で MongoDB のコストタグのリストを検索し、コストの出所を把握します" style="width:100%;" >}}

{{% /tab %}}
{{% tab "OpenAI" %}}

<div class="alert alert-warning">OpenAI のコストはプレビュー版です。</div>

OpenAI のタグの場合は、右上のドロップダウンメニューから **OpenAI** を選択します。

{{< img src="cloud_cost/tag_explorer/openai_1.png" alt="Tag Explorer で OpenAI のコストタグのリストを検索し、コストの出所を把握します" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Snowflake" %}}

<div class="alert alert-warning">Snowflake のコストはプレビュー版です。</div>

Snowflake タグの場合は、右上のドロップダウンメニューから **Snowflake** を選択します。

{{< img src="cloud_cost/tag_explorer/snowflake_1.png" alt="Tag Explorer で Snowflake のコストタグのリストを検索し、コストの出所を把握します" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Twilio" %}}

<div class="alert alert-warning">Twilio のコストはプレビュー版です。</div>

Twilio タグの場合は、右上のドロップダウンメニューから **Twilio** を選択します。

{{< img src="cloud_cost/tag_explorer/twilio_1.png" alt="Tag Explorer で Twilio のコストタグのリストを検索し、コストの出所を把握します" style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/cloud_cost_management/
[2]: https://app.datadoghq.com/cost/tags
[3]: /ja/cloud_cost_management/tag_pipelines
[4]: /ja/cloud_cost_management/custom
[5]: /ja/cloud_cost_management/datadog_costs
[6]: /ja/cloud_cost_management/saas_costs