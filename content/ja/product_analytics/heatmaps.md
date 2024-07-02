---
title: ヒートマップ
kind: documentation
description: ヒートマップは、ユーザーが Web サイト上でどこをクリックしたかを視覚化するものです。
further_reading:
- link: /product_analytics/session_replay/browser/
  tag: ドキュメント
  text: セッション リプレイ
- link: "https://www.datadoghq.com/blog/visualize-behavior-datadog-scrollmaps/"
  tag: ブログ
  text: Visualize user interactions with your pages by using Scrollmaps in Datadog Heatmaps
---

{{< callout url="http://datadoghq.com/private-beta/product-analytics" header="false" >}}
All features in Product Analytics are in limited availability. To request access, complete the form.
{{< /callout >}}

{{< img src="real_user_monitoring/heatmaps/heatmap_v2.png" alt="ヒートマップ機能の概要です。" style="width:100%;">}}

A heatmap (or heat map) is a visualization of your user's interactions overlaid on Session Replay data. Product Analytics has three different types of heatmaps:

- **Click maps:** View user interactions (clicks) to understand how users engage with your page
- **Top Elements:** View a ranking of up to the top 10 most interacted-with elements on a given page.
- **Scroll maps:** View how far users scroll down a page, including where the average fold of a page falls. The average fold is the lowest point on a page that a user can see on their device without scrolling.

Use heatmaps to review complex data at a glance, gaining insights around optimizing your user experience.

## 前提条件

ヒートマップを始めるには

1. Verify your SDK version:
  - For Click maps, you must be on the latest version of the SDK (v4.40.0 or later).
  - For Scroll maps, you must be on (v4.50.0 or later)
2. [セッションリプレイ][1]を有効にします。
3. Set`trackUserInteractions: true` in the SDK initialization to enable action tracking (required for Clickmaps).

## はじめに

Navigate to [**Digital Experience > Product Analytics > Heatmaps**][2]. Select your application and view.

On the [Product Analytics landing page][3], select your application and view. You can select the type of heatmap you would like to view as well (Top Elements, Click Map, Scroll Map).

{{< img src="product_analytics/heatmaps/heatmaps-pa.png" alt="Select an application to view heatmaps for it" style="width:100%;" >}}

This takes you to the [heatmap page][2] for a particular view. You can switch the view being shown with the **View Name** and **Application** selectors at the top. To add more granular filters, like a specific geography for example, you can add a filter from the panel on the left side.

{{< img src="real_user_monitoring/heatmaps/heatmaps-filters-v2.png" alt="Shows the selector for selecting an application and a view from the options where you have already enabled session replay." style="width:100%;">}}

## Click maps

A Click map shows you the most interacted-with actions on a given view by aggregating user click actions from sessions and visualizing them as blobs on the map.

{{< img src="real_user_monitoring/heatmaps/heatmap_v3.png" alt="Clickmap data overlayed on a website." style="width:60%;">}}

Each Click map also offers analytics such as:

- Where that page ranks out of all other visited pages
- Unique user counts to that page
- Any frustration signals on that page

パネルの下には、そのページで発生したすべてのアクションが、頻度別にリストアップされています。アクションをクリックすると、そのインタラクションについてより詳しく理解することができます。例:

- ユーザーが行ったアクションの回数と、そのページでの上位アクションの全体的な分析での位置づけ。
- そのアクションにフラストレーションシグナルが発生していた場合 (例えば、ユーザーがそのボタンを激怒してクリックした場合) には、関連するフラストレーションシグナルも表示することができます。

{{< img src="real_user_monitoring/heatmaps/actions.jpeg" alt="アクションの例と、そのアクションについて得られる情報を表示します。" style="width:60%;">}}

## Top Elements

Top Elements heatmaps aggregate click actions on a given view by displaying the most interacted-with elements and their rank. The ranking on the map itself corresponds to the action name on the side.

