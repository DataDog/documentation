---
title: RUM エラー追跡
kind: ドキュメント
further_reading:
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Error Tracking Explorer
- link: "https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps"
  tag: Documentation
  text: Datadog CLI の公式リポジトリ
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: ガイド
  text: JavaScript ソースマップのアップロード
- link: "https://app.datadoghq.com/error-tracking"
  tag: UI
  text: エラー追跡
---

{{< img src="real_user_monitoring/error_tracking/page.png" alt="エラー追跡ページ"  >}}

## Error Tracking とは？

Datadog では、非常に多くのエラーが収集されます。システムの正常性維持には、このエラーを監視することが不可欠ですが、件数が多いため個々のエラーイベントを重要度により特定し修正の順序を見極めることは大変困難です。Error Tracking を使用すると、以下の機能により簡単にエラーを監視できます。

- __同様のエラーを問題としてグループ化する__ ため、ノイズがなくなり最も重要なエラーを特定することができます。
- __経時的に問題を監視する__ ため、開始のタイミングや継続した場合の頻度を把握できます。
- __必要なコンテキストをまとめて 1 か所で確認__ できるため、問題のトラブルシューティングが容易になります。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
