---
description: Datadog のエージェント主導の調査は、構造化された初回の根本原因分析を直接 RUM ワークフローにもたらします。
further_reading:
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM エクスプローラーについて
title: AI 調査
---
## 概要 {#overview}

RUM におけるユーザーエクスペリエンスの悪化を調査することは、通常、セッションリプレイ、エラーパネル、トレース、パフォーマンスタイムラインを切り替えて、何が問題だったのかを把握することを意味します。AI 調査は、その初回のトリアージを自動化します。Datadog の RUM エージェントは、あなたのビューに付随するデータを検査し、RUMワークフロー内でランク付けされたカテゴリ別の根本原因の所見を直接提示します。

このページには、利用可能な調査タイプが一覧表示されています。

## 単一ビュー AI 調査{#single-view-ai-investigation}

単一の RUM ビューでエージェント主導の調査を実行して、特定のページや画面でのパフォーマンス問題を調査したり、最適化の機会を特定したりします。Datadog の RUM エージェントは、ビューイベントとそのサブイベントを検査し、アプリケーション、バックエンド、サードパーティライブラリ、ユーザーのネットワーク環境にわたるソースから根本原因を特定します。

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-overview.png" alt="RUM ビューの根本原因の所見を提示する単一ビュー AI 調査。" style="width:100%;" >}}

詳細については、[単一ビュー AI 調査][1]を参照してください。

## マルチビュー AI 調査{#multi-view-ai-investigation}

パフォーマンスが低下しているという共通の重要指標を持つビューのサンプルに対して、エージェント主導の調査を実行します。マルチビュー AI 調査は、同じエージェント分析をビューの集団に拡張し、全体の (ビュー×重要指標) のペアがユーザー間で一貫して遅い場合に何を修正すべきかを特定するのに役立ちます。読み込み時間、最大コンテンツ描画、最初のコンテンツ描画、次の描画までのインタラクションの最適化ページから利用可能です。

{{< img src="real_user_monitoring/ai_investigations/multi-view-ai-investigation-recommendations.png" alt="パフォーマンスの重要指標向けの最適化ページ。ランク付けされた推奨カードと、そのそれぞれに [Investigate] (調査) ボタンが表示されています。" style="width:100%;" >}}

詳細については、[マルチビュー AI 調査][2]を参照してください。

## オペレーション AI 調査{#operation-ai-investigation}

[オペレーションモニタリング][3]で単一オペレーションに対してエージェント主導の調査を実行します。エージェントは、オペレーションの成功率とレイテンシーを分析し、各失敗モード (エラー、タイムアウト、放棄) およびレイテンシーの回帰に焦点を絞った調査を提示します。

{{< img src="real_user_monitoring/ai_investigations/operation-ai-investigation-recommendations.png" alt="あるオペレーションの [Operations] (オペレーション) ページには、平易な表現のヘルスサマリーと、優先度バッジが付与されたランク付けの推奨カードが表示されます。" style="width:100%;" >}}

詳細については、[オペレーション AI 調査][4]をご覧ください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/ai_investigations/single_view_ai_investigation/
[2]: /ja/real_user_monitoring/ai_investigations/multi_view_ai_investigation/
[3]: /ja/real_user_monitoring/operations_monitoring/
[4]: /ja/real_user_monitoring/ai_investigations/operation_ai_investigation/