---
description: Learn about facets for filtering and grouping your deployment executions.
further_reading:
- link: continuous_delivery/explorer/
  tag: Documentation
  text: Learn about the CD Visibility Explorer
- link: continuous_delivery/search/
  tag: Documentation
  text: Learn how to search and manage your deployment results
title: Deployment Execution Facets
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CD Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" header="false" >}}
CD Visibility is in private beta. To request access, complete the form.
{{< /callout >}}

## 概要

Facets are user-defined tags and attributes from your pipelines. They are useful for both [qualitative](#qualitative-facets) and [quantitative](#quantitative-measures) data analysis. Facets allow you to manipulate your deployments in the search queries that appear on [dashboards][2] and in [notebooks][3].

[Creating facets](#creating-facets) is **not required** to [search deployment executions][5]. Autocomplete capabilities use existing facets, but also any input that matches incoming deployment executions applies.

The [CD Visibility Explorer][4] includes out-of-the-box facets such as `Environment`, `Deployment Status`, and `Deployment Provider`. You can use facets in the CD Visibility Explorer to:

- [Search for and filter deployment executions][5].
- Perform deployment or environment analytics.
- Start troubleshooting after your deployments complete.

Navigate to [**Software Delivery** > **CD Visibility** > **Executions**][7] to access the list of facets left of the deployment executions list.

{{< img src="/continuous_delivery/explorer/facets.png" text="Facets list on the Deployment Executions page of the CD Visibility Explorer" style="width:100%" >}}

### 定性的ファセット

次が必要な場合は、定性的ファセットを使用します。

- **Get relative insights** for values.
- **一意な値**を数える**。
- Frequently **filter** your deployment executions against particular values. For example, use the facet on the environment tag to scope troubleshooting down to development, staging, or production environments.<br>

**Note:** Although facets are not required to filter on tags, defining facets for tags that you use during investigations can reduce your time to resolution.

### 定量的メジャー

次が必要な場合は、定量的メジャーを使用します。

- **Aggregate** values from multiple deployment executions.
- **Range filter** your deployment executions.
- **Sort** your deployment executions against that value.

#### 種類

メジャーには、同等の機能のために、長整数またはダブル値があります。

#### 単位

Measures support units (**time** in seconds or **size** in bytes) to handle orders of magnitude at query time and display time. The unit is a property of the measure itself, not of the field.

For example, consider a `duration` measure in nanoseconds. Suppose deployments from `env:staging` have `duration:10000000`, meaning `10 milliseconds`. Supposed deployments from `env:qa` have `duration:5000000`, meaning `5 milliseconds`. Use `duration:>2ms` to consistently query deployment execution tags from both environments at once. For more information about search queries, see [Search Syntax][6].

## ファセットパネル

検索バーを使うと、包括的かつインタラクティブにデータをフィルタリングしグループ化することができます。ただし、多くの場合は、ファセットパネルを使った方がよりわかりやすくデータに移動できます。ファセットを開くと、現在のクエリのスコープのコンテンツのサマリーが表示されます

検索バーと URL には、ファセットパネルで選択した内容が自動的に反映されます。

- **ファセット (定性的)** には、一意の値の上位リストと、それぞれに一致するデプロイメント実行の数が用意されています。
- **メジャー (定量的)** には、最小値と最大値を示すスライダーが付いています。スライダーを使用するか、数値を入力して、検索クエリを別の範囲に絞り込みます。

### ファセットのグループ化

Facets are grouped into meaningful themes in the facet list. Assigning or reassigning a group for a facet only affects the facet list, and has no impact on search or analytics.

### ファセットのフィルタリング

Use the search facets box on the facet panel to scope the whole facet list and navigate to the facet you need to interact with. *Search facets* uses the facet display name and field name to scope results.

## ファセットの作成

Creating a facet on a deployment execution attribute or tag is not required to search for deployment executions. Facets are useful if you wish to add a meaningful description to a specific deployment execution attribute, or if you want the attribute values to appear on the Facets list.

### Creating facets from the Deployment Details side panel

Create a facet from the Deployment Details side panel so that most of the facet details are pre-filled.

{{< img src="continuous_delivery/explorer/create_facet.png" alt="Create a facet from the Deployment Details side panel" style="width:100%;">}}

1. Navigate to a deployment execution of interest in the [CD Visibility Explorer][4] that contains the field to create a facet on.
2. Open the Deployment Details side panel by selecting the deployment execution from the list.
3. Click on the desired field and create a facet from there:

   - フィールドに数値がある場合、ファセットまたはメジャーのいずれかを作成できます。
   - フィールドに文字列値がある場合、ファセットの作成のみが可能です。

### ファセットリストからのファセット作成

If finding a deployment execution that has the desired field is not an option, create a facet directly from the facet panel by clicking **+ Add**.

{{< img src="continuous_delivery/explorer/add_facet.png" alt="Add a facet from the facet side panel" style="width:30%;">}}

このファセットの基底のフィールド（キー）名を定義します。

- Use tag key name for environment tags.
- Use the attribute path for deployment execution attributes, with `@` prefix.

Autocomplete based on the content in deployment executions of the current views helps you to define the proper field name. But you can use virtually any value here, specifically in the case that you don't yet have matching deployment executions received by Datadog.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/types/ci
[2]: /ja/dashboards/
[3]: /ja/notebooks/
[4]: /ja/continuous_delivery/explorer
[5]: /ja/continuous_delivery/search
[6]: /ja/continuous_delivery/explorer/search_syntax
[7]: https://app.datadoghq.com/ci/deployments/executions