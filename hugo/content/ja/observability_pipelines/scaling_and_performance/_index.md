---
description: ホスト上で複数のパイプラインを実行する方法、バッファリングとバックプレッシャー、Observability Pipelines Workers
  をスケーリングするためのベストプラクティスなどのトピックに関するドキュメントリンクを確認できます。
disable_toc: false
title: スケーリングとパフォーマンス
---
さまざまなユースケースに対応するために Observability Pipelines アーキテクチャをスケーリングする際、

- 異なるソースからデータを送信できるようにホスト上で複数のパイプラインを実行する場合は、[ホストで複数のパイプラインを実行][1]の手順に従ってください。
- Observability Pipelines は、イベントを受信してすぐに処理できない状況に対処するため、バックプレッシャー信号とバッファリングを使用します。詳細については、[バッファリングとバックプレッシャー][2]を参照してください。
- Observability Pipelines Workers をスケーリングする場合、各 Worker は独立して動作します。推奨されるアグリゲーターアーキテクチャについては、[パイプラインのスケーリングに関するベストプラクティス][3]を参照してください。

[1]: /ja/observability_pipelines/configuration/install_the_worker/run_multiple_pipelines_on_a_host/
[2]: /ja/observability_pipelines/scaling_and_performance/buffering_and_backpressure/
[3]: /ja/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/