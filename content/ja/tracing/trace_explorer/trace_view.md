---
algolia:
  tags:
  - トレースビュー
aliases:
- /ja/tracing/visualization/trace/
further_reading:
- link: /tracing/trace_collection/
  tag: ドキュメント
  text: アプリケーションで APM トレースをセットアップする方法
- link: /tracing/service_catalog/
  tag: ドキュメント
  text: Datadog に報告するサービスの発見とカタログ化
- link: /tracing/services/service_page/
  tag: ドキュメント
  text: Datadog のサービスについて
- link: /tracing/services/resource_page/
  tag: ドキュメント
  text: リソースのパフォーマンスとトレースの詳細
- link: /tracing/trace_explorer/trace_view/
  tag: ドキュメント
  text: Datadog トレースの読み方を理解する
kind: documentation
title: トレースビュー
---

{{< img src="tracing/trace_view/trace_view.png" alt="トレースビュー" style="width:90%;">}}

## 概要

個々の[トレース][1]を表示すると、その[スパン][2]と関連するメタデータをすべて見ることができます。各トレースは、フレームグラフ、スパンリスト、ウォーターフォール、またはマップとして視覚化できます。

トレースヘッダーには、ルートスパンのサービス名、リソース名、トレース ID、エンドツーエンドのトレース期間、トレース開始時刻などの重要なトレース情報が表示されます。トレースへのパーマリンクを取得するには、**Open Full Page** をクリックし、URL を保存します。

{{< img src="tracing/trace_view/trace_header.png" alt="トレースヘッダー" style="width:90%;">}}


## トレースの視覚化

{{< tabs >}}
{{% tab "フレームグラフ" %}}

{{< img src="tracing/trace_view/flamegraph.png" alt="フレームグラフ" style="width:90%;">}}

フレームグラフはデフォルトの視覚化で、トレースから色分けされたすべてのスパンをタイムライン上に表示します。これはリクエストの実行経路や、トレースのどこに時間が費やされたかを理解するのに便利です。

グラフを操作するには、スクロールしてズームし、クリックしてドラッグして移動し、ミニマップを使用して選択したスパンにズームインしたり、フルトレースにズームアウトします。

凡例は、フレームグラフの色分けを詳細に示します。**Service** (デフォルト)、**Host**、または **Container** のいずれかでスパンをグループ化します。グループごとに、トレース実行時間の割合 (**% Exec Time**) またはスパン数 (**Spans**) のいずれかを選択して表示します。トレース内のスパンにエラーが存在する場合は、**Filter Spans** の下にある **Errors** チェックボックスを選択することで、フレームグラフでこれらをハイライトします。

{{< img src="tracing/trace_view/flamegraph_legend.mp4" alt="フレームグラフの凡例" video="true" style="width:90%;">}}


{{% /tab %}}
{{% tab "スパンリスト" %}}

{{< img src="tracing/trace_view/spanlist.png" alt="トレースビュー" style="width:90%;">}}

[リソース][1]をグループ ([サービス][2]がデフォルト) ごとに表示し、スパン数でソートします。この視覚化は、リソースやグループ別にレイテンシー情報をスキャンするのに便利です。

対応するボタンとテキストベースの検索を使用して、リソースをタイプまたはネーミング情報でフィルタリングします。

{{< img src="tracing/trace_view/spanlist_headers.png" alt="スパンリストヘッダー" style="width:90%;">}}

グループは、対応する列のヘッダーをクリックすることでソートできます (**RESOURCE**、**SPANS**、平均期間 (**AVG DURATION**)、実行時間 (**EXEC TIME**)、トレース実行時間の割合 (**% EXEC TIME**))。

[1]: /ja/tracing/glossary/#resources
[2]: /ja/tracing/glossary/#services
{{% /tab %}}
{{% tab "ウォーターフォール (ベータ版)" %}}

