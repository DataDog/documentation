---
description: .
further_reading:
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Documentation
  text: クロスプロダクト相関で容易にトラブルシューティング
title: APM データと他のテレメトリーとの接続
---

Datadog の様々な製品によるデータの相関付けは、数クリックでビジネスインパクトを推定し、問題の根本原因を見つけるのに役立つコンテキストを提供します。受信データ間の接続を設定することで、エクスプローラーやダッシュボードでの迅速な行き来を促します。

## ログとトレースの接続

トレース ID をログに挿入し、統合サービスタグ付けを活用して、特定のサービスやバージョンに関連する正確なログ、または観測されたトレースに関連するすべてのログを検索することができます。[ログとトレースの接続][1]を参照し、設定してください。

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="ログとトレースをつなげる" style="width:100%;">}}

## RUM とトレースの接続

[RUM とトレースの接続][2]により、フロントエンドのビューで収集したデータをバックエンドのトレースやスパンと相関付けることができます。スタックのあらゆる場所で問題を特定し、ユーザーが経験していることを理解することができます。

{{< img src="tracing/index/RumTraces.png" alt="RUM セッションとトレースを接続する" style="width:100%;">}}

##  Synthetics とトレースの接続

失敗した Synthetic テストのデータを、関連するトレースを掘り下げることで、根本原因まで直接たどることができます。[Synthetic とトレースの接続][3]で、コードのトラブルシューティングをスピードアップさせます。

{{< img src="tracing/index/Synthetics.png" alt="Synthetic テスト" style="width:100%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[2]: /ja/real_user_monitoring/connect_rum_and_traces/
[3]: /ja/synthetics/apm/