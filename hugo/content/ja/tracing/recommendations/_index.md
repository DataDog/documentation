---
algolia:
  tags:
  - apm recommendations
  - apm recommendation
  - application performance monitoring
  - performance recommendations
  - reliability recommendations
  - tracing
description: APM Recommendations を使用して、アプリケーションのパフォーマンスと信頼性を最適化する方法を学習してください。
further_reading:
- link: /tracing/
  tag: ドキュメント
  text: Application Performance Monitoring (APM) について学ぶ
- link: /tracing/guide/apm_dashboard/
  tag: ドキュメント
  text: APM ダッシュボード ガイド
- link: /cloud_cost_management/recommendations/
  tag: ドキュメント
  text: Cloud Cost Recommendations
- link: /database_monitoring/recommendations/
  tag: ドキュメント
  text: DBM Recommendations
- link: https://www.datadoghq.com/blog/proactive-app-recommendations/
  tag: ブログ
  text: Proactive App Recommendations でパフォーマンスと信頼性を向上
- link: https://www.datadoghq.com/blog/apm-recommendations
  tag: ブログ
  text: APM Recommendations でパフォーマンスと信頼性を向上
multifiltersearch:
  data:
  - category: Performance
    recommendation_description: バックエンド アプリケーションが同じデータベースに対して、バッチ化せずに逐次クエリを実行しています。
    recommendation_prerequisite: APM
    recommendation_type: N+1 Queries on Database
    scope: Backend services
  - category: Performance
    recommendation_description: バックエンドアプリケーションが、同じダウンストリーム API に対して複数の呼び出しを並列ではなく順番に行っているため、リクエストのレイテンシーが不必要に増加し、サービス全体のパフォーマンスが低下しています。
    recommendation_prerequisite: APM
    recommendation_type: Repeated Sequential API calls
    scope: Backend services
  - category: Performance
    recommendation_description: バックエンドアプリケーションがダウンストリーム API を呼び出す際に過剰な回数の再試行を行っているため、リクエスト時間が延長され、負荷がかかっている状況では連鎖的な障害につながるリスクがあります。
    recommendation_prerequisite: APM
    recommendation_type: Persistent Retries
    scope: Backend services
  - category: Performance
    recommendation_description: クエリの実行計画で、負荷の高いシーケンシャルスキャンが実行されています。検出されると、Datadog
      はインデックスを使用してクエリを高速化することを推奨します。
    recommendation_prerequisite: APM + DBM
    recommendation_type: Missing index
    scope: Databases
  - category: Performance
    recommendation_description: サービスが、レプリカを利用できるにもかかわらず、プライマリデータベースインスタンスに対して読み取り専用クエリを実行しています。これらのクエリをレプリカにルーティングすると、プライマリの負荷を軽減し、パフォーマンスを向上できます。
    recommendation_prerequisite: APM + DBM
    recommendation_type: Unbalanced Read Load
    scope: Databases
  - category: Reliability
    recommendation_description: バックエンドアプリケーションが適切なバックオフなしに短時間で再試行を繰り返しており、負荷の高い依存関係に大きな負荷をかけ続けています。一時的な障害発生時にシステムの復旧を妨げ、長時間の停止につながるリスクがあります。
    recommendation_prerequisite: APM
    recommendation_type: Aggressive Retries
    scope: Backend services
  - category: Reliability
    recommendation_description: バックエンドアプリケーションが制御フローとして大量の例外をスローしており、CPU とメモリのオーバーヘッドが増加しています。
    recommendation_prerequisite: APM + Continuous Profiler
    recommendation_type: High Exception Volumes
    scope: Backend services
  - category: Reliability
    recommendation_description: バックエンドアプリケーションがダウンストリームの依存関係を呼び出す際にタイムアウトが発生しています。これは、依存関係の応答が遅すぎることが原因で、リクエストの失敗を引き起こし、エンドユーザーに影響を与えるとともに、上流での連鎖的な障害のリスクを高めています。
    recommendation_prerequisite: APM + RUM
    recommendation_type: Dependency Timeouts
    scope: Backend services
  headers:
  - filter_by: true
    id: category
    name: 推奨事項カテゴリー
  - filter_by: true
    id: recommendation_type
    name: 推奨事項タイプ
  - filter_by: true
    id: scope
    name: 推奨事項のスコープ
  - id: recommendation_description
    name: 推奨事項の説明
  - filter_by: true
    id: recommendation_prerequisite
    name: 推奨事項の前提条件
site_support_id: apm_recommendations
title: APM Recommendations
---
APM Recommendations は、収集したテレメトリから最適化の機会を提示し、アプリケーションのパフォーマンスと信頼性の向上を支援します。これらの推奨事項は、次の目的で設計されています。

- パフォーマンスボトルネックの特定と解消
- サービスの信頼性と稼働時間の向上
- エンドユーザーエクスペリエンスの向上

{{< img src="/tracing/recommendations/apm_recommendations-3.png" alt="信頼性とパフォーマンスの問題に関するサマリーカードと、確認すべき推奨事項を一覧表示する APM Recommendations ページ" style="width:100%;" >}}

