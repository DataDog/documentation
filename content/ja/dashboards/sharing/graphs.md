---
title: グラフの共有
aliases:
    - /graphing/faq/is-there-a-way-to-share-graphs
    - /graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
    - /graphing/dashboards/shared_graph/
further_reading:
- link: "https://www.datadoghq.com/blog/dashboard-sharing/"
  tag: ブログ
  text: ダッシュボードを組織外の人と安全に共有する
- link: /dashboards/
  tag: ドキュメント
  text: Datadog でダッシュボードを作成
- link: /dashboards/guide/embeddable-graphs-with-template-variables/
  tag: ガイド
  text: テンプレート変数による埋め込み可能なグラフ
- link: /dashboards/widgets/
  tag: ドキュメント
  text: ダッシュボードのウィジェットについて
---

To share a graph:

1. From the graph you want to share, click the pencil icon in the upper right corner.
1. *Graph your data* セクションで **Share** タブを選択します。
1. グラフのタイムフレームを選択します。
1. グラフサイズを選択します。
1. 凡例を入れるかどうかを選択します。
1. **Generate embed code** ボタンを使用して、埋め込みコードを取得します。

{{< img src="dashboards/sharing/graph_share_tab.png" alt="グラフエディタの Share タブ" style="width:95%;">}}

## 無効化

個々の（埋め込み）グラフの共有に使用されたキーを無効にするには

1. Navigate to [**Organization Settings > Public Sharing > Shared Graphs**][1] to see a list of all shared graphs.
2. Find your graph by using the search bar or by sorting the table columns.
3. 共有を停止するグラフの横にある **Revoke** ボタンをクリックします。

## 制限の適用

You can restrict access on an IP address basis to your dashboard. Email [Datadog support][2] to enable the IP address include listing feature that allows administrators to provide a list of IP addresses that have access to shared dashboards. After it's enabled, manage your restrictions on your organization's [Public Sharing][3] page.

## API

Datadog has a [dedicated API][4] allowing you to interact with your shared graphs (embeds):

| エンドポイント                 | 説明                                                             |
|--------------------------|-------------------------------------------------------------------------|
| [Get all embeds][5]     | これまでに作成された埋め込み可能なグラフのリストを取得します。                     |
| [Create embed][6]       | 埋め込み可能なグラフを新しく作成します。                                         |
| [Get specific embed][7] | `embed_id` を指定して、以前に作成した埋め込みの HTML フラグメントを取得します。 |
| [Enable embed][8]       | 特定の埋め込みを有効にします。                                             |
| [Revoke embed][9]       | 特定の埋め込みを無効にします。                                             |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/public-sharing/shared-graphs
[2]: /help/
[3]: https://app.datadoghq.com/organization-settings/public-sharing/settings
[4]: /api/latest/embeddable-graphs/
[5]: /api/latest/embeddable-graphs/#get-all-embeds
[6]: /api/latest/embeddable-graphs/#create-embed
[7]: /api/latest/embeddable-graphs/#get-specific-embed
[8]: /api/latest/embeddable-graphs/#enable-embed
[9]: /api/latest/embeddable-graphs/#revoke-embed