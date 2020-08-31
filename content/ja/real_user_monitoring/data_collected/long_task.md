---
title: RUM ロングタスク
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: ブログ
  text: リアルユーザーモニタリング
- link: /real_user_monitoring/dashboards/
  tag: ドキュメント
  text: 追加設定なしで使用できるダッシュボードで RUM データを視覚化します
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: Datadog でビューを検索する
- link: /logs/processing/attributes_naming_convention/
  tag: ドキュメント
  text: Datadog標準属性
---

[ロングタスク][1]とは、メインスレッドを 50 ミリ秒以上ブロックするタスクのことです。インプットの高レイテンシーやインタラクションの遅延などの原因となります。ブラウザのパフォーマンスプロファイラーで、ロングタスクの原因を理解しましょう。

## 収集されるメジャー

| 属性  | 種類   | 説明                |
|------------|--------|----------------------------|
| `duration` | number | ロングタスクの時間。 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Long_Tasks_API