{{< callout url="https://www.datadoghq.com/product-preview/apm-ai-recommendations/" header="AI Recommendations プレビューにご参加ください" >}}
AI 主導の推奨タイプが利用可能になり、Datadog が検出できる [最適化の機会](?recommendation_prerequisite=APM+%2B+AI+Recs+%28Preview%29#supported-recommendations)が拡大しました。
{{< /callout >}}

## 前提条件 {#prerequisites}

一部の推奨事項は、特定の Datadog 製品に依存しています。{{< ui >}}Recommendation Prerequisite{{< /ui >}} ドロップダウンを使用して、セットアップで使用している Datadog 製品ごとに推奨事項をフィルタリングします。

[Bits Code][3] を使用して推奨事項を実装する場合は、[セットアップを完了][4]する必要があります。

## 仕組み {#how-it-works}

推奨事項は、スタックのさまざまな部分から収集されたデータに基づいています。

- Application Performance Monitoring (APM) の分散トレース
- Database Monitoring (DBM) のデータベーステレメトリ
- Real User Monitoring (RUM) のセッションとユーザージャーニー

Datadog はこれらのソースを関連付け、パフォーマンス、信頼性、ユーザーエクスペリエンスを向上させる機会を特定します。

Datadog は、相対的なリクエスト量やパフォーマンスの傾向などのテレメトリシグナルと、問題の潜在的な影響を比較して優先度スコアを算出し、推奨事項をランク付けします。サービスの信頼性とパフォーマンスの向上に最も重要なインサイトが最初に表示されます。

## 推奨事項の使用 {#using-recommendations}

注意が必要な推奨事項を確認するには:

1. [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Recommendations{{< /ui >}}][1] に移動します。
2. ステータスまたはタイプで推奨事項をフィルタリングします。
3. 一覧から推奨事項を選択して、問題の詳細な説明を確認します。
4. 問題と影響、および解決のための Datadog の推奨事項を確認します。
5. (オプション) [Bits Code][3] を使用してコード修正を生成するには、{{< ui >}}Next Steps{{< /ui >}} で {{< ui >}}Fix with Bits{{< /ui >}} をクリックします。
6. (オプション) Jira または Work Management で修正を追跡するには、{{< ui >}}Triage{{< /ui >}} で {{< ui >}}Add Jira Ticket{{< /ui >}} または {{< ui >}}Add Work Item{{< /ui >}} をクリックします。

推奨事項を確認した後、{{< ui >}}FOR REVIEW{{< /ui >}} ドロップダウンを使用して、推奨事項のステータスを {{< ui >}}REVIEWED{{< /ui >}}、{{< ui >}}IGNORED{{< /ui >}}、または {{< ui >}}RESOLVED{{< /ui >}} に変更できます。

**注**: [APM ホームページ][5]では、{{< ui >}}Watchdog{{< /ui >}} セクションと {{< ui >}}Error Tracking{{< /ui >}} セクションも、選択したサービスフィルター (フィルターが設定されていない場合はパーソナライズされたサービス) に従い、推奨事項と同じスコープが適用されます。サービスが選択されていて一致するアラートや問題がない場合、セクションには {{< ui >}}Clear filter{{< /ui >}} ボタンが表示された空の状態が表示され、Error Tracking の {{< ui >}}View all{{< /ui >}} リンクはそのサービスで事前にフィルタリングされます。

## ダッシュボードでの推奨事項の表示 {#viewing-recommendations-on-a-dashboard}

APM Recommendations をデータソースとして一覧表示するウィジェットを追加し、チームのパフォーマンスメトリクスと並べて推奨事項を確認します。

{{< img src="tracing/recommendations/apm_recommendations_dashboard_widget.png" alt="APM Recommendations をデータソースとして構成した一覧表示ウィジェット。優先度、サービス、概要、問題、ステータス別に推奨事項を表示します。" style="width:100%;" >}}

1. 任意のダッシュボードでウィジェットを作成し、可視化として {{< ui >}}List{{< /ui >}} を選択します。
2. データソースとして {{< ui >}}APM Recommendations{{< /ui >}} を選択します。
3. 環境、サービス、チーム、推奨事項タイプ、およびステータスでフィルタリングします。

## サポートされている推奨事項 {#supported-recommendations}

<!-- The table below is auto-generated. Add new entries in multifiltersearch with new recommendations as they become available. -->

{{< multifilter-search >}}

**注**: APM と Database Monitoring (DBM) の両方を使用している場合、[DBM Recommendations ページ][2]よりも、ここで表示される「Missing Index (インデックスの欠落)」推奨事項が少なくなることがあります。APM Recommendations は、Datadog がインスツルメントされたアプリケーションサービスに関連付けられる「Missing Index (インデックスの欠落)」の問題のみを表面化します。特定のサービスにリンクできない「Missing Index (インデックスの欠落)」推奨事項は、DBM にのみ表示されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/recommendations
[2]: /ja/database_monitoring/recommendations/
[3]: /ja/bits_ai/bits_code/
[4]: /ja/bits_ai/bits_code/setup/
[5]: https://app.datadoghq.com/apm/home