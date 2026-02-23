---
algolia:
  tags:
  - カスタム メトリクス
further_reading:
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: ドキュメント
  text: カスタム メトリクスの課金
- link: /metrics/guide/custom_metrics_governance/
  tag: ガイド
  text: カスタム メトリクス ガバナンスのベスト プラクティス
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: ブログ
  text: Metrics without LimitsTM でカスタム メトリクス量を動的に制御する
is_beta: true
private: true
title: Dynamic Metric Quotas
---

## 概要

{{< callout url="#" btn_hidden="true" header="Preview に参加！" >}}
  この機能はプレビュー版です。
{{< /callout >}}

Datadog の Dynamic Metrics Quotas を使うと、アカウント、チーム、またはメトリクス名ごとにカスタム メトリクス クォータを設けられるため、カスタム メトリクス コストをこれまで以上にコントロールしやすくなります。[推定使用量メトリクス][10] に対してメトリクス モニターを定義し、条件に合致してトリガーされると、そのモニターが [Workflow Automation][3] 経由でワークフローを起動します。

ワークフローは、トリガーになったメトリクスに対して [Metrics without LimitsTM][1] の設定を自動適用してよいか確認するために、Slack (または Microsoft Teams) メッセージを送信します。承認されると、該当メトリクスの使用量とコストを自動的に削減できます。これらの設定更新は、Datadog のインテリジェントなクエリ インサイトによって生成されます。実際にアクティブにクエリされているタグの一覧を参照し、コストを最適化しつつも可視性を損なわない構成になるようにします。

アカウント全体のカスタム メトリクス使用量について、超過や急激なスパイクを監視して未然に防ぐ方法は、[カスタム メトリクス ガバナンスのベスト プラクティス ガイド][11] を参照してください。

## セットアップ

### 前提条件

1. [Workflow Automation][3] が有効になっている Datadog アカウント
2. Datadog の [Slack インテグレーション][5] または [Microsoft Teams インテグレーション][12] がインストール済みであること

### ブループリントの設定

{{< img src="/metrics/guide/dynamic_quotas/automated_mwl_workflow_monitor.png" alt="Datadog の自動化された Metrics without LimitsTM ワークフロー ブループリント上の Make a decision タイル" style="width:100%;" >}}

#### ブループリントからワークフローを作成する

1. この [ワークフロー ブループリント][8] を開き、***Create from Blueprint*** をクリックします。
2. ワークフロー キャンバス上の緑色の Monitor タイルをクリックし、***Automatic triggering*** トグルを有効にします。
3. 後述のメトリクス モニター設定で使うため、ワークフローの ***Mention handle*** をコピーしておきます。

#### メトリクス モニターを設定する

1. [メトリクス モニター][9] を作成します。
2. **Choose the detection method** セクションでは、Datadog は `Threshold Alert` のモニター タイプを推奨しています。必要に応じて Change または Anomaly Detection も利用できます。
3. **Define the metric** セクションで、メトリクス名として `datadog.estimated_usage.metrics.custom.by_metric` を選択し、space aggregator として `sum by` を選びます。
4. **Set alert conditions** で、クォータのしきい値を定義します。
5. **Configure notifications & automations** で、モニターの通知メッセージを更新し、先ほどコピーしたワークフローの mention handle を含めます。通知メッセージ例は次のとおりです。
```
    {{#is_alert}}
    @workflow-mwl-workflow-tags_4aab2
    {{/is_alert}}

```
7. `sum by` フィールドで指定したアカウント、チーム、メトリクス名、またはその他のタグごとに通知を送るには、**Multi Alert** を選択します。
8. **Create** をクリックして、メトリクス モニターを作成します。

#### ワークフロー設定を完了する

1. ワークフロー ブループリントには、更新が必要な Slack (または Microsoft Teams) インテグレーション タイルが複数含まれています。各タイルで、Datadog がコスト最適化のメトリクス設定をあなたの代わりに適用することを承認できる担当者 (チャネル、または特定ユーザー) を入力してください。
2. ワークフロー キャンバス上で ***Save*** をクリックします。
3. **Publish** をクリックします。
4. **Run** をクリックし、**Test from Monitor** を選択して、メトリクス モニター ID を入力します。これで、カスタム メトリクス コストの自動管理を開始できます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/metrics/metrics-without-limits/
[2]: /ja/monitors/configuration/#multi-alert
[3]: /ja/service_management/workflows/
[4]: https://app.datadoghq.com/workflow/blueprints/manage-metrics-without-limits-suggested-tags
[5]: /ja/integrations/slack/
[6]: /ja/account_management/billing/usage_metrics/
[7]: /ja/monitors/configuration/?tab=thresholdalert#set-alert-conditions
[8]: https://app.datadoghq.com/workflow/blueprints/manage-metrics-without-limits-suggested-tags
[9]: https://app.datadoghq.com/monitors/create/metric
[10]: /ja/account_management/billing/usage_metrics/
[11]: /ja/metrics/guide/custom_metrics_governance/#monitoring-and-prevention
[12]: https://docs.datadoghq.com/ja/integrations/microsoft_teams/