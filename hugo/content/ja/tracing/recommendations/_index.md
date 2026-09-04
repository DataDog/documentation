---
algolia:
  tags:
  - apm recommendations
  - apm recommendation
  - application performance monitoring
  - performance recommendations
  - reliability recommendations
  - tracing
description: APM 推奨事項を使用して、アプリケーションのパフォーマンスと信頼性を最適化する方法を学びます。
further_reading:
- link: /tracing/
  tag: ドキュメント
  text: Application Performance Monitoring (APM) について
- link: /tracing/guide/apm_dashboard/
  tag: ドキュメント
  text: APM ダッシュボードガイド
- link: /cloud_cost_management/recommendations/
  tag: ドキュメント
  text: Cloud Cost 推奨事項
- link: /database_monitoring/recommendations/
  tag: ドキュメント
  text: DBM 推奨事項
- link: https://www.datadoghq.com/blog/proactive-app-recommendations/
  tag: ブログ
  text: プロアクティブなアプリ推奨事項でパフォーマンスと信頼性を向上
- link: https://www.datadoghq.com/blog/apm-recommendations
  tag: ブログ
  text: APM 推奨事項でパフォーマンスと信頼性を向上
multifiltersearch:
  data:
  - category: Performance
    recommendation_description: バックエンドアプリケーションが、クエリをバッチ処理せずに同じデータベースを順番に呼び出しています。
    recommendation_prerequisite: APM
    recommendation_type: N+1 Queries on Database
    scope: Backend services
  - category: Performance
    recommendation_description: バックエンドアプリケーションが、同じダウンストリーム API に対する複数の呼び出しを順番に行っているため、並列実行されず、リクエストのレイテンシーが不必要に増加し、サービス全体のパフォーマンスが低下しています。
    recommendation_prerequisite: APM
    recommendation_type: Repeated Sequential API calls
    scope: Backend services
  - category: Performance
    recommendation_description: バックエンドアプリケーションがダウンストリーム API を呼び出す際に過剰な回数の再試行を行っているため、リクエスト時間が延長され、負荷がかかった状態で連鎖的な障害が発生するリスクがあります。
    recommendation_prerequisite: APM
    recommendation_type: Persistent Retries
    scope: Backend services
  - category: Performance
    recommendation_description: クエリの実行計画で、コストの高いシーケンシャルスキャンが実行されています。検出された場合は、Datadog
      はインデックスを使用してクエリを高速化することを推奨します。
    recommendation_prerequisite: APM + DBM
    recommendation_type: Missing index
    scope: Databases
  - category: Performance
    recommendation_description: サービスが、レプリカを利用できるにもかかわらず、プライマリデータベースインスタンスに対して読み取り専用クエリを実行しています。これらのクエリをレプリカにルーティングすることで、プライマリの負荷を軽減し、パフォーマンスを向上させることができます。
    recommendation_prerequisite: APM + DBM
    recommendation_type: Unbalanced Read Load
    scope: Databases
  - category: Reliability
    recommendation_description: バックエンドアプリケーションが適切なバックオフなしに短時間で再試行を繰り返しているため、負荷のかかっている依存関係に高い圧力をかけ続け、一時的な障害の発生時にシステムの回復を妨げ、長時間の停止につながるリスクがあります。
    recommendation_prerequisite: APM
    recommendation_type: Aggressive Retries
    scope: Backend services
  - category: Reliability
    recommendation_description: バックエンドアプリケーションが制御フローとして多数の例外をスローしており、CPU とメモリのオーバーヘッドが増加しています。
    recommendation_prerequisite: APM + Continuous Profiler
    recommendation_type: High Exception Volumes
    scope: Backend services
  - category: Reliability
    recommendation_description: バックエンドアプリケーションがダウンストリームの依存関係を呼び出す際に、その依存関係の応答が遅いためにタイムアウトが発生し、リクエストが失敗してエンドユーザーに影響を与え、上流で連鎖的な障害が発生するリスクが高まっています。
    recommendation_prerequisite: APM + RUM
    recommendation_type: Dependency Timeouts
    scope: Backend services
  - category: Performance
    recommendation_description: サービスがリクエストパス上でコストの高い処理を繰り返し実行していますが、短期間キャッシュに保存して提供することで、テールレイテンシーとダウンストリームの負荷を軽減できます。
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Missing Cache
    scope: Backend services
  - category: Performance
    recommendation_description: サービスで、クリティカルパス上の低速なダウンストリームスパンに起因する極端なテールレイテンシーが発生しています。多くの場合、依存関係のレイテンシーに上限がないことや、並列実行できる呼び出しを逐次実行していることが原因です。
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Tail Latency
    scope: Backend services
  - category: Performance
    recommendation_description: サービスが、CPU 負荷の高いシリアライズやパース処理にリクエスト時間の大部分を費やしており、不要なレイテンシーと
      CPU オーバーヘッドが発生しています。
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Excessive Serialization
    scope: Backend services
  - category: Performance
    recommendation_description: サービスがサイズや範囲の上限を設けずにリクエストパラメーターを受け入れているため、過大な入力によってコストの高いダウンストリーム処理やテールレイテンシー、タイムアウトが発生する可能性があります。
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Unbounded Payload
    scope: Backend services
  - category: Performance
    recommendation_description: リクエスト処理が同期プリミティブや長時間実行されるクリティカルセクションによって逐次化されており、同時実行時にテールレイテンシーが発生しています。
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Resource Contention
    scope: Backend services
  - category: Reliability
    recommendation_description: サービスがダウンストリームの依存関係へのコネクションプールを繰り返し枯渇させており、リクエストがキューに入れられ、負荷がかかるとレイテンシーの急増や障害が発生しています。
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Connection Pool Exhaustion
    scope: Backend services
  - category: Reliability
    recommendation_description: サービスが予期される結果を APM でエラーとして扱っているため、エンドポイントのエラー率が高くなり、実際の信頼性の低下が見えにくくなっています。
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Error Misclassification
    scope: Backend services
  headers:
  - filter_by: true
    id: category
    name: 推奨カテゴリ
  - filter_by: true
    id: recommendation_type
    name: 推奨タイプ
  - filter_by: true
    id: scope
    name: 推奨事項のスコープ
  - id: recommendation_description
    name: 推奨事項の説明
  - filter_by: true
    id: recommendation_prerequisite
    name: 推奨事項の前提条件
