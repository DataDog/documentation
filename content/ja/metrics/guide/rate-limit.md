---
further_reading:
- link: /metrics/custom_metrics/
  tag: ドキュメント
  text: カスタムメトリクス
- link: /metrics/guide/custom_metrics_governance/
  tag: ドキュメント
  text: カスタムメトリクス管理のベストプラクティス
private: true
title: レート制限されたメトリクスから生成されたイベント
---

## 概要 

特定のキーに対して多数の一意のタグ値を伴うメトリクスを Datadog に送信すると、高い[カーディナリティ][1]を引き起こす可能性があります。多くの場合、これは無制限 (unbounded) タグが原因です。

無制限タグや高いカーディナリティのタグはアカウントのパフォーマンスや安定性に影響を与える可能性があります。アカウントを保護するために、Datadog はメトリクスの増加を監視し、これらの送信がレート制限された場合に通知を行います。

本ガイドでは、以下について説明します。
- レート制限イベント
- レート制限イベントを監視し、レート制限されたメトリクスを特定する方法
- 無制限タグへの対処方法とメトリクスのレート制限を解除する方法


## Datadog のレート制限イベント

{{< img src="/metrics/guide/rate_limit/rate_limit_events.png" alt="Events Explorer のレート制限イベントとサイドパネルに表示された例" style="width:100%;" >}}

Datadog はカーディナリティが増加していることを検知すると、レート制限が適用される前に警告の[イベント][2]を作成します。メトリクスのカーディナリティがさらに増加し続けると、レート制限が適用される場合があります。メトリクスがレート制限されると、レート制限が行われたことを示す 2 つ目のイベントが生成されます。これらのイベントは [Event Explorer][3] で確認できます。

<div class="alert alert-warning">Datadog では、その後のすべてのレート制限イベントに対して通知を送信するわけではありません。ベストプラクティスとして、将来的にメトリクスがレート制限されたときにアラートを送信するよう、Event Monitor を作成しておくことを推奨します。</div>

## レート制限イベントを監視する

[Event Monitor][3] を設定して、レート制限イベントが発生した場合に通知が送られるようにできます。

1. クエリを以下のように定義します。
   ```
   tags:metric-rate-limit source:datadog
   ```
1. アラートのしきい値を `above or equal to 1` (1 以上) に設定します。
1. モニターのメッセージに、トリガー時の通知先を設定します。

{{< img src="/metrics/guide/rate_limit/event_monitor_config.png" alt="レート制限イベント用の Event Monitor の設定画面" style="width:90%;" >}}

## 無制限タグ (unbounded tags) への対処方法

レート制限を解除するには、イベントに表示される無制限タグを見直す必要があります。まずは、イベントで報告されたタグ値がすべて必要かどうかを判断してください。その上で、貴重なインサイトを提供するタグのみを残すようにメトリクスの送信方法を調整します。

詳細については、[カスタムメトリクス管理のベストプラクティス][4]ガイドを参照してください。

## レート制限解除のリクエストを送る

<div class="alert alert-warning">レート制限されたメトリクスの解除をリクエストできるのは、Datadog の管理者 (Admin) だけです。管理者でない場合は、サポートチケットに管理者を含め、リクエストを確認してもらってください。</div>

無制限タグを削除するための変更を行った後、[Datadog サポート][5]にレート制限解除のリクエストを送ってください。その際、以下の情報を提供してください。
- レート制限されたメトリクス名
- Event Platform 上のレート制限イベントへのリンク
- 無制限タグが削除されるように構成変更が行われたことの確認


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/billing/custom_metrics/?tab=countrate#effect-of-adding-tags
[2]: https://docs.datadoghq.com/ja/service_management/events/
[3]: https://docs.datadoghq.com/ja/monitors/types/event/
[4]: https://docs.datadoghq.com/ja/metrics/guide/custom_metrics_governance/
[5]: https://docs.datadoghq.com/ja/help/