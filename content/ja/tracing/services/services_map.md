---
aliases:
- /ja/tracing/servicemap
- /ja/tracing/visualization/services_map/
description: サービスマップは、Datadog APM により収集されるデータを視覚化したものです。
further_reading:
- link: /tracing/trace_collection/
  tag: Documentation
  text: アプリケーションで APM トレースをセットアップする方法
- link: https://www.datadoghq.com/blog/service-map/
  tag: ブログ
  text: Datadog のサービスマップの紹介
- link: https://www.datadoghq.com/videos/dash-keynote-creating-context-with-service-maps/
  tag: ブログ
  text: サービスマップ（Datadog + Airbnb）を使用してコンテキストを作成
kind: documentation
title: サービスマップ
---

サービスマップは、アプリケーションをすべてのコンポーネント[サービス][1]に分解し、サービス間の依存関係をリアルタイムにグラフで表示したものです。ユーザーはボトルネックを特定し、アーキテクチャ内のデータの流れを把握できます。

{{< img src="tracing/visualization/services_map/service_map_overview_3.png" alt="サービスマップの概要" >}}

## セットアップ

サービスマップには、Datadog APM および RUM により収集されたデータが視覚的に表示されます。[サービス][1]を表示するためにセットアップをする必要はありません。

## 使い方

サービスマップでは、サービスとその正常性を概要的に確認できます。ノイズを除去し、問題のある領域を特定することができます。このビューから、Datadog で収集された他のテレメトリに直接アクセスすることも可能です。

## チームまたはアプリケーションによるグループ化

サービスマップはチームやアプリケーションごとにグループ化でき、サービスの所有権やアプリケーションの依存関係を明確に把握できます。これにより、複雑なマイクロサービスアーキテクチャをより詳細なレベルで視覚化できるため、組織が必要な情報にすばやく到達できるようになります。

## フィルタリングとスコープの変更

サービスマップは、ファセットまたはサービス名のあいまい文字列マッチを使用してフィルタリングすることができます。ファセットとは、Datadog が自動的にサービスデータに適用するタグで、サービスタイプ (Web サーバ、データベース、キャッシュなど)、最終デプロイ時間、モニターステータスなどが含まれます。フィルタリングは、数百、数千のノードが存在するマイクロサービス環境で特に有効です。また、サービスは、インシデントステータスでフィルターして、進行中または解決済みのインシデントに関与しているものを特定し、関連するサービス詳細画面から、インシデントデータ、リソース、Datadog チーム情報などのキー情報を抽出することもできます。さらに、サービスマップを特定の時間範囲にスコープすることができ、進化するアーキテクチャを追跡するのに役立ちます。

サービスのスコープは、 `env` または [2 番目のプライマリタグ][3]によっても決定されます。ドロップダウンリストから別のスコープを選択すると、そのスコープ内にあるサービスで構成される全く異なるマップが表示されます。これらのサービスが他の環境のサービスを呼び出したり、他の環境のサービスがこれらのサービスを呼び出したりすることはできません。

## 検査

サービスにマウスポインターを合わせると、そのサービスが強調表示されます。また、サービスのリクエストトラフィックはその方向が動く点線で表示されます。

{{< img src="tracing/visualization/services_map/servicemap-anim.mp4" alt="サービスマップ" video="true" width="90%" >}}

サービスをクリックすると、そのサービスを検査するオプションが提供されます。対象サービスのみをピックアップして、他のサービスからのリクエストソースと、このサービスから他のサービスに送信されたデータに対するリクエストを表示します。一般的に、左側にはユーザー側に近いサービスが、右側には根本原因となるサービスが表示されます。

検査ページでは、各ノードを検査してサービスマップの依存関係を 1 つずつ確認できます。

{{< img src="tracing/visualization/services_map/servicemap.png" alt="サービスマップ" style="width:90%;">}}

フィルターに含まれない 1 つまたは複数のサービスによって接続されているサービスがフィルターに 2 つ含まれる場合 (検索バーまたはファセットで適用)、ノードは折りたたまれます。

{{< img src="tracing/visualization/services_map/service_map_collapsed.png" alt="サービスマップの折りたたみノード" style="width:50%;">}}

## "service" タグ

サービスをクリックすると、さらに絞り込みが可能です。

{{< img src="tracing/visualization/services_map/service_map_inspect_menu_2.png" alt="サービスマップタグ" style="width:40%;">}}

Datadog で特別な意味を持つサービスタグは、APM サービスを識別して製品の他の部分にリンクするのに使用されます。

次のスクリーンショットは、`service:fse-auto-process` のダッシュボードクエリを示しています。これは、APM によって自動的にタグ付けされます。

{{< img src="tracing/visualization/services_map/servicedash.png" alt="サービスマップのダッシュボード" style="width:90%;">}}

ホストマップまたは同じキーを持つログでこのタグを使用すると、Datadog がログ、インフラストラクチャー、またはカスタムビジネスのメトリクスにアプリケーションを結合することができます。上記の視覚化メニューの各オプションを使用して、`service` スコープ内で収集されたデータの適切なビューを開きます。

{{< img src="tracing/visualization/services_map/servicemaptags.png" alt="サービスマップのタグ" style="width:80%;">}}

また、**Say what's happening** セクションで、モニターをサービス別にタグ付けすることができます。カスタムメトリクスなど、任意のメトリクスのモニターをサービスに関連付けることができます。モニターのステータスは、サービスマップに直接表示されます。

{{< img src="tracing/visualization/services_map/servicemon.png" alt="サービスマップのモニター" style="width:90%;">}}

## データの鮮度と意味

### ノードとエッジ

ノードは、サービスを APM でインスツルメントされたとおりに表し、[サービスカタログ][4]のサービスと一致します。エッジは、あるサービスから別のサービスへの aggregate 呼び出しを表します。これらの相互作用は、各[トレース][5]のフレームグラフに表示されます。

インスツルメントされた新しいサービスや接続は即時に表示され、30 日間対応するトレースが見られないと、古いものになります。これは、機能頻度が低くてもシステム機能の重要な部分であるサービスを考慮しています。

{{< img src="tracing/visualization/services_map/servicenodes.mp4" alt="サービスマップのノード" video="true" width="90%">}}

### 色

サービスに対して有効になっているモニターは、そのモニターのステータスに応じて緑色、黄色、赤色、または灰色の円で表示されます。複数のモニターが定義されている場合、最も重大な状態のモニターのステータスが使用されます。

上記のサービスタグを使用して、APM モニターのみならずあらゆるモニターをサービスに関連付けることができます。

### 可用性

サービスマップは、root スパンを含む完全なトレースに基づいてレンダリングされます。指定したクエリウィンドウの間にいくつかのスパンが見つからない場合、その期間はマップビューを利用できないことがあります。これは、[APM 接続エラー][6]が発生し、スパンがドロップされた場合に発生する可能性があります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/#services
[3]: /ja/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[4]: https://app.datadoghq.com/services
[5]: /ja/tracing/glossary/#trace
[6]: /ja/tracing/troubleshooting/connection_errors