site_support_id: apm_recommendations
title: APM 推奨事項
---
APM 推奨事項は、収集したテレメトリから最適化の機会を提示し、アプリケーションのパフォーマンスと信頼性の向上を支援します。これらの推奨事項は、次の目的で設計されています。

- パフォーマンスのボトルネックを特定し、解消する
- サービスの信頼性と稼働時間を向上させる
- エンドユーザーエクスペリエンスを向上させる

{{< img src="/tracing/recommendations/apm_recommendations-3.png" alt="信頼性とパフォーマンスの問題に関するサマリーカードと、確認する推奨事項の一覧を表示する APM 推奨事項ページ" style="width:100%;" >}}

{{< callout url="https://www.datadoghq.com/product-preview/apm-ai-recommendations/" header="AI Recommendations Preview に参加します" >}}
AI による推奨事項タイプが利用可能になり、Datadog が検出できる[最適化の機会](?recommendation_prerequisite=APM+%2B+AI+Recs+%28Preview%29#supported-recommendations)が増えました。
{{< /callout >}}

## 前提条件{#prerequisites}

特定の推奨事項は、特定の Datadog 製品を必要とします。{{< ui >}}Recommendation Prerequisite{{< /ui >}} ドロップダウンを使用して、セットアップで使用している Datadog 製品別に推奨事項をフィルタリングします。

[Bits Code][3] を使用して推奨事項を実装する場合は、[セットアップを完了][4]する必要があります。

## 仕組み {#how-it-works}

推奨事項は、スタックのさまざまな部分から収集したデータに基づいています。

- Application Performance Monitoring (APM) の分散トレース
- Database Monitoring (DBM) のデータベーステレメトリ
- Real User Monitoring (RUM) のセッションとユーザージャーニー

Datadog はこれらのソースを関連付けて、パフォーマンス、信頼性、ユーザーエクスペリエンスを向上させる機会を特定します。

Datadog は、問題の潜在的な影響と、相対的なリクエスト量やパフォーマンスの傾向などのテレメトリシグナルを比較検討した優先度スコアを算出し、そのスコアに基づいて推奨事項をランク付けします。サービスの信頼性とパフォーマンスの向上に最も重要なインサイトが最初に表示されます。

## 推奨事項の使用 {#using-recommendations}

対応が必要な推奨事項を確認するには、次の手順を実行します。

1. [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Recommendations{{< /ui >}}][1] に移動します。
2. ステータスまたはタイプで推奨事項をフィルタリングします。
3. 一覧から推奨事項を選択して、問題の詳細な説明を確認します。
4. 問題、影響、および Datadog による解決方法の推奨事項を確認します。
5. (オプション) [Bits Code][3]を使用してコード修正を生成するには、{{< ui >}}Next Steps{{< /ui >}} で [{{< ui >}}Fix with Bits{{< /ui >}}] をクリックします。
6. (オプション) Jira または Work Management で修正を追跡するには、{{< ui >}}Triage{{< /ui >}} で [{{< ui >}}Add Jira Ticket{{< /ui >}}] または [{{< ui >}}Add Work Item{{< /ui >}}] をクリックします。

推奨事項を確認した後、{{< ui >}}FOR REVIEW{{< /ui >}} ドロップダウンを使用して、推奨事項のステータスを {{< ui >}}REVIEWED{{< /ui >}}、{{< ui >}}IGNORED{{< /ui >}}、または {{< ui >}}RESOLVED{{< /ui >}} に変更できます。

**注**: APM ホームページ][5]の {{< ui >}}Watchdog{{< /ui >}} および {{< ui >}}Error Tracking{{< /ui >}} セクションも、選択したサービスフィルター (フィルターが設定されていない場合はパーソナライズされたサービス) に従い、推奨事項のスコープ設定と一致します。サービスが選択されており、一致するアラートや問題がない場合、セクションには {{< ui >}}Clear filter{{< /ui >}} ボタンを含む空の状態が表示され、Error Tracking の {{< ui >}}View all{{< /ui >}} リンクはそのサービスで事前にフィルタリングされます。

