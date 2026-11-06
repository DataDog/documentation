---
aliases:
- /ja/cloud_cost_management/tag_explorer
description: 請求書のものを含む、すべてのコスト関連タグを検索および管理し、そのソースに関する洞察を得ることができます。
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management について
- link: /cloud_cost_management/setup/custom
  tag: ドキュメント
  text: カスタムコストについて
- link: /cloud_cost_management/datadog_costs
  tag: ドキュメント
  text: Datadog コストについて
- link: /cloud_cost_management/setup/saas_costs
  tag: ドキュメント
  text: SaaS および AI コストについて
- link: /cloud_cost_management/allocation/tag_pipelines
  tag: ドキュメント
  text: Tag Pipelines について
title: タグエクスプローラー
---
## 概要{#overview}

[Cloud Cost Management][1] は、コスト関連のすべてのタグのソースを検出します。[カスタムコスト][4]、[Datadog コスト][5]、[SaaS コストインテグレーション][6]など、コストの内訳を表示するためのタグを検索および管理できます。

[タグエクスプローラー][2]を使用して、各タグのソースを把握し、説明を表示します。これには、[Tag Pipelines][3] を通じて管理されるタグが含まれます。Tag Pipelines を使用すると、クラウド請求書の不足しているタグや誤ったタグを修正するタグルールを作成および管理したり、ビジネスロジックに従って推論タグを作成したりできます。

## セットアップ{#setup}

タグエクスプローラーを使用するには、AWS、Azure、Google Cloud、または Oracle Cloud 用に [Cloud Cost Management][1] を構成する必要があります。

各クラウドプロバイダーのドキュメントを参照してください。

{{< card-grid image_width="50" >}}
  {{< image-card href="/cloud_cost_management/setup/aws/" src="integrations_logos/amazon-web-services_avatar.svg" alt="AWS" >}}
  {{< image-card href="/cloud_cost_management/setup/azure/" src="integrations_logos/azure_avatar.svg" alt="Azure" >}}
  {{< image-card href="/cloud_cost_management/setup/google_cloud/" src="integrations_logos/google-cloud-platform_avatar.svg" alt="Google Cloud" >}}
{{< /card-grid >}}

## タグの検索と管理{#search-and-manage-tags}

[[{{< ui >}}Cloud Cost{{< /ui >}}] > [{{< ui >}}Analyze{{< /ui >}}]][2] に移動し、[{{< ui >}}Tags{{< /ui >}}] タブを選択して、クラウドプロバイダーの請求書、[カスタムコスト][4]、[Datadog コスト][5]、[SaaS コストインテグレーション][6]、および [Tag Pipelines][3] からタグを検索します。

特定のプロバイダーのタグを表示するには、左上隅にある [{{< ui >}}Provider{{< /ui >}}] ドロップダウンメニューからそのプロバイダーを選択します。[{{< ui >}}Tag Sources{{< /ui >}}] パネルを使用して、各タグのソースに基づいて結果をさらに絞り込みます。

タグは、以下のプロバイダーで利用可能です。

- AWS
- Azure
- Confluent Cloud\*
- Databricks\*
- Datadog\*
- Elastic Cloud\*
- Fastly\*
- Google Cloud
- MongoDB\*
- OpenAI\*
- Oracle Cloud
- Snowflake\*
- Twilio\*

* このプロバイダーのコストはプレビュー版です。

## 優先タグを設定する{#set-preferred-tags}
Cloud Cost Management 全体で組織の最も重要なタグを強調するために、最大 5 つの優先タグを設定できます。これらのタグは、[エクスプローラーページ][7]、[CCM レポート][8]、[カスタム配分ルール][9]などでタグを選択する際に最初に表示されます。

{{< img src="cloud_cost/tag_explorer/preferred_tags_1.png" alt="優先タグは CCM 全体に表示される" style="width:100%;" >}}

[Tag Pipelines][3] を含む、既存のコストデータタグから優先タグを選択できます。この設定は組織全体に適用されます。

{{< img src="cloud_cost/tag_explorer/preferred_tags_2.png" alt="タグエクスプローラーで優先タグを選択する" style="width:100%;" >}}

## タグの説明を編集する {#edit-tag-descriptions}

タグエクスプローラーで任意のタグの説明を追加または編集して、そのタグが何を表し、どのように使用されるべきかについてのコンテキストを提供できます。タグの説明フィールドをクリックして変更するか、AI を使用して説明を自動生成します。

{{< img src="cloud_cost/tag_explorer/edit_tag_description.png" alt="AI 生成オプションを使用してタグエクスプローラーのタグの説明を編集する" style="width:60%;" >}}

タグの説明は組織の全メンバーに表示され、以下の場所に表示されます。

- {{< ui >}}Tags{{< /ui >}}: 説明は、各タグキーの横にあるタグテーブルに表示されます。
- {{< ui >}}Group-by selectors{{< /ui >}}: Cloud Cost Management 全体でグループ化するタグを選択する際、説明がドロップダウンメニューに表示され、ユーザーが適切なタグを選択するのに役立ちます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/cloud_cost_management/
[2]: https://app.datadoghq.com/cost/analyze/tags
[3]: /ja/cloud_cost_management/allocation/tag_pipelines
[4]: /ja/cloud_cost_management/setup/custom
[5]: /ja/cloud_cost_management/datadog_costs
[6]: /ja/cloud_cost_management/setup/saas_costs
[7]: https://app.datadoghq.com/cost/explorer
[8]: /ja/cloud_cost_management/reporting
[9]: /ja/cloud_cost_management/allocation/custom_allocation_rules