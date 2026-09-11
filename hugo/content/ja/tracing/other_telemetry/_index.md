---
description: Datadog の他の製品で収集したテレメトリーと APM データを接続する方法をご紹介します。
further_reading:
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Documentation
  text: クロスプロダクト相関で容易にトラブルシューティング
- link: https://www.datadoghq.com/blog/link-dbm-and-apm/
  tag: ブログ
  text: DBM と APM のテレメトリーをシームレスに相関させ、エンドツーエンドのクエリパフォーマンスを把握する
title: APM データと他のテレメトリーとの相関付け
---

Datadog の様々な製品によるデータの相関付けは、数クリックでビジネスインパクトを推定し、問題の根本原因を見つけるのに役立つコンテキストを提供します。受信データ間の接続を設定することで、エクスプローラーやダッシュボードでの迅速な行き来を促します。

## Database Monitoring とトレースを相関付ける

DBM データ収集にトレース ID を挿入し、2 つのデータソースを相関付けます。APM でデータベース情報を表示し、DBM で APM 情報を表示して、システムのパフォーマンスに関する包括的で統一されたビューを表示します。[DBM とトレースの接続][4]を参照して設定してください。

{{< img src="database_monitoring/dbm_filter_by_calling_service.png" alt="呼び出し元 APM サービスごとにデータベースホストをフィルタリングします。">}}


## ログとトレースを相関付ける

トレース ID をログに挿入し、統合サービスタグ付けを活用して、特定のサービスやバージョンに関連する正確なログ、または観測されたトレースに関連するすべてのログを検索することができます。[ログとトレースの接続][1]を参照し、設定してください。

{{< img src="tracing/connect_logs_and_traces/logs-trace-correlation.png" alt="ログとトレースの相関" style="width:100%;">}}

## RUM とトレースを相関付ける

[RUM とトレースの接続][2]により、フロントエンドのビューで収集したデータをバックエンドのトレースやスパンと相関付けることができます。スタックのあらゆる場所で問題を特定し、ユーザーが経験していることを理解することができます。

{{< img src="tracing/index/RumTraces.png" alt="RUM セッションとトレースを接続する" style="width:100%;">}}

## Synthetic テストとトレースを相関付ける

失敗した Synthetic テストのデータを、関連するトレースを掘り下げることで、根本原因まで直接たどることができます。[Synthetic とトレースの接続][3]で、コードのトラブルシューティングをスピードアップさせます。

{{< img src="tracing/index/Synthetics.png" alt="Synthetic テスト" style="width:100%;">}}

## プロファイルとトレースを相関付ける

トレーシングとプロファイリングをどちらも有効にしているアプリケーション コードでは、パフォーマンス データが自動的に相関付けられます。2 つの分析を行き来できるため、原因の切り分けや問題解決をスムーズに進められます。**Profiles** タブでは、スパン情報からプロファイリング データへ直接移動し、性能上の課題に結び付く具体的なコード行を特定できます。同様に、遅くてリソースを大量に消費するエンドポイントも Profiling UI で直接デバッグできます。

詳しくは、[遅いトレースやエンドポイントを調査する][5] を参照してください。

{{< img src="profiler/profiles_tab.png" alt="APM トレース スパンのプロファイリング情報を表示する Profiles タブ" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[2]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/
[3]: /ja/synthetics/apm/
[4]: /ja/database_monitoring/connect_dbm_and_apm/
[5]: /ja/profiler/connect_traces_and_profiles/