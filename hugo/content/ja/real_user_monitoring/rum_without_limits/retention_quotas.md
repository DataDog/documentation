---
description: 保持クォータを使用して、1 日あたりの保持される RUM セッション数を制限する方法について説明します。
further_reading:
- link: /real_user_monitoring/rum_without_limits/
  tag: ドキュメント
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/retention_filters
  tag: ドキュメント
  text: 保持フィルターを用いたデータの保持
- link: /real_user_monitoring/rum_without_limits/metrics
  tag: ドキュメント
  text: メトリクスを用いたパフォーマンスの分析
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: ガイド
  text: 保持フィルターのベストプラクティス
title: 保持クォータを用いたコストの管理
---
## 概要{#overview}

保持クォータを使用すると、保持フィルター全体で 1 日あたりに保持される RUM セッション数に上限を設定できます。

これにより、コスト管理がより厳格になり、トラフィックの急増やフィルターの誤設定に起因する予期せぬ請求の急増を防ぐことができます。

## クォータの仕組み {#how-quotas-work}

1 日あたりのクォータを、保持されるセッションの最大数として定義します。クォータに達した後は、次の 2 つの動作のいずれかを選択できます。

- {{< ui >}}Stop retention{{< /ui >}}: Datadog はその日の残りの期間、追加のセッションを保持せず、クォータがリセットされるまで受信したすべてのセッションを破棄します。
- {{< ui >}}Slow down retention{{< /ui >}}: 保持は継続されますが、レートが低下します。Datadog は、通常保持されるセッションの 10% のみを保持します。

## セットアップ{#setup}

アプリケーションの保持クォータを設定するには、次の手順に従います。

1. Datadog で、{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Real User Monitoring{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}} の順に移動します。
2. アプリケーションを選択します。
3. {{< ui >}}Product Settings{{< /ui >}} > {{< ui >}}Retention Filters{{< /ui >}} に移動します。
4. 1 日あたりのクォータしきい値、リセット時間、およびクォータに達したときの動作を設定します。

{{< img src="real_user_monitoring/rum_without_limits/retention-quotas-configuration.png" alt="1 日あたりのクォータしきい値、リセット時間、および動作オプションを示す保持クォータ設定パネル。" style="width:65%" >}}

<div class="alert alert-info">クォータは、<a href="/real_user_monitoring/rum_without_limits/retention_filters/#permanent-retention-filters">永続保持フィルター</a>によって保持されるセッションには適用されません。</div>

設定はアプリケーションレベルで行われるため、アプリケーションごとに異なる保持戦略を適用できます。設定の変更 (クォータ制限、保持動作、リセット時間) は即座に適用されます。

## クォータの使用状況の監視 {#monitor-quota-usage}

保持フィルターページには、クォータに達した後にブロックされたセッションを含め、保持されたユーザーセッションの内訳が表示されます。ダッシュボードやアラートには、メトリック `rum.measure.usage.quota_blocked_sessions` を使用します。

{{< img src="real_user_monitoring/rum_without_limits/retention-quotas-usage.png" alt="カスタムフィルターによって保持されたユーザーセッション、永続フィルターによって保持されたセッション、およびクォータに達したためにブロックされたセッションを示す日次の内訳チャート。" style="width:100%" >}}

## API{#api}

保持クォータは [API][1] を通じて管理することもできます。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/rum-retention-quotas/