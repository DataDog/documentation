---
title: ログエクスプローラー
kind: documentation
description: すべてのログを検索し、ログ分析を実行します
aliases:
  - /ja/logs/explore
further_reading:
  - link: logs/explorer/analytics
    tag: Documentation
    text: ログ分析の実行
  - link: logs/processing
    tag: Documentation
    text: ログの処理方法
  - link: logs/explorer/saved_views
    tag: Documentation
    text: ログエクスプローラーの自動構成
  - link: logs/explorer/patterns
    tag: Documentation
    text: ログ内のパターン検出
  - link: 'https://www.datadoghq.com/blog/datadog-clipboard/'
    tag: ブログ
    text: ログエクスプローラーの URL をクリップボードに追加する
---
## 概要

ログエクスプローラーを起点として、トラブルシューティングと調査を行うことができます。

さまざまな視点により、[検索クエリ][1]と一致するログデータからの色々な種類のインサイトが得られます。

### Live Tail

Live Tail は Datadog に入る時にログを表示します。Live Tail ログは残りませんが、そのビューは、インデックス化されているかに関わらず**すべて**のログを表示します。詳細は、[Log Live Tail セクション][2]を参照してください。

{{< img src="logs/explorer/live_tail/livetail.gif" alt="Log Livetail" style="width:60%;" >}}

### ログリスト


#### 個別のログ

Log List はインデックス化されたログを表示し、**個々の結果**に移動するための権限を持つツールを提供します。詳細は、[ログリストのセクション][3]を参照してください。

{{< img src="logs/explorer/toplists.png" alt="ログリスト" style="width:60%;" >}}

#### ログパターン

Log Patterns はインデックス化されたログを同じような構造を持つ**一握りのグループ**に自動的に集約します。詳細は、[Log Patterns セクション][4]を参照してください。

{{< img src="logs/explorer/patterns_side_panel.png" alt="Log Patterns" style="width:60%;" >}}

#### ログトランザクション

Log Transactions は、複数のマイクロサービス全体で処理されたユーザーセッションまたはリクエストのような、イベント**シーケンス**のインスタンスに従い、自動的にインデックス化されたログを収集します。詳しくは、[Log Transactions セクション][41]を参照してください。

{{< img src="logs/explorer/transactions_side_panel.png" alt="Log Transactions" style="width:60%;" >}}

### ログ分析

Log Analytics はログクエリを**グラフ**し、最大値、平均値、パーセンタイル、ユニーク数などを表示します。グラフの作成方法のオプションに関する詳細は、[ログのグラフガイド][5]を参照してください。

## Log Side Panel

Datadog は次の一般的なサイドパネルレイアウトに従い、個々のログを表示します。

{{< img src="logs/explorer/side_panel/overview.png" alt="Log Side Panel"  style="width:60%;">}}

### ログの構造化された情報

- パネルの上部には、一般的な**コンテンツ**情報が表示されます。
- パネルの下部には、ログの実際の**コンテンツ**が表示されます。

**コンテキスト**とは、ログが生成されたインフラストラクチャーとアプリケーションコンテキストのことです。情報はタグから収集され、自動的に添付（ホスト名、コンテナ名、ログファイル名、サーバーレス関数名など）される方法と、Datadog Agent または Log Forwarder によりログのカスタムタグ（担当チーム、環境、アプリケーションのバージョンなど）で追加される方法があります。

**コンテンツ**はログそのものを指します。これには、ログメッセージと [Log Pipelines][6]を介してログから抽出され強化された構造化情報も含まれます。技術的スタックの一般的なコンポーネントから生成されたログは、すぐにパースして補完することができます。

- ファイルログ収集の場合、ファイルログ収集をトリガーするソースフィールドが正しく設定されていることを確認してください。詳細は Datadog の [100 以上のログインテグレーション][7]を参照してください。
- コンテナログの収集には、[オートディスカバリー][8]を使用します。

ログパネルは、`error.stack`、`http.method`、`duration` などの一部の標準フィールドが拡張され、読みやすくなっています。ログから対応する情報を抽出し、[標準の属性リマッパー][9]を使用して属性を再マップしてください。

### 他のデータソースへのハブ

#### インフラストラクチャー（ホスト、コンテナ、サーバーレス）データとの相関

**View in context** ボタンをクリックすると、検索リクエストが更新され、選択したログの直前と直後の日付のログ行が、フィルターに一致しないログ行も含めて表示されます。Datadog は、ログの適切なコンテキストを探すために、タグと共に `Hostname`、`Service`、`filename`、`container_id` の各属性を使用するため、このコンテキストは状況によって異なります。

**メトリクスタブ** をクリックし、ログの 30 分の時間枠で基底のインフラストラクチャーメトリクスにアクセスします。

上部の予約済み属性セクション、関連する[ホストダッシュボード][10]、[ネットワークページ][11]の  **ホスト** を操作します。**コンテナ**セクションを操作し、基底のパラメータにスコープされた[コンテナページ][12]に移動します。

