---
title: Error Tracking
kind: documentation
further_reading:
- link: /tracing/error_tracking/explorer
  tag: ドキュメント
  text: Error Tracking Explorer
- link: "https://app.datadoghq.com/apm/error-tracking"
  tag: UI
  text: エラー追跡
---

{{< img src="tracing/error_tracking/explorer_with_backend_issues.png" alt="エラー追跡ページ"  >}}


Datadog によって収集されたエラーを監視することは、システムの正常性維持には不可欠ですが、件数が多いため個々のエラーイベントを重要度により特定し修正の順序を見極めることは大変困難です。エラー追跡を使用すると、以下の機能により簡単にエラーを監視できます。

- __同様のエラーを問題にグループ化__して、このノイズの多いエラーの流れを管理可能な問題の小さなリストに変換します。
- __時間の経過とともに問題を追跡__することで、問題が最初に開始された時期、進行中かどうか、発生頻度がわかれば、特に重要な問題を特定するのに役立ちます。
- __すべてのコンテキストを 1 か所にまとめる__ことで、トラブルシューティングが容易になります。

## Datadog エラー追跡のしくみ

Datadog トレーサーは、ソースコードのインテグレーションと手動インスツルメンテーションを通じてエラーを収集します。トレース内のエラースパンは、_サービスエントリスパン_とも呼ばれる__最上位のサービススパンにある場合__、エラートラッキングによって処理されます。

{{< img src="tracing/error_tracking/flamegraph_with_errors.png" alt="エラーのあるフレームグラフ"  >}}

エラー追跡は、エラータイプ、エラーメッセージ、スタックトレースを形成するフレームを使用して、処理する各エラースパンのフィンガープリントを計算します。同じフィンガープリントを持つエラーはグループ化され、同じ_問題_に属します。

<div class="alert alert-info">エラー追跡は、APM でサポートされているすべての言語で利用でき、別の SDK を使用する必要はありません。</div>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
