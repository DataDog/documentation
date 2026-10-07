---
description: Journey Monitoring マップで、ジャーニーのパフォーマンスを可視化および監視します。
further_reading:
- link: /journey_monitoring
  tag: ドキュメント
  text: Journey Monitoring について学ぶ
- link: /journey_monitoring/map/suggested_journeys/
  tag: ドキュメント
  text: 推奨ジャーニーについて学ぶ
- link: /journey_monitoring/details_report/
  tag: ドキュメント
  text: ジャーニー詳細レポートについて学ぶ
- link: /journey_monitoring/details_report/variants/
  tag: ドキュメント
  text: ジャーニーのバリアントについて学ぶ
- link: /journey_monitoring/uptime/
  tag: ドキュメント
  text: ジャーニーの稼働時間について学ぶ
title: マップ
---
{{< callout url="https://www.datadoghq.com/product-preview/journey-monitoring/" btn_hidden="false" header="プレビュー版をお試しください！">}}
Journey Monitoring のプレビュー版が利用可能です。
{{< /callout >}}

## 概要 {#overview}

**Journey Monitoring マップ**には、フロントエンドアプリケーションにおける作成したジャーニーと推奨ジャーニーがすべて表示されます。マップ内の各タイルには、ジャーニーのボリュームとコンバージョン率に関するメトリクスが表示されます。ジャーニーに 1 つ以上の Synthetic テストが定義されている場合、タイルにはそのジャーニーの [Synthetic テストスイート][1] の稼働時間メトリクスも表示されます。

<div class="alert alert-danger"><p>Journey Monitoring を利用できるのは、RUM without Limits、Synthetic Monitoring & Testing、または Product Analytics をインストルメントしたフロントエンドアプリケーションのみです。</p></div>

## ジャーニーの探索と管理 {#explore-and-manage-journeys}

マップを使用して、ジャーニーを探索および管理します。
- マップのズームレベルを変更します
- ジャーニーにカーソルを合わせ、その説明、開始点と終了点の定義を表示します
- カタログ内のジャーニーをクリックして、そのジャーニーの [詳細レポート][2] に移動します
- フィルターと検索バーを使用して、カタログやマップに表示されるジャーニーを絞り込みます
- ジャーニーの 3 点メニューをクリックして、ジャーニーを編集または削除します

## ジャーニーの状態 {#journey-states}

マップやカタログ内のジャーニーは、設定内容やパフォーマンスに応じて次のように色分けされている場合があります。
- 推奨ジャーニーは**紫色**で表示され、「Suggestion」(推奨) ピルでタグ付けされます
- コンバージョン率が低下しているジャーニーは**オレンジ色**で表示され、赤いシェブロンが含まれます
- テストに失敗しているジャーニーは**赤色**で表示されます
- Synthetic テストスイートにテストが含まれていないジャーニーはツールチップに**警告**が表示されます

## マップ内のユーザーフロー {#user-flows-in-the-map}

マップの左端のノードは、アプリケーションにおけるすべてのユーザーセッションの開始点を表します。マップ内の他のすべてのノードは、ページまたはジャーニーのいずれかです。ページノードは、展開してネストされたページを表示できる親パスを表す場合があります。

{{< img src="journey_monitoring/journey-monitoring-map-zoom-1.png" alt="Journey Monitoring マップでは、左側にトラフィックおよびコンバージョンのメトリクスと共にジャーニーのカタログが表示され、右側にアプリケーション内のビューとアクションの間をユーザーがどのように移動したかを示す視覚的なフローマップが表示されます。" style="width:100%;" >}}

コネクション線が太いほど、2 つのノード間を流れるトラフィックが多いことを示します。セッション開始ノードに接続されていないジャーニーは、ユーザーがアプリケーションへの入口としてではなく、すでにセッションが始まった後にのみ移動するジャーニーです。

## 参考文献 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/test_suites/
[2]: /ja/journey_monitoring/details_report/