{{< img src="real_user_monitoring/heatmaps/top-elements-v3.png" alt="A ranking of the top elements clicked on a page." style="width:100%;">}}

Click any action name in the panel to highlight the corresponding action on the map.

## Scroll maps

Scroll maps show a visual of the aggregate scroll activity on a given page. Use Scroll maps to see where the average fold of the page falls, and how many users scroll to a given depth. You can drag the floating blue bar on a Scroll map to the depth you wish to assess.

{{< img src="real_user_monitoring/heatmaps/scrollmaps-v3.png" alt="Scrollmap of the bedding page in a sample ecommerce application" style="width:100%;">}}

The panel to the left of the Scroll map provides high-level insights with direct links to query results, such as a link to a list of views where the user scrolled past a given percentile. Below the insight panel is a minimap of the page and a distribution graph displaying granular scroll data, useful for identifying where the biggest drop-off occurs.

{{< img src="real_user_monitoring/heatmaps/scrollmaps-insights-panel.png" alt="A screenshot of the queries for scroll data insights" style="width:50%;">}}

## 次のステップ

After understanding analytics, the next step is to understand the action in the context of other data outside of heatmaps. This might mean pivoting to the [Analytics explorer][4]. You can also watch associated [session replays][1] to visually see a user performing the action in the context of their overall session.

## トラブルシューティング

### あるビューのヒートマップを見ているのですが、予想外のページが表示されるのですが。

Heatmaps are based on Product Analytics view names. Depending on how your Product Analytics application is configured, many pages can start being grouped under the same view name, or you can start having specific view names.

### 選択したビューに、初期コンテンツが表示されないのですが。

Heatmaps are generated with Session Replay data. Datadog's intelligent algorithm smartly picks a replay that is both recent and best matches the initial state of the page. In some cases, you might not be able to find the correct replay. To switch the background of your heatmap, you can use the **Choose Background** button to navigate through the different states of the page and find the one you are looking for.

{{< img src="real_user_monitoring/heatmaps/heatmaps-background-selector.mp4" alt="背景選択ボタンで別の背景を選択する" video=true >}}

### ヒートマップ横のアクションリストに、ヒートマップでは見えない要素がアイコンで表示されているのですが。

{{< img src="real_user_monitoring/heatmaps/heatmaps-hidden-elements.png" alt="ヒートマップ上のアクションリストの非表示要素。" style="width:60%;">}}

アイコンのツールチップに **element is not visible** と表示されています。これは、その要素がページ上で一般的なアクションであるにもかかわらず、ヒートマップの背景には表示されていないことを意味します。その要素を見るには、右下の **Choose Background** をクリックして、ヒートマップの背景をその要素が存在するものに切り替えることができます。

### ヒートマップを作成しようとすると、"No Replay Data" (リプレイデータなし) という状態が表示されるのですが。

This means that Datadog could not find any Session Replays to use as a heatmap background that matches the current search filters. If you just started to record sessions with the [Browser SDK][5], it may also take a few minutes for the Session Replay to be available for viewing.

### ヒートマップを作成しようとすると、"Not enough data to generate a heatmap" (ヒートマップを作成するためのデータが不足しています) という状態が表示されるのですが。

これは、Datadog が、現在選択されているリプレイと、いかなるユーザー アクションもマッチさせることができなかったことを意味します。これは、以下のような様々な理由で発生します。

- アプリケーションが最新の SDK バージョン (>= 4.20.0) を使用していない。
- 最近、お客様のページが大きく変わった。

### ページ内のユーザー情報がすべて空になっている。

User information is not collected by default. Heatmaps use the user information available in your session data to display relevant insights on behavior.

## 参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /product_analytics/session_replay/browser/
[2]: https://app.datadoghq.com/product-analytics/heatmap
[3]: https://app.datadoghq.com/product-analytics/summary
[4]: /product_analytics/analytics_explorer/
[5]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/package.json 