---
title: Cloud Cost Monitor
description: "Monitor costs associated with cloud platforms."
further_reading:
- link: "https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview"
  tag: Documentation
  text: Cloud Cost Management
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Schedule a downtime to mute a monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Consult your monitor status
- link: "https://www.datadoghq.com/blog/ccm-cost-monitors/"
  tag: Blog
  text: React quickly to cost overruns with Cost Monitors for Datadog Cloud Cost Management
- link: "https://www.datadoghq.com/blog/google-cloud-cost-management/"
  tag: Blog
  text: Empower engineers to take ownership of Google Cloud costs with Datadog
---

## 概要
コスト変化を事前に通知することで、予期せぬクラウド利用を抑制することができます。クラウドコストモニターは、コスト変動を迅速に特定し、その原因を調査するのに役立ちます。アラートを構成することで、予期せぬ変化をキャッチすることができます。

クラウドコストモニターを構成するためには、[クラウドコストマネジメント][1]をセットアップする必要があります。設定後、コストの増減をアラートするモニターを構成することができます。

## モニターの作成

Datadog でクラウドコストモニターを作成するには、メインナビゲーションを使用します: **Monitors** --> **New Monitor** --> **Cloud Cost**

[Cloud Costs Analytics][2] からもクラウドコストモニターを作成することができます。コスト表の上にある **+Export to Monitor** をクリックします。

{{< img src="/monitors/monitor_types/cloud_cost/cloud_cost_analytics.png" alt="'Cloud Costs Analytics のページにある Export to Monitor ボタン" style="width:100%;" >}}

## コストモニタータイプを選択する

モニタータイプは、**Compare Costs Over Time** または **Set Daily Cost Threshold** のいずれかを選択します。

| コストタイプ | 説明 | 使用例 |
| ---  | ----------- | ----------- |
| Cost Changes  | 日、週、月単位でコストを比較する | 今日のコストと前週のコストの差が 5% 以上になるとアラート |
| Cost Threshold | 1 日の総コストがしきい値を超えた場合のアラートを設定する | 今日の総コストが 1 万ドルを超え場合のアラートを設定する |

## 追跡するコストを指定する

Datadog に報告されているコストタイプやメトリクスはすべてモニターに利用できます。カスタムメトリクスや観測可能性メトリクスをコストメトリクスと一緒に使用して、ユニットエコノミクスをモニタリングすることができます。詳しくは、[クラウドコストマネジメント][1]ページを参照してください。エディタを使用して、コストタイプまたはエクスポートを定義します。

| 手順                              | 必須 | デフォルト              | 例             |
|-----------------------------------|----------|----------------------|---------------------|
| コストメトリクスを選択する                 | はい      | `aws.cost.amortized` | `azure.cost.actual` |
| `filter by` を定義する            | いいえ       | すべての条件           | `aws_product:s3`    |
| グループ化                          | いいえ       | すべての条件           | `aws_availability_zone` |
| 観測可能性メトリクスの追加 | いいえ      | `system.cpu.user` | `aws.s3.all_requests` |

{{< img src="monitors/monitor_types/cloud_cost/ccm_metrics_source.png" alt="追跡するコストを指定するための、クラウドコストとメトリクスのデータソースオプション" style="width:100%;" >}}

## アラートの条件を設定する

コストモニタータイプが **Cost Threshold** の場合、クラウドコストがしきい値より `above` (上)、`below` (下)、`above or equal` (以上)、または `below or equal to` (以下) になったときに、アラートをトリガーすることができます。

コストモニタータイプが **Cost Changes** の場合、コストが定義されたしきい値よりも `increases` (増加) または `decreases` (減少) した場合に、アラートをトリガーすることができます。しきい値には、**Percentage Change** (変化率) または **Dollar Amount** (ドル額) のいずれかを設定することができます。

**注**: **Percentage Change** では、あるドルのしきい値以下の変化をフィルターで除外することも可能です。
例: 500 ドル以上の変更に対して、5% 以上のコスト変更があった場合にアラートを出す

## 通知と自動化の構成

For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][3] page.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/cloud_cost_management/
[2]: https://app.datadoghq.com/cost/analytics
[3]: /monitors/notify/