{{< img src="logs/explorer/side_panel/infra.gif" alt="インフラへのハブ" style="width:60%;">}}

サーバレスのソースからのログの場合、ホストセクションは対応する[サーバレスページ][13]へのリンクを持つサーバレスセクションに置き換えられます。

{{< img src="logs/explorer/side_panel/infra-serverless.png" alt="サーバレスへのハブ" style="width:60%;">}}


#### APM データとの相関

[ログへのトレース挿入][14]が有効であることを確認し、[統合サービスタグ付け][15]のベストプラクティスに従い、ログと APM 相関の全機能を活用します。

**APM タブ**をクリックし、アップストリームおよびダウンストリームのサービスが実行されている状態で、トレース全体のコンテキストでログを確認します。APM データおよび [APM のトレース][16]を深く掘り下げます。

**サービス**セクションを操作して、ログエクスプローラでの検索に再注目し同じトレースからのすべてのログを確認します。

{{< img src="logs/explorer/side_panel/apm.gif" alt="APM へのハブ" style="width:60%;">}}


### トラブルシューティングのコンテキストを構成

下部の JSON セクションで、属性の名前と値を利用して以下の操作を行います。

- ログテーブルに列を追加または削除します。
- 検索リクエストに特定の値 (include または exclude) を付加します。

{{< img src="logs/explorer/side_panel/context.gif" alt="サイドパネルコンテキスト"  style="width:60%;">}}

- 属性からファセットまたはメジャーを作成/編集します。[ログファセット][17]を参照してください。

{{< img src="logs/explorer/side_panel/facets.gif" alt="サイドパネルファセット"  style="width:60%;">}}

### ログの共有

**Share** ボタンを使用すると、サイドパネルで開いているログを他のコンテキストと共有できます。

- **Copy to clipboard** または `Ctrl+C` / `Cmd+C` を使用して、ログの JSON をクリップボードにコピーします。
- **Share Event** では、電子メールや Slack などを使って、ログを (基底のビューと一緒に) チームメイトと共有できます。使用可能なすべての [Datadog 通知インテグレーション][18]を参照してください。

{{< img src="logs/explorer/side_panel/upper_log_panel.png" alt="上部ログパネル"  style="width:50%;">}}

## トラブルシューティングのコンテキスト

### 検索フィルター

ログエクスプローラービューでログを調査するためのコンテキストを構築します。それには、適切なタイムレンジを選択し、検索バーを使用してログストリームやログ分析を絞り込みます。

**タイムレンジ**

<mrk mid="27" mtype="seg">タイムレンジ機能を使用して、特定の期間内のログをログストリームやログ分析に表示できます。</mrk>
<mrk mid="28" mtype="seg">タイムレンジは、検索バーのすぐ下にタイムラインとして表示されます。</mrk><mrk mid="29" mtype="seg">タイムラインは、ログストリームオプションパネルの **Show timeline** チェックボックスを使用して、展開したり折りたたんだりすることができます。</mrk>

タイムレンジをすばやく変更するには、プリセットされたレンジをドロップダウンから選択します (または、[カスタムタイムフレームを入力します][19]):

{{< img src="logs/explorer/timeseries.png" style="width:50%;" alt="タイムレンジ"  >}}

**検索**

ファセット、メジャー、タグ、または[フリーテキスト検索][1]を使用して、ログストリームやログ分析をコンテキストで絞り込むことができます。検索バーと URL には、選択内容が自動的に反映されます。

ログエクスプローラーのすべての検索機能 (ワイルドカードの使用、数値のクエリなど) の詳細は、[ログ検索ガイド][1]を参照してください。

### 保存済みビュー

保存済みビューを使用すると、事前に選択したファセット、メジャー、検索、タイムレンジ、および可視化方法の組み合わせで、自動的にログエクスプローラーを構成できます。詳細については、[保存済みビューに関するドキュメント][20]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/search-syntax/
[2]: /ja/logs/explorer/live_tail/
[3]: /ja/logs/explorer/list/
[4]: /ja/logs/explorer/patterns/
[41]: /ja/logs/explorer/transactions/
[5]: /ja/logs/explorer/analytics/
[6]: /ja/logs/processing/pipelines/
[7]: /ja/integrations/#cat-log-collection
[8]: /ja/agent/autodiscovery/integrations/?tab=kubernetes
[9]: /ja/logs/processing/attributes_naming_convention/
[10]: /ja/dashboards/#preset-lists
[11]: /ja/network_performance_monitoring/network_page/
[12]: /ja/infrastructure/livecontainers/?tab=linuxwindows#introduction
[13]: /ja/infrastructure/serverless/#function-detail-view
[14]: /ja/tracing/connect_logs_and_traces/
[15]: /ja/getting_started/tagging/unified_service_tagging
[16]: /ja/tracing/app_analytics/search/#displaying-a-full-trace
[17]: /ja/logs/explorer/facets/#overview
[18]: /ja/logs/processing/
[19]: /ja/dashboards/guide/custom_time_frames
[20]: /ja/logs/explorer/saved_views/
