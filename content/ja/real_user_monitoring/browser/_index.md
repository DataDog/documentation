---
further_reading:
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM エクスプローラーについて
- link: /logs/log_collection/javascript/
  tag: ドキュメント
  text: Datadog Browser SDK for Logs について
title: RUM ブラウザモニタリング
---

## 概要

Datadog Real User Monitoring (RUM) は、アプリケーションのフロントエンドパフォーマンスを詳細に分析します。リアルユーザーデータをモニタリングし、Web エクスペリエンスを最適化して優れたユーザーエクスペリエンスを提供します。Synthetic テスト、バックエンドのメトリクス、トレース、ログを一箇所に集約し、スタック全体のパフォーマンス問題を特定してトラブルシューティングを行います。

Datadog を使用すると、現在のユーザーエクスペリエンスのレベルを理解し、改善が必要な領域を特定し、各変更やデプロイの成果を測定することができます。この情報を活用して、ユーザーが影響を受ける前に予期しないフロントエンドの問題を特定して解決し、最高のエクスペリエンスを提供します。

Datadog RUM Browser SDK を使用すると、次のことも可能です。

- アプリケーションのページビューとパフォーマンスを監視して、パフォーマンスの問題を調査する
- リソースやリクエスト (イメージ、CSS ファイル、JavaScript アセット、フォントファイルなど) を完全にエンドツーエンドで可視化する
- 興味深いイベントを関連するすべてのコンテキストとともに自動的に収集および監視し、自動的に追跡されないエラーを手動で収集する
- ユーザージャーニー中に実行されたユーザーインタラクションを追跡し、プライバシー要件を満たしながらユーザーの行動を把握する
- フラストレーションシグナルを用いてユーザーのペインポイントを表面化させる
- エラーの原因をコード行まで特定し、解決する

{{< img src="real_user_monitoring/browser/rum-browser-overview.png" alt="RUM パフォーマンスサマリーダッシュボード" style="width:100%;">}}

## はじめに

RUM Browser SDK を使い始めるには、[JavaScript RUM アプリケーションの作成][1]の手順に従ってください。

ここから、特定のニーズに応じて RUM Browser SDK が収集する[データとコンテキスト][2]を変更することができます。[高度な構成][3]でデフォルト設定をオーバーライドする方法をご覧ください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/setup/#setup
[2]: /ja/real_user_monitoring/browser/data_collected/
[3]: /ja/real_user_monitoring/browser/advanced_configuration/