<div class="alert alert-info"><strong>ベータ版に参加！</strong><br />
ウォーターフォールの非公開ベータ版に参加するには、<a href="https://forms.gle/LjJR1ZbF1tNDv5JC6">このフォームにご記入ください</a>。</div>

{{< img src="tracing/trace_view/waterfall.png" alt="ウォーターフォール" style="width:90%;">}}

関連するトレースのすべてのスパンを、個別の行とタイムライン上に色分けして表示します。この視覚化は、トレースの関連する部分を分離して焦点を当てるのに便利です。

各行で (つまりスパンごとに):
* バー (サービスごとに色分け)。その長さは、トレース全体の期間の割合に対応します
* サービス名、オペレーション名、リソース名。フォントスタイル: **サービス**オペレーション<span style="color:gray">リソース</span>
* 絶対および相対スパン期間情報
* (該当する場合) エラーアイコンまたは HTTP ステータスコード

スパンの子孫を展開または折りたたむには、任意の行のプラスまたはマイナスボタンをクリックします。すべてのスパンを展開するには、タイムスケールの左側にあるプラスボタンをクリックします。

{{% /tab %}}
{{% tab "マップ" %}}

{{< img src="tracing/trace_view/map.png" alt="マップ" style="width:90%;">}}

トレースに関与するすべてのサービスの代表を表示します。この視覚化は、サービスの依存関係やトランザクションライフサイクルのおおまかな概要をサービスレベルで把握するのに便利です。

サービスにカーソルを合わせると、その親と子がハイライトされます。またこれをクリックすると、サービスエントリスパンにフォーカスします。

{{% /tab %}}
{{< /tabs >}}

## 詳細

トレースビューの高さ調節可能な下部には、選択したスパンとトレース情報が表示されます。

スパンヘッダーには、選択したスパンのサービス名、オペレーション名、リソース名、およびレイテンシー情報が含まれます。ネーミングピルをクリックして、プラットフォームの他の部分にピボットしたり、[トレースエクスプローラー][5]検索を絞り込むことができます。

{{< img src="tracing/trace_view/span_header.png" alt="スパンヘッダー" style="width:90%;">}}

{{< tabs >}}
{{% tab "スパン情報" %}} 

カスタムタグを含む、すべてのスパンのメタデータを表示します。スパンタグをクリックして、トレースエクスプローラーで検索クエリを更新するか、タグの値をクリップボードにコピーします。

以下の情報がさまざまな条件下で表示されます。
- git 警告メッセージ (CI Test で git 情報が見つからない場合)
- SQL クエリのマークアップ (SQL クエリ上)
- RUM コンテキストとメタデータ (RUM スパン上)
- スパークメトリクス (Spark ジョブスパン上)

{{< img src="tracing/trace_view/info_tab.png" alt="Span Info タブ" style="width:90%;">}}

[1]: /ja/tracing/glossary/#trace
{{% /tab %}}
{{% tab "Infrastructure" %}}

選択したスパンのインフラストラクチャー情報を、ホストレベルとコンテナレベル (利用可能な場合) の間で切り替えます。

関連するタグや、CPU、メモリ、I/O などの重要なホスト/コンテナのメトリクスグラフを、トレースが発生した日時のオーバーレイとともに確認します。

{{< img src="tracing/trace_view/infrastructure_tab.png" alt="Infrastructure タブ" style="width:90%;">}}

{{% /tab %}}
{{% tab "Logs" %}}

トレース時にサービスに関連するログを参照します。ログにカーソルを合わせると、そのタイムスタンプを示すラインがトレースフレームグラフに表示されます。ログをクリックすると、[ログエクスプローラー検索][1]が表示されます。

{{< img src="tracing/trace_view/logs_tab.png" alt="Logs タブ" style="width:90%;">}}


[1]: /ja/logs/explorer/search/
{{% /tab %}}
{{% tab "Processes" %}}

