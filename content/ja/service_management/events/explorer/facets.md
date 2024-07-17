---
further_reading:
- link: service_management/events/explorer/attributes
  tag: ドキュメント
  text: 予約済み属性について
kind: ドキュメント
title: Facets
---

## 概要

By default, Datadog indexes event attributes as facets. Facets are accessible from the Event Explorer facet side-panel, analytics, and monitors.

ファセットには、1 つの属性またはタグの個別メンバーが表示されると共に、表示されたイベントの数などの基本的な分析が提供されます。ファセットを使用すると、特定の属性に基づきデータセットの絞り込みや切り口の切り替えができます。絞り込むには、表示する値を選択します。

{{< img src="service_management/events/explorer/facets-location.png" alt="ファセットサイドパネル" style="width:100%;" >}}

### ファセットの作成

ファセットを追加するには、左サイドパネルの **+ Add** を使用します。

ファセットを追加した後、この属性の値がすべての新しいビューに保存され、検索バーとファセットのサイドパネルで使用できるようになります。また、イベントモニターとグラフウィジェットでのグループ化にも使用できます。

### 予約済み属性
**Host**, **Service** and **Status** are part of the core Event Attributes. You can not create new facet on service, host and status tag. 

For Datadog monitor events, the first event tag in alphabetic order is used to set the event attribute. For example, for an event with multiple service tags `service:bcd; service:ace`, `service:ace` will be used to set event attribute. 

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}