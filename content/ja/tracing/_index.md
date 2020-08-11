---
title: APMと分散型トレーシング
kind: documentation
description: パフォーマンス向上のためにコードを操作する
further_reading:
  - link: /tracing/guide/setting_primary_tags_to_scope/
    tag: Documentation
    text: トレースにプライマリタグとセカンダリタグを追加する
  - link: /tracing/guide/add_span_md_and_graph_it/
    tag: Documentation
    text: カスタムタグをスパンに追加して、パフォーマンスを分類する
  - link: /tracing/guide/security/
    tag: Documentation
    text: トレースから PII を自動的にスクラブする
  - link: /tracing/guide/metrics_namespace/
    tag: Documentation
    text: トレースメトリクスとそのタグについて学ぶ
  - link: /tracing/visualization/
    tag: Documentation
    text: APM の UI の利用について学ぶ
aliases:
  - /ja/tracing/faq/terminology
  - /ja/tracing/guide/terminology
  - /ja/tracing/guide/distributed_tracing/
  - /ja/tracing/advanced/
  - /ja/tracing/api
  - /ja/tracing/faq/distributed-tracing/
---
{{< vimeo 381554158 >}}

</br>

Datadog APM と分散型トレーシングは、Web サービス、キュー、データベースがリクエスト、エラー、レイテンシーを監視するための**標準のパフォーマンスダッシュボード**を使用して、アプリケーションを詳細に可視化します。分散型トレースは、ホスト、コンテナ、プロキシ、サーバーレス機能全体で、ブラウザセッション、ログ、synthetic チェック、ネットワーク、プロセス、インフラストラクチャーのメトリクスに**シームレスに関連付けられます**。システム停止中、**収集されたトレースの 100% がサンプリングなしで生存**を検索しますが、Datadog は、エラー、高レイテンシー、または一意のコードパスを表すトレースを分析のためにインテリジェントに保持します。

## はじめに

モノリスからマイクロサービスに移行すると、ホスト、コンテナ、またはサーバーレス機能全体の Datadog APM の設定に数分しかかかりません。

### 1. Datadog Agent の構成

AWS、GCP、Azure、Kubernetes、ECS、Fargate、PCF、Heroku、オンプレミスなどに [Datadog Agent をインストールして構成します][1]。

### 2. アプリケーションのインスツルメンテーション

アプリケーションまたはプロキシサービスにトレースライブラリを追加して、Datadog Agent へのトレースの送信を開始します。

{{< partial name="apm/apm-languages.html" >}}
<br>
## Datadog APM の確認

これで、トレースを Datadog に送信するようにアプリケーションを構成したので、アプリケーションのパフォーマンスに関する情報を入手できます。

### サービスマップ

トレースから自動生成されたサービスマップとサービスパフォーマンスメトリクスおよびモニターアラート状態のモニタリングにより[サービスの依存関係を理解します][2]。

{{< img src="tracing/index/ServiceMapInspect.gif" alt="サービスマップ"  style="width:100%;">}}

### サービスパフォーマンスダッシュボード

リクエスト、エラー、レイテンシーパーセンタイルに関する[サービスメトリクスを監視][3]します。インフラストラクチャーに関連づけられたデータベースクエリまたはエンドポイントにドリルダウンします。

{{< img src="tracing/index/ServicePage.gif" alt="サービスページ"  style="width:100%;">}}

### Live Search

取り込まれたトレースの 100% がサンプリングなしで 15 分間生存している任意のタグで[スパンを検索][4]します。

{{< img src="tracing/live_search/livesearchmain.gif" alt="Live Search" >}}

### ログと分散型トレースの接続

自動トレース ID インジェクションを使用した単一の分散リクエストのトレースと[アプリケーションログを並べて表示][5]します。

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="ログとトレースをつなげる"  style="width:100%;">}}

### App Analytics

アプリケーション、インフラストラクチャー、またはデータセンター、アベイラビリティーゾーン、デプロイバージョン、ドメイン、ユーザー、チェックアウト金額、顧客などのカスタムタグごとに[パフォーマンスを分析][6]します。

{{< img src="tracing/index/SearchAppAnalytics.gif" alt="App Analytics"  style="width:100%;">}}

### Synthetic テストデータとトレースの接続

トレースに[シュミレーションされた API テストをリンクして][7]、フロントエンド、ネットワーク、バックエンドリクエスト全体における障害の根本原因を突き止めます。

{{< img src="tracing/index/Synthetics.gif" alt="Synthetic テスト"  style="width:100%;">}}

### 継続的なプロファイリング

CPU、メモリ、または I/O を最も多く消費するコード行を特定するために、常時稼働の本番環境プロファイリングにより[コードの効率を向上][8]させます。

{{< img src="tracing/index/Profiling.png" alt="プロファイリング"  style="width:100%;">}}

### インスツルメンテーションをカスタマイズまたは OpenTracing を追加

自動インスツルメンテーション、dd-trace-api、OpenTracing 間で[インスツルメンテーションとシームレスに接続][9]します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/send_traces/
[2]: /ja/tracing/visualization/services_map/
[3]: /ja/tracing/visualization/service/
[4]: /ja/tracing/livesearch/
[5]: /ja/tracing/connect_logs_and_traces/
[6]: /ja/tracing/app_analytics/
[7]: /ja/synthetics/apm/
[8]: /ja/tracing/profiling/
[9]: /ja/tracing/manual_instrumentation/