---
description: Datadog の追加製品で収集したテレメトリ データと RUM イベントをどのように結び付けるかを説明します。
further_reading:
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: ドキュメント
  text: クロスプロダクト相関で容易にトラブルシューティング
- link: https://www.datadoghq.com/blog/unify-apm-rum-datadog/
  tag: ブログ
  text: フル スタックの可視性を確保するために、 RUM イベントと APM テレメトリをシームレスに相関させます。
title: RUM イベントを他のテレメトリ データと関連付ける
---

Datadog の様々な製品によるデータの相関付けは、数クリックでビジネスインパクトを推定し、問題の根本原因を見つけるのに役立つコンテキストを提供します。受信データ間の接続を設定することで、エクスプローラーやダッシュボードでの迅速な行き来を促します。

## RUM とログを相関させる

ユーザー セッションやビュー イベントから収集したデータをログと関連付けることで、アプリケーションの挙動をより深く把握し、トラブルシューティングを効率化できます。設定方法については、 [Logs と RUM の接続][1] を参照してください。

{{< img src="real_user_monitoring/correlate_rum_and_logs/rum_browser_logs.png" alt="RUM アクション内のブラウザー ログ" style="width:100%;" >}}

## RUM とトレースの関連付け

RUM と Traces を接続することで、フロント エンドのビューで収集したデータをバック エンド側のトレースやスパンと関連付けられます。スタックのどこで問題が発生しているかを正確に突き止め、ユーザーがどのような体験をしているのかを把握できます。詳細については、 [RUM と Traces の接続][2] を参照してください。

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_trace_tab.png" alt="RUM とトレース" style="width:100%;">}}


## RUM と Synthetic テストを相関させる

関連する RUM イベントを深掘りすることで、 Synthetic テストのデータから根本原因までたどることができます。Synthetic テストの可視性を高めるには、 [Synthetics と RUM の連携][3] を利用してください。

{{< img src="synthetics/guide/rum_in_synthetics/sessions_details_panel.png" alt="セッションの詳細サイドパネル" style="width:100%;" >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/correlate_with_other_telemetry/logs/
[2]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/
[3]: /ja/synthetics/guide/explore-rum-through-synthetics/