## ダッシュボードで推奨事項を表示する {#viewing-recommendations-on-a-dashboard}

APM 推奨事項をデータソースとするリストウィジェットを追加して、チームのパフォーマンスメトリクスと併せて推奨事項を確認します。

{{< img src="tracing/recommendations/apm_recommendations_dashboard_widget.png" alt="APM 推奨事項をデータソースとして構成されたリストウィジェット。優先度、サービス、概要、問題、ステータス別に推奨事項を表示します。" style="width:100%;" >}}

1. 任意のダッシュボードでウィジェットを作成し、可視化として {{< ui >}}List{{< /ui >}} を選択します。
2. データソースとして {{< ui >}}APM Recommendations{{< /ui >}} を選択します。
3. 環境、サービス、チーム、推奨事項タイプ、ステータスでフィルタリングします。

## サポート対象の推奨事項 {#supported-recommendations}

<!-- The table below is auto-generated. Add new entries in multifiltersearch with new recommendations as they become available. -->

{{< multifilter-search >}}

**注**: APM と Database Monitoring (DBM) の両方を使用している場合、[DBM 推奨事項ページ][2]よりも、ここに表示される「インデックスの欠落」に関する推奨事項が少なくなることがあります。APM 推奨事項では、Datadog がインスツルメントされたアプリケーションサービスに関連付けられる「インデックスの欠落」の問題のみを表示します。特定のサービスに関連付けられない「インデックスの欠落」の推奨事項は、DBM にのみ表示されます。

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/recommendations
[2]: /ja/database_monitoring/recommendations/
[3]: /ja/bits_ai/bits_code/
[4]: /ja/bits_ai/bits_code/setup/
[5]: https://app.datadoghq.com/apm/home