サービスのスパンをクリックすると、基礎インフラストラクチャーで実行中のプロセスを確認できます。サービスのスパンプロセスは、リクエスト時にサービスが実行されているホストまたはポッドと相関関係にあります。CPU および RSS メモリなどのプロセスメトリクスをコードレベルのエラーとともに分析することで、アプリケーション特有の問題かインフラストラクチャーの問題かを見分けることができます。プロセスをクリックすると、[ライブプロセス ページ][1]が開きます。スパン固有のプロセスを表示するには、[プロセスの収集][2]を有効にします。現在、関連するプロセスはサーバーレスおよびブラウザのトレースでサポートされていません。

{{< img src="tracing/trace_view/processes_tab.png" alt="Processes タブ" style="width:90%;">}}

[1]: https://docs.datadoghq.com/ja/infrastructure/process/?tab=linuxwindows
[2]: https://docs.datadoghq.com/ja/infrastructure/process/?tab=linuxwindows#installation
{{% /tab %}}

{{% tab "ネットワーク" %}}

サービスのスパンをクリックして、リクエストを行っているサービスネットワークの依存関係を確認します。特に、コードエラーが生成されない場合には、ボリューム、エラー (TCP 再送)、ネットワークレイテンシー (TCP ラウンドトリップ時間) などの主要なネットワークパフォーマンスのメトリクスを使用して、アプリケーション固有の問題とネットワーク全体の問題の切り分けを行います。たとえば、ネットワークのテレメトリーを使用して、リクエストのレイテンシーが高い理由 (関連するアプリケーションのトラフィックがオーバーロードした、ダウンストリームのポッドやセキュリティグループ、その他のタグ付けされたエンドポイントとの依存関係に問題があったなど) を特定することができます。プロセスをクリックすると [Network Analytics][1] ページが開きます。スパン固有のプロセスを閲覧するには、[ネットワークパフォーマンスモニタリング][2]を有効にしてください。

**注**: 関連するネットワークのテレメトリーは、現在サーバーレスのトレースではサポートされていません。

{{< img src="tracing/trace_view/network_tab.png" alt="Network タブ" style="width:90%;">}}

[1]: /ja/network_monitoring/performance/network_analytics
[2]: /ja/network_monitoring/performance/setup
{{% /tab %}}

{{% tab "セキュリティ" %}}

分散型トレーシングのサービスを対象とした攻撃の試行を確認できます。攻撃者が使用したパターン、攻撃を検出したルール、攻撃者がサービスの脆弱性を発見したかどうかを確認することができます。

[Datadog Application Security Management][1] を使用してさらに調査するには、**View in ASM** をクリックします。

{{< img src="tracing/trace_view/security_tab.png" alt="Security タブ" style="width:90%;">}}

[1]: /ja/security/application_security/how-appsec-works/
{{% /tab %}}
{{% tab "スパンリンク (ベータ版)" %}}

<div class="alert alert-info">スパンリンクのサポートはベータ版です。</div>

[スパンリンク][4]は、因果関係はあるが、典型的な親子関係を持たない 1 つ以上のスパンを相関付けます。

フレームグラフのスパンをクリックすると、スパンリンクで接続されたスパンが表示されます。

{{< img src="tracing/span_links/span_links_tab.png" alt="Span Links タブ" style="width:90%;">}}

**注**: スパンリンクは、例えば[保持フィルター][1]を使用して、対応するスパンが取り込まれ、インデックス化された場合にのみ表示されます。

スパンリンクの詳細とカスタムインスツルメンテーションでスパンリンクを追加する方法については、[スパンリンク][4]をお読みください。

[1]: /ja/tracing/trace_pipeline/trace_retention/
[2]: /ja/tracing/trace_collection/custom_instrumentation/php#adding-span-links-beta
[3]: /ja/tracing/trace_collection/otel_instrumentation/java#requirements-and-limitations
[4]: /ja/tracing/trace_collection/span_links/

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/#trace
[2]: /ja/tracing/glossary/#spans
[3]: /ja/tracing/glossary/#services
[4]: /ja/tracing/glossary/#resources
[5]: /ja/tracing/trace_explorer