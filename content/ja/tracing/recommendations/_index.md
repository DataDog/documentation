---
algolia:
  tags:
  - apm recommendations
  - apm recommendation
  - rum recommendationrum recommendation
  - rum recommendations
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
multifiltersearch:
  data:
  - category: パフォーマンス
    recommendation_description: バックエンド アプリケーションが同じデータベースに対して、バッチ化せずに逐次クエリを実行しています。
    recommendation_prerequisite: APM
    recommendation_type: データベース における N+1 クエリ
    scope: バックエンド サービス
  - category: パフォーマンス
    recommendation_description: バックエンド アプリケーションが同じ API をバッチ化せずに逐次呼び出しています。
    recommendation_prerequisite: APM
    recommendation_type: 逐次 API 呼び出し
    scope: バックエンド サービス
  - category: パフォーマンス
    recommendation_description: バックエンド アプリケーションが API への障害リクエストをバックオフなしでリトライしています。
    recommendation_prerequisite: APM
    recommendation_type: 過度なリトライ
    scope: バックエンド サービス
  - category: パフォーマンス
    recommendation_description: クエリ実行プランが高コストな順次スキャンを実行しています。検出時には、Datadog がクエリを高速化するためのインデックス使用を推奨します。
    recommendation_prerequisite: APM + DBM
    recommendation_type: インデックス不足
    scope: データベース
  - category: ユーザー エクスペリエンス
    recommendation_description: ページ内の要素に対する Rage Click やデッド アクションを検知し、誤解を招く UI や壊れた要素を示します。
    recommendation_prerequisite: RUM
    recommendation_type: ユーザー フラストレーション アクション
    scope: ブラウザ アプリケーション
  - category: ユーザー エクスペリエンス
    recommendation_description: 大きな JS リソースにより初期レンダーが遅延し、誤解を招く UI や壊れた要素を示します。
    recommendation_prerequisite: RUM
    recommendation_type: 最適化されていない バンドル サイズ
    scope: ブラウザ アプリケーションおよびモバイル アプリの Web ビュー
  - category: エラー レート
    recommendation_description: バックエンド アプリケーションが新しい Error シグネチャを生成し始めました。
    recommendation_prerequisite: Error Tracking
    recommendation_type: 新しい Issue
    scope: バックエンド サービス
  - category: パフォーマンス
    recommendation_description: バックエンド アプリケーションが制御フローとして大量の例外をスローしています。
    recommendation_prerequisite: APM + Continuous Profiler
    recommendation_type: 高頻度の例外スロー
    scope: バックエンド サービス
  headers:
  - filter_by: true
    id: category
    name: 推奨事項カテゴリ
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
title: APM Recommendations
---

{{< callout url="https://www.datadoghq.com/product-preview/apm-proactive-recommendations/" >}}
PM Recommendations はプレビュー版です。一般提供前に機能および推奨事項が変更される場合があります。アクセスをリクエストするには、このフォームに入力してください。
{{< /callout >}}

APM Recommendations は、アプリケーションから収集されたテレメトリーに基づき、最適化の機会を提供することでパフォーマンス・信頼性・エラー レートを改善します。これらの推奨事項は次の目的で設計されています。

- パフォーマンス ボトルネックの特定と解消
- サービスの信頼性と稼働時間の向上
- エラー レートを削減し、エンドユーザー エクスペリエンスを改善

{{< img src="/tracing/recommendations/apm_recommendations.png" alt="APM Recommendations のイメージ" style="width:100%;" >}}

## 前提条件

一部の推奨事項は特定の Datadog 製品に依存します。**Recommendation Prerequisite** ドロップダウンを使用して、現在のセットアップで表示される推奨事項をフィルタリングできます。

## 仕組み

APM Recommendations はスタックのさまざまなデータを組み合わせて生成されます。

- Real User Monitoring (RUM) のセッションとユーザー ジャーニー
- Application Performance Monitoring (APM) の分散トレース
- Error Tracking のエラー データ
- Database Monitoring (DBM) のデータベース テレメトリー

これらの情報を統合して分析し、パフォーマンス・信頼性・ユーザー エクスペリエンスの改善方法を提示します。

## APM Recommendations の使用方法

注意が必要な推奨事項を確認するには:

1. [**APM** > **Recommendations**][1] に移動します。
2. **For Review** に表示される推奨事項を確認します。
3. リストから推奨事項を選択して、問題、影響、および解決方法を表示します。
4. 問題と影響、および解決のための Datadog 推奨事項を確認します。

推奨事項に対応したら、**FOR REVIEW** ドロップ ダウンを使用してステータスを *Reviewed*、*Ignored*、または *Resolved* に変更できます。または **Create Case** をクリックして所有者を割り当て、関連作業をトラッキングできます。

## サポートされている推奨事項

<!-- 以下のテーブルは自動生成されます。新しい推奨事項が利用可能になったら multifiltersearch にエントリを追加してください。 -->

{{< multifilter-search >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/recommendations