---
title: サービスマッピング
kind: documentation
description: サービスマップは、Datadog APM によって収集されているデータを視覚化します。
aliases:
  - /ja/tracing/servicemap
further_reading:
  - link: tracing/setup/
    tag: Documentation
    text: アプリケーションで APM トレースをセットアップする方法
  - link: 'https://www.datadoghq.com/blog/service-map/'
    tag: ブログ
    text: Datadog のサービスマップの紹介
  - link: 'https://www.datadoghq.com/videos/dash-keynote-creating-context-with-service-maps/'
    tag: ブログ
    text: サービスマップ（Datadog + Airbnb）を使用してコンテキストを作成
---
サービスマップはアプリケーションをすべてのコンポーネント[サービス][1]に分解して、観測されたサービス間の依存関係をリアルタイムにグラフで表示するため、ユーザーはボトルネックを特定して、アーキテクチャでのデータの流れを把握できます。

{{< img src="tracing/visualization/services_map/service_map_overview.png" alt="サービスマップの概要" >}}

## セットアップ

サービスマップは、Datadog APM によって収集されたデータを視覚化します。[サービス][1]を表示するためにセットアップをする必要はありません。

## 使い方

サービスマップは、サービスとその状態の概要を提供します。これは、ノイズを除去し、問題のある領域を特定するのに役立ちます。また、このビューから Datadog によって収集された他のテレメトリに直接アクセスできます。

## フィルタリングとスコープの変更

サービスの種類（ウェブサーバー、データベース、キャッシュなど）またはファジー文字列マッチングに基づいてサービスマップをフィルタリングできます。これは、数百または数千のノードがあるマイクロサービス環境で特に役に立ちます。

サービスのスコープは、 `env` または [第 1 種のディメンション][2]によっても決定されます。ドロップダウンリストから別のスコープを選択すると、そのスコープ内にあるサービスで構成される全く異なるマップが表示されます。これらのサービスが他の環境のサービスを呼び出したり、他の環境のサービスがこれらのサービスを呼び出したりすることはできません。

## 検査

あるサービスにマウスポインターを合わせると、そのサービスが強調表示され、方向性をより強調するためにサービスのリクエストトラフィックが動画の線として表示されます。

{{< img src="tracing/visualization/services_map/servicemap-anim.mp4" alt="サービスマップ" video="true" width="90%" >}}

サービスをクリックすると、そのサービスを検査するオプションが提供されます。これは、サービスを分離し、他のサービスからのリクエストのソースと、このサービスから他のサービスに送信されたデータに対するリクエストを表示します。一般的に、左側にはユーザーに密着したサービスが、右側には根本的なサービスが表示されます。

検査ページでは、各ノードを検査して、サービスマップの依存関係の中心を設定できます。一度に 1 つの依存関係の中心を設定できます。

{{< img src="tracing/visualization/services_map/servicemap.png" alt="サービスマップ" style="width:90%;">}}

## "service" タグ

サービスをクリックすると、詳細オプションが表示されます:

{{< img src="tracing/visualization/services_map/servicetag.png" alt="サービスマップのタグ" style="width:40%;">}}

Datadog で特別な意味を持つサービスタグは、APM サービスを識別して製品の他の部分にリンクするのに使用されます。

次のスクリーンショットは、`service:fse-auto-process` のダッシュボードクエリを示しています。これは、APM によって自動的にタグ付けされます。

{{< img src="tracing/visualization/services_map/servicedash.png" alt="サービスマップのダッシュボード" style="width:90%;">}}

ホストマップまたは同じキーを持つログでこのタグを使用すると、Datadog がログ、インフラストラクチャー、またはカスタムビジネスのメトリクスにアプリケーションを結合することができます。上記の詳細メニューの各オプションを使用して、`service` スコープ内で収集されたデータの適切なビューに中心を設定します。

{{< img src="tracing/visualization/services_map/servicemaptags.png" alt="サービスマップのタグ" style="width:80%;">}}

また、「何が起きているのか」セクションでサービス別にモニターにタグを付けることができます。これにより、カスタムビジネスのメトリクスを含む任意のメトリクスのモニターをサービスに関連付けることができます。モニターのステータスは、サービスマップに直接表示されます。

{{< img src="tracing/visualization/services_map/servicemon.png" alt="サービスマップのモニター" style="width:90%;">}}

## データの鮮度と意味

### ノードとエッジ

ノードは、サービスを APM でインスツルメントされたとおりに表し、[サービス][3]ページのサービスと一致します。エッジは、あるサービスから別のサービスへの aggregate 呼び出しを表します。これらの相互作用は、各[トレース][4]のフレームグラフに表示されます。

インスツルメントされた新しいサービスや接続は即時に表示され、2 週間対応するトレースが見られないと、古いものになります。これは、機能頻度が低いが、機能するシステムの重要な部分であるサービスを考慮しています。

{{< img src="tracing/visualization/services_map/servicenodes.mp4" alt="サービスマップのノード" video="true" width="90%">}}

### 色

あるサービスに対して有効になっているモニターの周囲には、そのモニターのステータスに応じて緑色、黄色、赤色、または灰色の重み付き境界線が表示されています。複数のモニターが定義されている場合、最も重大な状態のモニターのステータスが使用されます。

モニターは APM モニターに制限されていません。上記のサービスタグを使用して、任意のモニター種類をサービスに関連付けることができます。

## その他の参照先

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization/#services
[2]: /ja/tracing/setup/first_class_dimensions
[3]: https://app.datadoghq.com/apm/services
[4]: /ja/tracing/visualization/#trace