---
title: ログサイドパネル
description: すべてのログを検索し、ログ分析を実行します
aliases:
  - /ja/logs/explorer/sidepanel
further_reading:
  - link: /logs/log_configuration/processors
    tag: Documentation
    text: ログの処理方法
  - link: /tracing/connect_logs_and_traces
    tag: Documentation
    text: ログとトレースの接続
  - link: /logs/guide/correlate-logs-with-metrics
    tag: Documentation
    text: ログをインフラストラクチャーメトリクスに接続する
---
## 概要
Datadog は次の一般的なサイドパネルレイアウトに従い、個々のログを表示します。

{{< img src="logs/explorer/side_panel/overview.png" alt="ログエクスプローラーのサイドパネル" style="width:60%;">}}

- パネルの上部には、一般的な**コンテキスト**情報が表示されます
- パネルの下部には、ログの実際の**コンテンツ**が表示されます

**コンテキスト**は、ログが生成したインフラストラクチャーとアプリケーションのコンテキストを指します。情報は、Datadog Agent または Log Forwarder によって自動的にアタッチされるか (ホスト名、コンテナ名、ログファイル名、サーバーレス関数名など)、カスタムタグを介してログに追加されるか (担当チーム、環境、アプリケーションバージョンなど) にかかわらず、タグから収集されます。

**コンテンツ**はログ自体を指します。これには、ログメッセージのほか、[ログパイプライン][1]を介してログから抽出、加工されたすべての構造化情報が含まれます。テクニカルスタックの一般的なコンポーネントによって生成されたログの場合、解析と加工はすぐに使用できます。

- ファイルログ収集の場合、ファイルログ収集をトリガーするソースフィールドが適切に設定されていることを確認してください。[ログインテグレーション][2]を参照してください。
- コンテナログの収集には、[オートディスカバリー][3]を使います。

`error.stack`、`http.method`、`duration` などの一部の標準フィールドでは、読みやすくするためにログパネルに特定の拡張表示があります。ログから対応する情報を抽出し、[標準属性リマッパー][4]を使用して属性を再マップします。

## 他のデータソースへのハブ

### インフラストラクチャーデータと相関させる

**View in context** ボタンは、フィルターに一致しない場合でも、選択したログの直前と直後の日付のログ行を表示するために検索要求を更新します。Datadog は、ログに適切なコンテキストを見つけるために、タグとともに `Hostname`、`Service`、`filename`、`container_id` 属性を使用するため、このコンテキストは状況によって異なります。

**Metrics** タブをクリックして、ログの周囲の 30 分の時間枠で基底のインフラストラクチャーメトリクスにアクセスします。

上部の予約済み属性セクション、関連する[ホストダッシュボード][5]、または[ネットワークページ][6]で**ホスト**を操作します。**Container** セクションを操作して、基底のパラメーターでスコープされた[コンテナページ][7]に移動します。

{{< img src="logs/explorer/side_panel/infra.mp4" alt="インフラへのハブ" video=true style="width:100%;">}}

ログがサーバーレスソースからのものであるとき、ホストセクションは、対応する[サーバーレスページ][8]にリンクするサーバーレスセクションに置き換えられます。

{{< img src="logs/explorer/side_panel/infra-serverless.png" alt="サーバーレスへのハブ" style="width:80%;">}}

### APM データと相関させる

[ログへのトレースの挿入][9]を有効にし、[統合サービスタグ付け][10]のベストプラクティスに従って、ログと APM の相関のすべての機能を活用してください。

**Trace タブ**をクリックし、アップストリームおよびダウンストリームのサービスが実行されている状態で、トレース全体のコンテキストでログを確認します。[View Trace Details][11] をクリックして、対応する APM データを深く掘り下げます。

**Service** セクションを操作して、選択したサービスに対応するトレース部をハイライトします。この情報を使用して、ログエクスプローラーのクエリに再度フォーカスしたり、同じトレースからの他のログを確認したりできます。

{{< img src="logs/explorer/side_panel/trace.mp4" alt="APM へのハブ" video=true style="width:100%;">}}

## トラブルシューティングのコンテキストを構成

下部の JSON セクションで、属性の名前と値を利用して以下の操作を行います。

- ログテーブルに列を追加または削除する
- 検索リクエストに特定の値 (include または exclude) を付加します。

{{< img src="logs/explorer/side_panel/context.jpg" alt="サイドパネルコンテキスト" style="width:50%;">}} {{< img src="logs/explorer/side_panel/context2.jpg" alt="サイドパネルコンテキスト" style="width:50%;">}}

- 属性からファセットまたはメジャーを作成または編集します。[ログファセット][12]を参照してください。

{{< img src="logs/explorer/side_panel/facets.mp4" alt="サイドパネルファセット" video=true style="width:100%;">}}

## ログの共有

**Share** ボタンを使用すると、サイドパネルで開いているログを他のコンテキストと共有できます。

- **Copy to clipboard** または `Ctrl+C` / `Cmd+C` を使用して、ログの JSON をクリップボードにコピーします。
- **Share Event** は、メールや Slack などを介して、ログを (基底のビューとともに) チームメイトと共有します。利用可能なすべての [Datadog 通知インテグレーション][13]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/pipelines
[2]: /ja/integrations/#cat-log-collection
[3]: /ja/agent/autodiscovery/integrations/?tab=kubernetes
[4]: /ja/logs/log_configuration/attributes_naming_convention
[5]: /ja/dashboards/#preset-lists
[6]: /ja/network_monitoring/performance/network_page/
[7]: /ja/infrastructure/livecontainers/?tab=linuxwindows#introduction
[8]: /ja/infrastructure/serverless/#function-detail-view
[9]: /ja/tracing/connect_logs_and_traces/
[10]: /ja/getting_started/tagging/unified_service_tagging
[11]: /ja/tracing/app_analytics/search/#displaying-a-full-trace
[12]: /ja/logs/explorer/facets/#overview
[13]: /ja/integrations/#cat-notification